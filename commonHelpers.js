import{g as i,S as m,A as f,D as E}from"./assets/vendor-5fa2d8fc.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const q=document.querySelector(".btn-menu"),n=document.querySelector("[data-header-menu]"),L=document.body,p=i.timeline({paused:!0,reversed:!0});p.fromTo(n,{opacity:0,y:-20,visibility:"hidden"},{opacity:1,y:0,visibility:"visible",duration:.3,ease:"power2.out"});function S(){window.innerWidth>=1200?(L.classList.remove("menu-open"),n.classList.add("is-active"),i.set(n,{opacity:1,y:0,visibility:"visible"})):(n.classList.remove("is-active"),i.set(n,{opacity:0,y:-20,visibility:"hidden"}))}function C(){window.innerWidth<1200&&(L.classList.toggle("menu-open")?(p.play(),n.classList.add("is-active")):(p.reverse(),n.classList.remove("is-active")))}q.addEventListener("click",C);window.addEventListener("resize",S);S();document.addEventListener("DOMContentLoaded",()=>{if(window.matchMedia("(min-width: 1200px)").matches){const t=document.querySelector(".logo");t&&(t.addEventListener("mouseenter",()=>{i.to(t.querySelector(".logo-icon"),{rotationY:360,duration:1,ease:"power2.out"})}),t.addEventListener("mouseleave",()=>{i.to(t.querySelector(".logo-icon"),{rotationY:0,duration:1,ease:"power2.in"})}))}});const c=document.querySelectorAll(".lang-btn");c.forEach(e=>{e.style.transition="background 0.15s ease, color 0.15s ease, border-color 0.15s ease"});c.forEach(e=>{e.addEventListener("click",t=>{c.forEach(s=>{s.classList.remove("is-current")}),e.classList.add("is-current"),i.to(e,{duration:.15,color:"#e0cc1b",borderColor:"#e0cc1b",ease:"power2.out"}),c.forEach(s=>{s!==e&&i.to(s,{duration:.15,color:"#2b96ea",borderColor:"#2b96ea",ease:"power2.out"})})})});const w=document.querySelector(".header-top-caption"),H=w.textContent;w.innerHTML=H.split("").map(e=>`<span class="letter">${e}</span>`).join("");i.fromTo(".letter",{y:20,opacity:0},{y:0,opacity:1,duration:.2,stagger:.03,ease:"power2.out",repeat:-1,repeatDelay:1});const M=new m(".reviews-slider",{type:"loop",drag:"free",arrows:!1,pagination:!1,gap:32,perPage:4,autoScroll:{speed:1,pauseOnHover:!1},breakpoints:{550:{perPage:2,autoScroll:{speed:.5,pauseOnHover:!1}},768:{perPage:3,autoScroll:{speed:.8,pauseOnHover:!1}}}});M.mount({AutoScroll:f});const V=new m(".gallery-slider.is-top",{type:"loop",arrows:!1,pagination:!1,gap:16,perPage:4,autoScroll:{speed:1,pauseOnHover:!1},breakpoints:{550:{perPage:2,autoScroll:{speed:.5,pauseOnHover:!1}},768:{perPage:3,autoScroll:{speed:.8,pauseOnHover:!1}}}}),k=new m(".gallery-slider.is-bottom",{type:"loop",drag:"free",arrows:!1,pagination:!1,gap:16,perPage:4,autoScroll:{speed:-1,pauseOnHover:!1},breakpoints:{550:{perPage:2,autoScroll:{speed:-.5,pauseOnHover:!1}},768:{perPage:3,autoScroll:{speed:-.8,pauseOnHover:!1}}}});V.mount({AutoScroll:f});k.mount({AutoScroll:f});new E(".accordion-container",{duration:200});const h=document.querySelector("#newsletter-form"),a=document.querySelector("input"),v=document.querySelector("#privacy-policy"),b=document.querySelector("#newsletter-form .button"),y=document.querySelector(".modal.is-newsletter"),D=document.querySelector(".modal button"),l=document.querySelector(".newsletter-error-msg"),O=document.body;h.addEventListener("submit",T);a.addEventListener("change",A);g();D.addEventListener("click",e=>{y.classList.remove("is-active"),g()});function T(e){e.preventDefault();const t=v.checked,s=P(a.value);if(x(s,t)){const o={email:a.value,privacyPolicy:t};N(o)}}function A(e){P(e.target.value)?g():(l.classList.add("is-error"),a.classList.add("is-invalid"))}function P(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function x(e,t){return e?(a.classList.add("is-valid"),b.classList.add("is-green"),t?(y.classList.add("is-active"),O.classList.add("is-locked")):(l.textContent="Будь-ласка підвердіть політику приватності",l.classList.add("is-error"),v.classList.add("is-invalid"))):(l.textContent="Перевірте Ваш email",l.classList.add("is-error"),a.classList.add("is-invalid")),!!(e&&t)}function g(){l.classList.remove("is-error"),a.classList.remove("is-invalid"),a.classList.remove("is-valid"),y.classList.remove("is-active"),b.classList.remove("is-green"),O.classList.remove("is-locked")}function B(){h.reset(),v.classList.remove("is-invalid")}function N(e){fetch("https://676a8efa863eaa5ac0ded677.mockapi.io/signup/newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(s=>{if(!s.ok)throw new Error(`Server error: ${s.status}`);B()}).catch(s=>{console.log(s)})}
//# sourceMappingURL=commonHelpers.js.map
