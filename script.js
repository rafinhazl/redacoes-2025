// Dados das redações atualizados com os novos nomes das imagens
const redacoes = [
    { 
        id: 1, 
        tema: "Por que os procedimentos estéticos estão aumentando entre os jovens?", 
        data: "30/07/2025", 
        imagem: "R1 - Image1.png",
        imagemCompleta: "redacao1.png"
    },
    { 
        id: 2, 
        tema: "Acessibilidade e inclusão de pessoas com deficiência no Brasil", 
        data: "04/08/2025", 
        imagem: "R2 - Imagem.jpg",
        imagemCompleta: "redacao2.png"
    },
    { 
        id: 3, 
        tema: "Principais fatores que influenciam na qualidade de vida e no bem-estar da população", 
        data: "11/08/2025", 
        imagem: "R3 - Imagem.jpg",
        imagemCompleta: "redacao3.png"
    },
    { 
        id: 4, 
        tema: "As mudanças climáticas no Brasil e seus desafios", 
        data: "18/08/2025", 
        imagem: "R4 - Imagem.jpg",
        imagemCompleta: "redacao4.png"
    },
    { 
        id: 5, 
        tema: "As consequências do descarte de lixo eletrônico", 
        data: "27/08/2025", 
        imagem: "R5 - Imagem.jpg",
        imagemCompleta: "redacao5.png"
    },
    { 
        id: 6, 
        tema: "O consumo de ultraprocessados e suas consequências à saúde", 
        data: "02/09/2025", 
        imagem: "R6 - Imagem.jpg",
        imagemCompleta: "redacao6.png"
    },
    { 
        id: 7, 
        tema: "Fatores e efeitos da dependência em jogos de apostas na web", 
        data: "09/09/2025", 
        imagem: "R7 - Imagem.jpg",
        imagemCompleta: "redacao7.png"
    },
    { 
        id: 8, 
        tema: "A importância do trabalho voluntário no combate às desigualdades sociais", 
        data: "19/09/2025", 
        imagem: "R8 - Imagem.jpg",
        imagemCompleta: "redacao8.png"
    },
    { 
        id: 9, 
        tema: "Adultização infantil – consequências da perda irreparável da infância", 
        data: "26/09/2025", 
        imagem: "R9 - Imagem.jpg",
        imagemCompleta: "redacao9.png"
    },
    { 
        id: 10, 
        tema: "Caminhos para combater o etarismo nas relações sociais", 
        data: "26/09/2025", 
        imagem: "R10 - Imagem.jpg",
        imagemCompleta: "redacao10.png"
    },
    { 
        id: 11, 
        tema: "A importância da educação financeira para os jovens", 
        data: "10/10/2025", 
        imagem: "R11 - Imagem.jpg",
        imagemCompleta: "redacao11.png"
    },
    { 
        id: 12, 
        tema: "Desafios para a valorização da cultura popular brasileira", 
        data: "17/10/2025", 
        imagem: "R12 - Imagem.jpg",
        imagemCompleta: "redacao12.png"
    },
    { 
        id: 13, 
        tema: "Caminhos para a universalização do saneamento básico no Brasil", 
        data: "24/10/2025", 
        imagem: "R13 - Imagem.jpg",
        imagemCompleta: "redacao13.png"
    },
    { 
        id: 14, 
        tema: "O papel do esporte como ferramenta de transformação social", 
        data: "31/10/2025", 
        imagem: "R14 - Imagem.jpeg",
        imagemCompleta: "redacao14.png"
    }
];

// Elementos DOM
const redacoesGrid = document.querySelector('.redacoes-grid');
const modal = document.getElementById('redacaoModal');
const modalTitulo = document.getElementById('modalTitulo');
const modalImagem = document.getElementById('modalImagem');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close-btn');
const btnTopo = document.getElementById('btnTopo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Variáveis para controlar o arraste e a redação atual
let isDragging = false;
let startX, startY;
let redacaoAtualId = null;

// Criar cards das redações
function criarCardsRedacoes() {
    redacoes.forEach(redacao => {
        const card = document.createElement('div');
        card.className = 'redacao-card';
        card.innerHTML = `
            <div class="card-imagem">
                <img src="${redacao.imagem}" alt="Imagem da redação ${redacao.id}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+'">
            </div>
            <div class="card-body">
                <div class="redacao-identificacao">
                    <div class="redacao-numero">Redação ${redacao.id}</div>
                    <div class="redacao-codigo">R${redacao.id}</div>
                </div>
                <p class="tema">${redacao.tema}</p>
                <p class="data">${redacao.data}</p>
                <div class="card-footer">
                    <span>Clique para expandir</span>
                </div>
            </div>
        `;
        
        // Adicionar eventos de mouse para controlar arraste
        card.addEventListener('mousedown', (e) => {
            isDragging = false;
            startX = e.clientX;
            startY = e.clientY;
        });

        card.addEventListener('mousemove', (e) => {
            if (startX !== undefined && startY !== undefined) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                // Se o movimento for maior que 5 pixels, considera como arraste
                if (Math.sqrt(dx * dx + dy * dy) > 5) {
                    isDragging = true;
                }
            }
        });

        card.addEventListener('mouseup', (e) => {
            if (!isDragging) {
                abrirModal(redacao.id);
            }
            startX = undefined;
            startY = undefined;
        });

        // Para eventos de toque (mobile)
        card.addEventListener('touchstart', (e) => {
            isDragging = false;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        card.addEventListener('touchmove', (e) => {
            if (startX !== undefined && startY !== undefined) {
                const dx = e.touches[0].clientX - startX;
                const dy = e.touches[0].clientY - startY;
                if (Math.sqrt(dx * dx + dy * dy) > 5) {
                    isDragging = true;
                }
            }
        });

        card.addEventListener('touchend', (e) => {
            if (!isDragging) {
                abrirModal(redacao.id);
            }
            startX = undefined;
            startY = undefined;
        });
        
        redacoesGrid.appendChild(card);
    });
}

// Função para abrir o modal
function abrirModal(id) {
    const redacao = redacoes.find(r => r.id === id);
    if (!redacao) return;
    
    redacaoAtualId = id;
    modalTitulo.textContent = `Redação ${redacao.id} - ${redacao.tema}`;
    
    // Resetar animações
    modalContent.classList.remove('fade-out');
    modal.classList.remove('fade-out');
    
    // Carrega a imagem da redação completa
    const imagePath = redacao.imagemCompleta;
    modalImagem.src = imagePath;
    modalImagem.alt = `Redação ${redacao.id} - ${redacao.tema}`;
    
    // Adicionar tratamento de erro para a imagem do modal
    modalImagem.onerror = function() {
        console.error(`Erro ao carregar a imagem: ${imagePath}`);
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBkYSByZWRhw6fDo28gbsOjbyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
        this.alt = `Imagem da redação ${redacao.id} não encontrada`;
    };
    
    // Atualizar estado dos botões de navegação
    atualizarBotoesNavegacao();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Impede rolagem do corpo
    
    // Forçar reflow para garantir a animação
    void modal.offsetWidth;
}

// Função para atualizar os botões de navegação
function atualizarBotoesNavegacao() {
    // Desabilitar botão anterior se for a primeira redação
    prevBtn.disabled = redacaoAtualId === 1;
    
    // Desabilitar botão próximo se for a última redação
    nextBtn.disabled = redacaoAtualId === redacoes.length;
}

// Função para navegar para a próxima redação
function proximaRedacao() {
    if (redacaoAtualId < redacoes.length) {
        // Animação de transição
        modalContent.classList.add('fade-out');
        setTimeout(() => {
            abrirModal(redacaoAtualId + 1);
        }, 400);
    }
}

// Função para navegar para a redação anterior
function redacaoAnterior() {
    if (redacaoAtualId > 1) {
        // Animação de transição
        modalContent.classList.add('fade-out');
        setTimeout(() => {
            abrirModal(redacaoAtualId - 1);
        }, 400);
    }
}

// Função para fechar o modal com animação
function fecharModal() {
    modalContent.classList.add('fade-out');
    modal.classList.add('fade-out');
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
        modalContent.classList.remove('fade-out');
        document.body.style.overflow = 'auto';
    }, 400);
}

// Eventos para os botões de navegação
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    redacaoAnterior();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    proximaRedacao();
});

// Fechar modal ao clicar no X
closeBtn.addEventListener('click', fecharModal);

// Fechar modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

// Fechar modal com a tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        fecharModal();
    }
    
    // Navegação com teclado
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            redacaoAnterior();
        } else if (event.key === 'ArrowRight') {
            proximaRedacao();
        }
    }
});

// Botão Voltar ao Topo - COM ANIMAÇÃO SUAVE
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btnTopo.style.display = 'block';
        // Pequeno delay para garantir que o display:block foi aplicado antes da animação
        setTimeout(() => {
            btnTopo.classList.add('show');
        }, 10);
    } else {
        btnTopo.classList.remove('show');
        // Espera a animação terminar antes de esconder completamente
        setTimeout(() => {
            if (!btnTopo.classList.contains('show')) {
                btnTopo.style.display = 'none';
            }
        }, 500);
    }
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navegação suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    criarCardsRedacoes();
    
    // Adicionar classe de carregamento para transições suaves após o carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});