# Guia de Edição — "Onde eu altero isso?"

Você só precisa de um editor de texto (Bloco de Notas serve; o VS Code é melhor).
Depois de salvar qualquer arquivo, **atualize a página (F5)** para ver a mudança.

**Regra de ouro:** não apague aspas `" "` nem vírgulas `,` no fim das linhas.
Se o site ficar sem cardápio ou sem imagens, quase sempre é uma aspas ou vírgula faltando.

---

## Mapa rápido: quero mudar... → abra...

| Quero mudar | Abra este arquivo |
|---|---|
| **Qualquer imagem** (banner, ícone, fotos dos produtos) | `js/imagens.js` |
| Nome da loja, WhatsApp, endereço, cidade, horário, taxa de entrega, pagamentos, cupons | `js/config.js` |
| Produtos, preços, cremes, frutas, complementos, adicionais, categorias | `js/cardapio.js` |
| Cores do site | `css/cores.css` |
| Tamanhos, espaços, layout | `css/estilo.css` |
| Textos fixos e posição dos blocos da página | `index.html` |
| Texto da mensagem que chega no WhatsApp | `js/pedido.js` |

O resto da pasta `js/` é o "motor" do site. Cada arquivo tem no topo uma explicação do que faz.
A lista completa está no final deste guia.

---

# 🖼️ IMAGENS (tudo em `js/imagens.js`)

As imagens ficam na pasta `imagens/`, separadas em:

```
imagens/
├── banner/     banner grande do topo         (banner-topo.jpg)
├── icone/      logo da loja e ícone da aba   (icone-loja.png, favicon.png)
├── cardapio/   fotos dos produtos            (copo-acai-300ml.jpg, tigela-acai-500ml.jpg ...)
└── sistema/    ícones internos do site (lupa) — não mexa
```

## Quero trocar o banner do topo
1. Coloque a nova imagem em `imagens/banner/` (ideal: 1536 × 1024 px ou 1920 × 1080 px, JPG, até ~250 KB).
2. Em `js/imagens.js`, na linha `banner:`, escreva o caminho: `"imagens/banner/meu-banner.jpg"`.
3. Salve e atualize (F5).

> Atalho: se o arquivo novo tiver **exatamente o mesmo nome** do atual (`banner-topo.jpg`),
> é só substituir o arquivo na pasta. Não precisa mexer em nada.

Para **esconder** o banner: `banner: "",`.

## Quero trocar o logo / ícone da loja
O quadradinho ao lado do nome da loja. Ideal: 512 × 512 px, PNG.
1. Coloque o arquivo em `imagens/icone/`.
2. Em `js/imagens.js`, linha `logo:`, escreva o novo caminho.

## Quero trocar o ícone da aba do navegador
Ideal: 192 × 192 px, PNG. Coloque em `imagens/icone/` e mude a linha `favicon:` em `js/imagens.js`.

## Quero trocar a foto de um produto
1. Coloque a foto em `imagens/cardapio/` (ideal: 960 × 640 px, proporção 3:2, JPG, até ~120 KB).
2. Em `js/imagens.js`, na seção `produtos`, ache a linha do produto e troque o caminho.
   O nome à esquerda (`acai500`, `tigela300`...) é o `id` do produto em `js/cardapio.js`.

## Quero colocar foto em um produto novo (ou que está sem foto)
1. Crie o produto em `js/cardapio.js` (veja "Quero adicionar um produto" abaixo) e anote o `id` dele.
2. Em `js/imagens.js`, na seção `produtos`, acrescente uma linha com o **mesmo id**:
   `meuproduto: "imagens/cardapio/meu-produto.jpg",`

## Quero várias fotos no mesmo produto (galeria)
Use uma lista: `acai300: ["imagens/cardapio/a.jpg", "imagens/cardapio/b.jpg"],`.
A primeira aparece na vitrine; ao abrir o produto, o cliente desliza para ver as outras.

## Produto sem foto
Se não houver linha em `js/imagens.js`, aparece um ícone no lugar. Não dá erro.

## ⚠️ Cuidados com imagens
- **Nomes de arquivo sem espaço e sem acento** (`copo-acai-300ml.jpg`, não `Copo Açaí 300.jpg`).
- Mantenha a proporção **3:2** nas fotos do cardápio, senão as bordas podem ser cortadas. No banner, veja "Quero deixar o banner maior ou menor".
- A imagem `promocao-copo-400ml.jpg` tem o **preço R$ 16,00 desenhado nela**. Se mudar o preço
  do produto `copo400`, troque também a imagem.
- Imagens muito pesadas deixam o site lento no celular. Reduza antes de colocar (ex.: squoosh.app).

---

# 🏪 DADOS DA LOJA (`js/config.js`)

## Quero mudar o nome da loja
`nomeLoja`. Muda no topo, rodapé, título da aba e na mensagem do pedido.

## Quero alterar o WhatsApp (⚠️ faça antes de publicar)
`whatsapp`. Só números, com 55 + DDD. Exemplo: `"5586999999999"`.

## Quero alterar endereço, cidade, horário ou taxa de entrega
`endereco`, `cidade`, `horarioAbre`, `horarioFecha`, `taxaEntrega`, `tempoEntrega`.
O "Aberto até às 22h00" / "Fechado" do topo muda sozinho conforme o horário.
Entrega grátis a partir de certo valor: `entregaGratisAcima`.
Só retirada na loja: `aceitaEntrega: false`.

## Quero mudar formas de pagamento
`formasPagamento`. Adicione ou apague nomes da lista.

## Quero criar ou mudar cupons de desconto
`cupons`. Copie uma linha e mude `codigo`, `tipo` ("percentual" ou "valor"), `valor` e `minimo`.
⚠️ Sem servidor, os códigos ficam visíveis a quem inspecionar o site; o cupom aparece na mensagem
do pedido para você conferir. Sem cupons (`cupons: []`), a linha "Tem um cupom?" some.

## Quero alterar o e-mail
Este site não usa e-mail (os pedidos chegam pelo WhatsApp). Se quiser mostrar um e-mail no rodapé,
adicione `email: "contato@loja.com"` em `js/config.js` e inclua no rodapé em `js/topo-e-rodape.js`.

---

# 🍧 CARDÁPIO (`js/cardapio.js`)

## Quero mudar o preço de um produto
Na seção `PRODUTOS`, ache o produto e mude `preco`. Use **ponto**, não vírgula: `18.5`.

## Quero adicionar um produto (passo a passo)
1. Abra `js/cardapio.js` e vá até `PRODUTOS`.
2. Copie um bloco inteiro, de `{` até `},`, e cole logo abaixo.
3. Troque `id` (único, sem espaço/acento), `nome`, `descricao`, `preco`.
4. Em `categoria`, use um id de `CATEGORIAS` (`"acai"`, `"sorvete"`...).
5. Em `grupos`, escolha o que o cliente pode adicionar: `["frutas", "complementos", "cobertura", "adicionais"]`.
6. Para ter foto: veja "Quero colocar foto em um produto novo" lá em cima.
7. Salve e atualize a página.

## Quero tirar um produto do ar por hoje
No produto, troque `disponivel: true` por `disponivel: false`. Ele aparece como "Indisponível".

## Quero adicionar um creme, fruta, complemento ou adicional
1. Em `js/cardapio.js`, vá até `GRUPOS`.
2. Ache o grupo (`cremes`, `frutas`, `complementos`, `cobertura`, `adicionais`).
3. Em `itens`, copie uma linha e mude: `{ nome: "Cupuaçu", preco: 0 },`
4. Salve. **Ele aparece automaticamente em todos os produtos que usam esse grupo.**

Use `preco: 0` para itens inclusos e um valor (ex.: `3.5`) para itens cobrados à parte.

## Quero esconder um item que acabou
Coloque `//` no começo da linha dele. Para voltar, apague o `//`.

## Quero mudar quantos itens o cliente pode escolher
No grupo, altere `max` (máximo) e `min` (mínimo; `1` = obrigatório).
Exemplo: `max: 6` = "até 6 complementos".

## Quero criar um grupo novo (ex.: "Tamanho da calda")
Em `GRUPOS`, copie um grupo inteiro, dê um nome novo (ex.: `calda:`), ajuste título e itens.
Depois adicione `"calda"` na lista `grupos` dos produtos que vão usá-lo.

## Quero criar uma nova categoria (aba)
Em `CATEGORIAS`, adicione `{ id: "bebidas", nome: "Bebidas" },`.
Nos produtos, use `categoria: "bebidas"`.

## Quero colocar um produto nos Destaques (carrossel do topo)
No produto, adicione `destaque: true,`. Para a etiqueta colorida: `selo: "OFERTA",` ou `selo: "MAIS PEDIDO",`.

## Quero mexer nas Promoções
O botão "Promoções" do menu roxo leva à categoria com id `"promocoes"`.
Coloque os produtos em promoção com `categoria: "promocoes"`. Sem essa categoria, o botão some.

---

# 🎨 VISUAL

## Quero mudar a cor principal
`css/cores.css` → `--cor-principal` (ex.: `#7511c9` → `#0a7d3c`). Use um "color picker" para achar o código.

## Quero deixar o banner maior ou menor
O banner ocupa sempre a largura toda. Para mudar a altura dele no computador, abra `css/estilo.css`,
procure `BANNER DO TOPO` e mude `--banner-proporcao` (`16 / 9` = padrão, `3 / 2` = mais alto,
`2 / 1` ou `3 / 1` = mais baixo). Se usar um banner bem largo e baixo, use `3 / 1`.
`--banner-posicao` escolhe qual parte da imagem fica visível quando ela é cortada.

## Quero alterar fontes
`css/estilo.css`, no bloco `body`, linha `font-family`.
(Fontes do sistema = site mais rápido e sem enviar dados do cliente para terceiros.)

## Quero alterar o texto dos botões
- "Ver meu pedido": `index.html`, procure por `Ver meu pedido`.
- "Enviar pedido pelo WhatsApp": `index.html`, procure por esse texto.

## Quero alterar o rodapé
Os dados vêm de `js/config.js`. A estrutura está no fim do `index.html` (`<footer>`).

## Quero alterar a mensagem que chega no WhatsApp
`js/pedido.js` → função `montarMensagem`.

---

## Se algo quebrar
1. Desfaça a última alteração (Ctrl+Z) e salve.
2. Quase sempre é aspas `"` ou vírgula `,` faltando.
3. No navegador, aperte F12 → aba "Console": a mensagem de erro indica o arquivo e a linha.
4. Se uma imagem não aparece: confira se o nome do arquivo está idêntico (maiúsculas/minúsculas contam!).

---

## Lista completa dos arquivos

**HTML:** `index.html` (estrutura da página).
**CSS:** `css/cores.css` (cores) e `css/estilo.css` (layout).
**JavaScript** (`js/`), na ordem em que carregam:

| Arquivo | Para que serve | Mexe no dia a dia? |
|---|---|---|
| `config.js` | Dados da loja | **Sim** |
| `imagens.js` | Todas as imagens | **Sim** |
| `cardapio.js` | Produtos, preços, opções | **Sim** |
| `utilitarios.js` | Ferramentas pequenas (formatar preço...) | Não |
| `estado.js` | Carrinho e o que está aberto | Não |
| `precos.js` | Cálculo de preços | Raramente |
| `cupom.js` | Cupom de desconto | Raramente |
| `topo-e-rodape.js` | Topo, rodapé, aberto/fechado, "mais informações" | Raramente |
| `vitrine.js` | Abas, busca, destaques, cartões | Raramente |
| `produto.js` | Janela do produto (fotos e opções) | Raramente |
| `sacola.js` | Sacola e resumo do pedido | Raramente |
| `pedido.js` | Formulário e mensagem do WhatsApp | Às vezes (texto da mensagem) |
| `main.js` | Liga tudo (sempre o último) | Não |

Se criar um arquivo `.js` novo, inclua-o no `index.html` **antes** de `main.js`.
