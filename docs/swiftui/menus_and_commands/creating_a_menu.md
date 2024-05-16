# 创建菜单

## `Menu`

用于呈现操作菜单的控件。

```swift
struct Menu<Label, Content> where Label : View, Content : View
```

下面的示例展示了一个包含三个按钮的菜单和一个子菜单，子菜单中又包含三个按钮。

```swift
Menu("Actions") {
    Button("Duplicate", action: duplicate)
    Button("Rename", action: rename)
    Button("Delete…", action: delete)
    Menu("Copy") {
        Button("Copy", action: copy)
        Button("Copy Formatted", action: copyFormatted)
        Button("Copy Library Path", action: copyPath)
    }
}
```

你可以使用 `LocalizedStringKey` 创建菜单的标题，如前面的示例所示，也可以使用创建多个视图的视图构建器，例如图像视图和文本视图：

```swift
Menu {
    Button("Open in Preview", action: openInPreview)
    Button("Save as PDF", action: saveAsPDF)
} label: {
    Label("PDF", systemImage: "doc.fill")
}
```

### 主要操作

可以使用自定义主要操作创建菜单。当用户点击或单击控件的主体时，将执行主要操作，而菜单的呈现将在辅助手势上发生，例如长按或单击菜单指示器。下面的示例创建了一个添加书签的菜单，其中包含在菜单中呈现的高级选项。

```swift
Menu {
    Button(action: addCurrentTabToReadingList) {
        Label("Add to Reading List", systemImage: "eyeglasses")
    }
    Button(action: bookmarkAll) {
        Label("Add Bookmarks for All Tabs", systemImage: "book")
    }
    Button(action: show) {
        Label("Show All Bookmarks", systemImage: "books.vertical")
    }
} label: {
    Label("Add Bookmark", systemImage: "book")
} primaryAction: {
    addBookmark()
}
```

## `menuIndicator(_:)`

设置此视图内控件的菜单指示器可见性。

```swift
func menuIndicator(_ visibility: Visibility) -> some View
```

使用此修饰符覆盖此视图中控件的默认菜单指示器可见性。例如，下面的代码创建了一个没有指示器的菜单：

```swift
Menu {
    ForEach(history , id: \.self) { historyItem in
        Button(historyItem.title) {
            self.openURL(historyItem.url)
        }
    }
} label: {
    Label("Back", systemImage: "chevron.backward")
        .labelStyle(.iconOnly)
} primaryAction: {
    if let last = history.last {
        self.openURL(last.url)
    }
}
.menuIndicator(.hidden)
```

## `menuActionDismissBehavior(_:)`

告诉菜单在执行操作后是否关闭。

```swift
func menuActionDismissBehavior(_ behavior: MenuActionDismissBehavior) -> some View
```

使用此修饰符控制菜单的关闭行为。在下面的示例中，当有人选择增加或减少操作时，菜单不会关闭：

```swift
Menu("Font size") {
    Button(action: increase) {
        Label("Increase", systemImage: "plus.magnifyingglass")
    }
    .menuActionDismissBehavior(.disabled)


    Button("Reset", action: reset)


    Button(action: decrease) {
        Label("Decrease", systemImage: "minus.magnifyingglass")
    }
    .menuActionDismissBehavior(.disabled)
}
```

你可以在任何显示菜单的控件上使用此修饰符，例如使用菜单样式的 `Picker` 或 `ControlGroup`。例如，下面的代码创建了一个 `Picker`，当有人选择其中一个选项时，它会禁用关闭：

```swift
Picker("Flavor", selection: $selectedFlavor) {
    ForEach(Flavor.allCases) { flavor in
        Text(flavor.rawValue.capitalized)
            .tag(flavor)
    }
}
.pickerStyle(.menu)
.menuActionDismissBehavior(.disabled)
```

你也可以在上下文菜单上使用此修饰符。下面的示例创建了一个上下文菜单，在有人选择要运行的操作后，该菜单仍保持显示：

```swift
Text("Favorite Card Suit")
    .padding()
    .contextMenu {
        Button("♥️ - Hearts", action: increaseHeartsCount)
        Button("♣️ - Clubs", action: increaseClubsCount)
        Button("♠️ - Spades", action: increaseSpadesCount)
        Button("♦️ - Diamonds", action: increaseDiamondsCount)
    }
    .menuActionDismissBehavior(.disabled)
```

## `menuOrder(_:)`

设置从此视图呈现的菜单的项目首选顺序。

```swift
func menuOrder(_ order: MenuOrder) -> some View
```

使用此修饰符可覆盖默认菜单顺序。在支持的平台上，优先级顺序使靠前的项目更靠近用户的交互点，而固定顺序则始终从上到下对项目进行排序。

在 iOS 上，对于在可滚动内容中呈现的菜单，自动顺序将解析为固定顺序。使用菜单样式的 `Picker` 也默认为固定顺序。在所有其他情况下，菜单默认为优先级顺序。

在 macOS、tvOS 和 watchOS 上，自动顺序始终解析为固定顺序。

以下示例创建了一个菜单，该菜单从上到下以固定顺序显示其内容：

```swift
Menu {
    Button("Select", action: selectFolders)
    Button("New Folder", action: createFolder)
    Picker("Appearance", selection: $appearance) {
        Label("Icons", systemImage: "square.grid.2x2").tag(Appearance.icons)
        Label("List", systemImage: "list.bullet").tag(Appearance.list)
    }
} label: {
    Label("Settings", systemImage: "ellipsis.circle")
}
.menuOrder(.fixed)
```

你可以在显示菜单的控件上使用此修饰符。例如，下面的代码创建了一个使用菜单样式的 `Picker`，其顺序基于优先级：

```swift
Picker("Flavor", selection: $selectedFlavor) {
    Text("Chocolate").tag(Flavor.chocolate)
    Text("Vanilla").tag(Flavor.vanilla)
    Text("Strawberry").tag(Flavor.strawberry)
}
.pickerStyle(.menu)
.menuOrder(.priority)
```

你也可以在上下文菜单上使用此修饰符。下面的示例创建了一个上下文菜单，该菜单以固定顺序显示其内容：

```swift
Text("Favorite Card Suit")
    .padding()
    .contextMenu {
        Button("♥️ - Hearts", action: selectHearts)
        Button("♣️ - Clubs", action: selectClubs)
        Button("♠️ - Spades", action: selectSpades)
        Button("♦️ - Diamonds", action: selectDiamonds)
    }
    .menuOrder(.fixed)

```

当应用于菜单的子部分或子菜单时，此修饰符不起作用。