import{_ as n,D as e,c as l,l as i,a as s,I as h,a4 as a,o as p}from"./chunks/framework.C7sZLB-2.js";const k="/gepengcn.github.io/assets/NavigationTitlePhone.C-22yxOE.png",o="/gepengcn.github.io/assets/NavigationTitlePad.BEyOorhM.png",g="/gepengcn.github.io/assets/NavigationTitleMac.DjufKlxe.png",E="/gepengcn.github.io/assets/NavigationSubtitle.DDdcqC5E.png",d="/gepengcn.github.io/assets/NavigationDocument.CLlZc2us.png",q=JSON.parse('{"title":"Setting titles for navigation content","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/navigation/setting_titles_for_navigation_content.md","filePath":"swiftui/navigation/setting_titles_for_navigation_content.md","lastUpdated":1714569073000}'),r={name:"swiftui/navigation/setting_titles_for_navigation_content.md"},c=a(`<h1 id="setting-titles-for-navigation-content" tabindex="-1">Setting titles for navigation content <a class="header-anchor" href="#setting-titles-for-navigation-content" aria-label="Permalink to &quot;Setting titles for navigation content&quot;">​</a></h1><h2 id="navigationtitle" tabindex="-1"><code>navigationTitle(_:)</code> <a class="header-anchor" href="#navigationtitle" aria-label="Permalink to &quot;\`navigationTitle(_:)\`&quot;">​</a></h2><p>使用字符串配置用于导航目的的视图标题。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Form</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello SwiftUI&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;列表&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>视图的导航标题用于直观地显示界面当前的导航状态。</p><ul><li>在 iOS 和 watchOS 上，当视图导航到导航视图内部时，该视图的标题将显示在导航栏中。</li></ul><p><img src="`+k+'" alt="NavigationTitlePhone"></p><ul><li>在 iPadOS 上，主要目的地的导航标题在应用程序切换器中反映为窗口标题。</li></ul><p><img src="'+o+'" alt="NavigationTitlePad"></p><ul><li>与 macOS 类似，主要目的地的标题用作标题栏、Windows 菜单和任务控制中的窗口标题。</li></ul><p><img src="'+g+`" alt="NavigationTitleMac"></p><h2 id="navigationtitle-title-binding-string" tabindex="-1"><code>navigationTitle(_ title: Binding&lt;String&gt;)</code> <a class="header-anchor" href="#navigationtitle-title-binding-string" aria-label="Permalink to &quot;\`navigationTitle(_ title: Binding&lt;String&gt;)\`&quot;">​</a></h2><p>可以通过绑定值，动态修改导航标题。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@State</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> title: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">String</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;列表&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Form</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello SwiftUI&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($title)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,14),y={id:"navigationsubtitle",tabindex:"-1"},u=i("code",null,"navigationSubtitle(_:)",-1),F=i("a",{class:"header-anchor",href:"#navigationsubtitle","aria-label":'Permalink to "`navigationSubtitle(_:)` <Badge type="tip" text="macOS" />"'},"​",-1),v=a(`<p>使用字符串配置用于导航目的的视图副标题。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationStack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Form</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello SwiftUI&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;列表&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationSubtitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;副标题&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>视图的导航副标题用于在导航标题旁边提供附加上下文信息。</p><p>在 macOS 上，主要目的地的副标题与标题栏中的导航标题一起显示。</p><p><img src="`+E+`" alt="NavigationSubtitle"></p><h2 id="navigationdocument" tabindex="-1"><code>navigationDocument(_:)</code> <a class="header-anchor" href="#navigationdocument" aria-label="Permalink to &quot;\`navigationDocument(_:)\`&quot;">​</a></h2><p>配置视图的用以导航的文档。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;My Title&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(myURL)</span></span></code></pre></div><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;My Title&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        myDocument,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        preview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SharePreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;My Preview Title&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: myDocument.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><ul><li>在 iOS、iPadOS 中，这会使用预览文档的标题填充标题菜单。</li><li>在 macOS 中，这会充当代理图标。</li></ul><p><img src="`+d+'" alt="NavigationDocument"></p>',11);function _(C,m,b,B,f,S){const t=e("Badge");return p(),l("div",null,[c,i("h2",y,[u,s(),h(t,{type:"tip",text:"macOS"}),s(),F]),v])}const w=n(r,[["render",_]]);export{q as __pageData,w as default};
