# Presenting an alert

## `alert(_:isPresented:actions:)`

当给定条件为真时显示 `alert`，使用字符串变量作为标题。

```swift
func alert<S, A>(
    _ title: S,
    isPresented: Binding<Bool>,
    @ViewBuilder actions: () -> A
) -> some View where S : StringProtocol, A : View
```

在下面的示例中，登录表单通过设置 `didFail` 状态变量有条件地显示 `alert`。

当表单将该值设置为 `true` 时，系统会显示一条带有「OK」操作的 `alert`。

```swift{10-17}
struct Login: View {
    
    @State private var didFail = false
    
    let alertTitle: String = "Login failed."

    var body: some View {
        Button("登录") {
            didFail = true
        }.alert(
            alertTitle,
            isPresented: $didFail
        ) {
            Button("OK") {
                // Handle the acknowledgement.
            }
        }
    }
}
```
<video src="../../video/Alert.mp4" controls="controls"></video>

`alert` 中的所有操作在执行后都会关闭 `alert`。

- 默认按钮显示得更为突出。
- 你可以通过将默认动作键盘快捷键分配给它来影响默认按钮。
- 系统可能会根据按钮的角色和突出性重新排列按钮。

如果没有操作，系统会包含一个标准的「OK」操作，不提供默认的取消操作。

如果你想显示一个取消操作，请使用一个具有取消角色的按钮。

::: warning 注意
在 iOS、tvOS 和 watchOS 上，`alert` 只支持标签为文本的控件。

传递任何其他类型的视图都会导致内容被省略。

:::

## `alert(_:isPresented:actions:)`


当给定条件为真时显示 `alert`，使用 `Text` 视图作为标题。

```swift
func alert<A>(
    _ title: Text,
    isPresented: Binding<Bool>,
    @ViewBuilder actions: () -> A
) -> some View where A : View
```

```swift{11}
struct Login: View {
    
    @State private var didFail = false
    
    let alertTitle: String = "Login failed."

    var body: some View {
        Button("登录") {
            didFail = true
        }.alert(
            Text(alertTitle),
            isPresented: $didFail
        ) {
            Button("OK") {
                // Handle the acknowledgement.
            }
        }
    }
}

```

## `alert(_:isPresented:presenting:actions:)`

使用给定数据显示 `alert` 并生成内容,`Text` 视图作为标题。

要显示 `alert`，`isPresented` 必须为 `true`，并且 `data` 不能为 `nil`。 `presentation` 发生后数据不能更改，`presentation` 发生后所做的任何更改都将被忽略。

当你需要使用数据源中的内容填充警报的字段时，可以使用此方法。

下面的示例显示了自定义数据源 `SaveDetails`，它提供数据来填充 `alert`：

```swift
struct SaveDetails: Identifiable {
    let name: String
    let error: String
    let id = UUID()
}


struct SaveButton: View {
    
    @State private var didError = false
    
    @State private var details: SaveDetails?
    
    let alertTitle: String = "保存失败"

    var body: some View {
            
        Button("保存") {
            details = SaveDetails(name: "223", error: "错误")
            didError = true
        }
        .alert(
            Text(alertTitle),
            isPresented: $didError,
            presenting: details
        ) { details in
            Button(role: .destructive) {
                // Handle the deletion.
            } label: {
                Text("放弃保存 \(details.name)")
            }
            Button("重试") {
                // Handle the retry action.
            }
        }
    }
}
```
<video src="../../video/AlertPresenting.mp4" controls="controls"></video>

## `alert(isPresented:error:actions:)`

出现错误时发出警报 `alert`。

`error`: 用于生成警报标题的可选本地化错误。系统将内容传递给修饰符的闭包。你可以使用此数据填充你创建的警报字段，系统会向用户显示该警报。

在下面的示例中，表单根据错误值有条件地显示警报。

当错误值不为零时，系统会显示带有「OK」操作的警报。

警报的标题是根据错误的错误描述推断出来的。

```swift{31}
enum ValidationError: LocalizedError {
    case invalidEmail
    case passwordTooShort
    case usernameUnavailable

    var errorDescription: String? {
        switch self {
        case .invalidEmail:
            return NSLocalizedString("Invalid email address.", comment: "Invalid email error")
        case .passwordTooShort:
            return NSLocalizedString("Password must be at least 8 characters long.", comment: "Password too short error")
        case .usernameUnavailable:
            return NSLocalizedString("This username is already taken.", comment: "Username unavailable error")
        }
    }
}


struct SaveButton: View {
    
    @State private var showAlert = false
    
    @State private var error: ValidationError? = nil

    var body: some View {
            
        Button("保存") {
            error = .invalidEmail
            showAlert = true
        }
        .alert(isPresented: $showAlert, error: error) {
            Button("OK") {
                // Handle acknowledgement.
            }
        }
    }
}
```

<video src="../../video/AlertError.mp4" controls="controls"></video>
