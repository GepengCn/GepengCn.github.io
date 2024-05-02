# Presenting an alert with a message

## `alert(_:isPresented:actions:message:)`

当给定条件为真时，使用字符串变量作为标题显示带有消息的 `alert`。

```swift
func alert<S, A, M>(
    _ title: S,
    isPresented: Binding<Bool>,
    @ViewBuilder actions: () -> A,
    @ViewBuilder message: () -> M
) -> some View where S : StringProtocol, A : View, M : View
```

::: tip 提示
消息仅支持无样式文本。
:::

```swift
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
        } message: {
            Text("Please check your credentials and try again.")
        }
    }
}
```
<video src="../../video/AlertMessage.mp4" controls="controls"></video>


## `alert(_:isPresented:presenting:actions:message:)`

使用给定的数据显示带有消息的警报 `alert`。

```swift
func alert<A, M, T>(
    _ titleKey: LocalizedStringKey,
    isPresented: Binding<Bool>,
    presenting data: T?,
    @ViewBuilder actions: (T) -> A,
    @ViewBuilder message: (T) -> M
) -> some View where A : View, M : View
```


```swift
struct SaveDetails: Identifiable {
    let name: String
    let error: String
    let id = UUID()
}


struct SaveButton: View {
    
    @State private var didError = false
    
    @State private var details: SaveDetails?
    

    var body: some View {
            
        Button("保存") {
            details = SaveDetails(name: "223", error: "错误原因：不存在的数据")
            
            didError = true
        }
        .alert(
            "Save failed.",
            isPresented: $didError,
            presenting: details
        ) { details in
            Button(role: .destructive) {
                // Handle the deletion.
            } label: {
                Text("Delete \(details.name)")
            }
            Button("Retry") {
                // Handle the retry action.
            }
        } message: { details in
            Text(details.error)
        }
    }
}
```
<video src="../../video/AlertMessagePresenting.mp4" controls="controls"></video>

## `alert(isPresented:error:actions:message:)`

出现错误时显示带有消息的警报 `alert`。

```swift
func alert<E, A, M>(
    isPresented: Binding<Bool>,
    error: E?,
    @ViewBuilder actions: (E) -> A,
    @ViewBuilder message: (E) -> M
) -> some View where E : LocalizedError, A : View, M : View
```


```swift

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
    
    var recoverySuggestion: String? {
        switch self {
        case .invalidEmail:
            return NSLocalizedString("Please check your email address and try again.", comment: "Suggest how to fix the email")
        case .passwordTooShort:
            return NSLocalizedString("Please use a longer password.", comment: "Suggest how to fix the password")
        case .usernameUnavailable:
            return NSLocalizedString("Please try a different username.", comment: "Suggest how to change the username")
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
        .alert(isPresented: $showAlert, error: error) {_ in
            Button("OK") {
                // Handle acknowledgement.
            }
        } message: { error in
            Text(error.recoverySuggestion ?? "Try again later.")
        }
    }
}
```
<video src="../../video/AlertMessageError.mp4" controls="controls"></video>

