# 异步加载图像

## `AsyncImage`

异步加载并显示图像的视图。

```swift
struct AsyncImage<Content> where Content : View
```

此视图使用共享的 `URLSession` 实例从指定的 `URL` 加载图像，然后显示它。例如，你可以显示存储在服务器上的图标：

```swift
AsyncImage(url: URL(string: "https://example.com/icon.png"))
.frame(width: 200, height: 200)
```

在图像加载之前，视图显示一个填充可用空间的标准占位符。加载成功完成后，视图更新以显示图像。在上面的示例中，图标小于框架，因此看起来比占位符小。

![AsyncImage-1@2x](../../images/AsyncImage-1@2x.png)

你可以使用 `init(url:scale:content:placeholder:)` 指定自定义占位符。使用此初始化程序，你还可以使用 `content` 参数来操作加载的图像。例如，你可以添加一个修饰符使加载的图像可调整大小：

```swift
AsyncImage(url: URL(string: "https://example.com/icon.png")) { image in
    image.resizable()
} placeholder: {
    ProgressView()
}
.frame(width: 50, height: 50)
```

对于此示例，SwiftUI 首先显示一个 `ProgressView`，然后显示缩放以适合指定框架的图像：

![AsyncImage-2@2x](../../images/AsyncImage-2@2x.png)

::: warning
你不能将特定于图像的修饰符（如 `resizable(capInsets:resizingMode:)`）直接应用于 `AsyncImage`。相反，将它们应用于在定义视图外观时 `content` 闭包获取的 `Image` 实例。
:::

要对加载过程进行更多控制，请使用 `init(url:scale:transaction:content:)` 初始化程序，该初始化程序接受一个 `content` 闭包，该闭包接收一个 `AsyncImagePhase` 以指示加载操作的状态。返回一个适合当前阶段的视图：


```swift
AsyncImage(url: URL(string: "https://example.com/icon.png")) { phase in
    if let image = phase.image {
        image // Displays the loaded image.
    } else if phase.error != nil {
        Color.red // Indicates an error.
    } else {
        Color.blue // Acts as a placeholder.
    }
}
```

## `AsyncImagePhase`

异步图像加载操作的当前阶段。

```swift
enum AsyncImagePhase
```

当你使用 `init(url:scale:transaction:content:)` 初始化程序创建 `AsyncImage` 实例时，你使用 `content` 闭包定义视图的外观。SwiftUI 在加载操作期间的不同点使用阶段值调用闭包以指示当前状态。使用阶段来决定绘制什么。例如，如果存在加载的图像，你可以绘制它，绘制指示错误的视图或绘制占位符：

```swift
AsyncImage(url: URL(string: "https://example.com/icon.png")) { phase in
    if let image = phase.image {
        image // Displays the loaded image.
    } else if phase.error != nil {
        Color.red // Indicates an error.
    } else {
        Color.blue // Acts as a placeholder.
    }
}
```

- `empty`: 未加载任何图像。
- `success(Image)`: 成功加载图像。
- `failure(any Error)`: 加载图像时出错。