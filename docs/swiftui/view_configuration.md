# View configuration

调整层次结构中视图的特征。

SwiftUI 允许你使用视图修饰符调整视图的外观和行为。

许多修饰符适用于特定类型视图或特定行为，但也有一些修饰符具有更广泛的应用性。例如，你可以通过动态设置透明度来有条件地隐藏任何视图，在用户悬停在视图上时显示上下文帮助信息，或为视图请求浅色或深色外观。

## Hiding views

### `opacity(_:)`

设置此视图的透明度。

```swift
func opacity(_ opacity: Double) -> some View
```

- `opacity`: 一个介于 $0$（完全透明）和 $1$（完全不透明）之间的值。


应用不透明度以显示位于另一个视图之后的视图，或减弱对某个视图的强调。

当对一个已经经过不透明度转换的视图应用 `opacity(_:)` 修改器时，该修改器会将效果与底层的不透明度转换相乘。

下面的例子展示了两个重叠的黄色和红色矩形。上方的黄色矩形将其不透明度设置为 $50\%$，从而使下方矩形被遮挡部分可见：


```swift
struct Opacity: View {
    var body: some View {
        VStack {
            Color.yellow.frame(width: 100, height: 100, alignment: .center)
                .zIndex(1)
                .opacity(0.5)

            Color.red.frame(width: 100, height: 100, alignment: .center)
                .padding(-40)
        }
    }
}

```

![Opacity](../images/Opacity.png)


### `hidden()`

无条件地隐藏此视图。


```swift
func hidden() -> some View
```

隐藏的视图是不可见的，不能接收或响应交互。然而，它们保留在视图层次结构中并影响布局。如果你想出于布局目的包含一个视图，但又不想让它显示，可以使用此修饰符。

```swift
HStack {
    Image(systemName: "a.circle.fill")
    Image(systemName: "b.circle.fill")
    Image(systemName: "c.circle.fill")
        .hidden()
    Image(systemName: "d.circle.fill")
}
```

![SwiftUI-View-hidden-1@2x](../images/SwiftUI-View-hidden-1@2x.png)

如果你想有条件地在视图层次结构中包含一个视图，请改用 `if` 语句：

```swift
VStack {
    HStack {
        Image(systemName: "a.circle.fill")
        Image(systemName: "b.circle.fill")
        if !isHidden {
            Image(systemName: "c.circle.fill")
        }
        Image(systemName: "d.circle.fill")
    }
    Toggle("Hide", isOn: $isHidden)
}

```
<video src="../video/HiddenIf.mp4" controls="controls"></video>

上述示例中，根据由 `Toggle` 实例控制的 `isHidden` 状态变量的当前值，SwiftUI 会绘制圆圈或者完全将其从布局中省略。

## Hiding system elements

### `labelsHidden()`

隐藏该视图内包含的所有控件的标签。

```swift
func labelsHidden() -> some View
```

当你希望从用户界面中的一个或多个控件中省略标签时，可以使用此修饰符。例如，以下示例中的第一个 `Toggle` 隐藏了其标签：

```swift
VStack {
    Toggle(isOn: $toggle1) {
        Text("Toggle 1")
    }
    .labelsHidden()


    Toggle(isOn: $toggle2) {
        Text("Toggle 2")
    }
}
```


在上述示例中，第一个 `VStack` 将第一个切换开关的控制元素居中于可用空间中，而第二个切换开关的组合标签和控制元素则整体居中：


![LabelsHidden](../images/LabelsHidden.png)

即使隐藏了标签，也始终为控件提供一个标签，因为 SwiftUI 将标签用于其他目的，包括辅助功能。

::: info
此修饰符并不适用于所有标签。它仅适用于与控件其余界面分开的标签，如 `Toggle` 的情况，但不适用于像带有边框的按钮这样的控件，其中标签位于按钮边框内。
:::


### `menuIndicator(_:)`

为该视图内的控件设置菜单指示器的可见性。

```swift
func menuIndicator(_ visibility: Visibility) -> some View
```


使用此修饰符可覆盖此视图中控件的默认菜单指示器可见性。例如，下面的代码创建了一个没有指示器的菜单：


```swift
Menu {
    ForEach(history , id: \.self) { historyItem in
        Button(historyItem.title) {
            self.openURL(historyItem.url)
        }
    }
} label: {
    Label("Back", systemImage: "chevron.backward")
        .labelStyle(.iconOnly)
} primaryAction: {
    if let last = history.last {
        self.openURL(last.url)
    }
}
.menuIndicator(.hidden)
```

![MenuIndicator](../images/MenuIndicator.png)


::: info

在 tvOS 上，标准按钮样式不包含菜单指示器，因此在使用内置按钮样式时，此修饰符将不起作用。你可以在自己的 `ButtonStyle` 实现中通过检查 `menuIndicatorVisibility` 环境值来实现指示器。
:::