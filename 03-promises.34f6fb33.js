function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return o[e]=i,t.call(i.exports,i,i.exports),i.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},t.parcelRequired7c6=i);var l=i("eWCmQ");e(l).Notify.init({}),e(l).Notify.merge({width:"310px",timeout:1e4});const r=document.querySelector(".form"),s=document.querySelectorAll("input");function u(e,t){const o=Math.random()>.3;return new Promise(((n,i)=>{setTimeout((()=>o?n({position:e,delay:t}):i({position:e,delay:t})),t)}))}r.style.display="flex",r.style.alignItems="flex-end",r.style.fontSize="13px",r.style.gap="10px",s.forEach((e=>{e.style.display="block"})),r.addEventListener("submit",(function(t){t.preventDefault();const{elements:{delay:o,step:n,amount:i}}=t.currentTarget;let r=Number(o.value),s=Number(n.value),a=Number(i.value);e(l).Notify.info(`delay: ${r}, step: ${s}, amount: ${a}`);for(let t=1;t<=a;t+=1)u(t,r).then((({position:t,delay:o})=>{e(l).Notify.success(`✅ Fulfilled promise ${t} in ${o}ms`)})).catch((({position:t,delay:o})=>{e(l).Notify.failure(`❌ Rejected promise ${t} in ${o}ms`)})),r+=s}));
//# sourceMappingURL=03-promises.34f6fb33.js.map
