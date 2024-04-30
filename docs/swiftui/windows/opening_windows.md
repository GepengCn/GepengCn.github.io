# Opening windows

## `SupportsMultipleWindows`

一个布尔值，指示当前平台是否支持打开多个窗口。


```swift
var supportsMultipleWindows: Bool { get }
```

从环境 `Environment` 中读取此属性以确定你的应用程序是否可以使用 `openWindow` 操作来打开新窗口：


```swift
struct NewMailViewerButton: View {
    @Environment(\.supportsMultipleWindows) private var supportsMultipleWindows
    @Environment(\.openWindow) private var openWindow


    var body: some View {
        Button("Open New Window") {
            openWindow(id: "mail-viewer")
        }
        .disabled(!supportsMultipleWindows)
    }
}
```

这个属性值取决于两个因素，一个是所在的平台，另一个是基于你应用的配置：

- 在 macOS 中，对于使用 SwiftUI 应用生命周期的任何应用程序，此属性都会返回 true。
- 在 iPadOS 中，对于使用 SwiftUI 应用生命周期并将 `UIApplicationSupportsMultipleScenes` 设置为 `true` 的任何应用程序，此属性都会返回 `true` 。
- 对于所有其他平台和配置，该值返回 `false`。

::: tip
在「项目」->「TARGETS」->「info」->「Custom iPadOS Target Properties」可以配置`UIApplicationSupportsMultipleScenes`键值。
:::

::: danger

如果该值为 `false` 并且您尝试打开窗口，SwiftUI 将忽略该操作并记录运行时错误。

:::


## `OpenWindow`

存储于 `Environment` 中的用于打开窗口组或窗口的功能。

使用 `openWindow` 环境值获取给定环境的 `OpenWindowAction` 实例，然后调用实例打开一个窗口。

你可以直接调用该实例，因为它定义了 `callAsFunction(id:)` 方法，当你调用该实例时，Swift 会调用该方法。

::: tip `callAsFunction`

`callAsFunction` 是一个特殊的函数，是一个语法糖，定义了这个方法之后，可以直接用「类」的「实例」来直接调用该方法（忽略该方法）。

例如：

```swift
struct ExampleStruct {

    var value: Int

    func callAsFunction(_ number: Int, scale: Int) {
        print(scale * (number + value))
    }

    func callAsFunction(scale: Int) {
        print(scale * (5 + value))
    }

}

let exampleStruct = ExampleStruct(value: 100)

exampleStruct(4, scale: 2) // 相当于exampleStruct.callAsFunction(4, scale: 2)

exampleStruct(scale: 2) // 相当于exampleStruct.callAsFunction(scale: 2)
```

:::

```swift
var openWindow: OpenWindowAction { get }
```


例如，您可以定义一个打开新邮件查看器窗口的按钮：

```swift
@main
struct Mail: App {
    var body: some Scene {
        WindowGroup(id: "mail-viewer") {
            MailViewer()
        }
    }
}

struct NewViewerButton: View {
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        Button("Open new mail viewer") {
            openWindow(id: "mail-viewer")
        }
    }
}
```

## `OpenWindowAction`

呈现一个窗口的方法。

```swift
@available(iOS 16.0, macOS 13.0, *)
@available(tvOS, unavailable)
@available(watchOS, unavailable)
public struct OpenWindowAction {
    public func callAsFunction<D>(value: D) where D : Decodable, D : Encodable, D : Hashable
    public func callAsFunction(id: String)
    public func callAsFunction<D>(id: String, value: D) where D : Decodable, D : Encodable, D : Hashable
}
```

它内部封装了多个 `callAsFunction` 语法糖方法，可以方便的通过实例直接调用这些重载方法，支持多种方式打开窗口(组)。

这些重载方法通过传入不同的入参，可以匹配对应的不同的场景窗口，例如：


```swift{4,16}
@main
struct Mail: App {
    var body: some Scene {
        WindowGroup(id: "mail-viewer") {// [!code focus]
            MailViewer()
        }
    }
}


struct NewViewerButton: View {
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        Button("Open new mail viewer") {
            openWindow(id: "mail-viewer")// [!code focus]
        }
    }
}
```