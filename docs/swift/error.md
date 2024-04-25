# 错误处理

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/CdjVtnYjSRYbaMk6538Kgp"></iframe>

错误处理（`Error handling`） 是响应错误以及从错误中恢复的过程。Swift 在运行时提供了抛出、捕获、传递和操作可恢复错误（`recoverable errors`）的一等支持（`first-class support`）。

在编程中，并非所有操作都能保证完美执行或产生有用的结果。可选类型通常用于表示缺失的值。然而，当操作失败时，了解失败的原因对于编写能够适应并解决问题的代码非常重要。

例如，考虑一个任务，该任务需要从磁盘上读取并处理文件中的数据。这个过程可能因多种原因失败，例如文件不存在于指定的路径、文件没有读取权限，或者文件的编码格式不兼容。通过区分这些不同的失败情况，程序可以处理并解决某些错误，对于无法解决的错误则报告给用户。


## 表示与抛出错误

在 Swift 中，错误通过实现`Error`协议的类型来表示。这是一个空协议，它标志着任何遵循这一协议的类型都可以用于错误处理。

枚举类型特别适合用来定义一组相关的错误状态。利用枚举的关联值，还可以为每种错误状态提供额外的信息，使错误描述更为详细和具体。例如，在游戏中操作自动贩卖机时，你可以这样表示可能会出现的错误状态：

```swift
enum VendingMachineError: Error {
    case invalidSelection                     //选择无效
    case insufficientFunds(coinsNeeded: Int) //金额不足
    case outOfStock                             //缺货
}
```

抛出一个错误可以让你表明有意外情况发生，导致正常的执行流程无法继续执行。抛出错误使用`throw`语句。例如，下面的代码抛出一个错误，提示贩卖机还需要`5个硬币：

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

## 处理错误

某个错误被抛出时，附近的某部分代码必须负责处理这个错误，例如纠正这个问题、尝试另外一种方式、或是向用户报告错误。

Swift 中有`4`种处理错误的方式。你可以把函数抛出的错误传递给调用此函数的代码、用`do-catch`语句处理错误、将错误作为可选类型处理、或者断言此错误根本不会发生。

当一个函数抛出一个错误时，你的程序流程会发生改变，所以重要的是你能迅速识别代码中会抛出错误的地方。为了标识出这些地方，在调用一个能抛出错误的函数、方法或者构造器之前，加上`try`关键字，或者`try?`或`try!`这种变体。

::: warning 注意
在许多其他语言中，当一个异常被抛出时，系统会回溯调用栈直至找到相应的异常处理代码，这个过程涉及到栈解除（unwinding），可能会产生较大的性能开销。而在 Swift 中，`throw`行为更接近于一个返回操作，不会引发栈解除，这使得其性能相比传统异常处理更优。
:::

### 用 throwing 函数传递错误

为了表示一个函数、方法或构造器可以抛出错误，在函数声明的参数之后加上`throws`关键字。一个标有`throws`关键字的函数被称作`throwing`函数。如果这个函数指明了返回值类型，`throws`关键词需要写在返回箭头（`->`）的前面。

```swift
func canThrowErrors() throws -> String

func cannotThrowErrors() -> String
```

一个`throwing`函数可以在其内部抛出错误，并将错误传递到函数被调用时的作用域。

::: warning 注意
只有`throwing`函数可以传递错误。任何在某个非`throwing`函数内部抛出的错误只能在函数内部处理。
:::


下面的例子中，`VendingMachine`类有一个`vend(itemNamed:)`方法，如果请求的物品不存在、缺货或者投入金额小于物品价格，该方法就会抛出一个相应的`VendingMachineError`：

```swift
struct Item {
    var price: Int
    var count: Int
}

class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 0

    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection // [!code highlight]
        }

        guard item.count > 0 else {
            throw VendingMachineError.outOfStock // [!code highlight]
        }

        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited) // [!code highlight]
        }

        coinsDeposited -= item.price

        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem

        print("Dispensing \(name)")
    }
}
```

在`vend(itemNamed:)`方法的实现中使用了`guard`语句来确保在购买某个物品所需的条件中有任一条件不满足时，能提前退出方法并抛出相应的错误。由于`throw`语句会立即退出方法，所以物品只有在所有条件都满足时才会被售出。

因为`vend(itemNamed:)`方法是`throwing`函数，所以调用次方法时，必须处理这些错误（使用`do-catch+try`）或者继续向上抛出错误（`try+throwing`），如下例继续抛出错误：

```swift
func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws { // [!code highlight]
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName) // [!code error]
}
```

「构造器」也可以像函数一样通过`throwing`函数传递错误，如下例：

```swift
struct PurchasedSnack {
    let name: String
    init(name: String, vendingMachine: VendingMachine) throws {
        try vendingMachine.vend(itemNamed: name)
        self.name = name
    }
}
```


### 用 Do-Catch 处理错误

你可以使用一个`do-catch`语句运行一段「闭包代码」来处理错误。如果在`do`子句中的代码「抛出」了一个错误，这个错误会与`catch`子句做「匹配」，从而决定哪条子句能处理它。

下面是`do-catch`语句的一般形式：

```swift
do {
    try expression
    statements
} catch pattern 1 {
    statements
} catch pattern 2 where condition {
    statements
} catch pattern 3, pattern 4 where condition {
    statements
} catch {
    statements
}
```

在`catch`后面写一个匹配模式（`pattern`）来表明这个子句能处理什么样的错误。如果一条`catch`子句没有指定匹配模式，那么这条子句可以匹配任何错误，并且把错误绑定到一个名字为`error`的局部常量。

举例来说，下面的代码处理了`VendingMachineError`枚举类型的全部三种情况：

```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
    print("Success! Yum.")
} catch VendingMachineError.invalidSelection { // [!code error]
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock { // [!code error]
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) { // [!code error]
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch { // [!code error]
    print("Unexpected error: \(error).") // [!code warning]
}
// 打印“Insufficient funds. Please insert an additional 2 coins.”
```


- `catch` 子句不必处理 `do` 块中的所有错误。
- 如果 `do-catch` 中没有处理错误，错误会被传递到外层作用域。
- 在不能抛出错误的环境中，必须用 `do-catch` 处理错误；在可以抛出错误的环境中，错误可以内部处理，也可以让调用者处理。
- 如果错误未被任何作用域处理，将导致运行时错误。
-
以下面的代码为例，不是`VendingMachineError`中声明的错误会在调用函数的地方被捕获：

```swift
func nourish(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch is VendingMachineError {
        print("Couldn't buy that from the vending machine.")
    }
}

do {
    try nourish(with: "Beet-Flavored Chips")
} catch { // [!code error]
    print("Unexpected non-vending-machine-related error: \(error)")// [!code error]
}// [!code error]
// 打印“Couldn't buy that from the vending machine.”
```


另一种捕获多个相关错误的方式是将它们放在`catch`后，通过逗号分隔。

```swift
func eat(item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch VendingMachineError.invalidSelection, VendingMachineError.insufficientFunds, VendingMachineError.outOfStock { // [!code error]
        print("Invalid selection, out of stock, or not enough money.")
    }
}
```


### 将错误转换成可选值

你可以使用 `try?` 来简化错误处理，通过将可能抛出的错误转换为一个可选值。如果在计算表达式时抛出错误，结果将变为 `nil`。下面的代码展示了这一点：

```swift
func someThrowingFunction() throws -> Int {
    // ...
}

let x = try? someThrowingFunction()

let y: Int?
do {
    y = try someThrowingFunction()
} catch {
    y = nil
}
```

在这个例子中，如果 `someThrowingFunction()` 抛出错误，`x` 和 `y` 都会是 `nil`。如果没有错误，`x` 和 `y` 则会存储函数的返回值。重要的是，不论 `someThrowingFunction()` 返回什么类型，`x` 和 `y` 都会是相应的可选类型。这里的函数返回 `Int` 类型，所以 `x` 和 `y` 都是 `Int?` 类型。

### 禁用错误传递

当你确信某个可能抛出错误的函数在实际使用时不会发生错误，可以使用 `try!` 来强制执行这个函数，并且不处理错误。这相当于在代码中加入一个断言，表示函数不应该抛出错误。如果函数确实抛出了错误，程序将会因为未捕获的错误而崩溃。

例如，假设有一个 `loadImage(atPath:)` 函数用于从指定路径加载图片。如果你确定路径中的图片是存在且可以被成功加载的（如应用自带的资源），可以安全地使用 `try!`，如下所示：

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

## 指定清理操作

`defer` 语句用于确保在离开当前代码块前，可以执行一些必要的清理操作。无论是因为错误抛出、或是因为如 `return`、`break` 等控制语句导致的退出，都会触发 `defer` 中的代码。

`defer` 的使用非常适合进行如文件关闭或内存释放这样的清理任务。它通过 `defer` 关键字引入，并包含在当前作用域结束前需要执行的代码。这些代码会在退出作用域前按照它们被声明的逆序执行——即先声明的 `defer` 语句最后执行。

例如，下面的函数展示了如何使用 `defer` 语句来确保文件被正确关闭：

```swift
func processFile(filename: String) throws {
    if exists(filename) {
        let file = open(filename)
        defer {
            close(file)
        }
        while let line = try file.readline() {
            // 处理每一行数据
        }
        // 当离开这个作用域时，无论是正常离开还是由于异常，close(file) 都会被调用。
    }
}
```

这样，`defer` 确保无论函数如何退出（正常退出或因异常），`close(file)` 都会被执行，有效避免资源泄漏。