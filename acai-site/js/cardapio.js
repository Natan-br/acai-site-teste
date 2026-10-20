// =====================================================
// ARQUIVO: js/cardapio.js
//
// O CARDÁPIO INTEIRO MORA AQUI.
//
// Tem 3 partes, de cima para baixo:
//   1) CATEGORIAS  -> as abas (Açaí, Sorvetes...)
//   2) GRUPOS      -> listas de opções reutilizáveis
//                     (frutas, cremes, coberturas, adicionais)
//   3) PRODUTOS    -> o que o cliente compra; cada produto
//                     diz QUAIS GRUPOS ele usa
//
// COMO FUNCIONA A IDEIA:
// Você cria a lista de cremes UMA vez (em GRUPOS) e todos os
// produtos que usam cremes apontam para ela. Se acrescentar um
// creme novo na lista, ele aparece em todos os produtos.
//
// ⚠️ Todos os nomes e preços abaixo são EXEMPLOS.
//    Troque pelos da sua loja.
// REGRAS: mantenha aspas "" e vírgulas. Preço com PONTO: 18.5 (não 18,50).
// =====================================================


// -----------------------------------------------------
// 1) CATEGORIAS
// "id" é um apelido interno (sem espaço, sem acento).
// "nome" é o que o cliente lê. A ordem aqui = ordem no site.
// -----------------------------------------------------
// A categoria com id "promocoes" ativa o botão "Promoções" do menu
// do topo. Se não quiser promoções, apague essa linha e o botão some.
const CATEGORIAS = [
  { id: "promocoes", nome: "Promoções" },
  { id: "acai",    nome: "Açaí e Cremes" },
  { id: "sorvete", nome: "Sorvetes" },
];


// -----------------------------------------------------
// 2) GRUPOS DE OPÇÕES
//
// titulo: texto mostrado ao cliente
// min:    mínimo obrigatório (0 = opcional)
// max:    máximo que o cliente pode escolher
//         (max: 1 vira "escolha uma opção")
// itens:  as opções. "preco" é quanto SOMA no pedido
//         (0 = incluso no preço do produto).
//
// PARA ADICIONAR UM CREME/COMPLEMENTO: copie uma linha de
// itens, cole embaixo e mude o nome e o preço.
// PARA TIRAR UM ITEM QUE ACABOU: apague a linha dele
// (ou coloque // na frente para esconder sem perder).
// -----------------------------------------------------
const GRUPOS = {

  frutas: {
    titulo: "Frutas",
    min: 0,
    max: 2,
    itens: [
      { nome: "Banana",   preco: 0 },
      { nome: "Morango",  preco: 0 },
      { nome: "Kiwi",     preco: 0 },
      { nome: "Uva",      preco: 0 },
    ],
  },

  complementos: {
    titulo: "Complementos",
    min: 0,
    max: 4,
    itens: [
      { nome: "Granola",         preco: 0 },
      { nome: "Leite em pó",     preco: 0 },
      { nome: "Paçoca",          preco: 0 },
      { nome: "Leite condensado", preco: 0 },
      { nome: "Amendoim",        preco: 0 },
      { nome: "Flocos de arroz", preco: 0 },
    ],
  },

  cobertura: {
    titulo: "Cobertura",
    min: 0,
    max: 1,
    itens: [
      { nome: "Chocolate",  preco: 0 },
      { nome: "Morango",    preco: 0 },
      { nome: "Caramelo",   preco: 0 },
    ],
  },

  cremes: {
    titulo: "Escolha o creme",
    min: 1,          // obrigatório escolher pelo menos 1
    max: 1,
    itens: [
      { nome: "Cupuaçu",   preco: 0 },
      { nome: "Ninho",     preco: 0 },
      { nome: "Morango",   preco: 0 },
      { nome: "Maracujá",  preco: 0 },
    ],
  },

  tipoAcai: {
    titulo: "Açaí",
    min: 1,
    max: 1,
    itens: [
      { nome: "Açaí Fit",     preco: 0 },
      { nome: "Açaí Premium", preco: 0 },
      { nome: "Sem Açaí",     preco: 0 },
    ],
  },

  adicionais: {
    titulo: "Adicionais (cobrados à parte)",
    min: 0,
    max: 5,
    itens: [
      { nome: "Nutella",          preco: 4.0 },
      { nome: "Bombom",           preco: 3.0 },
      { nome: "Ovomaltine",       preco: 2.5 },
      { nome: "Porção de leite ninho", preco: 3.0 },
    ],
  },
};


// -----------------------------------------------------
// 3) PRODUTOS
//
// id:          apelido único (sem espaço, sem acento)
// categoria:   um "id" da lista CATEGORIAS lá em cima
// nome:        nome mostrado ao cliente
// descricao:   texto curto embaixo do nome
// preco:       preço base (ponto, não vírgula)
// FOTO:        NÃO se coloca aqui. As fotos ficam em js/imagens.js, ligadas
//              ao "id" do produto (assim todas as imagens ficam num lugar só).
// grupos:      quais GRUPOS aparecem ao montar este produto,
//              na ordem em que aparecem.
// disponivel:  false = aparece "indisponível" e não dá para pedir
// destaque:    true = aparece no carrossel "Destaques" no topo do cardápio
// selo:        (opcional) etiqueta do card: "OFERTA" ou "MAIS PEDIDO"
//              (qualquer texto serve; só essas duas têm cor própria)
//
// PARA ADICIONAR UM PRODUTO: copie um bloco { ... }, cole
// embaixo, troque id, nome, preço e grupos. Para colocar foto, acrescente
// uma linha com o mesmo id em js/imagens.js. Pronto.
// -----------------------------------------------------
const PRODUTOS = [
  {
    id: "copo400",
    categoria: "promocoes",
    nome: "Copo de Açaí 400ml",
    descricao: "Açaí 400ml, com 3 adicionais, 2 frutas frescas, 1 creme saboroso e 1 cobertura.\nTudo montado no mesmo copo, garantindo um sabor incrível a cada colherada.",
    preco: 16.0,
    grupos: ["tipoAcai", "frutas", "complementos", "cobertura"],
    destaque: true,
    selo: "OFERTA",
    disponivel: true,
  },
  {
    id: "tigela300",
    categoria: "promocoes",
    nome: "Tigela de Açaí 300ml",
    descricao: "Açaí 300g com 1 opção de creme, 3 adicionais à sua escolha, 2 frutas frescas e cobertura.",
    preco: 14.0,
    grupos: ["tipoAcai", "cremes", "frutas", "complementos", "cobertura"],
    destaque: true,
    selo: "MAIS PEDIDO",
    disponivel: true,
  },
  {
    id: "tigela500",
    categoria: "promocoes",
    nome: "Tigela de Açaí 500ml",
    descricao: "Desfrute de um sabor em dobro a um preço especial. Aproveite esta promoção.",
    preco: 24.0,
    grupos: ["tipoAcai", "frutas", "complementos", "cobertura", "adicionais"],
    destaque: true,
    selo: "OFERTA",
    disponivel: true,
  },
  {
    id: "acai300",
    categoria: "acai",
    nome: "Açaí no Copo 300ml",
    descricao: "Escolha até 2 frutas e 4 complementos, com cobertura.",
    preco: 18.0,
    grupos: ["frutas", "complementos", "cobertura", "adicionais"],
    disponivel: true,
  },
  {
    id: "acai500",
    categoria: "acai",
    nome: "Açaí no Copo 500ml",
    descricao: "Escolha até 2 frutas e 4 complementos, com cobertura.",
    preco: 21.0,
    grupos: ["frutas", "complementos", "cobertura", "adicionais"],
    disponivel: true,
  },
  {
    id: "acai700",
    categoria: "acai",
    nome: "Açaí no Copo 700ml",
    descricao: "Escolha até 2 frutas e 4 complementos, com cobertura.",
    preco: 25.0,
    grupos: ["frutas", "complementos", "cobertura", "adicionais"],
    disponivel: true,
  },
  {
    id: "creme300",
    categoria: "acai",
    nome: "Creme no Copo 300ml",
    descricao: "Escolha o creme e monte com complementos.",
    preco: 16.0,
    grupos: ["cremes", "complementos", "cobertura", "adicionais"],
    disponivel: true,
  },
  {
    id: "sorvete-casquinha",
    categoria: "sorvete",
    nome: "Sorvete na Casquinha",
    descricao: "Uma bola do sabor que você escolher.",
    preco: 6.0,
    grupos: ["cremes"],
    disponivel: true,
  },
];
