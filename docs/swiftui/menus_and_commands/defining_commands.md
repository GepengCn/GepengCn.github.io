# 定义命令

## `commands(content:)`

向场景添加命令。

```swift
func commands<Content>(@CommandsBuilder content: () -> Content) -> some Scene where Content : Commands
```

在不同的平台上，命令的实现方式不同。在 macOS 上，主菜单使用可用的命令菜单和组来组织其主菜单项。每个菜单都表示为顶级菜单栏菜单，每个命令组在顶级菜单之一中有相应的一组菜单项，由分隔菜单项分隔。

在 iPadOS 上，具有键盘快捷键的命令会显示在用户按住 `Command (⌘)` 键时看到的快捷键发现 `HUD` 中。

## `commandsRemoved()`

删除修改后的场景定义的所有命令。

```swift
func commandsRemoved() -> some Scene
```

`WindowGroup`、`Window` 和其他场景类型都有一组默认包含的关联命令。将此修饰符应用于场景以排除这些命令。

例如，以下代码添加了一个场景，用于在单独的窗口中显示单个数据模型的详细信息。为了确保窗口只能通过编程方式出现，我们删除了场景的命令，包括“文件”>“新建便签窗口”。

```swift
@main
struct Example: App {
    var body: some Scene {
        ...


        WindowGroup("Note", id: "note", for: Note.ID.self) {
            NoteDetailView(id: $0)
        }
        .commandsRemoved()
    }
}
```

## `commandsReplaced(content:)`

用构建器中的命令替换修改后的场景定义的所有命令。

```swift
func commandsReplaced<Content>(@CommandsBuilder content: () -> Content) -> some Scene where Content : Commands
```

`WindowGroup`、`Window` 和其他场景类型都有一组默认包含的关联命令。将此修饰符应用于场景，用给定构建器的输出替换这些命令。

例如，以下代码添加了一个场景，用于在专用窗口中显示粘贴板的内容。我们用自定义的“编辑”>“显示粘贴板”命令替换场景的默认“窗口”>“粘贴板”菜单命令，并将其放置在其他粘贴板命令旁边。


```swift
@main
struct Example: App {
    @Environment(\.openWindow) var openWindow


    var body: some Scene {
        ...


        Window("Clipboard", id: "clipboard") {
            ClipboardContentView()
        }
        .commandsReplaced {
            CommandGroup(after: .pasteboard) {
                Section {
                    Button("Show Clipboard") {
                        openWindow(id: "clipboard")
                    }
                }
            }
        }
    }
}
```