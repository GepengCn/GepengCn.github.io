# Creating an immersive space

使用 visionOS 中的沉浸式空间在任何容器之外呈现 SwiftUI 视图。 你可以在空间中包含任何视图，一般使用 `RealityView` 来展示 `RealityKit` 内容。

## `ImmersiveSpace`

在无限空间中呈现其内容的场景。


```swift
@main
struct SolarSystemApp: App {
    var body: some Scene {
        ImmersiveSpace {
            SolarSystem()
        }
    }
}
```

### Style the immersive space

默认情况下，沉浸式空间使用混合风格，将虚拟内容放置在人的周围环境中。

你可以通过将 `immersionStyle(selection:in:)` 场景修饰符添加到场景来为沉浸式空间选择不同的样式。

例如，你可以使用全沉浸式风格完全控制视觉体验：


```swift
@main
struct SolarSystemApp: App {
    @State private var style: ImmersionStyle = .full


    var body: some Scene {
        ImmersiveSpace {
            SolarSystem()
        }
        .immersionStyle(selection: $style, in: .full)
    }
}
```

你可以在呈现沉浸式空间后通过更改修改器的选择输入来更改沉浸样式，但你只能使用在修改器的第二个参数中指定的值之一。

对于任何类型的沉浸式体验，应用程序界面的其他部分（即窗口）仍然可见。但是，沉浸式风格会影响窗口与环境中的虚拟对象交互的方式：

- 对于混合样式，虚拟对象会遮挡该对象后面的部分或全部窗口。同样，窗口会遮挡窗口后面的虚拟对象。
- 对于其他样式，窗口始终呈现在虚拟内容前面，无论某人如何定位窗口或内容。这有助于人们避免在部分或完全穿过时丢失虚拟内容后面的窗口。

### Open an immersive space

你可以通过为其提供标识符以编程方式打开沉浸式空间。

例如，你可以标记上一示例中的太阳系视图：

```swift
ImmersiveSpace(id: "solarSystem") {
    SolarSystem()
}
```


在代码的其他位置，你可以使用 `openImmersiveSpace` 环境值来获取给定环境的 `OpenImmersiveSpaceAction` 结构的实例。

你可以使用标识符直接调用实例（例如，从按钮的闭包中调用，如以下代码所示）：

```swift
struct NewSolarSystemImmersiveSpace: View {
    var solarSystem: SolarSystem
    @Environment(\.openImmersiveSpace) private var openImmersiveSpace


    var body: some View {
        Button("Present Solar System") {
            Task {
                await openImmersiveSpace(id: "solarSystem")
            }
        }
    }
}
```

::: warning 注意
使用 `await` 标记对操作的调用，因为它是异步执行的。

当你的应用程序打开沉浸式空间时，系统会隐藏所有其他可见的应用程序。

该系统一次只允许打开一个沉浸式空间。

请务必先关闭打开的沉浸式空间，然后再打开另一个沉浸式空间。

:::


### Dismiss an immersive space

你可以通过从环境中调用 `dismissImmersiveSpace` 操作来关闭沉浸式空间。

例如，您可以定义一个按钮来关闭沉浸式空间：


```swift
struct DismissImmersiveSpaceButton: View {
    @Environment(\.dismissImmersiveSpace)
    private var dismissImmersiveSpace


    var body: some View {
        Button("Close Solar System") {
            Task {
                await dismissImmersiveSpace()
            }
        }
    }
}
```


::: warning 注意
关闭操作异步运行，就像打开操作一样。

关闭沉浸式空间时无需指定标识符，因为一次只能打开一个沉浸式空间。
:::


### Present an immersive space at launch


当应用启动时，它会打开应用正文中列出的第一个场景的实例。

但是，要在启动时打开沉浸式空间，你需要在应用程序的 `Info.plist` 文件中提供额外的配置信息。

特别是，将场景清单中的 `UIApplicationPreferredDefaultSceneSessionRole` 键设置为值 `UISceneSessionRoleImmersiveSpaceApplication`。


要配置启动时打开的沉浸式空间的样式，请将场景配置添加到场景会话角色。

将 `UISceneInitialImmersionStyle` 键与指示混合、完整或渐进样式之一的值一起使用。


## `ImmersiveSpaceContentBuilder`

用于组成沉浸式空间元素集合的结果构建器。

```swift
@resultBuilder
struct ImmersiveSpaceContentBuilder
```

## `ImmersionStyle`

沉浸式空间可以具有的风格。


```swift
protocol ImmersionStyle
```

- `automatic`: 默认的沉浸式风格。
- `full`: 一种沉浸式风格，可显示无限内容，完全取代透传视频。
- `mixed`: 一种沉浸式风格，显示与其他应用内容混合的无限内容以及透传视频。
- `progressive`: 一种沉浸式风格，可显示无限内容，部分取代透传视频。

例如：

```swift
@main
struct SolarSystemApp: App {
    @State private var style: ImmersionStyle = .full


    var body: some Scene {
        ImmersiveSpace {
            SolarSystem()
        }
        .immersionStyle(selection: $style, in: .full)
    }
}
```