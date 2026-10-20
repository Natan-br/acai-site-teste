// =====================================================
// ARQUIVO: js/precos.js
//
// CÁLCULO DE PREÇOS
//
// O QUE FAZ?
// Preço de uma unidade (produto + adicionais pagos), subtotal do carrinho e taxa
// de entrega. Tudo é recalculado a partir do js/cardapio.js e do js/config.js;
// o que está salvo no navegador do cliente nunca é usado como preço.
//
// QUANDO MEXER AQUI?
// Se quiser mudar a regra de entrega grátis ou de como o preço é somado.
// =====================================================

"use strict";

// -----------------------------------------------------
// CÁLCULO DE PREÇOS
// Sempre calculado a partir do cardapio.js (fonte confiável).
// -----------------------------------------------------
function acharProduto(id) { return PRODUTOS.find((p) => p.id === id); }

// Preço de UMA unidade: preço do produto + adicionais pagos escolhidos.
function precoUnitario(produtoId, selecoes) {
  const produto = acharProduto(produtoId);
  if (!produto) return 0;
  let total = produto.preco;
  selecoes.forEach((sel) => {
    const grupo = GRUPOS[sel.grupo];
    const opcao = grupo && grupo.itens.find((i) => i.nome === sel.nome);
    if (opcao) total += opcao.preco;
  });
  return centavos(total);
}

function subtotalCarrinho() {
  return centavos(carrinho.reduce((soma, it) => soma + precoUnitario(it.produtoId, it.selecoes) * it.qtd, 0));
}

function taxaEntregaAtual(tipo, subtotal) {
  if (tipo !== "entrega" || !CONFIG.aceitaEntrega) return 0;
  if (CONFIG.entregaGratisAcima > 0 && subtotal >= CONFIG.entregaGratisAcima) return 0;
  return CONFIG.taxaEntrega;
}
