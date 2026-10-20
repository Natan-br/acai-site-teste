// =====================================================
// ARQUIVO: js/sacola.js
//
// SACOLA (lateral no computador / barra fixa no celular) E RESUMO DO PEDIDO
//
// O QUE FAZ?
// Desenha a sacola, a barra "Ver meu pedido", a lista de itens da janela de
// finalização e os valores (subtotal, desconto, entrega, total).
//
// QUANDO MEXER AQUI?
// Para mudar como a sacola e o resumo aparecem.
// =====================================================

"use strict";

// -----------------------------------------------------
// CARRINHO
// -----------------------------------------------------
function atualizarBarra() {
  const qtd = carrinho.reduce((s, it) => s + it.qtd, 0);
  $("barra-carrinho").hidden = qtd === 0;
  $("barra-qtd").textContent = String(qtd);
  $("barra-total").textContent = dinheiro(subtotalCarrinho());
  desenharSacola();
}

// -----------------------------------------------------
// SACOLA LATERAL (aparece em telas grandes, ao lado do cardápio)
// Mostra um resumo; "Finalizar pedido" abre a mesma janela
// de finalização usada no celular.
// -----------------------------------------------------
function desenharSacola() {
  $("sacola-vazia").hidden = carrinho.length > 0;
  $("sacola-cheia").hidden = carrinho.length === 0;
  const ul = $("sacola-itens");
  ul.textContent = "";
  carrinho.forEach((item, indice) => {
    const produto = acharProduto(item.produtoId);
    const li = criar("li");
    const linha = criar("div", "sacola__linha");
    linha.append(criar("span", "", item.qtd + "× " + produto.nome),
                 criar("span", "", dinheiro(precoUnitario(item.produtoId, item.selecoes) * item.qtd)));
    li.append(linha);
    if (item.selecoes.length) li.append(criar("p", "sacola__detalhe", item.selecoes.map((s) => s.nome).join(", ")));
    const remover = criar("button", "sacola__remover", "Remover");
    remover.type = "button";
    remover.addEventListener("click", () => { carrinho.splice(indice, 1); salvarCarrinho(); atualizarBarra(); });
    li.append(remover);
    ul.append(li);
  });
  $("sacola-total").textContent = dinheiro(subtotalCarrinho());

  // Botão grande: desativado e com texto "Sacola vazia" enquanto não há itens.
  const vazia = carrinho.length === 0;
  $("sacola-linha-total").hidden = vazia;
  $("sacola-finalizar").disabled = vazia;
  $("sacola-finalizar").textContent = vazia ? "Sacola vazia" : "Finalizar pedido";
}

function abrirCarrinho() {
  desenharCarrinho();
  $("dlg-carrinho").showModal();
}

function desenharCarrinho() {
  const ul = $("carrinho-itens");
  ul.textContent = "";
  $("carrinho-vazio").hidden = carrinho.length > 0;
  $("form-pedido").hidden = carrinho.length === 0;

  carrinho.forEach((item, indice) => {
    const produto = acharProduto(item.produtoId);
    const li = criar("li", "carrinho-item");
    const linha = criar("div", "carrinho-item__linha");
    linha.append(criar("span", "", item.qtd + "× " + produto.nome),
                 criar("span", "", dinheiro(precoUnitario(item.produtoId, item.selecoes) * item.qtd)));
    li.append(linha);
    if (item.selecoes.length) li.append(criar("p", "carrinho-item__detalhe", item.selecoes.map((s) => s.nome).join(", ")));
    if (item.obs) li.append(criar("p", "carrinho-item__detalhe", "Obs.: " + item.obs));

    const acoes = criar("div", "carrinho-item__acoes");
    const remover = criar("button", "", "Remover");
    remover.type = "button";
    remover.addEventListener("click", () => { carrinho.splice(indice, 1); salvarCarrinho(); atualizarBarra(); desenharCarrinho(); });
    acoes.append(remover);
    li.append(acoes);
    ul.append(li);
  });
  atualizarResumo();
}

function tipoSelecionado() {
  return document.querySelector('input[name="tipo"]:checked').value;
}

function atualizarResumo() {
  const subtotal = subtotalCarrinho();
  const tipo = tipoSelecionado();
  const taxa = taxaEntregaAtual(tipo, subtotal);
  $("resumo-subtotal").textContent = dinheiro(subtotal);
  $("resumo-entrega").textContent = taxa > 0 ? dinheiro(taxa) : "Grátis";
  $("linha-entrega").hidden = tipo !== "entrega";
  const desconto = descontoAtual(subtotal);
  $("linha-desconto").hidden = desconto === 0;
  $("resumo-desconto-rotulo").textContent = "Desconto" + (cupomAtivo ? " (" + cupomAtivo.codigo + ")" : "");
  $("resumo-desconto").textContent = "− " + dinheiro(desconto);
  $("resumo-total").textContent = dinheiro(totalFinal(tipo, subtotal));
  $("bloco-endereco").hidden = tipo !== "entrega";
  $("bloco-troco").hidden = $("cliente-pagamento").value !== "Dinheiro";
}
