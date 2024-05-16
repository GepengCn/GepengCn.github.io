# 管理符号效果

## `symbolEffect(_:options:isActive:)`

返回一个添加了符号效果的新视图。

```swift
func symbolEffect<T>(
    _ effect: T,
    options: SymbolEffectOptions = .default,
    isActive: Bool = true
) -> some View where T : IndefiniteSymbolEffect, T : SymbolEffect
```

- `effect`: 要添加到视图的符号效果。视图的祖先添加的现有效果将被保留，但可能会被新效果覆盖。添加的效果将应用于子视图中包含的 `SwiftUI/Image` 视图。
- `isActive`: 效果是活动的还是不活动的。

以下示例为两个符号图像添加了重复脉冲效果：

```swift
VStack {
    Image(systemName: "bolt.slash.fill")
    Image(systemName: "folder.fill.badge.person.crop")
}
.symbolEffect(.pulse)

```
<video src="../../video/SymbolEffect.mp4" controls="controls"></video>

## `symbolEffect(_:options:value:)`

返回一个添加了符号效果的新视图。

```swift
func symbolEffect<T, U>(
    _ effect: T,
    options: SymbolEffectOptions = .default,
    value: U
) -> some View where T : DiscreteSymbolEffect, T : SymbolEffect, U : Equatable
```

- `effect`: 要添加到视图的符号效果。视图的祖先添加的现有效果将被保留，但可能会被新效果覆盖。添加的效果将应用于子视图中包含的 `SwiftUI/Image` 视图。
- `value`: 要监视其变化的值，每次该值更改时都会触发动画。

以下示例为两个符号图像添加了反弹效果，每次 `counter` 更改时都会播放动画：


```swift
VStack {
    Image(systemName: "bolt.slash.fill")
    Image(systemName: "folder.fill.badge.person.crop")
}
.symbolEffect(.bounce, value: counter)

```
<video src="../../video/SymbolEffectTrigger.mp4" controls="controls"></video>


## `symbolEffectsRemoved(_:)`

返回一个新视图，其继承的符号图像效果要么被移除，要么保持不变。

```swift
func symbolEffectsRemoved(_ isEnabled: Bool = true) -> some View
```

以下示例为两个符号图像添加了重复脉冲效果，但随后在其中一个图像上禁用了该效果：

```swift
VStack {
    Image(systemName: "bolt.slash.fill") // does not pulse
        .symbolEffectsRemoved()
    Image(systemName: "folder.fill.badge.person.crop") // pulses
}
.symbolEffect(.pulse)
```
<video src="../../video/SymbolEffectsRemoved.mp4" controls="controls"></video>

## `SymbolEffect`

应用于基于符号的图像的呈现效果。

- `appear`: 使基于符号的图像的层分别或整体出现的动画。
- `automatic`: 以上下文敏感的方式将默认动画应用于基于符号的图像的过渡。
- `bounce`: 对基于符号的图像中的层分别或整体应用暂时缩放效果或反弹的动画。
- `disappear`: 使基于符号的图像的层分别或整体消失的动画。
- `pulse`: 淡入淡出基于符号的图像中某些或所有层的不透明度的动画。
- `replace`: 用另一个基于符号的图像的层替换一个基于符号的图像的层的动画。
- `scale`: 分别或整体缩放基于符号的图像中的层的动画。
- `variableColor`: 在可重复序列中替换基于符号的图像中可变层的不透明度的动画。

