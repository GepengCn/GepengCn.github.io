# Adding state-based animation to a view

## `animation(_:value:)`

当指定的值更改时，将给定的动画应用于此视图。

```swift
func animation<V>(
    _ animation: Animation?,
    value: V
) -> some View where V : Equatable
```

```swift
struct ContentView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        
        VStack {
            Button("Changed") {
                isActive.toggle()
            }
            
            Circle()
                .frame(width: 300)
                .opacity(isActive ? 1.0 : 0.0)
                .animation(.easeInOut, value: isActive)
                
        }
    }
}

```

<video src="../../video/AnimationBody.mp4" controls="controls"></video>


## `animation(_:body:)`

将给定的动画应用于闭包体内所有可动画的值。

```swift
func animation<V>(
    _ animation: Animation?,
    @ViewBuilder body: (PlaceholderContentView<Self>) -> V
) -> some View where V : View
```

应用于 `body` 内容的任何修饰符都将应用于此视图，并且动画仅用于 `body` 中定义的修饰符。

以下代码使用 `easeInOut` 动画来动画化透明度的变化，而 `MyView` 的内容则使用隐式事务的动画进行动画化：


```swift
struct ContentView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        
        VStack {
            Button("Changed") {
                isActive.toggle()
            }
            
            Circle()
                .frame(width: 300)
                .animation(.easeInOut) { content in
                    content.opacity(isActive ? 1.0 : 0.0)
                }
        }
    }
}
```

