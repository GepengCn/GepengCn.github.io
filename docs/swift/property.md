# 属性

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/W2pspWPWrs8KTsWQ2CHpRJ"></iframe>

## 存储属性
简单来说，一个存储属性就是存储在特定类或结构体实例里的一个常量或变量。

可以在定义存储属性的时候指定默认值，也可以在构造过程中设置或修改存储属性的值。

示例：
```swift
class Person {
    var name: String
    var age: Int
}
let alice = Person(name: "Alice", age: 30)
```
在这里，`alice` 是一个人的实例，有名字 `name` 和年龄 `age` 两个存储属性。

### 延时加载存储属性

延时加载存储属性是指**当第一次被调用的时候才会计算其初始值的属性**。

在属性声明前使用 `lazy` 来标示一个延时加载存储属性。

::: warning 注意
必须将延时加载属性声明成**变量**（使用 `var` 关键字），因为属性的初始值可能在实例构造完成之后才会得到。

而常量属性在构造过程完成之前必须要有初始值，因此无法声明成延时加载。
:::

有两种场景，延迟加载非常有用：

- 当属性的值依赖于一些外部因素且这些外部因素只有在**构造过程结束之后才会知道**的时候。
- 当获得属性的值因为需要复杂或者大量的计算，而采用**需要的时候再计算**的方式。

例如：

```swift
class DataImporter {
    /*
    DataImporter 是一个负责将外部文件中的数据导入的类。
    这个类的初始化会消耗不少时间。
    */
    var fileName = "data.txt"
    // 这里会提供数据导入功能
}

class DataManager {
    lazy var importer = DataImporter()
    var data: [String] = []
    // 这里会提供数据管理功能
}

let manager = DataManager()
manager.data.append("Some data")
manager.data.append("Some more data")
// DataImporter 实例的 importer 属性还没有被创建
```

由于使用了 `lazy`，`DataImporter` 的实例 `importer` 属性只有在第一次被访问的时候才被创建。比如访问它的属性 `fileName` 时：

```swift
print(manager.importer.fileName)
// DataImporter 实例的 importer 属性现在被创建了
// 输出“data.txt”
```

::: warning 注意
如果一个被标记为 `lazy` 的属性在没有初始化时就同时被多个线程访问，则无法保证该属性只会被初始化一次。
:::

## 计算属性
计算属性不直接保存数据，而是根据其他属性的值来计算新的值。就好比计算器，你输入一些数字（其他属性的值），计算器给你结果。

示例：
```swift
struct Rectangle {
    var width: Double
    var height: Double
    var area: Double {
        return width * height
    }
}
var myRectangle = Rectangle(width: 5.0, height: 4.0)
print(myRectangle.area)  // 输出 20.0
```
在这个例子中，`area` 是一个计算属性，它通过计算 `width` 和 `height` 来得出矩形的面积。

## 属性观察器
属性观察器像是给属性安装了一个警报系统。当属性的值即将改变或已经改变时，这个警报系统会被触发。

比如，你可以设置当步数增加时，打印一条消息告诉你步数增加了多少。


可以为属性添加其中一个或两个观察器：

::: tip `willSet` 在新的值被设置之前调用
在 `willSet` 的实现代码中可以为这个参数指定一个名称，如果不指定则参数仍然可用，这时使用默认名称 `newValue` 表示。

:::
::: tip `didSet` 在新的值被设置之后调用
同样，`didSet` 观察器会将旧的属性值作为参数传入，可以为该参数指定一个名称或者使用默认参数名 `oldValue`。

如果在 `didSet` 方法中再次对该属性赋值，那么新值会覆盖旧的值。
:::

示例：
```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("将 totalSteps 的值设置为 \(newTotalSteps)")
        }
        didSet {
            if totalSteps > oldValue  {
                print("增加了 \(totalSteps - oldValue) 步")
            }
        }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// 将 totalSteps 的值设置为 200
// 增加了 200 步
stepCounter.totalSteps = 360
// 将 totalSteps 的值设置为 360
// 增加了 160 步
stepCounter.totalSteps = 896
// 将 totalSteps 的值设置为 896
// 增加了 536 步
```
在这个例子中，每次更改 `totalSteps` 的值时，都会先告诉你即将设置的新值，然后告诉你实际增加了多少步。



## 属性包装器

属性包装器在 Swift 中是一个强大的功能，它允许你将一部分属性的管理代码重用和封装起来。简单地说，属性包装器可以看作是一种包裹和管理属性的方式，使得你可以将某些行为（如存储、转换或观察属性值）抽象和重用，而不需要在每个地方重复相同的代码。

::: info
想象一下你有一个任务，需要在多个地方检查用户名是否为空，或者检查一个数值是否在特定范围内。通常你可能会在每个模型中重写这样的逻辑，但使用属性包装器，你可以创建一个统一的处理方式，每次需要的时候只需简单地应用它。
:::
属性包装器通过定义一个结构体、类或枚举，然后在其中实现 `wrappedValue` 属性来创建。

示例：
```swift
@propertyWrapper
struct TwelveOrLess {
    private var number: Int
    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, 12) }
    }
    init() {
        self.number = 0
    }
}
```
在这个例子中，`TwelveOrLess` 是一个属性包装器，它确保数值永远不会超过 $12$。无论你尝试设置什么值，`wrappedValue` 都会返回不大于 $12$ 的值。

你可以把属性包装器应用于类、结构体或枚举的任何属性上，来自动获取其提供的行为。

示例：
```swift
struct Rectangle {
    @TwelveOrLess var height: Int
    @TwelveOrLess var width: Int
}

var rectangle = Rectangle()
rectangle.height = 10
rectangle.width = 24
print(rectangle.height) // 输出 10
print(rectangle.width)  // 输出 12
```
在这个例子中，尽管我们尝试将 `width` 设置为 $24$，属性包装器保证了 `width` 的值不会超过 $12$。

:::info 总结

属性包装器在 Swift 中提供了一个非常强大的工具，可以帮助你编写更干净、更可维护的代码。通过将复杂的属性管理逻辑封装在可重用的单元中，你可以简化你的代码并减少错误。这种模式非常适合那些需要在多处进行相同或类似属性管理的场景。

:::

## 全局变量和局部变量

### 全局变量

全局变量是**在函数、方法或任何代码块之外定义的变量**。

::: tip
这意味着全局变量可以在代码的任何地方被访问和修改（除非有访问控制限制）。

全局变量的生命周期从程序开始执行时创建，直到程序终止时结束。
:::

示例：
```swift
var globalNumber = 100  // 全局变量定义

func incrementGlobalNumber() {
    globalNumber += 1
}

incrementGlobalNumber()
print(globalNumber) // 输出 101
```
- 在这个例子中，`globalNumber` 是一个全局变量，我们在一个函数内部对它进行了修改。
- 由于它是全局的，所以在整个程序中都可以访问和更改它。

### 局部变量

局部变量是**在函数、方法或代码块内部定义的变量**。

::: tip
它们只在定义它们的那个块内可见和可用。

当代码执行离开这个块时，局部变量的生命周期结束，即它们会被销毁。
:::
示例：
```swift
func testFunction() {
    var localNumber = 50  // 局部变量定义
    localNumber += 5
    print(localNumber) // 输出 55
}

testFunction()
// print(localNumber) // 这会引发错误，因为 localNumber 在这里是不可见的
```
- 这里的 `localNumber` 是一个局部变量，只在 `testFunction` 函数内部可用。
- 一旦函数执行完毕，`localNumber` 就无法再被访问了。


### 延迟计算

全局变量和常量的初始化是延迟计算的，这意味着它们直到首次被使用时才会进行初始化。

这种行为类似于使用 `lazy` 关键字标记的属性，但对于全局变量和常量来说，你无需显式使用 `lazy` 修饰符。

::: tip 为什么这样设计？

这种设计可以提高应用的启动速度和性能，因为不必在应用启动时立即加载所有全局变量和常量。它们只有在真正需要时才被加载和初始化，这有助于资源的优化管理。

:::

#### 局部变量和常量不进行延迟计算

与全局变量和常量不同，局部变量和常量在其声明的作用域内立即计算。

当执行流程到达变量或常量的定义处时，它们会立即被初始化，无论它们是否被立即使用。

::: tip 为什么这样设计？
局部变量和常量的生命周期通常较短，它们随着函数或代码块的执行开始而开始，结束时销毁。因此，Swift 设计为立即计算这些值，以保证它们在局部作用域内始终是最新和有效的。

:::

假设我们有以下代码：

```swift
var globalCounter: Int {
    print("计算全局变量")
    return 1
}

func testFunction() {
    let localCounter: Int = {
        print("计算局部变量")
        return 2
    }()
    print(localCounter)
}

print(globalCounter)  // 第一次调用，会触发打印和计算
print(globalCounter)  // 第二次调用，不会再次计算

testFunction()        // 调用函数，触发局部变量的打印和计算
```

在这个示例中，`globalCounter` 作为全局变量，仅在第一次使用时打印和计算。而 `localCounter` 作为局部变量，在每次执行 `testFunction` 函数时都会进行计算。

## 类属性

类属性是那些**与类本身相关联，而不是与该类的某个实例相关联的属性**。

- 这意味着无论创建多少个类的实例，类属性的值都是共享的。
- 类属性可以是变量类型（使用 `static var`）或常量类型（使用 `static let`）。
- 如果你想要让子类重写父类的实现，可以使用 `class` 关键字代替 `static` 来定义计算类属性。


::: info 类属性的作用

- 存储所有实例共享的数据。
- 定义特定于类的常量。
- 跟踪某个类的全局状态。

:::

- 类属性通过在其前面加上 `static` 关键字来定义。
- 访问类属性时，需要使用类的名称而不是实例的名称。

示例：

```swift
struct AudioSample {
    static let sampleRate = 44100
    static var totalSamples = 0
}

print(AudioSample.sampleRate)  // 访问静态常量
AudioSample.totalSamples += 1  // 修改静态变量
print(AudioSample.totalSamples) // 输出 1
```

在这个例子中，`AudioSample` 结构体有一个类常量 `sampleRate` 和一个类变量 `totalSamples`。

::: tip 关联
这些属性与类本身相关联，而不是与结构体的某个实例相关联。
:::
除了存储类属性之外，Swift 也支持计算类属性。

这是通过使用 `static` 关键字和一个 `getter`（以及可选的 `setter` ）来实现的，就像实例的计算属性一样。

**示例**：

```swift
struct NetworkManager {
    static var serverURL = "https://example.com"
    static var computedURL: String {
        return serverURL + "/api"
    }
}

print(NetworkManager.computedURL) // 输出 "https://example.com/api"
```

在这个例子中，`computedURL` 是一个计算类属性，它根据 `serverURL` 的当前值来动态生成完整的 `URL`。


::: tip 子类重写
如果你在编写一个类并且想要其**子类能够重写某个类属性**，你应该使用 `class` 关键字来代替 `static`。

这允许子类通过重写该属性来提供自己特定的实现。
:::

示例：

```swift
class SomeClass {
    class var universalValue: String {
        return "Some value"
    }
}

class Subclass: SomeClass {
    override class var universalValue: String {
        return "Subclass value"
    }
}

print(SomeClass.universalValue) // 输出 "Some value"
print(Subclass.universalValue)  // 输出 "Subclass value"
```

这里，`Subclass` 重写了 `SomeClass` 的 `universalValue` 类属性，因此当通过 `Subclass` 类访问它时，返回的是子类提供的值。

