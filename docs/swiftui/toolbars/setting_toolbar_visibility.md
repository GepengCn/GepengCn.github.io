# Setting toolbar visibility

## `toolbar(_:for:)`

明确指出由 SwiftUI 管理的工具栏（或状态栏、导航栏等）的可见性设置。

```swift
func toolbar(
    _ visibility: Visibility,
    for bars: ToolbarPlacement...
) -> some View
```

首选的可见性设置会向上流动到最近的负责渲染条栏的容器。
- 在 iOS 中，这个容器可能是 `NavigationView` 或 `TabView`；
- 而在 macOS 中，则可能是 `WindowGroup` 的根视图。

以下示例展示了一个隐藏导航栏的视图。


```swift
NavigationView {
    ContentView()
        .toolbar(.hidden)
}
```


你可以同时提供多个 `ToolbarPlacement` 实例，以便一次性隐藏多个工具栏（或状态栏、导航栏等）。

```swift
TabView {
    NavigationView {
        ContentView()
            .toolbar(
                .hidden, for: .navigationBar, .tabBar)
    }
}
```


::: warning 注意
在 macOS 系统中，如果你为应用的场景提供了 `ToolbarCommands`，那么当此修饰符的值不是「`automatic`」时，它会禁用工具栏可见性命令。

换句话说，在这种情况下，如果设置了非 `automatic` 的工具栏可见性值，那么与工具栏显示/隐藏相关的命令将不会生效。

:::


根据你所指定的不同类型的条栏以及其上下文环境，系统可能无法满足你设定的可见性需求。也就是说，对于某些条栏，由于系统限制或其他因素，即使指定了特定的可见性设置，也可能无法按照预期完全改变其显示状态。


## `ToolbarPlacement`

工具栏的位置设置。

```swift
struct ToolbarPlacement
```


此类型应与诸如 `toolbarBackground(_:for:)` 和 `toolbar(_:for:)` 这样的修饰符配合使用，以便于自定义由 SwiftUI 管理的不同类型条栏的外观。不过请注意，并非所有类型的条栏都支持所有类型的定制。

通过查阅 `ToolbarItemPlacement` ，你可以了解到可以在这些工具栏的不同区域放置你自定义控件的各种可能性。

- `automatic`
- `accessoryBar(id:)`
- `bottomBar`
- `bottomOrnament`
- `navigationBar`
- `tabBar`
- `windowToolbar`

