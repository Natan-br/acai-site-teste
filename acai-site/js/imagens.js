// =====================================================
// ARQUIVO: js/imagens.js
//
// 🖼️  AQUI É ONDE SE TROCA QUALQUER IMAGEM DO SITE
//
// Todas as imagens ficam na pasta imagens/, separadas assim:
//
//   imagens/banner/    -> o banner grande do topo
//   imagens/icone/     -> o ícone/logo da loja e o ícone da aba do navegador
//   imagens/cardapio/  -> as fotos dos produtos
//   imagens/sistema/   -> ícones internos do site (lupa da busca). Não mexa.
//
// COMO TROCAR UMA IMAGEM (passo a passo):
//   1. Coloque o arquivo novo na pasta certa (ex.: imagens/cardapio/).
//   2. Abaixo, mude o caminho entre aspas para o nome do novo arquivo.
//   3. Salve e atualize a página (F5).
//   DICA: se o novo arquivo tiver EXATAMENTE o mesmo nome do antigo, nem
//   precisa mexer neste arquivo: é só substituir o arquivo na pasta.
//
// TAMANHOS RECOMENDADOS (quanto menor o arquivo, mais rápido o site):
//   Banner ......... 1536 x 1024 px (3:2) ou 1920 x 1080 px (16:9), JPG, até ~250 KB
//                    (o tamanho dele na tela se ajusta em css/estilo.css)
//   Ícone da loja .. 512 x 512 px, PNG (fundo transparente fica melhor)
//   Ícone da aba ... 192 x 192 px, PNG
//   Fotos produtos . 960 x 640 px (proporção 3:2), JPG, até ~120 KB
//   (A proporção 3:2 é a das imagens atuais: se usar outra, as bordas
//    podem ser cortadas.)
//
// ⚠️ Nomes de arquivo: sem espaços e sem acentos (use "copo-acai-300ml.jpg").
// ⚠️ Mantenha as aspas "" e a vírgula no final de cada linha.
// =====================================================

const IMAGENS = {

  // ---------------------------------------------------
  // 1) ÍCONE DA LOJA
  // ---------------------------------------------------

  // Logo quadrado que aparece ao lado do nome da loja (abaixo do banner).
  // Deixe "" para esconder.
  logo: "imagens/icone/icone-loja.png",

  // Ícone pequeno que aparece na aba do navegador.
  favicon: "imagens/icone/favicon.png",


  // ---------------------------------------------------
  // 2) BANNER DO TOPO
  // Imagem larga logo abaixo da barra roxa.
  // Deixe "" para esconder o banner.
  // ---------------------------------------------------
  banner: "imagens/banner/banner-topo.jpg",


  // ---------------------------------------------------
  // 3) FOTOS DO CARDÁPIO
  //
  // A chave (à esquerda) é o "id" do produto em js/cardapio.js.
  // O valor (à direita) é:
  //   - um caminho entre aspas  -> uma foto
  //   - uma lista [ "a.jpg", "b.jpg" ] -> várias fotos
  //     (viram uma galeria que o cliente desliza ao abrir o produto).
  //
  // PRODUTO NOVO COM FOTO: crie o produto em js/cardapio.js e acrescente
  // aqui uma linha com o MESMO id dele.
  // PRODUTO SEM LINHA AQUI: aparece um ícone no lugar da foto.
  //
  // ⚠️ A imagem "promocao-copo-400ml.jpg" tem o preço R$ 16,00 desenhado nela.
  //    Se mudar o preço desse produto, troque também a imagem.
  // ---------------------------------------------------
  produtos: {
    // Promoções / Destaques
    copo400:  "imagens/cardapio/promocao-copo-400ml.jpg",
    tigela300: "imagens/cardapio/tigela-acai-300ml.jpg",
    tigela500: "imagens/cardapio/tigela-acai-500ml.jpg",

    // Açaí e Cremes
    acai300: ["imagens/cardapio/copo-acai-300ml.jpg", "imagens/cardapio/copo-acai-300ml-2.jpg"],
    acai500: "imagens/cardapio/copo-acai-500ml.jpg",
    acai700: "imagens/cardapio/copo-acai-700ml.jpg",
    creme300: "imagens/cardapio/creme-no-copo.jpg",

    // Sorvetes
    "sorvete-casquinha": "imagens/cardapio/sorvete-casquinha.jpg",
  },
};
