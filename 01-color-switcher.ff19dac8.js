!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=0;e.setAttribute("disabled",""),t.addEventListener("click",(function(o){n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled",""),e.removeAttribute("disabled","")})),e.addEventListener("click",(function(o){clearInterval(n),e.setAttribute("disabled",""),t.removeAttribute("disabled","")}))}();
//# sourceMappingURL=01-color-switcher.ff19dac8.js.map