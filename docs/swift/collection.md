# 集合类型

Swift 语言提供了三种基本的集合类型来存储数据集：数组（Array）、集合（Set）和字典（Dictionary）。数组用于存储有序的数据集合，集合用于存储一个无序且不包含重复元素的数据集，而字典则存储无序的键值对数据集。

![Collection](../images/Collection.png)

数组、集合和字典都要求明确指定存储的数据类型。这种类型安全的设计确保了不能插入错误的数据类型，同时你也可以放心，从这些集合中取出的数据类型是预期的和一致的。

## 集合的可变性

如果你将一个数组、集合或字典分配给一个「变量」，那么这个集合是「可变的」。这意味着你可以在创建后随时添加、修改或删除数据项。相反，如果你将这些集合类型分配给一个「常量」，则它们变为「不可变的」，其内容和大小将无法更改。

## 数组（Arrays）

数组使用有序列表存储同一类型的多个值。相同的值可以多次出现在一个数组的不同位置中。

### 数组的简单语法

数组的完整类型标注是 `Array<Element>`，这里的 `Element` 表示数组中允许的唯一数据类型。你也可以使用更简洁的语法 `[Element]` 来定义数组。虽然这两种表达方式在功能上完全相同，推荐使用简短的形式 `[Element]`。在本文中，我们将一直采用这种简洁的语法来处理数组。

### 创建一个空数组

你可以使用构造器语法（`[]`）创建一个特定数据类型（`[Int]`）的数组。如下例：

```swift{1}
var someInts: [Int] = []
print("someInts is of type [Int] with \(someInts.count) items.")
// 输出：“someInts is of type [Int] with 0 items.”
```

这段代码中，`someInts` 的数据类型被推断为 `[Int]`，即一个整数数组。

如果你已经在代码中定义了数组的类型，你可以使用更简洁的方式`[]`来清空数组或重新初始化它：

```swift{3}
someInts.append(3)
// someInts 现在包含一个整数值
someInts = []
// someInts 重新被设为空数组，但类型仍然是 [Int]
```

这样，`someInts` 在添加新元素后又被重置为一个空数组，但其数据类型不变，依然是整数数组。

## 创建一个带有默认值的数组

`Array` 类型提供了一种构造方法，允许你创建一个具有特定大小的数组，并且数组中的所有元素都初始化为相同的默认值。你可以通过指定数组的元素数量（`count`）和每个元素的初始值（`repeating`）来使用这种构造方法。这里是如何使用这个构造方法的示例：

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
// threeDoubles 是一种 [Double] 数组，等价于 [0.0, 0.0, 0.0]
```

在这个例子中，`repeating: 0.0` 表示数组中每个元素的初始值是 `0.0`，而 `count: 3` 指定数组应该有 3 个这样的元素。

## 通过两个数组相加创建一个数组

你可以使用加法操作符（+）来组合两个已存在的相同类型数组。新数组的数据类型会从两个数组的数据类型中推断出来：

```swift{4}
var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
// anotherThreeDoubles 被推断为 [Double]，等价于 [2.5, 2.5, 2.5]

var sixDoubles = threeDoubles + anotherThreeDoubles
// sixDoubles 被推断为 [Double]，等价于 [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
```

## 用数组字面量构造数组

你可以使用数组字面量来构建数组，这是一个简单直观的方法。数组字面量由一组数值组成，这些数值被逗号分隔，并被包括在方括号中。这使得数组的创建既快速又直观。例如：

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
// shoppingList 已经被构造并且拥有两个初始项。
```
当你使用字面量创建包含相同类型值的数组时，Swift 会自动推断出数组的类型。例如：

```swift
var shoppingList = ["Eggs", "Milk"]
```

## 访问和修改数组

你可以使用各种数组的方法和属性来访问和修改数组，或者使用下标语法来操作数组。下面是如何使用这些特性的详细解释：

### 访问数组元素数量
使用数组的 `count` 属性来获取数组中的元素数量：
```swift
print("The shopping list contains \(shoppingList.count) items.")
// 输出 "The shopping list contains 2 items." （这个数组有2个项）
```

### 检查数组是否为空
使用布尔属性 `isEmpty` 来检查数组是否为空，这是检查 `count` 是否为 0 的快捷方式：
```swift
if shoppingList.isEmpty {
    print("The shopping list is empty.")
} else {
    print("The shopping list is not empty.")
}
// 打印 "The shopping list is not empty."（shopping list 不是空的）
```

### 添加新元素
你可以使用 `append(_:)` 方法在数组的末尾添加新元素：
```swift
shoppingList.append("Flour")
// shoppingList 现在有3个数据项，似乎有人在摊煎饼
```
此外，使用加法赋值运算符 `+=` 来将一个或多个同类型的元素直接添加到数组末尾：
```swift
shoppingList += ["Baking Powder"]
// shoppingList 现在有四项了
shoppingList += ["Chocolate Spread", "Cheese", "Butter"]
// shoppingList 现在有七项了
```

### 使用下标访问和修改元素
可以直接使用下标语法来获取或修改数组中的元素，将所需的索引放在数组名称后的方括号中：
```swift
var firstItem = shoppingList[0]
// 第一项是 "Eggs"

shoppingList[0] = "Six eggs"
// 其中的第一项现在是 "Six eggs" 而不是 "Eggs"
```

::: warning 注意

Swift 的数组索引从 0 开始。

:::

### 使用下标修改多个元素
你也可以使用下标来一次改变数组中一系列元素的值，即使新数据和原数据的数量不同：
```swift
shoppingList[4...6] = ["Bananas", "Apples"]
// shoppingList 现在有6项
```

### 插入和移除元素
通过调用 `insert(_:at:)` 方法在数组的特定索引之前添加元素：
```swift
shoppingList.insert("Maple Syrup", at: 0)
// shoppingList 现在有7项
// 列表中的第一项现在是 "Maple Syrup"
```
使用 `remove(at:)` 方法来移除指定索引的元素：
```swift
let mapleSyrup = shoppingList.remove(at: 0)
// 索引值为0的数据项被移除
// shoppingList 现在只有6项，不包括 "Maple Syrup"
```

::: warning 注意
为避免索引越界的运行时错误，请确保使用的索引在有效范围内。
:::


### 移除数组的最后一个元素
如果你只想移除数组的最后一个元素，可以使用 `removeLast()` 方法：
```swift
let apples = shoppingList.removeLast()
// 数组的最后一项被移除了
// shoppingList 现在只有5项，不包括 "Apples"
```
