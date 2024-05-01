# Closing windows

## `DismissWindow`

存储于 `Environment` 中的用于关闭窗口组或窗口的功能。

使用 `dismissWindow` 环境值获取给定环境的 `DismissWindowAction` 实例，然后调用实例来关闭窗口。

你可以直接调用该实例，因为它定义了 `callAsFunction(id:)` 方法，当你调用该实例时，Swift 会调用该方法。

例如：


```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        #if os(macOS)
        Window("Auxiliary", id: "auxiliary") {
            AuxiliaryContentView()
        }
        #endif
    }
}


struct DismissWindowButton: View {
    @Environment(\.dismissWindow) private var dismissWindow


    var body: some View {
        Button("Close Auxiliary Window") {
            dismissWindow(id: "auxiliary")
        }
    }
}

```


## `DismissWindowAction`


```swift
@available(iOS 17.0, macOS 14.0, visionOS 1.0, *)
@available(tvOS, unavailable)
@available(watchOS, unavailable)
public struct DismissWindowAction {
    public func callAsFunction()
    public func callAsFunction(id: String)
    public func callAsFunction<D>(value: D) where D : Decodable, D : Encodable, D : Hashable
    public func callAsFunction<D>(id: String, value: D) where D : Decodable, D : Encodable, D : Hashable
}
```

它内部封装了多个 `callAsFunction` 语法糖方法，可以方便的通过实例直接调用这些重载方法，支持多种方式关闭窗口(组)。

这些重载方法通过传入不同的入参，可以匹配对应的不同的场景窗口，例如：

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        #if os(macOS)
        Window("Auxiliary", id: "auxiliary") { // [!code focus]
            AuxiliaryContentView()
        }
        #endif
    }
}

struct DismissWindowButton: View {
    @Environment(\.dismissWindow) private var dismissWindow

    var body: some View {
        Button("Close Auxiliary Window") {
            dismissWindow(id: "auxiliary") // [!code focus]
        }
    }
}
```


## `DismissBehavior`

程序化窗口关闭行为。

```swift
struct DismissBehavior
```

使用此类型的值来控制当前事务期间窗口的关闭。

例如：

```swift
struct DismissWindowButton: View {
    @Environment(\.dismissWindow) private var dismissWindow

    var body: some View {
        Button("Close Auxiliary Window") {
            withTransaction(\.dismissBehavior, .destructive) {
                dismissWindow(id: "auxiliary")
            }
        }
    }
}
```

- `destructive`：破坏式的，强制的关闭，可能会丢失状态或数据。
- `interactive`：默认的，非强制的，如果有未保存的数据会提示。



