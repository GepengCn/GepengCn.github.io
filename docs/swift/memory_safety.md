# 内存安全

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/W4WvyhNYjzZvDCybAsJh6X"></iframe>

::: info 默认情况下，Swift 会阻止你代码里不安全的行为。

例如，Swift 会保证变量在使用之前就完成初始化，在内存被回收之后就无法被访问，并且数组的索引会做越界检查。
:::
Swift 也保证同时访问同一块内存时不会冲突，通过约束代码里对于存储地址的写操作，去获取那一块内存的访问独占权。

- 因为 Swift 自动管理内存，所以大部分时候你完全不需要考虑内存访问的事情。
- 然而，理解潜在的冲突也是很重要的，可以避免你写出访问冲突的代码。
- 而如果你的代码确实存在冲突，那在编译时或者运行时就会得到错误。

## 理解内存访问冲突

内存的访问，会发生在你给变量赋值，或者传递参数给函数时。例如，下面的代码就包含了读和写的访问：

```swift
// 向 one 所在的内存区域发起一次写操作
var one = 1

// 向 one 所在的内存区域发起一次读操作
print("We're number \(one)!")
```

::: info
内存访问的冲突会发生在你的代码尝试同时访问同一个存储地址的时侯。

同一个存储地址的多个访问同时发生会造成不可预计或不一致的行为。

在 Swift 里，有很多修改值的行为都会持续好几行代码，在修改值的过程中进行访问是有可能发生的。
:::

你可以思考一下预算表更新的过程，会看到同样的问题。

更新预算表总共有两步：

- 首先你把预算项的名字和费用加上。
- 然后再更新总数来反映预算表的现况。

在更新之前和之后，你都可以从预算表里读取任何信息并获得正确的答案，就像下面展示的那样。

![SafetyMemoryExample](../images/memory_shopping@2x.png)


::: danger 而当你添加预算项进入表里的时候，它只是在一个临时的，错误的状态，因为总数还没有被更新

在添加数据的过程中读取总数就会读取到错误的信息。

:::

这个例子也演示了你在修复内存访问冲突时会遇到的问题：有时修复的方式会有很多种，但哪一种是正确的就不总是那么明显了。

在这个例子里，根据你是否需要更新后的总数，$ $5$ 和 $ $320$ 都可能是正确的值。在你修复访问冲突之前，你需要决定它的倾向。

::: warning 如果你写过并发和多线程的代码，内存访问冲突也许是同样的问题

然而，这里访问冲突的讨论是在单线程的情境下讨论的，并没有使用并发或者多线程。

如果你曾经在单线程代码里有访问冲突，Swift 可以保证你在编译或者运行时会得到错误。

对于多线程的代码，可以使用 [Thread Sanitizer](https://developer.apple.com/documentation/xcode/diagnosing-memory-thread-and-crash-issues-early)  去帮助检测多线程的冲突。
:::

### 内存访问性质

内存访问冲突时，要考虑内存访问上下文中的这三个性质：

::: tip 冲突会发生在当你有两个访问符合下列的情况：
- 访问是读还是写: **至少有一个是写访问**
- 被访问的存储地址: **它们访问的是同一个存储地址**
- 访问的时长: **它们的访问在时间线上部分重叠**
:::


- 读和写访问的区别很明显：一个写访问会改变存储地址，而读操作不会。
- 存储地址是指向正在访问的东西（例如一个变量，常量或者属性）的位置的值 。
- 如果一个访问不可能在其访问期间被其它代码访问，那么就是一个瞬时访问。

正常来说，两个瞬时访问是不可能同时发生的。大多数内存访问都是瞬时的。

例如，下面列举的所有读和写访问都是瞬时的：
```swift
func oneMore(than number: Int) -> Int {
    return number + 1
}

var myNumber = 1
myNumber = oneMore(than: myNumber)
print(myNumber)
// 打印“2”
```
然而，有几种被称为长期访问的内存访问方式，会在别的代码执行时持续进行。

::: info 瞬时访问和长期访问的区别
别的代码**有没有可能**在访问期间同时访问 -> 也就是在时间线上的重叠。

一个长期访问可以被别的长期访问或瞬时访问重叠。
:::



重叠的访问主要出现在：

- 使用 `in-out` 参数的函数和方法。
- 结构体的 `mutating` 方法里。



## In-Out 参数的访问冲突


一个函数会对它所有的 `in-out` 参数保持长期写访问。

- `in-out` 参数的写访问会在所有非 `in-out` 参数处理完之后开始，直到函数执行完毕为止。
- 如果有多个 `in-out` 参数，则写访问开始的顺序与参数的顺序一致。


::: danger 这种长期保持的写访问带来的问题
你不能再访问以 `in-out` 形式传入的原始变量，即使作用域原则和访问权限允许——任何访问原始变量的行为都会造成冲突。
:::
例如：

```swift
var stepSize = 1

func increment(_ number: inout Int) {
    number += stepSize //同时读和写
}

increment(&stepSize)
// 错误：stepSize 访问冲突
```

在上面的代码里，`stepSize` 是一个全局变量，并且它可以在 `increment(_:)` 里正常访问。

- 然而，对于 `stepSize` 的读访问与 `number` 的写访问重叠了 ( `+=` 左边是写，右边是读)。
- 就像下面展示的那样，`number` 和 `stepSize` 都指向了同一个存储地址。

同一块内存的读和写访问重叠了，就此产生了冲突。

![memory_increment@2x](../images/memory_increment@2x.png)

解决这个冲突的一种方式，是显式拷贝一份 `stepSize` ：

```swift
// 显式拷贝
var copyOfStepSize = stepSize // 读
increment(&copyOfStepSize) //写

// 更新原来的值
stepSize = copyOfStepSize
// stepSize 现在的值是 2
```


当你在调用 `increment(_:)` 之前做一份拷贝，显然 `copyOfStepSize` 就会根据当前的 `stepSize` 增加。

读访问在写操作之前就已经结束了，所以不会有冲突。

长期写访问的存在还会造成另一种结果，往同一个函数的多个 `in-out` 参数里传入同一个变量也会产生冲突，例如：

```swift
//会将传入的两个参数平均化
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}
var playerOneScore = 42
var playerTwoScore = 30
balance(&playerOneScore, &playerTwoScore)  // 正常
balance(&playerOneScore, &playerOneScore)  // 错误:playerOneScore 访问冲突 // [!code error]
```

- 将 `playerOneScore` 和 `playerTwoScore` 作为参数传入不会产生错误 —— 有两个访问重叠了，但它们访问的是不同的内存位置。
- 相反，将 `playerOneScore` 作为参数同时传入就会产生冲突，因为它会发起两个写访问，同时访问同一个的存储地址。

::: warning 注意
因为操作符也是函数，它们也会对 `in-out` 参数进行长期访问。

例如，假设 `balance(_:_:)` 是一个名为 `<^>` 的操作符函数，那么 `playerOneScore <^> playerOneScore` 也会造成像 `balance(&playerOneScore, &playerOneScore)` 一样的冲突。
:::

## 方法里 `self` 的访问冲突

一个结构体的 `mutating` 方法会在调用期间对 `self` 进行写访问。

例如，想象一下这么一个游戏：
- 每一个玩家都有血量，受攻击时血量会下降（ `health--` ）。
- 并且有敌人的数量，使用特殊技能时会减少敌人数量（ `energy--` ）。

```swift
struct Player {
    var name: String
    var health: Int
    var energy: Int


    static let maxHealth = 10
    mutating func restoreHealth() {
        health = Player.maxHealth //访问的是类属性，不是实例属性
    }
}
```


- 在上面的 `restoreHealth()` 方法里，一个对于 `self` 的写访问会从方法开始直到方法 `return`。
- 在这种情况下，`restoreHealth()` 里的其它代码不可以对 `Player` 实例的属性发起重叠的访问。

下面的 `shareHealth(with:)` 方法接受另一个 `Player` 的实例作为 `in-out` 参数，产生了访问重叠的可能性。

```swift
extension Player {
    mutating func shareHealth(with teammate: inout Player) {
        balance(&teammate.health, &health)
    }
}

var oscar = Player(name: "Oscar", health: 10, energy: 10)
var maria = Player(name: "Maria", health: 5, energy: 10)
oscar.shareHealth(with: &maria)  // 正常
```
上面的例子里，调用 `shareHealth(with:)` 方法去把 `oscar` 玩家的血量分享给 `maria` 玩家并不会造成冲突。

- 在方法调用期间会对 `oscar` 发起写访问，因为在 `mutating` 方法里 `self` 就是 `oscar`。
- 同时对于 `maria` 也会发起写访问，因为 `maria` 作为 `in-out` 参数传入。

过程如下，它们会访问内存的不同位置。即使两个写访问重叠了，它们也不会冲突。

![memory_share_health_maria@2x](../images/memory_share_health_maria@2x.png)

但是，如果你将 `oscar` 作为参数传递给 `shareHealth(with:)`，就会产生冲突：

```swift
oscar.shareHealth(with: &oscar) // [!code error]
// 错误：oscar 访问冲突
```

`mutating` 方法在调用期间需要：
- 对 `self` 发起写访问。
- 而同时 `in-out` 参数也需要写访问。

在方法里，`self` 和 `teammate` 都指向了同一个存储地址——就像下面展示的那样。对于同一块内存同时进行两个写访问，并且它们重叠了，就此产生了冲突。

![memory_share_health_oscar@2x](../images/memory_share_health_oscar@2x.png)

## 属性的访问冲突

如结构体，元组和枚举的类型都是**由多个独立的值组成**的，例如结构体的属性或元组的元素。
- 因为它们都是值类型，修改值的任何一部分都是对于整个值的修改，意味着其中一个属性的读或写访问都需要访问一整个值。

例如，元组元素的写访问重叠会产生冲突：

```swift
var playerInformation = (health: 10, energy: 20)
balance(&playerInformation.health, &playerInformation.energy)
// 错误：playerInformation 的属性访问冲突
```

`playerInformation.health` 和 `playerInformation.energy` 都被作为 `in-out` 参数传入，意味着 `balance(_:_:)` 需要在函数调用期间对它们发起写访问。

::: danger 冲突
任何情况下，对于元组元素的写访问都需要对整个元组发起写访问。这意味着对于 `playerInfomation` 发起的两个写访问重叠了，造成冲突。

:::