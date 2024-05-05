# Search

在你的应用程序中添加一个搜索栏，首先需要创建和管理一个用于保存搜索文本的存储，并可以选择性地为独立的搜索关键词（即「令牌」）提供存储空间。接下来，通过在应用内的某个视图上应用 `searchable` 视图修饰符，将此存储空间与搜索栏进行绑定。

当用户与搜索框交互时，他们实际上是在修改底层存储，从而改变搜索参数。相应地，你的应用程序会更新其界面的其他部分。为了增强搜索互动体验，你还可以：

- 在搜索过程中为文本和令牌提供搜索建议。
- 实现搜索范围功能，帮助用户缩小搜索范围。
- 检测用户何时激活搜索字段，并利用环境值以编程方式关闭搜索字段。


## Searching your app’s data model


### `searchable(text:placement:prompt:)`

将此视图标记为可搜索，这将配置搜索字段的显示。 

换句话说，在 SwiftUI 中，当你将 `searchable` 视图修饰符应用到一个视图时，这个视图将会被配置为包含一个搜索字段，允许用户输入搜索内容，并且可以根据搜索内容动态更新相关界面或数据。这个修饰符可以帮助你在应用中轻松实现搜索功能。


```swift
func searchable(
    text: Binding<String>,
    placement: SearchFieldPlacement = .automatic,
    prompt: Text? = nil
) -> some View
```

例如:

```swift
struct ContentView: View {

    @State var text: String = ""
    
    var body: some View {
        
        NavigationStack {
            List(0..<20) {
                Text("Row \($0)")
            }.navigationTitle("100 Rows")
                .searchable(text: $text)
        }
    }
    
}
```

![Searchable](../images/Searchable.png)


### `searchable(text:tokens:placement:prompt:token:)`

```swift
func searchable<C, T>(
    text: Binding<String>,
    tokens: Binding<C>,
    placement: SearchFieldPlacement = .automatic,
    prompt: LocalizedStringKey,
    @ViewBuilder token: @escaping (C.Element) -> T
) -> some View where C : RandomAccessCollection, C : RangeReplaceableCollection, T : View, C.Element : Identifiable
```


确实，在使用诸如 `searchable(text:tokens:placement:prompt:token:)` 这样带有 `tokens` 参数的可搜索修饰符时，除了搜索字符串之外，搜索字段还可以显示令牌（ `tokens` ）。这些令牌通常用于多值筛选或者收藏常用查询等功能。

例如，要创建一组水果类型的令牌，你可以首先定义一个遵循 `Identifiable` 协议的枚举类型，然后实例化这个枚举集合：

```swift
enum FruitToken: String, Identifiable, Hashable, CaseIterable {
    case apple
    case pear
    case banana
    var id: Self { self }
}
```

接着，添加一个新的发布属性来存储令牌集合：
```swift
@State var tokens: [FruitToken] = [.apple, .banana, .pear]
```

要显示令牌，请向搜索修饰符的 `tokens` 输入参数提供一个对令牌数组的绑定，并通过 `token` 闭包描述如何绘制每个令牌。在该闭包内部，根据输入返回代表该令牌的视图。例如，你可以使用 `Text` 视图来表示每个令牌：


```swift
NavigationStack {
    List(0..<20) {
        Text("Row \($0)")
    }.navigationTitle("100 Rows")
        .searchable(text: $text, tokens: $tokens) { token in
            switch token {
                case .apple: Text("Apple")
                case .pear: Text("Pear")
                case .banana: Text("Banana")
            }
        }
}
```

![SearchableTokens](../images/SearchableTokens.png)


### `SearchFieldPlacement`


在视图层级中搜索字段的位置。

```swift
struct SearchFieldPlacement
```


#### `automatic`

搜索字段的位置依据不同平台有所差异：

在 iOS、iPadOS 和 macOS 平台上，搜索字段会出现在工具栏中。

![Searchable](../images/Searchable.png)

而在 tvOS 和 watchOS 上，搜索字段则会与其内容一起内联显示。

![SearchableWatchOS](../images/SearchableWatchOS.png)

#### `navigationBarDrawer`

搜索字段会出现在导航栏中。

该搜索字段位于任何导航栏标题下方，并采用自动显示模式来设置何时隐藏搜索区域。若要选择其他显示模式，可以改用 `navigationBarDrawer(displayMode:)` 方法。

```swift
NavigationStack {
    List(0..<20) {
        Text("Row \($0)")
    }.navigationTitle("100 Rows")
        .searchable(text: $text, placement: .navigationBarDrawer(displayMode: .always))
}
```
<video src="../video/NavigationBarDrawer.mp4" controls="controls"></video>

#### `sidebar`

搜索字段出现在导航视图的侧边栏中。

搜索字段的确切位置取决于所使用的平台：

在 iOS 和 iPadOS 中，搜索字段会出现在与侧边栏关联的导航栏区域。

```swift
struct ContentView: View {

    @State var text: String = ""
    
    var body: some View {
        
        NavigationSplitView {
            Text("Sidebar").searchable(text: $text, placement: .automatic)
        } detail: {
            Text("Detail")
                
        }
    }
}
```

<video src="../video/SearchableSidebar.mp4" controls="controls"></video>

而在 macOS 中，搜索字段则会与侧边栏的内容内联显示。

![SearchableSidebarMacOS](../images/SearchableSidebarMacOS.png)

如果当前环境中没有可用的侧边栏（例如，当您将搜索修饰符应用到除导航分割视图以外的其他视图时），SwiftUI 将自动确定搜索字段的位置。


#### `toolbar`

搜索字段会出现在工具栏中。

搜索字段的确切位置因平台而异：

在 iOS 和 watchOS 中，搜索字段会出现在导航栏下方，并可通过滚动显示出来。
    
在 iPadOS 中，搜索字段会出现在导航栏的右侧部分。

![SearchableToolbarPadOS](../images/SearchableToolbarPadOS.png)
    
在 macOS 中，搜索字段会出现在工具栏的尾部。

![SearchableToolbarMacOS](../images/SearchableToolbarMacOS.png)