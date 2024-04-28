# 不透明类型

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/YbwLVtVMN8ioWdpAg3vQ46"></iframe>

具有不透明返回类型的函数或方法会**隐藏返回值的类型信息**。

- 函数不再提供具体的类型 `Class` 作为返回类型，而是根据它支持的协议 `Protocol` 来描述返回值。
- 在处理模块和调用代码之间的关系时，隐藏类型信息非常有用，因为返回的底层数据类型仍然可以保持私有。
- 而且不同于返回协议类型，不透明类型能**保证类型一致性**。

## 不透明类型解决的问题

举个例子，假设你正在写一个模块，用来绘制 `ASCII` 符号构成的几何图形。

它的基本特征是有一个 `draw()` 方法，会返回一个代表最终几何图形的字符串，你可以用包含这个方法的 `Shape` 协议来描述：

```swift
protocol Shape {
    func draw() -> String
}

struct Triangle: Shape {
    var size: Int
    func draw() -> String {
        var result: [String] = []
        for length in 1...size {
            result.append(String(repeating: "*", count: length))
        }
        return result.joined(separator: "\n")
    }
}
let smallTriangle = Triangle(size: 3)
print(smallTriangle.draw())
// *
// **
// ***
```

你可以利用泛型来实现垂直翻转之类的操作，就像下面这样。

然而，这种方式有一个很大的局限：翻转操作的结果会暴露我们用于构造结果的泛型类型：

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
let flippedTriangle = FlippedShape(shape: smallTriangle)
print(flippedTriangle.draw())
// ***
// **
// *


struct JoinedShape<T: Shape, U: Shape>: Shape {
    var top: T
    var bottom: U
    func draw() -> String {
        return top.draw() + "\n" + bottom.draw()
    }
}
let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
print(joinedTriangles.draw())
// *
// **
// ***
// ***
// **
// *
```

在设计如 `ASCII` 几何图形这样的模块时，我们通常不希望外部知道用于构造最终图形的具体类型。
如果公开了这些具体的类型，如 `JoinedShape` 或 `FlippedShape`，就可能不小心泄露了模块内部的实现细节。这种情况下，调用者可以看到返回类型的具体构成，这与我们希望保持的封装原则相违背。

理想的情况是，模块的公开接口应该简洁明了，仅由一些基本操作如「拼接」和「翻转」组成，并且这些操作返回一个遵守 `Shape` 协议的不透明类型。这样，即便模块内部有多种实现方式，外部使用时也只与结果相关，而不依赖于具体的变换逻辑或类型。通过这种方式，我们能够确保模块的使用者关注于功能本身，而不是实现的具体细节。

## 使用不透明类型的优势

不透明类型提供了一个解决方案，它可以使你返回一个特定协议的类型，而不用暴露具体的实现。这样做的好处是你可以隐藏具体的类型信息，只暴露必要的接口。例如，我们可以定义一个函数，它返回一个不透明的 `Shape` 类型：

```swift
func makeTrapezoid() -> some Shape {
    let top = Triangle(size: 2)
    let middle = Square(size: 2)
    let bottom = FlippedShape(shape: top)
    let trapezoid = JoinedShape(top: top, bottom: JoinedShape(top: middle, bottom: bottom))
    return trapezoid
}
let trapezoid = makeTrapezoid()
print(trapezoid.draw())
// 输出:
// *
// **
// **
// **
// **
// *
```

在这里，`makeTrapezoid()` 函数的返回类型是 `some Shape`，这意味着它返回一个遵循 `Shape` 协议的类型，但调用者不知道具体是什么类型。

你也可以将不透明返回类型和泛型结合起来，下面的两个泛型函数也都返回了遵循 `Shape` 协议的不透明类型。


```swift
func flip<T: Shape>(_ shape: T) -> some Shape {
    return FlippedShape(shape: shape)
}
func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    JoinedShape(top: top, bottom: bottom)
}

let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
print(opaqueJoinedTriangles.draw())
// *
// **
// ***
// ***
// **
// *
```

::: warning 注意
如果函数中有多个地方返回了不透明类型，那么所有可能的返回值都必须是同一类型。

即使对于泛型函数，不透明返回类型可以使用泛型参数，但仍需保证返回类型唯一。

比如，下面就是一个非法示例 —— 包含针对 `Square` 类型进行特殊处理的翻转函数。

```swift
func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // 返回类型 Square // [!code error]
    }
    return FlippedShape(shape: shape) // 返回类型 FlippedShape // [!code error]
}
```

:::

## 不透明类型与协议类型的对比

上例中，不透明类型要求返回的必须是同一类型，如果改为使用协议的话，就可以打破这个限制：

```swift
func invalidFlip<T: Shape>(_ shape: T) -> some Shape  // [!code --]
func invalidFlip<T: Shape>(_ shape: T) -> Shape  // [!code ++]
    if shape is Square {
        return shape // 返回类型 Square // 
    }
    return FlippedShape(shape: shape) // 返回类型 FlippedShape 
}
```

在 Swift 中，不透明类型和协议类型都用于提供灵活的类型抽象，但它们在使用和功能上有一些关键的区别。


### 不透明类型
- **使用**：用 `some` 关键词，如 `some Shape`。
- **特点**：调用者不知道返回的具体类型是什么，但确保每次调用都返回相同的类型。
- **优势**：保证了类型的一致性，有助于编译器优化。
- **场景**：当你想隐藏具体的实现细节，但需要保证返回类型的一致性时使用。

### 协议类型
- **使用**：直接声明协议类型，如 `Shape`。
- **特点**：函数可以返回任何遵循该协议的类型，类型可以在不同调用间变化。
- **优势**：提供了更大的灵活性，允许函数返回多种类型。
- **场景**：当你需要在不同情况下返回不同的类型，且调用者需要根据返回的具体类型进行特定操作时使用。

::: tip 核心区别
- **不透明类型** 是对外隐藏具体类型的信息，确保类型的一致性和安全性。
- **协议类型** 是公开类型信息，允许多样性和灵活的类型处理。

:::