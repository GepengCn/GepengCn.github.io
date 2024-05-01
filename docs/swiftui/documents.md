# Documents

创建一个使用 SwiftUI `DocumentGroup` 场景类型来打开和编辑文档的用户界面。

你需要使用一个模型来初始化场景，该模型描述了文档数据的组织，并使用一个视图层次结构，SwiftUI 使用它来向用户显示文档的内容。你可以使用值类型模型（通常存储为结构体），它符合 `FileDocument` 协议，或者使用引用类型模型，存储在符合 `ReferenceFileDocument` 协议的类实例中。

SwiftUI 支持用户从基于文档的应用程序中期望的标准行为，适用于每个平台，如多窗口支持、打开和保存面板、拖放等。

## Creating a document

### `DocumentGroup`

一个支持打开、创建和保存文档的场景。

```swift
struct DocumentGroup<Document, Content> where Content : View
```

使用 `DocumentGroup` 场景来告诉 SwiftUI 当你使用 `App` 协议声明你的应用时，你的应用可以打开哪些类型的文档。

通过传入文档模型和能够显示文档类型的视图来初始化一个文档组场景。

你提供给 `DocumentGroup` 的文档类型必须遵守 `FileDocument` 或 `ReferenceFileDocument`。

SwiftUI 使用这个模型为你的应用添加文档支持。
- 在 macOS 上，这包括基于文档的菜单支持，包括打开多个文档的能力。
- 在 iOS 上，这包括一个文档浏览器，可以导航到文件系统上存储的文档和多窗口支持：

```swift
@main
struct MyApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: TextFile()) { configuration in
            ContentView(document: configuration.$document)
        }
    }
}
```
每当配置更改时，SwiftUI 都会更新新配置的内容，类似于其他参数化构建器。

#### Viewing documents

如果你的应用只需要显示而不修改特定文档类型，你可以使用文件查看器文档组场景。

你提供文档的文件类型，和一个显示你提供的文档类型的视图：

```swift
@main
struct MyApp: App {
    var body: some Scene {
        DocumentGroup(viewing: MyImageFormatDocument.self) {
            MyImageFormatViewer(image: $0.document)
        }
    }
}
```

#### Supporting multiple document types


你的应用可以通过添加额外的文档组场景来支持多种文档类型：


```swift
@main
struct MyApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: TextFile()) { group in
            ContentView(document: group.$document)
        }
        DocumentGroup(viewing: MyImageFormatDocument.self) { group in
            MyImageFormatViewer(image: group.document)
        }
    }
}
```

#### Accessing the document’s URL


如果你的应用需要知道文档的 `URL`，你可以从编辑器闭包的配置参数中读取它，以及与文档的绑定。

当你创建一个新文档时，配置的 `fileURL` 属性是 `nil`。

每次更改时，它都会传递给更新配置中的 `DocumentGroup` 构建器。

这确保了你在闭包中定义的视图始终知道它托管的文档的 `URL`。


```swift
@main
struct MyApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: TextFile()) { configuration in
            ContentView(
                document: configuration.$document,
                fileURL: configuration.fileURL
            )
        }
    }
}
```
例如，`URL` 可用于在用户界面中展示文件路径或文件名。

不要使用 `URL` 访问文档的内容或元数据，因为这可能与 SwiftUI 执行的文件管理发生冲突。相反，使用 `FileDocument` 和 `ReferenceFileDocument` 提供的方法执行读写操作。

## Storing document data in a structure instance

### `FileDocument`

一种用于将文档序列化到文件和从文件序列化的类型。


```swift
protocol FileDocument
```

要将文档作为值类型存储——例如结构体——创建一个符合 `FileDocument` 协议的类型，并实现所需的方法和属性。你的实现应该包括：

- 通过定义 `readableContentTypes` 提供文档可以读取和写入的内容类型列表。如果文档可以写入的内容类型与其读取的内容类型不同，你还可以选择性地定义 `writableContentTypes`。
- 在 `init(configuration:)` 初始化器中从文件加载文档。
- 通过在 `fileWrapper(configuration:)` 方法中序列化其内容来存储文档到文件。

::: tip 提示
如果你将文档存储为引用类型——如类——则使用 `ReferenceFileDocument`。
:::
确保符合此协议的类型是线程安全的。特别是，SwiftUI 在后台线程上调用协议的方法。不要使用该线程执行用户界面更新。只用它来序列化和反序列化文档数据。


#### Reading a document


```swift
init(configuration: Self.ReadConfiguration) throws
```

当有人打开与你的文档类型支持的文件类型之一匹配的文件时，SwiftUI 会调用这个初始化器。使用配置输入的 `file` 属性来获取文档的数据。反序列化数据，并将其存储在你的文档的数据结构中：


```swift
init(configuration: ReadConfiguration) throws {
    guard let data = configuration.file.regularFileContents
    else { /* Throw an error. */ }
    model = try JSONDecoder().decode(Model.self, from: data)
}
```

上述示例假设你定义了一个包含文档数据的 `Model`，该 `Model` 符合 `Codable` 协议，并且你在文档中存储了一个该类型的 `model` 属性。

::: warning 注意
SwiftUI 在后台线程调用这个方法。不要在该线程上进行用户界面更改。
:::

#### Writing a document


```swift
func fileWrapper(configuration: Self.WriteConfiguration) throws -> FileWrapper
```

将文档快照序列化到文件包装器中。

为了存储一个文档——例如，响应保存命令——SwiftUI 会调用这个方法。使用它来序列化文档的数据，并使用序列化的数据创建或修改一个文件包装器：


```swift
func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
    let data = try JSONEncoder().encode(model)
    return FileWrapper(regularFileWithContents: data)
}
```
::: warning 注意
SwiftUI 在后台线程调用这个方法。不要在该线程上进行用户界面更改。
:::

## Storing document data in a class instance

### `ReferenceFileDocument`

用于将引用类型文档序列化和反序列化到文件的类型。

```swift
protocol ReferenceFileDocument : ObservableObject
```

要将文档存储为引用类型（如类），请创建一个符合 `ReferenceFileDocument` 协议的类型并实现所需的方法和属性。

你的实现：
- 通过定义 `readContentTypes` 提供文档可读取和写入的内容类型列表。 如果文档可写入的内容类型列表与其读取的内容类型列表不同，你还可以选择定义 `writableContentTypes`。
- 从 `init(configuration:)` 初始化程序中的文件加载文档。
- 通过在 `snapshot(contentType:)` 方法中提供文档内容的快照，然后在 `fileWrapper(snapshot:configuration:)` 方法中序列化该内容，将文档存储到文件中。

::: warning 注意

确保符合此协议的类型是线程安全的。 特别是，SwiftUI 在后台线程上调用协议的方法。

不要使用该线程来执行用户界面更新。 仅使用它来序列化和反序列化文档数据。

:::

#### Reading a document


```swift
init(configuration: Self.ReadConfiguration) throws
```


```swift
init(configuration: ReadConfiguration) throws {
    guard let data = configuration.file.regularFileContents
    else { /* Throw an error. */ }
    model = try JSONDecoder().decode(Model.self, from: data)
}
```

#### Getting a snapshot

```swift
func snapshot(contentType: UTType) throws -> Self.Snapshot
```

要存储文档（例如，响应「保存」命令），SwiftUI 首先调用此方法。

从方法的实现中返回文档内容的副本。

例如，你可以为文档的模型对象定义一个初始值设定项，该对象复制文档实例的内容，并返回：


```swift
func snapshot(contentType: UTType) throws -> Snapshot {
    Model(from: model) // Creates a copy.
}
```

SwiftUI 会在快照操作期间防止文档编辑，以确保模型状态保持一致。

调用完成后，SwiftUI 重新启用编辑，然后调用 `fileWrapper(snapshot:configuration:)` 方法，你可以在其中序列化快照并将其存储到文件中。

#### Writing a document

```swift
func fileWrapper(
    snapshot: Self.Snapshot,
    configuration: Self.WriteConfiguration
) throws -> FileWrapper
```


```swift
func fileWrapper(snapshot: Snapshot, configuration: WriteConfiguration) throws -> FileWrapper {
    let data = try JSONEncoder().encode(snapshot)
    return FileWrapper(regularFileWithContents: data)
}
```

## Accessing document configuration

### `DocumentConfiguration`

```swift
ar documentConfiguration: DocumentConfiguration? { get }
```

对于未包含在 `DocumentGroup` 中的视图，该值为 `nil`。

例如，如果应用程序在每个文档的页脚中显示文档路径，则它可以从环境中获取 `URL`

```swift
struct ContentView: View {
    @Binding var document: TextDocument
    @Environment(\.documentConfiguration) private var configuration: DocumentConfiguration?


    var body: some View {
        …
        Label(
            configuration?.fileURL?.path ??
                "", systemImage: "folder.circle"
        )
    }
}
```

## Opening a document programmatically

### `NewDocumentAction` <Badge type="tip" text="macOS" />

```swift
struct NewDocumentAction
```

使用 `newDocument` 环境值来获取给定环境的此结构的实例，然后调用实例来呈现一个新文档。

你可以直接调用实例，因为它定义了 `callAsFunction(_:)` 方法，当你调用实例时，Swift 会调用该方法。

例如，你可以定义一个按钮，用于根据所选文本创建新文档：

```swift
struct NewDocumentFromSelection: View {
    @FocusedBinding(\.selectedText) private var selectedText: String?
    @Environment(\.newDocument) private var newDocument


    var body: some View {
        Button("New Document With Selection") {
            newDocument(TextDocument(text: selectedText))
        }
        .disabled(selectedText?.isEmpty != false)
    }
}
```

上面的示例假设你定义了一个符合 `FileDocument` 或 `ReferenceFileDocument` 协议的 `TextDocument`，以及一个处理关联文件类型的 `DocumentGroup`。

### `OpenDocumentAction`  <Badge type="tip" text="macOS" />

```swift
struct OpenDocumentAction
```

使用 `openDocument` 环境值来获取给定环境的此结构的实例，然后调用实例来呈现现有文档。

你可以直接调用实例，因为它定义了 `callAsFunction(at:)` 方法，当你调用实例时，Swift 会调用该方法。

例如，你可以创建一个按钮来打开指定 `URL` 处的文档：

```swift
struct OpenDocumentButton: View {
    var url: URL
    @Environment(\.openDocument) private var openDocument


    var body: some View {
        Button(url.deletingPathExtension().lastPathComponent) {
            Task {
                do {
                    try await openDocument(at: url)
                } catch {
                    // Handle error
                }
            }
        }
    }
}
```


上面的示例使用 `do-catch` 语句来处理打开文档操作可能引发的任何错误。

它还将操作放置在任务中并等待结果，因为操作是异步操作的。


要呈现现有文档，你的应用程序必须定义处理指定文件的内容类型的 `DocumentGroup`。

对于已经打开的文档，系统会将现有窗口置于前面。否则，系统将打开一个新窗口。

## Renaming a document

### `RenameButton`

触发重命名操作的按钮。

```swift
struct RenameButton<Label> where Label : View
```

重命名按钮从环境中接收其操作，使用 `renameAction(_:)` 修饰符来设置操作。如果你未定义操作，系统将禁用该按钮。

```swift
struct RowView: View {
    @State private var text = ""
    @FocusState private var isFocused: Bool


    var body: some View {
        TextField(text: $item.name) {
            Text("Prompt")
        }
        .focused($isFocused)
        .contextMenu {
            RenameButton()
            // ... your own custom actions
        }
        .renameAction { $isFocused = true }
}
```


当有人点击上下文菜单中的重命名按钮时，重命名操作会通过将 `isFocused` 属性设置为 `true` 来聚焦文本字段。

你可以在导航标题菜单内使用此按钮，导航标题修改器会自动使用适当的重命名操作来匹配当前环境。

```swift
ContentView()
    .navigationTitle($contentTitle) {
        // ... your own custom actions
        RenameButton()
    }
```