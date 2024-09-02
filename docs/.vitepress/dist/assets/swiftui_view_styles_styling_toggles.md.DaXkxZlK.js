import{_ as e,D as l,c as n,l as s,a as i,I as h,a4 as t,o as p}from"./chunks/framework.C7sZLB-2.js";const k="/gepengcn.github.io/assets/ToggleStyleTVOS.BJlulch2.mp4",g="/gepengcn.github.io/assets/ToggleStyle-automatic-1-iOS@2x.uqMYowgW.png",o="/gepengcn.github.io/assets/ToggleStyle-automatic-1-macOS@2x.DxTvwm17.png",d="/gepengcn.github.io/assets/ToggleStyle-button-1-iOS@2x.B1ceRn0N.png",c="/gepengcn.github.io/assets/ToggleStyle-button-1-macOS@2x.CVya3RP4.png",r="/gepengcn.github.io/assets/ToggleStyleMacOS.d5sxUyw1.mp4",E="/gepengcn.github.io/assets/ToggleStyleSwitchIOS.DVWxX-Bh.png",y="/gepengcn.github.io/assets/ToggleStyleSwitchMacOS.CJMA8LS2.png",u="/gepengcn.github.io/assets/ToggleStyleSwitchwatchOS.CdMAiH6h.png",P=JSON.parse('{"title":"Styling toggles","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/view_styles/styling_toggles.md","filePath":"swiftui/view_styles/styling_toggles.md","lastUpdated":1715263663000}'),S={name:"swiftui/view_styles/styling_toggles.md"},F=t('<h1 id="styling-toggles" tabindex="-1">Styling toggles <a class="header-anchor" href="#styling-toggles" aria-label="Permalink to &quot;Styling toggles&quot;">​</a></h1><h2 id="togglestyle" tabindex="-1"><code>toggleStyle(_:)</code> <a class="header-anchor" href="#togglestyle" aria-label="Permalink to &quot;`toggleStyle(_:)`&quot;">​</a></h2><p>为视图层级中的切换按钮设置样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toggleStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> style: S) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> S </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ToggleStyle</span></span></code></pre></div><p>在 <code>Toggle</code> 实例上使用此修饰符，以设置定义控件外观和行为的样式。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>类似于 <code>toggleStyle(_:)</code> 为切换按钮所做的，<code>labelStyle(_:)</code> 修饰符为层级中的 <code>Label</code> 实例设置样式。上面的示例演示了紧凑的仅图标样式( <code>compact iconOnly</code> )，这在空间受限的上下文中对按钮切换特别有用。为了更好的可访问性，请始终包含一个描述性的标题。</p></div><h3 id="automatic" tabindex="-1"><code>automatic</code> <a class="header-anchor" href="#automatic" aria-label="Permalink to &quot;`automatic`&quot;">​</a></h3><p>默认的切换按钮样式。</p><p>自动样式产生的外观根据平台不同而变化，在大多数上下文中使用以下样式：</p><table><thead><tr><th>Platform</th><th style="text-align:center;">Default style</th></tr></thead><tbody><tr><td>iOS, iPadOS</td><td style="text-align:center;">switch</td></tr><tr><td>macOS</td><td style="text-align:center;">checkbox</td></tr><tr><td>tvOS</td><td style="text-align:center;">A tvOS-specific button style</td></tr><tr><td>watchOS</td><td style="text-align:center;">switch</td></tr></tbody></table><p>tvOS 的默认样式表现得像一个按钮。然而，与某些其他平台上可用的按钮样式不同，tvOS 切换按钮会占用其父容器提供的尽可能多的水平空间，并同时显示切换按钮的标签以及一个指示切换状态的文本字段。通常，你会将 tvOS 切换按钮收集到一个 <code>List</code> 中：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">List</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Show Lyrics&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isShowingLyrics)</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Shuffle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isShuffling)</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Repeat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isRepeating)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><video src="'+k+`" controls="controls"></video></p><p>切换按钮的自动外观在某些上下文中会有所不同：</p><p>作为你提供给任一工具栏修饰符（如 <code>toolbar(content:)</code> ）内容一部分出现的切换按钮，默认使用按钮样式。</p><p>出现在菜单中的切换按钮使用了一种无法显式创建的样式：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Menu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Playback&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Show Lyrics&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isShowingLyrics)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Shuffle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isShuffling)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Repeat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isRepeating)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>SwiftUI 显示切换按钮的标签，并且只在开启状态下显示勾选标记：</p><table><thead><tr><th>Platform</th><th style="text-align:center;">Appearance</th></tr></thead><tbody><tr><td>iOS, iPadOS</td><td style="text-align:center;"><img src="`+g+'" alt="View-toggleStyle-1-iOS@2x"></td></tr><tr><td>macOS</td><td style="text-align:center;"><img src="'+o+`" alt="View-toggleStyle-1-macOS@2x"></td></tr></tbody></table><h3 id="button" tabindex="-1"><code>button</code> <a class="header-anchor" href="#button" aria-label="Permalink to &quot;\`button\`&quot;">​</a></h3><p>一种切换样式，显示为按钮，其标签作为标题。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isFlagged) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Flag&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">systemImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;flag.fill&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toggleStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.button)</span></span></code></pre></div><p>此样式生成一个带有标签的按钮，该标签描述了切换按钮的目的。用户点击或点击按钮来改变切换的状态。按钮通过用着色颜色填充背景来指示开启状态。你可以使用 <code>tint(_:)</code> 修饰符更改着色颜色。SwiftUI 将此样式作为出现在工具栏中的切换按钮的默认样式。</p><p>下表分别显示了关闭和开启状态下的切换按钮：</p><table><thead><tr><th>Platform</th><th style="text-align:center;">Appearance</th></tr></thead><tbody><tr><td>iOS, iPadOS</td><td style="text-align:center;"><img src="`+d+'" alt="View-toggleStyle-1-iOS@2x"></td></tr><tr><td>macOS</td><td style="text-align:center;"><img src="'+c+'" alt="View-toggleStyle-1-macOS@2x"></td></tr></tbody></table><p><code>Label</code> 实例是作为按钮切换标签的一个不错选择。根据上下文，SwiftUI 会决定是否同时显示标题和图标，就像上述示例那样，或者仅当切换按钮出现在工具栏中时只显示图标。你也可以通过添加 <code>labelStyle(_:)</code> 修饰符来控制标签的样式。无论如何，SwiftUI 都会始终使用标题通过 <code>VoiceOver</code> 来识别控件。</p>',26),C={id:"checkbox",tabindex:"-1"},b=s("code",null,"checkbox",-1),_=s("a",{class:"header-anchor",href:"#checkbox","aria-label":'Permalink to "`checkbox` <Badge type="tip" text="macOS" />"'},"​",-1),m=t(`<p>一种切换样式，显示复选框后跟其标签。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Close windows when quitting an app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $doesClose)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toggleStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.checkbox)</span></span></code></pre></div><p>此样式生成一个描述切换目的的标签和一个显示切换状态的复选框。要更改切换状态，用户需点击复选框或其标签：</p><p><video src="`+r+'" controls="controls"></video></p><p>该样式使复选框的尾部与标签的头部对齐，并根据需要占用水平空间以适应标签的宽度，直至达到切换按钮所在父视图所提供的最大宽度。</p><p>在大多数情况下，当你未设置特定样式或应用自动样式时，这便是 macOS 中的默认样式。表单是呈现一系列复选框并保持适当间距和对齐的理想方式。</p><h3 id="switch" tabindex="-1"><code>switch</code> <a class="header-anchor" href="#switch" aria-label="Permalink to &quot;`switch`&quot;">​</a></h3><p>一种切换样式，显示前置标签和后置开关。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Enhance Sound&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">isOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $isEnhanced)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toggleStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.switch)</span></span></code></pre></div><p>此样式生成一个描述切换功能的标签和一个显示切换状态的开关。用户点击或敲击开关来改变切换的状态。尽管在用户界面中使用开关的方式因平台而略有不同，如《人机界面指南》中的「切换控件」部分所述，但其默认外观在各平台间基本保持一致。</p><p>iOS</p><p><img src="'+E+'" alt="ToggleStyleSwitchIOS"></p><p>macOS</p><p><img src="'+y+'" alt="ToggleStyleSwitchIOS"></p><p>watchOS</p><p><img src="'+u+'" alt="ToggleStyleSwitchIOS"></p><p>在 iOS 和 watchOS 上，标签和开关会利用父容器提供的全部水平空间，通过将标签的起始边缘与容器视图的起始边缘对齐，以及将开关的结束边缘与容器视图的结束边缘对齐。而在 macOS 上，该样式为了尽可能减少水平空间的占用，会将标签的结束边缘与开关的起始边缘对齐。当此样式出现在表单中时，SwiftUI 会帮助你管理间距和对齐。</p><p>当你没有特别设置样式，或者应用了自动样式时，SwiftUI 在大多数情况下会将此样式作为 iOS 和 watchOS 上的默认样式。</p>',18);function w(O,f,v,B,x,T){const a=l("Badge");return p(),n("div",null,[F,s("h3",C,[b,i(),h(a,{type:"tip",text:"macOS"}),i(),_]),m])}const I=e(S,[["render",w]]);export{P as __pageData,I as default};
