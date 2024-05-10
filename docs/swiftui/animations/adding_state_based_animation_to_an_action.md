# Adding state-based animation to an action

## `withAnimation(_:_:)`

返回使用提供的动画重新计算视图主体的结果。

```swift
func withAnimation<Result>(
    _ animation: Animation? = .default,
    _ body: () throws -> Result
) rethrows -> Result
```

此函数将给定的动画设置为线程当前事务的动画属性。

## `withAnimation(_:completionCriteria:_:completion:)`

此方法重新计算视图的主体，并采用所提供的动画，然后在所有动画完成时运行完成闭包。它返回一个结果，该结果反映了使用指定动画重新布局后视图的状态。此过程确保视图的外观平滑过渡到新状态，同时允许你在所有相关动画结束时执行额外的操作或回调。

```swift
func withAnimation<Result>(
    _ animation: Animation? = .default,
    completionCriteria: AnimationCompletionCriteria = .logicallyComplete,
    _ body: () throws -> Result,
    completion: @escaping () -> Void
) rethrows -> Result
```

此函数将给定的动画设置为线程当前事务的动画属性，并使用指定的完成回调调用 `Transaction` / `addAnimationCompletion`。

完成回调将始终被调用一次。如果主体中的更改没有创建任何动画，那么回调将在主体执行后立即被调用。

## AnimationCompletionCriteria

判定动画完成的条件。

### `logicallyComplete`

动画已经逻辑上完成了，但可能仍处于其长尾阶段。

如果随后发生更改，在具有逻辑上已完成（ `logicallyComplete` ）完成回调属性上创建了更多动画，那么这些回调将在与之注册的更改所产生的动画逻辑上完成时触发，忽略新动画。这意味着，即使在这些回调注册后有新的动画开始，它们也只关注自己最初注册时关联的那组动画的完成状态，而不会响应之后新增动画的事件。


### `removed`

整个动画已结束，现在将被移除。

如果之后发生更改，导致在已注册了移除完成回调的属性上创建了更多动画，那么这些回调仅在所有创建的动画都完成后才会触发。


## `Animation`

视图随时间变化的方式，以实现从一个状态到另一个状态的平滑视觉过渡。

```swift
@frozen
struct Animation
```

动画在视图的状态值从一个值变为另一个值时，提供了视图的视觉过渡效果。这种过渡的特性根据动画类型的不同而变化。例如，线性动画因为从开始到结束速度保持一致，所以给动画提供了一种机械感。相比之下，使用缓动（如 `easeOut` ）的动画通过改变动画的加速度，提供了更加自然的感觉。

为了将动画应用到视图上，需添加 `animation(_:value:)` 修饰符，并指定动画类型及要动画化的值。例如，以下代码中的 `Circle` 视图在每次状态变量 `scale` 改变时，都会执行一次 `easeIn` 动画：

```swift
struct ContentView: View {
    @State private var scale = 0.5


    var body: some View {
        VStack {
            Circle()
                .scaleEffect(scale)
                .animation(.easeIn, value: scale)
            HStack {
                Button("+") { scale += 0.1 }
                Button("-") { scale -= 0.1 }
            }
        }
        .padding()
    }
}
```

<video src="../../video/Animation.mp4" controls="controls"></video>

当 `scale` 的值发生改变时，修饰符 `scaleEffect(_:anchor:)` 会根据新值来调整 `Circle` 的大小。SwiftUI 能够动画化尺寸之间的转换，原因在于 `Circle` 遵循了 `Shape` 协议。在SwiftUI中，形状（ `Shapes` ）遵循 `Animatable` 协议，该协议描述了如何对视图的属性进行动画处理。

除了向视图添加动画之外，还可以通过对动画类型应用动画修饰符来自定义动画的行为。例如，你可以：

- 使用 `delay(_:)` 修饰符延迟动画的开始。
- 使用 `repeatCount(_:autoreverses:)` 或 `repeatForever(autoreverses:)` 修饰符重复动画。
- 使用 `speed(_:)` 修饰符改变动画的速度。

例如，以下代码中的 `Circle` 视图使用了 `repeatCount(_:autoreverses:)` 修饰符，使得 `easeIn` 动画重复三次：

```swift
struct ContentView: View {
    @State private var scale = 0.5

    var body: some View {
        VStack {
            Circle()
                .scaleEffect(scale)
                .animation(.easeIn.repeatCount(3), value: scale)
            HStack {
                Button("+") { scale += 0.1 }
                Button("-") { scale -= 0.1 }
            }
        }
        .padding()
    }
}
```
<video src="../../video/AnimationRepeatCount.mp4" controls="controls"></video>

一个视图也可以在绑定值发生改变时执行动画。为了指定绑定上的动画类型，可以调用其 `animation(_:)` 方法。例如，以下代码中的视图执行了一种线性动画，使箱子卡车在视图的领先边缘和尾随边缘之间移动。每当有人点击「切换」控件，从而改变 `$isTrailing` 绑定的值时，卡车就会移动。

```swift
struct ContentView: View {
    @State private var isTrailing = false


    var body: some View {
        VStack(alignment: isTrailing ? .trailing : .leading) {
            Image(systemName: "box.truck")
                .font(.system(size: 64))


            Toggle("Move to trailing edge",
                isOn: $isTrailing.animation(.linear))
        }
    }
}
```

<video src="../../video/AnimationBinding.mp4" controls="controls"></video>

### `default`

一个默认动画实例。

默认动画为 `spring(response:dampingFraction:blendDuration:)`，其参数设置为：

- `response` 等于 $0.55$
- `dampingFraction` 等于 $1.0$
- `blendDuration` 等于 $0.0$

在 iOS 17、macOS 14、tvOS 17 和 watchOS 10 之前，默认动画为 `easeInOut`。

全局函数 `withAnimation(:)` 在你未提供特定动画时会使用此默认动画。例如，下面的代码示例展示了如何使用默认动画，在每次点击「Animate」按钮时翻转显示文字 `Hello`。

```swift
truct ContentView: View {
    @State private var degrees = Double.zero

    var body: some View {
        VStack {
            Spacer()
            Text("Hello")
                .font(.largeTitle)
                .rotation3DEffect(.degrees(degrees), axis: (x: 0, y: 1, z: 0))


            Spacer()
            Button("Animate") {
                withAnimation {
                    degrees = (degrees == .zero) ? 180 : .zero
                }
            }
        }
    }
}
```
<video src="../../video/AnimationDefault.mp4" controls="controls"></video>

若要在添加 `animation(_:value:)` 视图修饰符时使用默认动画，需明确指定该动画类型。例如，下面的代码展示了一个示例，每当用户点击「Animate」按钮时，使用默认动画来旋转显示文字 `Hello`。


```swift
struct ContentView: View {
    @State private var degrees = Double.zero


    var body: some View {
        VStack {
            Spacer()
            Text("Hello")
                .font(.largeTitle)
                .rotationEffect(.degrees(degrees))
                .animation(.default, value: degrees)


            Spacer()
            Button("Animate") {
                degrees = (degrees == .zero) ? 360 : .zero
            }
        }
    }
}
```
<video src="../../video/AnimationDefaultStatic.mp4" controls="controls"></video>

一个默认动画实例仅与其它默认动画实例相等（通过 `==` 比较），即便其他动画实例的设置与默认动画完全相同，它们也不相等。例如，如果你使用 `spring(response:dampingFraction:blendDuration:)` 方法创建了一个动画，并且所使用的参数值与默认动画相同，这个动画仍然不会等于默认动画。这种行为使得你可以区分出那些是你特意选择的动画和那些采用系统默认动画的情况。

### `linear`

匀速运动的动画。

线性动画因其从动画开始到结束速度保持一致，而给运动带来一种机械感。这种恒定的速度使得线性动画非常适合用于那些速度变化可能会显得不自然的对象运动动画，比如活动指示器的动画。

下面是一个使用线性动画示例的代码，演示了如何使一个圆圈在视图的领先边缘和尾随边缘之间移动的同时，其颜色也随着位置的变化而变化。

```swift
struct ContentView: View {
    @State private var isActive = false


    var body: some View {
        VStack(alignment: isActive ? .trailing : .leading) {
            Circle()
                .fill(isActive ? Color.red : Color.blue)
                .frame(width: 50, height: 50)


            Button("Animate") {
                withAnimation(.linear) {
                    isActive.toggle()
                }
            }
            .frame(maxWidth: .infinity)
        }
    }
}
```
<video src="../../video/AnimationLinear.mp4" controls="controls"></video>

线性动画的默认持续时间为 $0.35$ 秒。如需指定不同的持续时间，请使用 `linear(duration:)`。


### `linear(duration:)`

在特定持续时间内以恒定速度移动的动画。

线性动画给运动带来一种机械感，因为它的速度从动画开始到结束都是一致的。这种恒定的速度使线性动画非常适合为物体的运动进行动画制作，在这种情况下，速度的变化可能会让人感到尴尬，比如活动指示器。

当你想指定动画完成所需的时间时，使用 `linear(duration:)`。否则，使用 `linear` 来执行默认时长的动画。

以下代码展示了一个使用持续两秒的线性动画的示例，该动画用于在视图的前缘和后缘之间移动的圆的运动。当圆在视图中移动时，它的颜色也从红色动画到蓝色。

```swift
struct ContentView: View {
    @State private var isActive = false


    var body: some View {
        VStack(alignment: isActive ? .trailing : .leading) {
            Circle()
                .fill(isActive ? Color.red : Color.blue)
                .frame(width: 50, height: 50)


            Button("Animate") {
                withAnimation(.linear(duration: 2.0)) {
                    isActive.toggle()
                }
            }
            .frame(maxWidth: .infinity)
        }
    }
}
```
<video src="../../video/AnimationLinearDuration.mp4" controls="controls"></video>

### `easeIn`

一种动画，它开始时速度较慢，然后在运动结束时逐渐加快速度。

缓动动画通过改变动画的加速和减速，为运动提供一种自然的感觉，这与现实中事物的运动方式相匹配。在缓入动画中，运动开始时速度较慢，然后逐渐加快速度直至结束。

缓入动画的默认持续时间为 $0.35$ 秒。要指定不同的持续时间，使用 `easeIn(duration:)`。

以下代码展示了一个使用缓入动画来动画化圆形大小变化的示例。

```swift
struct ContentView: View {
    @State private var scale = 0.5


    var body: some View {
        VStack {
            Circle()
                .scale(scale)
                .animation(.easeIn, value: scale)
            HStack {
                Button("+") { scale += 0.1 }
                Button("-") { scale -= 0.1 }
            }
        }
    }
}
```
<video src="../../video/AnimationEaseIn.mp4" controls="controls"></video>



### `easeOut`

一种动画，它开始时速度较快，然后在运动结束时逐渐减慢速度。

缓动动画通过改变动画的加速度和减速度来提供具有自然感觉的运动，这与现实中事物的运动方式相匹配。对于缓出动画，运动开始得很快，然后在接近结束时减慢速度。

缓出动画的默认持续时间为 $0.35$ 秒。要指定不同的持续时间，可以使用 `easeOut(duration:)`。

以下代码展示了一个使用缓出动画来对圆形的大小变化进行动画处理的示例。

```swift
struct ContentView: View {
    @State private var scale = 0.5


    var body: some View {
        VStack {
            Circle()
                .scale(scale)
                .animation(.easeOut, value: scale)
            HStack {
                Button("+") { scale += 0.1 }
                Button("-") { scale -= 0.1 }
            }
        }
    }
}
```
<video src="../../video/AnimationEaseOut.mp4" controls="controls"></video>



### `easeInOut`

一种结合了缓入和缓出行为的动画。

缓动动画通过改变动画的加速度和减速度来提供具有自然感觉的运动，这与事物在现实中倾向于移动的方式相匹配。缓入缓出动画开始缓慢，在中途加快速度，最后在动画结束时减慢速度。

缓入缓出动画的默认持续时间为 $0.35$ 秒。要指定持续时间，请使用 `easeInOut(duration:)`方法。

以下代码显示了一个使用缓入缓出动画将圆形的大小变化动画化的示例。

```swift
struct ContentView: View {
    @State private var scale = 0.5

    var body: some View {
        VStack {
            Circle()
                .scale(scale)
                .animation(.easeInOut, value: scale)
            HStack {
                Button("+") { scale += 0.1 }
                Button("-") { scale -= 0.1 }
            }
        }
    }
}
```
<video src="../../video/AnimationEaseInOut.mp4" controls="controls"></video>

### `bouncy`

具有预定义持续时间和更高反弹量的弹簧动画。

### `bouncy(duration:extraBounce:)`

具有预定义持续时间和可调整的更高反弹量的弹簧动画。

```swift
static func bouncy(
    duration: TimeInterval = 0.5,
    extraBounce: Double = 0.0
) -> Animation
```

- `duration`: 感知持续时间，它定义了弹簧的节奏。这大致等于稳定持续时间，但对于非常有弹性的弹簧，它将是弹簧振荡周期的持续时间。
- `extraBounce`: 应该在 $0.3$ 的基本反弹量上增加多少额外的反弹量。
- `blendDuration`: 在多少秒内对持续时间的变化进行插值。

```swift
struct ContentView: View {

    @State private var scale = 0.5

    var body: some View {
        VStack {
            Circle()
                .scale(scale)
                .animation(.bouncy, value: scale)
            HStack {
                Button("+") { scale += 0.5 }
                Button("-") { scale -= 0.5 }
            }.font(.largeTitle)
        }
    }
}

```
<video src="../../video/AnimationBouncy.mp4" controls="controls"></video>

### `smooth`

具有预定义持续时间且无反弹的平滑弹簧动画。

### `smooth(duration:extraBounce:)`

具有预定义持续时间和可调整的无反弹的平滑弹簧动画。

```swift
static func smooth(
    duration: TimeInterval = 0.5,
    extraBounce: Double = 0.0
) -> Animation
```

- `duration`: 感知持续时间，它定义了弹簧的节奏。这大致等于稳定持续时间，但对于非常有弹性的弹簧，它将是弹簧振荡周期的持续时间。
- `extraBounce`: 应该在 $0$ 的基本反弹量上增加多少额外的反弹量。
- `blendDuration`: 在多少秒内对持续时间的变化进行插值。


### `snappy`

具有预定义持续时间和少量反弹的弹簧动画，感觉更加敏捷。

### `snappy(duration:extraBounce:)`

具有预定义持续时间和少量反弹，感觉更加敏捷且可调整的弹簧动画。

```swift
static func snappy(
    duration: TimeInterval = 0.5,
    extraBounce: Double = 0.0
) -> Animation
```

- `duration`: 感知持续时间，它定义了弹簧的节奏。这大致等于稳定持续时间，但对于非常有弹性的弹簧，它将是弹簧振荡周期的持续时间。
- `extraBounce`: 应该在 $0.15$ 的基本反弹量上增加多少额外的反弹量。
- `blendDuration`: 在多少秒内对持续时间的变化进行插值。

### `spring`

一个持久的弹簧动画。当与同一属性上的其他 `spring()` 或 `interactiveSpring()` 动画混合时，每个动画将被其后续动画替换，同时在动画之间保留速度。还可以选择在一段时间内混合弹簧之间的响应值。


### `spring(_:blendDuration:)`

一个持久的弹簧动画。当与同一属性上的其他 `spring()` 或 `interactiveSpring()` 动画混合时，每个动画将被其后续动画替换，同时在动画之间保留速度。还可以选择在一段时间内混合弹簧之间的响应值。

```swift
static func spring(
    _ spring: Spring,
    blendDuration: TimeInterval = 0.0
) -> Animation
```

- `blendDuration`: 在多少秒内对持续时间的变化进行插值。

### `spring(duration:bounce:blendDuration:)`

一个持久的弹簧动画。当与同一属性上的其他 `spring()` 或 `interactiveSpring()` 动画混合时，每个动画将被其后续动画替换，同时在动画之间保留速度。还可以选择在一段时间内混合弹簧之间的响应值。

```swift
static func spring(
    duration: TimeInterval = 0.5,
    bounce: Double = 0.0,
    blendDuration: Double = 0
) -> Animation
```

- `duration`：感知持续时间，定义了弹簧的节奏。这大致等于稳定持续时间，但对于非常有弹性的弹簧，它将是弹簧振荡周期的持续时间。
- `bounce`：弹簧的弹性程度。值为 $0$ 表示没有反弹（临界阻尼弹簧），正值表示增加的反弹量，最大值为 $1.0$（对应于无阻尼振荡），负值表示过度阻尼弹簧，最小值为 $-1.0$。
- `blendDuration`：在多少秒内对持续时间的变化进行插值。


### `spring(response:dampingFraction:blendDuration:)`

一个持久的弹簧动画。当与同一属性上的其他 `spring()` 或 `interactiveSpring()` 动画混合时，每个动画将被其后续动画替换，同时在动画之间保留速度。还可以选择在一段时间内混合弹簧之间的响应值。


```swift
static func spring(
    response: Double = 0.5,
    dampingFraction: Double = 0.825,
    blendDuration: TimeInterval = 0
) -> Animation
```

- `response`：弹簧的硬度，定义为大致的持续时间（以秒为单位）。值为 $0$ 表示请求一个无限硬的弹簧，适用于驱动交互动画。
- `dampingFraction`：应用于正在动画的值的阻力量，作为产生临界阻尼所需量的估计值的一部分。
- `blendDuration`：在多少秒内对弹簧响应值的变化进行插值。


### `interactiveSpring`

一种弹簧动画的便利构造器，具有较低的持续时间值，旨在驱动交互动画。

### `interactiveSpring(response:dampingFraction:blendDuration:)`

一种弹簧动画的便利构造器，具有较低的持续时间值，旨在驱动交互动画。

```swift
static func interactiveSpring(
    response: Double = 0.15,
    dampingFraction: Double = 0.86,
    blendDuration: TimeInterval = 0.25
) -> Animation
```


### `interpolatingSpring`

一种插值弹簧动画，它使用阻尼弹簧模型产生范围在 $[0,1]$ 内的值，然后这些值用于在动画属性的 $[from, to]$ 范围内进行插值。通过添加每个动画的效果来保留重叠动画之间的速度。


### `interpolatingSpring(_:initialVelocity:)`

一种使用阻尼弹簧模型的插值弹簧动画，可产生介于 1 到 0 之间的值。

```swift
static func interpolatingSpring(
    _ spring: Spring,
    initialVelocity: Double = 0.0
) -> Animation
```

### `interpolatingSpring(duration:bounce:initialVelocity:)`

一种插值弹簧动画，它使用阻尼弹簧模型产生范围在 $[0,1]$ 内的值，然后这些值用于在动画属性的 $[from, to]$ 范围内进行插值。通过添加每个动画的效果来保留重叠动画之间的速度。

```swift
static func interpolatingSpring(
    duration: TimeInterval = 0.5,
    bounce: Double = 0.0,
    initialVelocity: Double = 0.0
) -> Animation
```

- `duration`：感知持续时间，定义了弹簧的节奏。这大致等于稳定持续时间，但对于非常有弹性的弹簧，它将是弹簧振荡周期的持续时间。
- `bounce`：弹簧的弹性程度。值为 $0$ 表示没有反弹（临界阻尼弹簧），正值表示增加的反弹量，最大值为 $1.0$（对应于无阻尼振荡），负值表示过度阻尼弹簧，最小值为 $-1.0$。
- `initialVelocity`：弹簧的初始速度，作为范围在 $[0,1]$ 内的值，表示正在动画的值的幅度。

### `interpolatingSpring(mass:stiffness:damping:initialVelocity:)`

一种插值弹簧动画，它使用阻尼弹簧模型产生范围在 $[0,1]$ 内的值，然后这些值用于在动画属性的 $[from, to]$ 范围内进行插值。通过添加每个动画的效果来保留重叠动画之间的速度。

```swift
static func interpolatingSpring(
    mass: Double = 1.0,
    stiffness: Double,
    damping: Double,
    initialVelocity: Double = 0.0
) -> Animation
```

- `mass`：连接到弹簧上的物体的质量。
- `stiffness`：弹簧的硬度。
- `damping`：弹簧的阻尼值。
- `initialVelocity`：弹簧的初始速度，作为范围在 $[0,1]$ 内的值，表示正在动画的值的幅度。

### `timingCurve(_:duration:)`

创建一个速度由给定曲线控制的新动画。

```swift
static func timingCurve(
    _ curve: UnitCurve,
    duration: TimeInterval
) -> Animation
```

- `timingCurve`：描述动画在其持续时间内速度的曲线。
- `duration`：动画的持续时间，以秒为单位。
### `timingCurve(_:_:_:_:duration:)`

一个由三次贝塞尔定时曲线创建的动画。

```swift
static func timingCurve(
    _ p1x: Double,
    _ p1y: Double,
    _ p2x: Double,
    _ p2y: Double,
    duration: TimeInterval = 0.35
) -> Animation
```

- `p1x`：三次贝塞尔曲线的第一个控制点的 $x$ 坐标。
- `p1y`：三次贝塞尔曲线的第一个控制点的 $y$ 坐标。
- `p2x`：三次贝塞尔曲线的第二个控制点的 $x$ 坐标。
- `p2y`：三次贝塞尔曲线的第二个控制点的 $y$ 坐标。
- `duration`：动画完成所需的时间，以秒为单位。


### `delay(_:)`

将动画的开始延迟指定的秒数。


```swift
func delay(_ delay: TimeInterval) -> Animation
```

使用此方法延迟动画的开始。例如，以下代码对两个胶囊的高度变化进行动画处理。第一个胶囊的动画立即开始。但是，第二个胶囊的动画要到半秒后才开始。

```swift
struct ContentView: View {
    @State private var adjustBy = 100.0


    var body: some View {
        VStack(spacing: 40) {
            HStack(alignment: .bottom) {
                Capsule()
                    .frame(width: 50, height: 175 - adjustBy)
                    .animation(.easeInOut, value: adjustBy)
                Capsule()
                    .frame(width: 50, height: 175 + adjustBy)
                    .animation(.easeInOut.delay(0.5), value: adjustBy)
            }


            Button("Animate") {
                adjustBy *= -1
            }
        }
    }
}
```
<video src="../../video/AnimationDelay.mp4" controls="controls"></video>

### `repeatCount(_:autoreverses:)`

将动画重复特定的次数。

```swift
func repeatCount(
    _ repeatCount: Int,
    autoreverses: Bool = true
) -> Animation
```

- `repeatCount`：动画重复的次数。当 `autoreverse` 为 `false` 时，每次重复的序列都从开头开始。
- `autoreverses`：一个布尔值，指示动画序列在向前播放后是否反向播放。`autoreverse` 会计算到 `repeatCount` 中。例如，`repeatCount` 为 $1$ 时，动画向前播放一次，但即使 `autoreverse` 为 `true`，它也不会反向播放。当 `autoreverse` 为 `true` 且 `repeatCount` 为 $2$ 时，动画先向前移动，然后反向移动，然后停止。

使用此方法将动画重复特定次数。例如，在以下代码中，动画将卡车从视图的一侧移动到另一侧。它将此动画重复三次。

```swift
struct ContentView: View {
    @State private var driveForward = true


    private var driveAnimation: Animation {
        .easeInOut
        .repeatCount(3, autoreverses: true)
        .speed(0.5)
    }


    var body: some View {
        VStack(alignment: driveForward ? .leading : .trailing, spacing: 40) {
            Image(systemName: "box.truck")
                .font(.system(size: 48))
                .animation(driveAnimation, value: driveForward)


            HStack {
                Spacer()
                Button("Animate") {
                    driveForward.toggle()
                }
                Spacer()
            }
        }
    }
}
```

<video src="../../video/AnimationRepeatCountCar.mp4" controls="controls"></video>

动画第一次运行时，卡车从视图的前缘移动到后缘。动画第二次运行时，卡车从后缘移动到前缘，因为 `autoreverse` 为 `true`。如果 `autoreverse` 为 `false`，卡车会在移动到后缘之前跳回前缘。动画第三次运行时，卡车从视图的前缘移动到后缘。


### `repeatForever(autoreverses:)`

在包含动画的视图的生命周期内重复动画。

```swift
func repeatForever(autoreverses: Bool = true) -> Animation
```

使用此方法重复动画，直到视图实例不再存在，或者视图的显式或结构标识更改。例如，以下代码在视图的生命周期内不断旋转齿轮符号。

```swift
struct ContentView: View {
    @State private var rotationDegrees = 0.0


    private var animation: Animation {
        .linear
        .speed(0.1)
        .repeatForever(autoreverses: false)
    }


    var body: some View {
        Image(systemName: "gear")
            .font(.system(size: 86))
            .rotationEffect(.degrees(rotationDegrees))
            .onAppear {
                withAnimation(animation) {
                    rotationDegrees = 360.0
                }
            }
    }
}

```
<video src="../../video/AnimationRepeatForever.mp4" controls="controls"></video>

### `speed(_:)`

通过调整速度来更改动画的持续时间。

```swift
func speed(_ speed: Double) -> Animation
```

设置动画的速度会以速度因子改变动画的持续时间。较高的速度值会导致较快的动画序列，因为持续时间较短。例如，速度为 $2.0$ 的一秒动画会在一半的时间（半秒）内完成。

```swift
struct ContentView: View {
    @State private var adjustBy = 100.0


    private var oneSecondAnimation: Animation {
    .easeInOut(duration: 1.0)
    }


    var body: some View {
        VStack(spacing: 40) {
            HStack(alignment: .bottom) {
                Capsule()
                    .frame(width: 50, height: 175 - adjustBy)
                Capsule()
                    .frame(width: 50, height: 175 + adjustBy)
            }
            .animation(oneSecondAnimation.speed(2.0), value: adjustBy)


            Button("Animate") {
                adjustBy *= -1
            }
        }
    }
}
```
<video src="../../video/AnimationSpeed.mp4" controls="controls"></video>

将速度设置为较低的数字会减慢动画，延长其持续时间。例如，速度为 $0.25$ 的一秒动画需要四秒才能完成。

```swift
struct ContentView: View {
    @State private var adjustBy = 100.0


    private var oneSecondAnimation: Animation {
    .easeInOut(duration: 1.0)
    }


    var body: some View {
        VStack(spacing: 40) {
            HStack(alignment: .bottom) {
                Capsule()
                    .frame(width: 50, height: 175 - adjustBy)
                Capsule()
                    .frame(width: 50, height: 175 + adjustBy)
            }
            .animation(oneSecondAnimation.speed(0.25), value: adjustBy)


            Button("Animate") {
                adjustBy *= -1
            }
        }
    }
}

```

<video src="../../video/AnimationSpeedSlow.mp4" controls="controls"></video>


