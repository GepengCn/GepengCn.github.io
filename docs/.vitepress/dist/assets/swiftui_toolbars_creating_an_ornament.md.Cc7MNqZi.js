import{_ as n,D as t,c as e,l as s,a as i,I as h,a4 as l,o as p}from"./chunks/framework.C7sZLB-2.js";const k="/gepengcn.github.io/assets/Ornament.CnpCAX2O.png",v=JSON.parse('{"title":"Creating an ornament","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/toolbars/creating_an_ornament.md","filePath":"swiftui/toolbars/creating_an_ornament.md","lastUpdated":1714817379000}'),r={name:"swiftui/toolbars/creating_an_ornament.md"},o=s("h1",{id:"creating-an-ornament",tabindex:"-1"},[i("Creating an ornament "),s("a",{class:"header-anchor",href:"#creating-an-ornament","aria-label":'Permalink to "Creating an ornament"'},"​")],-1),c={id:"ornament-visibility-attachmentanchor-contentalignment-ornament",tabindex:"-1"},d=s("code",null,"ornament(visibility:attachmentAnchor:contentAlignment:ornament:)",-1),E=s("a",{class:"header-anchor",href:"#ornament-visibility-attachmentanchor-contentalignment-ornament","aria-label":'Permalink to "`ornament(visibility:attachmentAnchor:contentAlignment:ornament:)` <Badge type="info" text="visionOS" />"'},"​",-1),g=l(`<p>展示装饰元素。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ornament</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    visibility</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Visibility </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .automatic,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    attachmentAnchor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: OrnamentAttachmentAnchor,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    contentAlignment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Alignment </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .center,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ViewBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ornament: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Content</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Content </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> View</span></span></code></pre></div><p>使用此方法可在指定位置显示装饰元素。下面的示例是在窗口下方显示装饰元素：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;A view with an ornament&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ornament</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attachmentAnchor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">scene</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(.bottom)) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            OrnamentContent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span></code></pre></div><p><img src="`+k+'" alt="Ornament"></p>',5);function m(y,_,C,F,u,b){const a=t("Badge");return p(),e("div",null,[o,s("h2",c,[d,i(),h(a,{type:"info",text:"visionOS"}),i(),E]),g])}const f=n(r,[["render",m]]);export{v as __pageData,f as default};
