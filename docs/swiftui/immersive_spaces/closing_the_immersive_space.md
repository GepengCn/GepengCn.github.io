# Closing the immersive space

## `DismissImmersiveSpaceAction`

用于关闭沉浸式空间的操作。


```swift
struct DismissImmersiveSpaceAction
```

使用 `dismissImmersiveSpace` 环境值来为给定的环境获取这种类型的实例。然后调用该实例来关闭一个空间。

你可以直接调用该实例，因为它定义了一个 `callAsFunction()` 方法，当你调用该实例时，Swift 会调用这个方法。

例如，你可以定义一个按钮来关闭沉浸式空间：


```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            DismissImmersiveSpaceButton()
        }
        ImmersiveSpace(id: "solarSystem") {
            SolarSystemView()
        }
    }
}

struct DismissImmersiveSpaceButton: View {
    @Environment(\.dismissImmersiveSpace) private var dismissImmersiveSpace

    var body: some View {
        Button("Dismiss") {
            Task {
                await dismissImmersiveSpace()
            }
        }
    }
}
```


异步调用在系统完成关闭空间后返回。

与你用来打开空间的 `openImmersiveSpace` 调用不同——后者需要一个标识符、一个值或两者来指定要打开哪个空间——关闭操作不需要任何参数，因为一次只能开启一个沉浸式空间。

该调用会关闭当前已经开启的空间（如果有的话）。