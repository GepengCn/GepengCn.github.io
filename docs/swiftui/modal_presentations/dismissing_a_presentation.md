# Dismissing a presentation

## `isPresented`

一个布尔值，表示与此环境关联的视图当前是否正在展示。

```swift
var isPresented: Bool { get }
```

你可以通过创建带有 `Environment` 属性包装器的属性，像读取其他 `EnvironmentValues` 一样来读取这个值：

```swift
@Environment(\.isPresented) private var isPresented
```


如果你需要知道 SwiftUI 何时呈现某个视图，你可以在视图内部读取该值。

例如，当SwiftUI呈现一个视图时，你可以使用 `onChange(of:initial:_:)` 修饰符来执行某个操作：

```swift
.onChange(of: isPresented) { _, isPresented in
    if isPresented {
        // Do something when first presented.
    }
}
```



这个行为与 `onAppear(perform:)` 不同，SwiftUI 可能会在某些情况下对同一视图多次调用，例如当你导航返回到已经在导航层级中的视图时。

若要关闭当前展示的视图，可以使用 `dismiss` 方法。


## `dismiss`

一个用于关闭当前展示的动作。

```swift
var dismiss: DismissAction { get }
```


使用这个环境值来获取当前环境中的 `DismissAction` 实例，然后调用该实例执行关闭操作。

你可以直接调用该实例，因为它定义了一个 `callAsFunction()` 方法，当你调用该实例时，Swift 会调用此方法。

你可以利用这个动作来进行以下操作：
- 关闭诸如 `sheet` 或 `popover` 之类的模态展示。
- 从 `NavigationStack` 中弹出当前视图。
- 关闭使用 `WindowGroup` 或 `Window` 创建的窗口。

该动作的具体行为取决于你从何处调用它。例如，你可以在作为 `sheet` 使用的视图内部创建一个按钮，该按钮调用 `DismissAction`：


```swift
private struct SheetContents: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        Button("Done") {
            dismiss()
        }
    }
}
```

当你展示了 `SheetContents` 视图后，人们可以通过点击该 `sheet` 内的按钮来关闭它。


```swift
private struct DetailView: View {
    @State private var isSheetPresented = false

    var body: some View {
        Button("Show Sheet") {
            isSheetPresented = true
        }
        .sheet(isPresented: $isSheetPresented) {
            SheetContents()
        }
    }
}
```

确保你在合适的环境中定义该动作。例如，不要像下面示例那样重新组织 `DetailView`：


```swift
private struct DetailView: View {
    @State private var isSheetPresented = false
    @Environment(\.dismiss) private var dismiss // Applies to DetailView.


    var body: some View {
        Button("Show Sheet") {
            isSheetPresented = true
        }
        .sheet(isPresented: $isSheetPresented) {
            Button("Done") {
                dismiss() // Fails to dismiss the sheet. // [!code error]
            }
        }
    }
}
```

如果这样做，`sheet` 将无法成功关闭，因为该动作应用的是你声明它的环境，即详情视图的环境，而不是 `sheet` 本身的环境。

实际上，在 macOS 和 iPadOS 中，如果 `DetailView` 是一个窗口的根视图，`dismiss` 动作将会关闭该窗口，而非 `sheet`。

`dismiss` 动作对于当前未被展示的视图无效。如果你需要查询 SwiftUI 当前是否正在展示某个视图，可以读取 `isPresented` 环境值。


## `interactiveDismissDisabled(_:)`

条件性地阻止对诸如 `popover`、`sheets` 和 `inspectors` 等展示进行交互式关闭。


```swift
func interactiveDismissDisabled(_ isDisabled: Bool = true) -> some View
```


用户可以使用内置的手势关闭某些类型的展示。具体来说，用户可以通过向下拖动来关闭 `sheet`，或者通过在展示视图外部点击或触摸来关闭 `popover`。

使用 `interactiveDismissDisabled(_:)` 修饰符可以条件性地阻止此类关闭,通常这样做是为了防止用户在提供必要数据或完成必需操作之前就关闭展示。

举个例子，假设你有一个视图，它显示了一份用户必须在继续前确认的许可协议：


```swift
struct TermsOfService: View {
    @Binding var areTermsAccepted: Bool
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        Form {
            Text("License Agreement")
                .font(.title)
            Text("Terms and conditions go here.")
            Button("Accept") {
                areTermsAccepted = true
                dismiss()
            }
        }
    }
}
```

若你以 `sheet` 的形式展示这个视图，用户既可以点击按钮（这将在其 `action` 闭包中调用 `dismiss` ）来关闭它，也可以通过向下拖动 `sheet` 来关闭。

为了确保用户通过点击按钮接受条款，可以根据 `areTermsAccepted` 属性禁用交互式关闭：


```swift{12}
struct ContentView: View {
    @State private var isSheetPresented = false
    @State private var areTermsAccepted = false


    var body: some View {
        Button("Use Service") {
            isSheetPresented = true
        }
        .sheet(isPresented: $isSheetPresented) {
            TermsOfService()
                .interactiveDismissDisabled(!areTermsAccepted)
        }
    }
}
```


你可以将这个修饰符应用于 `sheet` 视图层级中的任何视图上，正如示例所示，可以应用到 `sheet` 的顶级视图，或者任何子视图，比如 `Form` 或 `Accept` （同意）按钮。

该修饰符不会影响程序化关闭，可以通过更新控制展示的 `Binding` 来触发关闭，或者通过调用环境中的 `dismiss` 动作来关闭。在 macOS 中，禁用 `popover` 的交互式关闭将会使其变为非临时性（持久存在）的。