// Animação de entrada ao rolar (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.anim').forEach(el => observer.observe(el));


// Navbar desaparece ao rolar para baixo
let lastY = 0;
const navbar = document.querySelector('.navbar-custom');

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    navbar.style.transform =
        currentY > lastY && currentY > 80
            ? 'translateY(-100%)'
            : 'translateY(0)';

    navbar.style.transition = 'transform 0.3s ease';

    lastY = currentY;
});


// Formulário
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const dados = new FormData(form);

    try {
        const resposta = await fetch(form.action, {
            method: 'POST',
            body: dados,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (resposta.ok) {
            MensagemEnviada('Mensagem enviada com sucesso, iremos entrar em contato com você em breve.', 'Sucesso');
            form.reset();
        } else {
            MensagemEnviada('Não foi possível enviar sua mensagem. Tente novamente mais tarde.', 'erro');
        }
    } catch (erro) {
        MensagemEnviada('Erro de conexão. Verifique sua internet e tente novamente.', 'erro');
    }
});

function MensagemEnviada(mensagem, tipo = 'info') {

    // Cria o fundo escuro da modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Cria a caixa da mensagem
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = `mensagem ${tipo}`;

    // Conteúdo da modal
    mensagemDiv.innerHTML = `
        <div class="mensagem-icon">✓</div>
        <div class="mensagem-content">
            <h3>Sucesso!</h3>
            <p>${mensagem}</p>
        </div>
    `;

    // Coloca a mensagem dentro do overlay
    overlay.appendChild(mensagemDiv);

    // Adiciona a modal na página
    document.body.appendChild(overlay);

    // Fecha automaticamente
    setTimeout(() => {
        overlay.classList.add('fechando');

        setTimeout(() => {
            overlay.remove();
        }, 350);

    }, 3500);
}




