# 类型转换

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/QpM5hGKgP34qs97CFDPxiz"></iframe>

类型转换允许你检查实例的类型，或者将实例作为其父类或子类的实例进行处理。这主要通过 `is` 和 `as` 操作符来实现。

`is` 操作符用于检查一个实例是否属于某个特定类型。如果实例属于那个类型，表达式返回 `true`，否则返回 `false`。这对于条件语句中类型的安全检查非常有用。

`as` 操作符则用于类型转换。当你确定一个实例可以被视为一个更具体的类型或者需要将其转换为更一般的类型时，可以使用 `as?` 或 `as!`。`as?` 返回一个可选值，当转换失败时返回 `nil`，这提供了安全的类型转换方式。而 `as!` 则用于强制转换，如果转换失败，会引发运行时错误。

此外，`as` 操作符也可以用来检查某个实例是否遵循了特定的协议。如果实例遵循该协议，你可以将其视为协议类型的实例进行操作。

## 为类型转换定义类层次

在 Swift 中使用类型转换来处理类及其子类之间的关系非常有用，尤其是在涉及到类的继承层次结构时。这可以让你在运行时检查实例的具体类型，或者将实例作为其层次结构中其他类型进行操作。下面是一段具体的示例说明，以帮助你更好地理解这个过程：

### 定义基类和子类

首先，我们定义了一个基类 `MediaItem`，这个类为数字媒体库中的所有媒体项提供基础属性和功能。这里，每个媒体项都有一个名称：

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

接着，我们定义了两个 `MediaItem` 的子类：`Movie` 和 `Song`。`Movie` 类增加了一个 `director`（导演）属性，而 `Song` 类增加了一个 `artist`（艺术家）属性。这两个子类在初始化时，除了设置自己特有的属性，还需要调用父类的初始化器来设置共有的 `name` 属性：

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

然后，我们创建了一个包含不同类型实例的数组 `library`，它包含了两个 `Movie` 实例和三个 `Song` 实例。因为 Swift 的类型推断机制，这个数组的类型被推断为 `[MediaItem]`，即使数组中包含的是 `Movie` 和 `Song` 的实例：

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

在使用这个数组时，尽管数组中的元素被推断为 `MediaItem` 类型，实际上它们分别是 `Movie` 和 `Song` 的实例。如果需要操作这些实例特有的属性（比如 `director` 或 `artist`），你必须先检查它们的实际类型，或者将它们转换为正确的子类型。

## 检查类型

类型检查是一种确定实例是否为特定类型或其子类型的方法。类型检查在处理继承和协议多态性时尤其有用，因为它允许代码在运行时适应不同类型的对象。下面我们细致探讨 Swift 中的类型检查方法和使用场景。

### 使用 `is` 操作符进行类型检查

`is` 操作符用于确定一个实例是否属于某个类或者某个类的子类。其基本语法如下：

```swift
instance is Type
```

这里，`instance` 是你要检查的实例，而 `Type` 是你想检查的类型。如果 `instance` 是 `Type` 类型或其子类的实例，这个表达式返回 `true`；否则返回 `false`。

### 示例：使用 `is` 进行类型检查

考虑之前提到的 `MediaItem`, `Movie`, 和 `Song` 类的例子，如果我们想遍历 `library` 数组，并检查每个元素的类型，我们可以这样做：

```swift
for item in library {
    if item is Movie {
        print("\(item.name) 是一部电影")
    } else if item is Song {
        print("\(item.name) 是一首歌")
    }
}
```

在这个例子中，`is` 操作符被用来检查 `item` 是否为 `Movie` 类型或 `Song` 类型。这允许我们根据实例的类型执行不同的操作。

### 类型检查的实际应用

类型检查的一个典型应用场景是在使用继承或协议时处理不同类型的集合。比如，如果你有一个函数处理不同类型的媒体文件，但只有在处理电影类型时需要执行特定操作，类型检查就非常有用：

```swift
func handleMediaItems(_ items: [MediaItem]) {
    for item in items {
        if item is Movie {
            // 只有是电影时，才执行特定操作
            print("处理电影: \(item.name)")
        } else {
            print("处理其他媒体项")
        }
    }
}
```

::: tip 类型检查的好处

- **安全性**：通过确保类型在执行操作之前符合预期，可以防止运行时错误。
- **灵活性**：允许同一段代码处理多种类型的对象，使得代码更加通用和可重用。

:::

## 向下转型

向下转型是一种将实例从它当前的类型转换为目标子类类型的操作。向下转型通常在你确信某个实例实际上属于一个更具体的子类时使用，它允许你访问子类中定义的更具体的属性或方法。Swift 提供了两种方式来执行向下转型：`as?` 和 `as!`。我们来详细了解这两种操作符。

### `as?` 操作符

`as?` 返回一个可选值（optional），表示尝试将类型转换为你期望的目标类型。如果转换是合法的，`as?` 返回一个包含结果的可选值；如果转换不合法，`as?` 将返回 `nil`，表示转换失败。这是一种安全的转型方法，因为它不会引起程序崩溃。

#### 使用 `as?` 的示例

考虑之前提到的 `MediaItem`、`Movie` 和 `Song` 的例子，如果我们想从 `library` 数组中提取具体的 `Movie` 或 `Song` 实例，可以这样做：

```swift
for item in library {
    if let movie = item as? Movie {
        print("电影名：\(movie.name)，导演：\(movie.director)")
    } else if let song = item as? Song {
        print("歌曲名：\(song.name)，艺术家：\(song.artist)")
    }
}
```

在这个例子中，`as?` 用来尝试将 `MediaItem` 类型的 `item` 转换为 `Movie` 或 `Song`。如果转换成功，将执行相应的打印操作；如果转换失败，则不执行任何操作。

### `as!` 操作符

`as!` 用于你已经确定可以将实例转换为更具体的类型的情况下，如果转换失败，`as!` 将引发运行时错误（crash）。由于 `as!` 的这种强制性质，只有当你完全确定转换不会失败时，才应使用 `as!`。

#### 使用 `as!` 的示例

如果我们非常确定每个 `item` 至少是 `Movie` 类型，可以使用 `as!`：

```swift
for item in library {
    let movie = item as! Movie
    print("电影名：\(movie.name)，导演：\(movie.director)")
}
```

这段代码中，如果任何 `item` 实际上不是 `Movie`，程序将会崩溃。因此，使用 `as!` 需要谨慎，确保数据一致性。

::: tip 选择策略

- **`as?`** 提供安全的类型转换，适用于你不确定转换是否总是成功的情况。
- **`as!`** 提供强制性的类型转换，适用于你能够确保转换永远成功的情况。

:::

## Any 和 AnyObject 的类型转换

`Any` 和 `AnyObject` 是两种非常重要的类型，它们在类型系统中提供了极高的灵活性。理解这两种类型及其在类型转换中的应用，对于写出灵活且健壮的 Swift 代码至关重要。

### AnyObject

`AnyObject` 可以表示任何类类型的实例。在 Swift 的早期版本中，它广泛用于 Objective-C API 的互操作，因为 Objective-C 中的类都是基于引用的。使用 `AnyObject`，你可以在不知道具体类的情况下，创建能够接受任何类实例的集合或函数。

#### 转换到 AnyObject

如果你有一个特定的类实例，你可以直接将它转换为 `AnyObject`。这在 Swift 中通常是自动发生的，尤其是在你与 Objective-C APIs 交互时。例如：

```swift
class ExampleClass {
    var property: String = "Hello"
}

let example = ExampleClass()
let object: AnyObject = example
```

在这里，`example` 实例被转换为 `AnyObject` 类型。

### Any

`Any` 可以表示任何类型，包括函数类型和所有的数据类型（类、结构体、枚举等）。它提供了一种方式来工作于非特定类型的数据。当你需要在一个集合中存储混合类型数据时，`Any` 尤其有用。

#### 转换到 Any

几乎所有的 Swift 类型都可以转换为 `Any`。这让 `Any` 成为一个非常通用的类型，可以用来存储从整数到字典、从类实例到闭包的任何东西。例如：

```swift
var things: [Any] = []
things.append(0)
things.append("Hello")
things.append({ (name: String) -> String in "Hello, \(name)" })
```

### 在类型转换中使用 Any 和 AnyObject

当你使用 `Any` 和 `AnyObject` 时，类型转换变得尤其重要。因为存储在这些类型中的数据会丢失其原始类型信息，你需要在使用时将它们转换回适当的类型。

#### 使用 `as?` 和 `as!` 进行向下转型

向下转型是在处理 `Any` 和 `AnyObject` 存储的值时最常用的操作。这通常通过 `as?`（安全的）或 `as!`（不安全的）操作符来完成：

```swift
for thing in things {
    if let string = thing as? String {
        print("处理字符串: \(string)")
    } else if let int = thing as? Int {
        print("处理整数: \(int)")
    } else if let closure = thing as? (String) -> String {
        print("处理闭包: \(closure("Swift"))")
    }
}
```

这个示例演示了如何遍历一个包含不同类型的 `Any` 数组，并尝试将每个元素转换为它可能的类型。

