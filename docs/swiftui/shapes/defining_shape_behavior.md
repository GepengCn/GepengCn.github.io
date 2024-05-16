# 定义形状行为

## `AnyShape`

类型擦除的形状值。

```swift
@frozen
struct AnyShape
```

你可以使用此类型在形状类型之间动态切换：

```swift
struct MyClippedView: View {
    var isCircular: Bool


    var body: some View {
        OtherView().clipShape(isCircular ?
            AnyShape(Circle()) : AnyShape(Capsule()))
    }
}
```

## `StrokeStyle`

描边的特征，用于跟踪路径。

```swift
@frozen
struct StrokeStyle
```

### `init(lineWidth:lineCap:lineJoin:miterLimit:dash:dashPhase:)`

从给定的组件创建新的描边样式。

```swift
init(
    lineWidth: CGFloat = 1,
    lineCap: CGLineCap = .butt,
    lineJoin: CGLineJoin = .miter,
    miterLimit: CGFloat = 10,
    dash: [CGFloat] = [CGFloat](),
    dashPhase: CGFloat = 0
)
```

- `lineWidth`：线段的宽度。
- `lineCap`：线段的端点样式。
- `lineJoin`：线段的连接类型。
- `miterLimit`：用于确定在连接点处是使用斜接还是使用平接的阈值。
- `dash`：用于制作虚线的绘制和未绘制线段的长度。
- `dashPhase`：线条开始进入虚线模式的距离。

## `StrokeShapeView`

一个绘制其形状轮廓的形状提供程序。

```swift
@frozen
struct StrokeShapeView<Content, Style, Background> where Content : Shape, Style : ShapeStyle, Background : View
```


```swift
init(
    shape: Content,
    style: Style,
    strokeStyle: StrokeStyle,
    isAntialiased: Bool,
    background: Background
)
```

- `background`: 此视图下方显示的背景。
- `isAntialiased`: 此形状是否应进行抗锯齿绘制。
- `shape`: 此类型绘制并为其他绘图操作提供的形状。
- `strokeStyle`: 绘制此视图形状时使用的描边样式。
- `style`: 描边此视图形状的样式。

## `containerShape(_:)`

设置此视图中任何容器相对形状要使用的容器形状。

```swift
func containerShape<T>(_ shape: T) -> some View where T : InsettableShape
```

下面的示例定义了一个视图，该视图使用圆角矩形背景和相同的容器形状显示其内容。内容中的任何 `ContainerRelativeShape` 都根据需要与该容器插图中的圆角矩形形状匹配。


```swift
struct PlatterContainer<Content: View> : View {
    @ViewBuilder var content: Content
    var body: some View {
        content
            .padding()
            .containerShape(shape)
            .background(shape.fill(.background))
    }
    var shape: RoundedRectangle { RoundedRectangle(cornerRadius: 20) }
}
```