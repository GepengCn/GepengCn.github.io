# Showing a sheet, cover, or popover

## `sheet(isPresented:onDismiss:content:)`

当你提供的布尔值的绑定为 `true` 时，显示一个工作表。

```swift
func sheet<Content>(
    isPresented: Binding<Bool>,
    onDismiss: (() -> Void)? = nil,
    @ViewBuilder content: @escaping () -> Content
) -> some View where Content : View
```

如果你希望在你提供的布尔值为 `true` 时向用户呈现模态视图，请使用此方法。

当用户通过点击「显示许可协议」按钮切换 `isShowingSheet` 变量时，下面的示例显示软件许可协议模型的模式视图：

```swift
struct ContentView: View {
    
    @State var isShowingSheet: Bool = false
    
    func didDismiss() {
        // Handle the dismissing action.
    }
    
    var body: some View {
        Button(action: {
            isShowingSheet.toggle()
        }) {
            Text("Show License Agreement")
        }
        .sheet(isPresented: $isShowingSheet,
            onDismiss: didDismiss) {
            VStack {
                Text("License Agreement")
                    .font(.title)
                    .padding(50)
                Text("""
                        Terms and conditions go here.
                    """)
                .padding(50)
                Button("Dismiss",
                    action: { isShowingSheet.toggle() })
            }
        }
    }
}
```

<video src="../../video/Sheet.mp4" controls="controls"></video>


在垂直紧凑的环境中，例如横向的 iPhone，`sheet` 会自动调整为全屏覆盖。


<video src="../../video/SheetLandscape.mp4" controls="controls"></video>

使用 `presentationCompactAdaptation(_:)` 或 `presentationCompactAdaptation(horizontal:vertical:)` 修饰符来覆盖此行为。


```swift{13}
.sheet(isPresented: $isShowingSheet,
            onDismiss: didDismiss) {
    VStack {
        Text("License Agreement")
            .font(.title)
            .padding(50)
        Text("""
                Terms and conditions go here.
            """)
        .padding(50)
        Button("Dismiss",
            action: { isShowingSheet.toggle() })
    }.presentationCompactAdaptation(.sheet)
}
```
<video src="../../video/SheetLandscapeOveride.mp4" controls="controls"></video>


## `sheet(item:onDismiss:content:)`

使用给定 `item` 作为内容的数据源来显示工作表。

::: tip `item`
绑定到工作表的可选事实来源。

当 `item` 非空时，系统将 `item` 的内容传递给修饰符的闭包。

你可以在你创建的工作表中显示此内容，系统会向用户显示该工作表。

如果项目发生变化，系统会取消该工作表并使用相同的流程将其替换为新工作表。
:::

```swift
func sheet<Item, Content>(
    item: Binding<Item?>,
    onDismiss: (() -> Void)? = nil,
    @ViewBuilder content: @escaping (Item) -> Content
) -> some View where Item : Identifiable, Content : View
```

当你需要呈现包含来自自定义数据源的内容的模式视图时，可以使用此方法。

下面的示例显示了一个自定义数据源 `InventoryItem`，内容闭包使用它来填充操作表向用户显示的显示内容：

```swift
struct ContentView: View {
    
    @State private var sheetDetail: InventoryItem?
    
    func didDismiss() {
        // Handle the dismissing action.
    }
    
    struct InventoryItem: Identifiable {
        var id: String
        let partNumber: String
        let quantity: Int
        let name: String
    }
    
    var body: some View {
        Button("Show Part Details") {
            sheetDetail = InventoryItem(
                id: "0123456789",
                partNumber: "Z-1234A",
                quantity: 100,
                name: "Widget")
        }
        .sheet(item: $sheetDetail,
            onDismiss: didDismiss) { detail in
            VStack(alignment: .leading, spacing: 20) {
                Text("Part Number: \(detail.partNumber)")
                Text("Name: \(detail.name)")
                Text("Quantity On-Hand: \(detail.quantity)")
            }
            .onTapGesture {
                sheetDetail = nil
            }
        }
    }
}
```
<video src="../../video/ItemSheet.mp4" controls="controls"></video>


## `fullScreenCover(isPresented:onDismiss:content:)`

当绑定到你提供的布尔值为 `true` 时，呈现一个模式视图，该视图覆盖尽可能多的屏幕。

```swift
func fullScreenCover<Content>(
    isPresented: Binding<Bool>,
    onDismiss: (() -> Void)? = nil,
    @ViewBuilder content: @escaping () -> Content
) -> some View where Content : View
```

使用此方法可以显示覆盖尽可能多的屏幕的模式视图。

下面的示例在用户切换 `isPresenting` 绑定的值时显示自定义视图：


```swift
struct ContentView: View {
    
    @State private var isPresenting = false
    
    func didDismiss() {
        // Handle the dismissing action.
    }

    var body: some View {
        Button("Present Full-Screen Cover") {
            isPresenting.toggle()
        }
        .fullScreenCover(isPresented: $isPresenting,
                        onDismiss: didDismiss) {
            VStack {
                Text("A full-screen modal view.")
                    .font(.title)
                Text("Tap to Dismiss")
            }
            .onTapGesture {
                isPresenting.toggle()
            }
            .foregroundColor(.white)
            .frame(maxWidth: .infinity,
                maxHeight: .infinity)
            .background(Color.blue)
            .ignoresSafeArea(edges: .all)
        }
    }
}
```

<video src="../../video/FullScreenCover.mp4" controls="controls"></video>


## `fullScreenCover(item:onDismiss:content:)`

使用 `item` 作为工作表内容的数据源，呈现一个模式视图，该视图覆盖尽可能多的屏幕。

```swift
func fullScreenCover<Item, Content>(
    item: Binding<Item?>,
    onDismiss: (() -> Void)? = nil,
    @ViewBuilder content: @escaping (Item) -> Content
) -> some View where Item : Identifiable, Content : View
```


使用此方法可以显示覆盖尽可能多的屏幕的模式视图。

在下面的示例中，自定义结构 - `CoverData` - 提供全屏视图的数据，以在用户点击「`Present Full-Screen Cover With Data`」按钮时在内容闭包中显示：

```swift
struct ContentView: View {
    
    @State private var coverData: CoverData?
    
    struct CoverData: Identifiable {
        var id: String {
            return body
        }
        let body: String
    }
    
    func didDismiss() {
        // Handle the dismissing action.
    }

    var body: some View {
        Button("Present Full-Screen Cover With Data") {
            coverData = CoverData(body: "Custom Data")
        }
        .fullScreenCover(item: $coverData,
                        onDismiss: didDismiss) { details in
            VStack(spacing: 20) {
                Text("\(details.body) set nil")
            }
            .onTapGesture {
                coverData = nil
            }
        }
    }
}
```

<video src="../../video/ItemFullScreenCover.mp4" controls="controls"></video>

## `popover(isPresented:attachmentAnchor:arrowEdge:content:)`

当给定条件为真时显示弹出窗口。

```swift
func popover<Content>(
    isPresented: Binding<Bool>,
    attachmentAnchor: PopoverAttachmentAnchor = .rect(.bounds),
    arrowEdge: Edge = .top,
    @ViewBuilder content: @escaping () -> Content
) -> some View where Content : View
```

使用此方法显示一个弹出窗口，其内容是你在绑定布尔变量为 `true` 时提供的 SwiftUI 视图。

- `isPresented`: 绑定到布尔值，确定是否显示从修饰符的内容闭包返回的弹出框内容。
- `attachmentAnchor`: 定义弹出框连接点的定位锚点，默认为边界。
- `arrowEdge`: `AttachmentAnchor` 的边缘定义了 macOS 中弹出框箭头的位置。 默认为 `Edge.top`，iOS 忽略此参数。
- `content`: 返回弹出窗口内容的闭包。


在下面的示例中，只要用户通过按「`Show Popover`」按钮切换 `isShowingPopover` 状态变量，就会显示弹出窗口：

```swift
struct ContentView: View {
    
    @State private var isShowingPopover = false

    var body: some View {
        Button("Show Popover") {
            self.isShowingPopover = true
        }
        .popover(isPresented: $isShowingPopover) {
            Text("Popover Content")
                .padding()
            }
    }
}
```

<video src="../../video/Popover.mp4" controls="controls"></video>


## `popover(item:attachmentAnchor:arrowEdge:content:)`

使用 `item` 作为弹出窗口内容的数据源来呈现弹出窗口。

```swift
func popover<Item, Content>(
    item: Binding<Item?>,
    attachmentAnchor: PopoverAttachmentAnchor = .rect(.bounds),
    arrowEdge: Edge = .top,
    @ViewBuilder content: @escaping (Item) -> Content
) -> some View where Item : Identifiable, Content : View
```

当你需要呈现包含来自自定义数据源的内容的弹出窗口时，可以使用此方法。

下面的示例使用 `PopoverModel` 结构中的数据来填充弹出窗口向用户显示的内容闭包中的视图：

<video src="../../video/ItemPopover.mp4" controls="controls"></video>
