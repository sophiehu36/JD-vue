(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{"0eb4":function(e,t,a){"use strict";a.d(t,"b",(function(){return i}));var n=a("7a23"),s=Object(n["I"])("data-v-47bcef02");Object(n["t"])("data-v-47bcef02");var r={class:"toast"};Object(n["r"])();var c=s((function(e,t,a,s,c,o){return Object(n["q"])(),Object(n["d"])("div",r,Object(n["z"])(a.message),1)})),o=a("a1e9"),u={name:"Toast",props:["message"]},i=function(){var e=Object(o["i"])({showToast:!1,toastMsg:""}),t=function(t){e.showToast=!0,e.toastMsg=t,setTimeout((function(){e.showToast=!1,e.toastMsg=""}),2e3)};return{toastData:e,showToast:t}};a("9871");u.render=c,u.__scopeId="data-v-47bcef02";t["a"]=u},"0f9e":function(e,t,a){"use strict";a.r(t);var n=a("7a23"),s=a("9ace"),r=a.n(s),c=Object(n["I"])("data-v-54d367fb");Object(n["t"])("data-v-54d367fb");var o={class:"wrapper"},u=Object(n["h"])("div",{class:"user"},[Object(n["h"])("img",{class:"user__avatar",src:r.a,alt:""})],-1),i={class:"input"},d={class:"input__container"},b={class:"input__container"},p={class:"input__container"},l={class:"button"},f={class:"button__other"};Object(n["r"])();var j=c((function(e,t,a,s,r,c){var j=Object(n["x"])("Toast");return Object(n["q"])(),Object(n["d"])("div",o,[u,Object(n["h"])("div",i,[Object(n["h"])("div",d,[Object(n["G"])(Object(n["h"])("input",{type:"text",placeholder:"请输入用户名","onUpdate:modelValue":t[1]||(t[1]=function(e){return s.username=e})},null,512),[[n["C"],s.username]])]),Object(n["h"])("div",b,[Object(n["G"])(Object(n["h"])("input",{type:"password",placeholder:"请输入密码","onUpdate:modelValue":t[2]||(t[2]=function(e){return s.password=e}),autocomplete:"new-password"},null,512),[[n["C"],s.password]])]),Object(n["h"])("div",p,[Object(n["G"])(Object(n["h"])("input",{type:"password",placeholder:"确认密码","onUpdate:modelValue":t[3]||(t[3]=function(e){return s.confirmPassword=e})},null,512),[[n["C"],s.confirmPassword]])])]),Object(n["h"])("div",l,[Object(n["h"])("div",{class:"button__register",onClick:t[4]||(t[4]=function(){return s.handleRegister.apply(s,arguments)})}," 注册 "),Object(n["h"])("div",f,[Object(n["h"])("span",{onClick:t[5]||(t[5]=function(){return s.handleLoginClick.apply(s,arguments)})},"已有账号去登陆")])]),s.toastData.showToast?(Object(n["q"])(),Object(n["d"])(j,{key:0,message:s.toastData.toastMsg},null,8,["message"])):Object(n["e"])("",!0)])})),O=(a("96cf"),a("1da1")),v=a("6c02"),h=a("b775"),w=a("0eb4"),m=function(e){var t=Object(v["d"])(),a=Object(n["u"])({username:"",password:"",confirmPassword:""}),s=Object(n["A"])(a),r=s.username,c=s.password,o=s.confirmPassword,u=function(){var a=Object(O["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(c.value===o.value){a.next=4;break}e("请重新确认密码"),a.next=15;break;case 4:return a.prev=4,a.next=7,Object(h["b"])("/api/user/register",{username:r.value,password:c.value});case 7:n=a.sent,console.log(n),0===(null===n||void 0===n?void 0:n.errno)?t.push({name:"Login"}):e("注册失败"),a.next=15;break;case 12:a.prev=12,a.t0=a["catch"](4),e("请求失败");case 15:case"end":return a.stop()}}),a,null,[[4,12]])})));return function(){return a.apply(this,arguments)}}();return{username:r,password:c,confirmPassword:o,handleRegister:u}},g={name:"Login",components:{Toast:w["a"]},setup:function(){var e=Object(v["d"])(),t=Object(w["b"])(),a=t.toastData,n=t.showToast,s=m(n),r=s.username,c=s.password,o=s.confirmPassword,u=s.handleRegister,i=function(){e.push({name:"Login"})};return{handleLoginClick:i,handleRegister:u,username:r,password:c,confirmPassword:o,toastData:a}}};a("982b");g.render=j,g.__scopeId="data-v-54d367fb";t["default"]=g},8422:function(e,t,a){},"982b":function(e,t,a){"use strict";a("a4b5")},9871:function(e,t,a){"use strict";a("8422")},"9ace":function(e,t,a){e.exports=a.p+"img/user.f605787e.png"},a4b5:function(e,t,a){}}]);
//# sourceMappingURL=register.6d358a23.js.map