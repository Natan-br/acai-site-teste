// =====================================================
// ARQUIVO: js/estado.js
//
// ESTADO DO SITE (o que está acontecendo agora) E CARRINHO SALVO
//
// O QUE FAZ?
// Guarda em variáveis o carrinho, a categoria aberta, o produto sendo montado e o
// cupom aplicado. Também salva o carrinho no navegador para o cliente não perder
// o pedido se recarregar a página.
//
// QUANDO MEXER AQUI?
// Quase nunca. Para trocar o nome da "gaveta" onde o carrinho é salvo,
// mude CHAVE_CARRINHO (isso zera os carrinhos salvos dos clientes).
// =====================================================

"use strict";

// -----------------------------------------------------
// ESTADO (o que está acontecendo agora)
// -----------------------------------------------------
let carrinho = [];          // itens do pedido

let categoriaAtiva = "todos";

let produtoAberto = null;   // produto sendo montado na janela

let quantidadeAberta = 1;

let cupomAtivo = null;      // cupom aplicado (objeto de CONFIG.cupons) ou null

const CHAVE_CARRINHO = "carrinho-acai-v1";

// Guardamos o carrinho no navegador só para o cliente não perder
// o pedido se recarregar a página. Não tem dado pessoal aí.
// try/catch: em aba anônima o navegador pode bloquear.
function salvarCarrinho() {
  try { localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho)); } catch (e) { /* tudo bem */ }
}

function carregarCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || "[]");
    if (Array.isArray(salvo)) carrinho = salvo.filter(itemValido);
  } catch (e) { carrinho = []; }
}

// Só aceita do localStorage itens que ainda existem no cardápio.
function itemValido(item) {
  return item && typeof item.produtoId === "string" && Number.isInteger(item.qtd)
    && item.qtd > 0 && item.qtd <= 50 && Array.isArray(item.selecoes)
    && PRODUTOS.some((p) => p.id === item.produtoId && p.disponivel);
}
