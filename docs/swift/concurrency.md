# 并发

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/BCfptC7Nc6WLHA9ZSEQzzm"></iframe>

Swift 对于编写异步和并行代码提供了原生支持，这使得结构化的并发编程变得更为简洁和安全。


::: tip 异步代码

允许程序在执行长时间操作（如文件下载或解析）时，暂停这些操作，转而执行其他较短的任务，比如更新用户界面。

这种能力称为 「挂起」 和 「继续执行」，它在单线程中有效地管理任务，确保同一时间内只执行一段代码。
:::

::: tip 并行代码
指的是多个代码块能够同时执行。

例如，一个四核处理器的计算机可以在每个核上同时运行不同的代码块，从而加快处理速度。
:::

- 将这两种能力结合使用，Swift 程序可以更高效地处理多任务，例如在等待外部系统响应时暂停当前任务，同时执行其他计算任务。
- 这样不仅提升了程序的性能，还简化了内存管理，因为 Swift 的并发模型在编译时就能帮助开发者识别潜在的错误。

然而，引入并发和异步操作会增加编程的复杂性。


为此 Swift 提供了一些工具，如 `actor`，这些工具能安全地管理并发访问可变状态，减少错误发生的机会。

需要注意的是，仅仅为了加快程序运行速度而随意引入并发，不仅可能无益，反而可能增加代码的错误和复杂度。

::: warning 注意
在 Swift 的并发模型中，你不需要直接管理线程。相反，当你使用异步函数时，这些函数可以在执行过程中「交出」它们在某个线程上的运行权。

这样做的好处是，如果一个异步函数需要等待某些操作（例如，等待数据加载），它可以让出线程，允许其他异步函数使用这个线程继续运行。

重要的是要理解，当一个异步函数准备恢复执行时，它可能不会在同一个线程上运行。

Swift 的系统会自动为这些函数分配线程，这有助于简化程序设计，你不需要担心线程的具体管理问题，只需关注函数的逻辑即可。
:::

你当然也可以不用 Swift 原生支持去写并发的代码，只不过代码的可读性会下降。

比如，下面的这段代码会拉取一系列图片名称的列表，下载列表中的图片然后展示给用户：

```swift
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[0]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

在这个简单的案例中，由于代码中有一系列的 `completion handler`，最终你必须得使用嵌套闭包。

更加复杂的代码会产生更深的嵌套，从而使代码迅速变得臃肿起来。


## 定义和调用异步函数

::: tip 异步函数或方法在 Swift 中是一种特殊的函数，它们可以在执行过程中被暂停，并在适当的时候继续执行

这与传统的同步函数不同，后者只能一直运行直到完成任务、抛出错误或者永久停止返回。

异步函数不仅能完成这些功能，还能在等待外部资源如网络响应时暂停执行。

:::

要声明一个异步函数或方法，你可以在其返回类型前使用 `async` 关键字，类似于用 `throws` 关键字标记可能抛出错误的函数。

例如，下面的方法从图库中拉取图片名称列表：

```swift
func listPhotos(inGallery name: String) async -> [String] {
    let result = // 省略异步网络请求代码
    return result
}
```

::: info
对于那些既可能抛出错误又是异步的函数，应将 `async` 关键字置于 `throws` 之前。

:::

当调用一个异步函数时，你需要使用 `await` 关键字**来标记可能的挂起点**，这与使用 `try` 标记可能抛出错误的地方类似。




::: tip 挂起点
在使用 `await` 的地方，代码会暂停执行，等待异步方法的结果，这被称为挂起点，是代码执行可以暂停并在未来某一时刻恢复的地方。
:::

- 在异步函数中，代码只有在调用其他异步函数时才会挂起；
- 并且挂起操作是显式的，不会自动发生。



例如，下面的代码段展示了如何拉取图库中所有图片的名称并显示第一张图片：

```swift
let photoNames = await listPhotos(inGallery: "Summer Vacation")
let sortedNames = photoNames.sorted()
let name = sortedNames[0]
let photo = await downloadPhoto(named: name)
show(photo)
```

因为 `listPhotos(inGallery:)` 和 `downloadPhoto(named:)` 都需要时间来完成网络请求，将它们定义为异步函数允许程序在等待这些操作时继续执行其他任务。


::: info 执行顺序

1. 代码从第一行开始执行到第一个 `await`，调用 `listPhotos(inGallery:)` 函数并挂起当前代码块，等待函数返回。
2. 当代码挂起时，Swift 允许其他代码块继续执行。例如，可能有其他并行任务正在后台更新不同的图库。
3. 一旦 `listPhotos(inGallery:)` 函数返回，代码从挂起点恢复执行，继续处理返回的 `photoNames`。
4. `sortedNames` 和 `name` 的定义是同步执行的，因为它们不涉及异步调用，因此不会产生挂起点。
5. 当代码到达调用 `downloadPhoto(named:)` 的 `await` 时，再次挂起，等待照片下载完成。
6. 下载完成后，代码继续执行，显示下载的照片。

:::


::: tip 让出线程
`await` 关键字的使用，确保了在这些异步操作完成前，相关代码不会继续执行，从而使得其他任务能够有效利用等待时间。这种方式称为「让出线程」 `yielding the thread` ，即允许当前线程去执行其他任务，而不是空闲等待。

:::

此外，对于需要确保操作顺序的场景，例如将图片从一个图库移到另一个图库，这样的操作要求在移动操作完成前后保持**一致性**，**不能有其他并发操作**插入：

```swift
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
add(firstPhoto, toGallery: "Road Trip")
// 此时，firstPhoto暂时地同时存在于两个图库中
remove(firstPhoto, fromGallery: "Summer Vacation")
```

为此，**可以将这一系列操作「封装到一个同步函数中」，确保执行过程中不会被异步操作打断**：

```swift
func move(_ photoName: String, from source: String, to destination: String) {
    add(photoName, to: destination)
    remove(photoName, from: source)
}
// ...
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
move(firstPhoto, from: "Summer Vacation", to: "Road Trip")
```

在上例中，由于 `move(_:from:to:)` 函数为同步函数，能够保证它将不会包含潜在的挂起点。

::: danger
在未来，试图在该函数中写入并发代码将引发编译错误而非产生bug。
:::
::: warning `Task.sleep(_:)`

这个方法什么都没有做，只是等待不少于指定的时间（单位纳秒）后返回。

下面是使用 `sleep(until:clock:)` 方法模拟网络请求实现 `listPhotos(inGallery:)` 的一个版本：
```swift
func listPhotos(inGallery name: String) async throws -> [String] {
    try await Task.sleep(until: .now + .seconds(2), clock: .continuous) 
    return ["IMG001", "IMG99", "IMG0404"]
}
```


:::


## 异步序列

::: tip 如果你想「逐个」（ `one by one` ）处理异步产生的数据，可以使用异步序列

这种方法比起一次性返回所有数据，可以更有效地处理流式数据，例如从文件读取行或者网络请求返回的数据流。

:::

在上面的示例中，我们使用了一个 `for-await-in` 循环来遍历一个异步序列。

- 这个循环类似于常见的 `for-in` 循环，但它添加了 `await` 关键字，表示在遍历过程中可能会有挂起的操作。
- 这是因为每个新的元素获取可能需要等待，例如等待下一行文本从标准输入读取完毕。
- 这里的每次迭代都可能暂停执行，直到下一个元素准备就绪。

```swift{2}
let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

在这段代码中，我们监听标准输入，每接收到一行文本，就会输出这行文本。

使用 `for-await-in` 循环允许程序在数据准备就绪前暂时挂起，从而不会阻塞程序的其他部分。


::: tip `Sequence & AsyncSequence`
想让自己创建的类型使用 `for-in` 循环需要遵循 [`Sequence`](https://developer.apple.com/documentation/swift/sequence) 协议。

如果想让自己创建的类型使用 `for-await-in` 循环，就需要遵循 [`AsyncSequence`](https://developer.apple.com/documentation/swift/asyncsequence) 协议。

:::

## 并行异步方法

调用异步函数可以使用 `await` 关键字确保函数在继续执行下一行代码之前完成。

然而，若是采用单个 `await` 逐个执行异步任务，如下图中的例子，会导致每个任务必须等待前一个任务完成才能开始：

```swift
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])

let photos = [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

::: warning 这种方法虽然直观，但并不高效，因为它没有利用异步操作的并发优势

每张图片的下载需要等待上一张下载完毕，这样就不能同时下载多张图片。

:::

为了提高效率，Swift 提供了 `async let` 语法，允许同时启动多个异步任务。

这样，多个下载任务可以并发进行，而不需要等待彼此：

```swift{1-3}
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

- 在这个改进的例子中，三个下载任务几乎同时开始，不必等待前一个任务完成。
- 这三个任务都被标记为 `async let`，表示它们是并发的异步调用。
- 你只在需要结果来进行下一步操作时（比如展示这些图片），用 `await` 操作等待所有异步操作完成。

## 任务和任务组

::: tip 任务

- 任务（ `task` ) 是一项工作，可以作为程序的一部分并发执行。
- 所有的异步代码都属于某个任务。
- 上一部分介绍的 `async-let `语法就会产生一个子任务。

:::

::: tip 任务组

你也可以创建一个任务组并且给其中添加子任务，这可以让你对优先级和任务取消有了更多的掌控力，并且可以控制任务的数量。
:::

::: tip 结构化并发

任务是按层级结构排列的。同一个任务组中的任务拥有相同的父任务，并且每个任务都可以添加子任务。

由于任务和任务组之间明确的关系，这种方式又被称为结构化并发（ `structured concurrency` ）。

:::

虽然你需要确保代码的正确性，但任务间明确的父子关系让 Swift 能替你处理一些如扩散取消（ `propagating cancellation` ）之类的行为，并且能让 Swift 在编译阶段发现一些错误。


### 示例解析

我们来看一个具体的例子，这个例子中我们要下载一个相册中的所有照片：

```swift
await withTaskGroup(of: Data.self) { taskGroup in
    // 首先获取相册中的所有照片名称
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    // 为每一个照片名称创建一个下载任务
    for name in photoNames {
        taskGroup.addTask {
            // 这里是每个子任务的内容：下载一张照片
            await downloadPhoto(named: name)
        }
    }
}
```

在这个代码中：

1. **获取照片名称**：首先，我们使用 `await listPhotos(inGallery:)` 异步获取一个相册中的照片列表。这个调用是异步的，意味着程序会等待这个操作完成才继续执行。
2. **创建任务组**：使用 `withTaskGroup` 创建一个任务组，允许我们添加多个任务（每个任务是一个照片的下载操作）。
3. **添加任务到任务组**：对于相册中的每张照片，我们通过 `taskGroup.addTask` 添加一个新的任务到任务组中。每个任务是独立执行的，这意味着所有的下载可以同时进行，而不是一张一张顺序下载。
4. **执行并等待所有任务完成**：任务组会自动处理所有任务的并发执行，并且 `await withTaskGroup` 表示程序会在这个点暂停，直到所有的下载任务完成。


### 非结构化并发

对于并发来说，除了上一部分讲到的结构化的方式，Swift 还支持非结构化并发。

::: warning 与任务组中的任务不同的是，非结构化任务（ `unstructured task` ）并没有父任务

你能以任何方式来处理非结构化任务以满足你程序的需要，但与此同时，你需要对于他们的正确性付全责。

:::

- 如果想创建一个在当前 `actor` 上运行的非结构化任务，需要调用构造器 `Task.init(priority:operation:)`。
- 如果想要创建一个不在当前 `actor` 上运行的非结构化任务（更具体地说就是游离任务（ `detached task` ）），需要调用类方法 `Task.detached(priority:operation:)`。

以上两种方法都能返回一个能让你与任务交互（继续等待结果或取消任务）的任务句柄，如下例：

```swift
let newPhoto = // ... 图片数据 ...
let handle = Task {
    return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.value
```

### 任务取消

::: tip Swift 中的并发使用**合作取消模型**

每个任务都会在执行中合适的时间点检查自己是否被取消了，并且会用任何合适的方式来响应取消操作。这些方式会根据你所执行的工作分为以下几种：

- 抛出如 `CancellationError` 这样的错误
- 返回 `nil` 或者空的集合
- 返回完成一半的工作

:::

如果想检查任务是否被取消

- 既可以使用 [`Task.checkCancellation()`](https://developer.apple.com/documentation/swift/task/checkcancellation()) （如果任务取消会返回 `CancellationError` ）
- 也可以使用 [`Task.isCancelled`](https://developer.apple.com/documentation/swift/task/iscancelled-swift.type.property) 来判断，继而在代码中对取消进行相应的处理。

比如，一个从图库中下载图片的任务需要删除下载到一半的文件并且关闭连接。

如果想手动执行扩散取消，调用 [`Task.cancel()`](https://developer.apple.com/documentation/swift/task/cancel())。


## Actors


你可以使用任务来将自己的程序分割为孤立、并发的部分。任务间相互孤立，这也使得它们能够安全地同时运行。

::: tip 但有时你需要在任务间共享信息。`Actors` 便能够帮助你安全地在并发代码间分享信息

跟类一样，`actor` 也是一个引用类型，所以**类是引用类型**中关于值类型和引用类型的比较同样适用于 `actor` 和类。

不同于类的是，`actor` 在同一时间只允许一个任务访问它的可变状态，这使得多个任务中的代码与一个 `actor `交互时更加安全。

:::
比如，下面是一个记录温度的 `actor`：

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}
```

你可以使用与结构体和类初始化相同的语法创建一个 `actor`。

当你访问 `actor` 中的属性或方法时，需要使用 `await` 来标记潜在的挂起点，比如：

```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)
// 输出 "25"
```

相比之下，`actor` 内部的代码在访问其属性的时候不需要添加 `await` 关键字。

比如，下面的方法是更新 `TemperatureLogger` 中的温度：


```swift
extension TemperatureLogger {
    func update(with measurement: Int) {
        measurements.append(measurement)
        if measurement > max {
            max = measurement
        }
    }
}
```


## 可发送类型

任务和 `Actor` 能够帮助你将程序分割为能够安全地并发运行的小块。


::: info 并发域
在一个任务中，或是在一个 `Actor` 实例中，程序包含可变状态的部分（如变量和属性）被称为并发域（ `Concurrency domain` ）。
:::

部分类型的数据不能在并发域间共享，因为它们包含了可变状态，但它不能阻止重叠访问。


**能够在并发域间共享的类型**被称为可发送类型( `Sendable Type` )。


例如在调用 `Actor` 方法时被作为实参传递，或是作为任务的结果返回。


::: warning
- 本章之前的例子并未讨论可发送性，因为这些例子均使用了简单值类型，对于在并发域间传递的数据而言，简单值类型总是安全的。

- 而与之相反，另一些类型并不能安全地在并发域间传递。

例如，当你在不同的任务间传递该类的实例时，包含可变属性且并未序列化「对这些属性的访问的类」可能产生不可预测和不正确的结果。

:::


你可以通过声明其符合 `Sendable` 协议来将某个类型标记为可发送类型。

该协议并不包含任何代码要求，但 Swift 对其做出了强制的语义要求。

::: tip 有三种方法将一个类型声明为可发送类型：

- 该类型为值类型，且其可变状态由其它可发送数据构成——例如具有存储属性的结构体或是具有关联值的枚举。
- 该类型不包含任何可变状态，且其不可变状态由其它可发送数据构成——例如只包含只读属性的结构体或类
- 该类型包含能确保其可变状态安全的代码——例如标记了 `@MainActor` 的类或序列化了对特定线程/队列上其属性的访问的类。

:::
### 示例解释

来看一个例子，帮助理解这些概念：

```swift
struct TemperatureReading: Sendable {
    var measurement: Int
}

extension TemperatureLogger {
    func addReading(from reading: TemperatureReading) {
        measurements.append(reading.measurement)
    }
}

let logger = TemperatureLogger(label: "Tea kettle", measurement: 85)
let reading = TemperatureReading(measurement: 45)
await logger.addReading(from: reading)
```

在这个例子中：

- `TemperatureReading` 是一个结构体，它包含一个整型的 `measurement`。因为它是结构体（值类型），并且它的属性也是基本数据类型（整型），所以它自动满足 `Sendable` 协议的要求，可以在并发域间安全传递。
- `TemperatureLogger` 是一个 `actor`。当 `TemperatureReading` 作为参数传递给它的 `addReading` 方法时，我们使用 `await` 来确保在安全的时刻访问 `actor`，防止数据竞争。



