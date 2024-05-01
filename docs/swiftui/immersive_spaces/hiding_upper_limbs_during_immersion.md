# Hiding upper limbs during immersion

## `upperLimbVisibility(_:)`

在展示沉浸式空间场景时，设置用户上肢的首选可见性。


```swift
// 设置场景
func upperLimbVisibility(_ preferredVisibility: Visibility) -> some Scene 
```

```swift
//设置视图
func upperLimbVisibility(_ preferredVisibility: Visibility) -> some View 
```

系统可以在完全沉浸式体验中显示用户的上肢，但你也可以选择隐藏它们，例如，为了显示虚拟手代替。

::: warning 注意
这个修饰符只设置一个偏好，并不保证系统最终会遵循这一偏好。

如果沉浸式空间当前不可见，系统可能无法遵循这一偏好。

:::