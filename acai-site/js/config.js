// =====================================================
// ARQUIVO: js/config.js
//
// INFORMAÇÕES DA LOJA
//
// QUER TROCAR NOME, WHATSAPP, ENDEREÇO OU TAXA DE ENTREGA?
// É AQUI. Cada informação está escrita UMA vez só e o
// site inteiro usa estes valores.
//
// REGRA: mantenha as aspas "" e a vírgula no final de cada linha.
// =====================================================

const CONFIG = {

  // Nome que aparece no topo, no rodapé e no pedido.
  nomeLoja: "Casa do Roxo Açaí",

  // Cidade e estado mostrados ao lado do nome. Ex.: "Teresina - PI"
  cidade: "Teresina - PI",

  // WhatsApp que RECEBE os pedidos.
  // Formato: 55 + DDD + número, só números, sem espaço ou traço.
  // Exemplo: 5586999999999
  // ⚠️ TROQUE ANTES DE PUBLICAR, senão os pedidos vão para um número errado.
  whatsapp: "5586999999999",

  // Instagram (deixe "" para esconder). Precisa começar com https://
  instagram: "https://instagram.com/",

  // Texto livre mostrado no rodapé e no topo.
  endereco: "Rua Exemplo, 123 — Teresina/PI",

  // Horário de funcionamento (todos os dias). Formato "HH:MM", 24 horas.
  // O site mostra "Aberto até às 22h00" ou "Fechado" sozinho, conforme o horário.
  // Se fechar depois da meia-noite (ex.: 02:00), funciona também.
  horarioAbre: "14:00",
  horarioFecha: "22:00",

  // Tempo estimado de entrega mostrado ao cliente (texto livre).
  tempoEntrega: "30 a 50 min",

  // Entrega e retirada.
  // aceitaEntrega: false  -> o site só mostra "Retirar na loja".
  aceitaEntrega: true,
  taxaEntrega: 4.0,   // em reais. Use 0 para entrega grátis.
  // Compras com subtotal igual ou acima deste valor têm entrega grátis.
  // Use 0 para não ter essa regra.
  entregaGratisAcima: 0,

  // Formas de pagamento mostradas ao cliente.
  // O pagamento é feito na entrega/retirada. O site NÃO cobra online.
  // Para adicionar uma, escreva entre aspas. Para tirar, apague a linha.
  // A palavra "Dinheiro" é especial: pergunta se precisa de troco.
  formasPagamento: ["Pix", "Dinheiro", "Cartão de débito", "Cartão de crédito"],

  // CUPONS DE DESCONTO (opcional). Apague as linhas para não ter cupom.
  //   codigo: o que o cliente digita (use MAIÚSCULAS e sem espaço)
  //   tipo:   "percentual" (valor 10 = 10%) ou "valor" (valor 5 = R$ 5,00)
  //   minimo: subtotal mínimo para valer (0 = sem mínimo)
  // ⚠️ Como o site não tem servidor, estes códigos ficam visíveis a quem
  // inspecionar o código. O cupom aplicado aparece na mensagem do pedido
  // para a loja conferir. Não use cupons de valor alto.
  cupons: [
    { codigo: "BEMVINDO10", tipo: "percentual", valor: 10, minimo: 0 },
  ],

  // As IMAGENS (logo, banner, ícone, fotos) agora ficam em js/imagens.js.
};
