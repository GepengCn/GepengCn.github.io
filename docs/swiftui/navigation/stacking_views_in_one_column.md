# Stacking views in one column

## `NavigationStack`

显示根视图并使你能够在根视图上呈现其他视图的视图。

```swift
@MainActor
struct NavigationStack<Data, Root> where Root : View
```

使用导航堆栈在根视图上呈现视图堆栈。

可以通过点击导航链接将视图添加到堆栈顶部，并使用适合平台的内置控件（例如「后退」按钮或滑动手势）删除视图。

堆栈始终显示最近添加的尚未删除的视图，并且不允许删除根视图。

要创建导航链接，需通过在堆栈的视图层次结构中添加 `navigationDestination(for:destination:)` 修饰符将视图与数据类型关联起来。然后初始化一个呈现同类数据实例的 `NavigationLink`。

以下堆栈显示导航链接的 `ParkDetails` 视图，其中显示 `Park` 类型的数据：

```swift
NavigationStack {
    List(parks) { park in
        NavigationLink(park.name, value: park)
    }
    .navigationDestination(for: Park.self) { park in
        ParkDetails(park: park)
    }
}
```

在此示例中，列表充当根视图并且始终存在。

从列表中选择导航链接会将 `ParkDetails` 视图添加到堆栈中，以便它覆盖列表。

向后导航将删除详细信息视图并再次显示列表，当堆栈为空并且根视图（即列表）可见时，系统将禁用向后导航控件。

### Manage navigation state

默认情况下，导航堆栈管理状态以跟踪堆栈上的视图。

但是，你的代码可以通过绑定到您创建的数据值集合来初始化堆栈来共享状态控制。

堆栈在将视图添加到堆栈时将项目添加到集合中，并在删除视图时删除项目。

例如，你可以创建一个 `State` 属性来管理公园详细信息视图的导航：

```swift
@State private var presentedParks: [Park] = []
```

将状态初始化为空数组表示堆栈没有视图。

当你使用 `init(path:root:)` 初始值设定项创建堆栈时，使用美元符号 ( `$` ) 前缀提供对此状态属性的绑定：

```swift
NavigationStack(path: $presentedParks) {
    List(parks) { park in
        NavigationLink(park.name, value: park)
    }
    .navigationDestination(for: Park.self) { park in
        ParkDetails(park: park)
    }
}
```

与之前一样，当有人点击公园的导航链接时，堆栈会使用关联的公园数据显示 `ParkDetails` 视图。

但是，现在堆栈还将公园数据放入 `presentedParks` 数组中，你的代码可以观察该数组以读取当前堆栈状态，它还可以修改数组以更改堆栈上的视图。

例如，你可以创建一个方法来配置具有一组特定公园的堆栈：

```swift
func showParks() {
    presentedParks = [Park("Yosemite"), Park("Sequoia")]
}
```


`showParks` 方法将堆栈的显示替换为显示 `Sequoia`（新的 `presentedParks` 数组中的最后一项）详细信息的视图。

从该视图返回会从数组中删除 `Sequoia`，从而显示一个显示 `Yosemite` 详细信息的视图。

使用路径支持深层链接、状态恢复或其他类型的编程导航。

### Navigate to different view types

要创建可以呈现多种视图的堆栈，你可以在堆栈的视图层次结构中添加多个 `navigationDestination(for:destination:)` 修饰符，每个修饰符呈现不同的数据类型。

该堆栈根据各自的数据类型将导航链接与导航目的地进行匹配。

要创建包含多种数据的编程导航路径，你可以使用 `NavigationPath` 实例作为路径。


## `NavigationDestination`

### `navigationDestination(for:destination:)`

```swift
func navigationDestination<D, C>(
    for data: D.Type,
    @ViewBuilder destination: @escaping (D) -> C
) -> some View where D : Hashable, C : View
```
将目标视图与呈现的数据类型相关联，以便在导航堆栈中使用。

```swift
NavigationStack {
    List {
        NavigationLink("Mint", value: Color.mint)
        NavigationLink("Pink", value: Color.pink)
        NavigationLink("Teal", value: Color.teal)
    }
    .navigationDestination(for: Color.self) { color in
        ColorDetail(color: color)
    }
    .navigationTitle("Colors")
}
```

如果需要显示不止一种数据，你可以向堆栈添加多个导航目标修饰符。

::: danger 注意
不要将导航目标修饰符放在「惰性」容器内，例如 `List` 或 `LazyVStack`。

这些容器仅在需要在屏幕上渲染时创建子视图，在这些容器外部添加导航目的地修饰符，以便导航堆栈始终可以看到目的地。
:::

### `navigationDestination(isPresented:destination:)`

```swift
func navigationDestination<V>(
    isPresented: Binding<Bool>,
    @ViewBuilder destination: () -> V
) -> some View where V : View
```

将目标视图与可用于将视图推送到 `NavigationStack` 的绑定相关联。


```swift
@State private var showDetails = false
var favoriteColor: Color


NavigationStack {
    VStack {
        Circle()
            .fill(favoriteColor)
        Button("Show details") {
            showDetails = true
        }
    }
    .navigationDestination(isPresented: $showDetails) {
        ColorDetail(color: favoriteColor)
    }
    .navigationTitle("My Favorite Color")
}
```

### `navigationDestination(item:destination:)`

```swift
func navigationDestination<D, C>(
    item: Binding<Optional<D>>,
    @ViewBuilder destination: @escaping (D) -> C
) -> some View where D : Hashable, C : View
```

将目标视图与绑定值关联以在导航堆栈或导航拆分视图中使用。

```swift
@State private var colorShown: Color?


NavigationSplitView {
    List {
        Button("Mint") { colorShown = .mint }
        Button("Pink") { colorShown = .pink }
        Button("Teal") { colorShown = .teal }
    }
    .navigationDestination(item: $colorShown) { color in
        ColorDetail(color: color)
    }
} detail: {
    Text("Select a color")
}
```


当使用该应用程序的人点击 `Mint` 按钮时，薄荷色会显示在详细信息中，并且 `colorShown` 会获取值 `Color.mint`。

你可以通过将 `colorShown` 设置回 `nil` 来重置导航拆分视图以显示消息「`Select a color`」。

如果需要显示不止一种数据，你可以向堆栈添加多个导航目标修饰符。