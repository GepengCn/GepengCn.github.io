# 协议

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/97Q4FewNyTg6deszuH5GKq"></iframe>

::: tip 协议定义了一个蓝图，规定了用来实现某一特定任务或者功能的方法、属性，以及其他需要的东西。
- 类、结构体或枚举都可以遵循协议，并为协议定义的这些要求提供具体实现。
- 某个类型能够满足某个协议的要求，就可以说该类型遵循这个协议。
- 除了遵循协议的类型必须实现的要求外，还可以对协议进行扩展，通过扩展来实现一部分要求或者实现一些附加功能，这样遵循协议的类型就能够使用这些功能。

:::

## 协议语法

协议的定义方式与类、结构体和枚举的定义非常相似：

```swift
protocol SomeProtocol {
    // 这里是协议的定义部分
}
```

- 要让自定义类型遵循某个协议，在定义类型时，需要在类型名称后加上协议名称，中间以冒号（ `:` ）分隔。
- 遵循多个协议时，各协议之间用逗号（ `,` ）分隔：

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // 这里是结构体的定义部分
}
```

若是一个类拥有父类，应该将父类名放在遵循的协议名之前，以逗号分隔：

```swift
class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol {
    // 这里是类的定义部分
}
```


## 属性要求

协议可以要求遵循协议的类型提供特定**名称**和**类型**的实例属性或类型属性。

协议不指定属性是存储属性还是计算属性，它只指定属性的名称和类型。

此外，协议还指定属性是可读的 `get` 还是可读可写的 `get set`。

示例

```swift
protocol FullNamed {
    var fullName: String { get }
}
```

这个协议要求任何符合 `FullNamed` 的类型必须有一个可读的 `fullName` 属性。


在协议中定义类属性时，使用 `static` 或 `class` 关键字作为前缀。

```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```


## 方法要求

::: tip 协议可以要求遵循协议的类型实现某些指定的实例方法或类方法。

- 这些方法作为协议的一部分，像普通方法一样放在协议的定义中，但是不需要大括号 `{}` 和方法体。
- 可以在协议中定义具有可变参数的方法，和普通方法的定义方式相同。
- 但是，不支持为协议中的方法提供默认参数。
- 在协议中定义类方法与类属性类似

:::

示例：

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```

这个协议要求符合它的类型必须实现一个 `random` 方法，该方法返回一个 `Double` 类型的值。

## 异变方法要求

::: info 有时需要在方法中改变（或异变）方法所属的实例

例如，在值类型（即结构体和枚举）的实例方法中，将 `mutating` 关键字作为方法的前缀，写在 `func` 关键字之前，表示可以在该方法中修改它所属的实例以及实例的任意属性的值。

:::


如果你在协议中定义了一个实例方法，该方法会**改变**遵循该协议的类型的实例，那么在定义协议时需要在方法前加 `mutating` 关键字。这使得结构体和枚举能够遵循此协议并满足此方法要求。


::: warning 注意
- 实现协议中的 `mutating` 方法时，若是类，则不用写 `mutating` 关键字。
- 而对于结构体和枚举，则必须写 `mutating` 关键字。

:::

示例：

```swift
protocol Togglable {
    mutating func toggle()
}

enum OnOffSwitch: Togglable {
    case off, on
    mutating func toggle() {
        switch self {
        case .off:
            self = .on
        case .on:
            self = .off
        }
    }
}
var lightSwitch = OnOffSwitch.off
lightSwitch.toggle()
// lightSwitch 现在的值为 .on
```

## 构造器要求

协议可以要求遵循协议的类型实现指定的构造器。

你可以像编写普通构造器那样，在协议的定义里写下构造器的声明，但不需要写花括号和构造器的实体：

::: tip `required`

你可以在遵循协议的类中实现构造器，无论是作为指定构造器，还是作为便利构造器。

无论哪种情况，你都必须为构造器实现标上 `required` 修饰符：
:::

示例：

```swift
protocol SomeProtocol {
    init(someParameter: Int)
}

//实现
class SomeClass: SomeProtocol {
    required init(someParameter: Int) {
        // 这里是构造器的实现部分
    }
}
```

如果一个子类重写了父类的指定构造器，并且该构造器满足了某个协议的要求，那么该构造器的实现需要同时标注 `required` 和 `override` 修饰符：


```swift
protocol SomeProtocol {
    init()
}

class SomeSuperClass {
    init() {
        // 这里是构造器的实现部分
    }
}

class SomeSubClass: SomeSuperClass, SomeProtocol {
    // 因为遵循协议，需要加上 required
    // 因为继承自父类，需要加上 override
    required override init() {
        // 这里是构造器的实现部分
    }
}
```


::: tip 协议还可以为遵循协议的类型定义可失败构造器要求

- 协议中定义的**可失败构造器**要求可失败构造器（ `init?` ）或非可失败构造器（ `init` ）来满足。
- 协议中定义的**非可失败构造器**要求非可失败构造器（ `init` ）或隐式解包可失败构造器（ `init!` ）来满足。

:::

## 协议作为类型

尽管协议本身并未实现任何功能，但是协议可以被当做一个功能完备的类型来使用。协议作为类型使用，有时被称作「存在类型」，这个名词来自「存在着一个类型 T，该类型遵循协议 T」。

协议可以像其他普通类型一样使用，使用场景如下：

- 作为函数、方法或构造器中的参数类型或返回值类型
- 作为常量、变量或属性的类型
- 作为数组、字典或其他容器中的元素类型

::: warning 注意
协议是一种类型，因此协议类型的名称应与其他类型（例如 `Int`，`Double`，`String` ）的写法相同，使用大写字母开头的驼峰式写法，例如（ `FullyNamed` 和 `RandomNumberGenerator` ）。

:::

示例：

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

委托是一种设计模式，它允许类或结构体将一些需要它们负责的功能委托给其他类型的实例。

::: info 委托模式的实现

定义协议来封装那些需要被委托的功能，这样就能确保遵循协议的类型能提供这些功能。

委托模式可以用来响应特定的动作，或者接收外部数据源提供的数据，而无需关心外部数据源的类型。

:::

示例：

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

示例：

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

示例：

```swift
extension Array: Printable where Element: Printable {
    func printDetail() {
        forEach { $0.printDetail() }
    }
}
```

这里，只有当数组的元素也遵循 `Printable` 协议时，`Array` 才遵循 `Printable`。


## 使用合成实现来采纳协议

Swift 可以自动提供一些简单场景下遵循 `Equatable`、`Hashable` 和 `Comparable` 协议的实现。

在使用这些合成实现之后，无需再编写重复的代码来实现这些协议所要求的方法。

::: tip Swift 为以下几种自定义类型提供了 `Equatable` 协议的合成实现
- 遵循 `Equatable` 协议且只有存储属性的结构体。
- 遵循 `Equatable` 协议且只有关联类型的枚举
- 没有任何关联类型的枚举

在包含类型原始声明的文件中声明对 `Equatable` 协议的遵循，可以得到 `==` 操作符的合成实现，且无需自己编写任何关于 `==` 的实现代码。

`Equatable` 协议同时包含 `!=` 操作符的默认实现。

:::



示例：

```swift
struct Vector3D: Equatable {
    var x = 0.0, y = 0.0, z = 0.0
}

let twoThreeFour = Vector3D(x: 2.0, y: 3.0, z: 4.0)
let anotherTwoThreeFour = Vector3D(x: 2.0, y: 3.0, z: 4.0)
if twoThreeFour == anotherTwoThreeFour {
    print("These two vectors are also equivalent.")
}
// 打印 "These two vectors are also equivalent."
```


::: tip Swift 为以下几种自定义类型提供了 `Hashable` 协议的合成实现
- 遵循 `Hashable` 协议且只有存储属性的结构体。
- 遵循 `Hashable` 协议且只有关联类型的枚举。
- 没有任何关联类型的枚举。

在包含类型原始声明的文件中声明对 `Hashable` 协议的遵循，可以得到 `hash(into:)` 的合成实现，且无需自己编写任何关于 `hash(into:)` 的实现代码。
:::

::: tip `Comparable`


Swift 为没有原始值的枚举类型提供了 `Comparable` 协议的合成实现。

如果枚举类型包含关联类型，那这些关联类型也必须同时遵循 `Comparable` 协议。

在包含原始枚举类型声明的文件中声明其对 `Comparable` 协议的遵循，可以得到 `> <=、> 和 >=` 操作符的默认实现。
:::

```swift
enum SkillLevel: Comparable {
    case beginner
    case intermediate
    case expert(stars: Int)
}
var levels = [SkillLevel.intermediate, SkillLevel.beginner,
            SkillLevel.expert(stars: 5), SkillLevel.expert(stars: 3)]
for level in levels.sorted() {
    print(level)
}
// 打印 "beginner"
// 打印 "intermediate"
// 打印 "expert(stars: 3)"
// 打印 "expert(stars: 5)"
```

## 协议类型的集合

协议类型可以用于声明集合，这使得你可以在数组或字典等集合中存储不同类型的对象，只要它们都遵循同一协议。

示例：

```swift
var things: [Printable] = [1, "Hello", 12.3]
things.forEach { $0.printDetail() }
```

## 协议的继承

协议能够继承一个或多个其他协议，可以在继承的协议的基础上增加新的要求。

协议的继承语法与类的继承相似，多个被继承的协议间用逗号 `,` 分隔：

### 示例

```swift
protocol AdvancedPrintable: Printable {
    func printAdvancedDetail()
}
```

## 类专属的协议

你通过添加 `AnyObject` 关键字到协议的继承列表，就可以限制协议只能被类类型遵循（而不能是结构体类型或者枚举类型）。

示例：

```swift
protocol SomeClassOnlyProtocol: AnyObject, Printable {
    // class-only protocol definition goes here
}
```

## 协议合成

可以要求一个类型同时遵循多个协议。

- 协议组合使用 `SomeProtocol & AnotherProtocol` 的形式。
- 你可以列举任意数量的协议，用和符号（ `&` ）分开。
- 除了协议列表，协议组合也能包含类类型，这允许你标明一个需要的父类。

下面的例子中，将 `Named` 和 `Aged` 两个协议按照上述语法组合成一个协议，作为函数参数的类型：

```swift
protocol Named {
    var name: String { get }
}
protocol Aged {
    var age: Int { get }
}
struct Person: Named, Aged {
    var name: String
    var age: Int
}
func wishHappyBirthday(to celebrator: Named & Aged) {
    print("Happy birthday, \(celebrator.name), you're \(celebrator.age)!")
}
let birthdayPerson = Person(name: "Malcolm", age: 21)
wishHappyBirthday(to: birthdayPerson)
// 打印 “Happy birthday Malcolm - you're 21!”
```

这里有一个例子：将 `Location` 类和前面的 `Named` 协议进行组合：

```swift
class Location {
    var latitude: Double
    var longitude: Double
    init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}
class City: Location, Named {
    var name: String
    init(name: String, latitude: Double, longitude: Double) {
        self.name = name
        super.init(latitude: latitude, longitude: longitude)
    }
}
func beginConcert(in location: Location & Named) {
    print("Hello, \(location.name)!")
}

let seattle = City(name: "Seattle", latitude: 47.6, longitude: -122.3)
beginConcert(in: seattle)
// 打印 "Hello, Seattle!"
```

## 检查协议一致性

你可以使用 类型转换 中描述的 `is` 和 `as` 操作符来检查协议一致性，即是否遵循某协议，并且可以转换到指定的协议类型。

检查和转换协议的语法与检查和转换类型是完全一样的：

- `is`用来检查实例是否遵循某个协议，若遵循则返回 `true`，否则返回 `false`；
- `as?` 返回一个可选值，当实例遵循某个协议时，返回类型为协议类型的可选值，否则返回 `nil`；
- `as!` 将实例强制向下转换到某个协议类型，如果强转失败，将触发运行时错误。

示例：

```swift
if let thing = thing as? Printable {
    thing.printDetail()
}
```

## 可选的协议要求

- 在 Swift 中，协议可以定义可选的要求，这意味着遵循该协议的类型可以选择是否实现这些要求。
- 然而，使用可选要求的能力限定在特定的上下文中，即只有当协议被标记为 `@objc` 时才能使用可选要求。
- 这样做是因为 `@objc` 属性使协议暴露给 Objective-C 代码，而可选协议要求是 Objective-C 运行时的特性。

### 示例

```swift
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
}
```

## 协议扩展添加默认实现

协议可以通过扩展来为遵循协议的类型提供属性、方法以及下标的实现。

通过这种方式，你可以基于协议本身来实现这些功能，而无需在每个遵循协议的类型中都重复同样的实现，也无需使用全局函数。

例如，可以扩展 `RandomNumberGenerator` 协议来提供 `randomBool()` 方法。

```swift
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}
```

通过协议扩展，所有遵循协议的类型，都能自动获得这个扩展所增加的方法实现而无需任何额外修改。


## 为协议扩展添加限制条件

在扩展协议的时候，可以指定一些限制条件，只有遵循协议的类型满足这些限制条件时，才能获得协议扩展提供的默认实现。

这些限制条件写在协议名之后，使用 `where` 子句来描述。

```swift
extension Collection where Element: Equatable {
    func allEqual() -> Bool {
        for element in self {
            if element != self.first {
                return false
            }
        }
        return true
    }
}

let equalNumbers = [100, 100, 100, 100, 100]
let differentNumbers = [100, 100, 200, 100, 200]


print(equalNumbers.allEqual())
// 打印 "true"
print(differentNumbers.allEqual())
// 打印 "false"
```

由于数组遵循 `Collection` 而且整数遵循 `Equatable`，`equalNumbers` 和 `differentNumbers` 都可以使用 `allEqual()` 方法。

