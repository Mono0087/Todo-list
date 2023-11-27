(()=>{"use strict";function t(t,e,s,n,o,i){let l=document.createElement(t);return e&&l.classList.add(...e),n&&(l.innerText=n),s&&(l.id=s),o&&(l.dataset[o]=""),i&&(l.dataset[o]=i),l}class e{initForm(){const e=document.querySelector(".container"),s=t("div",["hidden","visually-hidden"],"overlay"),n=t("form",null,"pop-up-form");n.action="post";const o=t("h2",null,null,"Add project"),i=t("label",null,null,"Name:");i.htmlFor="new-title";const l=t("input",null,"new-title");l.type="text";const r=t("button",["btn"],"add-list-btn","Add project");r.type="submit",n.append(o,i,l,r),s.append(n),e.append(s)}showForm(){overlay.classList.remove("hidden"),setTimeout((function(){overlay.classList.remove("visually-hidden")}),5)}hideForm(){overlay.classList.add("visually-hidden"),overlay.addEventListener("transitionend",(function(t){overlay.classList.add("hidden")}),{capture:!1,once:!0,passive:!1})}validateFormInputs(t){let e=!0;return t.forEach((t=>{""===t&&(e=!1)})),e}}class s{constructor(t){this.storageAPI=t}saveList(t,e){this.storageAPI.saveList(t,e)}getList(t){return this.storageAPI.getList(t)}deleteList(t){this.storageAPI.deleteList(t)}updateListsKeys(t,e){this.storageAPI.updateListsKeys(t,e)}getListsKeys(t){return this.storageAPI.getListsKeys(t)}}class n{saveList(t,e){localStorage.setItem(`${e}.${t.id}`,JSON.stringify(t))}getList(t){return JSON.parse(localStorage.getItem(t))}deleteList(t){localStorage.removeItem(t)}updateListsKeys(t,e){localStorage.setItem(t,JSON.stringify(e))}getListsKeys(t){return JSON.parse(localStorage.getItem(t))||null}}class o{constructor(t){this.name=t}}class i extends o{constructor(t,e){super(e),this.id=t,this.todos=[]}}class l extends o{constructor(t){super(t),this.id=crypto.randomUUID(),this.todos=[]}}(()=>{const o=new e,r=document.querySelector(".container"),a=r.querySelector("#add-project-btn");o.initForm();const d=r.querySelector("[data-default-lists]"),c=r.querySelector("[data-custom-lists]"),u=r.querySelector("#overlay"),p=r.querySelector("#pop-up-form");let m=new s(new n);const L="defaultList",y="customList",v="customListsIDs";let f=m.getListsKeys(v)||[];function h(){c.innerHTML="",f.forEach(((t,e)=>{let s=g(m.getList(f[e]),"custom");c.append(s)}))}function g(e,s){let n=t("li",[`${s}-list-item`],null,null,`${s}ListId`,e.id),o=t("button",[`${s}-list-item_btn`],null,e.name);if(n.appendChild(o),"custom"===s){let e=t("div",["list_dropdown-menu"],null,null),s=t("button",["dropdown-btn"],null),o=t("div",["btn-dot"]);s.innerHTML=o.outerHTML+o.outerHTML+o.outerHTML;let i=t("menu",["dropdown-content"]),l=t("button",["delete-list-btn"],null,"Delete project");i.append(l),e.append(s,i),n.appendChild(e)}return n}[new i(1,"Today"),new i(2,"Week"),new i(3,"Everyday")].forEach(((t,e)=>{m.getList(`${L}.${e+1}`)||m.saveList(t,L)})),function(){let t=0;for(;;){let e=m.getList(`${L}.${t+1}`);if(!e)break;let s=g(e,"default");d.appendChild(s),++t}}(),h(),c.addEventListener("click",(function(t){let e=t.target;if(e.classList.contains("custom-list-item_btn"));else if(e.classList.contains("dropdown-btn"))!function(t){let e=t.parentElement.lastChild,s=c.querySelectorAll(".dropdown-content");Array.from(s).forEach((t=>t.classList.remove("dropdown-content-open"))),e.classList.add("dropdown-content-open"),window.addEventListener("click",(function(t){t.target.matches(".dropdown-btn")||e.classList.contains("dropdown-content-open")&&e.classList.remove("dropdown-content-open")}))}(e);else if(e.classList.contains("delete-list-btn")){let t=e.parentElement.parentElement.parentElement.dataset.customListId;s=`customList.${t}`,m.deleteList(s),f.forEach(((t,e)=>{t==s&&f.splice(e,1)})),m.updateListsKeys(v,f),h()}var s})),a.addEventListener("click",o.showForm),u.addEventListener("click",(function(t){if("overlay"===t.target.id&&o.hideForm(),"add-list-btn"===t.target.id){let e=[...p.querySelectorAll("input")].map((t=>"checkbox"===t.type?t.checked:t.value));if(!o.validateFormInputs(e))return alert("All fields must be filled up!"),void t.preventDefault();!function(t){let e=new l(t),s=`${y}.${e.id}`;f.push(s),m.updateListsKeys(v,f),m.saveList(e,y)}(e[0]),h(),o.hideForm(),t.preventDefault()}t.stopPropagation()}))})()})();