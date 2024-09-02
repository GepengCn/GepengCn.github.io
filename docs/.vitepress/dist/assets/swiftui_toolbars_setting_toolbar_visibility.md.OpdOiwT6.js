import{_ as i,c as s,o as a,a4 as t}from"./chunks/framework.C7sZLB-2.js";const E=JSON.parse('{"title":"Setting toolbar visibility","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/toolbars/setting_toolbar_visibility.md","filePath":"swiftui/toolbars/setting_toolbar_visibility.md","lastUpdated":1714883774000}'),l={name:"swiftui/toolbars/setting_toolbar_visibility.md"},e=t(`<h1 id="setting-toolbar-visibility" tabindex="-1">Setting toolbar visibility <a class="header-anchor" href="#setting-toolbar-visibility" aria-label="Permalink to &quot;Setting toolbar visibility&quot;">​</a></h1><h2 id="toolbar-for" tabindex="-1"><code>toolbar(_:for:)</code> <a class="header-anchor" href="#toolbar-for" aria-label="Permalink to &quot;\`toolbar(_:for:)\`&quot;">​</a></h2><p>明确指出由 SwiftUI 管理的工具栏（或状态栏、导航栏等）的可见性设置。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toolbar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    _</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> visibility: Visibility,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bars: ToolbarPlacement</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View</span></span></code></pre></div><p>首选的可见性设置会向上流动到最近的负责渲染条栏的容器。</p><ul><li>在 iOS 中，这个容器可能是 <code>NavigationView</code> 或 <code>TabView</code>；</li><li>而在 macOS 中，则可能是 <code>WindowGroup</code> 的根视图。</li></ul><p>以下示例展示了一个隐藏导航栏的视图。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toolbar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.hidden)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>你可以同时提供多个 <code>ToolbarPlacement</code> 实例，以便一次性隐藏多个工具栏（或状态栏、导航栏等）。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TabView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    NavigationView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toolbar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                .hidden, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .navigationBar, .tabBar)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">注意</p><p>在 macOS 系统中，如果你为应用的场景提供了 <code>ToolbarCommands</code>，那么当此修饰符的值不是「<code>automatic</code>」时，它会禁用工具栏可见性命令。</p><p>换句话说，在这种情况下，如果设置了非 <code>automatic</code> 的工具栏可见性值，那么与工具栏显示/隐藏相关的命令将不会生效。</p></div><p>根据你所指定的不同类型的条栏以及其上下文环境，系统可能无法满足你设定的可见性需求。也就是说，对于某些条栏，由于系统限制或其他因素，即使指定了特定的可见性设置，也可能无法按照预期完全改变其显示状态。</p><h2 id="toolbarplacement" tabindex="-1"><code>ToolbarPlacement</code> <a class="header-anchor" href="#toolbarplacement" aria-label="Permalink to &quot;\`ToolbarPlacement\`&quot;">​</a></h2><p>工具栏的位置设置。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ToolbarPlacement</span></span></code></pre></div><p>此类型应与诸如 <code>toolbarBackground(_:for:)</code> 和 <code>toolbar(_:for:)</code> 这样的修饰符配合使用，以便于自定义由 SwiftUI 管理的不同类型条栏的外观。不过请注意，并非所有类型的条栏都支持所有类型的定制。</p><p>通过查阅 <code>ToolbarItemPlacement</code> ，你可以了解到可以在这些工具栏的不同区域放置你自定义控件的各种可能性。</p><ul><li><code>automatic</code></li><li><code>accessoryBar(id:)</code></li><li><code>bottomBar</code></li><li><code>bottomOrnament</code></li><li><code>navigationBar</code></li><li><code>tabBar</code></li><li><code>windowToolbar</code></li></ul>`,18),n=[e];function o(p,h,d,c,r,k){return a(),s("div",null,n)}const b=i(l,[["render",o]]);export{E as __pageData,b as default};