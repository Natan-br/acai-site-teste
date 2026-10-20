// =====================================================
// ARQUIVO: js/vitrine.js
//
// VITRINE: ABAS DE CATEGORIA, BUSCA, DESTAQUES E CARTÕES DE PRODUTO
//
// O QUE FAZ?
// Desenha o carrossel "Destaques", as seções por categoria e cada cartão de
// produto (foto, selo, nome, descrição, preço e botão +).
//
// QUANDO MEXER AQUI?
// Para mudar o jeito que o cartão do produto aparece. Os produtos em si ficam em
// js/cardapio.js e as fotos em js/imagens.js.
// =====================================================

"use strict";

// -----------------------------------------------------
// CATEGORIAS (abas) E BUSCA
// -----------------------------------------------------
function montarCategorias() {
  const nav = $("categorias");
  nav.textContent = "";
  [{ id: "todos", nome: "Todos" }, ...CATEGORIAS].forEach((cat) => {
    const b = criar("button", "", cat.nome);
    b.type = "button";
    b.setAttribute("aria-pressed", String(cat.id === categoriaAtiva));
    b.addEventListener("click", () => { categoriaAtiva = cat.id; montarCategorias(); montarProdutos(); });
    nav.append(b);
  });
}

// -----------------------------------------------------
// FUNÇÃO: fotosDoProduto(produto)
//
// QUAIS FOTOS ESTE PRODUTO USA?
// Procura em js/imagens.js (IMAGENS.produtos) pelo "id" do produto.
// Aceita um caminho ou uma lista de caminhos (galeria).
// Se não achar, usa "imagem"/"imagens" escritos no próprio
// produto em js/cardapio.js (jeito antigo, ainda funciona).
// Sem nenhuma foto: o cartão mostra um ícone.
//
// PARA TROCAR A FOTO DE UM PRODUTO: edite js/imagens.js.
// -----------------------------------------------------
function fotosDoProduto(produto) {
  const central = (IMAGENS.produtos || {})[produto.id];
  if (central) return Array.isArray(central) ? central : [central];
  if (Array.isArray(produto.imagens) && produto.imagens.length) return produto.imagens;
  return produto.imagem ? [produto.imagem] : [];
}

function montarProdutos() {
  const lista = $("lista-produtos");
  lista.textContent = "";
  $("estado-carregando").hidden = true;

  const categorias = CATEGORIAS.filter((c) => categoriaAtiva === "todos" || c.id === categoriaAtiva);
  const termo = normalizar($("busca").value.trim());
  let algum = false;

  // Carrossel "Destaques": só na visão geral, sem busca.
  const destaques = PRODUTOS.filter((p) => p.destaque && p.disponivel);
  if (categoriaAtiva === "todos" && !termo && destaques.length) {
    lista.append(carrosselDestaques(destaques));
    algum = true;
  }

  categorias.forEach((cat) => {
    const produtos = PRODUTOS.filter((p) => p.categoria === cat.id
      // Cada palavra digitada precisa aparecer no nome ou na descrição.
      && termo.split(/\s+/).every((palavra) => normalizar(p.nome + " " + p.descricao).includes(palavra)));
    if (!produtos.length) return;
    algum = true;
    const secao = criar("section", "secao-categoria");
    secao.append(criar("h2", "", cat.nome));
    const grade = criar("div", "secao-lista");
    produtos.forEach((p) => grade.append(cartaoProduto(p)));
    secao.append(grade);
    lista.append(secao);
  });

  if (!algum) {
    lista.append(criar("p", "aviso", termo ? "Nenhum produto encontrado para essa busca." : "Nenhum produto disponível no momento."));
  }
}

// Etiqueta do card (ex.: OFERTA, MAIS PEDIDO). Só muda a cor.
function criarSelo(texto) {
  const t = normalizar(texto);
  const tipo = t.includes("oferta") ? "oferta" : t.includes("mais pedido") ? "mais" : "outro";
  return criar("span", "selo selo--" + tipo, texto);
}

// Foto do produto ou, se não tiver, um quadrado colorido com ícone.
function criarMidia(produto, classe, largura, altura) {
  const foto = fotosDoProduto(produto)[0];
  if (foto) {
    const img = criar("img", classe);
    img.src = foto;
    img.alt = produto.nome;
    img.loading = "lazy";   // só carrega a foto quando ela aparece na tela
    if (largura && altura) { img.width = largura; img.height = altura; }   // evita a página "pular" ao carregar
    return img;
  }
  return criar("div", classe + "-vazia", "🍧");
}

// -----------------------------------------------------
// CARROSSEL DE DESTAQUES
// Faixa horizontal que rola com o dedo/mouse; o botão › avança.
// Produtos entram aqui com destaque: true em js/cardapio.js.
// -----------------------------------------------------
function carrosselDestaques(produtos) {
  const secao = criar("section", "secao-categoria");
  secao.append(criar("h2", "", "Destaques"));
  const caixa = criar("div", "carrossel");
  const faixa = criar("div", "carrossel__faixa");
  faixa.tabIndex = 0;   // permite rolar com as setas do teclado
  produtos.forEach((p) => faixa.append(cartaoDestaque(p)));

  const proximo = criar("button", "carrossel__proximo", "›");
  proximo.type = "button";
  proximo.setAttribute("aria-label", "Ver próximos destaques");
  proximo.addEventListener("click", () => faixa.scrollBy({ left: faixa.clientWidth * 0.8, behavior: "smooth" }));

  caixa.append(faixa, proximo);
  secao.append(caixa);
  return secao;
}

function cartaoDestaque(produto) {
  const card = criar("button", "destaque");
  card.type = "button";
  card.append(criarMidia(produto, "destaque__foto"));
  const corpo = criar("div", "destaque__corpo");
  if (produto.selo) corpo.append(criarSelo(produto.selo));
  corpo.append(criar("h3", "destaque__nome", produto.nome));
  corpo.append(criar("p", "destaque__desc", produto.descricao.replace(/\n/g, " ")));
  corpo.append(criar("span", "produto__preco", dinheiro(produto.preco)));
  card.append(corpo);
  card.addEventListener("click", () => abrirProduto(produto));
  return card;
}

function cartaoProduto(produto) {
  const botao = criar("button", "produto" + (produto.disponivel ? "" : " produto--indisponivel"));
  botao.type = "button";
  botao.disabled = !produto.disponivel;

  botao.append(criarMidia(produto, "produto__foto", 132, 88));

  const texto = criar("div", "produto__texto");
  if (produto.selo) texto.append(criarSelo(produto.selo));
  texto.append(criar("h3", "produto__nome", produto.nome));
  texto.append(criar("p", "produto__desc", produto.descricao.replace(/\n/g, " ")));
  texto.append(criar("span", "produto__preco", produto.disponivel ? dinheiro(produto.preco) : "Indisponível"));
  botao.append(texto);
  if (produto.disponivel) botao.append(criar("span", "produto__mais", "+"));

  botao.addEventListener("click", () => abrirProduto(produto));
  return botao;
}
