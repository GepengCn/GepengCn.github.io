# App organization：应用组织架构

定义应用程序的入口点和顶层结构。


## App 协议

表示应用程序的结构和行为的类型。

### body

通过实现 `body` 这个计算属性来定义整个 `app` 要展示的内容，这是 `app` 的入口，如下例：


```swift{3-7}
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            Text("Hello, world!")
        }
    }
}
```

`body` 返回的是一个 `Scene` 场景的类型，其中 `WindowGroup` 是 SwiftUI 内置的场景之一，其它的比如还有「设置」场景、「显示文档」场景等，甚至你可以自定义场景。

`Text("Hello, world!")` 就是场景中入口的视图了，一旦启动 `app`，看到的就是它，这只是个示例，一般情况下，这个入口视图我们会选择使用一个容器视图来容纳更多的内容，比如使用`TabView`、`List`等。


### Scene

应用程序用户界面的一部分，其生命周期由系统管理。

场景 `Scene` 充当一个用来向用户展示整个视图结构的容器的角色。系统决定何时以及如何以适合平台并依赖于应用程序当前状态的方式在用户界面中呈现视图层次结构。


### @SceneBuilder

```swift
@SceneBuilder @MainActor var body: Self.Body { get }
```

SwiftUI 对 `body` 属性使用了一个「结果构造器」`@SceneBuilder`，用来将多个场景组合为一个单独的复合场景。

```swift
@main
struct Mail: App {
    var body: some Scene {
        WindowGroup {
            MailViewer()
        }
        Settings {
            SettingsView()
        }
    }
}
```
如上例，将这两个场景 `WindowGroup` 和 `Settings` 组合为一个单独的场景，类似于容器视图的 `@ViewBuilder` 一般的用法。



### @MainActor

`@MainActor` 是 Swift 定义的一个特殊的 `GlobalActor`。其职责是确保所有标记为 `@MainActor` 的代码都在同一串行队列中执行，并且这一切发生在主线程上。

对 `body` 属性显式地标记为 `@MainActor` 意味着 编译器会确保 `body` 内的属性或方法都将运行在主线程中，并且是在同一串行队列。

### WindowGroup

与上例中的 `Settings` 一样，它是 `Scene` 场景的一个具体实现。

例如，上例中的 `WindowGroup`，系统允许用户在 macOS 和 iPadOS 等平台上创建（多窗口展示，每个窗口占用一部分屏幕）或删除包含 `Mail` 的窗口。

在其他平台上，相同的视图层次结构在活动时可能会占用整个显示，比如在 iOS 上，就提供一个窗口并且会全屏显示，不提供多窗口展示的能力。

### @main

用来指明你的程序的顶级入口，并且只能有一个顶级入口。

`@main` 修饰的类或结构体中， 必须提供一个不接收任何参数，且返回值为 `Void` 的 `main` 类型函数。

`main` 函数被声明在 `App` 协议的扩展中，

```swift
@available(iOS 14.0, macOS 11.0, tvOS 14.0, watchOS 7.0, *)
extension App {
    @MainActor public static func main()
}
```

SwiftUI 提供了该方法的默认实现，以适合平台的方式管理启动过程。

## 针对 iOS 和 iPadOS

### UILaunchScreen


[`UILaunchScreen`](https://developer.apple.com/documentation/xcode/specifying-your-apps-launch-screen) 是指 iOS 应用程序的启动屏幕，也称为 `Splash Screen`，在应用程序加载并初始化其初始界面之前显示。这个启动屏幕为用户提供了一个平滑过渡的视觉效果，通常显示应用的标志或其他相关图形。



### UIApplicationDelegateAdaptor

```swift
@MainActor @propertyWrapper
struct UIApplicationDelegateAdaptor<DelegateType> where DelegateType : NSObject, DelegateType : UIApplicationDelegate
```

[`UIApplicationDelegateAdaptor`](https://developer.apple.com/documentation/swiftui/uiapplicationdelegateadaptor) 用于在 SwiftUI 应用程序中桥接和使用传统的 UIKit 应用程序委托的一个属性包装器。

在 SwiftUI 架构下，界面更多依赖声明式编程模型，而 UIKit 则采用命令式编程。

为了允许开发者在 SwiftUI 应用中继续使用 UIKit 的功能和生命周期事件处理，`UIApplicationDelegateAdaptor` 提供了一个平滑的过渡。

```swift
@main
struct MyApp: App {
    @UIApplicationDelegateAdaptor private var appDelegate: MyAppDelegate

    var body: some Scene { ... }
}

class MyAppDelegate: NSObject, UIApplicationDelegate, ObservableObject {
    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        // Record the device token.
    }
}
```


## 针对 macOS

### NSApplicationDelegateAdaptor

```swift
@MainActor @propertyWrapper
struct NSApplicationDelegateAdaptor<DelegateType> where DelegateType : NSObject, DelegateType : NSApplicationDelegate
```

[`NSApplicationDelegateAdaptor`](https://developer.apple.com/documentation/swiftui/nsapplicationdelegateadaptor) 是 Swift 和 SwiftUI 在 macOS 应用程序开发中使用的属性包装器，类似于 iOS 上的 `UIApplicationDelegateAdaptor`。

它用于在 SwiftUI 应用程序中集成传统的 AppKit 委托模式。通过这种方式，开发者可以在使用 SwiftUI 构建现代 macOS 应用程序的同时，继续访问 AppKit 提供的各种应用程序生命周期和系统交互功能。


```swift
@main
struct MyApp: App {
    @NSApplicationDelegateAdaptor private var appDelegate: MyAppDelegate

    var body: some Scene { ... }
}

class MyAppDelegate: NSObject, NSApplicationDelegate, ObservableObject {
    func application(
        _ application: NSApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        // Record the device token.
    }
}
```

## 针对 watchOS

### WKApplicationDelegateAdaptor

```swift
@MainActor @propertyWrapper
struct WKApplicationDelegateAdaptor<DelegateType> where DelegateType : NSObject, DelegateType : WKApplicationDelegate
```

[`WKApplicationDelegateAdaptor`](https://developer.apple.com/documentation/swiftui/wkapplicationdelegateadaptor) 是在 watchOS 应用开发中使用 SwiftUI 时引入的属性包装器，其作用类似于 iOS 的 `UIApplicationDelegateAdaptor` 和 macOS 的 `NSApplicationDelegateAdaptor`。

它允许开发者在使用 SwiftUI 构建 watchOS 应用的同时，集成传统的 WatchKit 委托模式，以利用 WatchKit 提供的应用程序生命周期和系统交互功能。


```swift
import SwiftUI
import WatchKit

@main
struct MyApp: App {
    @WKApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

class AppDelegate: NSObject, WKExtensionDelegate {
    func applicationDidFinishLaunching() {
        // 应用启动时的初始化代码
    }

    // 其他代理方法...
}
```


### WKExtensionDelegateAdaptor

```swift
@MainActor @propertyWrapper
struct WKExtensionDelegateAdaptor<DelegateType> where DelegateType : NSObject, DelegateType : WKExtensionDelegate
```


[`WKExtensionDelegateAdaptor`](https://developer.apple.com/documentation/swiftui/wkextensiondelegateadaptor) 是 SwiftUI 在 watchOS 应用开发中使用的属性包装器，用于集成传统的 WatchKit 扩展代理。

这个属性包装器允许开发者在使用 SwiftUI 构建 watchOS 应用程序时，仍然能够访问和利用 WatchKit 的生命周期和系统级功能。


```swift
import SwiftUI
import WatchKit

@main
struct MyApp: App {
    @WKExtensionDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

class AppDelegate: NSObject, WKExtensionDelegate {
    func applicationDidFinishLaunching() {
        // 应用启动完成的初始化代码
    }

    // 实现其他必要的代理方法...
}

```