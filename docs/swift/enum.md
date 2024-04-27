# 枚举

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/SwSaBbR4h2g8UouGgsmZtw"></iframe>

## 枚举语法

枚举为一组相关的值定义了一个共同的类型，使你可以在你的代码中以类型安全的方式来使用这些值。

假设我们要表示一周中的各天，可以这样定义一个枚举：

```swift
enum Weekday {
    case monday
    case tuesday
    case wednesday
    case thursday
    case friday
    case saturday
    case sunday
}
```

在这个例子中，`Weekday` 是枚举的名字，而后面的 `monday`、`tuesday` 等则是枚举的成员（或称为枚举案例）。

你可以使用枚举来创建变量，并且赋予它们特定的枚举成员作为值：

```swift
var today: Weekday = .monday
```

这里，`today` 被声明为 `Weekday` 类型，并且初始值设为了 `.monday`。

## 使用 Switch 语句匹配枚举值

你可以使用 `switch` 语句匹配单个枚举值：

```swift
switch directionToHead {
case .north:
    print("Lots of planets have a north")
case .south:
    print("Watch out for penguins")
case .east:
    print("Where the sun rises")
case .west:
    print("Where the skies are blue")
}
```

然后，可以这样使用这个方法：

```swift
directionToHead = .south
// 如果 directionToHead 是 .south，将打印 "Watch out for penguins"
```

## 枚举成员的遍历

如果想要遍历枚举的所有成员，可以让枚举遵循 `CaseIterable` 协议。这个协议让枚举自动生成一个包含所有案例的数组（ `allCases` ）。

下面是一个实现`CaseIterable` 协议的枚举例子以及如何遍历它的成员：

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice, water
}
```

### 遍历枚举成员

```swift
for beverage in Beverage.allCases {
    print(beverage)
}
```

执行上面的代码会打印出所有的饮料类型：

```
coffee
tea
juice
water
```

遵循 `CaseIterable` 不仅可以遍历枚举成员，还可以进行其他操作，比如计算枚举的成员总数，或者基于索引访问特定的枚举成员：

```swift
let numberOfChoices = Beverage.allCases.count
print("有 \(numberOfChoices) 种饮料可供选择。")

let firstChoice = Beverage.allCases.first
print("第一种选择是 \(firstChoice!).")
```

## 关联值

枚举可以有关联值（ `Associated Values` ），这让枚举能够存储额外的自定义信息。

让我们来看一个实际的例子，这个例子中我们定义一个枚举来表示不同类型的二维码信息：

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```

- 枚举 `Barcode` 有两个成员：`upc` 和 `qrCode`。
- `upc` 成员有四个整数类型的关联值，通常用于表示产品的通用产品代码（ `UPC` ）。
- `qrCode` 成员有一个字符串类型的关联值，用于表示二维码中存储的信息。

创建和使用带有关联值的枚举非常直接：

```swift
var productBarcode = Barcode.upc(8, 85909, 51226, 3)
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
```

- 首先，我们创建了一个名为 `productBarcode` 的变量，最初赋予它一个 `Barcode.upc` 类型的值。
- 然后，我们将这个变量的值改变为一个 `Barcode.qrCode` 类型的值。

使用 `switch` 语句来匹配不同的情况：

```swift
switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case .qrCode(let productCode):
    print("QR code: \(productCode).")
}
```

这个 `switch` 语句检查 `productBarcode` 的类型，并为每种情况解包相应的关联值。

如果一个枚举成员的所有关联值都被提取为常量，或者都被提取为变量，为了简洁，你可以在**最前面**的成员名称前标注一个 `let` 或者 `var`

```swift
switch productBarcode {
case let .upc(numberSystem, manufacturer, product, check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case let .qrCode(productCode):
    print("QR code: \(productCode).")
}
// 打印“QR code: ABCDEFGHIJKLMNOP.”
```


## 原始值

枚举还可以有原始值（ `Raw Values` ），这是与每个枚举成员相关联的默认值，并且所有成员的原始值类型必须相同。


::: info
使用原始值可以让你更方便地从存储的值转换回枚举类型，或者反过来。
:::
### 定义带有原始值的枚举

原始值可以是字符串、字符、整数或浮点数类型。

这里是一个使用整数作为原始值的例子：

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

`Planet` 枚举表示太阳系的行星，并且每个行星都有一个与之对应的整数原始值。

::: tip

枚举的第一个成员 `mercury` 明确赋值为 `1`，Swift 会自动给后续的成员赋值为递增的整数（即 `venus` 为 `2`，`earth` 为 `3`，以此类推）。

:::

你可以使用原始值来初始化枚举类型的新实例：

```swift
let earth = Planet(rawValue: 3)
```

`earth` 被赋值为 `Planet.earth`，因为 `earth` 成员的原始值是 `3`。

::: warning
注意返回的是一个可选值（ `Optional` ），因为不是所有整数都会对应一个行星。
:::

你可以通过访问枚举实例的 `rawValue` 属性来获取其原始值：

```swift
if let planet = Planet(rawValue: 2) {
    print("The second planet is \(planet).")
}
```

这段代码将输出：`The second planet is venus.`，因为 `venus` 成员的原始值是 `2`。


## 递归枚举

递归枚举是指枚举成员的关联值可以是**枚举本身**的实例。

::: tip
这种类型的枚举可以用来表示那些递归数据结构，例如链表、树等。
:::
Swift 使用 `indirect` 关键字来表示一个枚举成员是递归的，这告诉编译器需要对枚举实例进行额外处理以支持递归。

递归枚举的一个典型例子是表达算术表达式。以下是如何使用递归枚举来定义一个简单的算术表达式：

```swift
enum ArithmeticExpression {
    case number(Int)
    indirect case addition(ArithmeticExpression, ArithmeticExpression)
    indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

在这个例子中，`ArithmeticExpression` 枚举定义了三种情况：
- `number`，它关联一个整数值。
- `addition` 和 `multiplication`，它们都关联两个 `ArithmeticExpression` 实例，分别表示加法和乘法运算。

你也可以在整个枚举之前使用 `indirect` 关键字，这样所有成员都被视为递归：

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

让我们创建一个表达式 $(5 + 4) * 2$：

```swift
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))
```

递归枚举通常需要一个函数来遍历和计算它的值。

这里是一个如何评估 `ArithmeticExpression` 的函数：

```swift
func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case let .number(value):
        return value
    case let .addition(left, right):
        return evaluate(left) + evaluate(right)
    case let .multiplication(left, right):
        return evaluate(left) * evaluate(right)
    }
}

let result = evaluate(product)
print("结果是 \(result)")  // 输出 "结果是 18"
```

这个 `evaluate` 函数递归地处理每个算术表达式，直到遇到一个简单的数字。

它根据表达式的类型（加法或乘法）来递归计算左侧和右侧的值，然后返回最终结果。

