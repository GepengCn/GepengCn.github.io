import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.C7sZLB-2.js";const g=JSON.parse('{"title":"Specifying the role of toolbar content","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/toolbars/specifying_the_role_of_toolbar_content.md","filePath":"swiftui/toolbars/specifying_the_role_of_toolbar_content.md","lastUpdated":1714814076000}'),e={name:"swiftui/toolbars/specifying_the_role_of_toolbar_content.md"},l=t(`<h1 id="specifying-the-role-of-toolbar-content" tabindex="-1">Specifying the role of toolbar content <a class="header-anchor" href="#specifying-the-role-of-toolbar-content" aria-label="Permalink to &quot;Specifying the role of toolbar content&quot;">​</a></h1><h2 id="toolbarrole" tabindex="-1"><code>toolbarRole(_:)</code> <a class="header-anchor" href="#toolbarrole" aria-label="Permalink to &quot;\`toolbarRole(_:)\`&quot;">​</a></h2><p>设置工具栏填充内容的语义角色。</p><p>此配置用于确定和定义填充在工具栏中的各项内容在用户界面交互及辅助功能方面的语义角色，以确保工具栏的各项元素在逻辑上合理组织并适配不同用户的使用习惯和辅助设备需求。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toolbarRole</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> role: ToolbarRole) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View</span></span></code></pre></div><h2 id="toolbarrole-1" tabindex="-1"><code>ToolbarRole</code> <a class="header-anchor" href="#toolbarrole-1" aria-label="Permalink to &quot;\`ToolbarRole\`&quot;">​</a></h2><p>填充工具栏的内容之用途。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ToolbarRole</span></span></code></pre></div><p>工具栏角色为填充在工具栏中的内容提供了关于其用途的描述。内容的目的会影响工具栏呈现内容的方式。</p><p>例如，在 iPadOS 中，浏览器会自动将工具栏标题左对齐。</p><p>你需要将此类型提供给 <code>toolbarRole(_:)</code> 修饰符：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">navigationTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Browser&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toolbarRole</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.browser)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">toolbar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        ToolbarItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">placement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .primaryAction) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            AddButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><ul><li><code>browser</code>: 对于可以向前和向后导航的内容，请使用这一角色。在 iPadOS 中，这将会使导航标题左对齐，并允许工具栏项目占据导航栏中央位置。</li><li><code>editor</code>: 对于主要用于展示文档类内容编辑控制工具的工具栏，请使用这一角色。在 iPadOS 环境下，这将会使导航标题左对齐，允许工具栏项目居中显示，并为工具栏中存在的任何返回按钮提供自定义样式。</li><li><code>navigationStack</code>: 对于可以被推入和弹出的内容，请使用这一角色。</li><li><code>automatic</code>: 在 iOS、tvOS 和 watchOS 中，这个角色会被解析为 <code>navigationStack</code> 角色。而在 macOS 中，则会解析为 <code>editor</code> 角色。</li></ul>`,13),o=[l];function n(h,p,r,k,c,d){return a(),i("div",null,o)}const _=s(e,[["render",n]]);export{g as __pageData,_ as default};