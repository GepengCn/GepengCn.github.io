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




