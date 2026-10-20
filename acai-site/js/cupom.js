// =====================================================
// ARQUIVO: js/cupom.js
//
// CUPOM DE DESCONTO
//
// O QUE FAZ?
// Calcula o desconto, o total final e trata a janela "Tem um cupom?".
//
// QUANDO MEXER AQUI?
// Para mudar a regra do desconto. Os CÓDIGOS dos cupons ficam em js/config.js.
// =====================================================

"use strict";

// -----------------------------------------------------
// CUPOM DE DESCONTO
// Desconto = percentual do subtotal ou valor fixo, nunca maior
// que o subtotal. Só vale se o subtotal atingir o "minimo".
// -----------------------------------------------------
function descontoAtual(subtotal) {
  if (!cupomAtivo || subtotal < cupomAtivo.minimo) return 0;
  const bruto = cupomAtivo.tipo === "percentual" ? subtotal * cupomAtivo.valor / 100 : cupomAtivo.valor;
  return centavos(Math.min(bruto, subtotal));
}

// Total final = subtotal - desconto + taxa de entrega.
function totalFinal(tipo, subtotal) {
  return centavos(subtotal - descontoAtual(subtotal) + taxaEntregaAtual(tipo, subtotal));
}

// Textos da linha "Tem um cupom?" da sacola lateral.
function atualizarCupomUI() {
  $("cupom-titulo").textContent = cupomAtivo ? "Cupom aplicado: " + cupomAtivo.codigo : "Tem um cupom?";
  $("cupom-sub").textContent = cupomAtivo ? "Clique para alterar ou remover" : "Clique e insira o código";
  atualizarResumo();
}

function aplicarCupom(evento) {
  evento.preventDefault();
  const msg = $("cupom-msg");
  const codigo = limparTexto($("cupom-codigo").value, 20).toUpperCase();
  const cupom = (CONFIG.cupons || []).find((c) => c.codigo === codigo);
  if (!cupom) { msg.textContent = "Cupom inválido ou expirado."; msg.hidden = false; return; }
  if (subtotalCarrinho() < cupom.minimo) {
    msg.textContent = "Este cupom vale para pedidos a partir de " + dinheiro(cupom.minimo) + ".";
    msg.hidden = false; return;
  }
  cupomAtivo = cupom;
  msg.hidden = true;
  atualizarCupomUI(); desenharSacola();
  $("dlg-cupom").close();
}
