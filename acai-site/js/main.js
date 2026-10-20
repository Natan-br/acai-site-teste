// =====================================================
// ARQUIVO: js/main.js
//
// INÍCIO DO SITE: LIGA OS BOTÕES E CHAMA TODO O RESTO
//
// O QUE FAZ?
// É o último arquivo carregado. A função iniciar() desenha a página e liga cada
// botão à sua função.
//
// QUANDO MEXER AQUI?
// Para ligar um botão novo a uma função, ou mudar o que o menu do topo faz.
// =====================================================

"use strict";

// -----------------------------------------------------
// LIGAR OS BOTÕES E INICIAR
// -----------------------------------------------------
function iniciar() {
  montarTopoERodape();
  carregarCarrinho();
  montarCategorias();
  montarProdutos();
  atualizarBarra();

  $("qtd-menos").addEventListener("click", () => { quantidadeAberta = Math.max(1, quantidadeAberta - 1); $("qtd-valor").textContent = quantidadeAberta; atualizarTotalProduto(); });
  $("qtd-mais").addEventListener("click", () => { quantidadeAberta = Math.min(20, quantidadeAberta + 1); $("qtd-valor").textContent = quantidadeAberta; atualizarTotalProduto(); });
  $("adicionar-item").addEventListener("click", adicionarAoCarrinho);
  $("abrir-carrinho").addEventListener("click", abrirCarrinho);
  $("sacola-finalizar").addEventListener("click", abrirCarrinho);

  // Menu roxo do topo
  $("nav-pedidos").addEventListener("click", abrirCarrinho);
  $("nav-inicio").addEventListener("click", (e) => {
    e.preventDefault();
    categoriaAtiva = "todos"; $("busca").value = "";
    montarCategorias(); montarProdutos();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  // O botão Promoções só aparece se existir a categoria "promocoes".
  if (CATEGORIAS.some((c) => c.id === "promocoes")) {
    $("nav-promocoes").hidden = false;
    $("nav-promocoes").addEventListener("click", () => {
      categoriaAtiva = "promocoes"; montarCategorias(); montarProdutos();
      $("cardapio").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Informações, categorias e busca
  $("abrir-info").addEventListener("click", () => $("dlg-info").showModal());
  $("lateral-entrega").addEventListener("click", () => $("dlg-info").showModal());

  // Cupom (a linha só aparece se houver cupons no config.js)
  const temCupons = Array.isArray(CONFIG.cupons) && CONFIG.cupons.length > 0;
  $("abrir-cupom").hidden = !temCupons;
  $("abrir-cupom").addEventListener("click", () => {
    $("cupom-msg").hidden = true;
    $("cupom-codigo").value = cupomAtivo ? cupomAtivo.codigo : "";
    $("remover-cupom").hidden = !cupomAtivo;
    $("dlg-cupom").showModal();
  });
  $("form-cupom").addEventListener("submit", aplicarCupom);
  $("remover-cupom").addEventListener("click", () => {
    cupomAtivo = null; atualizarCupomUI(); $("dlg-cupom").close();
  });
  $("busca").addEventListener("input", montarProdutos);
  $("form-pedido").addEventListener("submit", enviarPedido);
  $("form-pedido").addEventListener("change", atualizarResumo);
}

// Se o cardápio ou a config tiver erro de digitação, mostra um aviso
// claro em vez de uma página em branco.
try {
  iniciar();
} catch (erro) {
  $("estado-carregando").textContent = "Não foi possível carregar o cardápio. Tente novamente em instantes.";
  console.error("Erro ao iniciar. Confira js/config.js e js/cardapio.js (aspas e vírgulas).", erro);
}
