# Site de pedidos de açaí

Cardápio online simples: o cliente vê os produtos, monta o açaí (frutas, cremes, complementos, adicionais),
confere o pedido e envia pelo WhatsApp da loja.

## 1. Tecnologias
HTML, CSS e JavaScript puros. **Sem instalação, sem dependências, sem servidor.**
Escolha técnica: como o pagamento é feito na entrega/retirada e o pedido sai por WhatsApp,
não há necessidade de backend nem banco de dados — o que reduz custo e superfície de ataque.

## 2. Como executar
Dê dois cliques em `index.html`, ou rode `python3 -m http.server 8000` na pasta e abra `http://localhost:8000`.

## 3. Estrutura
HTML, CSS e JavaScript ficam em arquivos separados:
```
index.html            HTML: só a estrutura da página
css/
  cores.css           Cores (edite aqui para mudar o visual)
  estilo.css          Layout e tamanhos
js/
  config.js           DADOS: nome, WhatsApp, endereço, horário, taxa, pagamentos, cupons
  imagens.js          DADOS: caminho de TODAS as imagens  <-- trocar imagem é aqui
  cardapio.js         DADOS: categorias, produtos, cremes, complementos, preços
  utilitarios.js      ferramentas pequenas (formatar preço, criar elementos)
  estado.js           carrinho e estado do site
  precos.js           cálculo de preços
  cupom.js            cupom de desconto
  topo-e-rodape.js    topo, rodapé, aberto/fechado, "mais informações"
  vitrine.js          abas, busca, destaques, cartões de produto
  produto.js          janela do produto (fotos e opções)
  sacola.js           sacola e resumo do pedido
  pedido.js           formulário e mensagem do WhatsApp
  main.js             liga tudo (último a carregar)
imagens/
  banner/             banner do topo
  icone/              logo da loja e ícone da aba
  cardapio/           fotos dos produtos
  sistema/            ícones internos (lupa)
robots.txt            orientação para buscadores
GUIA-DE-EDICAO.md     como mudar cada coisa
```
Cada arquivo `.js` e `.css` começa com um comentário explicando o que faz e quando mexer nele.

## 4. Onde alterar
Veja o **GUIA-DE-EDICAO.md** (cores, textos, preços, imagens, WhatsApp, produtos, cremes).

## 5. Como publicar
Não há "build": publique a pasta como está. Opções gratuitas: Netlify, Vercel, Cloudflare Pages ou GitHub Pages
(arraste a pasta ou conecte o repositório). Todas fornecem HTTPS automaticamente.
Depois de publicar, edite `robots.txt` com o endereço do site.

## 6. Segurança
- Todo texto inserido na página usa `textContent` (sem `innerHTML`) → proteção contra XSS.
- `Content-Security-Policy` no `index.html` limita de onde o site carrega scripts e imagens.
- Os preços são recalculados a partir do `js/cardapio.js` no envio; o carrinho salvo no navegador não é confiável.
- Nenhuma senha, chave ou dado do cliente é guardado ou enviado para servidor.
- **Limite honesto:** como não há backend, o pedido chega como mensagem de WhatsApp, e a loja deve
  conferir os valores. Qualquer pessoa pode mandar uma mensagem falsa para o seu WhatsApp, como em qualquer pedido por mensagem.
- **Pagamento online (Pix/cartão automático) exige backend** com chaves secretas guardadas em variáveis de ambiente.
  Não foi implementado de propósito: fazer isso apenas no frontend seria inseguro.
- Cabeçalhos de segurança (anti-clickjacking, HSTS) são configurados na hospedagem, não no HTML. No Netlify,
  crie um arquivo `_headers` com `X-Frame-Options: DENY` e `X-Content-Type-Options: nosniff`.

## 7. Manutenção
- Atualize `js/cardapio.js` quando mudar preço ou produto.
- Compare periodicamente se o WhatsApp em `js/config.js` está correto.
- Teste um pedido de verdade depois de qualquer alteração grande.

## Ainda falta (dados que só você tem)
Nome real da loja, WhatsApp, endereço, horário e cardápio/preços reais (as imagens atuais são as que você enviou; confirme que pode usá-las), e política de privacidade
(o site não coleta dados, mas o endereço digitado vai para o WhatsApp da loja; vale informar isso ao cliente).
