# Dictating text

## `searchDictationBehavior(_:)`

在搜索栏中添加听写麦克风。

```swift
func searchDictationBehavior(_ dictationBehavior: TextInputDictationBehavior) -> some View
```

## `typeSelectEquivalent(_:)`

在集合（如列表或表格）中设置显式类型选择等效文本。

```swift
func typeSelectEquivalent(_ text: Text?) -> some View
```

默认情况下，类型选择等效项是从列表或表格中的任何 `Text` 或 `TextField` 内容自动派生的。在下面的示例中，即使没有设置显式值，也可以使用类型选择来选择一个人。

```swift
List(people, selection: $selectedPersonID) { person in
    Label {
        Text(person.name)
    } icon: {
        person.avatar
    }
}
```

当没有文本内容或需要与视图中显示的内容不同的值时，应设置显式类型选择值。显式值还为复杂视图类型提供了更高的性能。在下面的示例中，显式设置类型选择以允许选择否则仅显示图像的视图。


```swift
List(people, selection: $selectedPersonID) { person in
    person.avatar
        .accessibilityLabel(person.name)
        .typeSelectEquivalent(person.name)
}
```

设置空字符串值会禁用视图的文本选择，而 `nil` 值会导致视图使用其默认值。

