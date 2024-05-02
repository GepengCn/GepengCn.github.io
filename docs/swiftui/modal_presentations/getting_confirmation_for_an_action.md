# Getting confirmation for an action

## `confirmationDialog(_:isPresented:titleVisibility:actions:)`

当给定条件为真时显示确认对话框，使用字符串变量作为标题。

```swift
func confirmationDialog<S, A>(
    _ title: S,
    isPresented: Binding<Bool>,
    titleVisibility: Visibility = .automatic,
    @ViewBuilder actions: () -> A
) -> some View where S : StringProtocol, A : View
```

在下面的示例中，按钮根据绑定布尔变量的值有条件地显示确认对话框。

当布尔值设置为 `true` 时，系统将显示一个确认对话框，其中包含取消操作和破坏性操作。

```swift
struct ConfirmEraseItems: View {
    
    @State private var isShowingDialog = false
    
    var title: String
    
    var body: some View {
        Button("Empty Trash") {
            isShowingDialog = true
        }
        .confirmationDialog(
            title,
            isPresented: $isShowingDialog
        ) {
            Button("Empty Trash", role: .destructive) {
                // Handle empty trash action.
            }
            Button("Cancel", role: .cancel) {
                isShowingDialog = false
            }
        }
    }
}

#Preview {
    ConfirmEraseItems(title: "标题")
}
```
<video src="../../video/ConfirmationDialog.mp4" controls="controls"></video>

确认对话框中的所有操作都将在操作运行后关闭该对话框，默认按钮将以更加突出的方式显示。

- 你可以通过为默认按钮分配 `defaultAction` 键盘快捷键来影响默认按钮。
- 系统可以根据按钮的角色和重要性对按钮重新排序。
- 默认情况下，对话框包含标准关闭操作。

如果你提供一个具有取消角色的按钮，则该按钮将取代默认的关闭操作。你不必通过取消按钮操作来关闭演示文稿。

::: tip 提示
在 iOS 的常规大小类别中，系统将确认对话框呈现为弹出窗口，用户可以通过点击弹出窗口之外的任何位置来关闭该对话框，而不是显示标准的关闭操作。
:::


## `confirmationDialog(_:isPresented:titleVisibility:presenting:actions:)`

呈现一个确认对话框，使用数据生成对话框的内容和标题的文本视图。

```swift
func confirmationDialog<A, T>(
    _ title: Text,
    isPresented: Binding<Bool>,
    titleVisibility: Visibility = .automatic,
    presenting data: T?,
    @ViewBuilder actions: (T) -> A
) -> some View where A : View
```


- 为了让界面出现，`isPresented` 必须为 `true`，并且 `data` 不能为 `nil`。
- `presention` 发生后数据不应更改，演示发生后发生的任何更改都将被忽略。

当你需要使用数据源中的内容填充确认对话框的字段时，可以使用此方法。

下面的示例显示了一个自定义数据源 `FileDetails`，它提供数据来填充对话框：


```swift
import SwiftUI
import UniformTypeIdentifiers

struct FileDetails: Identifiable {
    var id: String { name }
    let name: String
    let fileType: UTType
}

struct ConfirmFileImport: View {
    @State private var isConfirming = false
    @State private var dialogDetail: FileDetails?
    var body: some View {
        Button("Import File") {
            dialogDetail = FileDetails(
                name: "MyImageFile.png", fileType: .png)
            isConfirming = true
        }
        .confirmationDialog(
            Text("Import New File?"),
            isPresented: $isConfirming, presenting: dialogDetail
        ) { detail in
            Button {
                // Handle import action.
            } label: {
                Text("""
                Import \(detail.name)
                File Type: \(detail.fileType.description)
                """)
            }
            Button("Cancel", role: .cancel) {
                dialogDetail = nil
            }
        }
    }
}
```
<video src="../../video/ConfirmationDialogPresenting.mp4" controls="controls"></video>

::: danger 注意
在 iOS、tvOS 和 watchOS 上，确认对话框仅支持带有文本标签的控件。 传递任何其他类型的视图都会导致内容被省略。
:::