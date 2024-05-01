# Opening an immersive space

## `OpenImmersiveSpaceAction`

呈现沉浸式空间的操作。

```swift
struct OpenImmersiveSpaceAction
```

使用 `openImmersiveSpace` 环境值来获取给定环境的此结构的实例。

然后调用实例呈现一个空间。

你可以直接调用该实例，因为它定义了 `callAsFunction()` 方法，当您调用该实例时，Swift 会调用该方法。

例如，您可以定义一个在沉浸式空间中打开指定星球的按钮：


```swift
@main
struct SolarSystemApp: App {
    var body: some Scene {
        ImmersiveSpace(for: Planet.ID.self) { $planetID in
            // ...
        }
    }
}

struct ShowPlanetButton: View {
    var planet: Planet
    @Environment(\.openImmersiveSpace) private var openImmersiveSpace

    var body: some View {
        Button("Show \(planet.name)") {
            Task {
                await openImmersiveSpace(value: planet.ID)
            }
        }
    }
}
```

你可以通过以下任一方式指定要打开的沉浸式空间：
- 通过 `id` 参数传递一个字符串标识符。
- 通过一个与空间初始化器中指定的类型相匹配的 `value` 参数，正如上面的例子所示。
- 同时提供标识符和值。这使你能够定义多个接受相同类型输入值的空间，并通过它们的字符串标识符来区分它们。

此调用是异步的，会在展示空间后或出现错误时返回。你可以通过检查调用的返回值来检查错误，返回值的类型为 `OpenImmersiveSpaceAction.Result`。例如，如果你已经有一个沉浸式空间开启了，调用将返回错误，因为系统一次只允许开启一个空间。

如果在打开空间时提供了一个值，场景的尾随闭包会接收到一个绑定到你提供的值的绑定。为了获得最佳性能，使用轻量级数据作为展示值。对于符合 `Identifiable` 的结构化模型值，值的标识符作为展示值是一个不错的选择，就像上述代码中的 `planet.ID` 值一样。