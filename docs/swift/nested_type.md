# 嵌套类型

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/5AcCqzPK6J31ek8HspbmBm"></iframe>

- 枚举常被用于为特定类或结构体实现某些功能。

- 类似地，枚举可以方便的定义工具类或结构体，从而为某个复杂的类型所使用。

::: tip 定义嵌套类型

可以在支持的类型中定义嵌套的枚举、类和结构体。

要在一个类型中嵌套另一个类型，将嵌套类型的定义写在其外部类型的 `{}` 内，而且可以根据需要定义多级嵌套。
:::

## 嵌套类型实践

下面这个例子定义了一个结构体 `BlackjackCard`（二十一点），用来模拟 `BlackjackCard` 中的扑克牌点数。`BlackjackCard` 结构体包含两个嵌套定义的枚举类型 `Suit` 和 `Rank`。

```swift
struct BlackjackCard {

    // 嵌套的 Suit 枚举
    enum Suit: Character {
        case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
    }

    // 嵌套的 Rank 枚举
    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }

    // BlackjackCard 的属性和方法
    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \(suit.rawValue),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}

```

## 引用嵌套类型

在外部引用嵌套类型时，在嵌套类型的类型名前加上其外部类型的类型名作为前缀：

```swift
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
// 红心符号为“♡”
```

对于上面这个例子，这样可以使 `Suit`、`Rank` 和 `Values` 的名字尽可能的短，因为它们的名字可以由定义它们的上下文来限定。