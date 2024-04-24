# 继承

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/8eGMPb3vQZYh7omX2FtPqy"></iframe>

继承是面向对象编程的核心概念之一，允许一个类继承另一个类的特性，如属性和方法。这样，子类可以复用父类的代码，还可以添加或修改某些功能。

## 基本概念

- **父类（基类）**：被其他类继承的类称为父类或基类。
- **子类**：继承父类的类称为子类。子类继承了父类的所有特性，并可以增加新的特性或重写现有的特性。

假设有一个基本的类 `Vehicle`，表示各种类型的交通工具：

```swift
class Vehicle {
    var currentSpeed = 0.0

    func makeNoise() {
        print("Some generic noise")
    }
}
```

你可以创建一个名为 `Bicycle` 的子类来继承 `Vehicle` 类：

```swift
class Bicycle: Vehicle {
    var hasBasket = false
}

let bicycle = Bicycle()
bicycle.currentSpeed = 15.0
bicycle.hasBasket = true
bicycle.makeNoise()  // 调用继承自 Vehicle 的方法
```

在这个例子中，`Bicycle` 继承了 `Vehicle` 的所有属性和方法，并添加了一个新的属性 `hasBasket`。

## 方法重写

子类可以通过重写来提供特定的实现，修改继承自父类的行为。重写是通过在子类中重新定义继承自父类的方法、属性或下标来实现的。在 Swift 中，你必须使用 `override` 关键字标记重写的部分。

例如，我们可以修改 `Bicycle` 类来重写 `makeNoise` 方法：

```swift
class Bicycle: Vehicle {
    var hasBasket = false

    override func makeNoise() {
        print("Ring Ring")
    }
}

let bicycle = Bicycle()
bicycle.makeNoise()  // 输出 "Ring Ring"
```

## 属性重写

属性重写可以让子类修改从父类继承来的属性的行为，包括存储属性和计算属性。重写属性时，子类可以提供自己的 getter 和 setter 方法或添加属性观察器，以便在属性值变化时执行一些操作。然而，有一些规则和限制需要遵守：

### 属性重写的规则

1. **重写计算属性和存储属性**：无论父类属性是计算属性还是存储属性，子类都可以通过定义计算属性来重写它。
2. **不改变属性类型**：重写的属性必须保持与原始属性相同的类型。
3. **使用 `override` 关键字**：在重写属性时，必须在属性声明前加上 `override` 关键字。

假设有一个名为 `Vehicle` 的基类，它有一个计算属性 `description`：

```swift
class Vehicle {
    var currentSpeed = 0.0

    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
}
```

你可以创建一个 `Bicycle` 类来继承 `Vehicle` 并重写 `description` 属性：

```swift
class Bicycle: Vehicle {
    var hasBasket = false

    override var description: String {
        return hasBasket ? "Bicycle with a basket, \(super.description)" : "Bicycle, \(super.description)"
    }
}
```

在这个例子中，`Bicycle` 通过添加关于自行车是否有篮子的信息来扩展了 `description` 属性。它还通过调用 `super.description` 来包括父类的描述。

### 添加属性观察器

子类可以通过添加属性观察器来重写父类的属性，即使它是一个存储属性。属性观察器可以用来在属性值改变前后执行代码。这包括 `willSet` 和 `didSet`：

```swift
class AutomaticCar: Vehicle {
    override var currentSpeed: Double {
        willSet {
            print("About to set currentSpeed to \(newValue)")
        }
        didSet {
            print("Just set currentSpeed from \(oldValue) to \(currentSpeed)")
        }
    }
}

let car = AutomaticCar()
car.currentSpeed = 35.0
```

在这个例子中，每次 `currentSpeed` 的值被设置时，都会输出新值和旧值的信息。

::: warning 注意事项

- **不允许添加观察器到计算属性**：因为计算属性本身不存储值，它们的值是通过 getter 和 setter 来计算的，所以不支持直接为计算属性添加 `willSet` 或 `didSet`。
- **不能直接重写存储属性**：你不能为一个从父类继承的存储属性直接提供另一个存储属性，但可以提供一个计算属性或添加属性观察器。
:::

## 防止重写

如果你不希望你的方法、属性或下标被子类重写，可以通过在声明前加上 `final` 关键字来阻止它们被重写：

```swift
class Vehicle {
    final var currentSpeed = 0.0

    final func makeNoise() {
        print("Some generic noise")
    }
}
```

在这种情况下，任何试图从 `Vehicle` 类继承的子类都不能重写 `currentSpeed` 和 `makeNoise`。

继承允许你建立一个类之间的层次结构，这对于组织复杂系统和避免代码重复非常有用。然而，应当注意过度使用继承，因为它可能导致代码结构复杂和难以维护。有时候，使用协议和扩展可能是更好的选择。