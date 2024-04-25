# 协议

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/97Q4FewNyTg6deszuH5GKq"></iframe>

在 Swift 中，协议是一种定义一组方法、属性或其他要求的蓝图，它可以被类、结构体或枚举采用（即符合）。协议可以要求符合它的类型提供特定的方法、构造器、属性（包括计算属性和属性观察者）以及下标等。协议本身并不提供这些功能的实现，只指定这些功能必须存在。因此，协议可以说是定义了一个功能的模板，让遵循（符合）这个协议的类型去具体实现这些要求。

## 基本使用

协议的定义与类、结构体和枚举的定义类似，但它不定义任何属性或方法的内容，只定义属性或方法的名称、类型及其它特性。

### 示例定义

```swift
protocol Identifiable {
    var id: String { get set }
    func identify()
}
```

在这个例子中，`Identifiable` 协议有一个要求，即任何符合该协议的类型必须有一个可读写的 `id` 属性和一个 `identify` 方法。

## 属性要求

协议可以要求符合它的类型提供特定的实例属性或类属性。属性要求总是声明为变量属性，后面带有 `{ get }` 或 `{ get set }` 来指明属性是可读的还是可读写的。

### 示例

```swift
protocol FullNamed {
    var fullName: String { get }
}
```

这个协议要求任何符合 `FullNamed` 的类型必须有一个可读的 `fullName` 属性。

## 方法要求

协议可以要求符合它的类型实现特定的方法。

### 示例

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```

这个协议要求符合它的类型必须实现一个 `random` 方法，该方法返回一个 `Double` 类型的值。

## 构造器要求

协议还可以要求符合它的类型实现特定的构造器。

### 示例

```swift
protocol SomeProtocol {
    init(someParameter: Int)
}
```

这个协议要求任何符合 `SomeProtocol` 的类型必须有一个接受单个 `Int` 参数的指定构造器。

## 协议作为类型

协议本身可以作为一种类型使用，这使得你可以编写更加模块化和可复用的代码。协议类型可以存储符合该协议的任何实例。

### 示例

```swift
class SomeClass: Identifiable {
    var id: String
    init(id: String) { self.id = id }
    func identify() { print("My ID is \(id).") }
}

let myIdentifiable: Identifiable = SomeClass(id: "12345")
myIdentifiable.identify()
```

这里，`Identifiable` 作为类型使用，允许 `myIdentifiable` 变量接受任何符合 `Identifiable` 协议的实例。

## 委托（代理）模式

协议经常用于实现委托模式，这是一种允许类或结构体将一些责任委托给另一个类型的实例的设计模式。

委托模式的实现很简单：定义协议来封装那些需要被委托的功能，这样就能确保遵循协议的类型能提供这些功能。委托模式可以用来响应特定的动作，或者接收外部数据源提供的数据，而无需关心外部数据源的类型。

### 示例

```swift
protocol TaskDelegate {
    func taskDidFinish(status: Bool)
}

class Task {
    var delegate: TaskDelegate?
    
    func completeTask() {
        delegate?.taskDidFinish(status: true)
    }
}
```

这个示例展示了如何使用协议来定义一个委托的功能，使得 `Task` 类可以通知其代理任务已完成。


## 在扩展里添加协议遵循

可以在扩展中声明一个类型符合某个协议，这是为已存在的类添加新功能的一种灵活方式。

### 示例

```swift
protocol Printable {
    func printDetail()
}

extension String: Printable {
    func printDetail() {
        print("The string is \(self)")
    }
}
```

这个例子中，`String` 类型通过扩展来遵循 `Printable` 协议。

## 有条件地遵循协议

你可以指定某个类型只在满足特定条件时才遵循某个协议。

### 示例

```swift
extension Array: Printable where Element: Printable {
    func printDetail() {
        forEach { $0.printDetail() }
    }
}
```

这里，只有当数组的元素也遵循 `Printable` 协议时，`Array` 才遵循 `Printable`。


## 使用合成实现来采纳协议

Swift 可以自动为你的类型实现协议的要求，如果这些要求已经通过其他方式（如类型的初始声明或通过扩展）被满足。

### 示例

如果定义一个符合 `Equatable` 协议的结构体，Swift 可以为你合成 `==` 函数的实现：

```swift
struct Point: Equatable {
    var x: Int
    var y: Int
}
```

## 协议类型的集合

协议类型可以用于声明集合，这使得你可以在数组或字典等集合中存储不同类型的对象，只要它们都遵循同一协议。

### 示例

```swift
var things: [Printable] = [1, "Hello", 12.3]
things.forEach { $0.printDetail() }
```

## 协议的继承

协议可以继承一个或多个其他协议，并可以添加新的要求。

### 示例

```swift
protocol AdvancedPrintable: Printable {
    func printAdvancedDetail()
}
```

## 类专属的协议

你可以限定协议只能被类类型遵循，而不是结构体或枚举，使用 `AnyObject` 关键字。

### 示例

```swift
protocol SomeClassOnlyProtocol: AnyObject, Printable {
    // class-only protocol definition goes here
}
```

## 协议合成

可以要求一个类型同时遵循多个协议，这称为协议合成。

### 示例

```swift
func printDetails(_ thing: Printable & AdvancedPrintable) {
    thing.printDetail()
    thing.printAdvancedDetail()
}
```

## 检查协议一致性

你可以使用 `is` 和 `as` 操作符来检查和转换协议类型。

### 示例

```swift
if let thing = thing as? Printable {
    thing.printDetail()
}
```

## 可选的协议要求

在 Swift 中，协议可以定义可选的要求，这意味着遵循该协议的类型可以选择是否实现这些要求。然而，使用可选要求的能力限定在特定的上下文中，即只有当协议被标记为 @objc 时才能使用可选要求。这样做是因为 @objc 属性使协议暴露给 Objective-C 代码，而可选协议要求是 Objective-C 运行时的特性。

### 示例

```swift
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
}
```

