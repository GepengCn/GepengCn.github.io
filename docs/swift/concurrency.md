# 并发

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/BCfptC7Nc6WLHA9ZSEQzzm"></iframe>

Swift 对于编写异步和并行代码提供了原生支持，这使得结构化的并发编程变得更为简洁和安全。让我们分别来看看这两者的含义及其应用。

首先，**异步代码**允许程序在执行长时间操作（如文件下载或解析）时，暂停这些操作，转而执行其他较短的任务，比如更新用户界面。这种能力称为“挂起”和“继续执行”，它在单线程中有效地管理任务，确保同一时间内只执行一段代码。

另一方面，**并行代码**指的是多个代码块能够同时执行。例如，一个四核处理器的计算机可以在每个核上同时运行不同的代码块，从而加快处理速度。

将这两种能力结合使用，Swift 程序可以更高效地处理多任务，例如在等待外部系统响应时暂停当前任务，同时执行其他计算任务。这样不仅提升了程序的性能，还简化了内存管理，因为 Swift 的并发模型在编译时就能帮助开发者识别潜在的错误。

然而，引入并发和异步操作会增加编程的复杂性。Swift 提供了一些工具，如 `actor`，这些工具能安全地管理并发访问可变状态，减少错误发生的机会。需要注意的是，仅仅为了加快程序运行速度而随意引入并发，不仅可能无益，反而可能增加代码的错误和复杂度。正确地使用 Swift 的并发特性，可以在编译阶段预防错误，确保代码的健壮性。

::: warning 注意
在 Swift 的并发模型中，你不需要直接管理线程。相反，当你使用异步函数时，这些函数可以在执行过程中「交出」它们在某个线程上的运行权。这样做的好处是，如果一个异步函数需要等待某些操作（例如，等待数据加载），它可以让出线程，允许其他异步函数使用这个线程继续运行。

重要的是要理解，当一个异步函数准备恢复执行时，它可能不会在同一个线程上运行。Swift 的系统会自动为这些函数分配线程，这有助于简化程序设计，你不需要担心线程的具体管理问题，只需关注函数的逻辑即可。
:::

你当然也可以不用 Swift 原生支持去写并发的代码，只不过代码的可读性会下降。比如，下面的这段代码会拉取一系列图片名称的列表，下载列表中的图片然后展示给用户：

```swift
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[0]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

在这个简单的案例中，由于代码中有一系列的`completion handler`，最终你必须得使用嵌套闭包。更加复杂的代码会产生更深的嵌套，从而使代码迅速变得臃肿起来。


## 定义和调用异步函数

异步函数或方法在 Swift 中是一种特殊的函数，它们可以在执行过程中被暂停，并在适当的时候继续执行。这与传统的同步函数不同，后者只能一直运行直到完成任务、抛出错误或者永久停止返回。异步函数不仅能完成这些功能，还能在等待外部资源如网络响应时暂停执行。

要声明一个异步函数或方法，你可以在其返回类型前使用 `async` 关键字，类似于用 `throws` 关键字标记可能抛出错误的函数。例如，下面的方法从图库中拉取图片名称列表：

```swift
func listPhotos(inGallery name: String) async -> [String] {
    let result = // 省略异步网络请求代码
    return result
}
```

对于那些既可能抛出错误又是异步的函数，应将 `async` 关键字置于 `throws` 之前。

当调用一个异步函数时，你需要使用 `await` 关键字来标记可能的挂起点，这与使用 `try` 标记可能抛出错误的地方类似。在异步函数中，代码只有在调用其他异步函数时才会挂起；并且挂起操作是显式的，不会自动发生。例如，下面的代码段展示了如何拉取图库中所有图片的名称并显示第一张图片：

```swift
let photoNames = await listPhotos(inGallery: "Summer Vacation")
let sortedNames = photoNames.sorted()
let name = sortedNames[0]
let photo = await downloadPhoto(named: name)
show(photo)
```

因为 `listPhotos(inGallery:)` 和 `downloadPhoto(named:)` 都需要时间来完成网络请求，将它们定义为异步函数允许程序在等待这些操作时继续执行其他任务。

在使用 `await` 的地方，代码会暂停执行，等待异步方法的结果。这被称为挂起点，是代码执行可以暂停并在未来某一时刻恢复的地方。Swift 的设计确保挂起的操作非常明确，必须使用 `await` 来标记。

考虑以下示例，该示例展示了一个可能的执行顺序：

1. 代码从第一行开始执行到第一个 `await`，调用 `listPhotos(inGallery:)` 函数并挂起当前代码块，等待函数返回。
2. 当代码挂起时，Swift 运行时允许其他代码块继续执行。例如，可能有其他并行任务正在后台更新不同的图库。
3. 一旦 `listPhotos(inGallery:)` 函数返回，代码从挂起点恢复执行，继续处理返回的 `photoNames`。
4. `sortedNames` 和 `name` 的定义是同步执行的，因为它们不涉及异步调用，因此不会产生挂起点。
5. 当代码到达调用 `downloadPhoto(named:)` 的 `await` 时，再次挂起，等待照片下载完成。
6. 下载完成后，代码继续执行，显示下载的照片。

`await` 关键字的使用，确保了在这些异步操作完成前，相关代码不会继续执行，从而使得其他任务能够有效利用等待时间。这种方式称为“让出线程”，即允许当前线程去执行其他任务，而不是空闲等待。

此外，对于需要确保操作顺序的场景，例如将图片从一个图库移到另一个图库，这样的操作要求在移动操作完成前后保持一致性，不能有其他并发操作插入：

```swift
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
add(firstPhoto, toGallery: "Road Trip")
// 此时，firstPhoto暂时地同时存在于两个图库中
remove(firstPhoto, fromGallery: "Summer Vacation")
```

在这种情况下，保持 `add` 和 `remove` 操作的原子性很重要，确保不会有其他并发操作打断这两个步骤。为此，可以将这一系列操作封装到一个同步函数中，确保执行过程中不会被异步操作打断：

```swift
func move(_ photoName: String, from source: String, to destination: String) {
    add(photoName, to: destination)
    remove(photoName, from: source)
}
// ...
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
move(firstPhoto, from: "Summer Vacation", to: "Road Trip")
```

在上例中，由于`move(_:from:to:)`函数为同步函数，你将能够保证它将不会包含潜在的挂起点。在未来，试图在该函数中写入并发代码将引发编译错误而非产生bug。

::: warning 注意
学习并行的过程中，`Task.sleep(_:)`方法非常有用。这个方法什么都没有做，只是等待不少于指定的时间（单位纳秒）后返回。下面是使用 `sleep(until:clock:)`方法模拟网络请求实现`listPhotos(inGallery:)`的一个版本：
```swift
func listPhotos(inGallery name: String) async throws -> [String] {
    try await Task.sleep(until: .now + .seconds(2), clock: .continuous) 
    return ["IMG001", "IMG99", "IMG0404"]
}
```


:::


## 异步序列

如果你想逐个处理异步产生的数据，可以使用异步序列。这种方法比起一次性返回所有数据，可以更有效地处理流式数据，例如从文件读取行或者网络请求返回的数据流。

在上面的示例中，我们使用了一个 `for-await-in` 循环来遍历一个异步序列。这个循环类似于常见的 `for-in` 循环，但它添加了 `await` 关键字，表示在遍历过程中可能会有挂起的操作。这是因为每个新的元素获取可能需要等待，例如等待下一行文本从标准输入读取完毕。这里的每次迭代都可能暂停执行，直到下一个元素准备就绪。

```swift
import Foundation

let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

在这段代码中，我们监听标准输入，每接收到一行文本，就会输出这行文本。使用 `for-await-in` 循环允许程序在数据准备就绪前暂时挂起，从而不会阻塞程序的其他部分。

想让自己创建的类型使用`for-in`循环需要遵循[`Sequence`](https://developer.apple.com/documentation/swift/sequence)协议，这里也同理，如果想让自己创建的类型使用`for-await-in`循环，就需要遵循[`AsyncSequence`](https://developer.apple.com/documentation/swift/asyncsequence)协议。

## 并行异步方法

调用异步函数可以使用 `await` 关键字确保函数在继续执行下一行代码之前完成。然而，若是采用单个 `await` 逐个执行异步任务，如下图中的例子，会导致每个任务必须等待前一个任务完成才能开始：

```swift
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])

let photos = [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

这种方法虽然直观，但并不高效，因为它没有利用异步操作的并发优势。每张图片的下载需要等待上一张下载完毕，这样就不能同时下载多张图片。

为了提高效率，Swift 提供了 `async let` 语法，允许同时启动多个异步任务。这样，多个下载任务可以并发进行，而不需要等待彼此：

```swift
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

在这个改进的例子中，三个下载任务几乎同时开始，不必等待前一个任务完成。这三个任务都被标记为 `async let`，表示它们是并发的异步调用。你只在需要结果来进行下一步操作时（比如展示这些图片），用 `await` 操作等待所有异步操作完成。

总结一下，当你需要结果才能继续执行后续代码时，使用 `await`；当希望提高效率，允许多个异步操作同时进行时，使用 `async let`。这样可以使代码既清晰又高效。你也可以根据需要在同一段代码中混用这两种方式。

## 任务和任务组

### 任务和任务组的基础概念

在 Swift 中，**任务**（Task）是指在程序中可以并行执行的工作单元。每个任务可以独立执行，不需要等待其他任务的结果。为了更有效地管理和执行多个任务，Swift 使用了**任务组**（Task Group）的概念。

### 结构化并发

Swift 中的结构化并发是一种组织代码的方式，它帮助程序员创建清晰、安全的并发代码。通过这种结构，你可以定义任务的层级关系，这样父任务可以拥有多个子任务。重要的是，如果父任务被取消，所有的子任务也会自动被取消。

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
            return await downloadPhoto(named: name)
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

在 Swift 的并发模型中，除了前面讨论的结构化并发（例如任务组），还存在**非结构化并发**。与结构化并发中的任务组相比，非结构化任务没有固定的父任务。这意味着它们的生命周期和管理需要完全由程序员自己掌握。这种灵活性允许开发者根据具体需求自定义任务的行为，但同时也增加了出错的风险，因为开发者需要确保任务在合适的时间被正确地开始和结束。

Swift 提供了两种方式来创建非结构化任务：

1. **普通非结构化任务（Task.init）**：这种方式创建的任务会在当前的 `actor`（或上下文）中执行，保持任务执行环境的一致性。
2. **游离任务（Task.detached）**：这种方式创建的任务与当前的执行环境（如 `actor`）无关，即它们在独立的上下文中运行。这在需要明确区分任务执行环境时非常有用。

让我们看一个使用 `Task.init` 创建非结构化任务的示例：

```swift
let newPhoto = // ... 图片数据 ...
let handle = Task {
    return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.value
```

在这个示例中：

- **任务创建**：使用 `Task.init` 创建一个新的非结构化任务。这个任务会在当前的 `actor` 或执行环境中执行。
- **任务句柄**：创建任务时，Swift 会返回一个任务句柄（`handle`），这个句柄可以用来与任务交互，例如获取任务的结果或取消任务。
- **执行任务**：通过 `handle.value` 可以 `await` 任务的结果，这意味着当前的代码会等待直到非结构化任务完成。

::: warning 注意事项

使用非结构化并发时，你需要格外小心地管理任务的生命周期和错误处理。例如，如果一个任务在不应该的时间被取消，或者在错误的上下文中运行，可能会导致程序出错或者数据不一致。

:::

### 任务取消

Swift 中的并发使用合作取消模型。每个任务都会在执行中合适的时间点检查自己是否被取消了，并且会用任何合适的方式来响应取消操作。这些方式会根据你所执行的工作分为以下几种：

- 抛出如`CancellationError`这样的错误
- 返回`nil`或者空的集合
- 返回完成一半的工作

如果想检查任务是否被取消，既可以使用[`Task.checkCancellation()`](https://developer.apple.com/documentation/swift/task/checkcancellation())（如果任务取消会返回`CancellationError`），也可以使用[`Task.isCancelled`](https://developer.apple.com/documentation/swift/task/iscancelled-swift.type.property)来判断，继而在代码中对取消进行相应的处理。比如，一个从图库中下载图片的任务需要删除下载到一半的文件并且关闭连接。

如果想手动执行扩散取消，调用[`Task.cancel()`](https://developer.apple.com/documentation/swift/task/cancel())。


## Actors


在 Swift 中使用 `actor` 可以帮助你在并发程序中安全地管理和共享状态。让我们简化并解释一下这个概念。

### 什么是 Actor?

`actor` 类似于类（class），但它专为并发设计。与类不同，`actor` 保证在任何时刻只有一个任务可以访问其可变状态，从而避免了多个任务同时修改同一数据时可能出现的问题。

### Actor 的定义

你可以使用 `actor` 关键字来定义，这与定义类相似。以下是一个记录温度的`actor`示例：

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

在名为`TemperatureLogger`的`actor`中，`max` 属性被设置为 `private(set)`，这意味着它只能在`actor`内部被修改，确保了数据的一致性和安全性。

### 访问 Actor

访问`actor`中的属性或方法时，可能需要使用 `await`，这是因为 Swift 要确保在访问时没有其他任务正在修改`actor`的状态。例如：

```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)
```

在上面的代码中，访问 `logger.max` 需要 `await`，因为需要等待直到安全的时刻才能进行读取，以确保读取的数据是最新和正确的。

### Actor 内部方法

在`actor`内部，访问自己的状态时不需要使用 `await`，因为`actor`保证了自己内部的方法访问是安全的。看看下面的更新温度的方法：

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

在 `update(with:)` 方法中，即使是在修改状态，也不需要 `await`，因为这个操作是安全的。方法确保了在更新过程中没有其他并发访问，这避免了数据不一致的问题。

### Actor 隔离和错误

如果尝试在没有 `await` 的情况下直接访问`actor`的属性，会导致编译时错误：

```swift
print(logger.max)  // 这会报错
```

这样的错误帮助保证了你不会意外地在不安全的环境中访问`actor`的状态，这就是所谓的`actor`隔离。

## 可发送类型

在 Swift 的并发编程中，为了安全地处理数据共享和访问控制，Swift 引入了一些概念和规则来帮助开发者。这其中包括「并发域」、「可发送类型」（Sendable Type）等概念。

### 并发域（Concurrency Domain）

在 Swift 的并发环境中，你的程序会被分割成多个可以同时运行的小部分，这些部分被称为「任务」和「Actor」。在每个任务或 Actor 中，包含可变状态的代码（比如变量和属性）构成了一个「并发域」。并发域就是一个确保数据安全访问的环境，只有在这个环境内部，数据的修改和访问才是安全的。

### 可发送类型（Sendable Type）

在多个并发域之间传递数据时，为了保证数据的一致性和安全，Swift 引入了「可发送类型」的概念。可发送类型是指那些可以安全地在不同并发域之间传递的数据类型。这包括那些不会因为并发访问而出现数据错乱的类型。

#### 如何确定一个类型是可发送的？

1. **值类型的数据结构**：如结构体和枚举，它们包含的是值类型的属性，或者其属性本身也是可发送的类型。
2. **只读的数据结构**：包含的状态是不可变的，即使这些数据结构是类。
3. **保证数据安全的类型**：比如通过特定的同步机制（如在某个特定线程或队列上访问）或通过 `@MainActor` 注解来确保访问始终在主线程进行。

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

- `TemperatureReading` 是一个结构体，它包含一个整型的 `measurement`。因为它是结构体（值类型），并且它的属性也是基本数据类型（整型），所以它自动满足 Sendable 协议的要求，可以在并发域间安全传递。
- `TemperatureLogger` 是一个 Actor。当 `TemperatureReading` 作为参数传递给它的 `addReading` 方法时，我们使用 `await` 来确保在安全的时刻访问 Actor，防止数据竞争。



