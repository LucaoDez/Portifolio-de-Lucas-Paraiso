// -------------------------
// Ano atual
// -------------------------

const ano = document.getElementById("ano");

ano.textContent = new Date().getFullYear();


// -------------------------
// Mostrar mais
// -------------------------

const botaoMostrar = document.getElementById("mostrar-mais");

const textoExtra = document.getElementById("texto-extra");

botaoMostrar.addEventListener("click", function () {
    textoExtra.classList.toggle("oculto");
    if (textoExtra.classList.contains("oculto")) {
        botaoMostrar.textContent = "Mostrar mais";
    } else {
        botaoMostrar.textContent = "Mostrar menos";
    }

});


// -------------------------
// Tema claro / escuro
// -------------------------

const botaoTema = document.getElementById("tema-btn");

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("tema-escuro");

});


// -------------------------
// Menu responsivo
// -------------------------

const botaoMenu = document.getElementById("menu-btn");

const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {

    menu.classList.toggle("ativo");

});


// -------------------------
// Validação do formulário
// -------------------------

const formulario =
    document.getElementById("form-contato");

const erro =
    document.getElementById("erro-form");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const mensagem =
        document.getElementById("mensagem").value.trim();


    if (
        nome === "" ||
        email === "" ||
        mensagem === ""
    ) {

        erro.textContent =
            "Preencha todos os campos.";

        return;

    }


    if (!email.includes("@")) {

        erro.textContent =
            "Digite um email válido.";

        return;

    }


    erro.textContent =
        "Mensagem enviada com sucesso!";

    formulario.reset();

});