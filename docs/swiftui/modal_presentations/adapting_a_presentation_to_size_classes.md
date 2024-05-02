# Adapting a presentation to size classes

## `presentationCompactAdaptation(horizontal:vertical:)`

指定如何自适应水平和垂直紧凑尺寸类别。

```swift
func presentationCompactAdaptation(
    horizontal horizontalAdaptation: PresentationAdaptation,
    vertical verticalAdaptation: PresentationAdaptation
) -> some View
```

- `horizontalAdaptation`: 适合在水平紧凑尺寸等级中使用。
- `verticalAdaptation`: 适合在垂直紧凑尺寸类别中使用。 即是水平也是垂直的紧凑的尺寸类型，SwiftUI 使用 `verticalAdaptation` 值。

有些 `presentation` 会根据上下文调整其外观。

例如，水平方向使用 `popover` 垂直（默认）方向使用 `sheet`。

使用此修饰符来指示自定义适应首选项。

```swift{11-13}
struct ContentView: View {
    @State private var showInfo = false

    var body: some View {
        Button("View Info") {
            showInfo = true
        }
        .popover(isPresented: $showInfo) {
            InfoView()
                .presentationCompactAdaptation(
                    horizontal: .popover,
                    vertical: .sheet)
        }
    }
}
```

<video src="../../video/PresentationCompactAdaptation.mp4" controls="controls"></video>


::: tip 提示

如果要为两个维度指定相同的自适应效果，可以改用 `presentationCompactAdaptation(_:)` 方法。
:::

## `presentationCompactAdaptation(_:)`

指定如何自适应紧凑尺寸类别。

```swift
func presentationCompactAdaptation(_ adaptation: PresentationAdaptation) -> some View
```

有些 `presentation` 会根据上下文调整其外观。

例如，默认情况下，垂直紧凑视图上的 `sheet` 使用全屏覆盖外观，使用此修饰符来指示自定义适应首选项。

例如，以下代码使用 `none` 来请求系统不必在垂直方向上使用全屏覆盖外观：

```swift
struct ContentView: View {

    @State private var showSettings = false

    var body: some View {
        Button("Show Popover") {
            showSettings.toggle()
        }
        .sheet(isPresented: $showSettings) {
            Text("Hello SwiftUI")
                .padding()
                .presentationCompactAdaptation(.none)
        }
    }
}
```

<video src="../../video/PresentationCompactAdaptationBoth.mp4" controls="controls"></video>
