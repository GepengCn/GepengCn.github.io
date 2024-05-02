# Showing a confirmation dialog with a message

## `confirmationDialog(_:isPresented:titleVisibility:actions:message:)`

当给定条件为真时，显示带有消息的确认对话框，使用字符串变量作为标题。

```swift
func confirmationDialog<S, A, M>(
    _ title: S,
    isPresented: Binding<Bool>,
    titleVisibility: Visibility = .automatic,
    @ViewBuilder actions: () -> A,
    @ViewBuilder message: () -> M
) -> some View where S : StringProtocol, A : View, M : View
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
        } message: {
            Text("You cannot undo this action.")
        }
    }
}
```
<video src="../../video/ConfirmationDialogMessage.mp4" controls="controls"></video>



## `confirmationDialog(_:isPresented:titleVisibility:presenting:actions:message:)`

显示带有消息的确认对话框，使用数据生成对话框的内容和消息的文本视图。

```swift
func confirmationDialog<A, M, T>(
    _ title: Text,
    isPresented: Binding<Bool>,
    titleVisibility: Visibility = .automatic,
    presenting data: T?,
    @ViewBuilder actions: (T) -> A,
    @ViewBuilder message: (T) -> M
) -> some View where A : View, M : View
```


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
        } message: { detail in
            Text(
                """
                This will add \(detail.name).\(detail.fileType) \
                to your library.
                """)
        }
    }
}

```

<video src="../../video/ConfirmationDialogMessagePresenting.mp4" controls="controls"></video>
