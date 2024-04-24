# 可选链

<iframe style="border:none" width="800" height="450" src="https://whimsical.com/embed/5aLhtxGp8JyFNNxtcbQLuD"></iframe>

可选链式调用是一种可以在当前值可能为`nil`的可选值上请求和调用属性、方法及下标的方法。如果可选值有值，那么调用就会成功；如果可选值是`nil`，那么调用将返回`nil`。多个调用可以连接在一起形成一个调用链，如果其中任何一个节点为`nil`，整个调用链都会失败，即返回`nil`。


## 使用可选链式调用代替强制解包

在 Swift 中，你可以使用可选链（Optional Chaining）来安全地访问可选类型的属性、方法和下标。这是通过在要调用的属性、方法或下标后添加一个问号（`?`）来实现的。这种语法与在可选值后面添加一个感叹号（`!`）来强制解包相似，但是它们的行为在处理空值（`nil`）时有重要的区别：

- 可选链调用在遇到`nil`值时会优雅地失败，即调用结果直接返回`nil`，而不进行任何操作。
- 强制解包（使用`!`）在遇到`nil`值时会引发运行时错误，因为它期望可选值必须有一个非`nil`的值。

使用可选链的一个关键特性是，无论原本的属性、方法或下标的返回类型是什么，通过可选链得到的结果总是一个可选类型。这意味着，即使原本的返回类型是非可选的（比如`Int`），通过可选链访问后，返回类型将变为其对应的可选类型（比如`Int?`）。

下面几段代码将解释可选链式调用和强制解包的不同。

首先，我们定义两个类：Person 和 Residence：

```swift
class Person {
    var residence: Residence?
}

class Residence {
    var numberOfRooms = 1
}
```
这里，Residence 类有一个 Int 类型的属性 `numberOfRooms`，默认值为 1。Person 类有一个可选属性 `residence`，其类型为 `Residence?`，初始值为 nil。

假设我们创建了一个 Person 实例，名为 john，其 `residence` 属性默认为 nil：

```swift
let john = Person()
```
如果我们尝试使用感叹号（!）强制解包 john 的 `residence` 属性来获取 `numberOfRooms` 的值，将会引发运行时错误，因为 `residence` 是 nil，没有值可以被解包：

```swift
let roomCount = john.residence!.numberOfRooms
// 这会引发运行时错误
```
另一种安全的访问方式是使用可选链，用问号（?）替换感叹号：

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
// 打印“Unable to retrieve the number of rooms.”
```
通过在 `residence` 后添加问号，Swift 将只在 `residence` 不为 nil 时尝试访问 `numberOfRooms`。因为 `numberOfRooms` 的访问可能失败（即 `residence` 可能为 nil），可选链式调用的返回类型是 `Int?`，即可选的 Int。当 `residence` 为 nil 时，可选的 Int 也为 nil，表示无法访问 `numberOfRooms`。如果访问成功，则通过可选绑定，将值解包并赋给常量 `roomCount`。

现在，如果我们给 john 的 `residence` 赋值一个实例，它将不再是`nil`：

```swift
john.residence = Residence()
```
此时，如果再次使用可选链式调用来访问 `numberOfRooms`，此调用会成功，并返回一个非`nil`的`Int?`类型值：

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
// 打印“John's residence has 1 room(s).”
```
## 为可选链式调用定义模型类

下面的代码示例展示了如何在 Swift 中使用多层可选链来访问和操作复杂数据模型中的子属性、方法和下标。我们将继续使用`Person`和`Residence`类，并添加新的`Room`和`Address`类来增加示例的复杂度。

首先，我们保持`Person`类的定义基本不变，其中包含一个可选的`Residence`类型属性：

```swift
class Person {
    var residence: Residence?
}
```

`Residence`类相较之前更加复杂，新增了一个`rooms`数组用来存储`Room`实例，并且包含多个属性和方法：

```swift
class Residence {
    var rooms: [Room] = []
    var numberOfRooms: Int {
        return rooms.count
    }

    subscript(i: Int) -> Room {
        get {
            return rooms[i]
        }
        set {
            rooms[i] = newValue
        }
    }

    func printNumberOfRooms() {
        print("The number of rooms is \(numberOfRooms)")
    }

    var address: Address?
}
```

`Residence`类的 `numberOfRooms` 属性现在是一个计算属性，返回 rooms 数组的元素数量。`Residence`还提供了一个下标，允许通过索引访问或修改`rooms`数组中的具体`Room`实例。此外，`printNumberOfRooms` 方法用于打印房间数量，而 `address` 属性则是一个可选的`Address`实例。

`Room`类是一个较简单的类，其中包含一个`name`属性和一个构造函数：

```swift
class Room {
    let name: String
    init(name: String) { self.name = name }
}
```

`Address`类拥有三个可选字符串属性，并提供了一个方法来生成地址标识：

```swift
class Address {
    var buildingName: String?
    var buildingNumber: String?
    var street: String?

    func buildingIdentifier() -> String? {
        if let buildingName = buildingName {
            return buildingName
        } else if let buildingNumber = buildingNumber, let street = street {
            return "\(buildingNumber) \(street)"
        } else {
            return nil
        }
    }
}
```

在`Address`类中，`buildingIdentifier` 方法尝试返回一个完整的地址标识符。如果存在`buildingName`，则优先返回。否则，如果同时存在`buildingNumber`和`street`，将这两者组合成一个地址字符串返回。如果都不存在，则返回`nil`。


## 通过可选链式调用访问属性


使用前面定义过的类，创建一个`Person`实例，然后像之前一样，尝试访问`numberOfRooms`属性：


```swift
let john = Person()
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
// 打印“Unable to retrieve the number of rooms.”
```

因为`john.residence`为`nil`，所以这个可选链式调用依旧会像先前一样失败。

还可以通过可选链式调用来设置属性值：


```swift
let someAddress = Address()
someAddress.buildingNumber = "29"
someAddress.street = "Acacia Road"
john.residence?.address = someAddress
```


在这个例子中，通过`john.residence`来设定`address`属性也会失败，因为`john.residence`当前为`nil`。

上面代码中的赋值过程是可选链式调用的一部分，这意味着可选链式调用失败时，等号右侧的代码不会被执行。对于上面的代码来说，很难验证这一点，因为像这样赋值一个常量没有任何副作用。下面的代码完成了同样的事情，但是它使用一个函数来创建`Address`实例，然后将该实例返回用于赋值。该函数会在返回前打印“Function was called”，这使你能验证等号右侧的代码是否被执行。


```swift
func createAddress() -> Address {
    print("Function was called.")

    let someAddress = Address()
    someAddress.buildingNumber = "29"
    someAddress.street = "Acacia Road"

    return someAddress
}
john.residence?.address = createAddress()
```

没有任何打印消息，可以看出`createAddress()`函数并未被执行。

## 通过可选链式调用来调用方法

在 Swift 中，可选链式调用不仅适用于访问属性和下标，也可以用来调用方法，即使这些方法没有返回值。这是由于在 Swift 中，没有返回值的方法实际上具有一个隐式的返回类型 `Void`，即一个空的元组 `()`。

### 方法调用示例

考虑 `Residence` 类中的 `printNumberOfRooms()` 方法：

```swift
func printNumberOfRooms() {
    print("The number of rooms is \(numberOfRooms)")
}
```
该方法打印当前的房间数量，本身没有返回值，因此其隐式返回类型为 `Void`。当你通过可选链式调用这个方法时，返回类型变为 `Void?`。这意味着，尽管方法没有具体的返回值，我们仍然可以通过返回的 `nil` 或非 `nil` 来判断方法是否成功调用。

例如，如果我们尝试对 `john` 的 `residence` 调用 `printNumberOfRooms()` 方法，可以这样写：

```swift
if john.residence?.printNumberOfRooms() != nil {
    print("It was possible to print the number of rooms.")
} else {
    print("It was not possible to print the number of rooms.")
}
```
这段代码中，如果 `john.residence` 是 `nil`，那么 `printNumberOfRooms()` 的调用就会失败（即返回 `nil`），从而打印 "It was not possible to print the number of rooms."

可选链同样可以用于尝试为属性赋值，并通过返回的 `Void?` 类型来判断赋值是否成功。例如，尝试给 `john.residence` 的 `address` 属性赋值：

```swift
let someAddress = Address()
if (john.residence?.address = someAddress) != nil {
    print("It was possible to set the address.")
} else {
    print("It was not possible to set the address.")
}
```
在这里，如果 `john.residence` 是 `nil`，那么赋值操作将失败，返回 `nil`，因此将打印 "It was not possible to set the address."

## 通过可选链式调用访问下标

通过可选链式调用，我们可以在一个可选值上访问下标，并且判断下标调用是否成功。

::: warning 注意
通过可选链式调用访问可选值的下标时，应该将问号放在下标方括号的前面而不是后面。
:::

首先，考虑以下场景，我们尝试访问 `john.residence` 的第一个房间的名称，但 `john.residence` 初始为 `nil`：

```swift
let john = Person()
if let firstRoomName = john.residence?[0].name {
    print("The first room name is \(firstRoomName).")
} else {
    print("Unable to retrieve the first room name.")
}
// 打印“Unable to retrieve the first room name.”
```
这里，问号 (`?`) 直接放在 `john.residence` 的后面，紧跟在方括号前，表明如果 `john.residence` 是 `nil`，则整个表达式立即求值为 `nil`。因此，由于 `residence` 是 `nil`，下标调用失败，返回 `nil`。

同样，尝试通过下标给 `john.residence` 中的 `rooms` 数组赋值也会失败，因为 `residence` 仍然是 `nil`：

```swift
john.residence?[0] = Room(name: "Bathroom")
```
这次赋值操作不会执行，因为没有实际的 `Residence` 实例来存储 `Room` 对象。

如果我们先创建一个 `Residence` 实例并向其中添加房间，然后将其赋给 `john.residence`，接下来的可选链调用就可以成功：

```swift
let johnsHouse = Residence()
johnsHouse.rooms.append(Room(name: "Living Room"))
johnsHouse.rooms.append(Room(name: "Kitchen"))
john.residence = johnsHouse

if let firstRoomName = john.residence?[0].name {
    print("The first room name is \(firstRoomName).")
} else {
    print("Unable to retrieve the first room name.")
}
// 打印“The first room name is Living Room.”
```
在这个例子中，由于 `john.residence` 不再是 `nil`，可选链可以顺利地通过下标访问 `rooms` 数组中的第一个 `Room` 实例，然后获取其 `name` 属性。

## 连接多层可选链式调用

可以通过连接多个可选链式调用在更深的模型层级中访问属性、方法以及下标。然而，多层可选链式调用不会增加返回值的可选层级。

也就是说：

- 如果你访问的值不是可选的，可选链式调用将会返回可选值。

- 如果你访问的值就是可选的，可选链式调用不会让可选返回值变得“更可选”。

因此：

- 通过可选链式调用访问一个`Int`值，将会返回`Int?`，无论使用了多少层可选链式调用。

- 类似的，通过可选链式调用访问`Int?`值，依旧会返回`Int?`值，并不会返回`Int??`。

下面的例子尝试访问`john`中的`residence`属性中的`address`属性中的`street`属性。这里使用了两层可选链式调用，`residence`以及`address`都是可选值：

```swift
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
// 打印“Unable to retrieve the address.”
```

`john.residence`现在包含一个有效的`Residence`实例。然而，`john.residence.address`的值当前为`nil`。因此，调用`john.residence?.address?.street`会失败。

需要注意的是，上面的例子中，`street`的属性为`String?`。`john.residence?.address?.street`的返回值也「依然」是`String?`，即使已经使用了两层可选链式调用。

如果为`john.residence.address`赋值一个`Address`实例，并且为`address`中的`street`属性设置一个有效值，我们就能过通过可选链式调用来访问`street`属性：

```swift
let johnsAddress = Address()
johnsAddress.buildingName = "The Larches"
johnsAddress.street = "Laurel Street"
john.residence?.address = johnsAddress

if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
// 打印“John's street name is Laurel Street.”
```

在上面的例子中，因为`john.residence`包含一个有效的`Address`实例，所以对`john.residence`的`address`属性赋值将会成功。

## 在方法的返回值上可选链式调用

上面的例子展示了如何在一个可选值上通过可选链式调用来获取它的属性值。我们还可以在一个可选值上通过可选链式调用来调用方法，并且可以根据需要继续在方法的可选返回值上进行可选链式调用。

在下面的例子中，通过可选链式调用来调用`Address`的`buildingIdentifier()`方法。这个方法返回`String?`类型的值。如上所述，通过可选链式调用来调用该方法，最终的返回值依旧会是`String?`类型：


```swift
if let buildingIdentifier = john.residence?.address?.buildingIdentifier() {
    print("John's building identifier is \(buildingIdentifier).")
}
// 打印“John's building identifier is The Larches.”
```

如果要在该方法的返回值上进行可选链式调用，在方法的圆括号后面加上问号即可：

```swift
if let beginsWithThe =
    john.residence?.address?.buildingIdentifier()?.hasPrefix("The") {
        if beginsWithThe {
            print("John's building identifier begins with \"The\".")
        } else {
            print("John's building identifier does not begin with \"The\".")
        }
}
// 打印“John's building identifier begins with "The".”	
```

::: warning 注意
在上面的例子中，在方法的圆括号后面加上问号是因为你要在`buildingIdentifier()`方法的可选返回值上进行可选链式调用，而不是`buildingIdentifier()`方法本身。
:::