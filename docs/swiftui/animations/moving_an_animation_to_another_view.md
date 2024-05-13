# Moving an animation to another view

## `withTransaction(_:_:)`

使用指定的事务执行闭包并返回结果。

```swift
func withTransaction<Result>(
    _ transaction: Transaction,
    _ body: () throws -> Result
) rethrows -> Result
```

用于在一个事务中执行一系列视图更新，例如：

```swift
struct TransactionView: View {
    
    @State private var scale: CGFloat = 1.0

    var body: some View {
        VStack {
            Text("Tap me!")
                .scaleEffect(scale)
                .onTapGesture {
                    withTransaction(Transaction(animation: .spring())) {
                        scale *= 1.5
                    }
                }
        }
    }
}
```

## `transaction(value:_:)`

将给定的事务变异函数应用于视图内使用的所有动画。


```swift
func transaction(
    value: some Equatable,
    _ transform: @escaping (inout Transaction) -> Void
) -> some View
```

使用此修饰符更改或替换视图中使用的动画。考虑由一个按钮控制的三个相同视图，该按钮同时更改所有三个视图：

第一个视图通过 $360$ 度旋转 `Rotation` Text 视图来动画化。

第二个使用 `transaction(_:)` 修饰符通过在动画开始时添加两秒钟的延迟来更改动画，然后将`Rotation\nModified` Text 视图动画的旋转速度提高 $2$ 倍。

第三个使用 `transaction(_:)` 修饰符禁用影响 `Animation\nReplaced` Text 视图的动画。

以下代码实现这些动画：

```swift
struct TransactionExample: View {
    
    @State var flag = false
    
    
    var body: some View {
        VStack(spacing: 50) {
            HStack(spacing: 30) {
                Text("Rotation")
                    .rotationEffect(Angle(degrees: flag ? 360 : 0))
                
                
                Text("Rotation\nModified")
                    .rotationEffect(Angle(degrees: flag ? 360 : 0))
                    .transaction(value: flag) { t in
                        t.animation =
                        t.animation?.delay(2.0).speed(2)
                    }
                
                
                Text("Animation\nReplaced")
                    .rotationEffect(Angle(degrees: flag ? 360 : 0))
                    .transaction(value: flag) { t in
                        t.disablesAnimations = true
                    }
            }
            
            
            Button("Animate") {
                withAnimation(.easeIn(duration: 2.0)) {
                    flag.toggle()
                }
            }
        }
    }
}
```

<video src="../../video/Transaction.mp4" controls="controls"></video>


## `transaction(_:body:)`

将给定的事务变异函数应用于主体闭包内使用的所有动画。

```swift
func transaction<V>(
    _ transform: @escaping (inout Transaction) -> Void,
    @ViewBuilder body: (PlaceholderContentView<Self>) -> V
) -> some View where V : View
```

应用于 `body` 内容的任何修饰符都将应用于此视图，而在 `transform` 中对事务进行的更改只会影响 `body` 中定义的修饰符。

以下代码在更改透明度时使用更快的动画，而 `MyView` 的内容则使用隐式事务进行动画：

```swift
MyView(isActive: isActive)
    .transaction { transaction in
        transaction.animation = transaction.animation?.speed(2)
    } body: { content in
        content.opacity(isActive ? 1.0 : 0.0)
    }
```