# Removing default items

## `toolbar(removing:)`

从默认工具栏中移除一项。

```swift
func toolbar(removing defaultItemKind: ToolbarDefaultItemKind?) -> some View
```

如果想移除通常由其他视图（如 `NavigationSplitView` ）自动添加到工具栏的某一项，可以使用这个修饰符。

举个例子，若要移除 `NavigationSplitView` 自带的侧边栏切换工具栏按钮，就采取这种方式。

<video src="../../video/ToolbarRemoveItem.mp4" controls="controls"></video>
