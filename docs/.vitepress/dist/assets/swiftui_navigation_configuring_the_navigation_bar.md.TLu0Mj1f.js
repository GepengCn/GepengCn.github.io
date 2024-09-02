import{_ as i,c as s,o as a,a4 as n}from"./chunks/framework.C7sZLB-2.js";const t="/gepengcn.github.io/assets/NavigationBarBackButtonHidden.BaqfYwkg.mp4",e="/gepengcn.github.io/assets/NavigationBarTitleDisplayMode.8SEFE4Jg.png",l="/gepengcn.github.io/assets/SidebarRowSizeSetting.DhiiOXph.png",h="/gepengcn.github.io/assets/SidebarRowSize.CjjF88g5.png",v=JSON.parse('{"title":"Configuring the navigation bar","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/navigation/configuring_the_navigation_bar.md","filePath":"swiftui/navigation/configuring_the_navigation_bar.md","lastUpdated":1714617895000}'),p={name:"swiftui/navigation/configuring_the_navigation_bar.md"},k=n(`<h1 id="configuring-the-navigation-bar" tabindex="-1">Configuring the navigation bar <a class="header-anchor" href="#configuring-the-navigation-bar" aria-label="Permalink to &quot;Configuring the navigation bar&quot;">​</a></h1><h2 id="navigationbarbackbuttonhidden" tabindex="-1"><code>navigationBarBackButtonHidden(_:)</code> <a class="header-anchor" href="#navigationbarbackbuttonhidden" aria-label="Permalink to &quot;\`navigationBarBackButtonHidden(_:)\`&quot;">​</a></h2><p>隐藏视图的导航栏后退按钮。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> navigationBarBackButtonHidden</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hidesBackButton: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Bool</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">注意</p><p>仅当此视图位于 <code>NavigationView</code> 内部且在 <code>NavigationView</code> 中可见时，此修饰符才会生效。</p></div><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Form</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        NavigationLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            CustomizedBackButtonView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello SwiftUI&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;列表&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CustomizedBackButtonView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">View </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    @Environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(\\.dismiss) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dismiss</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> body: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, World!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toolbar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                ToolbarItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">placement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .cancellationAction) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                    Button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;后退&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                        dismiss</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationBarBackButtonHidden</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="`+t+'" controls="controls"></video></p><h2 id="navigationbartitledisplaymode" tabindex="-1"><code>navigationBarTitleDisplayMode(_:)</code> <a class="header-anchor" href="#navigationbartitledisplaymode" aria-label="Permalink to &quot;`navigationBarTitleDisplayMode(_:)`&quot;">​</a></h2><p>配置该视图的标题显示模式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> navigationBarTitleDisplayMode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> displayMode: NavigationBarItem.TitleDisplayMode) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View</span></span></code></pre></div><ul><li><code>automatic</code>: 继承上一个导航项的显示模式。</li><li><code>inline</code>: 在导航栏的标准范围内显示标题。</li><li><code>large</code>: 在扩展的导航栏中显示大标题。</li></ul><p><img src="'+e+'" alt="NavigationBarTitleDisplayMode"></p><h2 id="sidebarrowsize" tabindex="-1"><code>sidebarRowSize</code> <a class="header-anchor" href="#sidebarrowsize" aria-label="Permalink to &quot;`sidebarRowSize`&quot;">​</a></h2><p>侧边栏行的当前大小。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sidebarRowSize: SidebarRowSize { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">get</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span></code></pre></div><p>在 macOS 上，侧边栏行具有三种不同的大小：小、中和大。</p><p>大小主要由当前用户在外观设置中的「边栏图标大小」控制，适用于所有应用程序。</p><p><img src="'+l+'" alt="SidebarRowSizeSetting"></p><p>在所有其他平台上（除了 macOS），唯一支持的侧边栏大小是 <code>.medium</code>。</p><p>可以使用 <code>EnvironmentValues.sidebarRowSize</code> 在环境中读取此大小。</p><p><img src="'+h+'" alt="SidebarRowSize"></p>',21),d=[k];function o(r,g,E,c,y,u){return a(),s("div",null,d)}const b=i(p,[["render",o]]);export{v as __pageData,b as default};