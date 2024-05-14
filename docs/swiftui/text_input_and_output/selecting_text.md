# Selecting text



## `textSelection(_:)`

控制人们是否可以在这个视图内选择文本。

```swift
func textSelection<S>(_ selectability: S) -> some View where S : TextSelectability
```

人们有时需要从文本视图中复制有用的信息——包括错误信息、序列号或IP地址——以便他们可以将文本粘贴到另一个上下文中。启用文本选择功能，让人们以适合平台的方式选择文本。

你可以将此方法应用于单个文本视图，或应用于容器以使每个包含的文本视图都可选择。在以下示例中，使用应用的人可以选择显示事件日期或任何事件参与者的名称或电子邮件的文本：

```swift
var body: some View {
    VStack {
        Text("Event Invite")
            .font(.title)
        Text(invite.date.formatted(date: .long, time: .shortened))
            .textSelection(.enabled)


        List(invite.recipients) { recipient in
            VStack (alignment: .leading) {
                Text(recipient.name)
                Text(recipient.email)
                    .foregroundStyle(.secondary)
            }
        }
        .textSelection(.enabled)
    }
    .navigationTitle("New Invitation")
}
```

在 macOS 上，你可以使用鼠标或触控板选择一段文本，然后通过选择“编辑 > 复制”或使用标准键盘快捷方式来快速复制。

![View-textSelection-1@2x](../../images/View-textSelection-1@2x.png)

在 iOS 上，使用应用的人触摸并长按可选择的文本视图，这会调出一个系统菜单，菜单项根据当前上下文显示。这些菜单项作用于文本视图的全部内容；与 macOS 上不同，用户无法选择文本的一个范围。

![View-textSelection-2@2x](../../images/View-textSelection-2@2x.png)

- `enabled`: 一个允许应用使用者选择文本的可选择性值。
- `disabled`: 一个禁止应用使用者选择文本的可选择性值。

