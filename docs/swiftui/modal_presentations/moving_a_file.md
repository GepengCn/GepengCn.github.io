# Moving a file

## `fileMover(isPresented:file:onCompletion:)`

提供一个系统界面，允许用户将现有文件移动到新位置。

```swift
func fileMover(
    isPresented: Binding<Bool>,
    file: URL?,
    onCompletion: @escaping (Result<URL, any Error>) -> Void
) -> some View
```

为了让界面出现，`isPresented` 必须为 `true` 并且 `file` 不能为 `nil`，当操作完成时，在调用 `onCompletion` 之前，`isPresented` 将被设置为 `false`。

如果用户取消操作，`isPresented` 将被设置为 `false`，并且 `onCompletion` 将不会被调用。

```swift
struct PickTemplatesDirectoryButton: View {
    
    @State private var showFileMover = false
            
    let file = URL(fileURLWithPath: "/Users/gepeng/Desktop/demo.jpg")
    
    var body: some View {
                
        Button {
            showFileMover = true
        } label: {
            Label("Move the file", systemImage: "file")
        }.fileMover(isPresented: $showFileMover, file: file) { result in
            switch result {
            case .success(let file):
                print(file.absoluteString)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
        
    }
}
```
<video src="../../video/FileMover.mp4" controls="controls"></video>

