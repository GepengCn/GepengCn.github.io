# Persistent storage

跨应用程序会话存储数据。

操作系统提供了在应用程序关闭时存储数据的方法，以便人们稍后再次打开应用程序时，可以不间断地继续工作。您所使用的机制取决于多个因素，比如需要存储什么内容、存储量的大小、是否需要对数据进行序列化访问或随机访问等。

在 SwiftUI 应用中，你使用与其他任何应用相同的存储类型。例如，你可以使用 `FileManager` 接口访问磁盘上的文件。然而，SwiftUI 也提供了一些便利性功能，使得在声明式编程环境下更容易使用某些类型的持久化存储。例如，你可以使用 `FetchRequest` 和 `FetchedResults` 来与 `Core Data` 模型进行交互。

## Saving state across app launches

### Restoring Your App’s State with SwiftUI



此SwiftUI示例项目展示了如何保存应用的状态信息，并在后续启动时将应用恢复到先前状态。在后续启动过程中，将界面恢复到之前的交互点为用户提供了连续性，使他们能够快速完成活跃任务。

在使用应用的过程中，用户执行会影响用户界面的操作。例如，用户可能查看特定的信息页面，然后在用户离开应用后，操作系统可能会终止该应用以释放其占用的资源。用户可以回到他们离开的地方——而用户界面状态恢复是实现这一无缝体验的核心部分。

此示例应用演示了在系统中断应用的情景下使用状态保存与恢复的功能。示例项目管理一组产品。每个产品都有一个标题、一张图片以及其他可以查看和编辑的元数据。该项目展示了如何在产品的DetailView中保存和恢复产品状态。

#### Configure the Sample Code Project

在 Xcode 中，请在 iOS 目标的「Signing & Capabilities」（签名与功能）标签页上选择您的开发团队。

#### Enable State Preservation and Restoration

此示例代码项目利用 SwiftUI 的 `Scene` 来管理应用程序的用户界面，其生命周期由系统管理。在 iOS 上，状态恢复在窗口或场景级别尤为重要，因为窗口经常出现和消失。有必要保存和恢复与每个窗口关联的状态。在 iPad 上，这一点尤其重要，因为切换器中的应用并不一定在运行。场景级别的状态恢复保持了它们仍在运行的错觉。

为了支持状态保存与恢复，此示例使用 `NSUserActivity` 对象。对于每个用户活动，应用必须在其 `Info.plist` 中提供一个定义的活动类型。

#### Use Scene Storage

SwiftUI 引入了「存储场景数据」或称为 `SceneStorage` 的概念。类似于 `State` 的工作方式，`SceneStorage` 是一个属性包装器类型，包含键/值对。键使得系统能够正确保存和恢复值。值需要是 `plist` 类型，以便系统能正确保存和恢复它。iOS 通过键/值摄入这个场景存储，然后读取和写入持久化的、每场景存储。操作系统代表用户管理场景存储的保存与恢复。支持场景存储的基础数据并不直接可访问，因此应用必须通过 `@SceneStorage` 属性包装器来访问它。操作系统不对数据何时以及多久会被持久化做出保证。场景存储中的数据不一定等同于应用的数据模型。场景存储旨在与数据模型一起使用。最终，可以将场景存储视为“限于场景的状态”。不要将场景存储用于敏感数据。

每个需要自身状态保存的视图都实现了 `@SceneStorage` 属性包装器。例如，`ContentView` 使用了一个来恢复所选产品：

```swift
@SceneStorage("ContentView.selectedProduct") private var selectedProduct: String?
```

`DetailView` 使用了一个来恢复当前选定的标签页：

```swift
@SceneStorage("DetailView.selectedTab") private var selectedTab = Tabs.detail
```

每个场景存储的键必须是唯一的，并且要适当地限制在应用内的区域或用途中。因为这个场景存储是特定于应用的，所以没有必要在其前缀加上应用的包标识符。在需要的地方使用一些消除歧义的前缀来确保它的唯一性。

#### Restore the App State with an Activity Object

`NSUserActivity` 对象捕获了应用在当前时间点的状态。例如，可以包含关于应用当前正在显示的数据的信息。系统会保存所提供的对象，并在下次启动应用时将其返回给应用。当用户关闭应用或应用进入后台时，示例会创建一个新的 `NSUserActivity` 对象。

每个希望为接力、`Spotlight` 等宣传 `NSUserActivity` 的 SwiftUI 视图都必须指定一个 `userActivity(_:isActive:_:)` 视图修改器来宣传 `NSUserActivity`。`activityType` 参数是用户活动的类型，`isActive` 参数表示是否宣传指定类型的用户活动（此参数默认为true），以及是否使用指定的处理程序填充用户活动内容。用户活动的作用域仅限于视图所在的场景或窗口。多个视图可以宣传相同的活动类型，而且处理程序都可以为用户活动的内容作出贡献。请注意，只有当 `isActive` 参数为 `true` 的 `userActivity` 视图修改器，其处理程序才会被调用。如果没有任何 `userActivity` 视图修改器将 `isActive` 指定为 `true`，那么 iOS 将不会宣传该用户活动。

每个希望处理传入 `NSUserActivities` 的 SwiftUI 视图都必须指定一个 `onContinueUserActivity(_:perform:)` 视图修改器。这需要 `NSUserActivity` 类型和一个处理程序，当视图接收到针对其所在场景或窗口的指定活动类型时调用该处理程序。


```swift
.onContinueUserActivity(DetailView.productUserActivityType) { userActivity in
    if let product = try? userActivity.typedPayload(Product.self) {
        selectedProduct = product.id.uuidString
    }
}
```

#### Test State Restoration

此示例恢复了以下用户界面：

- 详细信息视图控制器 — 在集合视图中点击一个产品以打开其详细信息。应用会恢复所选产品和所选标签页。
- 详细信息视图控制器的编辑状态 — 在详细信息视图中，点击编辑。应用会恢复编辑视图及其内容。
- 次级窗口 — （仅限 iPad ）从集合视图中将一个产品拖到设备屏幕的左侧或右侧以创建第二个场景窗口。应用会恢复那个场景及其产品。

状态恢复既可在设备上也可在模拟器上进行测试。在调试示例项目时，当用户强制退出应用时，系统会自动删除其保存的状态信息。删除保存的状态信息是一种安全预防措施。此外，如果应用在启动时崩溃，系统也会删除保存的状态信息。

为了测试示例应用恢复状态的能力，在调试期间不要使用应用切换器强制退出它。相反，应使用 Xcode 停止应用或以编程方式停止应用。另一种技术是使用 `Home` 按钮暂停示例应用，然后在 Xcode 中停止调试器。再次使用 Xcode 启动示例应用，SwiftUI 将启动状态恢复过程。

要结合接力功能使用 `Spotlight`，请按照以下步骤操作：

- 在 Xcode 中，在 `DetailView.swift` 的 `onContinueUserActivity` 闭包处设置断点。
- 运行示例项目。
- 在集合视图中点击一个产品（如“樱桃”）以导航到其详细信息。
- 从屏幕顶部向下拉出系统面板（强制 `Spotlight` 更新其索引并请求活动）。注意，此时 iOS 会调用 `DetailView` 的 `userActivity` 闭包。
- 返回应用，并回到集合视图。
- 点击除樱桃（如芒果）以外的产品。
- 通过点击Home按钮暂停应用。
- 在主屏幕上，向下滑动以打开 `Spotlight` 窗口。
- 在 `Spotlight` 搜索栏中，输入“樱桃”。搜索结果将显示“显示樱桃产品”。
- 点击它。注意，`DetailView的onContinueUserActivity` 闭包将被调用。详细信息视图将显示樱桃产品。