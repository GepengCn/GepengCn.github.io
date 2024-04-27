# 扩展

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/XGu2wrfTHXhAHs3W3ehteV"></iframe>

扩展可以给一个现有的类，结构体，枚举，还有协议添加新的功能。它还拥有不需要访问被扩展类型源代码就能完成扩展的能力（即逆向建模）。


扩展可以为现有的类型添加新的功能，但不能重写已有功能。


::: info 扩展可以

- 添加计算实例属性和计算类型属性
- 定义实例方法和类方法
- 提供新的构造器
- 定义下标
- 定义和使用新的嵌套类型
- 使已经存在的类型遵循（ `conform` ）一个协议

:::


使用 `extension` 关键字声明扩展：

```swift
extension SomeType {
    // 在这里给 SomeType 添加新的功能
}
```


## 扩展属性

在扩展中，你可以添加新的计算属性，但是你不能添加存储属性，也不能为现有的属性添加属性观察者。这是因为扩展不能添加新的存储空间，只能扩展新的计算方式。

示例：

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
}
```

这个扩展为 `Double` 类型添加了几个计算属性，用于将一个数字从米转换为其他长度单位。

## 扩展构造器

示例：

```swift
extension CGRect {
    init(centerX: CGFloat, centerY: CGFloat, width: CGFloat, height: CGFloat) {
        let originX = centerX - width / 2
        let originY = centerY - height / 2
        self.init(x: originX, y: originY, width: width, height: height)
    }
}
```

这个扩展为 `CGRect` 添加了一个新的便利构造器，允许初始化时直接设置矩形的中心点。

## 扩展方法

示例：

```swift
extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}
```
这个扩展为 `Int` 添加了一个新的方法，允许执行某任务多次，次数由整数决定。

## 扩展下标

示例：

```swift
extension Int {
    subscript(digitIndex: Int) -> Int {
        var decimalBase = 1
        for _ in 0..<digitIndex {
            decimalBase *= 10
        }
        return (self / decimalBase) % 10
    }
}
```

这个扩展为 `Int` 类型添加了一个下标，允许查询数值的指定位置的数字。

## 扩展嵌套类型

示例：

```swift
extension Int {
    enum Kind {
        case negative, zero, positive
    }

    var kind: Kind {
        switch self {
        case 0:
            return .zero
        case let x where x > 0:
            return .positive
        default:
            return .negative
        }
    }
}
```


这个扩展为 `Int` 添加了一个嵌套枚举和一个新的计算属性，用于判断数字是正数、零还是负数。

