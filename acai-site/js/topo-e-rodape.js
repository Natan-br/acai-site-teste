// =====================================================
// ARQUIVO: js/topo-e-rodape.js
//
// TOPO, RODAPÉ, STATUS ABERTO/FECHADO E JANELA "MAIS INFORMAÇÕES"
//
// O QUE FAZ?
// Preenche nome, cidade, imagens do topo (de js/imagens.js), horário, rodapé e a
// janela de informações da loja, usando os dados de js/config.js.
//
// QUANDO MEXER AQUI?
// Para mudar o TEXTO de algo fixo, como "Fechado · abre às ..." ou as linhas da
// janela de informações. Nome, cidade, horário e endereço NÃO se mudam aqui:
// ficam em js/config.js. Imagens ficam em js/imagens.js.
// =====================================================

"use strict";

// -----------------------------------------------------
// DESENHAR A PÁGINA (topo, rodapé, categorias, produtos)
// -----------------------------------------------------
function montarTopoERodape() {
  document.title = CONFIG.nomeLoja + " — Faça seu pedido online";
  $("nome-loja").textContent = CONFIG.nomeLoja;
  $("perfil-cidade").textContent = CONFIG.cidade;
  // ---- IMAGENS: os caminhos ficam em js/imagens.js (é lá que se troca) ----
  $("logo").src = IMAGENS.logo;
  $("logo").alt = "Logo " + CONFIG.nomeLoja;
  $("logo").parentElement.hidden = !IMAGENS.logo;           // sem logo: esconde o quadro
  document.querySelector('link[rel="icon"]').href = IMAGENS.favicon;

  // Banner: se não tiver imagem configurada, esconde a área toda.
  // (O tamanho do banner na tela é controlado em css/estilo.css.)
  $("capa-banner").hidden = !IMAGENS.banner;
  if (IMAGENS.banner) {
    $("banner").src = IMAGENS.banner;
    $("banner").alt = "Banner da " + CONFIG.nomeLoja;
  }

  atualizarStatusAberto();
  setInterval(atualizarStatusAberto, 60000); // reavalia a cada minuto

  // Texto da linha "Taxa e tempo de entrega" da sacola lateral
  $("lateral-entrega-texto").textContent = CONFIG.aceitaEntrega
    ? "Entrega " + (CONFIG.taxaEntrega > 0 ? dinheiro(CONFIG.taxaEntrega) : "grátis") + " · " + CONFIG.tempoEntrega
    : "Somente retirada na loja";

  montarJanelaInfo();

  $("rodape-endereco").textContent = "📍 " + CONFIG.endereco;

  const contato = $("rodape-contato");
  contato.textContent = "";
  const link = criar("a", "", "WhatsApp");
  link.href = "https://wa.me/" + CONFIG.whatsapp;
  link.rel = "noopener noreferrer";
  contato.append(link);
  if (CONFIG.instagram) {
    const insta = criar("a", "", "Instagram");
    insta.href = CONFIG.instagram;
    insta.rel = "noopener noreferrer";
    insta.target = "_blank";
    contato.append(" · ", insta);
  }
  $("rodape-copy").textContent = "© " + new Date().getFullYear() + " " + CONFIG.nomeLoja + ". Todos os direitos reservados.";

  $("rotulo-entrega").textContent = "Entrega" + (CONFIG.taxaEntrega > 0 ? " (" + dinheiro(CONFIG.taxaEntrega) + ")" : " (grátis)");
  $("aviso-whatsapp").textContent = "O pedido será enviado para o WhatsApp da loja. O pagamento é feito na " +
    "entrega ou retirada.";

  const selectPag = $("cliente-pagamento");
  selectPag.append(new Option("Selecione…", ""));
  CONFIG.formasPagamento.forEach((f) => selectPag.append(new Option(f, f)));

  if (!CONFIG.aceitaEntrega) {
    document.querySelector('input[name="tipo"][value="entrega"]').closest("label").hidden = true;
    document.querySelector('input[name="tipo"][value="retirada"]').checked = true;
  }
}

// -----------------------------------------------------
// FUNÇÃO: atualizarStatusAberto()
//
// O QUE FAZ? Mostra "Aberto até às 22h00" (verde) ou
// "Fechado · abre às 14h00" (vermelho) comparando a hora
// atual com horarioAbre/horarioFecha do config.js.
//
// OBS.: usa o relógio do aparelho do cliente. Ela só informa;
// não impede o cliente de fazer o pedido.
// -----------------------------------------------------
function paraMinutos(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatarHora(hhmm) { return hhmm.replace(":", "h"); } // "22:00" -> "22h00"

function atualizarStatusAberto() {
  const agora = new Date();
  const min = agora.getHours() * 60 + agora.getMinutes();
  const abre = paraMinutos(CONFIG.horarioAbre);
  const fecha = paraMinutos(CONFIG.horarioFecha);
  // Se fecha < abre, a loja vai além da meia-noite.
  const aberto = abre <= fecha ? (min >= abre && min < fecha) : (min >= abre || min < fecha);

  const el = $("status-aberto");
  el.className = "status " + (aberto ? "status--aberto" : "status--fechado");
  el.textContent = aberto
    ? "Aberto até às " + formatarHora(CONFIG.horarioFecha)
    : "Fechado · abre às " + formatarHora(CONFIG.horarioAbre);
}

// Janela "Mais informações": endereço, horário, pagamento, contato.
function montarJanelaInfo() {
  const lista = $("info-lista");
  lista.textContent = "";
  const linha = (titulo, valor) => {
    lista.append(criar("dt", "", titulo), criar("dd", "", valor));
  };
  linha("Endereço", CONFIG.endereco);
  linha("Horário", "Todos os dias, das " + formatarHora(CONFIG.horarioAbre) + " às " + formatarHora(CONFIG.horarioFecha));
  linha("Entrega", CONFIG.aceitaEntrega
    ? (CONFIG.taxaEntrega > 0 ? dinheiro(CONFIG.taxaEntrega) : "Grátis") + " · " + CONFIG.tempoEntrega + " · ou retire na loja"
    : "Somente retirada na loja");
  linha("Pagamento (na entrega ou retirada)", CONFIG.formasPagamento.join(", "));
  const dd = criar("dd");
  const wa = criar("a", "", "Falar no WhatsApp");
  wa.href = "https://wa.me/" + CONFIG.whatsapp;
  wa.rel = "noopener noreferrer";
  wa.target = "_blank";
  dd.append(wa);
  lista.append(criar("dt", "", "Contato"), dd);
}
