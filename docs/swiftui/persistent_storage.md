# Persistent storage

跨应用程序会话存储数据。

操作系统提供了在应用程序关闭时存储数据的方法，以便人们稍后再次打开应用程序时，可以不间断地继续工作。你所使用的机制取决于多个因素，比如需要存储什么内容、存储量的大小、是否需要对数据进行序列化访问或随机访问等。

在 SwiftUI 应用中，你使用与其他任何应用相同的存储类型。例如，你可以使用 `FileManager` 接口访问磁盘上的文件。然而，SwiftUI 也提供了一些便利性功能，使得在声明式编程环境下更容易使用某些类型的持久化存储。例如，你可以使用 `FetchRequest` 和 `FetchedResults` 来与 `Core Data` 模型进行交互。

## Restoring Your App’s State with SwiftUI



此SwiftUI示例项目展示了如何保存应用的状态信息，并在后续启动时将应用恢复到先前状态。在后续启动过程中，将界面恢复到之前的交互点为用户提供了连续性，使他们能够快速完成活跃任务。

在使用应用的过程中，用户执行会影响用户界面的操作。例如，用户可能查看特定的信息页面，然后在用户离开应用后，操作系统可能会终止该应用以释放其占用的资源。用户可以回到他们离开的地方——而用户界面状态恢复是实现这一无缝体验的核心部分。

此示例应用演示了在系统中断应用的情景下使用状态保存与恢复的功能。示例项目管理一组产品。每个产品都有一个标题、一张图片以及其他可以查看和编辑的元数据。该项目展示了如何在产品的DetailView中保存和恢复产品状态。

### Configure the Sample Code Project

在 Xcode 中，请在 iOS 目标的「Signing & Capabilities」（签名与功能）标签页上选择你的开发团队。

### Enable State Preservation and Restoration

此示例代码项目利用 SwiftUI 的 `Scene` 来管理应用程序的用户界面，其生命周期由系统管理。在 iOS 上，状态恢复在窗口或场景级别尤为重要，因为窗口经常出现和消失。有必要保存和恢复与每个窗口关联的状态。在 iPad 上，这一点尤其重要，因为切换器中的应用并不一定在运行。场景级别的状态恢复保持了它们仍在运行的错觉。

为了支持状态保存与恢复，此示例使用 `NSUserActivity` 对象。对于每个用户活动，应用必须在其 `Info.plist` 中提供一个定义的活动类型。

### Use Scene Storage

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

### Restore the App State with an Activity Object

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

### Test State Restoration

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

## `defaultAppStorage(_:)`

`AppStorage` 内部视图中使用的默认存储位置。

```swift
func defaultAppStorage(_ store: UserDefaults) -> some View
```

如果不特别指定，视图层级结构的默认存储位置是 `UserDefaults.standard`，但也可以设置为自定义的存储位置。例如，为了在应用程序和扩展之间共享默认设置，可以将默认存储位置覆盖为使用 `UserDefaults.init(suiteName:)` 方法创建的一个实例。

## `AppStorage`

这是一个属性包装器类型，它从 `UserDefaults` 中反映一个值，并且当该用户默认值发生改变时使视图失效。

```swift
@frozen @propertyWrapper
struct AppStorage<Value>
```


### `init(wrappedValue:_:store:)`

创建一个属性，该属性能够读取和写入字符串类型的用户默认值。

```swift
init(
    wrappedValue: Value,
    _ key: String,
    store: UserDefaults? = nil
) where Value == String
```

## `SceneStorage`

这是一种属性包装器类型，用于读取和写入持久化的、每个场景专用的存储空间。

```swift
@frozen @propertyWrapper
struct SceneStorage<Value>
```


当你需要自动恢复某个值的状态时，可以使用 `SceneStorage`。`SceneStorage` 的工作方式与 `State` 非常相似，不同之处在于，如果之前保存过，其初始值会由系统恢复，并且该值会与同一场景中的其他 `SceneStorage` 变量共享。

系统会代表你管理 `SceneStorage` 的保存和恢复。支持 `SceneStorage` 的底层数据对你不可直接访问，因此你必须通过 `SceneStorage` 属性包装器来访问它。系统不对数据何时以及多久会被持久化做任何保证。

每个场景都有其自己的 `SceneStorage` 概念，所以数据不会在场景间共享。

确保与 `SceneStorage` 一起使用的数据是轻量级的。像模型数据这样大尺寸的数据不应存储在 `SceneStorage` 中，因为可能会导致性能不佳。

如果场景被显式销毁（例如，在 iPadOS 上切换器快照被销毁，或在 macOS 上窗口被关闭），那么相关数据也会被销毁。不要使用 `SceneStorage` 存储敏感数据。


## Loading and Displaying a Large Data Feed

此示例创建了一个应用程序，通过消费美国地质调查局( `USGS` )的实时数据源，展示了过去 $30$ 天内在美国记录的地震列表。

为了加载 `USGS` 的 `JSON` 源，可以执行以下任一操作：

- 在 iOS 上，下拉以刷新列表。
- 在 iOS 和 macOS 上，按下刷新按钮（ `⌘R` ）。

应用将在 `URLSession` 的默认代理队列上加载请求的数据，这是一个在后台运行的操作队列。数据源下载完成后，且会话数据任务完成，应用将继续在这个队列上工作，将大量源元素导入到存储中，期间不会阻塞主线程。这样可以确保应用在后台高效地处理数据，同时保持用户界面响应流畅。

### Import Data in the Background

为了在后台导入数据，应用可能需要使用一个或两个托管对象上下文。本示例使用了两个 `NSManagedObjectContext` 实例：

- 一个主队列上下文，用于向用户界面提供数据。
- 一个私有队列上下文，在后台队列上执行导入操作。

这两个上下文都连接到同一个 `persistentStoreCoordinator`。这种配置比使用嵌套上下文更有效率。

示例通过使用 `NSPersistentContainer` 设置 Core Data 堆栈来创建主队列上下文，它在其 `viewContext` 属性中初始化了一个主队列上下文。这种方法简化了 Core Data 的配置过程，使得开发者能够快速地为应用搭建数据管理基础。

```swift
let container = NSPersistentContainer(name: "Earthquakes")
```

通过调用持久容器的 `newBackgroundContext()` 方法来创建一个私有队列上下文。

```swift
let taskContext = container.newBackgroundContext()
```

当数据源下载完成后，示例使用任务上下文在后台处理数据源。在 Core Data 中，每个基于队列的上下文都有自己的串行队列，应用程序必须通过使用带有或不带有 `await` 关键字的 `perform(_:)` 方法，或者使用 `performAndWait(_:)` 闭包，来序列化与队列交互以操作上下文的任务代码。这意味着要确保对上下文的所有修改都在这些方法包裹的代码块中进行，以此维护线程安全并正确管理数据访问。

```swift
try await taskContext.perform {
```

为了高效处理大型数据集，示例采用了 `NSBatchInsertRequest`，它直接访问存储——不与上下文互动，不触发任何键值观察，也不分配托管对象。`NSBatchInsertRequest` 的闭包式初始化器允许应用在Core Data调用 `dictionaryHandler` 闭包时一次提供一条记录，这有助于应用保持较低的内存占用，因为它们不需要为所有记录预先准备缓冲区。这种方式特别适合大量数据插入操作，可以显著提高性能并减少内存使用。

```swift
let batchInsertRequest = self.newBatchInsertRequest(with: propertiesList)
if let fetchResult = try? taskContext.execute(batchInsertRequest),
    let batchInsertResult = fetchResult as? NSBatchInsertResult,
    let success = batchInsertResult.result as? Bool, success {
    return
}

```

### Merge Changes and Update the User Interface

由于 `NSBatchInsertRequest` 绕过了上下文并且不会触发 `NSManagedObjectContextDidSave` 通知，需要根据变更更新UI的应用有两个选择：

- 通过解析存储的持久历史来提取相关更改，然后将它们合并到视图上下文中。
- 从存储中重新获取数据。但是，如果视图上下文固定在查询生成上，则在获取数据之前需要重置上下文。

本示例使用持久存储远程更改通知和持久历史跟踪来更新UI，原因如下：

- 数据模型包含单一实体，因此所有更改都与列表相关，不需要在历史记录中解析特定更改。
- `FetchRequest` 直接从存储中获取并检索结果，列表自动刷新其内容。
- SwiftUI 仅关注视图上下文，因此 `QuakesProvider` 观察 `NSPersistentStoreRemoteChange`通知，以便将来自执行批处理操作的后台上下文的更改合并到视图上下文中。

通过在存储描述上将 `NSPersistentStoreRemoteChangeNotificationPostOptionKey` 选项设置为 `true`，来为持久存储启用远程更改通知。

```swift
description.setOption(true as NSNumber,
forKey: NSPersistentStoreRemoteChangeNotificationPostOptionKey)
```

同时，通过将 `NSPersistentHistoryTrackingKey` 选项设置为 `true`，来为持久存储启用持久历史跟踪。

```swift
description.setOption(true as NSNumber,
forKey: NSPersistentHistoryTrackingKey)
```

每当持久化存储中发生更改，包括其他进程的写入操作时，存储会发布一个远程更改通知。当示例接收到此通知时，它会获取给定标记之后的持久历史事务和发生的更改。在持久历史更改请求检索到历史记录后，示例通过 `mergeChanges(fromContextDidSave:)` 将每个事务的 `objectIDNotification()` 合并到视图上下文中。这样做可以确保视图上下文了解到所有后台上下文中已完成的更改，从而能够适时更新 UI 以反映最新数据。

```swift
let changeRequest = NSPersistentHistoryChangeRequest.fetchHistory(after: self.lastToken)
let historyResult = try taskContext.execute(changeRequest) as? NSPersistentHistoryResult
if let history = historyResult?.result as? [NSPersistentHistoryTransaction],
            !history.isEmpty {
                self.mergePersistentHistoryChanges(from: history)
                return
}
```

在执行每个 `NSBatchInsertRequest` 或 `NSBatchDeleteRequest` 之后，示例会将任何UI更新调度回主线程，以便在 SwiftUI 中呈现这些更新。这样做是因为UI的更新和渲染必须在主线程（也称为 UI 线程）上执行，以确保界面的流畅性和响应性。通过将后台处理的结果传回主线程处理，可以避免因跨线程直接操作 UI 而导致的线程冲突问题。

```swift
let viewContext = container.viewContext
viewContext.perform {
    for transaction in history {
        viewContext.mergeChanges(fromContextDidSave: transaction.objectIDNotification())
        self.lastToken = transaction.token
    }
}

```

在合并了最后一个事务的更改后，示例需要将该标记存储在内存或磁盘上，以便在后续的持久历史更改请求中使用它。这样可以确保下一次接收远程更改通知并获取历史记录时，能从上次处理过的位置继续，避免遗漏或重复处理数据变更，保持数据处理的连续性和准确性。


### Work in Batches to Lower Memory Footprint

当应用在一个上下文中获取或创建对象时，`Core Data` 会缓存这些对象，以便在应用再次使用这些对象时避免往返存储文件，从而提高了效率。然而，随着处理的对象越来越多，这种方法会导致应用的内存占用逐渐增加，最终可能导致 iOS 设备上出现低内存警告或应用终止。而 `NSBatchInsertRequest` 并不会明显增加应用的内存占用，因为它并不将数据加载到内存中，从而在处理大量数据插入时更加高效且资源友好。

::: info
针对 iOS 13 或 macOS 10.15 之前的系统运行的应用程序需要通过分批次处理对象并在每批次处理后调用 `reset()` 来重置上下文，以避免内存占用不断增长的问题。这样做可以定期清理上下文中的缓存对象，释放内存，确保应用在处理大量数据时维持较低的内存占用，从而提高在旧系统上的稳定性和性能。
:::

示例将 `viewContext` 的 `automaticallyMergesChangesFromParent` 属性设置为 `false`，以阻止 `Core Data` 在每次后台上下文保存时自动合并更改。这样做可以让应用控制何时手动合并后台上下文的更改到视图上下文，从而更好地管理数据同步和 U I更新的时机，避免不必要的性能开销或界面闪烁。

```swift
container.viewContext.automaticallyMergesChangesFromParent = false
```

### Prevent Duplicate Data in the Store

每次示例应用重新加载 JSON 源数据时，解析出的数据包含了过去一个月的所有地震记录，因此可能会有许多已导入数据的重复项。为了避免创建重复记录，应用需限制一个属性或属性组合，在所有实例中保持唯一。

在本例中，`code` 属性唯一标识了一个地震记录，因此在 `Quake` 实体上约束 `code`，可确保没有两个存储的记录具有相同的 `code` 值。

在数据模型编辑器中，选择 `Quake` 实体。在数据模型检查器中，在 `Constraints` 列表下的 `+`按钮上点击，添加一个新的约束。此时会出现一个约束占位符。

```swift
comma, separated, properties
```

双击占位符进行编辑。输入属性名称，或以逗号分隔的属性列表，作为实体上的唯一约束条件。


```swift
code
```

现在，在保存新记录时，存储会检查是否已经存在具有相同约束属性值的记录。如果遇到冲突，将采用 `NSMergeByPropertyObjectTrumpMergePolicy` 合并策略，新记录会覆盖现有记录的所有字段。这意味着如果有重复的 `code` 值，新导入的地震记录会替代原有记录，确保数据库中每个 `code` 值对应的数据都是最新的。


```swift
container.viewContext.automaticallyMergesChangesFromParent = false
```

## `FetchRequest`

这是一种属性包装器类型，用于从 Core Data 持久化存储中检索实体。

```swift
@MainActor @propertyWrapper
struct FetchRequest<Result> where Result : NSFetchRequestResult
```

使用 `@FetchRequest` 属性包装器声明一个 `FetchedResults` 属性，为 SwiftUI 视图提供 Core Data 托管对象的集合。请求会根据你指定的 `Result` 占位符类型推断实体类型。可以通过可选的谓词和排序描述符来条件化请求。例如，你可以创建一个请求，列出「加载和显示大量数据源示例代码项目」中定义的所有存储地震数据的 `Quake` 托管对象，并按它们的 `time` 属性排序：

```swift
@FetchRequest(sortDescriptors: [SortDescriptor(\.time, order: .reverse)])
private var quakes: FetchedResults<Quake> // Define Quake in your model.
```

作为另一种选择，当你需要更多灵活性时，可以使用配置好的 `NSFetchRequest` 实例来初始化请求：

```swift
@FetchRequest(fetchRequest: request)
private var quakes: FetchedResults<Quake>
```


始终将具有 `fetch request` 包装器的属性声明为私有。这样可以让编译器帮助你避免意外地从封装视图的成员初始化器中设置该属性。

`fetch request` 及其结果使用存储在环境中的托管对象上下文，你可以通过使用 `managedObjectContext` 环境值来访问它。为了支持用户界面活动，通常依赖于共享 `NSPersistentContainer` 实例的 `viewContext` 属性。例如，你可以使用作为模型一部分定义的共享容器，在顶层内容视图上设置上下文：

```swift
ContentView()
    .environment(
        \.managedObjectContext,
        QuakesProvider.shared.container.viewContext)

```

当需要动态更改谓词或排序描述符时，访问请求的 `FetchRequest.Configuration` 结构。若要创建根据它们共有的特征对检索结果进行分组的请求，请改用 `SectionedFetchRequest`。

## `FetchedResults`

从 Core Data 存储中检索的结果集。

```swift
struct FetchedResults<Result> where Result : NSFetchRequestResult
```

使用 `FetchedResults` 实例在应用的用户界面中展示或编辑 Core Data 托管对象。通过指定一个实体类型作为结果类型（ `Result` 类型），并在获取结果属性声明上使用 `FetchRequest` 属性包装器来请求特定的一组结果。例如，你可以创建一个请求，列出「加载和显示大量数据源示例代码项目」中定义的所有用于存储地震数据的 `Quake` 托管对象，并按它们的 `time` 属性排序：

```swift
@FetchRequest(sortDescriptors: [SortDescriptor(\.time, order: .reverse)])
private var quakes: FetchedResults<Quake>
```

结果实例遵循 `RandomAccessCollection` 协议，因此你可以像访问其他集合一样访问它。例如，你可以创建一个遍历所有结果的 `List`：

```swift
List(quakes) { quake in
    NavigationLink(destination: QuakeDetail(quake: quake)) {
        QuakeRow(quake: quake)
    }
}
```


当需要动态更改请求的谓词或排序描述符时，请相应地设置结果实例的 `nsPredicate` 和 `sortDescriptors` 或 `nsSortDescriptors` 属性。

`fetch` 请求及其结果利用了存储在环境中的托管对象上下文，你可以通过使用 `managedObjectContext` 环境值来访问它。为了支持用户界面活动，通常依赖于共享 `NSPersistentContainer` 实例的 `viewContext` 属性。例如，你可以使用作为模型一部分定义的容器在顶层内容视图上设置一个上下文：


```swift
ContentView()
    .environment(
        \.managedObjectContext,
        QuakesProvider.shared.container.viewContext)
```

## `SectionedFetchRequest`

一种属性包装器类型，用于从 Core Data 持久化存储中检索实体，并将它们分组到各个部分中。

```swift
@MainActor @propertyWrapper
struct SectionedFetchRequest<SectionIdentifier, Result> where SectionIdentifier : Hashable, Result : NSFetchRequestResult
```

使用 `SectionedFetchRequest` 属性包装器声明一个 `SectionedFetchResults` 属性，以便为 SwiftUI 视图提供分组的 Core Data 托管对象集合。如果你不需要分段，则应使用 `FetchRequest`。

通过可选的谓词和排序描述符配置分段获取请求，并包含一个 `sectionIdentifier` 参数以指示如何对获取的结果进行分组。请确保你选择的排序和分段能够协同工作，以避免分段不连续。例如，你可以请求一个地震列表，该列表由「加载和显示大量数据源」示例代码项目定义的 `Quake` 托管对象组成，这些对象用于存储地震数据，按时间排序并按日期分组：

```swift
@SectionedFetchRequest<String, Quake>(
    sectionIdentifier: \.day,
    sortDescriptors: [SortDescriptor(\.time, order: .reverse)]
)
private var quakes: SectionedFetchResults<String, Quake>

```


始终将具有分段获取请求包装器的属性声明为私有。这样可以让编译器帮助你避免不小心从封装视图的成员初始化器中设置该属性。

请求会根据你指定的结果类型（如上例中的 `Quake` ）推断实体类型。指定一个 `SectionIdentifier` 类型来声明从获取对象的 `sectionIdentifier` 键路径中找到的类型。分段标识符类型必须遵循 `Hashable` 协议。

上述示例依赖于 `Quake` 类型具有一个作为存储或计算字符串的 `day` 属性。确保使用 `@objc` 属性标记任何计算属性，以便其能作为分段标识符正常工作。对于大型数据集，为了获得最佳性能，请使用存储属性。

分段获取请求及其结果使用存储在环境中的托管对象上下文，你可以使用 `managedObjectContext` 环境值来访问它。为了支持用户界面活动，通常依赖于共享 `NSPersistentContainer` 实例的 `viewContext` 属性。例如，你可以使用作为模型一部分定义的共享容器在顶层内容视图上设置上下文：

```swift
ContentView()
    .environment(
        \.managedObjectContext,
        QuakesProvider.shared.container.viewContext)
```

当需要动态更改分段标识符、谓词或排序描述符时，直接或通过绑定访问请求的 `SectionedFetchRequest.Configuration` 结构。

## `SectionedFetchResults`

从 Core Data 持久化存储中检索的结果集合，这些结果被分组到了不同的章节中。

```swift
struct SectionedFetchResults<SectionIdentifier, Result> where SectionIdentifier : Hashable, Result : NSFetchRequestResult
```

使用 `SectionedFetchResults` 实例在应用程序的用户界面中显示或编辑分组到各个章节中的 Core Data 托管对象。如果你不需要分段，则应使用 `FetchedResults`。

通过使用 `SectionedFetchRequest` 属性包装器注解获取结果属性声明来请求特定的一组结果。使用 `Results` 类型指示获取实体的类型，并使用 `SectionIdentifier` 类型指示区分各章节的标识符类型。例如，你可以创建一个请求以列出所有 `Quake` 托管对象（这些对象由「加载和显示大量数据源」示例代码项目定义，用于存储地震数据），按照它们的 `time` 属性排序，并通过一个表示地震发生日期的字符串来分组：

```swift
@SectionedFetchRequest<String, Quake>(
    sectionIdentifier: \.day,
    sortDescriptors: [SortDescriptor(\.time, order: .reverse)]
)
private var quakes: SectionedFetchResults<String, Quake>

```

`quakes` 属性充当 `SectionedFetchResults.Section `实例的集合，每个 `Section` 中又包含 `Quake` 实例的集合。上述示例依赖于 `Quake` 模型对象声明了 `time` 和 `day` 属性，这些属性可以是存储的也可以是计算得出的。对于大型数据集，为了获得最佳性能，请使用存储属性。

各个章节的集合以及每个章节中托管对象的集合都遵循 `RandomAccessCollection` 协议，因此你可以像访问其他任何集合一样访问它们。例如，你可以在 `List` 中创建嵌套的 `ForEach` 循环来遍历结果：

```swift
List {
    ForEach(quakes) { section in
        Section(header: Text(section.id)) {
            ForEach(section) { quake in
                QuakeRow(quake: quake) // Displays information about a quake.
            }
        }
    }
}
```


不要混淆用于创建层次化显示的 `Section` 视图与用于保存获取结果的 `SectionedFetchResults.Section` 实例。

当需要动态更改请求的分段标识符、谓词或排序描述符时，分别设置结果实例的 `sectionIdentifier`、`nsPredicate`、`sortDescriptors` 或 `nsSortDescriptors` 属性。确保排序和分段能够协同工作，以避免分段不连续。

`fetch` 请求及其结果利用了存储在环境中的托管对象上下文，你可以通过使用 `managedObjectContext` 环境值来访问它。为了支持用户界面活动，通常依赖于共享 `NSPersistentContainer` 实例的 `viewContext` 属性。例如，你可以使用作为模型一部分定义的容器在顶层内容视图上设置上下文：


```swift
ContentView()
    .environment(
        \.managedObjectContext,
        QuakesProvider.shared.container.viewContext)

```