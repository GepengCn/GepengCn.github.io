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