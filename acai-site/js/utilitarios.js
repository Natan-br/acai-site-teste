// =====================================================
// ARQUIVO: js/utilitarios.js
//
// FERRAMENTAS PEQUENAS USADAS PELO SITE INTEIRO
//
// O QUE FAZ?
// $("id") pega elemento da página, criar() monta elementos com texto seguro,
// dinheiro() formata preço, centavos() arredonda, limparTexto() higieniza o que o
// cliente digitou e normalizar() ajuda a busca a ignorar acentos.
//
// QUANDO MEXER AQUI?
// Para mudar como o preço aparece (ex.: "R$ 99,90"): função dinheiro().
// Fora isso, normalmente não precisa mexer.
//
// SEGURANÇA: criar() usa textContent (nunca innerHTML), então nada que o
// cliente digite ou que esteja no cardápio vira código na página (sem XSS).
// =====================================================

"use strict";

// $("id") é um atalho para pegar um elemento da página pelo id.
const $ = (id) => document.getElementById(id);

// Cria um elemento HTML com texto seguro.
// criar("p", "classe", "texto") => <p class="classe">texto</p>
function criar(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

// -----------------------------------------------------
// FUNÇÃO: dinheiro(valor)
// Transforma o número em dinheiro brasileiro.
// Exemplo: 99.9 vira "R$ 99,90".
// Se quiser mudar como o preço aparece, altere aqui.
// -----------------------------------------------------
const formatadorMoeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function dinheiro(valor) {
  return formatadorMoeda.format(valor);
}

// Arredonda para centavos (evita 0.1 + 0.2 = 0.30000000000000004).
function centavos(valor) {
  return Math.round(valor * 100) / 100;
}

// Limpa texto digitado pelo cliente antes de usar no pedido:
// tira caracteres invisíveis/de controle e limita o tamanho.
function limparTexto(texto, max) {
  return String(texto || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

// Tira acentos e maiúsculas para a busca achar "acai" em "Açaí".
function normalizar(texto) {
  return String(texto).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
