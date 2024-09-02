import{_ as i,c as s,o as a,a4 as e}from"./chunks/framework.C7sZLB-2.js";const g=JSON.parse('{"title":"Hiding upper limbs during immersion","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/immersive_spaces/hiding_upper_limbs_during_immersion.md","filePath":"swiftui/immersive_spaces/hiding_upper_limbs_during_immersion.md","lastUpdated":1714547705000}'),t={name:"swiftui/immersive_spaces/hiding_upper_limbs_during_immersion.md"},p=e('<h1 id="hiding-upper-limbs-during-immersion" tabindex="-1">Hiding upper limbs during immersion <a class="header-anchor" href="#hiding-upper-limbs-during-immersion" aria-label="Permalink to &quot;Hiding upper limbs during immersion&quot;">​</a></h1><h2 id="upperlimbvisibility" tabindex="-1"><code>upperLimbVisibility(_:)</code> <a class="header-anchor" href="#upperlimbvisibility" aria-label="Permalink to &quot;`upperLimbVisibility(_:)`&quot;">​</a></h2><p>在展示沉浸式空间场景时，设置用户上肢的首选可见性。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 设置场景</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> upperLimbVisibility</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> preferredVisibility: Visibility) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Scene</span></span></code></pre></div><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//设置视图</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> upperLimbVisibility</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> preferredVisibility: Visibility) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> View</span></span></code></pre></div><p>系统可以在完全沉浸式体验中显示用户的上肢，但你也可以选择隐藏它们，例如，为了显示虚拟手代替。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>这个修饰符只设置一个偏好，并不保证系统最终会遵循这一偏好。</p><p>如果沉浸式空间当前不可见，系统可能无法遵循这一偏好。</p></div>',7),n=[p];function l(r,h,d,k,o,m){return a(),s("div",null,n)}const u=i(t,[["render",l]]);export{g as __pageData,u as default};