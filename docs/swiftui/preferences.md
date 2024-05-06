# Preferences

表示视图向其容器视图传达的配置偏好设置。

当你使用环境来配置视图的子视图时，你使用偏好设置来从子视图向其容器发送配置信息。然而，与从一个容器流向多个子视图的配置信息不同，单一容器需要解决来自其众多子视图可能冲突的向上流动的偏好设置。

当你使用 `PreferenceKey` 协议定义自定义偏好设置时，你需要指定如何合并来自多个子视图的偏好设置。之后，你可以使用 `preference(key:value:)` 视图修饰符在视图上为该偏好设置一个值。许多内置的修饰符，如 `navigationTitle(_:)`，都依赖于偏好设置来向其容器发送配置信息。

## `preference(key:value:)`

为给定的偏好设置一个值。

```swift
func preference<K>(
    key: K.Type = K.self,
    value: K.Value
) -> some View where K : PreferenceKey
```

## `transformPreference(_:_:)`

对偏好值应用转换。

```swift
func transformPreference<K>(
    _ key: K.Type = K.self,
    _ callback: @escaping (inout K.Value) -> Void
) -> some View where K : PreferenceKey
```

## `PreferenceKey`

由视图生成的命名值。

```swift
protocol PreferenceKey
```

具有多个子视图的视图会自动将其针对特定偏好的值合并为一个可见于其祖先的单一值。

## `anchorPreference(key:value:transform:)`

为指定的偏好键设置一个值，该值是一个与当前坐标空间相关的几何值的函数，允许值的读取者将几何值转换为它们的局部坐标。

```swift
func anchorPreference<A, K>(
    key _: K.Type = K.self,
    value: Anchor<A>.Source,
    transform: @escaping (Anchor<A>) -> K.Value
) -> some View where K : PreferenceKey
```

## `transformAnchorPreference(key:value:transform:)`

为指定的偏好键设置一个值，该值是该键当前值与一个绑定到当前坐标空间的几何值的函数，使得值的阅读者能够将此几何值转换为他们的局部坐标系。

```swift
func transformAnchorPreference<A, K>(
    key _: K.Type = K.self,
    value: Anchor<A>.Source,
    transform: @escaping (inout K.Value, Anchor<A>) -> Void
) -> some View where K : PreferenceKey
```

## `onPreferenceChange(_:perform:)`

当指定的偏好键的值发生变化时，添加一个要执行的动作。

```swift
func onPreferenceChange<K>(
    _ key: K.Type = K.self,
    perform action: @escaping (K.Value) -> Void
) -> some View where K : PreferenceKey, K.Value : Equatable
```

## `backgroundPreferenceValue(_:_:)`

从视图中读取指定的偏好值，并利用该值生成第二个视图，将其作为原始视图的背景应用。


```swift
func backgroundPreferenceValue<Key, T>(
    _ key: Key.Type = Key.self,
    @ViewBuilder _ transform: @escaping (Key.Value) -> T
) -> some View where Key : PreferenceKey, T : View
```

## `backgroundPreferenceValue(_:alignment:_:)`

从视图中读取指定的首选项值，并使用该值来生成第二个视图，然后将这个第二视图设置为原始视图的背景。


```swift
func backgroundPreferenceValue<K, V>(
    _ key: K.Type,
    alignment: Alignment = .center,
    @ViewBuilder _ transform: @escaping (K.Value) -> V
) -> some View where K : PreferenceKey, V : View
```

## `overlayPreferenceValue(_:_:)`

从视图中读取指定的偏好值，并利用该值来创建第二个视图，将其作为叠加层应用到原始视图上。

```swift
func overlayPreferenceValue<Key, T>(
    _ key: Key.Type = Key.self,
    @ViewBuilder _ transform: @escaping (Key.Value) -> T
) -> some View where Key : PreferenceKey, T : View
```

## `overlayPreferenceValue(_:alignment:_:)`

从视图中读取指定的偏好值，并使用该值生成第二个视图，将其作为覆盖层添加到原始视图上。

```swift
func overlayPreferenceValue<K, V>(
    _ key: K.Type,
    alignment: Alignment = .center,
    @ViewBuilder _ transform: @escaping (K.Value) -> V
) -> some View where K : PreferenceKey, V : View
```