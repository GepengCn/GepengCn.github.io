# 泛型

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/6BkYCfr7vaqctXSTEW5qvd"></iframe>


泛型代码让你能根据自定义的需求，编写出适用于任意类型的、灵活可复用的函数及类型。你可避免编写重复的代码，而是用一种清晰抽象的方式来表达代码的意图。


::: info
泛型是 Swift 最强大的特性之一，很多 Swift 标准库是基于泛型代码构建的。

实际上，即使你没有意识到，你也一直在语言指南中使用泛型。

例如，Swift 的 `Array` 和 `Dictionary` 都是泛型集合。

你可以创建一个 `Int` 类型数组，也可创建一个 `String` 类型数组，甚至可以是任意其他 Swift 类型的数组。

同样，你也可以创建一个存储任意指定类型的字典，并对该类型没有限制。
:::


## 泛型解决的问题


示例：
假设你需要交换两个整数的值，你可能会写如下函数：

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```
但如果要交换两个字符串或者两个双精度值，你需要写更多类似的函数。使用泛型，你只需编写一次函数：

```swift
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

这里的 `<T>` 表示任何类型，你可以用这个函数来交换任意类型的值。

在泛型函数中，尖括号内的 `T` 就是一个类型参数，它代表一个占位类型，具体类型在调用函数时确定。

## 泛型类型


::: tip 类型参数

上面 `swapTwoValues(_:_:)` 例子中，占位类型 `T` 是一个类型参数的例子，类型参数**指定并命名一个占位类型，并且紧随在函数名后面，使用一对尖括号括起来**（例如 `<T>` ）。

一旦一个类型参数被指定，你可以用它来定义一个函数的参数类型（例如 `swapTwoValues(_:_:)` 函数中的参数 `a` 和 `b` ），或者作为函数的返回类型，还可以用作函数主体中的注释类型。

在这些情况下，类型参数会在**函数调用时被实际类型所替换**。（在上面的 `swapTwoValues(_:_:)` 例子中，当函数第一次被调用时，`T` 被 `Int` 替换，第二次调用时，被 `String` 替换。）

你可提供多个类型参数，将它们都写在尖括号 `<>` 中，用逗号 `,` 分开。
:::

一个常见的泛型类型是数组和字典，这两者都可以容纳任意类型的数据。

Swift 允许你定义自己的泛型类型，如下例我们定义一个「栈」：

示例：
```swift
struct Stack<Element> {
    var items = [Element]()
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
}
```
这里定义了一个泛型栈 `Stack`，`Element` 是这个栈中存储数据的类型（可以是任何类型）。

::: tip 命名类型参数
大多情况下，类型参数具有描述下的名称，例如字典 `Dictionary<Key, Value>` 中的 `Key` 和 `Value` 及数组 `Stack<Element>` 中的 `Element`，这能告诉阅读代码的人这些参数类型与泛型类型或函数之间的关系。

然而，当它们之间没有有意义的关系时，通常使用单个字符来表示，例如 `T`、`U`、`V`，例如上面演示函数 `swapTwoValues(_:_:)` 中的 `T`。


请始终使用大写字母开头的驼峰命名法（例如 `T` 和 `MyTypeParameter` ）来为类型参数命名，以表明它们是占位类型，而不是一个值。
:::

## 泛型扩展

当对泛型类型进行扩展时，你并**不需要提供「类型参数」列表作为定义的一部分**。

「原始类型」定义中声明的「类型参数」列表在「扩展中」可以「直接使用」，并且这些来自原始类型中的参数名称会被用作原始定义中类型参数的引用。

示例：
```swift
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}
```

::: warning 注意
这个扩展并没有定义类型参数列表。

相反的，`Stack` 类型已有的类型参数名称 `Element`，被用在扩展中来表示计算型属性 `topItem` 的可选类型。

:::

这个扩展为 `Stack` 添加了一个新的计算属性 `topItem`，用于获取栈顶元素而不移除它。

## 类型约束

类型约束指定类型参数必须继承自指定类、遵循特定的协议或协议组合。

::: info 可哈希的

例如，Swift 的 `Dictionary` 类型对字典的键的类型做了些限制。

在「字典的描述」中，字典键的类型必须是可哈希（ `hashable` ）的。

也就是说，必须有一种方法能够唯一地表示它。

字典键之所以要是可哈希的，是为了便于检查字典中是否已经包含某个特定键的值。

若没有这个要求，字典将无法判断是否可以插入或替换某个指定键的值，也不能查找到已经存储在字典中的指定键的值。
:::


### 类型约束语法

在一个类型参数 （ `比如 T ` ）名后面放置一个类名或者协议名 （ `比如 Equatable` ），并用冒号 `:` 进行分隔，来定义类型约束。

下面将展示泛型函数约束的基本语法（与泛型类型的语法相同）：

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // 这里是泛型函数的函数体部分
}
```

上面这个函数有两个类型参数。

- 第一个类型参数 `T` 必须是 `SomeClass` 子类；
- 第二个类型参数 `U` 必须符合 `SomeProtocol` 协议。

示例：

```swift
func findIndex<T: Equatable>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```
这个函数 `findIndex` 要求类型 `T` 必须遵循 `Equatable` 协议，这样才能使用 `==` 运算符来比较是否相等。

## 关联类型

关联类型为协议中的某个类型提供了一个占位符名称，其代表的实际类型在协议被遵循时才会被指定。

关联类型通过 `associatedtype` 关键字来指定。

示例：
```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```
这个 `Container` 协议定义了一个关联类型 `Item`，用于指定容器中存储的数据类型。


```swift{12}
struct IntStack: Container {
    // IntStack 的原始实现部分
    var items: [Int] = []
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }

    // Container 协议的实现部分
    typealias Item = Int // 声明 Item 为 Int

    mutating func append(_ item: Int) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Int {
        return items[i]
    }
}
```


由于 Swift 的类型推断，实际上在 `IntStack` 的定义中不需要声明 `Item` 为 `Int`。

因为 `IntStack` 符合 `Container` 协议的所有要求，Swift 只需通过 `append(_:)` 方法的 `item` 参数类型和下标返回值的类型，就可以推断出 `Item` 的具体类型。


### 给关联类型添加约束

你可以在协议里给关联类型添加约束来要求遵循的类型满足约束。

例如，下面的代码定义了 `Container` 协议， 要求关联类型 `Item` 必须遵循 `Equatable` 协议：

```swift{2}
protocol Container {
    associatedtype Item: Equatable
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```
要遵守 `Container` 协议，`Item` 类型也必须遵守 `Equatable` 协议。

### 在关联类型约束里使用协议

协议可以作为它自身的要求出现。

例如，有一个协议细化了 `Container` 协议，添加了一个 `suffix(_:)` 方法。

`suffix(_:)` 方法返回容器中从后往前给定数量的元素，并把它们存储在一个 `Suffix` 类型的实例里。

```swift{2}
protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
}
```

在这个协议里，`Suffix` 是一个关联类型，就像上边例子中 `Container` 的 `Item` 类型一样。

`Suffix` 拥有两个约束：它必须遵循 `SuffixableContainer` 协议（就是当前定义的协议），以及它的 `Item` 类型必须是和容器里的 `Item` 类型相同。


## 泛型 Where 语句

「类型约束」让你能够为泛型函数、下标、类型的类型参数定义一些强制要求。

::: tip 对关联类型添加约束可以通过定义一个泛型 `where` 子句来实现

- 通过泛型 `where` 子句让关联类型遵从某个特定的协议，以及某个特定的类型参数和关联类型必须类型相同。
- 你可以通过将 `where` 关键字紧跟在类型参数列表后面来定义 `where` 子句，`where` 子句后跟一个或者多个针对关联类型的约束，以及一个或多个类型参数和关联类型间的相等关系。
- 你可以在函数体或者类型的大括号 `{}` 之前添加 `where` 子句。
:::

下面的例子定义了一个名为 `allItemsMatch` 的泛型函数，用来检查两个 `Container` 实例是否包含相同顺序的相同元素。

- 如果所有的元素能够匹配，那么返回 `true`，否则返回 `false`。
- 被检查的两个 `Container` 可以不是相同类型的容器（虽然它们可以相同），但它们必须拥有相同类型的元素。
- 这个要求通过一个类型约束以及一个 `where` 子句来表示：

```swift
func allItemsMatch<C1: Container, C2: Container>
    (_ someContainer: C1, _ anotherContainer: C2) -> Bool
    where C1.Item == C2.Item, C1.Item: Equatable {

        // 检查两个容器含有相同数量的元素
        if someContainer.count != anotherContainer.count {
            return false
        }

        // 检查每一对元素是否相等
        for i in 0..<someContainer.count {
            if someContainer[i] != anotherContainer[i] {
                return false
            }
        }

        // 所有元素都匹配，返回 true
        return true
}
```
::: info 对两个类型参数的要求
- `C1` 必须符合 `Container` 协议（写作 `C1: Container` ）。
- `C2` 必须符合 `Container` 协议（写作 `C2: Container` ）。
- `C1` 的 `Item` 必须和 `C2` 的 `Item` 类型相同（写作 `C1.Item == C2.Item` ）。
- `C1` 的 `Item` 必须符合 `Equatable` 协议（写作 `C1.Item: Equatable` ）。
- 第三个和第四个要求结合起来意味着 `anotherContainer` 中的元素也可以通过 `!=` 操作符来比较，因为它们和 `someContainer` 中的元素类型相同。
:::

## 具有泛型 Where 子句的扩展

你也可以使用泛型 `where` 子句作为扩展的一部分。

基于以前的例子，下面的示例扩展了泛型 `Stack` 结构体，添加一个 `isTop(_:)` 方法。


```swift
extension Stack where Element: Equatable {
    func isTop(_ item: Element) -> Bool {
        guard let topItem = items.last else {
            return false
        }
        return topItem == item
    }
}
```
这个新的 `isTop(_:)` 方法首先检查这个栈是不是空的，然后比较给定的元素与栈顶部的元素。

::: danger 不用泛型 `where` 子句

如果你尝试不用泛型 `where` 子句，会有一个问题：在 `isTop(_:)` 里面使用了 `==` 运算符，但是 `Stack`  的定义没有要求它的元素是符合 `Equatable` 协议的，所以使用 `==` 运算符导致编译时错误。

使用泛型 `where` 子句可以为扩展添加新的条件，因此只有当栈中的元素符合 `Equatable` 协议时，扩展才会添加 `isTop(_:)` 方法。

:::

同样的，我们可以扩展一个泛型协议 `Container`，添加一个方法 `startsWith(_:)` 来检查容器的第一个元素是否与给定的元素相等。这也需要元素类型遵守 `Equatable` 协议：

```swift
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        return count >= 1 && self[0] == item
    }
}
```
这个方法首先检查容器是否至少有一个元素，然后比较第一个元素与给定的元素。

::: warning
只有当容器的元素类型符合 `Equatable` 协议时，这个方法才可用。
:::
我们还可以限定泛型 `where` 子句中的类型必须是特定的类型。

例如，我们可以为存储 `Double` 类型的容器添加一个计算平均值的方法：

```swift
extension Container where Item == Double {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += self[index]
        }
        return sum / Double(count)
    }
}
```
这个 `average()` 方法计算容器中所有 `Double` 类型元素的平均值。

它只在容器的元素类型是 `Double` 时可用。

### 多条件的泛型 where 子句

在扩展或其他泛型定义中，你可以在一个泛型 `where` 子句中包含多个条件，用逗号 `,` 分隔。



假设我们想要为所有的元素类型既是 `Equatable` 又是 `Comparable` 的 `Container` 添加一个 `sortedElements` 方法，这个方法将返回容器内元素的排序数组。

这就需要使用多条件的 `where` 子句：

```swift
extension Container where Item: Equatable, Item: Comparable {
    func sortedElements() -> [Item] {
        return items.sorted()
    }
}
```

在这个扩展中，我们使用了两个条件：`Item: Equatable` 和 `Item: Comparable`。

::: info
这意味着只有当容器的元素类型同时满足这两个协议时，`sortedElements` 方法才会被添加到该容器类型中。
:::
接下来，创建一个符合 `Container` 的具体类型，并使用这个扩展：

```swift
struct NumberContainer: Container {
    var items: [Int] = []
    
    mutating func append(_ item: Int) {
        items.append(item)
    }
    
    var count: Int {
        return items.count
    }
    
    subscript(index: Int) -> Int {
        return items[index]
    }
}

var myContainer = NumberContainer()
myContainer.append(5)
myContainer.append(3)
myContainer.append(9)
let sortedItems = myContainer.sortedElements() // [3, 5, 9]
```

在这个例子中，`NumberContainer` 是一个具体的容器类型，存储 `Int` 类型的数据。

由于 `Int` 类型既遵守 `Equatable` 又遵守 `Comparable`，`sortedElements()` 方法可以正常工作，返回一个排序后的数组。


## 包含上下文关系的 where 分句

`where` 分句可以让你在相同的扩展块中实现多个功能，每个功能都有自己的类型约束。

首先，考虑一个泛型协议 `Container`，我们想为不同的 `Item` 类型提供不同的方法。

::: info
通过在**方法级别**使用 `where` 分句，我们可以在同一个扩展中为不同的条件添加多个方法。
:::

假设有如下的泛型协议 `Container`：

```swift
protocol Container {
    associatedtype Item
    var items: [Item] { get }
    var count: Int { get }
    subscript(index: Int) -> Item { get }
}
```

我们希望为这个协议的不同实现添加两个方法：`average()` 和 `endsWith(_:)`，分别用于计算平均值和检查容器是否以某个元素结束。

```swift
extension Container {
    func average() -> Double where Item == Int {
        var sum = 0.0
        for item in items {
            sum += Double(item)
        }
        return sum / Double(count)
    }

    func endsWith(_ item: Item) -> Bool where Item: Equatable {
        return count >= 1 && self[count - 1] == item
    }
}
```

在这个扩展中：
- `average()` 方法通过 `where Item == Int` 确保只有在容器的元素类型为 `Int` 时才可用。该方法遍历所有元素，计算它们的总和，并返回平均值。
- `endsWith(_:)` 方法通过 `where Item: Equatable` 确保只有在元素可以进行等值比较时才可用。它检查容器是否至少包含一个元素，并比较最后一个元素是否等于传入的参数。

### 对比使用多个扩展

如果不使用方法级的 `where` 分句，我们需要为每种类型约束写一个单独的扩展，如下：

```swift
extension Container where Item == Int {
    func average() -> Double {
        var sum = 0.0
        for item in items {
            sum += Double(item)
        }
        return sum / Double(count)
    }
}

extension Container where Item: Equatable {
    func endsWith(_ item: Item) -> Bool {
        return count >= 1 && self[count - 1] == item
    }
}
```

这种方式虽然能达到相同的效果，但每个扩展只针对一种类型约束，这在某些情况下可能导致代码重复和分散，尤其是当多个方法可以共享相同的基础逻辑时。


## 具有泛型 Where 子句的关联类型

::: tip 泛型 `where` 子句不仅可以用于约束泛型类型和方法，还可以用于定义和约束关联类型。

这种用法特别适用于创建灵活且强类型的协议，例如定义迭代器或确保协议的关联类型遵守特定的协议。
:::
想象一下，我们需要定义一个容器协议，它不仅需要存储元素，还需要能通过迭代器遍历这些元素。

这可以通过关联类型和 `where` 子句来实现，以确保迭代器的元素类型与容器中存储的元素类型一致。

```swift{2,7}
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }

    associatedtype Iterator: IteratorProtocol where Iterator.Element == Item
    func makeIterator() -> Iterator
}
```

在这个 `Container` 协议中，我们定义了两个关联类型：
- `Item`：代表容器中的元素类型。
- `Iterator`：遵守 `IteratorProtocol` 的类型，并且该迭代器的元素类型必须与容器中的元素类型 `Item` 相同。

有时我们可能需要容器中的元素不仅是任意类型，还需要具备可比较性。

例如，当我们希望在容器内部进行排序或查找操作时。这可以通过扩展一个现有的泛型协议并添加类型约束来实现。

```swift
protocol ComparableContainer: Container where Item: Comparable { }
```

这里，`ComparableContainer` 协议继承自 `Container` 协议，并添加了一个额外的约束：关联类型 `Item` 必须遵守 `Comparable` 协议。这样的设计使得任何遵守 `ComparableContainer` 协议的类型都必须存储可以进行比较操作的元素，这在实现某些特定算法时非常有用。


## 泛型下标

假设我们有一个泛型协议 `Container`，它定义了一个容器可以存储和访问元素的基本方式。

现在，我们想要扩展这个协议，添加一个新的下标方法，这个下标可以接收一系列索引，并返回对应索引位置的元素数组。

```swift
extension Container {
    subscript<Indices: Sequence>(indices: Indices) -> [Item]
        where Indices.Iterator.Element == Int {
            var result: [Item] = []
            for index in indices {
                result.append(self[index])
            }
            return result
    }
}
```

在这个示例中，我们定义了一个泛型下标，它使用了以下几点关键的泛型和约束：

- 在尖括号 `<>` 中的泛型参数 `Indices`，必须是符合标准库中的 `Sequence` 协议的类型。
- 下标使用的单一的参数，`indices`，必须是 `Indices` 的实例。
- 泛型 `where` 子句要求 `Sequence`（ `Indices` ）的迭代器，其所有的元素都是 `Int` 类型。这样就能确保在序列（ `Sequence` ）中的索引和容器（ `Container` ）里面的索引类型是一致的。


例如，如果你有一个整数数组，并想快速获取索引为 $1$, $3$, $5$ 的元素，你可以这样做：

```swift
let numbers: [Int] = [10, 20, 30, 40, 50, 60]
let indices = [1, 3, 5]
let selectedNumbers = numbers[indices]  // 返回 [20, 40, 60]
```

