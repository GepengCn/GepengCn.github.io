import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.C7sZLB-2.js";const n="/gepengcn.github.io/assets/Applying-Custom-Fonts-to-Text-1@2x.B3S6kSyS.png",e="/gepengcn.github.io/assets/Applying-Custom-Fonts-to-Text-2@2x.Cxqz56Ce.png",p="/gepengcn.github.io/assets/Applying-Custom-Fonts-to-Text-3@2x.C9gLU0uo.png",l="/gepengcn.github.io/assets/Applying-Custom-Fonts-to-Text-4@2x.DcBeEt5l.png",f=JSON.parse('{"title":"Setting a font","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/text_input_and_output/setting_a_font.md","filePath":"swiftui/text_input_and_output/setting_a_font.md","lastUpdated":1715694314000}'),h={name:"swiftui/text_input_and_output/setting_a_font.md"},k=t('<h1 id="setting-a-font" tabindex="-1">Setting a font <a class="header-anchor" href="#setting-a-font" aria-label="Permalink to &quot;Setting a font&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#applying-custom-fonts-to-text">Applying custom fonts to text</a><ul><li><a href="#add-the-font-files-to-the-project">Add the font files to the project</a></li><li><a href="#identify-the-font-files-to-include-in-the-app-bundle">Identify the font files to include in the app bundle</a></li><li><a href="#apply-a-font-supporting-dynamic-sizing">Apply a font supporting dynamic sizing</a></li><li><a href="#scale-padding-using-scaled-metric">Scale padding using scaled metric</a></li></ul></li></ul></nav><h2 id="applying-custom-fonts-to-text" tabindex="-1">Applying custom fonts to text <a class="header-anchor" href="#applying-custom-fonts-to-text" aria-label="Permalink to &quot;Applying custom fonts to text&quot;">​</a></h2><p>在你的应用中添加并使用一种字体，该字体能够与动态类型（Dynamic Type）一起缩放。</p><p>SwiftUI 支持使用内置字体来设置文本视图样式，并默认使用系统字体。你可以通过在 Xcode 项目中包含字体文件来使用自定义字体，而不是使用系统提供的字体。要使用自定义字体，请将包含你已授权字体的文件添加到应用中，然后将该字体应用于文本视图或将其设置为容器视图中的默认字体。SwiftUI 的自适应文本显示会使用动态类型（Dynamic Type）自动缩放字体。</p><p>动态类型允许用户选择屏幕上显示文本内容的大小。它帮助需要更大文本以便更好阅读的用户，并适应那些能阅读更小文本的用户，允许屏幕上显示更多信息。</p><h3 id="add-the-font-files-to-the-project" tabindex="-1">Add the font files to the project <a class="header-anchor" href="#add-the-font-files-to-the-project" aria-label="Permalink to &quot;Add the font files to the project&quot;">​</a></h3><p>要将字体文件添加到你的 Xcode 项目中：</p><ol><li>在 Xcode 中，选择项目导航器。</li><li>从 Finder 窗口拖动你的字体文件到你的项目中。这将把字体复制到你的项目里。</li><li>选择字体文件或包含字体的文件夹，并验证文件是否已勾选你应用的目标。</li></ol><p><img src="'+n+'" alt="Applying-Custom-Fonts-to-Text-1@2x"></p><h3 id="identify-the-font-files-to-include-in-the-app-bundle" tabindex="-1">Identify the font files to include in the app bundle <a class="header-anchor" href="#identify-the-font-files-to-include-in-the-app-bundle" aria-label="Permalink to &quot;Identify the font files to include in the app bundle&quot;">​</a></h3><p>要在应用包中包含字体文件，请按以下步骤操作：</p><p>对于 iOS、watchOS、tvOS 或 Mac Catalyst 目标，将 <code>UIAppFonts</code> 键添加到应用的 Info.plist 文件中。对于键的值，请提供一个字符串数组，包含任何添加的字体文件的相对路径。对于 macOS 应用目标，使用你的目标 Info.plist 文件中的 <code>ATSApplicationFontsPath</code> 键，并为该键提供包含字体的文件夹名称。</p><p>在下面的示例中，字体文件位于 project_fonts 目录内，因此你在 Info.plist 文件中使用 <code>project_fonts/MyFont.ttf</code> 作为字符串值。</p><p><img src="'+e+`" alt="Applying-Custom-Fonts-to-Text-2@2x"></p><h3 id="apply-a-font-supporting-dynamic-sizing" tabindex="-1">Apply a font supporting dynamic sizing <a class="header-anchor" href="#apply-a-font-supporting-dynamic-sizing" aria-label="Permalink to &quot;Apply a font supporting dynamic sizing&quot;">​</a></h3><p>要在 SwiftUI 中使用自定义字体并应用到文本视图，请使用 <code>custom(_:size:)</code> 方法获取字体实例，并使用 <code>font(_:)</code> 修饰符应用它。在使用 <code>custom(_:size:)</code> 获取字体时，需要确保字体名称与字体的 PostScript 名称匹配。你可以通过使用 Font Book 应用打开字体并选择 Font Info 标签来找到字体的 PostScript 名称。如果 SwiftUI 无法检索并应用你的字体，它将使用默认的系统字体来渲染文本视图。</p><p>以下示例展示了如何将 MyFont 应用到文本视图：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">font</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Font.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">custom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MyFont&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><p>此字体将从提供的大小自适应缩放，以匹配默认的文本样式 body。使用 <code>relativeTo</code> 参数可以指定除了默认的 body 外的其他文本样式以进行缩放。例如，要设置字体大小为 32 点并相对于标题样式自适应缩放：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">font</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Font.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">custom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MyFont&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">relativeTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .title))</span></span></code></pre></div><p>SwiftUI 不会为字体合成粗体或斜体样式。如果字体支持加权或斜体变体，你可以通过使用 <code>weight(_:)</code> 或 <code>italic()</code> 修饰符来自定义文本视图的排版风格。</p><p>关于选择字体以增强你的应用在目标平台上的设计，可以参阅人机界面指南中的排版部分。</p><h3 id="scale-padding-using-scaled-metric" tabindex="-1">Scale padding using scaled metric <a class="header-anchor" href="#scale-padding-using-scaled-metric" aria-label="Permalink to &quot;Scale padding using scaled metric&quot;">​</a></h3><p><code>@ScaledMetric</code> 属性包装器在视图属性上提供了一个可缩放的值，该值会根据辅助功能设置自动变化。在使用自适应大小的字体时，你可以利用这个属性包装器来缩放文本间距或围绕文本的间距，以改善视觉设计。</p><p>以下示例展示了如何使用 <code>@ScaledMetric</code> 来根据 <code>body</code> 文本样式相对缩放围绕文本视图的填充值，并添加了蓝色边框以标识填充添加的间距：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">View </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    @ScaledMetric</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(relativeTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .body) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scaledPadding: CGFloat </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> body: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;The quick brown fox jumps over the lazy dog.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">font</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Font.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">custom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MyFont&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(scaledPadding)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Color.blue)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ContentView_Previews</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PreviewProvider </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> previews: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>预览显示了以下图片，没有开启任何辅助功能设置：</p><p><img src="`+p+`" alt="Applying-Custom-Fonts-to-Text-3@2x"></p><p>使用 <code>environment(_:_)</code> 修饰符在预览上设置辅助功能大小类别为 <code>ContentSizeCategory.accessibilityLarge</code>：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ContentView_Previews</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PreviewProvider </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> previews: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(\\.sizeCategory, .accessibilityLarge)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>然后，预览显示了以下图片，反映了增加的辅助功能大小和缩放的填充：</p><p><img src="`+l+'" alt="Applying-Custom-Fonts-to-Text-4@2x"></p>',33),o=[k];function d(r,E,c,g,y,u){return a(),i("div",null,o)}const C=s(h,[["render",d]]);export{f as __pageData,C as default};