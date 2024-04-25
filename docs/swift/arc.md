# 自动引用计数

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/SRBACvrZDcfgMjHfP4ffJn"></iframe>

Swift 使用自动引用计数（ARC） 机制来跟踪和管理你的应用程序的内存。通常情况下，Swift 内存管理机制会一直起作用，你无须自己来考虑内存的管理。ARC 会在类的实例不再被使用时，自动释放其占用的内存。

然而在少数情况下，为了能帮助你管理内存，ARC 需要更多的，代码之间关系的信息。本章描述了这些情况，并且为你示范怎样才能使 ARC 来管理你的应用程序的所有内存。


## 自动引用计数的工作机制

每当你创建一个新的类实例时，ARC 会分配一块内存来储存该实例的信息。内存中会包含实例的类型信息，以及这个实例所关联的任何存储属性的值。

此外，当实例不再被使用时，ARC 释放实例所占用的内存，并让释放的内存能挪作他用。这确保了不再被使用的实例，不会一直占用内存空间。

然而，当 ARC 回收并释放了正在被使用中的实例后，该实例的属性和方法将不能再被访问和调用。实际上，如果你试图访问这个实例，你的应用程序很可能会崩溃。

为了确保使用中的实例不会被销毁，ARC 会跟踪和计算每一个实例正在被多少属性，常量和变量所引用。哪怕实例的引用数为 1，ARC 都不会销毁这个实例。

为了使上述成为可能，无论你将实例赋值给属性、常量或变量，它们都会创建此实例的强引用。之所以称之为“强”引用，是因为它会将实例牢牢地保持住，只要强引用还在，实例是不允许被销毁的。

首先，我们定义了一个简单的 `Person` 类，它有一个名为 `name` 的常量属性和一个构造器，以及一个析构器：

```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    deinit {
        print("\(name) is being deinitialized")
    }
}
```

当你创建一个 `Person` 类的实例时，比如一个名字叫 "John Appleseed" 的人，构造器会运行并打印出初始化的消息。

```swift
var reference1: Person?
var reference2: Person?
var reference3: Person?
reference1 = Person(name: "John Appleseed")
// 输出：John Appleseed is being initialized
```

这里 `reference1` 是 `Person` 类实例的第一个引用。由于它是一个强引用，ARC 会保证这个实例至少在 `reference1` 存在时不会被销毁。

如果你想让更多的变量引用同一个实例，你可以将这个实例赋给其他变量：

```swift
reference2 = reference1
reference3 = reference1
```

现在，`John Appleseed` 的这个实例有三个强引用指向它，这意味着只要这三个引用中的任何一个存在，这个实例就不会被销毁。

如果你决定不再使用这个实例，你可以通过将这些变量赋值为 `nil` 来移除这些强引用：

```swift
reference1 = nil
reference2 = nil
```

此时，尽管你移除了两个引用，但 `reference3` 仍然保持着对该实例的引用，所以实例不会被销毁。只有当你也将 `reference3` 设为 `nil` 时，最后一个强引用被断开：

```swift
reference3 = nil
// 输出：John Appleseed is being deinitialized
```

这时，由于没有任何强引用指向该实例，ARC 将清理这个实例，调用析构器，并打印出相应的消息，标志着实例的完全销毁。


## 类实例之间的循环强引用

上面的例子中，ARC 会跟踪你所新创建的 Person 实例的引用数量，并且会在 Person 实例不再被需要时销毁它。

然而，我们可能会写出一个类实例的强引用数永远不能变成 0 的代码。如果两个类实例互相持有对方的强引用，因而每个实例都让对方一直存在，这就是所谓的循环强引用。

下面展示了一个不经意产生循环强引用的例子。例子定义了两个类：`Person`和`Apartment`，用来建模公寓和它其中的居民：

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```


在两个实例被创建和赋值后，下图表现了强引用的关系。变量`john`现在有一个指向`Person`实例的强引用，而变量`unit4A`有一个指向`Apartment实例的强引用：

![StrongRefPre](../images/StrongRefPre.png)


现在你能够将这两个实例关联在一起，这样人就能有公寓住了，而公寓也有了房客。

![StrongRef](../images/StrongRef.png)

::: warning 注意
注意感叹号是用来解包和访问可选变量`john`和`unit4A`中的实例，这样实例的属性才能被赋值。
:::


不幸的是，这两个实例关联后会产生一个循环强引用。`Person`实例现在有了一个指向`Apartment`实例的强引用，而`Apartment`实例也有了一个指向`Person`实例的强引用。因此，当你断开`john`和`unit4A`变量所持有的强引用时，引用计数并不会降为 0，实例也不会被 ARC 销毁：

```swift
john = nil
unit4A = nil
```

![StrongRefSuffix](../images/StrongRefSuffix.png)

`Person`和`Apartment`实例之间的强引用关系保留了下来并且不会被断开。


## 解决实例之间的循环强引用


Swift 提供了两种办法用来解决你在使用类的属性时所遇到的循环强引用问题：弱引用（weak reference）和无主引用（unowned reference）。

### 弱引用

弱引用不会对其引用的实例保持强引用，因而不会阻止 ARC 销毁被引用的实例。这个特性阻止了引用变为循环强引用。声明属性或者变量时，在前面加上`weak`关键字表明这是一个弱引用。

因为弱引用不会保持所引用的实例，即使引用存在，实例也有可能被销毁。因此，ARC 会在引用的实例被销毁后自动将其弱引用赋值为 `nil`。并且因为弱引用需要在运行时允许被赋值为`nil`，所以它们会被定义为可选类型变量，而不是常量。

你可以像其他可选值一样，检查弱引用的值是否存在，这样可以避免访问已销毁的实例的引用。

::: warning 注意
当 ARC 设置弱引用为`nil`时，属性观察不会被触发。
:::

这一次，`Apartment`的`tenant`属性被声明为弱引用：

```swift{11}
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    weak var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```
现在，两个关联在一起的实例的引用关系如下图所示：

![WeakRef](../images/WeakRef.png)

`Person`实例依然保持对`Apartment`实例的强引用，但是`Apartment`实例只持有对`Person`实例的弱引用。这意味着当你通过把`john`变量赋值为`nil`而断开其所保持的强引用时，再也没有指向`Person`实例的强引用了：

```swift
john = nil
// 打印“John Appleseed is being deinitialized”
```

由于再也没有指向`Person`实例的强引用，该实例会被销毁，且`tenant`属性会被赋值为`nil`：

![WeakRefRelease](../images/WeakRefRelease.png)

唯一剩下的指向`Apartment`实例的强引用来自于变量`unit4A`。如果你断开这个强引用，再也没有指向`Apartment`实例的强引用了：

```swift
unit4A = nil
// 打印“Apartment 4A is being deinitialized”
```

![WeakRefDeinit](../images/WeakRefDeinit.png)

### 无主引用

在 Swift 中，无主引用（`unowned`）与弱引用（`weak`）有类似的作用，它们都不会强持有实例，从而帮助避免循环引用的问题。不同之处在于，无主引用适用于被引用的实例拥有与之相同或更长生命周期的情况。当你声明一个属性或变量时，可以在其前面加上`unowned`关键字来指明这是一个无主引用。

与弱引用不同的是，无主引用总是预期有值的。因此，无主引用的对象不是可选类型，当相关联的实例被销毁后，自动引用计数（ARC）也不会将无主引用设置为`nil`。重要的是，你必须确保无主引用始终指向一个尚未被销毁的实例。如果在实例被销毁后访问其无主引用，程序将触发运行时错误。

以下是`Customer`和`CreditCard`两个类的定义，它们模拟了银行客户和其信用卡之间的关系。在这个例子中，一个客户可能拥有或不拥有信用卡，但每张信用卡必定关联一个客户。为了表示这种关系，`Customer`类中有一个可选的`card`属性，而`CreditCard`类中的`customer`属性则是非可选的。

创建`CreditCard`实例时必须同时提供一个`number`值和一个`Customer`实例，以确保每张信用卡在创建时都已经与一个客户实例关联。

为了避免循环强引用，`CreditCard`类中`的customer`属性被定义为无主引用：

```swift
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
    deinit {
        print("\(name) is being deinitialized")
    }
}

class CreditCard {
    let number: UInt64
    unowned let customer: Customer
    init(number: UInt64, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit {
        print("Card #\(number) is being deinitialized")
    }
}
```
在你关联两个实例后，它们的引用关系如下图所示：

![Unowned](../images/Unowned.png)

由于`customer`属性被设置为无主引用，当你解除对`john`变量的强引用，就不再存在任何指向该`Customer`实例的强引用了。

![UnownedRelease](../images/UnownedRelease.png)

由于不存在任何指向`Customer`实例的强引用，该实例随即被销毁。随后，由于也没有任何指向`CreditCard`实例的强引用，这个实例也被销毁了。

### 无主可选引用

当你期望用无主引用来避免循环引用，但又不能保证引用的对象在引用的整个生命周期内都不会被销毁时，可以使用无主可选引用。这样，即使被引用的对象被销毁了，引用自动变为 `nil`，从而避免了程序崩溃的风险。


假设有一个 `Person` 类和一个 `Car` 类，一个人可能拥有一辆车，而这辆车需要记录其所有者的信息。但是，车的所有者可能在某一时刻会变为 `nil`（例如，车被卖掉了，这时车不再有所有者）。

```swift
class Person {
    var name: String
    var car: Car?
    
    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("\(name) 被销毁")
    }
}

class Car {
    var model: String
    unowned var owner: Person?
    
    init(model: String) {
        self.model = model
    }
    
    deinit {
        print("\(model) 车被销毁")
    }
}

var john: Person? = Person(name: "John")
var toyota: Car? = Car(model: "Toyota")

john?.car = toyota
toyota?.owner = john

// 现在 John 卖掉了他的 Toyota
john?.car = nil
// 在卖掉车之后，我们希望 John 对象不再持有车辆，同时车辆的所有者信息也应该是 nil
toyota?.owner = nil

// 最终清除所有引用
john = nil
toyota = nil
```

在这个例子中，我们设定 `Car` 类中的 `owner` 属性为 `unowned`。这样可以防止循环引用，因为 `Person` 实例持有 `Car` 实例的强引用，而 `Car` 实例对 `Person` 实例的引用是无主的。

如果车的所有者可能变成 `nil`，我们应该使用 `unowned var owner: Person?`。这里的 `unowned` 表示引用不增加对象的引用计数，而 `?` 允许 `owner` 变量成为 `nil`。在实际的 Swift 语法中，`unowned` 引用默认是非可选的，因为它们被假定总是有值。如果需要让 `unowned` 引用成为可选类型，这其实是一个不符合 Swift 当前语法规则的设想，因为无主引用必须总是有值，这是为了确保使用无主引用时不需要进行解包。

在这个例子中，如果 `owner` 属性设置成 `unowned` 且不是可选类型，当 `john` 被设置为 `nil` 时，如果再尝试访问 `toyota?.owner`，程序会崩溃，因为无主引用 `owner` 指向一个已经被销毁的实例。为了避免这种情况，通常会使用 `weak` 而不是 `unowned`（如果存在对象被释放的可能性）。

### 无主引用和隐式解包可选值属性

- **弱引用和无主引用**：这两种引用类型通常用于解决循环引用问题，其中弱引用适用于两个对象的属性都可能为 `nil` 的情况；无主引用则用于一个对象的属性可以为 `nil`，而另一个不可以的场景。
- **无主引用和隐式解包可选值属性**：在某些情况下，两个对象的属性在初始化后都必须始终有值，并且这些值在对象生命周期内不会变为 `nil`。在这种情况下，可以选择一个对象使用无主属性，而另一个对象使用隐式解包可选值属性。

```swift
class Country {
    let name: String
    var capitalCity: City!
    
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
}

class City {
    let name: String
    unowned let country: Country
    
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
```

在这个模型中，每个国家 (`Country`) 必须有一个首都 (`City`)，而每个城市必须属于一个国家。为了满足这种需要，我们在 `Country` 类中将 `capitalCity` 声明为隐式解包可选值（使用 `!`），这意味着一旦 `Country` 的实例被初始化，其 `capitalCity` 属性可以像非可选值那样直接访问，而无需解包。

通过这种设计，`City` 的构造器接受一个 `Country` 实例作为参数，并将其存储在无主属性 `country` 中，这确保了不会因为相互引用而导致内存泄漏。同时，`Country` 的构造器在创建 `City` 实例时能够直接传递 `self`，这是因为在 Swift 的两段式构造过程中，一旦第一阶段完成，所有存储属性包括隐式解包的属性都已经被赋初值。

```swift
var country = Country(name: "Canada", capitalName: "Ottawa")
print("\(country.name)'s capital city is called \(country.capitalCity.name)")
// 输出：“Canada's capital city is called Ottawa”
```


在此例中，通过创建 `Country` 和 `City` 的实例来展示这种无主引用和隐式解包可选值属性的结合使用，有效地避免了循环引用的问题，并保持了属性访问的便捷性。这样的设计在确保对象间依赖关系明确的同时，还解决了潜在的内存管理问题。


## 闭包的循环强引用

闭包中的循环强引用是 Swift 编程中一个常见的问题，特别是在闭包捕获 `self`（指向类实例的引用）时经常发生。这种循环强引用会导致内存泄漏，因为即使类实例不再需要，它也不会被正确地销毁。理解并解决这一问题对于编写高效、可靠的 Swift 代码至关重要。

::: tip 闭包引起的循环强引用
当闭包直接或间接地引用了它所属的类实例，且类实例同时持有这个闭包时，就可能产生循环强引用。因为闭包和类相互引用，所以它们都不会被释放，这就导致了内存泄漏。
:::
#### 示例代码
假设有一个 `Person` 类，其中包含一个闭包 `doSomething`，这个闭包引用了 `self` 来访问类的属性或方法：

```swift
class Person {
    var name: String
    lazy var doSomething: () -> String = {
        return "My name is \(self.name)"
    }

    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("\(name) is being deinitialized")
    }
}

var person: Person? = Person(name: "John")
print(person!.doSomething())
person = nil // 这里本应触发 deinit，但不会发生
```

在上述代码中，`doSomething` 闭包捕获了 `self`。因为 `Person` 实例持有 `doSomething` 闭包，而 `doSomething` 又捕获了 `self`，形成了循环强引用。因此，即使将 `person` 设置为 `nil`，`Person` 实例也不会被释放。

### 解决方法：捕获列表
为了解决闭包中的循环强引用问题，Swift 提供了捕获列表（capture list）。通过在闭包的定义中使用捕获列表，可以指定闭包内如何捕获一个或多个引用类型。

#### 使用 `weak` 或 `unowned`
- **weak**: 当不确定引用的对象是否会被销毁时使用。使用 `weak` 可以使引用变成可选类型，当对象被销毁时，引用自动变为 `nil`。
- **unowned**: 当确信引用的对象在闭包被调用时依然存在时使用。使用 `unowned` 时，如果引用的对象不存在，尝试访问将触发运行时错误。

#### 修改后的代码
使用 `weak self` 来防止循环强引用：

```swift
class Person {
    var name: String
    lazy var doSomething: () -> String = { [weak self] in
        return "My name is \(self?.name ?? "unknown")"
    }

    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("\(name) is being deinitialized")
    }
}

var person: Person? = Person(name: "John")
print(person!.doSomething())
person = nil // 现在这里会触发 deinit，因为循环强引用已被解决
```

在这个修改后的版本中，`self` 被作为 `weak` 捕获，这意味着它可以变为 `nil`。闭包中使用 `self?` 来安全地访问 `self`，如果 `self` 为 `nil`，则返回 `"unknown"`。这样就成功地解决了循环强引用问题，同时保持了代码的功能性。