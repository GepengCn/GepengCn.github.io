import{_ as i,c as s,o as a,a4 as e}from"./chunks/framework.C7sZLB-2.js";const g=JSON.parse('{"title":"Adjusting text size","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/text_input_and_output/adjusting_text_size.md","filePath":"swiftui/text_input_and_output/adjusting_text_size.md","lastUpdated":1715694314000}'),t={name:"swiftui/text_input_and_output/adjusting_text_size.md"},n=e(`<h1 id="adjusting-text-size" tabindex="-1">Adjusting text size <a class="header-anchor" href="#adjusting-text-size" aria-label="Permalink to &quot;Adjusting text size&quot;">​</a></h1><h2 id="dynamictypesize" tabindex="-1"><code>dynamicTypeSize(_:)</code> <a class="header-anchor" href="#dynamictypesize" aria-label="Permalink to &quot;\`dynamicTypeSize(_:)\`&quot;">​</a></h2><p>限制视图中的动态字体大小在给定范围内。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dynamicTypeSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> range: T) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> T </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RangeExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, T.Bound </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DynamicTypeSize</span></span></code></pre></div><p>例如，你可以限制 <code>ContentView</code> 中的最大动态字体大小不超过 <code>DynamicTypeSize.large</code>：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dynamicTypeSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DynamicTypeSize.large)</span></span></code></pre></div><p>如果动态字体大小被限制在多个范围内，结果是它们的交集：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Dynamic Type sizes are from .small to .large</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dynamicTypeSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.small</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dynamicTypeSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DynamicTypeSize.large)</span></span></code></pre></div><p>在应用范围后，仍然可以设置特定的动态字体大小：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Dynamic Type size is .xLarge</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dynamicTypeSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.xLarge)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dynamicTypeSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DynamicTypeSize.large)</span></span></code></pre></div><p>在限制动态字体大小时，考虑是否添加使用 <code>accessibilityShowsLargeContentViewer()</code> 的大内容视图是合适的。</p><ul><li><p><code>xSmall</code>: 一个额外小的尺寸。</p></li><li><p><code>small</code>: 一个小的尺寸。</p></li><li><p><code>medium</code>: 一个中等的尺寸。</p></li><li><p><code>large</code>: 一个大的尺寸。</p></li><li><p><code>xLarge</code>: 一个超大的尺寸。</p></li><li><p><code>xxLarge</code>: 一个特大的尺寸。</p></li><li><p><code>xxxLarge</code>: 一个超级大的尺寸。</p></li><li><p><code>accessibility1</code>: 第一种无障碍尺寸。</p></li><li><p><code>accessibility2</code>: 第二种无障碍尺寸。</p></li><li><p><code>accessibility3</code>: 第三种无障碍尺寸。</p></li><li><p><code>accessibility4</code>: 第四种无障碍尺寸。</p></li><li><p><code>accessibility5</code>: 第五种无障碍尺寸。</p></li></ul>`,12),p=[n];function l(h,k,d,c,o,r){return a(),s("div",null,p)}const y=i(t,[["render",l]]);export{g as __pageData,y as default};
