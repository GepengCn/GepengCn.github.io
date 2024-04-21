# 基础部分

<iframe style="border:none" width="800" height="450" src="https://whimsical.com/embed/TAXMEpqr8PiJExMXoqmtN1"></iframe>

[[toc]]

## 常量和变量

「常量」的值一旦设定就不能改变，而「变量」的值可以随意更改。

使用前必须声明，`let`来声明常量，`var`声明变量，例如：

```swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

可以在一行中声明多个常量或者多个变量，用逗号隔开：

```swift
var x = 0.0, y = 0.0, z = 0.0
```

### 类型注解

用来说明常量或者变量中要存储的值的「类型」，比如:

```swift
var welcomeMessage: String

var total: Int

var changed: Bool
```

- 「变量」welcomeMessage 的「类型」是字符串（String）
- 「变量」total 的「类型」是数值型（Int）
- 「变量」changed 的「类型」是布尔型（Bool）

可以在一行中定义多个同样类型的变量，用逗号分割，并在最后一个变量名之后添加类型注解：

```swift
var red, green, blue: Double
```

如果在「声明」变量或常量时赋予了「初值」，则可以不写类型注解，因为 Swift 可以根据「初值」推断出它的类型。

### 命名

不能包含数学符号，箭头，保留的（或者非法的）Unicode 码位，连线与制表符。也不能以数字开头。如下例：

```swift
let π = 3.14159 // [!code error]
let 你好 = "你好世界" // [!code error]
let 🐶🐮 = "dogcow" // [!code error]
```


一旦你将常量或者变量声明为确定的类型，你就不能使用「相同」的名字「再次」进行声明，或者「改变」其存储的值的「类型」。同时，你也不能将常量与变量进行「互转」。

```swift
var greeting = "Hello, World"

//Error: Invalid redeclaration of 'greeting'
var greeting: Int = 1 // [!code error]

//Error: Cannot assign value of type 'Int' to type 'String'
greeting = 5 // [!code error]

```

可以更改现有的变量值为「同类型」的值。如下例：

```swift
var greeting = "Hello, World"

// greeting 现在是 "Hello, Swift!"
greeting = "Hello, Swift" 
```

常量的值一旦被确定就不能更改了。尝试这样做会导致编译时报错：

```swift
let languageName = "Swift"

//Error: Cannot assign to value: 'languageName' is a 'let' constant
languageName = "Swift++"  // [!code error]
```

### 输出常量和变量


可以用[print(_:separator:terminator:)](https://developer.apple.com/documentation/swift/print(_:separator:terminator:))函数来输出当前常量或变量的值:

```swift
func print(
    _ items: Any...,
    separator: String = " ",
    terminator: String = "\n"
)
```
- items：零个或多个要打印的项目。
- separator：在每个项目之间打印的字符串。默认为一个空格（" "）。
- terminator：在所有项目打印完毕后打印的字符串。默认为换行符（"\n"）。

例如：

::: code-group

```swift [常规用法]
print("One two three four five")
// Prints "One two three four five"


print(1...5)
// Prints "1...5"


print(1.0, 2.0, 3.0, 4.0, 5.0)
// Prints "1.0 2.0 3.0 4.0 5.0"
```

```swift [分隔符]
print(1.0, 2.0, 3.0, 4.0, 5.0, separator: " ... ")
// Prints "1.0 ... 2.0 ... 3.0 ... 4.0 ... 5.0"
```

```swift [终止符]
for n in 1...5 {
    print(n, terminator: ",end")
}
// Prints "12345,end"
```

:::

如果要将变量或常量传入字符串，可以使用「字符串插值」，用法`\(...)`

```swift {4-5}
let price = 2
let number = 3
let message = """
If one cookie costs \(price) dollars, \
\(number) cookies cost \(price * number) dollars.
"""
print(message)
// Prints "If one cookie costs 2 dollars, 3 cookies cost 6 dollars."
```

## 注释

请在代码中使用注释来添加提示或笔记，这样便于将来阅读。Swift 编译器在编译代码时会自动忽略掉这些注释部分。

::: code-group

```swift [单行注释]
// 这是一个注释
```

```swift [多行]
/* 这也是一个注释，
但是是多行的 */
```

```swift [多行嵌套]
/* 这是第一个多行注释的开头
/* 这是第二个被嵌套的多行注释 */
这是第一个多行注释的结尾 */
```
:::

## 分号

与其他大部分编程语言不同，Swift 并不强制要求在每条语句的结尾处使用分号（`;`），当然，你也可以按照你自己的习惯添加分号。有一种情况下「必须」要用分号，即你打算在**同一行内写多条独立的语句**：

```swift
let cat = "🐱"; print(cat)
// 输出“🐱”
```

## 整数

Swift 提供了 8、16、32 和 64 位的有符号和无符号整数类型。

::: details
整数就是没有小数部分的数字，比如 42 和 -23 。整数可以是 有符号（正、负、零）或者 无符号（正、零）。
:::


### 整数范围

你可以访问不同整数类型的 min 和 max 属性来获取对应类型的最小值和最大值：

```swift
let minValue = UInt8.min  // minValue 为 0，是 UInt8 类型
let maxValue = UInt8.max  // maxValue 为 255，是 UInt8 类型
```

### Int

Swift 提供了一个特殊的整数类型 Int，长度与「当前平台」的原生字长相同：

- 在32位平台上，Int 和 Int32 长度相同。
- 在64位平台上，Int 和 Int64 长度相同。


::: details
除非你需要特定长度的整数，一般来说使用 Int 就够了。这可以提高代码一致性和可复用性。即使是在32位平台上，Int 可以存储的整数范围也可以达到 -2,147,483,648 ~ 2,147,483,647，大多数时候这已经足够大了。
:::

### UInt

Swift 也提供了一个特殊的「无符号类型」（`>=0`）UInt，长度与当前平台的原生字长相同

::: details
尽量避免使用 UInt，除非必须存储一个与当前平台字长相同的无符号整数。在大多数情况下，建议使用 Int，即使是存储非负值。这样做可以提高代码的通用性，减少不同整数类型间的转换，并符合 Swift 的类型推断机制。
:::

## 浮点数

浮点数是有小数部分的数字，比如 3.14159、0.1 和 -273.15。

浮点类型比整数类型表示的范围更大，可以存储比 Int 类型更大或者更小的数字。Swift 提供了两种有符号浮点数类型：
- Double 表示64位浮点数。当你需要存储很大或者很高精度的浮点数时请使用此类型。
- Float 表示32位浮点数。精度要求不高的话可以使用此类型。

::: info
Double 精确度很高，至少有 15 位小数，而 Float 只有 6 位小数。选择哪个类型取决于你的代码需要处理的值的范围，在两种类型都匹配的情况下，将优先选择 Double。
:::


## 类型安全和类型推断

Swift 是一个「类型安全」的语言。它会在编译你的代码时进行「类型检查」并把不匹配的类型标记为错误。这可以让你在开发的时候尽早发现并修复错误。

如果没有显示的指定类型，Swift 会通过「类型推断」来选择合适的类型，原理是依据你的「赋值」。

例如，如果你给一个新常量赋值 42 并且没有标明类型，Swift 可以推断出常量类型是 Int ，因为你给它赋的初始值看起来像一个整数：

```swift
let meaningOfLife = 42
// meaningOfLife 会被推测为 Int 类型
```

同理，如果你没有给浮点字面量标明类型，Swift 会推断你想要的是 Double，而且总是会选择 Double 而不是 Float。

```swift
let pi = 3.14159
// pi 会被推测为 Double 类型
```

如果表达式中同时出现了整数和浮点数，会被推断为 Double 类型：

```swift
let anotherPi = 3 + 0.14159
// anotherPi 会被推测为 Double 类型
```

## 数值型字面量

::: tip

| 类型   |  前缀  |        示例 |
|------|:----:|----------:|
| 十进制  |  无   |      `17` |
| 二进制  | `0b` | `0b10001` |
| 八进制  | `0o` |    `0o21` |
| 十六进制 | `0x` |    `0x11` |


- 浮点字面量主要以十进制或者是十六进制表达。
- 小数点两边必须有至少一个十进制数字（或者是十六进制的数字）。
- 十进制浮点数也可以有一个可选的指数（exponent)，通过大写或者小写的 e 来指定；
- 十六进制浮点数必须有一个指数，通过大写或者小写的 p 来指定。

:::


如果一个十进制数的指数为 $e$，那这个数相当于基数和 $10^e$ 的乘积：

- `1.25e2`表示 $1.25 \times 10^2$ ，等于`125.0`。
- `1.25e-2`表示 $1.25 \times 10^{-2}$，等于`0.0125`。

如果一个十六进制数的指数为 $e$，那这个数相当于基数和$2^e$ 的乘积：

- `0xFp2` 表示 $15 \times 2^2$，等于 `60.0`。
- `0xFp-2` 表示 $15 \times 2^{-2}$，等于 `3.75`。

下面的这些浮点字面量都等于十进制的 12.1875：

```swift
let decimalDouble = 12.1875
let exponentDouble = 1.21875e1
let hexadecimalDouble = 0xC.3p0
```

::: details
在 Swift 中，这三种不同的浮点字面量表示方式都等于十进制数 12.1875，原因如下：

1. **十进制双精度浮点数**（`let decimalDouble = 12.1875`）：
    - 这是该数字的标准十进制（基数10）表示方式，直接按照数值显示：12.1875。

2. **指数双精度浮点数**（`let exponentDouble = 1.21875e1`）：
    - 这种表示方式使用了科学记数法，这在编程中常用于高效处理非常大或非常小的数字。`e1` 表示前面的数字需要乘以 10 的 1 次方。
    - 因此，`1.21875e1` 转换为 $(1.21875 \times 10^1 = 12.1875)$。

3. **十六进制双精度浮点数**（`let hexadecimalDouble = 0xC.3p0`）：
    - 这是十六进制（基数16）表示方式，也是在编程中表达二进制数据的一种紧凑方式。`0xC.3` 对应于十六进制中的 C.3，其中 C 在十六进制中为 12，在十进制中为 12，而 3 是 $(3/16)$。
    - `p0` 部分表示该数字需要乘以 2 的 0 次方（即 1）。因此，`0xC.3p0` 在转换为十进制时也等于 12.1875。


:::

数值类字面量可以包括额外的格式来增强可读性。整数和浮点数都可以添加额外的零并且包含下划线，并不会影响字面量：

```swift
let paddedDouble = 000123.456
let oneMillion = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```


## 数值型类型转换

不同整数类型的变量和常量可以存储不同范围的数字。Int8 类型的常量或者变量可以存储的数字范围是 `-128-127`，而 UInt8 类型的常量或者变量能存储的数字范围是`0-255`。如果数字超出了常量或者变量可存储的范围，编译的时候会报错：

```swift
let cannotBeNegative: UInt8 = -1 // [!code error]
// UInt8 类型不能存储负数，所以会报错
let tooBig: Int8 = Int8.max + 1 // [!code error]
// Int8 类型不能存储超过最大值的数，所以会报错

```

要将一个数字从一种类型转换为另一种类型，你需要用这个数字作为输入，来创建一个新的目标类型实例。


![UInt16Doc](../images/UInt16Doc.png)


这意味着你要使用目标类型（UInt16）的构造函数，并将当前的数值（UInt8）传递给它。这样，你就生成了一个「新」的数值，其类型与你希望进行操作的类型相「匹配」。这一步骤是必需的，因为不同的数字类型不能直接进行计算或比较。


```swift
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

在上面的例子里，`twoThousand`是 UInt16 类型的，而`one`是 UInt8 类型的。由于它们的类型不同，不能直接进行相加。因此，你需要先用 UInt16(one) 将`one`转换为 UInt16 类型，这样就创建了一个新的 UInt16 实例。使用这个转换后的值，你就可以与`twoThousand`进行加法操作了。这种类型转换确保了数据类型的一致性，从而可以安全地进行数学运算。


## 整数和浮点数转换

整数和浮点数的转换必须显式指定类型，如下例整数被强转为浮点数：

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine // [!code focus]
// pi 等于 3.14159，所以被推测为 Double 类型
```

这个例子中，常量`three`的值被转换为 Double 类型，加号两边的数**类型须相同**。如果不进行转换，两者无法相加。

浮点数转换为整数会丢失浮点数，如下例：

```swift
let integerPi = Int(pi)
// integerPi 等于 3
```

::: info
在 Swift 中，数字字面量（如3和0.14159）可以直接相加，因为字面量本身不具有固定的类型。这些字面量的具体类型将根据它们用途的上下文在编译时确定。这意味着你可以将整数和浮点数字面量直接组合在一起进行计算，而不需要显式地指定类型。编译器会自动推断出最合适的类型来处理这些字面量的计算。相反，当你使用具体类型的变量和常量进行操作时，你必须确保它们的类型兼容或进行必要的类型转换，因为每个变量和常量从一开始就有一个明确的类型定义。

:::


## 类型别名

在 Swift 中，类型别名允许你为现有类型定义一个新名字，可以通过`typealias`关键字实现。类型别名非常适用于那些想要为某个数据类型提供「更清晰」、「具体含义」的名称的情况。

```swift
typealias AudioSample = UInt16
```

一旦定义了类型别名，就可以在代码中替代原有类型来使用这个新名字：

```swift
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound 现在是 0
```

本例中，`AudioSample`被定义为 UInt16 的一个别名。因为它是别名，`AudioSample.min`实际上是 UInt16.min，所以会给 `maxAmplitudeFound`赋一个初值 0。