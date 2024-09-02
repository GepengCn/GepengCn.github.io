import{_ as e,c as i,l as s,a,a4 as t,o as n}from"./chunks/framework.C7sZLB-2.js";const l="/gepengcn.github.io/assets/memory_shopping@2x.Bc3cPlKm.png",h="/gepengcn.github.io/assets/memory_increment@2x.BDXNrzIp.png",p="/gepengcn.github.io/assets/memory_share_health_maria@2x.DXAjLFn-.png",k="/gepengcn.github.io/assets/memory_share_health_oscar@2x.CQe8hYsr.png",B=JSON.parse('{"title":"内存安全","description":"","frontmatter":{},"headers":[],"relativePath":"swift/memory_safety.md","filePath":"swift/memory_safety.md","lastUpdated":1714303794000}'),r={name:"swift/memory_safety.md"},d=t(`<h1 id="内存安全" tabindex="-1">内存安全 <a class="header-anchor" href="#内存安全" aria-label="Permalink to &quot;内存安全&quot;">​</a></h1><iframe style="border:none;" width="100%" height="450" src="https://whimsical.com/embed/W4WvyhNYjzZvDCybAsJh6X"></iframe><div class="info custom-block"><p class="custom-block-title">默认情况下，Swift 会阻止你代码里不安全的行为。</p><p>例如，Swift 会保证变量在使用之前就完成初始化，在内存被回收之后就无法被访问，并且数组的索引会做越界检查。</p></div><p>Swift 也保证同时访问同一块内存时不会冲突，通过约束代码里对于存储地址的写操作，去获取那一块内存的访问独占权。</p><ul><li>因为 Swift 自动管理内存，所以大部分时候你完全不需要考虑内存访问的事情。</li><li>然而，理解潜在的冲突也是很重要的，可以避免你写出访问冲突的代码。</li><li>而如果你的代码确实存在冲突，那在编译时或者运行时就会得到错误。</li></ul><h2 id="理解内存访问冲突" tabindex="-1">理解内存访问冲突 <a class="header-anchor" href="#理解内存访问冲突" aria-label="Permalink to &quot;理解内存访问冲突&quot;">​</a></h2><p>内存的访问，会发生在你给变量赋值，或者传递参数给函数时。例如，下面的代码就包含了读和写的访问：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 向 one 所在的内存区域发起一次写操作</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> one </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 向 one 所在的内存区域发起一次读操作</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;We&#39;re number </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\(one)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>内存访问的冲突会发生在你的代码尝试同时访问同一个存储地址的时侯。</p><p>同一个存储地址的多个访问同时发生会造成不可预计或不一致的行为。</p><p>在 Swift 里，有很多修改值的行为都会持续好几行代码，在修改值的过程中进行访问是有可能发生的。</p></div><p>你可以思考一下预算表更新的过程，会看到同样的问题。</p><p>更新预算表总共有两步：</p><ul><li>首先你把预算项的名字和费用加上。</li><li>然后再更新总数来反映预算表的现况。</li></ul><p>在更新之前和之后，你都可以从预算表里读取任何信息并获得正确的答案，就像下面展示的那样。</p><p><img src="`+l+'" alt="SafetyMemoryExample"></p><div class="danger custom-block"><p class="custom-block-title">而当你添加预算项进入表里的时候，它只是在一个临时的，错误的状态，因为总数还没有被更新</p><p>在添加数据的过程中读取总数就会读取到错误的信息。</p></div><p>这个例子也演示了你在修复内存访问冲突时会遇到的问题：有时修复的方式会有很多种，但哪一种是正确的就不总是那么明显了。</p>',16),o={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},c={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 500 688","aria-hidden":"true"},E=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mn"},[s("path",{"data-c":"35",d:"M164 157Q164 133 148 117T109 101H102Q148 22 224 22Q294 22 326 82Q345 115 345 210Q345 313 318 349Q292 382 260 382H254Q176 382 136 314Q132 307 129 306T114 304Q97 304 95 310Q93 314 93 485V614Q93 664 98 664Q100 666 102 666Q103 666 123 658T178 642T253 634Q324 634 389 662Q397 666 402 666Q410 666 410 648V635Q328 538 205 538Q174 538 149 544L139 546V374Q158 388 169 396T205 412T256 420Q337 420 393 355T449 201Q449 109 385 44T229 -22Q148 -22 99 32T50 154Q50 178 61 192T84 210T107 214Q132 214 148 197T164 157Z",style:{"stroke-width":"3"}})])])],-1),g=[E],y=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"5")])],-1),m={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},u={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1500 688","aria-hidden":"true"},F=t('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mn"><path data-c="33" d="M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z" style="stroke-width:3;"></path><path data-c="32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" transform="translate(500,0)" style="stroke-width:3;"></path><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" transform="translate(1000,0)" style="stroke-width:3;"></path></g></g></g>',1),C=[F],b=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"320")])],-1),A=t(`<div class="warning custom-block"><p class="custom-block-title">如果你写过并发和多线程的代码，内存访问冲突也许是同样的问题</p><p>然而，这里访问冲突的讨论是在单线程的情境下讨论的，并没有使用并发或者多线程。</p><p>如果你曾经在单线程代码里有访问冲突，Swift 可以保证你在编译或者运行时会得到错误。</p><p>对于多线程的代码，可以使用 <a href="https://developer.apple.com/documentation/xcode/diagnosing-memory-thread-and-crash-issues-early" target="_blank" rel="noreferrer">Thread Sanitizer</a> 去帮助检测多线程的冲突。</p></div><h3 id="内存访问性质" tabindex="-1">内存访问性质 <a class="header-anchor" href="#内存访问性质" aria-label="Permalink to &quot;内存访问性质&quot;">​</a></h3><p>内存访问冲突时，要考虑内存访问上下文中的这三个性质：</p><div class="tip custom-block"><p class="custom-block-title">冲突会发生在当你有两个访问符合下列的情况：</p><ul><li>访问是读还是写: <strong>至少有一个是写访问</strong></li><li>被访问的存储地址: <strong>它们访问的是同一个存储地址</strong></li><li>访问的时长: <strong>它们的访问在时间线上部分重叠</strong></li></ul></div><ul><li>读和写访问的区别很明显：一个写访问会改变存储地址，而读操作不会。</li><li>存储地址是指向正在访问的东西（例如一个变量，常量或者属性）的位置的值 。</li><li>如果一个访问不可能在其访问期间被其它代码访问，那么就是一个瞬时访问。</li></ul><p>正常来说，两个瞬时访问是不可能同时发生的。大多数内存访问都是瞬时的。</p><p>例如，下面列举的所有读和写访问都是瞬时的：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> oneMore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">than</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> number: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> number </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> myNumber </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">myNumber </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> oneMore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">than</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: myNumber)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(myNumber)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打印“2”</span></span></code></pre></div><p>然而，有几种被称为长期访问的内存访问方式，会在别的代码执行时持续进行。</p><div class="info custom-block"><p class="custom-block-title">瞬时访问和长期访问的区别</p><p>别的代码<strong>有没有可能</strong>在访问期间同时访问 -&gt; 也就是在时间线上的重叠。</p><p>一个长期访问可以被别的长期访问或瞬时访问重叠。</p></div><p>重叠的访问主要出现在：</p><ul><li>使用 <code>in-out</code> 参数的函数和方法。</li><li>结构体的 <code>mutating</code> 方法里。</li></ul><h2 id="in-out-参数的访问冲突" tabindex="-1">In-Out 参数的访问冲突 <a class="header-anchor" href="#in-out-参数的访问冲突" aria-label="Permalink to &quot;In-Out 参数的访问冲突&quot;">​</a></h2><p>一个函数会对它所有的 <code>in-out</code> 参数保持长期写访问。</p><ul><li><code>in-out</code> 参数的写访问会在所有非 <code>in-out</code> 参数处理完之后开始，直到函数执行完毕为止。</li><li>如果有多个 <code>in-out</code> 参数，则写访问开始的顺序与参数的顺序一致。</li></ul><div class="danger custom-block"><p class="custom-block-title">这种长期保持的写访问带来的问题</p><p>你不能再访问以 <code>in-out</code> 形式传入的原始变量，即使作用域原则和访问权限允许——任何访问原始变量的行为都会造成冲突。</p></div><p>例如：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> stepSize </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> increment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> number: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">inout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    number </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> stepSize </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//同时读和写</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">increment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">stepSize)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误：stepSize 访问冲突</span></span></code></pre></div><p>在上面的代码里，<code>stepSize</code> 是一个全局变量，并且它可以在 <code>increment(_:)</code> 里正常访问。</p><ul><li>然而，对于 <code>stepSize</code> 的读访问与 <code>number</code> 的写访问重叠了 ( <code>+=</code> 左边是写，右边是读)。</li><li>就像下面展示的那样，<code>number</code> 和 <code>stepSize</code> 都指向了同一个存储地址。</li></ul><p>同一块内存的读和写访问重叠了，就此产生了冲突。</p><p><img src="`+h+`" alt="memory_increment@2x"></p><p>解决这个冲突的一种方式，是显式拷贝一份 <code>stepSize</code> ：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 显式拷贝</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> copyOfStepSize </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> stepSize </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 读</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">increment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">copyOfStepSize) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//写</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 更新原来的值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">stepSize </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> copyOfStepSize</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// stepSize 现在的值是 2</span></span></code></pre></div><p>当你在调用 <code>increment(_:)</code> 之前做一份拷贝，显然 <code>copyOfStepSize</code> 就会根据当前的 <code>stepSize</code> 增加。</p><p>读访问在写操作之前就已经结束了，所以不会有冲突。</p><p>长期写访问的存在还会造成另一种结果，往同一个函数的多个 <code>in-out</code> 参数里传入同一个变量也会产生冲突，例如：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark has-highlighted vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//会将传入的两个参数平均化</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> balance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">inout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> y: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">inout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sum </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> y</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sum </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sum </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> playerOneScore </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 42</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> playerTwoScore </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 30</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">balance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">playerOneScore, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">playerTwoScore)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 正常</span></span>
<span class="line highlighted error"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">balance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">playerOneScore, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">playerOneScore)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误:playerOneScore 访问冲突</span></span></code></pre></div><ul><li>将 <code>playerOneScore</code> 和 <code>playerTwoScore</code> 作为参数传入不会产生错误 —— 有两个访问重叠了，但它们访问的是不同的内存位置。</li><li>相反，将 <code>playerOneScore</code> 作为参数同时传入就会产生冲突，因为它会发起两个写访问，同时访问同一个的存储地址。</li></ul><div class="warning custom-block"><p class="custom-block-title">注意</p><p>因为操作符也是函数，它们也会对 <code>in-out</code> 参数进行长期访问。</p><p>例如，假设 <code>balance(_:_:)</code> 是一个名为 <code>&lt;^&gt;</code> 的操作符函数，那么 <code>playerOneScore &lt;^&gt; playerOneScore</code> 也会造成像 <code>balance(&amp;playerOneScore, &amp;playerOneScore)</code> 一样的冲突。</p></div><h2 id="方法里-self-的访问冲突" tabindex="-1">方法里 <code>self</code> 的访问冲突 <a class="header-anchor" href="#方法里-self-的访问冲突" aria-label="Permalink to &quot;方法里 \`self\` 的访问冲突&quot;">​</a></h2><p>一个结构体的 <code>mutating</code> 方法会在调用期间对 <code>self</code> 进行写访问。</p><p>例如，想象一下这么一个游戏：</p><ul><li>每一个玩家都有血量，受攻击时血量会下降（ <code>health--</code> ）。</li><li>并且有敌人的数量，使用特殊技能时会减少敌人数量（ <code>energy--</code> ）。</li></ul><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Player</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">String</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> health: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Int</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> energy: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Int</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> maxHealth </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    mutating</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> restoreHealth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        health </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Player.maxHealth </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//访问的是类属性，不是实例属性</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>在上面的 <code>restoreHealth()</code> 方法里，一个对于 <code>self</code> 的写访问会从方法开始直到方法 <code>return</code>。</li><li>在这种情况下，<code>restoreHealth()</code> 里的其它代码不可以对 <code>Player</code> 实例的属性发起重叠的访问。</li></ul><p>下面的 <code>shareHealth(with:)</code> 方法接受另一个 <code>Player</code> 的实例作为 <code>in-out</code> 参数，产生了访问重叠的可能性。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">extension</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Player</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    mutating</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> shareHealth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> teammate: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">inout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Player) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        balance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">teammate.health, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">health)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> oscar </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Player</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Oscar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">health</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">energy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> maria </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Player</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Maria&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">health</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">energy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">oscar.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shareHealth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">maria)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 正常</span></span></code></pre></div><p>上面的例子里，调用 <code>shareHealth(with:)</code> 方法去把 <code>oscar</code> 玩家的血量分享给 <code>maria</code> 玩家并不会造成冲突。</p><ul><li>在方法调用期间会对 <code>oscar</code> 发起写访问，因为在 <code>mutating</code> 方法里 <code>self</code> 就是 <code>oscar</code>。</li><li>同时对于 <code>maria</code> 也会发起写访问，因为 <code>maria</code> 作为 <code>in-out</code> 参数传入。</li></ul><p>过程如下，它们会访问内存的不同位置。即使两个写访问重叠了，它们也不会冲突。</p><p><img src="`+p+`" alt="memory_share_health_maria@2x"></p><p>但是，如果你将 <code>oscar</code> 作为参数传递给 <code>shareHealth(with:)</code>，就会产生冲突：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark has-highlighted vp-code"><code><span class="line highlighted error"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">oscar.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shareHealth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">oscar) </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误：oscar 访问冲突</span></span></code></pre></div><p><code>mutating</code> 方法在调用期间需要：</p><ul><li>对 <code>self</code> 发起写访问。</li><li>而同时 <code>in-out</code> 参数也需要写访问。</li></ul><p>在方法里，<code>self</code> 和 <code>teammate</code> 都指向了同一个存储地址——就像下面展示的那样。对于同一块内存同时进行两个写访问，并且它们重叠了，就此产生了冲突。</p><p><img src="`+k+`" alt="memory_share_health_oscar@2x"></p><h2 id="属性的访问冲突" tabindex="-1">属性的访问冲突 <a class="header-anchor" href="#属性的访问冲突" aria-label="Permalink to &quot;属性的访问冲突&quot;">​</a></h2><p>如结构体，元组和枚举的类型都是<strong>由多个独立的值组成</strong>的，例如结构体的属性或元组的元素。</p><ul><li>因为它们都是值类型，修改值的任何一部分都是对于整个值的修改，意味着其中一个属性的读或写访问都需要访问一整个值。</li></ul><p>例如，元组元素的写访问重叠会产生冲突：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> playerInformation </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">health</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">energy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">balance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">playerInformation.health, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">playerInformation.energy)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误：playerInformation 的属性访问冲突</span></span></code></pre></div><p><code>playerInformation.health</code> 和 <code>playerInformation.energy</code> 都被作为 <code>in-out</code> 参数传入，意味着 <code>balance(_:_:)</code> 需要在函数调用期间对它们发起写访问。</p><div class="danger custom-block"><p class="custom-block-title">冲突</p><p>任何情况下，对于元组元素的写访问都需要对整个元组发起写访问。这意味着对于 <code>playerInfomation</code> 发起的两个写访问重叠了，造成冲突。</p></div>`,55);function _(D,v,f,T,Q,w){return n(),i("div",null,[d,s("p",null,[a("在这个例子里，根据你是否需要更新后的总数，$ "),s("mjx-container",o,[(n(),i("svg",c,g)),y]),a(" 和 $ "),s("mjx-container",m,[(n(),i("svg",u,C)),b]),a(" 都可能是正确的值。在你修复访问冲突之前，你需要决定它的倾向。")]),A])}const S=e(r,[["render",_]]);export{B as __pageData,S as default};
