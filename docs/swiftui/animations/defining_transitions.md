# Defining transitions

## `transition(_:)`

将过渡与视图关联。

```swift
func transition(_ t: AnyTransition) -> some View
```


当此视图出现或消失时，将应用过渡，允许对其进行淡入和淡出动画。

以下代码将有条件地显示 `Circle`，并且当它出现或消失时，将使用 `.scale` 过渡来显示它。


```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Circle()
                    .fill(.blue)
                    .frame(width: 200)
                    .transition(.scale)
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
        
    }
}
```
<video src="../../video/Transition.mp4" controls="controls"></video>


## `Transition`

当视图添加到视图层次结构或从中删除时要应用的视图更改的描述。

```swift
protocol Transition
```

通常，过渡应该通过对内容应用一个或多个修饰符来进行。对于对称过渡，可以使用阶段上的 `isIdentity` 属性来更改修饰符的属性。对于不对称过渡，可以使用阶段本身来更改这些属性。过渡不应使用任何影响身份的更改，如 `.id`、`if` 和 `switch` 对内容进行更改，因为这样做会重置应用于它们的视图的状态，导致浪费工作并在视图出现和消失时可能出现意外行为。

以下代码定义了一个过渡，可以用于在视图出现和消失时更改不透明度和旋转。


```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(RotatingFadeTransition())
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
        
    }
    
}

struct RotatingFadeTransition: Transition {
    func body(content: Content, phase: TransitionPhase) -> some View {
        content
        .opacity(phase.isIdentity ? 1.0 : 0.0)
        .rotationEffect(phase.rotation)
    }
}
extension TransitionPhase {
    fileprivate var rotation: Angle {
        switch self {
        case .willAppear: return .degrees(30)
        case .identity: return .zero
        case .didDisappear: return .degrees(-30)
        }
    }
}
```
<video src="../../video/TransitionPhase.mp4" controls="controls"></video>

### `blurReplace`

一种通过结合模糊和缩放效果来动画化视图插入或删除的过渡。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.blurReplace)
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
        
    }
    
}
```
<video src="../../video/TransitionBlurReplace.mp4" controls="controls"></video>


### `blurReplace(_:)`

一种通过结合模糊和缩放效果来动画化视图插入或删除的过渡。

```swift
static func blurReplace(_ config: BlurReplaceTransition.Configuration = .downUp) -> Self
```

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.blurReplace(.upUp))
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}
```
<video src="../../video/TransitionBlurReplaceUpUp.mp4" controls="controls"></video>

### `identity`

一种过渡，将输入视图未经修改地作为输出视图返回。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.identity)
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}
```
<video src="../../video/TransitionIdentity.mp4" controls="controls"></video>

### `move(edge:)`

返回一个过渡，将视图移向指定的视图边缘。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.move(edge: .leading))
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}

```
<video src="../../video/TransitionMove.mp4" controls="controls"></video>

### `offset(_:)`

返回一个过渡，将视图偏移指定的量。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.offset(CGSize(width: 400, height: 0)))
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}
```
<video src="../../video/TransitionOffset.mp4" controls="controls"></video>

### `opacity`

插入时从透明过渡到不透明，删除时从不透明过渡到透明的过渡。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.opacity)
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}
```
<video src="../../video/TransitionOpacity.mp4" controls="controls"></video>


### `push(from:)`

创建一个过渡，当添加到视图时，它将通过从指定边缘移动视图并淡入来动画化视图的插入，并通过将视图从相反边缘移出并淡出来动画化视图的移除。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.push(from: .leading))
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}
```
<video src="../../video/TransitionPush.mp4" controls="controls"></video>

### `scale`

返回一个缩放视图的过渡。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.scale)
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}
```
<video src="../../video/TransitionScale.mp4" controls="controls"></video>

### `slide`

一种通过从领先边缘移入来插入，并通过朝尾随边缘移出删除的过渡。

```swift
struct TransitionView: View {
    
    @State private var isActive: Bool = false
    
    var body: some View {
        VStack {
            if isActive {
                Rectangle()
                    .fill(.blue)
                    .frame(width: 200, height: 300)
                    .transition(.slide)
            }
            Spacer()
            Button("Toggle") {
                withAnimation {
                    isActive.toggle()
                }
            }
        }
    }
}
```
<video src="../../video/TransitionSlider.mp4" controls="controls"></video>

### `symbolEffect`

一种将默认符号效果过渡应用于插入或删除的视图层次结构中的符号图像的过渡。其他视图不受此过渡的影响。

```swift
struct TransitionView: View {
    
    @State private var petCount = 0
    
    var body: some View {
        Button {
            petCount += 1
        } label: {
            Label("Pet the Dog", systemImage: "dog")
        }
        .symbolEffect(.bounce, value: petCount)
        .font(.largeTitle)
    }
}
```
<video src="../../video/TransitionSymbolEffect.mp4" controls="controls"></video>


## `TransitionPhase`

指示过渡的当前阶段。

```swift
@frozen
enum TransitionPhase
```

当视图通过过渡出现时，过渡将首先在 `willAppear` 阶段显示，然后立即移动到 `identity` 阶段。当视图被删除时，其过渡将从 `identity` 阶段更改为 `didDisappear` 阶段。如果视图在仍在过渡时被删除，则其阶段将更改为 `didDisappear`。如果视图在过渡时被重新添加，则其阶段将更改回 `identity`。

在 `identity` 阶段，过渡通常不应对应用于的视图进行任何视觉更改，因为只要视图可见，过渡在 `identity` 阶段的视图修改将应用于视图。在 `willAppear` 和 `didDisappear` 阶段，过渡应应用一个将动画化以创建过渡的更改。如果没有应用可动画的更改，则过渡将是无操作的。


```swift
extension TransitionPhase {
    fileprivate var rotation: Angle {
        switch self {
        case .willAppear: return .degrees(30)
        case .identity: return .zero
        case .didDisappear: return .degrees(-30)
        }
    }
}
```


`case identity` : 过渡正在应用于视图层次结构中的视图。
`case willAppear`: 过渡正在应用于即将插入到视图层次结构中的视图。在此阶段，过渡应显示将从其动画的外观，以进行外观过渡。
`case didDisappear`: 过渡正在应用于已被请求从视图层次结构中删除的视图。在此阶段，过渡应显示将被动画化以进行消失过渡的外观。


## `AsymmetricTransition`

一个复合过渡，它对插入和删除使用不同的过渡。

```swift
struct AsymmetricTransition<Insertion, Removal> where Insertion : Transition, Removal : Transition
```

### `init(insertion:removal:)`


```swift
struct AsymmetricTransitionsView: View {

    @State private var toggle: Bool = false

    var body: some View {

        VStack {
            Button("toggle") {
                toggle.toggle()
            }

            Spacer()

            if toggle {
                Rectangle()
                    .fill(.green)
                    .frame(width: 200, height: 300)
                    .transition(.asymmetric(insertion: .scale, removal: .slide))

            }
        }.animation(.easeIn, value: toggle)

    }
}
```
<video src="../../video/AsymmetricTransitions.mp4" controls="controls"></video>

### `combined(with:)`

将此过渡与另一个过渡结合，返回一个新的过渡，该过渡是两个过渡应用的结果。

```swift
func combined(with other: AnyTransition) -> AnyTransition
```


```swift
struct AsymmetricTransitionsView: View {

    @State private var toggle: Bool = false

    var body: some View {

        VStack {
            Button("toggle") {
                toggle.toggle()
            }

            Spacer()

            if toggle {
                Rectangle()
                    .fill(.green)
                    .frame(width: 200, height: 300)
                    .transition(.asymmetric(insertion: .scale.combined(with: .push(from: .bottom)), removal: .slide.combined(with: .opacity)))

            }
        }.animation(.easeIn, value: toggle)

    }
}
```
<video src="../../video/AsymmetricTransitionsCombined.mp4" controls="controls"></video>

## `contentTransition(_:)`

修改视图以使用给定的过渡作为其动画化其视图内容更改的方法。

```swift
func contentTransition(_ transition: ContentTransition) -> some View
```

此修饰符允许你执行一个过渡，该过渡在单个视图内动画化更改。提供的 `ContentTransition` 可以为内容更改呈现不透明度动画，随着内容路径的更改对内容路径进行插补动画，或者根本不执行动画。

::: tip
`contentTransition(_:)` 修饰符仅在动画的上下文中有效。
:::

在下面的示例中，一个按钮更改了一个 `Text` 视图的颜色和字体大小。由于这两个属性都应用于文本的路径，因此插补过渡可以通过整个过渡对这些属性进行逐渐更改。相比之下，不透明度过渡只会在开始状态和结束状态之间淡入淡出。

```swift
struct ContentTransitionView: View {

    private static let font1 = Font.system(size: 20)
    private static let font2 = Font.system(size: 45)


    @State private var color = Color.red
    @State private var currentFont = font1

    var body: some View {
        VStack {
        Text("Content transition")
            .foregroundColor(color)
            .font(currentFont)
            .contentTransition(.interpolate)
        Spacer()
        Button("Change") {
            withAnimation(Animation.easeInOut(duration: 5.0)) {
                color = (color == .red) ? .green : .red
                currentFont = (currentFont == ContentTransitionView.font1) ? ContentTransitionView.font2 : ContentTransitionView.font1
            }
        }
    }
    }
}
```

此示例使用了一个五秒钟持续时间的缓入缓出动画，以便更容易看到插补的效果。下图显示了动画开始时、中途和结束时的文本。


<video src="../../video/ContentTransition.mp4" controls="controls"></video>

::: info `identity`
标识内容过渡，表示内容更改不应动画化。

你可以将此值传递给 `contentTransition(_:)` 修饰符，以有选择地禁用原本由 `withAnimation(_:_:)` 块应用的动画。
:::

::: info `interpolate`
一种内容过渡，指示视图在过渡期间尝试对其内容进行插值，在适当的情况下。

文本视图可以在文本视图具有相同字符串时进行插值过渡。匹配的字形对可以动画化其颜色、位置、大小和任何可变属性的更改。插值可以在 `Font.Design` 情况内应用，但不能在情况之间或完全不同的字体之间应用。例如，你可以在字体的细和黑变体之间进行插值更改，因为这都是 `Font.Weight` 的情况。但是，你不能在字体的默认设计和斜体版本之间进行插值，因为这是不同的字体。任何无法显示插值动画的更改都将使用不透明度动画代替。

使用 `init(systemName:)` 初始化程序创建的符号图像的工作方式与文本相同：同一符号内的更改尝试对符号的路径进行插值。当无法进行插值时，系统将使用不透明度过渡代替。
:::


::: info `numericText(countsDown:)`
创建一个旨在与显示数字文本的 Text 视图一起使用的内容过渡。在某些环境中，对文本的更改将启用为数字字符量身定制的非标准过渡，这些数字字符会向上或向下计数。

- `countsDown`: 如果文本表示的数字正在向下计数，则为 true。

```swift
struct ContentTransitionView: View {

    @State private var number = 0

    var body: some View {
        VStack {
        Text("\(number)")
                .font(.system(size: 144))
            .contentTransition(.numericText())
        Spacer()
        Button("Change") {
            withAnimation(Animation.easeInOut) {
                number += 1
            }
        }
    }
    }
}
```


<video src="../../video/ContentTransitionNumber.mp4" controls="controls"></video>

:::

::: info `numericText(value:)`
创建一个旨在与显示数字的 Text 视图一起使用的内容过渡。

```swift
static func numericText(value: Double) -> ContentTransition
```
- `value`:正在动画化的 `Text` 视图所表示的值。文本更改时旧值和新值之间的差异将用于确定动画方向。
:::


::: info `opacity`
一种内容过渡，指示内容在插入时从透明淡入到不透明，在删除时从不透明淡出到透明。
:::

::: info `symbolEffect`
一种内容过渡，将默认符号效果过渡应用于插入或删除的视图层次结构中的符号图像。其他视图不受此过渡的影响。
:::


### `PlaceholderContentView`

用于构建内联修饰符、过渡或其他助手类型的占位符。