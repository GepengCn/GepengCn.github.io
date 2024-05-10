# Creating custom animations

## `CustomAnimation`

一种定义可动画值随时间变化方式的类型。

```swift
protocol CustomAnimation : Hashable
```

使用此协议创建一个随时间更改可动画值的类型，从而产生视图的自定义视觉过渡。例如，以下代码使用弹性缓入缓出函数更改可动画值：

```swift
struct ElasticEaseInEaseOutAnimation: CustomAnimation {
    let duration: TimeInterval

    func animate<V>(value: V, time: TimeInterval, context: inout AnimationContext<V>) -> V? where V : VectorArithmetic {
        if time > duration { return nil } // The animation has finished.


        let p = time / duration
        let s = sin((20 * p - 11.125) * ((2 * Double.pi) / 4.5))
        if p < 0.5 {
            return value.scaled(by: -(pow(2, 20 * p - 10) * s) / 2)
        } else {
            return value.scaled(by: (pow(2, -20 * p + 10) * s) / 2 + 1)
        }
    }
}
```


::: info
要在自定义动画的生命周期内维护状态，请使用上下文参数值上可用的状态属性。你还可以使用上下文的环境属性从创建自定义动画的视图中检索环境值。有关更多信息，请参阅 `AnimationContext`。
:::

要创建自定义动画的 `Animation` 实例，请使用 `init(_:)` 初始化程序，并传入自定义动画的实例；例如：

```swift
Animation(ElasticEaseInEaseOutAnimation(duration: 5.0))
```

为了使视图代码更具可读性，扩展 `Animation` 并添加一个静态属性和函数，返回自定义动画的 `Animation` 实例。例如，以下代码添加了静态属性 `elasticEaseInEaseOut`，它返回默认持续时间为 $0.35$ 秒的弹性缓入缓出动画。接下来，代码添加了一个方法，返回具有指定持续时间的动画。

```swift
extension Animation {
    static var elasticEaseInEaseOut: Animation { elasticEaseInEaseOut(duration: 0.35) }
    static func elasticEaseInEaseOut(duration: TimeInterval) -> Animation {
        Animation(ElasticEaseInEaseOutAnimation(duration: duration))
    }
}
```

要使用弹性缓入缓出动画对视图进行动画处理，视图可以调用 `.elasticEaseInEaseOut` 或 `.elasticEaseInEaseOut(duration:)`。例如，以下代码包含一个 `Animate` 按钮，当点击该按钮时，会使用持续时间为 $5$ 秒的弹性缓入缓出动画来动画化一个圆，使其从视图的一侧移动到另一侧：


```swift
struct ElasticEaseInEaseOutView: View {
    @State private var isActive = false


    var body: some View {
        VStack(alignment: isActive ? .trailing : .leading) {
            Circle()
                .frame(width: 100.0)
                .foregroundColor(.accentColor)


            Button("Animate") {
                withAnimation(.elasticEaseInEaseOut(duration: 5.0)) {
                    isActive.toggle()
                }
            }
            .frame(maxWidth: .infinity)
        }
        .padding()
    }
}
```


<video src="../../video/CustomAnimation.mp4" controls="controls"></video>


### Animating a value

#### `animate(value:time:context:)`

计算指定时间的动画值。

```swift
func animate<V>(
    value: V,
    time: TimeInterval,
    context: inout AnimationContext<V>
) -> V? where V : VectorArithmetic
```

- `value` : 要朝着其进行动画处理的向量。
- `time` : 自动画开始以来经过的时间。
- `context` : `AnimationContext` 的实例，可用于访问状态和动画环境。

实现此方法以计算并返回动画在给定时间点的值。如果动画已完成，则返回 `nil` 作为值。这向系统发出信号，表明它可以删除动画。

如果自定义动画需要在调用 `animate(value:time:context:)` 方法之间维护状态，请将状态数据存储在 `context` 中。这样，下次系统调用该方法时，数据就可供该方法使用。要了解有关在自定义动画中管理状态数据的更多信息，请参阅 `AnimationContext`。

### Getting the velocity

#### `velocity(value:time:context:)`

计算指定时间的动画速度。

```swift
func velocity<V>(
    value: V,
    time: TimeInterval,
    context: AnimationContext<V>
) -> V? where V : VectorArithmetic
```

- `value` : 要朝着其进行动画处理的向量。
- `time` : 从动画开始到现在的时间量。
- `context` : `AnimationContext` 的实例，可用于访问状态和动画环境。

实现此方法以提供给定时间的动画速度。如果后续动画与该动画合并，系统将在动画之间保留速度的连续性。此方法的默认实现返回 `nil`。


::: info

通过 `context` 参数可以获得此方法的状态和环境数据，但 `context` 是只读的。这种行为与 `animate(value:time:context:)` 和 `shouldMerge(previous:value:time:context:)` 不同，在后两种方法中，`context` 是一个 `inout` 参数，允许你更改 `context`，包括动画的状态数据。有关在自定义动画中管理状态数据的更多信息，请参阅 `AnimationContext`。
:::


### Determining whether to merge

#### `shouldMerge(previous:value:time:context:)`

确定动画实例是否可以与同一类型的其他实例合并。

```swift
func shouldMerge<V>(
    previous: Animation,
    value: V,
    time: TimeInterval,
    context: inout AnimationContext<V>
) -> Bool where V : VectorArithmetic
```

- `previous` : 上一个正在运行的动画。
- `value` : 要朝着其进行动画处理的向量。
- `time` : 从上一个动画开始到现在的时间量。
- `context` : `AnimationContext` 的实例，可用于访问状态和动画环境。

当视图在已经具有相同动画类型的运行动画的可动画值上创建新动画时，系统会在新实例上调用 `shouldMerge(previous:value:time:context:)` 方法，以确定是否可以合并这两个实例。如果动画可以与另一个实例合并，请实现此方法。默认实现返回 `false`。

如果 `shouldMerge(previous:value:time:context:)` 返回 `true`，系统将新的动画实例与先前的动画合并。系统向新实例提供先前动画的状态和经过的时间。然后，它删除先前的动画。

如果此方法返回 `false`，系统不会将动画与先前的动画合并。相反，两个动画一起运行，系统会组合它们的结果。

如果自定义动画需要在调用 `shouldMerge(previous:value:time:context:)` 方法之间维护状态，请将状态数据存储在 `context` 中。这样，下次系统调用该方法时，数据就可供该方法使用。要了解更多信息，请参阅 `AnimationContext`。