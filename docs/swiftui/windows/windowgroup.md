# WindowsGroup <Badge type="tip" text="macOS" />

在应用程序界面中呈现视图层次结构的最常见方法是使用 `WindowGroup`，它会生成特定于平台的行为和外观。

- 在支持它的平台上，人们可以同时打开组中的多个窗口。
- 每个窗口都依赖于相同的根视图定义，但保留自己的视图状态。

在某些平台上，你还可以使用「窗口」场景类型通过单实例窗口来补充应用程序的用户界面。

使用添加到窗口声明中的场景修饰符配置窗口，例如 `windowStyle(_:)` 或 `defaultPosition(_:)`。

你还可以通过将 `presentedWindowStyle(_:)` 视图修饰符添加到层次结构中的视图来指示如何配置从视图层次结构中呈现的新窗口。


## 创建一个窗口组 `WindowGroup`

最基础的用法：

```swift
@main
struct Mail: App {
    var body: some Scene {
        WindowGroup {
            MailViewer() // Define a view hierarchy for the window.
        }
    }
}
```
SwiftUI 负责处理某些特定于平台的行为。

- 例如，在支持它的平台（例如 macOS 和 iPadOS）上，人们可以同时打开组中的多个窗口。
- 在 macOS 中，人们可以在选项卡式界面中将打开的窗口聚集在一起。
- 同样在 macOS 中，窗口组会自动提供标准窗口管理的命令。

每个窗口组都保持相对独立的状态。

例如，系统为其创建的每个窗口的任何 `State` 或 `StateObject` 变量分配「新的」存储空间。

::: info

对于基于文档的应用程序，请使用 `DocumentGroup` 来定义窗口组。
:::


## 以编程方式打开窗口组

如果使用标识符 `id` 来初始化 `WindowGroup`，则可以通过编程方式打开窗口。

例如，可以为上一示例中的邮件查看器场景提供一个标识符：

```swift
WindowGroup(id: "mail-viewer") { // Identify the window group.
    MailViewer()
}
```

在代码的其他位置，可以使用 `@Environment(\.openWindow)` 操作打开一个新窗口：

```swift
struct NewViewerButton: View {
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        Button("Open new mail viewer") {
            openWindow(id: "mail-viewer") // Match the group's identifier.
        }
    }
}
```

::: warning 注意
务必使用唯一字符串作为 `WindowGroup` 的标识符。
:::

## 在窗口组中显示数据

你可以基于类型来创建 `WindowGroup`，当你打开窗口时 `openWindow`时，传递匹配的类型就可以打开对应的那个窗口。

例如，您可以为邮件应用程序定义 `WindowGroup(for: Message.ID.self)`，类型为 `Message.ID`：

```swift
@main
struct Mail: App {
    var body: some Scene {
        WindowGroup {
            MailViewer(id: "mail-viewer")
        }

        // A window group that displays messages.
        WindowGroup(for: Message.ID.self) { $messageID in
            MessageDetail(messageID: messageID)
        }
    }
}
```

当你调用 `openWindow` 操作并传递参数类型为 `Message.ID`时，SwiftUI 会找到具有匹配类型的 `WindowGroup`，并将该值的绑定传递到窗口组的内容闭包中。

```swift
struct NewMessageButton: View {
    var message: Message
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        Button("Open message") {
            openWindow(value: message.id)
        }
    }
}
```
::: tip 注意
- 确保提供的类型符合 `Hashable` 和 `Codable` 协议。
- 如果用户界面中已打开了对应类型的窗口组，再次打开时系统会将现有窗口置于前面，而不是打开新窗口组。
- 如果 SwiftUI 没有要提供的值（例如，当有人通过从 macOS 菜单栏中选择「文件」>「新窗口」打开一个窗口组时），SwiftUI 会传递 `nil` 值。

:::

为了避免收到 `nil` 值，你可以选择在 `WindowGroup` 初始值设定项中指定默认值。

例如：

```swift
WindowGroup(for: Message.ID.self) { $messageID in
    MessageDetail(messageID: messageID)
} defaultValue: {
    model.makeNewMessage().id // A new message that your model stores.
}
```

SwiftUI 默认会持久化要传递的值用以崩溃时的回复，当恢复的过程中出现了错误丢失了该值，如果你设置了默认值，可以恢复为默认值，否则会设置为 `nil`。

## 为应用的窗口组命名

为了区分不同的 `WindowGroup`， 可以通过第一个参数传入字符串来为其命名：

```swift
WindowGroup("Message", for: Message.ID.self) { $messageID in
    MessageDetail(messageID: messageID)
}
```

窗口的命名可用范围：

- 可以使用「文件」>「新建」菜单打开的新窗口组列表。
- 窗口组的标题栏。
- 窗口组菜单显示的打开窗口的列表。

如果你没有主动命名窗口组，系统将使用应用的名称来命名。

## 区分呈现相同数据类型的窗口组

要区分呈现相同数据类型的窗口组，例如当你使用 `UUID` 作为多个窗口组类型的标识符时，可以将 `id` 添加到 `WindowGroup` 的参数中以提供唯一的字符串标识，同理 `openWindow`：

```swift{1,4}
WindowGroup("Message", id: "message", for: UUID.self) { $uuid in
    MessageDetail(uuid: uuid)
}
WindowGroup("Account", id: "account-info", for: UUID.self) { $uuid in
    AccountDetail(uuid: uuid)
}

struct ActionButtons: View {
    var messageID: UUID
    var accountID: UUID


    @Environment(\.openWindow) private var openWindow


    var body: some View {
        HStack {
            Button("Open message") {
                openWindow(id: "message", value: messageID)
            }
            Button("Edit account information") {
                openWindow(id: "account-info", value: accountID)
            }
        }
    }
}
```

## 以编程方式关闭窗口组

可以通过 `@Environment(\.dismiss)` 来关闭当前的窗口组（从窗口组的视图层次结构中，比如关闭按钮定义在 `A` 窗口组中，那么关闭的就是 `A` 窗口组）：

```swift
struct AccountDetail: View {
    var uuid: UUID?
    @Environment(\.dismiss) private var dismiss


    var body: some View {
        VStack {
            // ...

            Button("Dismiss") {
                dismiss()
            }
        }
    }
}
```

::: warning 注意

如果关闭按钮定义在 `Sheet` 或 `popover` 中，则不会关闭窗口组而是会关闭对应的 `Sheet` 或 `popover`。

:::