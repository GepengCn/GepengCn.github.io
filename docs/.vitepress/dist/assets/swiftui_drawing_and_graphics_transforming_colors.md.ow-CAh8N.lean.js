import{_ as t,c as a,l as s,a as i,a4 as h,o as n}from"./chunks/framework.C7sZLB-2.js";const l="/gepengcn.github.io/assets/SwiftUI-View-brightness@2x.CrgpZMxm.png",k="/gepengcn.github.io/assets/SwiftUI-View-contrast@2x.DcrSIwRd.png",p="/gepengcn.github.io/assets/SwiftUI-View-colorInvert@2x.BzJVV7Uq.png",e="/gepengcn.github.io/assets/SwiftUI-View-colorMultiply@2x.DS2kdL8X.png",E="/gepengcn.github.io/assets/SwiftUI-View-saturation@2x.B-3IjZZg.png",r="/gepengcn.github.io/assets/SwiftUI-View-grayscale@2x.CvcMRwqW.png",d="/gepengcn.github.io/assets/SwiftUI-hueRotation@2x.DTTyApLx.png",g="/gepengcn.github.io/assets/View-luminanceToAlpha-1-iOS@2x.GB93j8WX.png",hs=JSON.parse('{"title":"转换颜色","description":"","frontmatter":{},"headers":[],"relativePath":"swiftui/drawing_and_graphics/transforming_colors.md","filePath":"swiftui/drawing_and_graphics/transforming_colors.md","lastUpdated":1715853313000}'),y={name:"swiftui/drawing_and_graphics/transforming_colors.md"},o=h("",4),F=s("code",null,"amount",-1),c={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},C={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 500 688","aria-hidden":"true"},u=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mn"},[s("path",{"data-c":"30",d:"M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z",style:{"stroke-width":"3"}})])])],-1),B=[u],m=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"0")])],-1),w={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},_={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.507ex",role:"img",focusable:"false",viewBox:"0 -666 500 666","aria-hidden":"true"},b=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mn"},[s("path",{"data-c":"31",d:"M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z",style:{"stroke-width":"3"}})])])],-1),x=[b],T=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"1")])],-1),v=h("",34),f=s("code",null,"amount",-1),Q={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},A={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.891ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1278 688","aria-hidden":"true"},D=h("",1),V=[D],S=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"0.0")])],-1),M={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},I={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.891ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1278 688","aria-hidden":"true"},q=h("",1),P=[q],H=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"1.0")])],-1),Z={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},j={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.891ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1278 688","aria-hidden":"true"},R=h("",1),U=[R],L=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"0.0")])],-1),N={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},$={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.891ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1278 688","aria-hidden":"true"},G=h("",1),J=[G],z=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mn",null,"1.0")])],-1),O=h("",20);function W(X,K,Y,ss,is,as){return n(),a("div",null,[o,s("ul",null,[s("li",null,[F,i(": 一个介于 "),s("mjx-container",c,[(n(),a("svg",C,B)),m]),i("（无效果）和 "),s("mjx-container",w,[(n(),a("svg",_,x)),T]),i("（完全白色提亮）之间的值，表示亮度效果的强度。")])]),v,s("ul",null,[s("li",null,[f,i(": 要应用的灰度强度，范围从 "),s("mjx-container",Q,[(n(),a("svg",A,V)),S]),i(" 到小于 "),s("mjx-container",M,[(n(),a("svg",I,P)),H]),i("。值越接近 "),s("mjx-container",Z,[(n(),a("svg",j,U)),L]),i(" 颜色越丰富，值越接近 "),s("mjx-container",N,[(n(),a("svg",$,J)),z]),i(" 颜色越不丰富。")])]),O])}const ts=t(y,[["render",W]]);export{hs as __pageData,ts as default};
