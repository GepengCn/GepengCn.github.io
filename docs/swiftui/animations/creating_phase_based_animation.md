# Creating phase-based animation

## Controlling the timing and movements of your animations

使用相位和关键帧动画器构建你可以控制的复杂动画。

SwiftUI 提供了一系列可在应用程序中使用的有用动画。这些动画通过提供视图和用户界面元素的视觉转换，有助于增强应用程序的用户体验。虽然这些标准动画为增强应用程序的用户交互提供了一种很好的方式，但有时你需要对视觉元素的定时和移动有更多的控制。`PhaseAnimator` 和 `KeyframeAnimator` 可以帮助你获得这种控制。

相位动画器允许你将动画定义为称为相位的离散步骤的集合。动画器循环通过这些相位来创建视觉转换。使用关键帧动画器，你可以创建关键帧，这些关键帧在视觉转换期间的特定时间定义动画值。

### Create a simple bounce animation

要更好地理解如何使用 `PhaseAnimator` 或 `KeyframeAnimator` 创建动画，可以从一个使用标准 SwiftUI 动画的简单示例开始。以下代码通过将其偏移量设置为 `-200.0` 将一个表情符号向上移动。为了提供平滑的移动过渡，代码使用 `withAnimation(_:_:)` 函数在有人点击表情符号后应用一个弹性动画。


```swift
struct SimpleAnimationView: View {

    var emoji: String

    @State private var offset = 0.0

    var body: some View {
        Image(systemName: emoji)
            .symbolVariant(.fill)
            .font(.system(size: 144))
            .foregroundStyle(.red)
            .offset(y: offset)
            .onTapGesture {
                withAnimation(.bouncy) {
                    offset = -200
                }
            }
    }
}

#Preview {
    SimpleAnimationView(emoji: "heart")
}
```

<video src="../../video/SimpleAnimationOne.mp4" controls="controls"></video>


这个动画只有一个离散的步骤：将表情符号向上移动。但是，一个动画可以有多个步骤，例如将表情符号向上移动然后返回其原始位置。例如，以下代码将偏移量设置为 $-200.0$ 以将表情符号向上移动，然后将偏移量设置为 $0.0$ 以将表情符号返回到其原始位置：

```swift
struct SimpleAnimationView: View {
    var emoji: String
    @State private var offset = 0.0


    var body: some View {
        EmojiView(emoji: emoji)
            .offset(y: offset)
            .onTapGesture {
                withAnimation(.bouncy) {
                    offset = -200.0
                } completion: {
                    withAnimation {
                        offset = 0.0
                    }
                }
            }
    }
}
```

<video src="../../video/SimpleAnimationTwo.mp4" controls="controls"></video>


这段代码使用 `withAnimation(_:completionCriteria:_:completion:)` 函数来动画化视觉转换的两个步骤。第一步发生在函数的主体闭包中，将偏移量设置为 `-200.0`。第二步发生在完成闭包中，将偏移量设置为 `0.0`。

然而，`EmojiView` 实际上经历了三个步骤。第一步发生在视图第一次出现时。`EmojiView` 视图的偏移量为 $0.0$。当有人点击视图时，偏移量更改为 $-200.0$；这是第二步。当该动画完成时，第三步将偏移量更改回 $0.0$。但是，根据偏移量值（$0.0$ 和 $-200.0$），只有两个离散步骤。

虽然这种实现确实按预期工作，但使用 `PhaseAnimator` 是将离散步骤定义为动画阶段的更方便的方法。

### Bounce with a phase animator

`PhaseAnimator` 会自动遍历一组给定的阶段来创建动画过渡。使用 `phaseAnimator(_:content:animation:)` 修饰符为动画器提供用于更改动画值的阶段。例如，前面显示的 `emoji` 弹性动画有两个阶段：向上移动和向后移动。可以使用布尔值 `true` 和 `false` 表示这些阶段。当阶段为 `true` 时，`emoji` 向上移动到 $-200.0$。当阶段为 `false` 时，`emoji` 通过将偏移量设置为 $0.0$ 移回原始位置。

```swift
struct SimpleAnimationView: View {

    var emoji: String

    var body: some View {
        Image(systemName: emoji)
            .symbolVariant(.fill)
            .font(.system(size: 144))
            .foregroundStyle(.red)
            .phaseAnimator([false, true]) { content, phase in
                content.offset(y: phase ? -200.0 : 0.0)
            }
    }
}

#Preview {
    SimpleAnimationView(emoji: "heart")
}
```
<video src="../../video/PhaseAnimator.mp4" controls="controls"></video>


相位动画器按照你提供给 `phaseAnimator(_:content:animation:)` 修饰符的顺序循环遍历阶段列表。当视图首次出现时，相位动画器调用内容闭包并传入第一个阶段。然后，动画器使用第二个阶段的值调用闭包。动画器继续为每个额外的阶段调用内容闭包。到达最后一个阶段后，动画器再次使用第一个阶段的值调用内容闭包一次。

这意味着在前面的代码中，相位动画器在视图首次出现时使用阶段值 `false` 调用内容。这将 `emoji` 的偏移量设置为 $0.0$。然后，相位动画器使用 `true` 阶段调用内容。此阶段将偏移量设置为 $-200.0$，导致 emoji 向上移动。到达该偏移位置后，动画器使用 `false` 阶段调用内容。这会通过将其偏移量设置为 $0.0$ 使 `emoji` 返回到其原始位置。

此动画在视图出现时开始。要根据事件启动动画，请使用 `phaseAnimator(_:trigger:content:animation:)` 修饰符，并提供动画器观察更改的触发值。动画器在值更改时启动动画。例如，以下代码每次有人点击 `emoji` 时都会增加状态变量 `likeCount`。代码使用 `likeCount` 作为相位动画器观察更改的值。现在，每当有人点击 `emoji` 时，它都会向上移动并返回其原始位置。

```swift
struct SimpleAnimationView: View {

    var emoji: String

    @State private var likeCount = 1

    var body: some View {
        Image(systemName: emoji)
            .symbolVariant(.fill)
            .font(.system(size: 144))
            .foregroundStyle(.red)
            .phaseAnimator([false, true], trigger: likeCount) { content, phase in
                content.offset(y: phase ? -200.0 : 0.0)
            }
            .onTapGesture {
                likeCount += 1
            }
    }
}

#Preview {
    SimpleAnimationView(emoji: "heart")
}

```

<video src="../../video/PhaseAnimatorTrigger.mp4" controls="controls"></video>


到目前为止，相位动画器使用默认动画来移动 `emoji`。可以通过为相位动画器提供一个动画闭包来更改此行为。在此闭包中，为每个阶段指定要应用的动画类型。例如，以下代码在相位为 `true` 时应用弹性动画；否则，应用默认动画：

```swift
struct SimpleAnimationView: View {

    var emoji: String

    @State private var likeCount = 1

    var body: some View {
        Image(systemName: emoji)
            .symbolVariant(.fill)
            .font(.system(size: 144))
            .foregroundStyle(.red)
            .phaseAnimator([false, true], trigger: likeCount) { content, phase in
                content.offset(y: phase ? -200.0 : 0.0)
            } animation: { phase in
                phase ? .bouncy : .default
            }
            .onTapGesture {
                likeCount += 1
            }
    }
}

#Preview {
    SimpleAnimationView(emoji: "heart")
}
```

<video src="../../video/PhaseAnimatorEffect.mp4" controls="controls"></video>


### Add more phases to the animation

虽然这种弹跳效果很好，但你可以为它添加更多的活力。例如，你可以让 `emoji` 在向上移动时增大尺寸，然后缩小回正常尺寸。为此，你需要为动画添加第三个阶段：缩放。

要定义阶段，可以创建一个自定义类型，列出可能的阶段；例如：

```swift
private enum AnimationPhase: CaseIterable {
    case initial
    case move
    case scale
}
```

接下来，为了帮助简化逻辑和降低复杂性，可以定义计算属性来返回要动画化的值。例如，要设置垂直偏移来移动 `emoji`，可以创建一个计算属性，根据当前阶段返回偏移量：

```swift
private enum AnimationPhase: CaseIterable {
    case initial
    case move
    case scale

    var verticalOffset: Double {
        switch self {
        case .initial, .scale: 0
        case .move: -200
        }
    }
}
```

在初始和缩放阶段，偏移量为 $0$，这是 `emoji` 的原始屏幕位置。但是当阶段为移动时，偏移量为 $-200$。

可以使用相同的方法（创建计算属性）来实现缩放效果，以更改 `emoji` 的大小。最初和缩放阶段，`emoji` 以其原始大小显示，但在移动阶段会增大尺寸，如下所示：

```swift
private enum AnimationPhase: CaseIterable {
    case initial
    case move
    case scale

    var verticalOffset: Double {
        switch self {
        case .initial, .scale: 0
        case .move: -200
        }
    }

    var scaleEffect: Double {
        switch self {
        case .initial, .scale: 1
        case .move: 1.5
        }
    }
}
```

要对 `emoji` 进行动画处理，请将 `phaseAnimator(_:trigger:content:animation:)` 修饰符应用于 `EmojiView`。向动画器提供来自自定义 `AnimationPhase` 类型的所有情况。然后，根据阶段更改内容，方法是应用 `scaleEffect(_:anchor:)` 和 `offset(x:y:)` 修饰符。传递到这些修饰符中的值来自计算属性，这有助于使视图代码更具可读性。


```swift
Image(systemName: emoji)
    .symbolVariant(.fill)
    .font(.system(size: 144))
    .foregroundStyle(.red)
    .phaseAnimator(AnimationPhase.allCases, trigger: likeCount) { content, phase in
        content
            .scaleEffect(phase.scaleEffect)
            .offset(y: phase.verticalOffset)
    } animation: { phase in
        switch phase {
        case .initial: .smooth
        case .move: .easeInOut(duration: 0.3)
        case .scale: .spring(duration: 0.3, bounce: 0.7)
        }
    }
    .onTapGesture {
        likeCount += 1
    }
```

<video src="../../video/PhaseAnimatorMore.mp4" controls="controls"></video>

::: info
使用 Xcode 中的画布预览来帮助确定要为相位动画应用的动画类型和值。对代码进行更改，并在画布预览中看到这些更改。
:::

`PhaseAnimator` 使你能够根据离散的阶段控制动画，这有助于你为动画添加额外的润色。但是，如果你发现需要对动画的时间和运动进行更精细的控制，请使用 `KeyframeAnimator`。


### Gain more control with a keyframe animator

你可以使用 `KeyframeAnimator` 定义复杂的、协调的动画，对动画的时间和运动进行完全控制。此动画器允许你创建关键帧，这些关键帧在动画期间的特定时间定义值。动画器使用这些值在每个动画帧之间生成内插值。

与相位动画器不同，在相位动画器中，你可以对单独的离散状态进行建模，而关键帧动画器则为你生成指定类型的内插值。当动画正在进行时，动画器会在每个帧上为你提供此类型的值，以便你通过对其应用修饰符来更新动画视图。

你将该类型定义为一个结构，其中包含你希望独立动画的属性。例如，以下代码定义了四个属性，这些属性决定了 emoji 的缩放、拉伸、位置和角度：

```swift
private struct AnimationValues {
    var scale = 1.0
    var verticalStretch = 1.0
    var verticalOffset = 0.0
    var angle = Angle.zero
}
```

::: info
`KeyframeAnimator` 可以为符合 `Animatable` 协议的任何值制作动画。
:::

要使用关键帧动画器创建动画，请将 `keyframeAnimator(initialValue:repeating:content:keyframes:)` 或 `keyframeAnimator(initialValue:trigger:content:keyframes:)` 修饰符应用于要动画的视图。例如，以下代码将第二个修饰符应用于 `EmojiView`。动画的初始值是 `AnimationValues` 的新实例，状态变量 `likeCount` 是动画器观察更改的值，就像在前面的相位动画示例中一样。


```swift
struct KeyframeAnimationView: View {

    var emoji: String

    @State private var likeCount = 1

    var body: some View {
        EmojiView(emoji: emoji)
            .keyframeAnimator(
                initialValue: AnimationValues(),
                trigger: likeCount
            ) { content, value in
                // ...
            } keyframes: { _ in
                // ...
            }
            .onTapGesture {
                likeCount += 1
            }
    }
}

struct EmojiView: View {

    var emoji: String

    var body: some View {
        Image(systemName: emoji)
            .symbolVariant(.fill)
            .font(.system(size: 144))
            .foregroundStyle(.red)
    }
}
```

要在动画期间向视图应用修饰符，请向关键帧动画器提供一个内容闭包。此闭包包含两个参数：

- `content`: 正在动画的视图。

- `value`: 当前的内插值。

使用这些参数将修饰符应用于 SwiftUI 正在动画的视图。例如，以下代码使用这些参数来旋转、缩放、拉伸和移动一个 `emoji`：

```swift
struct KeyframeAnimationView: View {
    var emoji: String
    @State private var likeCount = 1

    var body: some View {
        EmojiView(emoji: emoji)
            .keyframeAnimator(
                initialValue: AnimationValues(),
                trigger: likeCount
            ) { content, value in
                content
                    .rotationEffect(value.angle)
                    .scaleEffect(value.scale)
                    .scaleEffect(y: value.verticalStretch)
                    .offset(y: value.verticalOffset)
            } keyframes: { _ in
                // ...
            }
            .onTapGesture {
                likeCount += 1
            }
    }
}
```

::: warning
SwiftUI 在动画的每一帧都会调用关键帧动画器的内容闭包，因此应避免在其中直接执行任何开销较大的操作。
:::

接下来，定义关键帧。关键帧使你能够使用不同属性的不同关键帧构建复杂的动画。为了实现这一点，你可以将关键帧组织到轨道中。每个轨道控制你正在动画的类型的不同属性。你可以通过在创建轨道时提供属性的键路径将属性与轨道关联起来。例如，以下代码添加了一个用于 `scale` 属性的 `KeyframeTrack`：


```swift
struct KeyframeAnimationView: View {
    var emoji: String
    @State private var likeCount = 1

    var body: some View {
        EmojiView(emoji: emoji)
            .keyframeAnimator(
                initialValue: AnimationValues(),
                trigger: likeCount
            ) { content, value in
                content
                    .rotationEffect(value.angle)
                    .scaleEffect(value.scale)
                    .scaleEffect(y: value.verticalStretch)
                    .offset(y: value.verticalOffset)
            } keyframes: { _ in
                KeyframeTrack(\.scale) {
                    // ...
                }
            }
            .onTapGesture {
                likeCount += 1
            }
    }
}

```

创建轨道时，你可以使用 SwiftUI 的声明式语法将关键帧添加到轨道中。有不同类型的关键帧，例如 `CubicKeyframe`、`LinearKeyframe` 和 `SpringKeyframe`。你可以在一个轨道内混合使用不同类型的关键帧。例如，以下代码为 `scale` 属性添加了一个轨道，该轨道执行线性动画和弹性动画的组合：

```swift
struct KeyframeAnimationView: View {
    var emoji: String
    @State private var likeCount = 1

    var body: some View {
        EmojiView(emoji: emoji)
            .keyframeAnimator(
                initialValue: AnimationValues(),
                trigger: likeCount
            ) { content, value in
                content
                    .rotationEffect(value.angle)
                    .scaleEffect(value.scale)
                    .scaleEffect(y: value.verticalStretch)
                    .offset(y: value.verticalOffset)
            } keyframes: { _ in
                KeyframeTrack(\.scale) {
                    LinearKeyframe(1.0, duration: 0.36)
                    SpringKeyframe(1.5, duration: 0.8,
                        spring: .bouncy)
                    SpringKeyframe(1.0, spring: .bouncy)
                }
            }
            .onTapGesture {
                likeCount += 1
            }
    }
}
```

每种关键帧类型都接收一个值。动画器使用此值在帧之间生成内插值，并在调用动画器的内容闭包之前设置轨道键路径中指定的属性。例如，在前面的代码清单中，线性关键帧期间的缩放值为 $1.0$，这使 `emoji` 保持其原始大小。然后，在第一个弹性关键帧期间，缩放值更改为 $1.5$。这导致 `emoji` 变大。最后的弹性关键帧将缩放设置回 $1.0$，这使 `emoji` 恢复到其原始大小。

::: info
SwiftUI 在轨道内的多个关键帧之间保持速度（即动画的速度），以实现连续运动。
:::

在实现关键帧动画时，为每个要动画的属性包含一个轨道。例如，`AnimationValues` 有四个属性：

- `scale`
- `verticalStretch`
- `verticalOffset`
- `angle`

要对这四个属性进行动画处理，动画器需要四个关键帧轨道，如下所示代码所示：

```swift
struct KeyframeAnimationView: View {
    var emoji: String
    @State private var likeCount = 1

    var body: some View {
        EmojiView(emoji: emoji)
            .keyframeAnimator(
                initialValue: AnimationValues(),
                trigger: likeCount
            ) { content, value in
                content
                    .rotationEffect(value.angle)
                    .scaleEffect(value.scale)
                    .scaleEffect(y: value.verticalStretch)
                    .offset(y: value.verticalOffset)
            } keyframes: { _ in
                KeyframeTrack(\.scale) {
                    LinearKeyframe(1.0, duration: 0.36)
                    SpringKeyframe(1.5, duration: 0.8, spring: .bouncy)
                    SpringKeyframe(1.0, spring: .bouncy)
                }

                KeyframeTrack(\.verticalOffset) {
                    LinearKeyframe(0.0, duration: 0.1)
                    SpringKeyframe(20.0, duration: 0.15, spring: .bouncy)
                    SpringKeyframe(-60.0, duration: 1.0, spring: .bouncy)
                    SpringKeyframe(0.0, spring: .bouncy)
                }


                KeyframeTrack(\.verticalStretch) {
                    CubicKeyframe(1.0, duration: 0.1)
                    CubicKeyframe(0.6, duration: 0.15)
                    CubicKeyframe(1.5, duration: 0.1)
                    CubicKeyframe(1.05, duration: 0.15)
                    CubicKeyframe(1.0, duration: 0.88)
                    CubicKeyframe(0.8, duration: 0.1)
                    CubicKeyframe(1.04, duration: 0.4)
                    CubicKeyframe(1.0, duration: 0.22)
                }


                KeyframeTrack(\.angle) {
                    CubicKeyframe(.zero, duration: 0.58)
                    CubicKeyframe(.degrees(16), duration: 0.125)
                    CubicKeyframe(.degrees(-16), duration: 0.125)
                    CubicKeyframe(.degrees(16), duration: 0.125)
                    CubicKeyframe(.zero, duration: 0.125)
                }
            }
            .onTapGesture {
                likeCount += 1
            }
    }
}
```

这些关键帧轨道的组合创建了一个动画，先挤压和拉伸 `emoji`，然后使其向上反弹。随着 `emoji` 向峰值移动，它会变得更大。当 `emoji` 达到峰值时，它会轻微摆动。然后，`emoji` 带着轻微的反弹回到原来的位置，在恢复到原来的位置时稳定下来。


::: info
与相位动画一样，使用 Xcode 中的画布预览来帮助确定要为关键帧动画应用的动画类型和值。对代码进行更改，并在画布预览中看到这些更改。
:::

<video src="../../video/KeyframeAnimator.mp4" controls="controls"></video>


## `phaseAnimator(_:content:animation:)`

为你应用于视图的效果创建动画，这些效果在连续变化的一系列阶段中生效。

```swift
func phaseAnimator<Phase>(
    _ phases: some Sequence,
    @ViewBuilder content: @escaping (PlaceholderContentView<Self>, Phase) -> some View,
    animation: @escaping (Phase) -> Animation? = { _ in .default }
) -> some View where Phase : Equatable
```

- `phases` : 要循环的阶段序列。确保序列不为空。如果为空，SwiftUI 会记录运行时警告，并在输出视图中返回视觉警告。
- `content` : 一个视图构建器闭包，它接受两个参数：表示修改后的视图的代理值和当前阶段。你可以根据当前阶段对代理应用效果。
- `animation` : 一个接受当前阶段作为输入的闭包。返回用于过渡到下一阶段的动画。如果返回 nil，则过渡不会动画。如果不设置此参数，SwiftUI 将使用默认动画。

当修改后的视图首次出现时，此修饰符使用第一个阶段作为输入调用其内容闭包，并为修改后的视图提供代理。以适合第一个阶段值的方式将效果应用于代理——从而应用于修改后的视图。

紧接着，修饰符为其内容闭包提供第二个阶段的值。相应地更新应用于代理视图的效果，修饰符会为你动画化更改。动画完成后，该过程立即使用后续阶段重复，直到到达最后一个阶段，此时修饰符循环回到第一个阶段。


## `phaseAnimator(_:trigger:content:animation:)`

`trigger` : 一个值，其更改导致动画器使用下一个阶段。


当修改后的视图首次出现时，此修饰符使用第一个阶段作为输入调用其内容闭包，并为修改后的视图提供代理。以适合第一个阶段值的方式将效果应用于代理——从而应用于修改后的视图。

稍后，当触发输入的值发生变化时，修饰符为其内容闭包提供第二个阶段的值。相应地更新应用于代理视图的效果，修饰符会为你动画化更改。下一次触发输入更改时，该过程使用后续阶段重复，直到到达最后一个阶段，此时修饰符循环回到第一个阶段。


## `keyframeAnimator(initialValue:repeating:content:keyframes:)`

循环给定的关键帧，使用在 `body` 中应用的修饰符更新视图。

```swift
func keyframeAnimator<Value>(
    initialValue: Value,
    repeating: Bool = true,
    @ViewBuilder content: @escaping (PlaceholderContentView<Self>, Value) -> some View,
    @KeyframesBuilder<Value> keyframes: @escaping (Value) -> some Keyframes
) -> some View
```


- `initialValue` : 关键帧将从其动画的初始值。
- `repeating` : 关键帧当前是否正在重复。如果为 false，则关键帧时间轴开头的值将提供给内容闭包。
- `content` : 一个视图构建器闭包，它接受两个参数。第一个参数是表示修改后的视图的代理值。第二个参数是关键帧生成的内插值。
- `keyframes` : 定义值随时间变化方式的关键帧。动画器的当前值是唯一的参数，当视图首次出现时，该值等于 `initialValue`，然后在后续调用中等于上一个关键帧动画的结束值。

请注意，在动画时，内容闭包将在每一帧上更新，因此请避免在内容中直接执行任何昂贵的操作。


## `keyframeAnimator(initialValue:trigger:content:keyframes:)`

当给定的触发值发生变化时，播放给定的关键帧，使用在 `body` 中应用的修饰符更新视图。

```swift
func keyframeAnimator<Value>(
    initialValue: Value,
    trigger: some Equatable,
    @ViewBuilder content: @escaping (PlaceholderContentView<Self>, Value) -> some View,
    @KeyframesBuilder<Value> keyframes: @escaping (Value) -> some Keyframes
) -> some View
```

请注意，在动画时，内容闭包将在每一帧上更新，因此请避免在内容中直接执行任何昂贵的操作。

如果在动画时触发值发生变化，关键帧闭包将使用当前的内插值调用，并且返回的关键帧将定义一个替换旧动画的新动画。先前的速度将被保留，因此，如果立方或弹簧关键帧没有指定自定义初始速度，它们将从先前的动画保持连续性。

当关键帧动画完成时，动画器将保持在结束值，该值成为下一个动画的初始值。


## `KeyframeTimeline`


使用关键帧建模的关于值随时间变化的描述。

与 SwiftUI 中的其他动画（使用 `Animation`）不同，关键帧不会在 SwiftUI 作为状态更改提供的 `from` 和 `to` 值之间进行插值。相反，关键帧使用组成其主体的轨道完全定义了值随时间变化的路径。

关键帧值大致类似于视频剪辑；它们具有固定的持续时间，你可以在持续时间内的任何时间进行擦洗和评估它们。

`Keyframes` 结构还允许你在特定时间计算内插值，你可以在将关键帧集成到自定义用例中时使用该内插值。

例如，你可以使用 `Keyframes` 实例为符合 `Animatable` 的类型定义动画：


```swift
let keyframes = KeyframeTimeline(initialValue: CGPoint.zero) {
    CubcKeyframe(.init(x: 0, y: 100), duration: 0.3)
    CubicKeyframe(.init(x: 0, y: 0), duration: 0.7)
}


let value = keyframes.value(time: 0.45

```

对于涉及多个协调变化的动画，你可以包含多个嵌套轨道：

```swift
struct Values {
    var rotation = Angle.zero
    var scale = 1.0
}


let keyframes = KeyframeTimeline(initialValue: Values()) {
    KeyframeTrack(\.rotation) {
        CubicKeyframe(.zero, duration: 0.2)
        CubicKeyframe(.degrees(45), duration: 0.3)
    }
    KeyframeTrack(\.scale) {
        CubicKeyframe(value: 1.2, duration: 0.5)
        CubicKeyframe(value: 0.9, duration: 0.2)
        CubicKeyframe(value: 1.0, duration: 0.3)
    }
}
```

多个嵌套轨道按照它们声明的顺序更新初始值。这意味着，如果多个嵌套轨道更改了根值的相同属性，则将使用来自最后一个竞争轨道的值。


## `CubicKeyframe`

一个使用立方曲线在值之间平滑插值的关键帧。

如果你没有指定起始或结束速度，SwiftUI 会自动计算一个曲线，以在关键帧之间保持平滑运动。

相邻的立方关键帧会产生一个 `Catmull-Rom` 样条。

如果一个立方关键帧紧跟在另一种类型的关键帧（如线性关键帧）之后，前一个关键帧定义的段的结束速度将用作起始速度。

同样，如果一个立方关键帧后面跟着另一种类型的关键帧，则下一段的初始速度将用作此关键帧定义的段的结束速度。

## `LinearKeyframe`

一个使用简单线性插值的关键帧。

## `MoveKeyframe`

一个直接移动到给定值而不进行插值的关键帧。

## `SpringKeyframe`

一个使用弹簧函数将值内插到给定值的关键帧。