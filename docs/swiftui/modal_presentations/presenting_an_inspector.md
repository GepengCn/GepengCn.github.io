# Presenting an inspector

## `inspector(isPresented:content:)`

在视图层次结构中的指定位置插入检查器。


```swift
func inspector<V>(
    isPresented: Binding<Bool>,
    @ViewBuilder content: () -> V
) -> some View where V : View
```


应用此修饰符来声明一个与上下文相关的展示方式的检查器。

例如，一个检查器可以在水平常规尺寸类中作为尾列展示，但在水平紧凑尺寸类中调整为一个表格。


```swift
struct ShapeEditor: View {
    
    @State var presented: Bool = false
    
    var body: some View {
        RoundedRectangle(cornerRadius: 50)
            .fill(.green)
            .frame(width: 300, height: 200)
            .inspector(isPresented: $presented) {
                Text("圆角: 50, 宽: 300, 高: 200")
            }.onTapGesture {
                presented.toggle()
            }
    }
}
```

iOS

<video src="../../video/Inspector.mp4" controls="controls"></video>

padOS

<video src="../../video/InspectorPad.mp4" controls="controls"></video>

macOS

<video src="../../video/InspectorMac.mp4" controls="controls"></video>


## `inspectorColumnWidth(_:)`

设置此视图所在的检查器作为尾列展示时的固定首选宽度。

```swift
func inspectorColumnWidth(_ width: CGFloat) -> some View
```

在 `inspector(isPresented:content:)` 的内容上应用此修饰符，以指定尾随列的固定首选宽度。如果你需要指定一个灵活的宽度，请使用 `inspectorColumnWidth(min:ideal:max:)`。

下面的示例展示了一个编辑器界面，其中包含一个尾随列的检查器，该检查器具有 $500$ 点的固定宽度。该示例还使用了 `interactiveDismissDisabled(_:)` 来防止检查器因用户操作（如拖动分隔条）而被折叠。


```swift
struct ShapeEditor: View {
    @State var presented: Bool = false
    
    var body: some View {
        RoundedRectangle(cornerRadius: 50)
            .fill(.green)
            .frame(width: 300, height: 200)
            .inspector(isPresented: $presented) {
                Text("圆角: 50, 宽: 300, 高: 200")
                    .inspectorColumnWidth(500)
                    .interactiveDismissDisabled()
            }
            
            .onTapGesture {
                presented.toggle()
            }
    }
}
```

<video src="../../video/InspectorColumnWidth.mp4" controls="controls"></video>


## `inspectorColumnWidth(min:ideal:max:)`

在尾随列展示中为检查器设置一个灵活的首选宽度。

- `min` : 尾随列检查器允许的最小宽度
- `ideal` : 在没有状态恢复的情况下，检查器的初始宽度。在 macOS 上，当用户双击检查器前缘的分隔条时，`ideal` 会影响结果宽度，点击分隔条进行调整。
- `max` : 尾随列检查器允许的最大宽度

在 `inspector(isPresented:content:)` 的内容上应用此修饰符，以指定列的首选灵活宽度。如果你需要指定一个固定宽度，请使用 `inspectorColumnWidth(_:)`。

下面的示例展示了一个编辑器界面，其中包含一个检查器，作为尾随列展示时，其首选宽度为 $225$ 点，最大宽度为 $400$ 点，最小宽度为 $150$ 点，低于此宽度时会折叠（如果允许的话）。

```swift
struct ShapeEditor: View {
    @State var presented: Bool = false
    
    var body: some View {
        RoundedRectangle(cornerRadius: 50)
            .fill(.green)
            .frame(width: 300, height: 200)
            .inspector(isPresented: $presented) {
                Text("圆角: 50, 宽: 300, 高: 200")
                    .inspectorColumnWidth(min: 150, ideal: 225, max: 400)
                    .interactiveDismissDisabled()
            }
            
            .onTapGesture {
                presented.toggle()
            }
    }
}
```

<video src="../../video/InspectorColumnWidthRange.mp4" controls="controls"></video>
