# Positioning and sizing a window <Badge type="tip" text="macOS" />

## `DefaultPosition`

```swift
func defaultPosition(_ position: UnitPoint) -> some Scene
```

当你的应用第一次从特定场景声明打开窗口时，系统默认将该窗口放置在屏幕的中心。 对于支持多个同时窗口的场景类型，系统会稍微偏移每个附加窗口，以避免完全遮挡现有窗口。


你可以通过应用指示窗口相对于屏幕边界的放置位置的场景修改器来覆盖第一个窗口的默认位置。

例如，你可以请求系统在屏幕的底部尾角放置一个新窗口：

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .defaultPosition(.bottomTrailing)
    }
}
```

![DefaultPosition](../../images/DefaultPosition.png)

还可以自定义 `UnitPoint`：

```swift
WindowGroup {
    ContentView()
}
.defaultPosition(UnitPoint(x: 0.25, y: 0.5))
```

影响以下窗口：

- `WindowGroup`
- `Window`
- `DocumentGroup`
- `Settings`

::: warning 注意
这个只作为首次初始的默认值。后续再次打开窗口时，窗口会恢复到上次的位置，比如你拖动了窗口到左上角，重新打开后也会出现在左上角，而不是默认位置了。
:::

## `DefaultSize`

设置窗口的默认大小。

影响以下窗口：

- `WindowGroup`
- `Window`
- `DocumentGroup`
- `Settings`

::: warning 注意
你指定的大小仅作为窗口首次出现时的默认大小，之后可以使用系统提供的界面控件来自定义的调整窗口大小，再次打开窗口时，系统将窗口恢复到最近的大小，而不是默认大小。
:::

### `defaultSize(_:)`

```swift
func defaultSize(_ size: CGSize) -> some Scene
```


```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .defaultSize(CGSize(width: 600, height: 400))
    }
}
```

![DefaultSize](../../images/DefaultSize.png)


### `defaultSize(_:)`  <Badge type="info" text="visionOS" />

```swift
func defaultSize(_ size: Size3D) -> some Scene
```



```swift
WindowGroup {
    ContentView()
}
.windowStyle(.volumetric)
.defaultSize(Size3D(width: 600, height: 400, depth: 600))
```

每个参数均以点为单位指定，`volumetric` 场景的大小在创建后是不可变的。
此修饰符仅影响 `volumetric` 样式的窗口。


### `defaultSize(width:height:)`


```swift
func defaultSize(
    width: CGFloat,
    height: CGFloat
) -> some Scene
```


```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .defaultSize(width: 600, height: 400)
    }
}
```


### `defaultSize(width:height:depth:)` <Badge type="info" text="visionOS" />

```swift
func defaultSize(
    width: CGFloat,
    height: CGFloat,
    depth: CGFloat
) -> some Scene
```

```swift
WindowGroup {
    ContentView()
}
.windowStyle(.volumetric)
.defaultSize(width: 600, height: 400, depth: 600)
```


### `defaultSize(_:in:)` <Badge type="info" text="visionOS" />


```swift
func defaultSize(
    _ size: Size3D,
    in unit: UnitLength
) -> some Scene
```


```swift
WindowGroup {
    ContentView()
}
.windowStyle(.volumetric)
.defaultSize(Size3D(width: 1, height: 1, depth: 0.5), in: .meters)
```

### `defaultSize(width:height:depth:in:)` <Badge type="info" text="visionOS" />

```swift
func defaultSize(
    width: CGFloat,
    height: CGFloat,
    depth: CGFloat,
    in unit: UnitLength
) -> some Scene
```


```swift
WindowGroup {
    ContentView()
}
.windowStyle(.volumetric)
.defaultSize(width: 1, height: 1, depth: 0.5, in: .meters)
```


## `WindowResizability`

设置用于窗口的可调整大小类型。


```swift
func windowResizability(_ resizability: WindowResizability) -> some Scene
```

你指定的值用于指示系统对从该场景创建的窗口施加最小和最大尺寸限制的策略。


### `contentSize`

基于窗口内容的匹配尺寸。

- 与窗口内容的最小尺寸相匹配的最小尺寸。
- 与窗口内容的最大尺寸相匹配的最大尺寸。

就是说一旦设置了这个阈值，你能够调整的最大最小范围就确定了，你不能将窗口设置更大也不能更小。

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(
                    minWidth: 100, maxWidth: 400,
                    minHeight: 100, maxHeight: 400)
        }
        .windowResizability(.contentSize)
    }
}
```

<video src="../../video/WindowResizabilityContentSize.mp4" controls="controls"></video>


### `contentMinSize`

基于窗口内容的最小尺寸。

- 与窗口内容的最小尺寸相匹配。
- 没有最大尺寸。

一般用于有最小尺寸限制，但是无最大尺寸限制的场景。

<video src="../../video/WindowResizabilityContentMinSize.mp4" controls="controls"></video>
