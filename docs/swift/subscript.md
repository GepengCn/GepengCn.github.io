# 下标

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/UvvVBe7GN7MWgk3XxtNQkY"></iframe>

下标（ `subscripts` ）是一种访问集合、列表或序列中元素的**快捷方式**，它可以用来设置和检索值，无需调用显式的方法。

例如，当你使用数组（ `Array` ）或字典（ `Dictionary` ）时，可以用下标来获取或设置其中的元素。

这里有一个简单的例子：

```swift
var numbers = [10, 20, 30, 40, 50]
let firstNumber = numbers[0]  // 使用下标获取第一个元素，输出为10
numbers[1] = 25               // 使用下标修改数组中的第二个元素
```

在字典中，下标同样适用：

```swift
var capitals = ["France": "Paris", "Italy": "Rome"]
let capitalOfFrance = capitals["France"]  // 使用下标访问字典，输出为"Paris"
capitals["Italy"] = "Venice"              // 修改意大利的首都为"Venice"
```

## 自定义下标

你也可以在自定义类型中实现下标。

这是通过在类的定义中添加 `subscript` 方法来实现的，你可以定义下标的获取（ `get` ）和设置（ `set` ）行为。

假设我们有一个简单的数据结构来表示一个星期的每一天：

```swift
struct Weekdays {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    subscript(index: Int) -> String {
        get {
            return days[index] // 返回指定索引的日子
        }
        set(newValue) {
            days[index] = newValue // 设置新的值到指定的索引位置
        }
    }
}

var week = Weekdays()
print(week[2]) // 输出 "Tuesday"
week[2] = "Holiday"
print(week[2]) // 输出 "Holiday"
```

在这个例子中，我们为 `Weekdays` 结构定义了一个下标，它允许我们通过索引来访问或修改星期中的某一天。


## 多参数下标

你可以定义接受多个参数的下标，这可以通过在下标定义时列出多个参数来实现。

例如，如果你有一个二维数据结构（矩阵），你可以使用行和列两个参数来访问数据：

```swift
struct Matrix {
    var data: [[Int]]
    
    subscript(row: Int, column: Int) -> Int {
        get {
            return data[row][column]
        }
        set(newValue) {
            data[row][column] = newValue
        }
    }
}

var matrix = Matrix(data: [[1, 2], [3, 4]])
print(matrix[0, 1])  // 输出 2
matrix[0, 1] = 5
print(matrix[0, 1])  // 输出 5
```

## 类下标

Swift 允许定义**类下标**，即 `static subscript`，这意味着下标操作不是在实例上执行，而是在类级别上执行。

这通常用于设计需要通过类本身而非特定实例来访问数据的场景：

```swift
enum Environment {
    static var settings: [String: String] = ["Mode": "Production", "Version": "1.0"]

    static subscript(key: String) -> String? {
        get {
            return settings[key]
        }
        set(newValue) {
            settings[key] = newValue
        }
    }
}

print(Environment["Mode"] ?? "Unknown")  // 输出 "Production"
Environment["Mode"] = "Development"
print(Environment["Mode"] ?? "Unknown")  // 输出 "Development"
```

## 只读下标

有时候你可能需要一个下标只用于获取值，而不允许通过它设置新值。

这种下标称为只读下标，它只实现了 `get` 方法：

```swift
struct Fibonacci {
    var numbers: [Int] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

    subscript(index: Int) -> Int {
        return numbers[index]
    }
}

let fibonacci = Fibonacci()
print(fibonacci[7])  // 输出 13
```

