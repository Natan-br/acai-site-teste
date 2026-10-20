// =====================================================
// ARQUIVO: js/produto.js
//
// JANELA DO PRODUTO (fotos + opções) E BOTÃO "ADICIONAR"
//
// O QUE FAZ?
// Abre a janela com galeria de fotos, grupos de opções (frutas, cremes, coberturas,
// adicionais), valida mínimos e máximos e coloca o item na sacola.
//
// QUANDO MEXER AQUI?
// Para mudar como as opções são mostradas ou validadas. Os grupos e seus itens
// ficam em js/cardapio.js (GRUPOS).
// =====================================================

"use strict";

// -----------------------------------------------------
// JANELA DE MONTAR O PRODUTO
// -----------------------------------------------------
function abrirProduto(produto) {
  produtoAberto = produto;
  quantidadeAberta = 1;
  $("produto-titulo").textContent = produto.nome;
  $("produto-descricao").textContent = produto.descricao;   // quebras de linha (\n) são respeitadas pelo CSS
  $("produto-preco-base").textContent = dinheiro(produto.preco);
  montarGaleria(produto);
  $("produto-obs").value = "";
  $("produto-erro").hidden = true;
  $("qtd-valor").textContent = "1";

  const area = $("produto-grupos");
  area.textContent = "";
  produto.grupos.forEach((idGrupo) => {
    const grupo = GRUPOS[idGrupo];
    if (grupo) area.append(blocoGrupo(idGrupo, grupo));
  });

  atualizarTotalProduto();
  $("dlg-produto").showModal();
}

// -----------------------------------------------------
// GALERIA DE FOTOS (lado esquerdo da janela do produto)
// Várias fotos rolam lado a lado; as bolinhas mostram qual está
// na tela. Sem foto: a galeria some (a janela fica só com opções).
// -----------------------------------------------------
function montarGaleria(produto) {
  const fotos = fotosDoProduto(produto);
  const galeria = $("galeria");
  const faixa = $("galeria-faixa");
  const pontos = $("galeria-pontos");
  faixa.textContent = ""; pontos.textContent = "";
  galeria.hidden = fotos.length === 0;
  $("dlg-produto").classList.toggle("janela--sem-foto", fotos.length === 0);

  fotos.forEach((src, i) => {
    const img = criar("img");
    img.src = src;
    img.alt = produto.nome + " — foto " + (i + 1);
    faixa.append(img);
    pontos.append(criar("span", i === 0 ? "ativo" : ""));
  });
  pontos.hidden = fotos.length < 2;
  faixa.scrollLeft = 0;
  faixa.onscroll = () => {
    const atual = Math.round(faixa.scrollLeft / faixa.clientWidth);
    [...pontos.children].forEach((p, i) => p.classList.toggle("ativo", i === atual));
  };
}

// Desenha um grupo (ex.: "Frutas") com caixinhas (várias opções)
// ou bolinhas (só uma opção, quando max = 1).
function blocoGrupo(idGrupo, grupo) {
  const fs = criar("fieldset", "grupo");
  fs.dataset.grupo = idGrupo;

  const regra = grupo.max === 1
    ? (grupo.min > 0 ? "Escolha 1 opção (obrigatório)" : "Escolha até 1 opção")
    : (grupo.min > 0 ? "Escolha de " + grupo.min + " até " + grupo.max + " opções" : "Escolha até " + grupo.max + " opções");

  // Leitores de tela leem a legenda; quem enxerga vê a faixa cinza.
  fs.append(criar("legend", "sr-only", grupo.titulo + ". " + regra));
  const cab = criar("div", "grupo__cab");
  cab.setAttribute("aria-hidden", "true");
  cab.append(criar("strong", "", grupo.titulo), criar("small", "", regra));
  fs.append(cab);

  const unico = grupo.max === 1;
  grupo.itens.forEach((item) => {
    const rotulo = criar("label", "opcao");
    const entrada = document.createElement("input");
    entrada.type = unico ? "radio" : "checkbox";
    entrada.name = "g-" + idGrupo;
    entrada.value = item.nome;
    entrada.addEventListener("change", () => limitarSelecao(fs, grupo));
    rotulo.append(criar("span", "", item.nome));
    if (item.preco > 0) rotulo.append(criar("em", "", "+ " + dinheiro(item.preco)));
    rotulo.append(entrada);   // a bolinha/caixinha fica à direita
    fs.append(rotulo);
  });
  return fs;
}

// Quando o cliente já escolheu o máximo, as outras caixinhas
// ficam desativadas (ele pode desmarcar uma para trocar).
function limitarSelecao(fieldset, grupo) {
  const caixas = [...fieldset.querySelectorAll("input")];
  const marcadas = caixas.filter((c) => c.checked).length;
  if (grupo.max > 1) caixas.forEach((c) => { c.disabled = !c.checked && marcadas >= grupo.max; });
  atualizarTotalProduto();
}

// Lê o que o cliente marcou: [{ grupo: "frutas", nome: "Banana" }, ...]
function lerSelecoes() {
  const selecoes = [];
  $("produto-grupos").querySelectorAll("fieldset").forEach((fs) => {
    fs.querySelectorAll("input:checked").forEach((c) => selecoes.push({ grupo: fs.dataset.grupo, nome: c.value }));
  });
  return selecoes;
}

function atualizarTotalProduto() {
  if (!produtoAberto) return;
  $("produto-total").textContent = dinheiro(precoUnitario(produtoAberto.id, lerSelecoes()) * quantidadeAberta);
}

// Confere se o cliente respeitou o mínimo de cada grupo.
function validarSelecoes(selecoes) {
  for (const idGrupo of produtoAberto.grupos) {
    const grupo = GRUPOS[idGrupo];
    if (!grupo) continue;
    const qtd = selecoes.filter((s) => s.grupo === idGrupo).length;
    if (qtd < grupo.min) return "Escolha " + (grupo.min === 1 ? "uma opção" : "pelo menos " + grupo.min) + " em “" + grupo.titulo + "”.";
    if (qtd > grupo.max) return "Em “" + grupo.titulo + "” você pode escolher no máximo " + grupo.max + ".";
  }
  return "";
}

function adicionarAoCarrinho() {
  const selecoes = lerSelecoes();
  const erro = validarSelecoes(selecoes);
  const caixaErro = $("produto-erro");
  if (erro) { caixaErro.textContent = erro; caixaErro.hidden = false; return; }

  carrinho.push({
    produtoId: produtoAberto.id,
    qtd: quantidadeAberta,
    selecoes,
    obs: limparTexto($("produto-obs").value, 200),
  });
  salvarCarrinho();
  atualizarBarra();
  $("dlg-produto").close();
}
