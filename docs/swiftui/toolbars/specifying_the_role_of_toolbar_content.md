# Specifying the role of toolbar content

## `toolbarRole(_:)`

设置工具栏填充内容的语义角色。

此配置用于确定和定义填充在工具栏中的各项内容在用户界面交互及辅助功能方面的语义角色，以确保工具栏的各项元素在逻辑上合理组织并适配不同用户的使用习惯和辅助设备需求。

```swift
func toolbarRole(_ role: ToolbarRole) -> some View
```


## `ToolbarRole`

填充工具栏的内容之用途。

```swift
struct ToolbarRole
```

工具栏角色为填充在工具栏中的内容提供了关于其用途的描述。内容的目的会影响工具栏呈现内容的方式。

例如，在 iPadOS 中，浏览器会自动将工具栏标题左对齐。

你需要将此类型提供给 `toolbarRole(_:)` 修饰符：

```swift
ContentView()
    .navigationTitle("Browser")
    .toolbarRole(.browser)
    .toolbar {
        ToolbarItem(placement: .primaryAction) {
            AddButton()
        }
    }
```

- `browser`: 对于可以向前和向后导航的内容，请使用这一角色。在 iPadOS 中，这将会使导航标题左对齐，并允许工具栏项目占据导航栏中央位置。
- `editor`: 对于主要用于展示文档类内容编辑控制工具的工具栏，请使用这一角色。在 iPadOS 环境下，这将会使导航标题左对齐，允许工具栏项目居中显示，并为工具栏中存在的任何返回按钮提供自定义样式。
- `navigationStack`: 对于可以被推入和弹出的内容，请使用这一角色。
- `automatic`: 在 iOS、tvOS 和 watchOS 中，这个角色会被解析为 `navigationStack` 角色。而在 macOS 中，则会解析为 `editor` 角色。