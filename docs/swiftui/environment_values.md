# Environment values

SwiftUI 中的视图可以通过使用 `@Environment` 属性包装器来响应它们从环境读取的配置信息。

视图从其容器视图继承其环境，但会受到来自 `environment(_:_)`视图修饰符的显式更改或许多操作环境值的修饰符之一的隐式更改的影响。因此，你可以通过修改组容器的环境来配置整个视图层次结构。

你可以在 `EnvironmentValues` 结构中找到许多内置的环境值。你也可以使用 `EnvironmentKey` 协议创建自定义值。

## `Environment`

一个属性包装器，用于从视图的环境读取一个值。

```swift
@frozen @propertyWrapper
struct Environment<Value>
```


### Overview


使用 `@Environment` 属性包装器来读取存储在视图环境中的一个值。在属性声明中使用 `EnvironmentValues` 的关键路径来指示要读取的值。例如，你可以创建一个属性，通过颜色方案的键路径来读取当前视图的颜色方案：

```swift
@Environment(\.colorScheme) var colorScheme: ColorScheme
```


你可以根据从声明属性的 `wrappedValue` 中读取的关联值来决定视图的内容。与任何属性包装器一样，你可以通过直接引用属性来访问包装的值：

```swift
if colorScheme == .dark { // Checks the wrapped value.
    DarkContent()
} else {
    LightContent()
}
```


如果该值发生变化，SwiftUI 会更新视图中依赖于该值的任何部分。例如，如果用户更改了外观设置，上述示例中就可能发生这种情况。

你可以使用此属性包装器来读取——但不能设置——环境值。SwiftUI 会根据系统设置自动更新某些环境值，并为其他环境值提供合理的默认值。你可以使用 `environment(_:_)` 视图修饰符覆盖其中一些默认值，以及设置你自己定义的自定义环境值。

### Get an observable object


你也可以使用 `@Environment` 从视图的环境获取一个可观测对象。该可观测对象必须遵循 `Observable` 协议，并且你的应用必须使用对象本身或其键路径将对象设置在环境中。

要使用对象本身在环境中设置对象，请使用 `environment(_:)` 修饰符：

```swift
@Observable
class Library {
    var books: [Book] = [Book(), Book(), Book()]

    var availableBooksCount: Int {
        books.filter(\.isAvailable).count
    }
}

@main
struct BookReaderApp: App {
    @State private var library = Library()

    var body: some Scene {
        WindowGroup {
            LibraryView()
                .environment(library)
        }
    }
}

```


要通过其类型获取可观测对象，可以创建一个属性并为 `Environment` 属性包装器提供对象的类型：

```swift
struct LibraryView: View {
    @Environment(Library.self) private var library


    var body: some View {
        // ...
    }
}
```

默认情况下，当使用对象类型作为键从环境中读取对象时，返回的是一个非可选对象。这种默认行为假设当前层次结构中的视图之前已经使用 `environment(_:_)` 修饰符存储了该类型的非可选实例。如果视图尝试使用其类型检索一个对象，而该对象不在环境中，SwiftUI 将会抛出异常。

在无法保证对象存在于环境中的情况下，可以像以下代码所示那样检索对象的可选版本。如果环境中没有该对象，SwiftUI 会返回 `nil` 而不是抛出异常。

```swift
@Environment(Library.self) private var library: Library?
```

### Get an observable object using a key path

要使用键路径在环境中设置对象，请使用 `environment(_:default:)` 修饰符：

```swift
@Observable
class Library {
    var books: [Book] = [Book(), Book(), Book()]

    var availableBooksCount: Int {
        books.filter(\.isAvailable).count
    }
}

@main
struct BookReaderApp: App {
    @State private var library = Library()

    var body: some Scene {
        WindowGroup {
            LibraryView()
                .environment(\.library, library)
        }
    }
}
```

要获取对象，请创建一个属性并指定键路径：

```swift
struct LibraryView: View {
    @Environment(\.library) private var library


    var body: some View {
        // ...
    }
}
```


## `EnvironmentValues`

一组环境值，通过视图层级传播。

```swift
struct EnvironmentValues
```

### Overview

SwiftUI 通过 `EnvironmentValues` 结构向你的应用视图公开了一系列值。要从该结构中读取一个值，可以使用 `@Environment` 属性包装器声明一个属性并指定值的键路径。例如，你可以读取当前的区域设置：

```swift
@Environment(\.locale) var locale: Locale
```

使用声明的属性动态控制视图的布局。SwiftUI 会根据设备特性、系统状态或用户设置自动设置或更新许多环境值，如像素长度（ `pixelLength` ）、场景阶段（ `scenePhase` ）或区域设置（ `locale` ）。对于其他值，如行限制（ `lineLimit` ），SwiftUI 提供了一个合理的默认值。

你可以使用 `environment(_:_)` 视图修饰符来设置或覆盖某些值：

```swift
MyView()
.environment(\.lineLimit, 2)
```

你设定的值会影响到被修改视图的环境——包括其在视图层级中的所有后代视图——但仅限于再次应用不同环境修饰符之前。

SwiftUI 为设置某些值提供了专门的视图修饰符，这通常会使你的代码更易于阅读。例如，相较于在前一个例子中直接设置 `lineLimit` 值，应该改用 `lineLimit(_:)` 修饰符：

```swift
MyView()
.lineLimit(2)
```

在某些情况下，使用专用的视图修饰符还会提供额外的功能。例如，当你像展示弹出框( `popover` )这样的视图时，必须使用 `preferredColorScheme(_:)` 修饰符而非直接设置 `colorScheme`，以确保新值能向上传播到呈现容器：

```swift
MyView()
    .popover(isPresented: $isPopped) {
        PopoverContent()
            .preferredColorScheme(.dark)
    }
```

通过定义遵循 `EnvironmentKey` 协议的类型来创建自定义环境值，然后通过扩展环境值结构来添加新属性。使用你的键来获取和设置值，并为客户端在设置值时提供专用的修饰符：

```swift
private struct MyEnvironmentKey: EnvironmentKey {
    static let defaultValue: String = "Default value"
}

extension EnvironmentValues {
    var myCustomValue: String {
        get { self[MyEnvironmentKey.self] }
        set { self[MyEnvironmentKey.self] = newValue }
    }
}

extension View {
    func myCustomValue(_ myCustomValue: String) -> some View {
        environment(\.myCustomValue, myCustomValue)
    }
}
```

然后，使用你的值的客户端会以常规方式访问该值，使用 `@Environment` 属性包装器读取它，并使用 `myCustomValue` 视图修饰符设置它。


## `EnvironmentKey`

访问环境中的值的键。

```swift
protocol EnvironmentKey
```

### Overview

你可以通过扩展 `EnvironmentValues` 结构体添加新属性来创建自定义环境值。首先声明一个新的环境键类型，并为必需的 `defaultValue` 属性指定一个值：

```swift
private struct MyEnvironmentKey: EnvironmentKey {
    static let defaultValue: String = "Default value"
}
```

Swift 编译器会自动推断关联的 `Value` 类型为你为默认值指定的类型。然后使用此键定义一个新的环境值属性：


```swift
extension EnvironmentValues {
    var myCustomValue: String {
        get { self[MyEnvironmentKey.self] }
        set { self[MyEnvironmentKey.self] = newValue }
    }
}
```

你的环境值的使用者不会直接使用这个键。相反，他们使用你自定义环境值属性的键路径。为了给一个视图及其所有子视图设置环境值，向该视图添加 `environment(_:_)` 视图修饰符：

```swift
MyView()
.environment(\.myCustomValue, "Another string")
```

为了方便起见，你还可以定义一个专用的视图修饰符来应用这个环境值：

```swift
extension View {
    func myCustomValue(_ myCustomValue: String) -> some View {
        environment(\.myCustomValue, myCustomValue)
    }
}
```

这提高了调用位置的清晰度：

```swift
MyView()
.myCustomValue("Another string")
```


要在 `MyView` 或其后代之一内部读取该值，请使用 `@Environment` 属性包装器：

```swift
struct MyView: View {
    @Environment(\.myCustomValue) var customValue: String

    var body: some View {
        Text(customValue) // Displays "Another string".
    }
}
```

## `environment(_:)`

将一个可观测对象放入视图的环境当中。

```swift
func environment<T>(_ object: T?) -> some View where T : AnyObject, T : Observable
```

使用此修饰符将使用 `Observable()` 宏声明的对象放置到视图的环境中。例如，你可以将自定义的可观测 `Profile` 类的实例添加到 `ContentView` 的环境：

```swift
@Observable class Profile { ... }

struct RootView: View {
    @State private var currentProfile: Profile?

    var body: some View {
        ContentView()
            .environment(currentProfile)
    }
}

```

然后，你可以在 `ContentView` 或其子视图之一内部使用 `@EnvironmentObject` 属性包装器读取该对象：

```swift
struct ContentView: View {
    @Environment(Profile.self) private var currentProfile: Profile

    var body: some View { ... }
}
```

此修饰符影响给定的视图及其后代视图。在调用它的视图层级之外没有任何效果。给定的视图层级的环境只保存给定类型的唯一一个可观测对象。


::: info
此修饰符接受遵循 `Observable` 协议的对象。若要添加遵循 `ObservableObject` 协议的环境对象，请改用 `environmentObject(_:)`。

:::

## `environment(_:_:)`

将指定键路径的环境值设置为给定值。

```swift
func environment<V>(
    _ keyPath: WritableKeyPath<EnvironmentValues, V>,
    _ value: V
) -> some View
```

使用此修饰符来设置 `EnvironmentValues` 结构体中的某个可写属性的值，包括你自己创建的自定义值。例如，你可以设置与 `truncationMode` 键关联的值：

```swift
MyView()
.environment(\.truncationMode, .head)
```

然后，你可以在 `MyView` 或其后代之一内部使用 `@Environment` 属性包装器读取该值：

```swift
struct MyView: View {
    @Environment(\.truncationMode) var truncationMode: Text.TruncationMode

    var body: some View { ... }
}
```


SwiftUI 为设置大多数环境值提供了专门的视图修饰符，比如用于设置 `truncationMode` 值的 `truncationMode(_:)` 修饰符：

```swift
MyView()
.truncationMode(.head)
```

当有专门的修饰符可用时，请优先使用，并在定义自定义环境值时提供自己的修饰符，如在 `EnvironmentKey` 中所述。

此修饰符会影响给定的视图及其后代视图。在调用它的视图层级之外没有任何效果。

## `transformEnvironment(_:transform:)`

使用给定的函数转换指定键路径的环境值。

```swift
func transformEnvironment<V>(
    _ keyPath: WritableKeyPath<EnvironmentValues, V>,
    transform: @escaping (inout V) -> Void
) -> some View
```