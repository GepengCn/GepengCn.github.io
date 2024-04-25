# 泛型

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/6BkYCfr7vaqctXSTEW5qvd"></iframe>

## 泛型解决的问题

在不使用泛型的情况下，如果你需要处理不同类型的数据，通常需要为每种数据类型编写重复的代码。泛型的引入，可以让你用一种方式处理不同类型的数据。这不仅可以使代码更加简洁，而且增强了代码的可读性和可维护性。

### 示例：
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

一个常见的泛型类型是数组和字典，这两者都可以容纳任意类型的数据。Swift 允许你定义自己的泛型类型，如下例我们定义一个「栈」：

### 示例：
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

## 泛型扩展

你可以扩展泛型类型，增加一些新的功能。

### 示例：
```swift
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}
```
这个扩展为 `Stack` 添加了一个新的计算属性 `topItem`，用于获取栈顶元素而不移除它。

## 类型约束

类型约束可以指定一个类型参数必须继承自特定类或者遵循一个特定的协议。

### 示例：
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

定义一个协议时，声明一个或多个关联类型作为协议定义的一部分将会非常有用。关联类型为协议中的某个类型提供了一个占位符名称，其代表的实际类型在协议被遵循时才会被指定。关联类型通过 associatedtype 关键字来指定。

### 示例：
```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```
这个 `Container` 协议定义了一个关联类型 `Item`，用于指定容器中存储的数据类型。


```swift
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


由于 Swift 的类型推断，实际上在`IntStack`的定义中不需要声明`Item`为`Int`。因为`IntStack`符合`Container`协议的所有要求，Swift 只需通过`append(_:)`方法的`item`参数类型和下标返回值的类型，就可以推断出`Item`的具体类型。

## 泛型 Where 语句

`where` 语句可以定义关联类型的具体条件，比如一个关联类型必须遵循某个协议等。

### 示例：
```swift
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        return count > 0 && self[0] == item
    }
}
```
这个扩展只适用于 `Item` 类型遵循 `Equatable` 的容器。

## 具有泛型 Where 子句的扩展

在 Swift 中，使用泛型 `where` 子句可以在扩展中添加额外的类型条件，让你可以对特定的类型添加特定的方法。这样做可以确保你的方法或属性只在符合特定条件的类型上可用，从而提供更安全、更专业的功能。

假设我们有一个泛型栈结构体 `Stack<Element>`，我们想给它添加一个新方法 `isTop(_:)`，这个方法用于检查栈顶元素是否等于给定的元素。为了使用等号运算符（`==`），元素类型必须遵守 `Equatable` 协议。这就是我们需要泛型 `where` 子句的地方：

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
这段代码中，`where Element: Equatable` 确保了这个扩展中的 `isTop(_:)` 方法只适用于元素类型遵守 `Equatable` 协议的栈。如果尝试在不遵守 `Equatable` 协议的元素类型的栈上使用此方法，将导致编译时错误。

同样的，我们可以扩展一个泛型协议 `Container`，添加一个方法 `startsWith(_:)` 来检查容器的第一个元素是否与给定的元素相等。这也需要元素类型遵守 `Equatable` 协议：

```swift
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        return count >= 1 && self[0] == item
    }
}
```
这个方法首先检查容器是否至少有一个元素，然后比较第一个元素与给定的元素。只有当容器的元素类型符合 `Equatable` 协议时，这个方法才可用。

我们还可以限定泛型 `where` 子句中的类型必须是特定的类型。例如，我们可以为存储 `Double` 类型的容器添加一个计算平均值的方法：

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
这个 `average()` 方法计算容器中所有 `Double` 类型元素的平均值。它只在容器的元素类型是 `Double` 时可用。

### 多条件的泛型 where 子句

在扩展或其他泛型定义中，你可以在一个泛型 `where` 子句中包含多个条件，用逗号分隔。这可以让你精确地控制扩展的应用场景，确保代码的安全性和高效性。


::: details 示例

假设你有一个泛型 `Container` 协议，你希望扩展这个协议，添加一个方法，该方法只适用于元素类型既遵循 `Equatable` 协议，又遵循 `Comparable` 协议的容器：

### 示例代码

首先，定义一个泛型 `Container` 协议，它具有一个关联类型 `Item`：

```swift
protocol Container {
    associatedtype Item
    var items: [Item] { get set }
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(index: Int) -> Item { get }
}
```

现在，假设我们想要为所有的元素类型既是 `Equatable` 又是 `Comparable` 的 `Container` 添加一个 `sortedElements` 方法，这个方法将返回容器内元素的排序数组。这就需要使用多条件的 `where` 子句：

```swift
extension Container where Item: Equatable, Item: Comparable {
    func sortedElements() -> [Item] {
        return items.sorted()
    }
}
```

在这个扩展中，我们使用了两个条件：`Item: Equatable` 和 `Item: Comparable`。这意味着只有当容器的元素类型同时满足这两个协议时，`sortedElements` 方法才会被添加到该容器类型中。

### 使用示例

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

在这个例子中，`NumberContainer` 是一个具体的容器类型，存储 `Int` 类型的数据。由于 `Int` 类型既遵守 `Equatable` 又遵守 `Comparable`，`sortedElements()` 方法可以正常工作，返回一个排序后的数组。

:::

## 包含上下文关系的 where 分句

`where` 分句可以让你在相同的扩展块中实现多个功能，每个功能都有自己的类型约束。

### 示例解析

首先，考虑一个泛型协议 `Container`，我们想为不同的 `Item` 类型提供不同的方法。通过在方法级别使用 `where` 分句，我们可以在同一个扩展中为不同的条件添加多个方法。

#### 示例代码

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

::: info 总结
通过在方法级别使用 `where` 分句，我们可以将相关的方法放在同一个扩展中，即使它们有不同的类型约束。这使得代码更加集中和一致，也便于维护和阅读。使用这种方式，你可以根据实际需求灵活地设计泛型接口和实现，确保只有在满足特定条件时，某些功能才可用，从而增加代码的安全性和健壁性。

:::


## 具有泛型 Where 子句的关联类型

在 Swift 中，泛型 `where` 子句不仅可以用于约束泛型类型和方法，还可以用于定义和约束关联类型。这种用法特别适用于创建灵活且强类型的协议，例如定义迭代器或确保协议的关联类型遵守特定的协议。

想象一下，我们需要定义一个容器协议，它不仅需要存储元素，还需要能通过迭代器遍历这些元素。这可以通过关联类型和 `where` 子句来实现，以确保迭代器的元素类型与容器中存储的元素类型一致。

```swift
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

`makeIterator()` 方法提供了一种方式，让外部代码可以获取到容器的迭代器，从而遍历容器中的所有元素。

有时我们可能需要容器中的元素不仅是任意类型，还需要具备可比较性，例如，当我们希望在容器内部进行排序或查找操作时。这可以通过扩展一个现有的泛型协议并添加类型约束来实现。

```swift
protocol ComparableContainer: Container where Item: Comparable { }
```

这里，`ComparableContainer` 协议继承自 `Container` 协议，并添加了一个额外的约束：关联类型 `Item` 必须遵守 `Comparable` 协议。这样的设计使得任何遵守 `ComparableContainer` 协议的类型都必须存储可以进行比较操作的元素，这在实现某些特定算法时非常有用。


## 泛型下标

泛型下标是 Swift 中的一个高级特性，允许你为下标操作提供灵活的类型约束。这种功能特别适合于那些需要处理集合或序列的情况。下面，我将通过一个实用的例子来详细解释如何在扩展中定义泛型下标，并使用 `where` 子句来添加额外的类型约束。

假设我们有一个泛型协议 `Container`，它定义了一个容器可以存储和访问元素的基本方式。现在，我们想要扩展这个协议，添加一个新的下标方法，这个下标可以接收一系列索引，并返回对应索引位置的元素数组。

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

1. **泛型参数**：
- `Indices`：这是一个泛型参数，用在尖括号 `< >` 中。它必须是符合 `Sequence` 协议的任何类型。

    ::: tip Sequence
    `Sequence` 是 Swift 标准库中的一个协议，用于定义那些可以按顺序访问其元素的类型。
    :::

2. **参数类型**：
- `indices`：这是下标的参数，它的类型是 `Indices`。即，你可以传递任何符合 `Sequence` 协议的实例作为这个下标的输入。

3. **泛型 where 子句**：
- `where Indices.Iterator.Element == Int`：这个 `where` 子句进一步约束了 `Indices` 类型。它指定了 `Indices` 的迭代器（即 `Iterator`）的元素类型必须是 `Int`。这是必需的，因为我们使用这些整数作为索引来访问容器中的元素。


这种泛型下标非常有用，特别是当你需要从容器中获取一组特定索引位置的元素时。例如，如果你有一个整数数组，并想快速获取索引为 1, 3, 5 的元素，你可以这样做：

```swift
let numbers: [Int] = [10, 20, 30, 40, 50, 60]
let indices = [1, 3, 5]
let selectedNumbers = numbers[indices]  // 返回 [20, 40, 60]
```

