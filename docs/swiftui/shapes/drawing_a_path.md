# 绘制路径

## `move(to:)`

在指定点开始一个新的子路径。

```swift
mutating func move(to end: CGPoint)
```


## `addArc(center:radius:startAngle:endAngle:clockwise:transform:)`

向路径添加一个圆弧，用半径和角度指定。

```swift
mutating func addArc(
    center: CGPoint,
    radius: CGFloat,
    startAngle: Angle,
    endAngle: Angle,
    clockwise: Bool,
    transform: CGAffineTransform = .identity
)
```

- `center`: 圆弧的中心，在用户空间坐标中。
- `radius`: 圆弧的半径，在用户空间坐标中。
- `startAngle`: 从正 $x$ 轴测量到圆弧起点的角度。
- `endAngle`: 从正 $x$ 轴测量到圆弧终点的角度。
- `clockwise`: 为 `true` 时绘制顺时针圆弧；为 `false` 时绘制逆时针圆弧。
- `transform`: 添加到路径之前应用于圆弧的仿射变换。如果未指定，则默认为恒等变换。

此方法使用你指定的半径和角度计算起点和终点，使用一系列三次贝塞尔曲线来近似这些点之间的圆段，然后将这些曲线附加到路径中。

`clockwise` 参数确定创建圆弧的方向；最终路径的实际方向取决于 `transform` 参数和绘制路径的上下文的当前变换。然而，由于 SwiftUI 默认使用垂直翻转的坐标系（原点在视图的左上角），因此指定顺时针圆弧会在应用变换后得到逆时针圆弧。

如果路径以未闭合的子路径结束，则此方法会添加一条连接当前点和圆弧起点的线。如果没有未闭合的子路径，则此方法会创建一个新的子路径，其起点是圆弧的起点。圆弧的终点成为路径的新当前点。

## `addArc(tangent1End:tangent2End:radius:transform:)`

向路径添加一段圆弧，通过半径和两条切线来指定。

```swift
mutating func addArc(
    tangent1End: CGPoint,
    tangent2End: CGPoint,
    radius: CGFloat,
    transform: CGAffineTransform = .identity
)
```

- `tangent1End`：第一条切线的终点，在用户空间坐标中，用于构建圆弧。（这条切线的起点是路径的当前点。）
- `tangent2End`：第二条切线的终点，在用户空间坐标中，用于构建圆弧。（这条切线的起点是 `tangent1End` 点。）
- `radius`：圆弧的半径，在用户空间坐标中。
- `transform`：添加到路径之前应用于圆弧的仿射变换。如果未指定，则默认为恒等变换。

此方法计算两条切线——第一条从当前点到 `tangent1End` 点，第二条从 `tangent1End` 点到 `tangent2End` 点——然后计算指定半径的圆弧的起点和终点，使得圆弧与两条切线都相切。最后，此方法使用一系列三次贝塞尔曲线来近似该圆弧，并将这些曲线附加到路径中。

如果圆弧的起点（即指定半径的圆必须与第一条切线相交的点，以便也与第二条切线相切）不是当前点，则此方法将从当前点到圆弧起点附加一个直线段。

圆弧的终点（即指定半径的圆必须与第二条切线相交的点，以便也与第一条切线相切）成为路径的新当前点。

## `addCurve(to:control1:control2:)`

向路径添加一条三次贝塞尔曲线，具有指定的终点和控制点。

```swift
mutating func addCurve(
    to end: CGPoint,
    control1: CGPoint,
    control2: CGPoint
)
```

- `control1`：曲线的第一个控制点，在用户空间坐标中。
- `control2`：曲线的第二个控制点，在用户空间坐标中。

此方法构建一条从路径的当前点开始并结束于指定终点的曲线，其曲率由两个控制点定义。此方法将该曲线附加到当前路径后，曲线的终点将成为路径的当前点。

## `addEllipse(in:transform:)`

向路径添加一个适合指定矩形内部的椭圆。

```swift
mutating func addEllipse(
    in rect: CGRect,
    transform: CGAffineTransform = .identity
)
```

椭圆由一系列贝塞尔曲线近似。它的中心是由 `rect` 参数定义的矩形的中点。如果矩形是正方形，则椭圆是圆形的，半径等于矩形宽度（或高度）的一半。如果 `rect` 参数指定的是矩形形状，则椭圆的长轴和短轴由矩形的宽度和高度定义。

椭圆形成路径的一个完整子路径——也就是说，椭圆绘制从一个移动到操作开始，以一个闭合子路径操作结束，所有的移动都沿顺时针方向。

参数：

- `rect`：一个定义椭圆适合区域的矩形。
- `transform`：添加到路径之前应用于椭圆的仿射变换。如果未指定，则默认为恒等变换。

## `addLine(to:)`

从当前点到指定点附加一条直线段。

```swift
mutating func addLine(to end: CGPoint)
```

- `end`：新线段终点的位置，在用户空间坐标中。

添加线段后，当前点设置为线段的终点。

## `addLines(_:)`

向路径添加一系列连接的直线段。

```swift
mutating func addLines(_ lines: [CGPoint])
```

调用此便利方法等同于将变换应用于数组中的所有点，然后使用 `points` 数组中的第一个值调用 `move(to:)`方法，然后对每个后续点调用 `addLine(to:)` 方法，直到数组用完。调用此方法后，路径的当前点是数组中的最后一个点。

参数：

- `lines`：一个值数组，指定要绘制的线段的起点和终点。数组中的每个点指定用户空间中的一个位置。数组中的第一个点指定初始起点。
- `transform`：添加到路径之前应用于点的仿射变换。如果未指定，则默认为恒等变换。

## `addPath(_:transform:)`

将另一个路径值附加到此路径。

```swift
mutating func addPath(
    _ path: Path,
    transform: CGAffineTransform = .identity
)
```

- `path`：要添加的路径。
- `transform`：在将 `path` 参数添加到此路径之前应用的仿射变换。如果未指定，则默认为恒等变换。

如果 `path` 参数是一个非空路径，其元素将按顺序附加到此路径。之后，此路径的起始点和当前点是 `path` 参数中最后一个子路径的起始点和当前点。

## `addQuadCurve(to:control:)`

向路径添加一条二次贝塞尔曲线，具有指定的终点和控制点。

```swift
mutating func addQuadCurve(
    to end: CGPoint,
    control: CGPoint
)
```

此方法构建一条从路径的当前点开始并结束于指定终点的曲线，其曲率由控制点定义。此方法将该曲线附加到当前路径后，曲线的终点将成为路径的当前点。


## `addRect(_:transform:)`

向路径添加一个矩形子路径。

```swift
mutating func addRect(
    _ rect: CGRect,
    transform: CGAffineTransform = .identity
)
```

- `rect`：一个矩形，在用户空间坐标中指定。
- `transform`：在将矩形添加到路径之前应用的仿射变换。如果未指定，则默认为恒等变换。

这是一个便利函数，用于向路径添加一个矩形，首先移动到底部左角，然后逆时针添加线条以创建一个矩形，最后闭合子路径。

## `addRects(_:transform:)`

向路径添加一组矩形子路径。

```swift
mutating func addRects(
    _ rects: [CGRect],
    transform: CGAffineTransform = .identity
)
```

调用此便利方法等同于对数组中的每个矩形重复调用 `addRect(_:transform:)` 方法。

参数：

- `rects`：一个矩形数组，在用户空间坐标中指定。
- `transform`：在将椭圆添加到路径之前应用的仿射变换。如果未指定，则默认为恒等变换。

## `addRelativeArc(center:radius:startAngle:delta:transform:)`

向路径添加一段圆弧，通过半径和角度差来指定。

```swift
mutating func addRelativeArc(
    center: CGPoint,
    radius: CGFloat,
    startAngle: Angle,
    delta: Angle,
    transform: CGAffineTransform = .identity
)
```

- `center`：圆弧的中心，在用户空间坐标中。
- `radius`：圆弧的半径，在用户空间坐标中。
- `startAngle`：圆弧起始点的角度，从正 x 轴开始测量。
- `delta`：圆弧起始角度和结束角度之间的差值。正值创建逆时针圆弧（在用户空间坐标中），反之亦然。
- `transform`：在将圆弧添加到路径之前应用的仿射变换。如果未指定，则默认为恒等变换。

此方法使用你指定的半径和角度计算起始点和结束点，使用一系列三次贝塞尔曲线来近似这些点之间的一段圆弧，然后将这些曲线附加到路径中。

`delta` 参数同时确定圆弧的长度和创建圆弧的方向；最终路径的实际方向取决于 `transform` 参数和绘制路径的上下文的当前变换。然而，由于 SwiftUI 默认使用垂直翻转的坐标系（原点在视图的左上角），因此指定顺时针圆弧会在应用变换后得到逆时针圆弧。

如果路径以未闭合的子路径结束，此方法将添加一条连接当前点到圆弧起始点的直线。如果没有未闭合的子路径，此方法将创建一个新的子路径，其起始点是圆弧的起始点。圆弧的结束点成为路径的新当前点。


## `addRoundedRect(in:cornerSize:style:transform:)`

向路径添加一个圆角矩形。

```swift
mutating func addRoundedRect(
    in rect: CGRect,
    cornerSize: CGSize,
    style: RoundedCornerStyle = .continuous,
    transform: CGAffineTransform = .identity
)
```

- `rect`：一个矩形，在用户空间坐标中指定。
- `cornerSize`：角的大小，在用户空间坐标中指定。
- `style`：角的样式。如果未指定，则默认为连续样式。
- `transform`：在将矩形添加到路径之前应用的仿射变换。如果未指定，则默认为恒等变换。

这是一个便利函数，用于向路径添加一个圆角矩形，首先移动到右边缘的中心，然后逆时针添加线条和曲线以创建一个圆角矩形，最后闭合子路径。

## `closeSubpath()`

关闭并完成当前子路径。

```swift
mutating func closeSubpath()
```

从当前点到当前子路径的起始点附加一条线，并结束子路径。

关闭子路径后，你的应用程序可以开始一个新的子路径，而无需先调用 `move(to:)`。在这种情况下，会隐式创建一个新的子路径，其起始点和当前点等于前一个子路径的起始点。


## `addRoundedRect(in:cornerSize:style:transform:)`

向路径添加一个圆角矩形。

```swift
mutating func addRoundedRect(
    in rect: CGRect,
    cornerSize: CGSize,
    style: RoundedCornerStyle = .continuous,
    transform: CGAffineTransform = .identity
)
```

- `rect`：一个矩形，在用户空间坐标中指定。
- `cornerSize`：角的大小，在用户空间坐标中指定。
- `style`：角的样式。如果未指定，则默认为连续样式。
- `transform`：在将矩形添加到路径之前应用的仿射变换。如果未指定，则默认为恒等变换。

这是一个便利函数，它将一个圆角矩形添加到路径中，首先移动到右边缘的中心，然后逆时针添加线条和曲线来创建圆角矩形，最后闭合子路径。

## `intersection(_:eoFill:)`

返回一个新路径，该路径具有两个路径共有的填充区域。

```swift
func intersection(
    _ other: Path,
    eoFill: Bool = false
) -> Path
```

- `other`：要相交的路径。
- `eoFill`：是否使用奇偶规则来确定哪些区域视为路径的内部（如果为 `true`），还是使用非零规则（如果为 `false`）。

生成的路径的填充区域是两个路径的填充区域的重叠区域。这可用于将路径的填充裁剪到蒙版。

任何未闭合的子路径都被假定为已闭合。使用奇偶填充规则或非零填充规则填充此路径的结果是相同的。


## `lineIntersection(_:eoFill:)`

返回一个新路径，该路径具有与此路径重叠的给定路径的填充区域的线条。

```swift
func lineIntersection(
    _ other: Path,
    eoFill: Bool = false
) -> Path
```

生成的路径的线条是此路径与其他路径的填充区域重叠的线条。

被裁剪的相交子路径创建开放子路径。不与其他路径相交的闭合子路径保持闭合。

## `lineSubtraction(_:eoFill:)`

返回一个新路径，该路径具有与此路径不重叠的给定路径的填充区域的线条。

```swift
func lineSubtraction(
    _ other: Path,
    eoFill: Bool = false
) -> Path
```

## `normalized(eoFill:)`

返回此路径的一个新的弱简单副本。

```swift
func normalized(eoFill: Bool = true) -> Path
```

返回的路径是弱简单路径，没有自相交，并且具有归一化的方向。使用奇偶填充规则或非零填充规则填充此路径的结果是相同的。

## `subtracting(_:eoFill:)`

返回一个新路径，该路径包含此路径中不在给定路径中的填充区域。

```swift
func subtracting(
    _ other: Path,
    eoFill: Bool = false
) -> Path
```

生成的路径的填充区域是此路径的填充区域减去其他路径的填充区域。

任何未闭合的子路径都被假定为已闭合。使用奇偶填充规则或非零填充规则填充此路径的结果是相同的。


## `symmetricDifference(_:eoFill:)`

返回一个新路径，该路径的填充区域要么来自此路径，要么来自给定路径，但不能同时来自两者。

生成的路径的填充区域是包含在此路径或其他路径中的填充区域，但不是两者都包含。

任何未闭合的子路径都被假定为已闭合。使用奇偶填充规则或非零填充规则填充此路径的结果是相同的。

## `union(_:eoFill:)`

返回一个新路径，该路径的填充区域在此路径或给定路径中。

```swift
func union(
    _ other: Path,
    eoFill: Bool = false
) -> Path
```

生成的路径的填充区域是两个路径的填充区域的组合。

任何未闭合的子路径都被假定为已闭合。使用奇偶填充规则或非零填充规则填充此路径的结果是相同的。

## `forEach(_:)`

对路径中的每个元素调用 `body`。

```swift
func forEach(_ body: (Path.Element) -> Void)
```

## `strokedPath(_:)`

使用 `style` 定义如何创建描边轮廓，返回路径的描边副本。

```swift
func strokedPath(_ style: StrokeStyle) -> Path
```