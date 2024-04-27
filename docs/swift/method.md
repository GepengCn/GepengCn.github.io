# 方法

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/7iWmwiBibXixsRKKa6oyzC"></iframe>

方法是**与某些特定类型相关联的函数**。

方法分为两大类：实例方法和类方法。

- 实例方法是与类、结构体或枚举的实例相关联的方法
- 类方法则是与类本身相关联的方法。

## 实例方法

实例方法是属于某个特定类、结构体或者枚举类型实例的方法。

实例方法提供访问和修改实例属性的方法或提供与实例目的相关的功能，并以此来支撑实例的功能。

::: tip 特性

- 实例方法的语法与函数 `func` 完全一致。
- 实例方法要写在它所属的类型的前后大括号 `{}` 之间。
- 实例方法能够隐式访问它所属类型的所有的其他实例方法 `func` 和属性 `property`。
- 实例方法只能被它所属的类的某个特定实例调用。
- 实例方法不能脱离于现存的实例而被调用。

:::




示例：

```swift{4-6,8-10,12-14}
class Counter {
    var count = 0
    
    func increment() {
        count += 1
    }
    
    func increment(by amount: Int) {
        count += amount
    }
    
    func reset() {
        count = 0
    }
}

let counter = Counter()
counter.increment()
print(counter.count) // 输出 1

counter.increment(by: 5)
print(counter.count) // 输出 6

counter.reset()
print(counter.count) // 输出 0
```

在这个例子中，`Counter` 类定义了三个实例方法：`increment()`、`increment(by:)` 和 `reset()`。这些方法操作的是实例属性 `count`。

## 类方法

类方法是与类本身相关联的方法，而不是类的实例。

你可以通过在方法的 `func` 关键字前加上 `static` 关键字来定义类方法。

如果类的子类需要重写父类的某个类方法，可以使用 `class` 关键字代替 `static`。

示例：

```swift
class SomeClass {
    class func classMethod() {
        print("类方法被调用")
    }
}

SomeClass.classMethod() // 输出 "类方法被调用"
```

::: tip 类方法
类方法可以无需创建类的实例而直接调用，它们常常用来执行与整个类相关的操作，比如工厂方法（创建并返回类的实例），或者是管理全局状态的方法。

:::

## 结构体中的方法

结构体 `struct` 中的方法通常需要注意一个特殊的情况，即当你试图在方法内部修改结构体的属性时。

默认情况下，结构体的方法内部不能修改属性值，除非你使用 `mutating` 关键字来标记这个方法。

示例：

```swift
struct Point {
    var x = 0
    var y = 0
    
    mutating func moveBy(x deltaX: Int, y deltaY: Int) {
        x += deltaX
        y += deltaY
    }
}

var somePoint = Point()
somePoint.moveBy(x: 1, y: 1)
print("新的位置：(\(somePoint.x), \(somePoint.y))") // 输出 "新的位置：(1, 1)"
```

在这个例子中，`moveBy(x:y:)` 方法需要被标记为 `mutating`，因为它试图修改结构体 `Point` 的属性。

## 给 self 赋值

在 `mutating` 方法中，除了可以修改实例的属性，Swift 还允许你直接给 `self` 赋新值。

这是在结构体和枚举中特别有用的一点，因为它允许你从方法内部完全替换掉整个实例。

结构体示例：

```swift
struct Point {
    var x: Int
    var y: Int
    
    mutating func moveToOrigin() {
        self = Point(x: 0, y: 0)
    }
}
```

在这个例子中，`moveToOrigin` 方法不仅是一个可变方法，它还将 `Point` 实例的 `self` 直接替换为一个新的 `Point` 实例，其坐标设置为原点 $(0, 0)$。

枚举示例：

```swift
enum StateSwitch {
    case off, low, high
    
    mutating func next() {
        switch self {
        case .off:
            self = .low
        case .low:
            self = .high
        case .high:
            self = .off
        }
    }
}

var switchState = StateSwitch.off
switchState.next() // switchState 现在是 .low
switchState.next() // switchState 现在是 .high
switchState.next() // switchState 现在是 .off
```

在这个枚举的例子中，`next` 方法根据当前状态更改为下一个状态。

通过修改 `self`，`next` 方法能够完全改变枚举的值。

::: tip 为什么只有结构体和枚举需要 `mutating` 关键字？

结构体和枚举是值类型。

当值类型的一个实例方法修改其属性时，实质上是在修改该实例本身，因此需要 `mutating` 关键字来明确这一行为。

与此相反，类是引用类型，并不需要使用 `mutating` 关键字，因为类实例的方法默认就可以修改其属性。

:::