# Adjusting content brightness

## `ImmersiveContentBrightness`

沉浸式空间的内容亮度。

```swift
struct ImmersiveContentBrightness
```

使用这种类型的值作为 `immersiveContentBrightness(_:)` 场景修饰符的输入，以指示沉浸式空间的环境内容亮度。

当你这样做以创建适合视频播放的环境时，使用标准亮度值，如明亮、昏暗或黑暗，以为大多数用例提供良好的结果。

为了进一步优化，你可以使用一个标准化值创建自定义亮度，该值表达标准动态范围白色视频帧与围绕播放器窗口的背景之间的线性亮度比。

- `automatic`: 默认的内容亮度
- `bright`: 明亮
- `dark`: 黑暗
- `dim`: 昏暗

### `custom(_:)`

创建具有自定义值的内容亮度。

```swift
static func custom(_ value: Double) -> ImmersiveContentBrightness
```

亮度的值。提供一个介于0和1之间的值。数值越大，环境越亮。