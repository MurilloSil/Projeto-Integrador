const dicaForm = document.getElementById('dica-form');
const dicaInput = document.getElementById('dica-text');
const listaDicas = document.getElementById('lista-dicas');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

let contadorMaes = 1;
const comentarios = {};

function gerarNomeMae() {
    const nomeMae = `Mãe(${contadorMaes})`;
    contadorMaes++;
    return nomeMae;
}

function addDicaToList(dicaText) {
    console.log("Adicionando dica:", dicaText);
    const li = document.createElement('li');
    li.textContent = dicaText;

    const nomeMae = document.createElement('span');
    nomeMae.textContent = ` - ${gerarNomeMae()}`;
    li.appendChild(nomeMae);

    const comentarioInput = document.createElement('input');
    comentarioInput.type = 'text';
    comentarioInput.className = 'comentario-input';
    comentarioInput.placeholder = 'Deixe seu comentário...';

    const comentarioBtn = document.createElement('button');
    comentarioBtn.className = 'comentario-btn';
    comentarioBtn.textContent = 'Comentar';

    const comentariosLista = document.createElement('ul');

    comentarioBtn.addEventListener('click', function() {
        const comentario = comentarioInput.value.trim();
        if (comentario !== '') {
            addComentarioToList(dicaText, comentario, comentariosLista);
            comentarioInput.value = '';
        } else {
            alert('Por favor, insira um comentário válido.');
        }
    });

    li.appendChild(document.createElement('br'));
    li.appendChild(comentarioInput);
    li.appendChild(comentarioBtn);
    li.appendChild(comentariosLista);

    listaDicas.appendChild(li);

    // Inicializa a lista de comentários para esta dica
    comentarios[dicaText] = [];
}

function addComentarioToList(dicaText, comentarioText, comentariosLista) {
    const comentario = document.createElement('li');
    comentario.textContent = `${gerarNomeMae()}: ${comentarioText}`;
    
    // Adiciona o comentário à lista de comentários associados à dica
    comentarios[dicaText].push(comentario.textContent);
    
    // Adiciona o comentário à lista de comentários da dica
    comentariosLista.appendChild(comentario);
}

function searchDicas(term) {
    const dicas = listaDicas.getElementsByTagName('li');
    Array.from(dicas).forEach((dica) => {
        const text = dica.textContent.toLowerCase();
        dica.style.display = text.includes(term) ? 'block' : 'none';
    });

    const dicasVisiveis = Array.from(dicas).filter((dica) => dica.style.display !== 'none');
    if (dicasVisiveis.length === 0) {
        alert('Desculpe, dica não encontrada.');
    }
}

function showAllDicas() {
    const dicas = listaDicas.getElementsByTagName('li');
    Array.from(dicas).forEach((dica) => {
        dica.style.display = 'block';
    });
}

// Função para limpar todas as dicas
function limparDicas() {
    listaDicas.innerHTML = ''; // Remove todos os elementos filhos da lista de dicas
    localStorage.removeItem('dicas'); // Remove as dicas do armazenamento local
}

// Para salvar as dicas
function saveDicasToStorage() {
    const dicasArray = Array.from(listaDicas.getElementsByTagName('li')).map(li => li.textContent.trim());
    localStorage.setItem('dicas', JSON.stringify(dicasArray));
}

// Para recuperar as dicas
function loadDicasFromStorage() {
    const dicasArray = JSON.parse(localStorage.getItem('dicas')) || [];
    dicasArray.forEach(dica => {
        addDicaToList(dica);
    });
}

dicaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dicaText = dicaInput.value.trim();
    if (dicaText !== '') {
        addDicaToList(dicaText);
        dicaInput.value = '';
        saveDicasToStorage();
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== '') {
        searchDicas(searchTerm);
    } else {
        showAllDicas();
    }
});

// Carregar as dicas ao carregar a página
loadDicasFromStorage();

function addDicaToList(dicaText) {
    console.log("Adicionando dica:", dicaText);
    const li = document.createElement('li');
    li.textContent = dicaText;
    listaDicas.appendChild(li);
}

function searchDicas(term) {
    const dicas = listaDicas.getElementsByTagName('li');
    const dicasVisiveis = Array.from(dicas).filter((dica) => {
        const text = dica.textContent.toLowerCase();
        const isVisible = text.includes(term);
        dica.style.display = isVisible ? 'block' : 'none';
        return isVisible;
    });

    if (term === '') {
        showAllDicas(); // Mostra todas as dicas se nenhum termo de busca foi digitado
        return;
    }

    if (dicasVisiveis.length === 0) {
        const dicasDiretas = document.querySelectorAll('.dica-postada-diretamente p');
        Array.from(dicasDiretas).forEach((dica) => {
            const text = dica.textContent.toLowerCase();
            const dicaContainer = dica.closest('.dica-postada-diretamente');
            const isVisible = text.includes(term);
            dicaContainer.style.display = isVisible ? 'block' : 'none';
            if (isVisible) {
                dicasVisiveis.push(dicaContainer);
            }
        });

        if (dicasVisiveis.length === 0) {
            alert('Desculpe, dica não encontrada.');
            location.reload(); // Recarrega a página para mostrar todas as dicas novamente
        }
    }
}





// Função para limpar todas as dicas
function limparDicas() {
    listaDicas.innerHTML = ''; // Remove todos os elementos filhos da lista de dicas
    localStorage.removeItem('dicas'); // Remove as dicas do armazenamento local
}

// Para salvar as dicas
function saveDicasToStorage() {
    const dicasArray = Array.from(listaDicas.getElementsByTagName('li')).map(li => li.textContent.trim());
    localStorage.setItem('dicas', JSON.stringify(dicasArray));
}

// Para recuperar as dicas
function loadDicasFromStorage() {
    const dicasArray = JSON.parse(localStorage.getItem('dicas')) || [];
    dicasArray.forEach(dica => {
        addDicaToList(dica);
    });
}

dicaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dicaText = dicaInput.value.trim();
    if (dicaText !== '') {
        addDicaToList(dicaText);
        dicaInput.value = '';
        saveDicasToStorage();
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== '') {
        searchDicas(searchTerm);
        searchDicasDiretamente(searchTerm); // Adiciona esta linha para buscar também nas dicas postadas diretamente
    } else {
        showAllDicas();
    }
});

// Carregar as dicas ao carregar a página
loadDicasFromStorage();

// Função para redirecionar para a página de vídeos
function redirectToVideosPage() {
    window.location.href = "file:///C:/Users/GEORGE%20AUREO/OneDrive/%C3%81rea%20de%20Trabalho/mae%20solida/pagina%20segundaria.html";
}

// Vincula a função ao evento de clique do botão
document.getElementById("btnDicas").addEventListener("click", redirectToVideosPage);