/* ==========================================================
   FERRO & FORMA — comportamento
   ========================================================== */

/* ▼▼▼ SUBSTITUIR AQUI: é o único lugar onde o WhatsApp precisa ser trocado ▼▼▼
   numero: código do país + DDD + número, só dígitos. Ex.: 5511987654321 */
const CONFIG = {
  numero: "5511900000000",                 // número demonstrativo
  mensagem: "Olá! Vim pelo site da Ferro & Forma e gostaria de um orçamento."
};
/* ▲▲▲ ───────────────────────────────────────────────────────────────── ▲▲▲ */

(function () {
  "use strict";

  /* ---------- WhatsApp: monta todos os links a partir do CONFIG ---------- */
  function linkWhatsApp(texto) {
    return "https://wa.me/" + CONFIG.numero + "?text=" + encodeURIComponent(texto);
  }

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var texto = el.getAttribute("data-wa-msg") || CONFIG.mensagem;
    el.setAttribute("href", linkWhatsApp(texto));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  /* Telefone no rodapé, formatado a partir do mesmo número */
  function formatarTelefone(numero) {
    var d = String(numero).replace(/\D/g, "");
    if (d.indexOf("55") === 0 && d.length >= 12) d = d.slice(2);
    if (d.length === 11) return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
    if (d.length === 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return numero;
  }
  document.querySelectorAll("[data-wa-phone]").forEach(function (el) {
    el.textContent = formatarTelefone(CONFIG.numero);
    el.setAttribute("href", linkWhatsApp(CONFIG.mensagem));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");

  function setMenu(aberto) {
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", aberto);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Cabeçalho: linha de separação após rolar ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Link ativo no menu conforme a seção visível ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]:not(.btn)'));
  var secoes = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && secoes.length) {
    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entrada.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secoes.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();