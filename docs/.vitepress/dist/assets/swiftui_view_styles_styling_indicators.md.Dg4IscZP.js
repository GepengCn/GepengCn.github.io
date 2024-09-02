import{_ as l,D as n,c as h,l as s,a as i,I as t,a4 as a,o as p}from"./chunks/framework.C7sZLB-2.js";const k="/gepengcn.github.io/assets/GaugeStyleCircular.C2xaEi7k.png",r="/gepengcn.github.io/assets/GaugeStyleAccessoryCircular.DRKROzZV.png",c="/gepengcn.github.io/assets/GaugeStyleAccessoryCircularCapacity.Cujv9ekM.png",d="/gepengcn.github.io/assets/GaugeStyleLinear.CaIeem3F.png",o="/gepengcn.github.io/assets/GaugeStyleLinearCapacity.BMAgv311.png",g="/gepengcn.github.io/assets/GaugeStyleAccessoryLinear.DDUKaiG4.png",E="/gepengcn.github.io/assets/GaugeStyleAccessoryLinearCapacity.CFWOGGnq.png",y="/gepengcn.github.io/assets/ProgressViewStyleAutomatic.BC91l_lG.mp4",u="/gepengcn.github.io/assets/ProgressViewStyleCircular.BA7Oi6kN.mp4",C="/gepengcn.github.io/assets/ProgressViewStyleLinear.D3TDP5Oz.png",N=JSON.parse('{"title":"Styling indicators","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/view_styles/styling_indicators.md","filePath":"swiftui/view_styles/styling_indicators.md","lastUpdated":1715263663000}'),F={name:"swiftui/view_styles/styling_indicators.md"},m=a('<h1 id="styling-indicators" tabindex="-1">Styling indicators <a class="header-anchor" href="#styling-indicators" aria-label="Permalink to &quot;Styling indicators&quot;">​</a></h1><h2 id="gaugestyle" tabindex="-1"><code>gaugeStyle(_:)</code> <a class="header-anchor" href="#gaugestyle" aria-label="Permalink to &quot;`gaugeStyle(_:)`&quot;">​</a></h2><p>为此视图中的仪表设置样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> style: S) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> S </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GaugeStyle</span></span></code></pre></div>',4),b={id:"circular",tabindex:"-1"},_=s("code",null,"circular",-1),v=s("a",{class:"header-anchor",href:"#circular","aria-label":'Permalink to "`circular` <Badge type="tip" text="watchOS" />"'},"​",-1),B=a(`<p>一种仪表样式，显示一个开放式环形，并带有一个标记，该标记出现在环上的某一点以指示仪表的当前值。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Gauge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: batteryLevel, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Num&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.circular)</span></span></code></pre></div><p><img src="`+k+`" alt="GaugeStyleCircular"></p><p>此样式在仪表中心显示仪表的 <code>currentValueLabel</code> 值。如果在创建仪表时提供了 <code>minimumValueLabel</code> 和 <code>maximumValueLabel</code> 参数，它们将出现在环底部的开口处。否则，仪表会将其标签放置在该位置。</p><h3 id="accessorycircular" tabindex="-1"><code>accessoryCircular</code> <a class="header-anchor" href="#accessorycircular" aria-label="Permalink to &quot;\`accessoryCircular\`&quot;">​</a></h3><p>这是一种仪表样式，展示了一个开放式环，并带有一个标记，该标记沿着环出现在某个点上以指示仪表的当前值。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Gauge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: batteryLevel, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Num&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.accessoryCircular)</span></span></code></pre></div><p><img src="`+r+`" alt="GaugeStyleAccessoryCircular"></p><p>此样式将仪表的 <code>currentValueLabel</code> 值显示在仪表的中心。如果你在创建仪表时提供了 <code>minimumValueLabel</code> 和 <code>maximumValueLabel</code> 参数，它们将出现在环底部的开口处。如果没有提供，仪表则会将其标签放置在那个位置。</p><h3 id="accessorycircularcapacity" tabindex="-1"><code>accessoryCircularCapacity</code> <a class="header-anchor" href="#accessorycircularcapacity" aria-label="Permalink to &quot;\`accessoryCircularCapacity\`&quot;">​</a></h3><p>这是一种仪表样式，显示一个闭合的环，并部分填充以指示仪表的当前值。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Gauge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: batteryLevel, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Num&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.accessoryCircularCapacity)</span></span></code></pre></div><p><img src="`+c+'" alt="GaugeStyleAccessoryCircularCapacity"></p><p>这种风格在仪表的中心显示当前值标签 <code>currentValueLabel</code>，以便直观地展示仪表所代表的数据的即时状态。</p>',14),S={id:"linear",tabindex:"-1"},w=s("code",null,"linear",-1),f=s("a",{class:"header-anchor",href:"#linear","aria-label":'Permalink to "`linear` <Badge type="tip" text="watchOS" />"'},"​",-1),L=a(`<p>一种仪表盘样式，显示一条带有标记的条形，该标记出现在条形上的某个点，以指示仪表盘的当前值。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Gauge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: batteryLevel, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Num&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.linear)</span></span></code></pre></div><p><img src="`+d+`" alt="GaugeStyleLinear"></p><p>如果你在创建仪表盘时提供了 <code>minimumValueLabel</code> 和 <code>maximumValueLabel</code> 参数，它们将分别出现在条形的前端和后端。否则，仪表盘将在前端显示 <code>currentValueLabel</code> 的值。</p><h3 id="linearcapacity" tabindex="-1"><code>linearCapacity</code> <a class="header-anchor" href="#linearcapacity" aria-label="Permalink to &quot;\`linearCapacity\`&quot;">​</a></h3><p>一种仪表盘样式，其中的条形会随着仪表盘当前值的增加而从前端向后端填充。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Gauge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: batteryLevel, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Num&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.linearCapacity)</span></span></code></pre></div><p><img src="`+o+`" alt="GaugeStyleLinearCapacity"></p><p>如果你在创建仪表盘时提供了 <code>minimumValueLabel</code> 和 <code>maximumValueLabel</code> 参数，它们将分别出现在条形的前端和后端。标签显示在仪表盘的上方，而 <code>currentValueLabel</code> 则显示在下方。</p><h3 id="accessorylinear" tabindex="-1"><code>accessoryLinear</code> <a class="header-anchor" href="#accessorylinear" aria-label="Permalink to &quot;\`accessoryLinear\`&quot;">​</a></h3><p>一种仪表盘样式，展示一根条形，并在其上某一点出现一个标记，以此来指示仪表盘的当前值。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Gauge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: batteryLevel, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Num&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.accessoryLinear)</span></span></code></pre></div><p><img src="`+g+`" alt="GaugeStyleAccessoryLinear"></p><p>如果在创建仪表盘时提供了 <code>minimumValueLabel</code> 和 <code>maximumValueLabel</code> 参数，它们将分别显示在条形的起始端和结束端。如果没有提供这些参数，则仪表盘会在起始端显示 <code>currentValueLabel</code> 的值。</p><h3 id="accessorylinearcapacity" tabindex="-1"><code>accessoryLinearCapacity</code> <a class="header-anchor" href="#accessorylinearcapacity" aria-label="Permalink to &quot;\`accessoryLinearCapacity\`&quot;">​</a></h3><p>一种仪表盘样式，其特点是条形会随着仪表盘当前值的增加而从一端（起始端）向另一端（结束端）填充。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Gauge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: batteryLevel, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Num&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gaugeStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.accessoryLinearCapacity)</span></span></code></pre></div><p><img src="`+E+'" alt="GaugeStyleAccessoryLinearCapacity"></p><p>如果在创建仪表盘时提供了 <code>minimumValueLabel</code> 和 <code>maximumValueLabel</code> 参数，它们将分别显示在条形的前端和后端。标签显示在仪表盘的上方，而 <code>currentValueLabel</code>（当前值标签）则显示在下方。</p><h2 id="progressviewstyle" tabindex="-1"><code>progressViewStyle(_:)</code> <a class="header-anchor" href="#progressviewstyle" aria-label="Permalink to &quot;`progressViewStyle(_:)`&quot;">​</a></h2><p>为视图中的进度视图设置样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> progressViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> style: S) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> S </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ProgressViewStyle</span></span></code></pre></div><h3 id="automatic" tabindex="-1"><code>automatic</code> <a class="header-anchor" href="#automatic" aria-label="Permalink to &quot;`automatic`&quot;">​</a></h3><p>在被设置样式的视图当前上下文中，默认的进度视图样式。</p><p>默认样式代表了基于进度视图最初初始化参数以及在视图层次结构中进度视图上下文的推荐样式。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ProgressView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">progressViewStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.circular)</span></span></code></pre></div><p><video src="'+y+'" controls="controls"></video></p><h3 id="circular-1" tabindex="-1"><code>circular</code> <a class="header-anchor" href="#circular-1" aria-label="Permalink to &quot;`circular`&quot;">​</a></h3><p>一种进度视图的风格，它使用圆形仪表盘来表示活动的部分完成情况。</p><p>在 watchOS 以及在小部件和复杂功能中，圆形进度视图将以 <code>accessoryCircularCapacity</code> 风格呈现为一个仪表盘。如果进度视图是不确定的，则该仪表盘为空。</p><p>在没有可用的确定性圆形进度视图风格的情况下，圆形进度视图将采用不确定性的风格。</p><p><video src="'+u+'" controls="controls"></video></p><h3 id="linear-1" tabindex="-1"><code>linear</code> <a class="header-anchor" href="#linear-1" aria-label="Permalink to &quot;`linear`&quot;">​</a></h3><p>一种进度视图，使用水平条形来直观地指示进度情况。</p><p><img src="'+C+'" alt="ProgressViewStyleLinear"></p>',35);function V(q,A,x,P,D,T){const e=n("Badge");return p(),h("div",null,[m,s("h3",b,[_,i(),t(e,{type:"tip",text:"watchOS"}),i(),v]),B,s("h3",S,[w,i(),t(e,{type:"tip",text:"watchOS"}),i(),f]),L])}const O=l(F,[["render",V]]);export{N as __pageData,O as default};