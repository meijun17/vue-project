(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),c={class:"container mt-5"},r={class:"col-md-6"},a=Object(o["createElementVNode"])("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1),s={class:"mb-2"},i=Object(o["createElementVNode"])("label",{for:"inputEmail",class:"sr-only"},"Email address",-1),l={class:"mb-2"},d=Object(o["createElementVNode"])("label",{for:"inputPassword",class:"sr-only"},"Password",-1),u=Object(o["createElementVNode"])("div",{class:"text-end mt-4"},[Object(o["createElementVNode"])("button",{class:"btn btn-lg btn-primary btn-block",type:"submit"}," 登入 ")],-1);function m(e,t,n,m,p,b){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,[Object(o["createElementVNode"])("form",{class:"row justify-content-center",onSubmit:t[2]||(t[2]=Object(o["withModifiers"])((function(){return b.signIn&&b.signIn.apply(b,arguments)}),["prevent"]))},[Object(o["createElementVNode"])("div",r,[a,Object(o["createElementVNode"])("div",s,[i,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"email",id:"inputEmail",class:"form-control",placeholder:"Email address","onUpdate:modelValue":t[0]||(t[0]=function(e){return p.user.username=e}),required:"",autofocus:""},null,512),[[o["vModelText"],p.user.username]])]),Object(o["createElementVNode"])("div",l,[d,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"password",id:"inputPassword",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=function(e){return p.user.password=e}),placeholder:"Password",required:""},null,512),[[o["vModelText"],p.user.password]])]),u])],32)])}n("99af");var p=n("37ca"),b={data:function(){return{user:{}}},provide:function(){return{emitter:p["a"]}},methods:{signIn:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io/v2","/admin/signin");this.$http.post(t,this.user).then((function(t){var n=t.data,o=n.token,c=n.expired;document.cookie="hexToken=".concat(o,";expires=").concat(new Date(c),";"),e.$router.push("/admin/products")})).catch((function(e){alert(e.data.message)}))}}},h=n("6b0d"),f=n.n(h);const w=f()(b,[["render",m]]);t["default"]=w}}]);
//# sourceMappingURL=chunk-2d2086b7.873e6877.js.map