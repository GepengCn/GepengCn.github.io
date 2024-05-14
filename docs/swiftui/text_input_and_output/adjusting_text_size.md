# Adjusting text size

## `dynamicTypeSize(_:)`

限制视图中的动态字体大小在给定范围内。

```swift
func dynamicTypeSize<T>(_ range: T) -> some View where T : RangeExpression, T.Bound == DynamicTypeSize
```

例如，你可以限制 `ContentView` 中的最大动态字体大小不超过 `DynamicTypeSize.large`：

```swift
ContentView()
.dynamicTypeSize(...DynamicTypeSize.large)
```

如果动态字体大小被限制在多个范围内，结果是它们的交集：

```swift
ContentView() // Dynamic Type sizes are from .small to .large
    .dynamicTypeSize(.small...)
    .dynamicTypeSize(...DynamicTypeSize.large)

```

在应用范围后，仍然可以设置特定的动态字体大小：

```swift
ContentView() // Dynamic Type size is .xLarge
    .dynamicTypeSize(.xLarge)
    .dynamicTypeSize(...DynamicTypeSize.large)
```

在限制动态字体大小时，考虑是否添加使用 `accessibilityShowsLargeContentViewer()` 的大内容视图是合适的。

- `xSmall`: 一个额外小的尺寸。
- `small`: 一个小的尺寸。
- `medium`: 一个中等的尺寸。
- `large`: 一个大的尺寸。
- `xLarge`: 一个超大的尺寸。
- `xxLarge`: 一个特大的尺寸。
- `xxxLarge`: 一个超级大的尺寸。

- `accessibility1`: 第一种无障碍尺寸。
- `accessibility2`: 第二种无障碍尺寸。
- `accessibility3`: 第三种无障碍尺寸。
- `accessibility4`: 第四种无障碍尺寸。
- `accessibility5`: 第五种无障碍尺寸。