# Importing from file

## `fileImporter(isPresented:allowedContentTypes:onCompletion:)`

提供一个系统界面，允许用户导入现有文件。


```swift
func fileImporter(
    isPresented: Binding<Bool>,
    allowedContentTypes: [UTType],
    onCompletion: @escaping (Result<URL, any Error>) -> Void
) -> some View
```

- 为了让界面出现，`isPresented` 必须为 `true`。
- 当操作完成时，在调用 `onCompletion` 之前，`isPresented` 将被设置为 `false`。
- 如果用户取消操作，`isPresented` 将被设置为 `false`，并且 `onCompletion` 将不会被调用。

::: info Note
此对话框提供了安全作用域的 `URL`。调用 `startAccessingSecurityScopedResource` 方法来访问或标记这些 `URL`，使用 `stopAccessingSecurityScopedResource` 方法来释放访问权限。
:::


例如，应用程序可以有一个按钮，允许用户选择每次启动时加载文档模板的默认目录，这样的按钮可能如下所示：

```swift
struct PickTemplatesDirectoryButton: View {
    
    @State private var showFileImporter = false
        
    @State var path: String = ""
    
    var body: some View {
        
        Text("Directory Path:\(path)")
        
        Button {
            showFileImporter = true
        } label: {
            Label("Choose templates directory", systemImage: "folder.circle")
        }
        .fileImporter(
            isPresented: $showFileImporter,
            allowedContentTypes: [.directory]
        ) { result in
            switch result {
            case .success(let directory):
                // gain access to the directory
                let gotAccess = directory.startAccessingSecurityScopedResource()
                if !gotAccess { return }
                // access the directory URL
                // (read templates in the directory, make a bookmark, etc.)
                
                path = directory.absoluteString
                // release access
                directory.stopAccessingSecurityScopedResource()
            case .failure(let error):
                // handle error
                print(error)
            }
        }
    }
}
```
<video src="../../video/FileImporter.mp4" controls="controls"></video>
