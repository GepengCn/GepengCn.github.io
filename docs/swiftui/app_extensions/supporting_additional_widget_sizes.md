# Supporting additional widget sizes

通过添加对多种小组件尺寸的支持，可以在更多场景下提供小组件服务。

在你的应用中添加小组件扩展并创建首个小组件之后，你需要添加代码来声明应用支持的其他小组件类型，这可通过使用 `supportedFamilies(_:)` 属性修饰符实现。你使用的尺寸取决于你的应用支持的设备类型。如果你的应用支持多个平台，请确保有条件地声明支持的小组件家族。

以下来自「[Emoji Rangers: Supporting Live Activities, interactivity, and animations](https://developer.apple.com/documentation/widgetkit/emoji-rangers-supporting-live-activities-interactivity-and-animations)」示例代码项目的例子，展示了如何在 `Widget` 实现中声明多种小组件尺寸。该应用在 watchOS 和 iOS 平台上均支持附件小组件，并在 iOS 平台上支持 `WidgetFamily.systemSmall` 和 `WidgetFamily.systemMedium` 两种尺寸的小组件。注意，这里使用了 ``#if os(watchOS)` 宏，确保为每个平台正确声明所支持的小组件家族。


```swift
public var body: some WidgetConfiguration {
    makeWidgetConfiguration()
        .configurationDisplayName("Ranger Detail")
        .description("See your favorite ranger.")
        #if os(watchOS)
        .supportedFamilies([.accessoryCircular,
                            .accessoryRectangular, .accessoryInline])
        #else
        .supportedFamilies([.accessoryCircular,
                            .accessoryRectangular, .accessoryInline,
                            .systemSmall, .systemMedium, .systemLarge])
        #endif
}
```

## Update SwiftUI views to support additional sizes


在你的 `Widget` 中声明支持额外的小组件尺寸后，你需要更新小组件视图以适应这些新增尺寸。在你的视图代码中：

- 使用 `widgetFamily` 环境变量来检测不同的小组件家族。
- 为每种尺寸构建相应的视图，并包含处理诸如活力（ `vibrant` ）模式和深色模式等外观变化的代码。要了解更多详情，请参阅「[Preparing widgets for additional platforms, contexts, and appearances](https://developer.apple.com/documentation/widgetkit/preparing-widgets-for-additional-contexts-and-appearances)」。

下面的例子摘自「[Emoji Rangers: Supporting Live Activities, interactivity, and animations](https://developer.apple.com/documentation/widgetkit/emoji-rangers-supporting-live-activities-interactivity-and-animations)」示例代码项目，它展示了一个简化的代码片段。根据不同的小组件家族条件性地返回合适的SwiftUI视图。

```swift
struct EmojiRangerWidgetEntryView: View {
    var entry: Provider.Entry
    
    @Environment(\.widgetFamily) var family


    @ViewBuilder
    var body: some View {
        switch family {
        case .accessoryCircular:
            // Code to construct the view for the circular accessory widget or watch complication.
        case .accessoryRectangular:
            // Code to construct the view for the rectangular accessory widget or watch complication.
        case .accessoryInline:
            // Code to construct the view for the inline accessory widget or watch complication.
        case .systemSmall:
            // Code to construct the view for the small widget.
        case .systemLarge:
            // Code to construct the view for the large widget.
        case .systemMedium
            // Code to construct the view for the medium widget.
        default:
            // Code to construct the view for other widgets, for example, the extra large widget.
        }
    }
}
```

::: tip

利用 Xcode 预览功能，你可以无需在模拟器或实际设备上运行应用，即可查看小组件的设计效果。若想了解更多信息，请参阅「[Preview widgets in Xcode](https://developer.apple.com/documentation/widgetkit/creating-a-widget-extension#Preview-widgets-in-Xcode)」。
:::