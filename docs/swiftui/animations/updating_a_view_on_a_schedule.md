# Updating a view on a schedule

## `TimelineView`

一个根据你提供的时间表更新的视图。

```swift
struct TimelineView<Schedule, Content> where Schedule : TimelineSchedule
```

时间轴视图本身没有任何外观，而是在预定的时间点重新绘制其包含的内容。例如，你可以每秒更新一次模拟计时器的表面：

```swift
struct AnalogTimerView: View {
    var body: some View {
        TimelineView(.periodic(from: Date(), by: 1)) { context in
            Text(context.date.description)
        }
    }
}
```
<video src="../../video/TimelineView.mp4" controls="controls"></video>

创建内容的闭包接收一个 `TimelineView.Context` 类型的输入，你可以使用它来自定义内容的外观。上下文包括触发更新的日期。在上面的示例中，时间轴视图将该日期发送到你创建的模拟计时器，以便计时器视图知道如何在其表面上绘制指针。

上下文还包括一个 `cadence` 属性，你可以使用它来隐藏不必要的细节。例如，你可以使用 `cadence` 来决定何时适合显示计时器的秒针：

```swift
TimelineView(.periodic(from: startDate, by: 1.0)) { context in
    AnalogTimerView(
        date: context.date,
        showSeconds: context.cadence <= .seconds)
}
```

系统可能使用比时间表更新速率慢的节奏。例如，watchOS 上的视图可能在用户放下手腕时仍然可见，但更新频率较低，因此需要的细节较少。

你可以通过创建符合 `TimelineSchedule` 协议的类型来定义自定义时间表，或者使用内置的时间表类型之一：

- 使用 `everyMinute` 时间表在每分钟开始时更新。
- 使用 `periodic(from:by:)` 时间表定期更新，具有自定义的开始时间和更新之间的间隔。
- 当你需要有限数量或不规则的更新时，使用 `explicit(_:)` 时间表。

对于只包含过去日期的时间表，时间轴视图显示时间表中的最后一个日期。对于只包含未来日期的时间表，时间轴视图使用当前日期绘制其内容，直到第一个预定日期到来。

### `init(_:content:)`

创建一个使用给定时间表的新时间轴视图。

```swift
init(
    _ schedule: Schedule,
    @ViewBuilder content: @escaping (TimelineViewDefaultContext) -> Content
)
```

当 `Schedule` 符合 `TimelineSchedule` 协议且 `Content` 符合 `View` 协议时可用。

- `schedule`：生成一个日期序列的时间表，该序列指示视图应该更新的实例。使用符合 `TimelineSchedule` 协议的类型，例如 `everyMinute`，或者你定义的自定义时间表。
- `content`：在时间表指示的时刻生成视图内容的闭包。闭包接受一个 `TimelineViewDefaultContext` 类型的输入，其中包括促使更新的时间表中的日期，以及视图可以用于自定义其外观的 `TimelineView.Context.Cadence` 值。

### `TimelineView.Context`

传递给时间轴视图内容回调的信息。

上下文包括触发回调的时间表中的日期，以及你可以用于自定义视图外观的节奏。例如，你可能会选择仅在节奏为 `TimelineView.Context.Cadence.seconds` 或更快时显示模拟时钟的秒针。

::: info `date`
`TimelineView` 闭包第一次接收到这个日期时，它可能在过去。例如，如果你在 10:09:55 创建一个 `everyMinute` 时间表，时间表会创建 10:09:00、10:10:00、10:11:00 等条目。作为响应，时间轴视图会立即在 10:09:55 进行初始更新，但上下文包含 10:09:00 日期条目。后续条目会在其对应的时间到达。
:::

::: info `cadence`

时间轴更新视图的速率。

使用此值来隐藏比视图当前更新速率更快的更新信息。例如，当节奏比 `TimelineView.Context.Cadence.live` 慢时，可以隐藏数字计时器的毫秒组件。

由于 `TimelineView.Context.Cadence` 枚举符合 `Comparable` 协议，因此可以使用关系运算符比较节奏。较慢的节奏具有较高的值，因此可以使用以下比较来执行上述检查：

```swift
let hideMilliseconds = cadence > .live
```
- `case live`: 持续更新视图。
- `case seconds`: 大约每秒更新一次视图。
- `case minutes`: 大约每分钟更新一次视图。

:::


::: info `invalidateTimelineContent()`

重置系统从时间轴中预渲染的任何视图。

当进入常亮显示时，系统可能会预渲染帧。如果这些帧的内容必须以时间表或时间轴视图当前绑定无法反映的方式更改（例如，因为用户更改了未来日历事件的标题），请调用此方法请求重新生成帧。
:::

## `TimelineSchedule`

一种提供日期序列作为时间表使用的类型。

```swift
protocol TimelineSchedule
```

符合此协议的类型通过定义返回日期序列的 `entries(from:mode:)` 方法来实现特定类型的时间表。当初始化 `TimelineView` 时使用时间轴时间表类型。例如，你可以使用 `periodic(from:by:)` 返回的定期时间表创建一个从某个 `startDate` 开始每秒更新一次的时间轴视图：


```swift
TimelineView(.periodic(from: startDate, by: 1.0)) { context in
    // View content goes here.
}

```

你还可以创建自定义时间轴时间表。时间轴视图根据时间表产生的日期序列更新其内容。


### Getting built-in schedules

::: tip `animation`
一个可暂停的日期时间表，更新频率不超过提供的间隔。

```swift
static var animation: AnimationTimelineSchedule { get }
```
:::

::: tip `animation(minimumInterval:paused:)`
一个可暂停的日期时间表，更新频率不超过提供的间隔。

```swift
static func animation(
    minimumInterval: Double? = nil,
    paused: Bool = false
) -> AnimationTimelineSchedule
```
:::


::: tip `everyMinute`
每分钟开始时更新时间轴视图的时间表。

```swift
static var everyMinute: EveryMinuteTimelineSchedule { get }
```

当你希望在每分钟开始时安排时间轴视图更新时，使用每分钟时间轴时间表初始化时间轴视图：

```swift
TimelineView(.everyMinute) { context in
    Text(context.date.description)
}
```

该时间表将第一个日期作为用于初始化时间轴视图的分钟的开始。例如，如果你在 10:09:38 创建时间轴视图，时间表的第一个条目是 10:09:00。作为响应，时间轴视图立即执行其第一次更新，将当前分钟的开始（即 10:09:00）作为上下文提供给其内容。后续更新发生在接下来的每一分钟的开始。

时间表定义了 `EveryMinuteTimelineSchedule.Entries` 结构，以在时间轴视图调用 `entries(from:mode:)` 方法时返回日期序列。

:::


::: tip `explicit(_:)`
一个用于在明确的时间点更新时间轴视图的时间表。

```swift
static func explicit<S>(_ dates: S) -> ExplicitTimelineSchedule<S> where Self == ExplicitTimelineSchedule<S>, S : Sequence, S.Element == Date
```
- `dates`：时间轴视图更新的日期序列。使用单调递增的日期序列，并确保至少有一个在未来。

当你希望在特定时间点安排视图更新时，使用明确的时间轴时间表初始化时间轴视图：

```swift
let dates = [
    Date(timeIntervalSinceNow: 10), // Update ten seconds from now,
    Date(timeIntervalSinceNow: 12) // and a few seconds later.
]


struct MyView: View {
    var body: some View {
        TimelineView(.explicit(dates)) { context in
            Text(context.date.description)
        }
    }
}
```

时间轴视图在你指定的确切日期上更新其内容，直到日期用完，之后它停止更改。如果你提供的日期在过去，时间轴视图仅更新一次，使用最后一个条目。如果你只提供未来的日期，时间轴视图将使用当前日期进行渲染，直到第一个日期到来。如果你提供一个或多个过去的日期和一个或多个未来的日期，视图将渲染最近的过去日期，并在所有后续日期上正常刷新。

:::


::: tip `periodic(from:by:)`
一个用于以固定间隔更新时间轴视图的时间表。

```swift
static func periodic(
    from startDate: Date,
    by interval: TimeInterval
) -> PeriodicTimelineSchedule
```

- `startDate`：序列开始的日期。
- `interval`：连续序列条目的时间间隔。

当你希望使用自定义间隔定期安排时间轴视图更新时，使用定期时间轴时间表初始化时间轴视图：

```swift
TimelineView(.periodic(from: startDate, by: 3.0)) { context in
    Text(context.date.description)
}
```

时间轴视图在开始日期更新其内容，然后在时间上以间隔量分隔的日期再次更新，在上述示例中，间隔量为每三秒。对于过去的开始日期，视图立即更新，并将对应于最近间隔边界的日期作为上下文提供。然后，视图在后续间隔边界上正常刷新。对于未来的开始日期，视图更新一次，使用当前日期，然后在开始日期开始定期更新。

时间表定义了 `PeriodicTimelineSchedule.Entries` 结构，以在时间轴视图调用 `entries(from:mode:)` 方法时返回日期序列。
:::


::: tip `entries(from:mode:)`
提供从给定日期开始的日期序列。

```swift
func entries(
    from startDate: Date,
    mode: Self.Mode
) -> Self.Entries
```

- `startDate`：序列开始的日期。
- `mode`：表示时间表是正常更新，还是以其他某种节奏更新。

你创建的 `TimelineView` 会调用此方法来确定何时更新其内容。该方法按升序返回一个日期序列，代表时间轴视图应该更新的时间点。符合 `TimelineSchedule` 协议的类型，例如由 `periodic(from:by:)` 返回的类型，或者你定义的自定义时间表，会实现此方法的自定义版本来实现特定类型的时间表。

序列中的一个或多个日期可能在给定的 `startDate` 之前，在这种情况下，时间轴视图在 `startDate` 使用最接近该日期的条目进行第一次更新。例如，如果对于 `startDate` 为 10:09:55，该方法返回一个值为 10:09:00、10:10:00、10:11:00 等的序列，时间轴视图将在 10:09:55 进行初始更新（使用 10:09:00 条目），然后从 10:10:00 开始每分钟进行一次更新。

符合协议的类型应根据模式在可能的情况下调整其行为。例如，提供计时器更新的定期时间表可以在 `TimelineScheduleMode.lowFrequency` 模式下将更新限制为每分钟一次：


```swift
unc entries(
    from startDate: Date, mode: TimelineScheduleMode
) -> PeriodicTimelineSchedule {
    .periodic(
        from: startDate, by: (mode == .lowFrequency ? 60.0 : 1.0)
    )
}
```
:::