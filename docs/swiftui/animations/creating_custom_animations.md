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


## `AnimationContext`

自定义动画可以用来管理状态和访问视图环境的上下文值。

```swift
struct AnimationContext<Value> where Value : VectorArithmetic
```

系统向 `CustomAnimation` 实例提供了一个 `AnimationContext`，以便动画可以在 `AnimationState` 的实例中存储和检索值。要访问这些值，请使用上下文的 `state` 属性。

为了更方便地访问状态，可以创建一个 `AnimationStateKey`，并扩展 `AnimationContext` 以包括一个计算属性，该属性用于获取和设置 `AnimationState` 值。然后，使用此属性而不是 `state` 来检索自定义动画的状态。例如，以下代码创建了一个名为 `PausableState` 的动画状态键。然后，代码扩展了 `AnimationContext` 以包括 `pausableState` 属性：

```swift
private struct PausableState<Value: VectorArithmetic>: AnimationStateKey {
    var paused = false
    var pauseTime: TimeInterval = 0.0

    static var defaultValue: Self { .init() }
}


extension AnimationContext {
    fileprivate var pausableState: PausableState<Value> {
        get { state[PausableState<Value>.self] }
        set { state[PausableState<Value>.self] = newValue }
    }
}
```

要访问可暂停状态，自定义动画 `PausableAnimation` 使用 `pausableState` 属性而不是 `state` 属性：


```swift
struct PausableAnimation: CustomAnimation {
    let base: Animation

    func animate<V>(value: V, time: TimeInterval, context: inout AnimationContext<V>) -> V? where V : VectorArithmetic {
        let paused = context.environment.animationPaused

        let pausableState = context.pausableState
        var pauseTime = pausableState.pauseTime
        if pausableState.paused != paused {
            pauseTime = time - pauseTime
            context.pausableState = PausableState(paused: paused, pauseTime: pauseTime)
        }

        let effectiveTime = paused ? pauseTime : time - pauseTime
        let result = base.animate(value: value, time: effectiveTime, context: &context)
        return result
    }
}
```


动画还可以检索创建动画的视图的环境值。要检索视图的环境值，请使用上下文的 `environment` 属性。例如，以下代码创建了一个名为 `AnimationPausedKey` 的自定义 `EnvironmentKey`，并且视图 `PausableAnimationView` 使用该键来存储暂停状态：

```swift
struct AnimationPausedKey: EnvironmentKey {
    static let defaultValue = false
}

extension EnvironmentValues {
    var animationPaused: Bool {
        get { self[AnimationPausedKey.self] }
        set { self[AnimationPausedKey.self] = newValue }
    }
}

struct PausableAnimationView: View {
    @State private var paused = false

    var body: some View {
        VStack {
            ...
        }
        .environment(\.animationPaused, paused)
    }
}
```

然后，自定义动画 `PausableAnimation` 使用 `environment` 属性从视图的环境中检索暂停状态：

```swift
struct PausableAnimation: CustomAnimation {
    func animate<V>(value: V, time: TimeInterval, context: inout AnimationContext<V>) -> V? where V : VectorArithmetic {
        let paused = context.environment.animationPaused
        ...
    }
}
```


## `AnimationState`

用于存储自定义动画状态的容器。

```swift
struct AnimationState<Value> where Value : VectorArithmetic
```

`AnimationContext` 使用此类型为 `CustomAnimation` 存储状态。要检索上下文存储的状态，可以使用 `state` 属性。但是，访问动画状态的更方便的方法是定义一个 `AnimationStateKey`，并使用计算属性扩展 `AnimationContext` 以获取和设置动画状态，如下所示代码所示：


```swift
private struct PausableState<Value: VectorArithmetic>: AnimationStateKey {
    static var defaultValue: Self { .init() }
}


extension AnimationContext {
    fileprivate var pausableState: PausableState<Value> {
        get { state[PausableState<Value>.self] }
        set { state[PausableState<Value>.self] = newValue }
    }
}
```

在创建 `AnimationStateKey` 时，方便的是定义自定义动画所需的状态值。例如，以下代码向 `PausableState` 动画状态键添加了 `paused` 和 `pauseTime` 属性：


```swift
private struct PausableState<Value: VectorArithmetic>: AnimationStateKey {
    var paused = false
    var pauseTime: TimeInterval = 0.0


    static var defaultValue: Self { .init() }
}
```

要在 `PausableAnimation` 中访问可暂停状态，可以使用以下代码调用 `pausableState`，而不是使用上下文的 `state` 属性。由于动画状态键 `PausableState` 为状态值定义了属性，因此自定义动画可以读取和写入这些值。

```swift
struct PausableAnimation: CustomAnimation {
    let base: Animation

    func animate<V>(value: V, time: TimeInterval, context: inout AnimationContext<V>) -> V? where V : VectorArithmetic {
        let paused = context.environment.animationPaused

        let pausableState = context.pausableState
        var pauseTime = pausableState.pauseTime
        if pausableState.paused != paused {
            pauseTime = time - pauseTime
            context.pausableState = PausableState(paused: paused, pauseTime: pauseTime)
        }

        let effectiveTime = paused ? pauseTime : time - pauseTime
        let result = base.animate(value: value, time: effectiveTime, context: &context)
        return result
    }
}
```

### Storing state for secondary animations

自定义动画还可以使用 `AnimationState` 存储次要动画的状态。例如，以下代码创建了一个 `AnimationStateKey`，其中包含 `secondaryState` 属性，自定义动画可以使用该属性存储其他状态：

```swift
private struct TargetState<Value: VectorArithmetic>: AnimationStateKey {
    var timeDelta = 0.0
    var valueDelta = Value.zero
    var secondaryState: AnimationState<Value>? = .init()

    static var defaultValue: Self { .init() }
}

extension AnimationContext {
    fileprivate var targetState: TargetState<Value> {
        get { state[TargetState<Value>.self] }
        set { state[TargetState<Value>.self] = newValue }
    }
}
```

自定义动画 `TargetAnimation` 使用 `TargetState` 在 `secondaryState` 中存储状态数据，用于作为目标动画一部分运行的另一个动画。

```swift
struct TargetAnimation: CustomAnimation {
    var base: Animation
    var secondary: Animation


    func animate<V: VectorArithmetic>(value: V, time: Double, context: inout AnimationContext<V>) -> V? {
        var targetValue = value
        if let secondaryState = context.targetState.secondaryState {
            var secondaryContext = context
            secondaryContext.state = secondaryState
            let secondaryValue = value - context.targetState.valueDelta
            let result = secondary.animate(
                value: secondaryValue, time: time - context.targetState.timeDelta,
                context: &secondaryContext)
            if let result = result {
                context.targetState.secondaryState = secondaryContext.state
                targetValue = result + context.targetState.valueDelta
            } else {
                context.targetState.secondaryState = nil
            }
        }
        let result = base.animate(value: targetValue, time: time, context: &context)
        if let result = result {
            targetValue = result
        } else if context.targetState.secondaryState == nil {
            return nil
        }
        return targetValue
}


    func shouldMerge<V: VectorArithmetic>(previous: Animation, value: V, time: Double, context: inout AnimationContext<V>) -> Bool {
        guard let previous = previous.base as? Self else { return false }
        var secondaryContext = context
        if let secondaryState = context.targetState.secondaryState {
            secondaryContext.state = secondaryState
            context.targetState.valueDelta = secondary.animate(
                value: value, time: time - context.targetState.timeDelta,
                context: &secondaryContext) ?? value
        } else {
            context.targetState.valueDelta = value
        }
        // Reset the target each time a merge occurs.
        context.targetState.secondaryState = .init()
        context.targetState.timeDelta = time
        return base.shouldMerge(
            previous: previous.base, value: value, time: time,
            context: &context)
    }
}
```

## `UnitCurve`

由二维曲线定义的函数，将输入进度（范围为 $[0,1]$ ）映射到输出进度，输出进度也在范围 $[0,1]$ 内。通过改变曲线的形状，可以改变动画或其他插值的有效速度。

```swift
struct UnitCurve
```

水平（ $x$ ）轴定义输入进度：评估曲线时，必须提供范围为 $[0,1]$ 的单个输入进度值。

垂直（ $y$ ）轴映射到输出进度：评估曲线时，返回与输入进度相交的点的 $y$ 分量。


- `linear`: 由于线性曲线是从 $(0,0)$ 到 $(1,1)$ 的一条直线，输出进度始终等于输入进度，速度始终等于 $1.0$。
- `easeIn`: 一条贝塞尔曲线，开始时缓慢，然后在结束时加速。起始和结束控制点位于 $(x: 0.42, y: 0)$ 和 $(x: 1, y: 1)$。
- `easeOut`: 一条贝塞尔曲线，开始时很快，然后在接近结束时减慢。起始和结束控制点位于 $(x: 0, y: 0)$ 和 $(x: 0.58, y: 1)$。
- `easeInOut`: 一条贝塞尔曲线，开始时缓慢，在中间加速，然后在接近结束时再次减慢。起始和结束控制点位于 $(x: 0.42, y: 0)$ 和 $(x: 0.58, y: 1)$。
- `circularEaseIn`: 一条开始缓慢，然后在结束时加速的曲线。曲线的形状等于单位圆的第四象限（右下象限）。
- `circularEaseOut`: 一条圆形曲线，开始时很快，然后在接近结束时减慢。曲线的形状等于单位圆的第二象限（左上角）。
- `circularEaseInOut`: 一条圆形曲线，开始时缓慢，在中间加速，然后在接近结束时再次减慢。曲线的形状由圆形缓入和圆形缓出的分段组合定义。
- `bezier(startControlPoint:endControlPoint:)`: 使用贝塞尔控制点创建新曲线。在评估曲线时，控制点的 $x$ 分量被钳制在范围 $[0,1]$ 内。
    - `startControlPoint`：与曲线起点 $(0,0)$ 相关联的三次贝塞尔控制点。从起点到其控制点的切线向量定义了计时函数的初始速度。
    - `endControlPoint`：与曲线终点 $(1,1)$ 相关联的三次贝塞尔控制点。从终点到其控制点的切线向量定义了计时函数的最终速度。
- `inverse`: 返回曲线的副本，其 $x$ 和 $y$ 分量交换。逆函数可用于反向求解曲线：给定已知的输出（ $y$ ）值，可以通过使用逆函数找到相应的输入（ $x$ ）值：
    ```swift
    let curve = UnitCurve.easeInOut

    /// The input time for which an easeInOut curve returns 0.6.
    let inputTime = curve.inverse.evaluate(at: 0.6)
    ```

## `Spring`

弹簧运动的一种表示。

```swift
struct Spring
```

使用此类型在不同的弹簧参数表示之间进行转换：

```swift
let spring = Spring(duration: 0.5, bounce: 0.3)
let (mass, stiffness, damping) = (spring.mass, spring.stiffness, spring.damping)
// (1.0, 157.9, 17.6)


let spring2 = Spring(mass: 1, stiffness: 100, damping: 10)
let (duration, bounce) = (spring2.duration, spring2.bounce)
// (0.63, 0.5)
```

你还可以使用它来查询给定输入集的弹簧位置及其其他属性：

```swift
func unitPosition(time: TimeInterval) -> Double {
    let spring = Spring(duration: 0.5, bounce: 0.3)
    return spring.position(target: 1.0, time: time)
}
```

### `init(duration:bounce:)`

创建一个具有指定持续时间和弹跳的弹簧。

```swift
init(
    duration: TimeInterval = 0.5,
    bounce: Double = 0.0
)
```

- `duration`：定义弹簧的速度。这大约等于稳定时间，但对于具有非常大弹跳值的弹簧，将是弹簧振荡周期的持续时间。
- `bounce`：弹簧的弹性应该有多大。值为 $0$ 表示没有弹跳（临界阻尼弹簧），正值表示越来越多的弹性，最大值为 $1.0$（对应无阻尼振荡），负值表示过阻尼弹簧，最小值为 $-1.0$。

### `init(mass:stiffness:damping:allowOverDamping:)`

创建一个具有指定质量、刚度和阻尼的弹簧。


```swift
init(
    mass: Double = 1.0,
    stiffness: Double,
    damping: Double,
    allowOverDamping: Bool = false
)
```

- `mass` ：指定连接到弹簧末端的物体的该属性。
- `stiffness` ：相应的弹簧系数。
- `damping` ：定义由于摩擦力的作用，弹簧的运动应该如何衰减。
- `allowOverdamping` ：值为 `true` 表示在适当的情况下应允许过阻尼，根据其他输入，值为 `false` 表示此类情况应视为临界阻尼。

### `init(response:dampingRatio:)`

创建一个具有指定响应和阻尼比的弹簧。

```swift
init(
    response: Double,
    dampingRatio: Double
)
```

- `response` ：将弹簧的刚度定义为近似的秒持续时间。
- `dampingRatio` ：将施加的阻力量定义为产生临界阻尼所需量的一小部分。

### `init(settlingDuration:dampingRatio:epsilon:)`

创建一个具有指定持续时间和阻尼比的弹簧。

```swift
init(
    settlingDuration: TimeInterval,
    dampingRatio: Double,
    epsilon: Double = 0.001
)
```

- `settlingDuration` ：弹簧静止所需的大致时间。
- `dampingRatio` ：作为产生临界阻尼所需量的一小部分施加的阻力量。
- `epsilon` ：在弹簧被认为已稳定之前，所有后续值需要多小的阈值。