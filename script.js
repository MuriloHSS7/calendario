const aniversarios = {};

function adicionarAniversario() {
    const nome = document.getElementById('nome').value.trim();
    const data = document.getElementById('data').value.trim();

    if (!nome || !data) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validarData(data)) {
        alert('Por favor, insira uma data válida no formato YYYY-MM-DD.');
        return;
    }

    const dataFormatada = new Date(data);
    const mesAniversario = dataFormatada.getMonth();
    const mes = nomeDoMes(mesAniversario);

    if (!aniversarios[mes]) {
        aniversarios[mes] = [];
    }

    const novoAniversario = { nome, data: dataFormatada.toLocaleDateString('pt-BR') };
    aniversarios[mes].push(novoAniversario);

    exibirAniversarios();
    limparCampos();
}

function exibirAniversarios() {
    const mesesContainer = document.getElementById('meses');
    mesesContainer.innerHTML = '';

    for (const mes in aniversarios) {
        const divMes = document.createElement('div');
        divMes.classList.add('mes');
        divMes.innerHTML = `<h2>${mes}</h2><ul id="${mes}"></ul>`;
        mesesContainer.appendChild(divMes);

        const ulAniversarios = document.getElementById(mes);
        aniversarios[mes].forEach(aniversario => {
            const listItem = document.createElement('li');
            listItem.textContent = `${aniversario.nome}: ${aniversario.data}`;
            ulAniversarios.appendChild(listItem);
        });
    }
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('data').value = '';
}

function validarData(dateString) {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
    return regexDate.test(dateString) && !isNaN(Date.parse(dateString));
}

function nomeDoMes(mes) {
    const mesesDoAno = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return mesesDoAno[mes];
}