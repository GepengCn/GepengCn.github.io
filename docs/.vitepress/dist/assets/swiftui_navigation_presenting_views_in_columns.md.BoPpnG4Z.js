import{_ as i,c as s,o as a,a4 as n}from"./chunks/framework.C7sZLB-2.js";const t="/gepengcn.github.io/assets/NavigationSplitView.Rdym9pbQ.mp4",l="/gepengcn.github.io/assets/NavigationSplitViewVisibility.BkMBDczc.mp4",p="/gepengcn.github.io/assets/PreferredPreferredCompactColumn.boo8nwiI.mp4",e="/gepengcn.github.io/assets/NavigationLink.Cj0at3On.png",h="/gepengcn.github.io/assets/NavigationLinkPlain.V5Vfs5oj.png",k="/gepengcn.github.io/assets/NavigationDestination.DFV3SZfg.mp4",d="/gepengcn.github.io/assets/LinkProgrammatically.qSfe8s7y.mp4",m=JSON.parse('{"title":"Presenting views in columns","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/navigation/presenting_views_in_columns.md","filePath":"swiftui/navigation/presenting_views_in_columns.md","lastUpdated":1714623054000}'),o={name:"swiftui/navigation/presenting_views_in_columns.md"},E=n(`<h1 id="presenting-views-in-columns" tabindex="-1">Presenting views in columns <a class="header-anchor" href="#presenting-views-in-columns" aria-label="Permalink to &quot;Presenting views in columns&quot;">​</a></h1><p>使用导航容器为应用程序的用户界面提供结构，使人们能够轻松地在应用程序的各个部分之间移动。</p><p>例如，人们可以使用 <code>NavigationStack</code> 在一堆视图中向前和向后移动，或者使用 <code>TabView</code> 从选项卡栏中选择要显示的视图。</p><p>通过向容器添加诸如 <code>navigationSplitViewStyle(_:)</code> 之类的视图修饰符来配置导航容器。</p><p>在容器内的视图上使用其他修饰符可以影响容器在显示该视图时的行为。</p><p>例如，你可以在视图上使用 <code>navigationTitle(_:)</code> 来提供在显示该视图时显示的工具栏标题。</p><h2 id="navigationsplitview" tabindex="-1"><code>NavigationSplitView</code> <a class="header-anchor" href="#navigationsplitview" aria-label="Permalink to &quot;\`NavigationSplitView\`&quot;">​</a></h2><p>以两列或三列表示视图的视图，其中前导列中的选择控制后续列的表示。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NavigationSplitView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Sidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Detail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sidebar </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> View</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Content </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> View</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Detail </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> View</span></span></code></pre></div><p>你可以创建一个包含两到三列的导航分屏视图，并通常将其用作场景中的根视图。</p><p>人们在前导列中选择一个或多个项目，以便在后续列中显示有关这些项目的详细信息。</p><p>要创建一个两列导航的分屏视图，使用 <code>init(sidebar:detail:)</code> 初始化器:</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationSplitView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sidebar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Primary View&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">detail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Detail View&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="`+t+`" controls="controls"></video></p><p>你还可以将 <code>NavigationStack</code> 嵌入到列中，点击或单击出现在较早列中的 <code>NavigationLink</code> 可设置堆栈在其根视图上显示的视图，激活同一列中的链接会将视图添加到堆栈中。</p><p>无论哪种方式，链接都必须提供一种数据类型，堆栈具有相应的 <code>navigationDestination(for:destination:)</code> 修饰符。 在 watchOS 和 tvOS 上，以及 iPhone 或 iPad 上的 Slide Over 等窄尺寸情况下，导航分割视图会将其所有列折叠成一个堆栈，并显示显示有用信息的最后一列。</p><h3 id="control-column-visibility" tabindex="-1">Control column visibility <a class="header-anchor" href="#control-column-visibility" aria-label="Permalink to &quot;Control column visibility&quot;">​</a></h3><p>你可以通过创建 <code>NavigationSplitViewVisibility</code> 类型的 <code>State</code> 值以编程方式控制导航拆分视图列的可见性。</p><p>然后将该状态的 <code>Binding</code> 传递给适当的初始化程序 - 例如两列的 <code>init(columnVisibility:sidebar:detail:)</code> 或三列的 <code>init(columnVisibility:sidebar:content:detail:)</code>。</p><p>以下代码更新了上面的第一个示例，以在视图出现时始终隐藏第一列：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@State</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> employeeIds: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;Employee.ID&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@State</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> columnVisibility </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    NavigationSplitViewVisibility.detailOnly</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> body: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    NavigationSplitView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">columnVisibility</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $columnVisibility) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        List</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(model.employees, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">selection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $employeeIds) { employee </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(employee.name)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">detail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        EmployeeDetails</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: employeeIds)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="`+l+`" controls="controls"></video></p><p>当分割视图将其列折叠成堆栈时，它会忽略可见性控制。</p><h3 id="collapsed-split-views" tabindex="-1">Collapsed split views <a class="header-anchor" href="#collapsed-split-views" aria-label="Permalink to &quot;Collapsed split views&quot;">​</a></h3><p>在狭窄的尺寸类别中，例如在 iPhone 或 Apple Watch 上，导航拆分视图会折叠成单个堆栈。</p><p>通常，SwiftUI 根据拆分视图列的内容自动选择要在该单个堆栈顶部显示的视图。</p><p>对于自定义导航体验，你可以提供更多信息来帮助 SwiftUI 选择正确的列。</p><p>创建 <code>NavigationSplitViewColumn</code> 类型的 <code>State</code> 值，然后将该状态的 <code>Binding</code> 传递给适当的初始值设定项，例如 <code>init(preferredCompactColumn:sidebar:detail:)</code> 或 <code>init(preferredCompactColumn:sidebar:content:detail:)</code>。</p><p>以下代码显示在 iPhone 上运行时的蓝色详细视图。 当使用该应用程序的人点击后退按钮时，他们会看到黄色视图。 <code>PreferredPreferredCompactColumn</code> 的值将从 <code>.detail</code> 更改为 <code>.sidebar</code>：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@State</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> preferredColumn </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    NavigationSplitViewColumn.detail</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> body: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    NavigationSplitView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">preferredCompactColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $preferredColumn) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Color.yellow</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">detail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Color.blue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="`+p+`" controls="controls"></video></p><h2 id="navigationsplitviewvisibility" tabindex="-1"><code>NavigationSplitViewVisibility</code> <a class="header-anchor" href="#navigationsplitviewvisibility" aria-label="Permalink to &quot;\`NavigationSplitViewVisibility\`&quot;">​</a></h2><p>导航拆分视图中前导列的可见性。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NavigationSplitViewVisibility</span></span></code></pre></div><p>使用此类型的值可以控制 <code>NavigationSplitView</code> 的列的可见性。</p><p>创建具有此类型值的 <code>State</code> 属性，并在创建导航拆分视图时将该状态的 <code>Binding</code> 传递给 <code>init(columnVisibility:sidebar:detail:)</code> 或 <code>init(columnVisibility:sidebar:content:detail:)</code> 初始值设定项。然后，你可以将代码中其他位置的值修改为：</p><ul><li>使用 <code>detailOnly</code> 隐藏除尾随列之外的所有列。</li><li>使用 <code>doubleColumn</code> 隐藏三列导航拆分视图的前导列。</li><li>显示所有列 <code>all</code>。</li><li>使用自动依赖当前上下文的自动行为 <code>automatic</code>。</li></ul><div class="tip custom-block"><p class="custom-block-title">提示</p><p>有些平台并不适配每个选项。 例如，macOS 始终显示内容列。</p></div><h2 id="navigationlink" tabindex="-1"><code>NavigationLink</code> <a class="header-anchor" href="#navigationlink" aria-label="Permalink to &quot;\`NavigationLink\`&quot;">​</a></h2><p>控制导航展示的视图。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Destination</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Label </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> View</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Destination </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> View</span></span></code></pre></div><p>通过点击 <code>NavigationLink</code> 以在 <code>NavigationStack</code> 或 <code>NavigationSplitView</code> 内呈现视图。</p><p>你可以通过在 <code>NavigationLink</code> 的闭合方法中提供视图内容来控制 <code>NavigationLink</code> 的视觉外观。</p><p>例如，你可以使用 <code>Label</code> 来显示链接：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    FolderDetail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: workFolder.id)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Work Folder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">systemImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;folder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">font</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.largeTitle)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="`+e+'" alt="NavigationLink"></p><p>对于仅由文本组成的链接，你可以使用便利构造器的初始值设定项，它采用字符串并为你创建文本视图：</p><p><img src="'+h+`" alt="NavigationLinkPlain"></p><h3 id="link-to-a-destination-view" tabindex="-1">Link to a destination view <a class="header-anchor" href="#link-to-a-destination-view" aria-label="Permalink to &quot;Link to a destination view&quot;">​</a></h3><p>你可以通过使用「目标」闭包中提供的目标视图初始化链接来执行导航。</p><p>例如，考虑一个用颜色填充自身的 <code>ColorDetail</code> 视图：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ColorDetail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">View </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> color: Color</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> body: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        color.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(color.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>以下 <code>NavigationStack</code> 提供了三个颜色详细视图的链接：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    List</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Mint&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ColorDetail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .mint) }</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Pink&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ColorDetail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .pink) }</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Teal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ColorDetail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .teal) }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Colors&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="`+k+`" controls="controls"></video></p><h3 id="create-a-presentation-link" tabindex="-1">Create a presentation link <a class="header-anchor" href="#create-a-presentation-link" aria-label="Permalink to &quot;Create a presentation link&quot;">​</a></h3><p>或者，你可以使用导航链接根据显示的数据值执行导航。</p><p>为了支持这一点，请在导航堆栈 <code>NavigationStack</code> 中使用 <code>navigationDestination(for:destination:)</code> 视图修饰符将视图与某种数据关联起来，然后从导航链接显示该数据类型的值。</p><p>以下示例将前面的示例重新实现为一系列演示链接：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    List</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Mint&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Color.mint)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Pink&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Color.pink)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Teal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Color.teal)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationDestination</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Color.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { color </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        ColorDetail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: color)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Colors&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p>将视图与数据分离有利于使用程序式的方式来导航，因为你可以通过记录所呈现的数据来管理导航状态。</p></div><h3 id="control-a-presentation-link-programmatically" tabindex="-1">Control a presentation link programmatically <a class="header-anchor" href="#control-a-presentation-link-programmatically" aria-label="Permalink to &quot;Control a presentation link programmatically&quot;">​</a></h3><p>要以编程方式导航，需引入一个跟踪堆栈上的项目的状态变量。</p><p>例如，你可以创建一个颜色数组来存储上一个示例中的堆栈状态，并将其初始化为空数组以从空堆栈开始：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@State</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> colors: [Color] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span></code></pre></div><p>然后将状态的 <code>Binding</code> 传递给导航堆栈：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $colors) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>你可以使用数组来观察堆栈的当前状态，你还可以修改数组来更改堆栈的内容。</p><p>例如，你可以通过编程方式将蓝色添加到数组中，并使用以下方法导航到新的颜色详细信息视图：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> showBlue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    colors.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.blue)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="`+d+`" controls="controls"></video></p><h3 id="coordinate-with-a-list" tabindex="-1">Coordinate with a list <a class="header-anchor" href="#coordinate-with-a-list" aria-label="Permalink to &quot;Coordinate with a list&quot;">​</a></h3><p>你还可以使用导航链接来控制 <code>NavigationSplitView</code> 中的列表选择：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> colors: [Color] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [.mint, .pink, .teal]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@State</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> selection: Color</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Nothing selected by default.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> body: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    NavigationSplitView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        List</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(colors, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: \\.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">selection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $selection) { color </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(color.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: color)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">detail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> color </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> selection {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            ColorDetail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: color)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Pick a color&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>该列表与导航逻辑相协调，因此在代码的其他部分更改选择状态变量时，可以激活与相应颜色对应的导航链接。</p><p>类似地，如果有人选择与特定颜色关联的导航链接，列表将更新选择值，以便代码的其他部分可以读取。</p>`,76),r=[E];function g(c,y,F,C,v,u){return a(),s("div",null,r)}const B=i(o,[["render",g]]);export{m as __pageData,B as default};
