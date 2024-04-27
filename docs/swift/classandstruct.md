# 类和结构体

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/P8PMonKuWU7YvPMGBQpSPv"></iframe>

## 类

类（ `Class` ）是一种复杂的数据类型，它允许你创建具有属性和方法的对象。类是引用类型，这意味着当你将类实例赋给一个变量或常量，或者将它传递给函数时，实际上是在传递对该实例的引用。

### 基本定义
类在 Swift 中是使用 `class` 关键字定义的。一个类可以包含属性（变量和常量）、方法（函数）以及其他类型如构造器和析构器等。下面是一个简单的类定义示例：

```swift
class Dog {
    var name: String
    var breed: String

    init(name: String, breed: String) {
        self.name = name
        self.breed = breed
    }

    func bark() {
        print("Woof! Woof!")
    }
}
```

### 实例化
创建类的实例非常简单，只需调用类的构造器：

```swift
let myDog = Dog(name: "Buddy", breed: "Labrador")
```

### 继承
类的一个重要特性是继承，这意味着一个类可以继承另一个类的属性和方法。

::: info

继承是面向对象编程的核心概念之一，它允许新的类在现有类的基础上增加或修改行为。

:::
例如：

```swift
class Poodle: Dog {
    var color: String

    init(name: String, color: String) {
        self.color = color
        super.init(name: name, breed: "Poodle")
    }

    override func bark() {
        print("Yip! Yip!")
    }
}
```

### 引用类型的特性
由于类是引用类型，当你将一个类实例赋给另一个变量时，两者将指向相同的内存地址。

这意味着，如果你改变其中一个实例的属性，另一个也会随之改变：

```swift
let dog1 = Dog(name: "Rex", breed: "German Shepherd")
let dog2 = dog1
dog2.name = "Max"
print(dog1.name)  // 输出 "Max"
```

### 析构器
类还可以定义析构器，当类的实例被销毁时，析构器会被调用，用于执行清理工作，如释放资源或其他必要的清理任务：

```swift
deinit {
    print("\(name) is being deinitialized")
}
```

## 结构体

结构体是使用 `struct` 关键字定义的，与类相似，结构体可以包含属性和方法。但结构体是**值类型**，这意味着当结构体实例被赋给一个变量、常量或者被传递给一个函数时，它会被复制。

这里是一个简单的结构体示例：

```swift
struct Point {
    var x: Double
    var y: Double
}

var p1 = Point(x: 1.0, y: 2.0)
var p2 = p1  // p2是p1的一个全新副本
p2.x = 3.0   // 修改p2的x值，不影响p1
```

### 自动构造器
与类不同，Swift 为所有结构体提供了一个自动生成的成员逐一构造器，这使得结构体的初始化更为简单和安全。

```swift
let point = Point(x: 10.0, y: 20.0) // 使用自动构造器
```

### 方法
结构体不仅可以定义属性，还可以定义能够使用这些属性的方法：

```swift
struct Point {
    var x: Double
    var y: Double

    func isToTheRightOf(x: Double) -> Bool {
        return self.x > x
    }
}

let somePoint = Point(x: 5.0, y: 5.0)
somePoint.isToTheRightOf(x: 1.0) // 返回 true
```

### 变异方法

::: info
在 Swift 中，结构体（ `struct` ）被定义为值类型。这意味着当结构体的实例被传递给函数或者被赋给另一个变量时，会发生值的拷贝。因此，结构体实例本身不会被修改，而是创建了一个新的副本。
:::

当你需要在结构体的方法中修改其实例的属性时，这个方法需要被明确地标记为 `mutating`。这个 `mutating` 关键字告诉 Swift 编译器，这个方法将修改结构体的状态。

在方法执行时，Swift 实际上会在背后创建该结构体实例的一个拷贝，然后在这个拷贝上进行修改，最后用修改后的拷贝替换原来的实例。

例如，假设有一个结构体 `Counter`，其中包含一个属性 `count`，你想通过一个方法来增加 `count` 的值，那么你需要这样做：

```swift
struct Counter {
    var count = 0

    // 使用 mutating 关键字来允许修改属性
    mutating func increment() {
        count += 1
    }
}
```

在这个例子中，`increment` 方法前的 `mutating` 关键字是必须的，因为它修改了结构体的 `count` 属性。如果去掉 `mutating` 关键字，编译器将报错，因为默认情况下，结构体的方法是不允许修改属性的。


::: tip 使用场景
通常，当你需要封装少量简单数据值时，结构体是一个好选择，尤其是当你需要确保数据在代码中被安全复制，而不是被引用时。结构体广泛用于定义坐标系统、配置设置、选项值等。

:::

## 值类型和引用类型


### 值类型（Value Types）
值类型是一种当赋值给变量、常量或者传递给函数时，实际上复制其内容的数据类型。在 Swift 中，所有的基本类型（如整数、浮点数、布尔值）、结构体（struct）和枚举（enum）都是值类型。

#### 特性：
- **独立的实例**：每个实例保持其独立的一份数据拷贝。如果你将一个值类型的实例赋给另一个变量，后者将获得前者数据的一份新拷贝。
- **内存管理**：值类型通常存储在栈上，这使得它们的分配和销毁可以更快速且效率更高。

```swift
var a = 10
var b = a
b += 10
print(a)  // 输出 10，因为 b 的修改不影响 a
```

### 引用类型（Reference Types）
引用类型数据存储在堆内存中，而变量或常量存储的是指向这些数据的引用（或地址）。在 Swift 中，所有的类（class）都是引用类型。

#### 特性：
- **共享单个实例**：如果你将一个引用类型的实例赋给另一个变量，两者将指向内存中的同一个实例。因此，如果通过一个变量修改了该实例，其他所有引用都会反映这种变化。
- **内存管理**：引用类型存储在堆上，需要复杂的内存管理过程，如引用计数等。

```swift
class SimpleClass {
    var value: Int = 10
}
var c1 = SimpleClass()
var c2 = c1
c2.value = 20
print(c1.value)  // 输出 20，因为 c1 和 c2 引用同一个实例
```

::: info 对比总结
- **性能**：值类型由于直接存储在栈上，通常来说比引用类型更快，尤其是在有大量小的数据结构需要快速创建和销毁的情况下。
- **内存安全**：值类型在多线程环境下通常更安全，因为它们不会被多个线程共享。
- **使用选择**：如果需要确保被封装的数据在函数或方法间传递时不被修改，值类型是一个更好的选择。相反，如果需要创建复杂的对象关系模型，或者需要在应用的不同部分间共享和修改数据，引用类型可能更适合。

:::

## 类和结构体


Swift 中结构体和类有很多共同点。**两者都可以**：

- 定义属性用于存储值
- 定义方法用于提供功能
- 定义下标操作用于通过下标语法访问它们的值
- 定义构造器用于设置初始值
- 通过扩展以增加默认实现之外的功能
- 遵循协议以提供某种标准功能

与结构体相比，**类还有如下的附加功能**：

- 继承允许一个类继承另一个类的特征
- 类型转换允许在运行时检查和解释一个类实例的类型
- 析构器允许一个类实例释放任何其所被分配的资源
- 引用计数允许对一个类的多次引用

::: tip
类支持的附加功能是以增加复杂性为代价的。作为一般准则，优先使用结构体，因为它们更容易理解，仅在适当或必要时才使用类。
:::