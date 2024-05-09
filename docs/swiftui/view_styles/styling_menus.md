

# Styling menus

## `menuStyle(_:)`

为此视图中的菜单设置样式。

```swift
func menuStyle<S>(_ style: S) -> some View where S : MenuStyle
```

### `automatic`

基于菜单上下文的默认菜单样式。

默认的菜单样式可能因平台而异。默认情况下，macOS 使用带边框的按钮样式。

如果你在一个容器中创建一个菜单，该样式的确定会依据该特定平台下该容器内部菜单的推荐样式。例如，嵌套在另一个菜单中的菜单将解析为一个子菜单：


```swift
Menu("Edit") {
    Menu("Arrange") {
        Button("Bring to Front", action: moveSelectionToFront)
        Button("Send to Back", action: moveSelectionToBack)
    }
    Button("Delete", action: deleteSelection)
}

```
<video src="../../video/MenuStyleAutomatic.mp4" controls="controls"></video>

### `button`

一种菜单样式，按下按钮时切换显示菜单内容。

在 macOS 上，按钮显示一个箭头以指示它呈现一个菜单。

按下按钮后拖动进入内容区域，并在释放时激活所选操作。


<video src="../../video/MenuStyleButton.mp4" controls="controls"></video>
