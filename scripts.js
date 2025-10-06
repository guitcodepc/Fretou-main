// Seletores
const btnMotorista = document.getElementById('btn-motorista');
const btnSobre = document.getElementById('btn-sobre');
const btnContato = document.getElementById('btn-contato');
const btnAcao = document.getElementById('btn-acao');
const clienteContent = document.getElementById('cliente-content');
const hero = document.getElementById('hero');
const destaqueCard = document.querySelector('.vantagens .card.destaque');
const sessaoSobre = document.getElementById('sobre');

const hamburger = document.getElementById('hamburger');
const menuHeader = document.getElementById('menu-header');
const menuClose = document.getElementById('menu-close');

// Chat
const chatBubble = document.getElementById('chat-bubble');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

const suggestions = document.querySelectorAll('.suggestion');

// Contato form
const contactForm = document.getElementById('contact-form');

// Logo
const logoImg = document.getElementById('logo-img');
const logoWrap = document.getElementById('logo-wrap');

// ================= Logo animation (entrada + bob) =================
function animateLogoEntry(){
  // aplica classes que controlam a animação
  logoImg.classList.add('logo-animate');
  // após animação de entrada, aplica leve bobbing contínuo
  setTimeout(()=> logoImg.classList.add('logo-bob'), 900);
}
// inicia animação quando DOM pronto
window.addEventListener('load', animateLogoEntry);

// ================= Responsivo / Menu =================
function openMenu(){
  menuHeader.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  // lock scroll
  document.body.style.overflow = 'hidden';
}
function closeMenu(){
  menuHeader.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', (e)=>{
  e.stopPropagation();
  menuHeader.classList.contains('open') ? closeMenu() : openMenu();
});
menuClose.addEventListener('click', (e)=>{ e.preventDefault(); closeMenu(); });
document.addEventListener('click', e=>{
  if(menuHeader.classList.contains('open') && !menuHeader.contains(e.target) && !hamburger.contains(e.target)){
    closeMenu();
  }
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeMenu(); closeChat(); }});

// fechar menu ao clicar em item (em mobile)
menuHeader.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{ if(window.innerWidth <= 768) closeMenu(); });
});

// ================= Area Motorista / Cliente =================
let motoristaAtivo = true;
function areaMotorista(){ 
  btnMotorista.textContent="Área do Cliente"; 
  hero.style.backgroundImage="url('img/caminhaoareamotorista.png')"; 
  clienteContent.textContent="Transforme a logística da sua empresa num negócio seguro"; 
  if(destaqueCard) destaqueCard.style.background="cadetblue"; 
  if(sessaoSobre) sessaoSobre.style.backgroundImage="url('img/imagem_2025-09-14_112203890.png')"; 
  motoristaAtivo=false;
}
function areaCliente(){ 
  btnMotorista.textContent="Área do motorista"; 
  hero.style.backgroundImage="url('img/Carros.png')"; 
  clienteContent.textContent="Encontre um caminhoneiro para levar sua carga"; 
  if(destaqueCard) destaqueCard.style.background=""; 
  if(sessaoSobre) sessaoSobre.style.backgroundImage=""; 
  motoristaAtivo=true;
}
btnMotorista.addEventListener('click', e=>{ e.preventDefault(); motoristaAtivo?areaMotorista():areaCliente(); });

// ================= CTA (header) - exemplo de animação ao clicar =================
btnAcao.addEventListener('click', e=>{
  e.preventDefault();
  // efeito "pulse" na logo para indicar ação/posição do onboarding
  logoImg.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.14)' },
    { transform: 'scale(1)' }
  ], { duration: 420, easing: 'ease-out' });
  alert('Ação: Seja cliente (implemente formulário/rota de onboarding).');
});

// ================= Contato (simples fetch) =================
contactForm.addEventListener('submit', e=>{
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  if(!nome || !email || !mensagem){ alert('Preencha todos os campos.'); return; }
  fetch(contactForm.action, {
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:`nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&mensagem=${encodeURIComponent(mensagem)}`
  }).then(()=>{ alert('Mensagem enviada!'); contactForm.reset(); }).catch(()=>alert('Erro ao enviar.'));
});

// ================= Chat IA =================
function openChat(){ chatPanel.classList.add('open'); chatPanel.setAttribute('aria-hidden','false'); setTimeout(()=>chatMessages.scrollTop=chatMessages.scrollHeight,40);}
function closeChat(){ chatPanel.classList.remove('open'); chatPanel.setAttribute('aria-hidden','true'); }
function appendMessage(text, who='bot'){
  const div = document.createElement('div');
  div.classList.add('message');
  if(who==='user') div.classList.add('user');
  else if(who==='bot') div.classList.add('bot');
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Respostas alinhadas com conteúdo do site (inclui preços fictícios)
function generateBotResponse(message){
  const msg = message.toLowerCase();
  if(msg.includes('como funciona') || msg.includes('como') && msg.includes('funciona')) {
    return "O Fretou conecta quem precisa transportar cargas com caminhoneiros autônomos: publique sua carga, receba propostas, avalie perfis e escolha. Oferecemos rastreamento por GPS, comunicação direta e histórico de cargas.";
  }
  if(msg.includes('preço')||msg.includes('custo')||msg.includes('valor')){
    return "Preços fictícios (exemplo):\n• Carga urbana (até 50km): R$ 120 - R$ 220\n• Viagem curta (50–300km): R$ 600 - R$ 1.200\n• Longa distância (300+ km): a partir de R$ 1.800. Valores variam conforme tipo de carga, urgência e distância.";
  }
  if(msg.includes('cadastro')||msg.includes('registr')||msg.includes('cliente')){
    return "Para se cadastrar clique em 'Seja cliente' no topo e siga o onboarding. Motoristas devem informar documento, CNH e foto do veículo para validação.";
  }
  if(msg.includes('contato')||msg.includes('telefone')||msg.includes('suporte')){
    return "Entre em contato pelo formulário no final da página (clique em 'Contato') ou envie uma mensagem por aqui que ajudamos com orientações.";
  }
  if(msg.includes('motorista')||msg.includes('caminhoneiro')){
    return "Motoristas autônomos podem se cadastrar, receber ofertas, negociar e aceitar corridas. Nós facilitamos o contato direto entre remetente e caminhoneiro.";
  }
  if(msg.includes('gps')||msg.includes('monitor')){
    return "Oferecemos monitoramento por GPS em tempo real e atualizações ao remetente durante todo o trajeto.";
  }
  return "Posso ajudar com: 'Como funciona?', 'Preços fictícios' ou 'Sobre a empresa'.";
}

// enviar por input
function handleChatSend(){
  const value = chatInput.value.trim();
  if(!value) return;
  appendMessage(value, 'user');
  chatInput.value = '';
  // simula pensamento do bot
  setTimeout(()=> appendMessage(generateBotResponse(value), 'bot'), 500);
}

// sugestões rápidas
suggestions.forEach(el=>{
  el.addEventListener('click', ()=>{
    const key = el.getAttribute('data-suggest');
    if(key === 'sobre'){
      appendMessage('Sobre a empresa', 'user');
      setTimeout(()=> appendMessage("O Fretou é uma plataforma de conexão entre remetentes e caminhoneiros autônomos: publicação de cargas, propostas em tempo real, rastreamento por GPS e suporte. Nossa missão é tornar logística acessível e transparente.", 'bot'), 300);
    } else if(key === 'precos'){
      appendMessage('Preços fictícios', 'user');
      setTimeout(()=> appendMessage("Exemplos de preços fictícios:\n• Carga urbana (até 50km): R$ 120 - R$ 220\n• Viagem média (50–300km): R$ 600 - R$ 1.200\n• Longa distância (300+ km): a partir de R$ 1.800", 'bot'), 300);
    } else if(key === 'o-que-fazemos'){
      appendMessage('O que fazemos', 'user');
      setTimeout(()=> appendMessage("Conectamos clientes e caminhoneiros, permitimos negociações diretas, oferecemos rastreamento por GPS, pagamentos seguros e suporte 24/7.", 'bot'), 300);
    }
  });
});

chatBubble.addEventListener('click', ()=>{ openChat(); if(menuHeader.classList.contains('open')) closeMenu(); });
chatClose.addEventListener('click', ()=> closeChat());
chatSend.addEventListener('click', e=>{ e.preventDefault(); handleChatSend(); });
chatForm.addEventListener('submit', e=>{ e.preventDefault(); handleChatSend(); });

// ================= Scroll suave Contato =================
btnContato.addEventListener('click', e=>{ e.preventDefault(); document.getElementById('contato').scrollIntoView({behavior:'smooth', block:'start'}); if(window.innerWidth <= 768) closeMenu(); });

// ================= Inicialização =================
(function init(){
  // garante menu fechado
  menuHeader.classList.remove('open');
  hamburger.classList.remove('open');
  chatPanel.classList.remove('open');
})();

