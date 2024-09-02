import{_ as l,D as h,c as p,l as s,a as i,I as n,a4 as a,o as k}from"./chunks/framework.C7sZLB-2.js";const e="/gepengcn.github.io/assets/NavigationSplitViewStyleAutomatic.UEBdZ14P.png",E="/gepengcn.github.io/assets/NavigationSplitViewStyleBalanced.CbJLsNqv.png",d="/gepengcn.github.io/assets/TabViewStyleAutomatic.DxTML8nX.mp4",o="/gepengcn.github.io/assets/TabViewStylePage.DgE7DDVN.mp4",r="/gepengcn.github.io/assets/TabViewStylePageIndex.CY30SjJY.mp4",g="/gepengcn.github.io/assets/TabViewStyleVerticalPage.Dm0EIdUW.mp4",c="/gepengcn.github.io/assets/TabViewStyleVerticalPageIdentity.c67-6nqj.mp4",A=JSON.parse('{"title":"Styling navigation views","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/view_styles/styling_navigation_views.md","filePath":"swiftui/view_styles/styling_navigation_views.md","lastUpdated":1715263663000}'),y={name:"swiftui/view_styles/styling_navigation_views.md"},F=a(`<h1 id="styling-navigation-views" tabindex="-1">Styling navigation views <a class="header-anchor" href="#styling-navigation-views" aria-label="Permalink to &quot;Styling navigation views&quot;">​</a></h1><h2 id="navigationsplitviewstyle" tabindex="-1"><code>navigationSplitViewStyle(_:)</code> <a class="header-anchor" href="#navigationsplitviewstyle" aria-label="Permalink to &quot;\`navigationSplitViewStyle(_:)\`&quot;">​</a></h2><p>此操作为该视图中的导航分割视图设置样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> navigationSplitViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> style: S) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> S </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NavigationSplitViewStyle</span></span></code></pre></div><h3 id="automatic" tabindex="-1"><code>automatic</code> <a class="header-anchor" href="#automatic" aria-label="Permalink to &quot;\`automatic\`&quot;">​</a></h3><p>一种根据当前上下文自动确定其外观的导航分割样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationSplitView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sidebar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">detail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Detail&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationSplitViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.automatic)</span></span></code></pre></div><p><img src="`+e+`" alt="NavigationSplitViewStyleAutomatic"></p><h3 id="balanced" tabindex="-1"><code>balanced</code> <a class="header-anchor" href="#balanced" aria-label="Permalink to &quot;\`balanced\`&quot;">​</a></h3><p>一种导航分割样式，当显示 <code>leading</code> 列或多列时，会减小详情内容的大小以腾出空间。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NavigationSplitView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sidebar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">detail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Detail&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationSplitViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.balanced)</span></span></code></pre></div><p><img src="`+E+'" alt="NavigationSplitViewStyleAutomatic"></p><h3 id="prominentdetail" tabindex="-1"><code>prominentDetail</code> <a class="header-anchor" href="#prominentdetail" aria-label="Permalink to &quot;`prominentDetail`&quot;">​</a></h3><p>一种导航分割样式，尝试在隐藏或显示 <code>leading</code> 列时保持详情内容的大小不变。</p><p><img src="'+e+`" alt="NavigationSplitViewStyleAutomatic"></p><h2 id="tabviewstyle" tabindex="-1"><code>tabViewStyle(_:)</code> <a class="header-anchor" href="#tabviewstyle" aria-label="Permalink to &quot;\`tabViewStyle(_:)\`&quot;">​</a></h2><p>此操作为当前环境中的标签视图设置样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> tabViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> style: S) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> S </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TabViewStyle</span></span></code></pre></div><h3 id="automatic-1" tabindex="-1"><code>automatic</code> <a class="header-anchor" href="#automatic-1" aria-label="Permalink to &quot;\`automatic\`&quot;">​</a></h3><p>默认的 <code>TabView</code> 样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">View </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> body: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        TabView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            List</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                LabeledContent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;备注&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;12345&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tabItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                Label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;首页&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">systemImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.circle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            List</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;开关&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constant</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tabItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                Label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;设置&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">systemImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gear&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tabViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.automatic)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="`+d+`" controls="controls"></video></p><h3 id="page" tabindex="-1"><code>page</code> <a class="header-anchor" href="#page" aria-label="Permalink to &quot;\`page\`&quot;">​</a></h3><p>实现分页滚动的 <code>TabView</code> 样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TabView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.blue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.yellow</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tabViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.page)</span></span></code></pre></div><p><video src="`+o+'" controls="controls"></video></p><h3 id="page-indexdisplaymode" tabindex="-1"><code>page(indexDisplayMode:)</code> <a class="header-anchor" href="#page-indexdisplaymode" aria-label="Permalink to &quot;`page(indexDisplayMode:)`&quot;">​</a></h3><p>实现带有索引显示模式的分页滚动的 <code>TabView</code> 样式。</p><p><video src="'+r+`" controls="controls"></video></p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TabView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.blue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.yellow</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tabViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">page</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">indexDisplayMode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .never))</span></span></code></pre></div>`,30),C={id:"verticalpage",tabindex:"-1"},u=s("code",null,"verticalPage",-1),v=s("a",{class:"header-anchor",href:"#verticalpage","aria-label":'Permalink to "`verticalPage` <Badge type="warning" text="watchOS" />"'},"​",-1),b=a(`<p>实现垂直页面交互和外观的 <code>TabView</code> 样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TabView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.blue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.yellow</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.white</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tabViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.verticalPage)</span></span></code></pre></div><p><video src="`+g+'" controls="controls"></video></p>',3),_={id:"verticalpage-transitionstyle",tabindex:"-1"},w=s("code",null,"verticalPage(transitionStyle:)",-1),m=s("a",{class:"header-anchor",href:"#verticalpage-transitionstyle","aria-label":'Permalink to "`verticalPage(transitionStyle:)` <Badge type="warning" text="watchOS" />"'},"​",-1),B=a(`<div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TabView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.blue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.yellow</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Color.white</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tabViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">verticalPage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">transitionStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">identity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><p><video src="`+c+'" controls="controls"></video></p>',2);function S(V,q,f,T,x,D){const t=h("Badge");return k(),p("div",null,[F,s("h3",C,[u,i(),n(t,{type:"warning",text:"watchOS"}),i(),v]),b,s("h3",_,[w,i(),n(t,{type:"warning",text:"watchOS"}),i(),m]),B])}const N=l(y,[["render",S]]);export{A as __pageData,N as default};
