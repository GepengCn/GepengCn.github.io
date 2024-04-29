# Windows <Badge type="tip" text="macOS" />

在一个独立、唯一的窗口中呈现内容的场景。一般作为一个补充或辅助功能的窗口，例如，您可以在邮件阅读器应用程序中使人们能够查看其帐户连接的状态的窗口：


```swift{7-9}
@main
struct Mail: App {
    var body: some Scene {
        WindowGroup {
            MailViewer()
        }
        Window("Connection Doctor", id: "connection-doctor") {
            ConnectionDoctor()
        }
    }
}
```
与`WindowGroup`类似，通过构造器的第一个参数来命名标题, 当使用编程方式打开窗口时，可以利用 `id` 来匹配窗口。

::: info 改变标题
`navigationTitle(_:)` 视图修饰符也可以指定或改变窗口的标题。
:::

## 以编程方式打开窗口

与窗口组 `WindowGroup` 类似：

```swift
struct OpenConnectionDoctorButton: View {
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        Button("Connection doctor") {
            openWindow(id: "connection-doctor") // Match the window's identifier.
        }
    }
}
```


## 以编程方式关闭窗口

与窗口组 `WindowGroup` 类似：

```swift
struct ConnectionDoctor: View {
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

## 将窗口作为主场景

某些场景下，使用单窗口主视图就够用了。例如：对于依赖硬件资源（如相机）的视频通话应用程序显示多个窗口可能没有意义：

```swift
@main
struct VideoCall: App {
    var body: some Scene {
        Window("VideoCall", id: "main") {
            CameraView()
        }
    }
}
```

::: warning 注意

如果你的应用使用单个窗口作为其主要场景，则应用将在窗口关闭时退出。

此行为与使用窗口组 `WindowGroup` 作为其主要场景 `scene` 的应用不同，在后者中，即使关闭所有窗口，应用程序仍会继续运行。

:::