import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.C7sZLB-2.js";const h="/gepengcn.github.io/assets/AsyncImage-1@2x.BVyaIN-G.png",t="/gepengcn.github.io/assets/AsyncImage-2@2x.CjNYhGYo.png",F=JSON.parse('{"title":"异步加载图像","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/images/loading_images_asynchronously.md","filePath":"swiftui/images/loading_images_asynchronously.md","lastUpdated":1715822854000}'),e={name:"swiftui/images/loading_images_asynchronously.md"},l=n('<h1 id="异步加载图像" tabindex="-1">异步加载图像 <a class="header-anchor" href="#异步加载图像" aria-label="Permalink to &quot;异步加载图像&quot;">​</a></h1><h2 id="asyncimage" tabindex="-1"><code>AsyncImage</code> <a class="header-anchor" href="#asyncimage" aria-label="Permalink to &quot;`AsyncImage`&quot;">​</a></h2><p>异步加载并显示图像的视图。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsyncImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Content </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> View</span></span></code></pre></div><p>此视图使用共享的 <code>URLSession</code> 实例从指定的 <code>URL</code> 加载图像，然后显示它。例如，你可以显示存储在服务器上的图标：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AsyncImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://example.com/icon.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">frame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>在图像加载之前，视图显示一个填充可用空间的标准占位符。加载成功完成后，视图更新以显示图像。在上面的示例中，图标小于框架，因此看起来比占位符小。</p><p><img src="'+h+`" alt="AsyncImage-1@2x"></p><p>你可以使用 <code>init(url:scale:content:placeholder:)</code> 指定自定义占位符。使用此初始化程序，你还可以使用 <code>content</code> 参数来操作加载的图像。例如，你可以添加一个修饰符使加载的图像可调整大小：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AsyncImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://example.com/icon.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) { image </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    image.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">resizable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    ProgressView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">frame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>对于此示例，SwiftUI 首先显示一个 <code>ProgressView</code>，然后显示缩放以适合指定框架的图像：</p><p><img src="`+t+`" alt="AsyncImage-2@2x"></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>你不能将特定于图像的修饰符（如 <code>resizable(capInsets:resizingMode:)</code>）直接应用于 <code>AsyncImage</code>。相反，将它们应用于在定义视图外观时 <code>content</code> 闭包获取的 <code>Image</code> 实例。</p></div><p>要对加载过程进行更多控制，请使用 <code>init(url:scale:transaction:content:)</code> 初始化程序，该初始化程序接受一个 <code>content</code> 闭包，该闭包接收一个 <code>AsyncImagePhase</code> 以指示加载操作的状态。返回一个适合当前阶段的视图：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AsyncImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://example.com/icon.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) { phase </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> image </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> phase.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        image </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Displays the loaded image.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> phase.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">error</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Color.red </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Indicates an error.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Color.blue </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Acts as a placeholder.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="asyncimagephase" tabindex="-1"><code>AsyncImagePhase</code> <a class="header-anchor" href="#asyncimagephase" aria-label="Permalink to &quot;\`AsyncImagePhase\`&quot;">​</a></h2><p>异步图像加载操作的当前阶段。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AsyncImagePhase</span></span></code></pre></div><p>当你使用 <code>init(url:scale:transaction:content:)</code> 初始化程序创建 <code>AsyncImage</code> 实例时，你使用 <code>content</code> 闭包定义视图的外观。SwiftUI 在加载操作期间的不同点使用阶段值调用闭包以指示当前状态。使用阶段来决定绘制什么。例如，如果存在加载的图像，你可以绘制它，绘制指示错误的视图或绘制占位符：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AsyncImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://example.com/icon.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) { phase </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> image </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> phase.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        image </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Displays the loaded image.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> phase.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">error</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Color.red </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Indicates an error.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Color.blue </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Acts as a placeholder.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li><code>empty</code>: 未加载任何图像。</li><li><code>success(Image)</code>: 成功加载图像。</li><li><code>failure(any Error)</code>: 加载图像时出错。</li></ul>`,21),p=[l];function k(E,d,r,g,c,o){return a(),i("div",null,p)}const C=s(e,[["render",k]]);export{F as __pageData,C as default};
