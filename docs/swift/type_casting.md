# 类型转换

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/QpM5hGKgP34qs97CFDPxiz"></iframe>

类型转换允许你检查实例的类型，或者将实例作为其父类或子类的实例进行处理。

这主要通过 `is` 和 `as` 操作符来实现。


## 为类型转换定义类层次


类型转换可以让你在**运行时检查实例的具体类型**，或者**将实例作为其层次结构中其他类型**进行操作。

下面的代码段定义了一个类层次和一个包含了这些类实例的数组，作为类型转换的例子。

### 定义基类和子类

首先，我们定义了一个基类 `MediaItem`：

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

接着，我们定义了两个 `MediaItem` 的子类：`Movie` 和 `Song`。`Movie` 类增加了一个 `director`（导演）属性，而 `Song` 类增加了一个 `artist`（艺术家）属性。

这两个子类在初始化时，除了设置自己特有的属性，还需要调用父类的初始化器来设置共有的 `name` 属性：

```swift
class Movie: MediaItem {
    var director: String
    init(name: String, director: String) {
        self.director = director
        super.init(name: name)
    }
}

class Song: MediaItem {
    var artist: String
    init(name: String, artist: String) {
        self.artist = artist
        super.init(name: name)
    }
}
```

### 创建和推断类型的数组

然后，我们创建了一个包含不同类型实例的数组 `library`，它包含了两个 `Movie` 实例和三个 `Song` 实例。

因为 Swift 的类型推断机制，这个数组的类型被推断为 `[MediaItem]`，即使数组中包含的是 `Movie` 和 `Song` 的实例：

```swift
let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
]
```

### 类型检查和转换

在使用这个数组时，尽管数组中的元素被推断为 `MediaItem` 类型，实际上它们分别是 `Movie` 和 `Song` 的实例。

如果需要操作这些实例特有的属性（比如 `director` 或 `artist`），你必须先检查它们的实际类型，或者将它们转换为正确的子类型。

## 检查类型

`is` 操作符用于确定一个实例是否属于某个类或者某个类的子类。

其基本语法如下：

```swift
instance is Type
```

这里，`instance` 是你要检查的实例，而 `Type` 是你想检查的类型。

如果 `instance` 是 `Type` 类型或其子类的实例，这个表达式返回 `true`；否则返回 `false`。

如果我们想遍历 `library` 数组，并检查每个元素的类型，我们可以这样做：

```swift
for item in library {
    if item is Movie {
        print("\(item.name) 是一部电影")
    } else if item is Song {
        print("\(item.name) 是一首歌")
    }
}
```

在这个例子中，`is` 操作符被用来检查 `item` 是否为 `Movie` 类型或 `Song` 类型。


::: tip 类型检查的好处

- **安全性**：通过确保类型在执行操作之前符合预期，可以防止运行时错误。
- **灵活性**：允许同一段代码处理多种类型的对象，使得代码更加通用和可重用。

:::

## 向下转型

::: tip 向下转型是一种将实例从它当前的类型转换为目标子类类型的操作。

向下转型通常在你确信某个实例实际上属于一个更具体的子类时使用，它允许你访问子类中定义的更具体的属性或方法。

:::
Swift 提供了两种方式来执行向下转型：`as?` 和 `as!`。

### `as?` 操作符

::: info `as?` 返回一个可选值（ `optional` ），表示尝试将类型转换为你**期望的目标类型**。

- 如果转换是合法的，`as?` 返回一个包含结果的可选值；
- 如果转换不合法，`as?` 将返回 `nil`，表示转换失败。

这是一种安全的转型方法，因为它不会引起程序崩溃。

:::

如果我们想从 `library` 数组中提取具体的 `Movie` 或 `Song` 实例，可以这样做：

```swift
for item in library {
    if let movie = item as? Movie {
        print("电影名：\(movie.name)，导演：\(movie.director)")
    } else if let song = item as? Song {
        print("歌曲名：\(song.name)，艺术家：\(song.artist)")
    }
}
```

在这个例子中，`as?` 用来尝试将 `MediaItem` 类型的 `item` 转换为 `Movie` 或 `Song`。

### `as!` 操作符

::: danger `as!` 用于你已经确定可以将实例转换为更具体的类型的情况下。


- 如果转换失败，`as!` 将引发运行时错误（ `crash` ）。
- 由于 `as!` 的这种强制性质，只有当你完全确定转换不会失败时，才应使用 `as!`。

:::

如果我们非常确定每个 `item` 都是 `Movie` 类型，可以使用 `as!`：

```swift
for item in library {
    let movie = item as! Movie
    print("电影名：\(movie.name)，导演：\(movie.director)")
}
```

这段代码中，如果任何 `item` 实际上不是 `Movie`，程序将会崩溃。

::: tip 选择策略

- **`as?`** 提供安全的类型转换，适用于你不确定转换是否总是成功的情况。
- **`as!`** 提供强制性的类型转换，适用于你能够确保转换永远成功的情况。

:::

## Any 和 AnyObject

在 Swift 中，`Any` 和 `AnyObject` 是两种非常特殊的类型，它们用于在代码中处理不确定类型的数据。

::: tip Any

`Any` 可以表示 Swift 中所有类型的值，包括函数和结构体。也就是说，无论是整数（ `Int` ）、字符串（ `String` ）、数组（ `Array` ）、字典（ `Dictionary` ）还是自定义的类和结构体，都可以用 `Any` 来表示。

:::

::: tip AnyObject

`AnyObject` 可以代表任何类的实例。在 Swift 中，类是引用类型，所以 `AnyObject` 通常用于处理动态的类实例。

在 Objective-C 与 Swift 混编时，`AnyObject` 尤其常见，因为 Objective-C 的根类型 `NSObject` 可以通过 `AnyObject` 来表示。

:::


示例

```swift
var items: [Any] = [5, "Hello", Date(), { print("Hello") }]

for item in items {
    switch item {
    case let text as String:
        print("这是一个字符串: \(text)")
    case let number as Int:
        print("这是一个整数: \(number)")
    case let date as Date:
        print("这是一个日期对象: \(date)")
    default:
        print("其他类型")
    }
}

class MyClass {}
var aClassInstance: AnyObject = MyClass()
```

::: warning

在实际开发中，尽管 `Any` 和 `AnyObject` 很灵活，但过多使用它们会让你的代码变得难以理解和维护。

推荐在确实需要处理多种数据类型时再使用，平时尽量使用更具体的类型来保证代码的安全性和清晰度。

:::