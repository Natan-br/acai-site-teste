// =====================================================
// ARQUIVO: js/pedido.js
//
// ENVIO DO PEDIDO PELO WHATSAPP
//
// O QUE FAZ?
// Valida o formulário (nome, endereço, pagamento), monta o texto do pedido e abre
// o WhatsApp da loja com a mensagem pronta.
//
// QUANDO MEXER AQUI?
// Para mudar o TEXTO DA MENSAGEM que chega no WhatsApp: função montarMensagem().
// O número do WhatsApp fica em js/config.js.
// =====================================================

"use strict";

// -----------------------------------------------------
// ENVIO DO PEDIDO PELO WHATSAPP
// -----------------------------------------------------
function mostrarErroCampo(nome, mensagem) {
  const el = document.querySelector('[data-erro-de="' + nome + '"]');
  if (!el) return;
  el.textContent = mensagem;
  el.hidden = !mensagem;
}

// Valida o formulário e devolve os dados limpos (ou null se tiver erro).
function lerFormulario() {
  const tipo = tipoSelecionado();
  const dados = {
    tipo,
    nome: limparTexto($("cliente-nome").value, 60),
    endereco: limparTexto($("cliente-endereco").value, 150),
    referencia: limparTexto($("cliente-referencia").value, 100),
    pagamento: $("cliente-pagamento").value,
    troco: limparTexto($("cliente-troco").value, 10),
  };

  ["nome", "endereco", "pagamento"].forEach((c) => mostrarErroCampo(c, ""));
  let ok = true;
  if (dados.nome.length < 2) { mostrarErroCampo("nome", "Informe seu nome."); ok = false; }
  if (tipo === "entrega" && dados.endereco.length < 5) { mostrarErroCampo("endereco", "Informe o endereço completo para entrega."); ok = false; }
  // Confere que a forma de pagamento escolhida existe mesmo na lista da loja.
  if (!CONFIG.formasPagamento.includes(dados.pagamento)) { mostrarErroCampo("pagamento", "Escolha a forma de pagamento."); ok = false; }
  return ok ? dados : null;
}

// Monta o texto da mensagem que chega no WhatsApp da loja.
function montarMensagem(dados) {
  const subtotal = subtotalCarrinho();
  const taxa = taxaEntregaAtual(dados.tipo, subtotal);
  const linhas = ["*Novo pedido — " + CONFIG.nomeLoja + "*", ""];

  carrinho.forEach((item) => {
    const produto = acharProduto(item.produtoId);
    linhas.push("• " + item.qtd + "x " + produto.nome + " — " + dinheiro(precoUnitario(item.produtoId, item.selecoes) * item.qtd));
    if (item.selecoes.length) linhas.push("   " + item.selecoes.map((s) => s.nome).join(", "));
    if (item.obs) linhas.push("   Obs.: " + item.obs);
  });

  const desconto = descontoAtual(subtotal);
  linhas.push("", "Subtotal: " + dinheiro(subtotal));
  if (desconto > 0) linhas.push("Cupom " + cupomAtivo.codigo + ": − " + dinheiro(desconto));
  if (dados.tipo === "entrega") linhas.push("Entrega: " + (taxa > 0 ? dinheiro(taxa) : "Grátis"));
  linhas.push("*Total: " + dinheiro(totalFinal(dados.tipo, subtotal)) + "*", "");

  linhas.push("Nome: " + dados.nome);
  if (dados.tipo === "entrega") {
    linhas.push("Entrega em: " + dados.endereco);
    if (dados.referencia) linhas.push("Referência: " + dados.referencia);
  } else {
    linhas.push("Retirada na loja");
  }
  linhas.push("Pagamento: " + dados.pagamento);
  if (dados.pagamento === "Dinheiro" && dados.troco) linhas.push("Troco para: " + dados.troco);
  return linhas.join("\n");
}

function enviarPedido(evento) {
  evento.preventDefault();
  const erroGeral = $("pedido-erro");
  erroGeral.hidden = true;

  if (!carrinho.length) return;
  const dados = lerFormulario();
  if (!dados) return;

  // encodeURIComponent protege a URL contra caracteres especiais.
  const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(montarMensagem(dados));
  const janela = window.open(url, "_blank", "noopener,noreferrer");
  if (!janela) {
    // Pop-up bloqueado: mensagem simples, sem termos técnicos.
    erroGeral.textContent = "Não foi possível abrir o WhatsApp. Toque novamente em “Enviar pedido pelo WhatsApp”.";
    erroGeral.hidden = false;
    return;
  }
  carrinho = [];
  salvarCarrinho();
  atualizarBarra();
  $("dlg-carrinho").close();
}
