# App extensions

将应用的基本功能扩展到系统的其他部分，比如通过添加 `widgets` 。

小组件为用户提供从你的应用快速访问相关内容的途径。你需要定义一个遵循 `Widget` 协议的结构，并为小组件声明一个视图层级。像配置其他 SwiftUI 视图一样，使用视图修饰符（包括一些特定于小组件的修饰符）来配置小组件内的视图。

## `Widget`

在主屏幕或通知中心上显示的 `widgets` 的配置和内容。

```swift
protocol Widget
```


 `widgets` 直接在 iOS 主屏幕上或 macOS 的通知中心显示来自你应用的一览式和相关内容。用户可以根据个人需求添加、配置和排列 `widgets` 。你可以提供多种类型的 `widgets` ，每种展示特定种类的信息。当用户想要更多信息时，比如阅读新闻标题的全文或查看包裹递送的详细信息， `widgets` 可让他们快速跳转到应用中的相关信息。

 `widgets` 的三个关键组成部分包括：

- 配置信息，用于确定 `widgets` 是否可配置，标识 `widgets` ，并定义展示 `widgets` 内容的 SwiftUI 视图。
- 时间线提供者，驱动 `widgets` 视图随时间更新的过程。
- `WidgetKit` 用于展示 `widgets` 的 SwiftUI 视图。

通过添加自定义的 `SiriKit` 意图定义，你可以让用户自定义他们的小组件以展示与他们最相关的信息。如果你已经为 `Siri` 或快捷指令添加了支持，那么你就已经在支持可定制小组件的道路上走了很远。


## `WidgetBundle`

一个用于从单个窗口 `widgets` 扩展中展示多个窗口 `widgets` 的容器。

为了支持多种类型的小组件，向遵循 `WidgetBundle` 协议的结构体添加 `@main` 属性。

例如，一个游戏可能有一个小组件用于显示游戏的概要信息，另一个小组件则用于展示单个角色的详细信息。


```swift
@main
struct GameWidgets: WidgetBundle {
    var body: some Widget {
        GameStatusWidget()
        CharacterDetailWidget()
    }
}
```

## `WidgetBundleBuilder`

一个自定义属性，用于构建 `widgets` 包的主体。

```swift
@resultBuilder
struct WidgetBundleBuilder
```

使用 `@WidgetBundleBuilder` 属性来组合 `widget bundle` 的 `body` 属性中列出的多个 `widgets`。例如，以下代码定义了一个由两个 `widgets` 组成的 `widget bundle`。


```swift
@main
struct GameWidgets: WidgetBundle {
    @WidgetBundleBuilder
    var body: some Widget {
        GameStatusWidget()
        CharacterDetailWidget()
    }
}
```

## `LimitedAvailabilityConfiguration`

一种类型擦除的窗口 `widgets` 配置。

```swift
@frozen
struct LimitedAvailabilityConfiguration
```

你不会直接使用这种类型。相反，SwiftUI 会代表你创建这种类型。

## `widgetLabel(_:)`

返回一个文本标签，该标签在辅助部件家族 `widget` 的主 SwiftUI 视图之外显示额外内容。

```swift
func widgetLabel<S>(_ label: S) -> some View where S : StringProtocol
```

为了给配件家族 `widgets` 添加文本标签，需要在 `widgets` 的主要 SwiftUI 视图上调用此方法，并传入一个受支持的 `LocalizedStringKey`。系统将判断是否可以使用该文本标签。如果无法使用，它将忽略该标签。系统还会设置标签的大小、位置和样式，例如设置字体以及沿曲线渲染文本。

以下 `widgets` 家族支持文本附件标签：

- `WidgetFamily.accessoryCorner` 类型的 `widgets` 可以在其内角边缘显示弯曲的文本标签。向配件角 `widgets` 添加标签会导致主 SwiftUI 视图缩小以腾出空间给标签。
- 在 watchOS 中，`WidgetFamily.accessoryCircular` 类型的 `widgets` 可以显示文本标签；然而，`WidgetKit` 只会在 `Infograph` 手表表盘（顶部圆形复杂功能区）的表圈上渲染该标签。


## `widgetAccentable(_:)`

将视图及其所有子视图添加到强调组中。


```swift
func widgetAccentable(_ accentable: Bool = true) -> some View
```

当系统采用 `WidgetKit` 中的 `WidgetRenderingMode/accented` 模式渲染 `widgets` 时，它会将 `widgets` 的视图层级划分为两个组：强调组（ `accented group` ）与默认组（ `default group` ）。之后，系统会分别为这两个组应用不同的颜色。

在应用颜色时，系统会将 `widgets` 的视图视为模板图像进行处理，忽略视图本身的颜色属性，而是基于视图的 `alpha` 通道来呈现新的颜色。

为了控制视图的外观效果，你可以在视图层级的一部分添加 `widgetAccentable(_:)` 修饰符。如果 `accentable` 参数为 `true`，系统会将该视图及其所有子视图添加到强调组。而所有其他视图则会被放入默认组中。


```swift
ar body: some View {
    VStack {
        Text("MON")
            .font(.caption)
            .widgetAccentable()
        Text("6")
            .font(.title)
        }
    }
}
```


::: warning
在对某个视图调用 `widgetAccentable(true)` 将其移入强调组后，即便对其子视图调用 `widgetAccentable(false)`，子视图也不会被移回到默认组。
:::

## `dynamicIsland(verticalPlacement:)`

指定扩展后的 `Live Activity` 在灵动岛中显示的视图的垂直位置。

```swift
func dynamicIsland(verticalPlacement: DynamicIslandExpandedRegionVerticalPlacement) -> some View
```


