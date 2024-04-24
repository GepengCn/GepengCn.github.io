# 析构过程

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/F3dSWwsTmobyeoMd2xdnJ9"></iframe>

析构器只适用于类类型，当一个类的实例被释放之前，析构器会被立即调用。析构器用关键字`deinit`来标示，类似于构造器要用`init` 来标示。

## 析构过程原理

Swift 会自动释放不再需要的实例以释放资源。如[自动引用计数](./auto_ref_count.md)章节中所讲述，Swift 通过自动引用计数（ARC) 处理实例的内存管理。通常当你的实例被释放时不需要手动地去清理。但是，当使用自己的资源时，你可能需要进行一些额外的清理。例如，如果创建了一个自定义的类来打开一个文件，并写入一些数据，你可能需要在类实例被释放之前手动去关闭该文件。

在类的定义中，每个类最多只能有一个析构器，而且析构器不带任何参数和圆括号，如下所示：

```swift
deinit {
    // 执行析构过程
}
```

析构器是在实例释放发生前被自动调用的。你不能主动调用析构器。子类继承了父类的析构器，并且在子类析构器实现的最后，父类的析构器会被自动调用。即使子类没有提供自己的析构器，父类的析构器也同样会被调用。

因为直到实例的析构器被调用后，实例才会被释放，所以析构器可以访问实例的所有属性，并且可以根据那些属性修改它的行为（比如查找一个需要被关闭的文件）。

## 示例

假设我们有一个简单的 `Logger` 类，这个类负责在创建对象时记录一条日志，对象销毁时再记录一条日志，用以追踪对象的生命周期：

```swift
class Logger {
    var identifier: String

    init(identifier: String) {
        self.identifier = identifier
        print("\(identifier) 已创建")
    }

    deinit {
        print("\(identifier) 已销毁")
    }
}
```

在这个 `Logger` 类中：
- `init` 初始化方法设置了一个标识符，并打印一条消息表明对象已创建。
- `deinit` 析构器打印一条消息表明对象已销毁。

你可以创建一个 `Logger` 实例，并观察它的生命周期：

```swift
func testLogger() {
    let logger = Logger(identifier: "测试日志器")
    // 在这里 logger 正在被使用
}
// 当 testLogger 函数执行完毕后，logger 实例的生命周期结束，将调用析构器
```

当 `testLogger()` 函数执行并返回后，`logger` 变量超出了作用域范围。由于没有其他引用指向这个 `Logger` 实例，它会被 Swift 的自动引用计数（ARC）系统销毁。此时，`Logger` 的析构器 `deinit` 被调用，打印出 "测试日志器 已销毁" 的消息。



