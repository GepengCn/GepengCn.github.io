# 链接到其他内容

## `Link`

用于导航到 URL 的控件。

```swift
struct Link<Label> where Label : View
```

通过提供目标 URL 和标题来创建链接。标题告诉用户链接的目的，可以是字符串、生成本地化字符串的标题键或充当标签的视图。下面的示例创建一个指向 `example.com` 的链接，并将标题字符串显示为链接样式的视图：

```swift
Link("View Our Terms of Service",
destination: URL(string: "https://www.example.com/TOS.html")!)
```

当用户点击或单击链接时，默认行为取决于 URL 的内容。例如，SwiftUI 会在可能的情况下在关联的应用程序中打开通用链接，否则在用户的默认 Web 浏览器中打开。或者，你可以通过使用自定义 `OpenURLAction` 设置 `openURL` 环境值来覆盖默认行为：


```swift
Link("Visit Our Site", destination: URL(string: "https://www.example.com")!)
    .environment(\.openURL, OpenURLAction { url in
        print("Open \(url)")
        return .handled
    })
```

与其他视图一样，你可以根据链接标签的视图类型使用标准视图修饰符来设置链接的样式。例如，可以使用自定义 `font(_:)` 或 `foregroundColor(_:)` 修改 `Text` 标签，以自定义链接在应用程序用户界面中的外观。

## `ShareLink`

控制共享演示文稿的视图。

```swift
struct ShareLink<Data, PreviewImage, PreviewIcon, Label> where Data : RandomAccessCollection, PreviewImage : Transferable, PreviewIcon : Transferable, Label : View, Data.Element : Transferable
```

人们点击或单击共享链接以呈现共享界面。该链接通常使用系统标准外观；你只需要提供要共享的内容：

```swift
ShareLink(item: URL(string: "https://developer.apple.com/xcode/swiftui/")!)
```

你可以通过提供视图内容来控制链接的外观。例如，你可以使用 `Label` 来显示带有自定义图标的链接：

```swift
ShareLink(item: URL(string: "https://developer.apple.com/xcode/swiftui/")!) {
    Label("Share", image: "MyCustomShareIcon")
}
```

如果你只想自定义链接的标题，你可以使用其中一个方便的初始化器，该初始化器接受一个字符串并为你创建一个 `Label`：

```swift
ShareLink("Share URL", item: URL(string: "https://developer.apple.com/xcode/swiftui/")!)
```

该链接可以共享任何可传输的内容。许多框架类型，如 `URL`，已经符合此协议。你也可以使自己的类型可传输。

例如，你可以使用 `ProxyRepresentation` 将你自己的类型解析为框架类型：

```swift
struct Photo: Transferable {
    static var transferRepresentation: some TransferRepresentation {
        ProxyRepresentation(\.image)
    }


    public var image: Image
    public var caption: String
}


struct PhotoView: View {
    let photo: Photo

    var body: View {
        photo.image
            .toolbar {
                ShareLink(
                    item: photo,
                    preview: SharePreview(
                        photo.caption,
                        image: photo.image))
            }
    }
}
```

有时，你的应用程序共享的内容并非立即可用。当你需要异步操作（如网络请求）来检索和准备内容时，你可以使用 `FileRepresentation` 或 `DataRepresentation`。

`Transferable` 类型还允许你为单个可共享项目提供多种内容类型。共享界面根据你提供的类型显示相关的共享服务。

前面的示例还展示了如何提供内容预览以显示在共享界面中。

当共享 URL 或无属性字符串时，不需要预览。当共享这些类型的内容时，系统可以自动确定预览。

即使预览是可选的，你也可以提供预览。例如，当共享 URL 时，自动预览首先在获取链接的元数据时显示一个占位符链接图标和基础 URL。一旦链接的图标和标题可用，预览就会更新。如果你提供预览，预览将立即出现，而无需通过网络获取数据。

某些共享活动支持主题和消息字段。你可以使用 `subject` 和 `message` 参数预先填充这些字段：

```swift
ShareLink(
    item: photo,
    subject: Text("Cool Photo"),
    message: Text("Check it out!")
    preview: SharePreview(
        photo.caption,
        image: photo.image))
```

## `SharePreview`

要在共享预览中显示的类型的表示形式。

```swift
struct SharePreview<Image, Icon> where Image : Transferable, Icon : Transferable
```

当共享系统无法自动预览的内容时，使用此类型：

```swift
struct Photo: Transferable {
    static var transferRepresentation: some TransferRepresentation {
        ProxyRepresentation(\.image)
    }


    public var image: Image
    public var caption: String
}


struct PhotoView: View {
    let photo: Photo


    var body: View {
        photo.image
            .toolbar {
                ShareLink(
                    item: photo,
                    preview: SharePreview(
                        photo.caption,
                        image: photo.image))
            }
    }
}
```

你还可以提供预览以加快共享过程。在下面的示例中，预览会立即出现；如果你省略预览，系统将通过网络获取链接的元数据：

```swift
ShareLink(
    item: URL(string: "https://developer.apple.com/xcode/swiftui/")!,
    preview: SharePreview(
        "SwiftUI",
        image: Image("SwiftUI"))
```

你可以为 `ShareLink` 链接到的项目集合中的每个项目提供独特的预览：

```swift
ShareLink(items: photos) { photo in
    SharePreview(photo.caption, image: photo.image)
}
```

共享界面决定如何组合这些预览。

每个预览都指定了描述该类型项目的文本和图像。预览的 `image` 参数通常是项目的全尺寸表示形式。例如，如果系统为指向网页的链接准备预览，图像可能是该网页上的主要图像。

预览的 `icon` 参数通常是项目源的缩略图大小表示形式。例如，如果系统为指向网页的链接准备预览，图标可能是代表整个网站的图像。

系统可能会为多个预览重复使用单个预览表示形式，并在每个上下文中显示不同的图像。

## `HelpLink`

具有标准外观的按钮，用于打开特定于应用程序的帮助文档。

```swift
struct HelpLink
```

帮助链接会打开与使用它们的上下文相关的文档。通常，这是通过打开 Apple 帮助书中的锚点来实现的，但也可以执行任意操作，例如打开 URL 或打开窗口。

```swift
HelpLink(anchor: "accountSetupHelp")


HelpLink {
    openURL(onlineHelpURL)
}
```

帮助链接具有标准外观，并且在视图中有常规的位置。当在警报或确认对话框的操作中使用时，帮助链接将自动放置在顶部尾随角。或者当在工作表工具栏中使用时，帮助链接将自动放置在底部前导角。


```swift
struct SheetContentView: View {
    var body: some View {
        Form {
            ...
        }
        .toolbar {
            ToolbarItem(.confirmationAction) {
                Button("Save") { ... }
            }
            ToolbarItem(.cancellationAction) {
                Button("Cancel") { ... }
            }
            ToolbarItem {
                HelpLink(anchor: "sheetHelp")
            }
        }
    }
}
```