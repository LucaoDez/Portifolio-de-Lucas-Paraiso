// Código compartilhado por todas as páginas.
// Cada bloco só roda se os elementos existirem na página atual.

// ===== Ano atual no rodapé =====
const ano = document.getElementById("ano");
if (ano) {
    ano.textContent = new Date().getFullYear();
}

// ===== Tema claro / escuro (lembrado entre as páginas) =====
const botaoTema = document.getElementById("tema-btn");

function lerTema() {
    try {
        return localStorage.getItem("tema");
    } catch (e) {
        return null;
    }
}

function salvarTema(valor) {
    try {
        localStorage.setItem("tema", valor);
    } catch (e) {
        // localStorage indisponível: o tema só vale para esta página
    }
}

function atualizarBotaoTema() {
    if (!botaoTema) return;
    const escuro = document.body.classList.contains("tema-escuro");
    botaoTema.textContent = escuro ? "🌙 Tema" : "☀️ Tema";
}

if (lerTema() === "escuro") {
    document.body.classList.add("tema-escuro");
}
atualizarBotaoTema();

if (botaoTema) {
    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("tema-escuro");
        salvarTema(document.body.classList.contains("tema-escuro") ? "escuro" : "claro");
        atualizarBotaoTema();
    });
}

// ===== Menu responsivo =====
const botaoMenu = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
        const aberto = menu.classList.toggle("ativo");
        botaoMenu.setAttribute("aria-expanded", aberto);
    });
}

// ===== Botão "Mostrar mais" (página Sobre mim) =====
const botaoMostrar = document.getElementById("mostrar-mais");
const textoExtra = document.getElementById("texto-extra");

if (botaoMostrar && textoExtra) {
    botaoMostrar.addEventListener("click", function () {
        textoExtra.classList.toggle("oculto");
        const visivel = !textoExtra.classList.contains("oculto");
        botaoMostrar.textContent = visivel ? "Mostrar menos" : "Mostrar mais";
        botaoMostrar.setAttribute("aria-expanded", visivel);
    });
}

// ===== Validação do formulário (página Contato) =====
const formulario = document.getElementById("form-contato");

if (formulario) {
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoMensagem = document.getElementById("mensagem");
    const resultado = document.getElementById("resultado-form");
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function mostrarErro(campo, idErro, texto) {
        document.getElementById(idErro).textContent = texto;
        campo.classList.toggle("invalido", texto !== "");
        return texto === "";
    }

    function validarNome() {
        const valor = campoNome.value.trim();
        return mostrarErro(campoNome, "erro-nome",
            valor.length < 3 ? "Digite seu nome (mínimo de 3 caracteres)." : "");
    }

    function validarEmail() {
        const valor = campoEmail.value.trim();
        let texto = "";
        if (valor === "") {
            texto = "Digite seu email.";
        } else if (!padraoEmail.test(valor)) {
            texto = "Digite um email válido, como nome@exemplo.com.";
        }
        return mostrarErro(campoEmail, "erro-email", texto);
    }

    function validarMensagem() {
        const valor = campoMensagem.value.trim();
        return mostrarErro(campoMensagem, "erro-mensagem",
            valor.length < 10 ? "A mensagem precisa ter pelo menos 10 caracteres." : "");
    }

    // Revalida ao sair do campo, para o aluno corrigir na hora
    campoNome.addEventListener("blur", validarNome);
    campoEmail.addEventListener("blur", validarEmail);
    campoMensagem.addEventListener("blur", validarMensagem);

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        resultado.textContent = "";

        // Executa as três validações (sem parar na primeira que falhar)
        const nomeOk = validarNome();
        const emailOk = validarEmail();
        const mensagemOk = validarMensagem();

        if (nomeOk && emailOk && mensagemOk) {
            resultado.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
            formulario.reset();
        }
    });
}