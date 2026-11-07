let botaoMenu = document.querySelector(".menu-toggle");
let menu = document.getElementById("menu-principal");

if (botaoMenu && menu) {
    function abrirMenu(aberto) {
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        menu.classList.toggle("is-open", aberto);
    }
    botaoMenu.addEventListener("click", function () {
        abrirMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && menu.classList.contains("is-open")) {
            abrirMenu(false);
            botaoMenu.focus();
        }
    });
    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            abrirMenu(false);
        }
    });
}

function mostrarMensagem(elemento, mensagem, erro) {
    if (!elemento) {
        return;
    }
    elemento.textContent = mensagem;
    elemento.classList.toggle("is-error", !!erro);
    elemento.classList.remove("is-visible");
    void elemento.offsetWidth;
    elemento.classList.add("is-visible");
}

function mostrarErro(campo, mensagem) {
    let grupo = campo.closest(".field");
    if (!grupo) {
        return;
    }
    let aviso = grupo.querySelector(".field-error");
    grupo.classList.toggle("has-error", !!mensagem);
    campo.setAttribute("aria-invalid", mensagem ? "true" : "false");
    if (aviso) {
        aviso.textContent = mensagem || "";
    }
}

function validarFormulario(formulario) {
    formulario.addEventListener(
        "invalid",
        function (evento) {
            evento.preventDefault();
            mostrarErro(evento.target, evento.target.validationMessage);
        },
        true
    );
    formulario.addEventListener("input", function (evento) {
        if (evento.target.validity && evento.target.validity.valid) {
            mostrarErro(evento.target, "");
        }
    });
    formulario.addEventListener("change", function (evento) {
        if (evento.target.validity && evento.target.validity.valid) {
            mostrarErro(evento.target, "");
        }
    });
}

function focarCampoInvalido(formulario) {
    let primeiroCampo = formulario.querySelector(":invalid");
    if (primeiroCampo) {
        primeiroCampo.focus();
    }
}

function limparTexto(valor) {
    return String(valor).replace(/[<>&"]/g, "");
}

let formPlanejamento = document.getElementById("form-planejamento");
if (formPlanejamento) {
    validarFormulario(formPlanejamento);
    let mensagemPlanejamento = document.getElementById("feedback-planejamento");

    formPlanejamento.addEventListener("submit", function (evento) {
        evento.preventDefault();
        if (!formPlanejamento.checkValidity()) {
            focarCampoInvalido(formPlanejamento);
            return;
        }
        let cultura = formPlanejamento.cultura.options[formPlanejamento.cultura.selectedIndex].text;
        let area = Number(formPlanejamento.area.value).toLocaleString("pt-BR");
        let localizacao = limparTexto(formPlanejamento.localizacao.value.trim());
        mostrarMensagem(
            mensagemPlanejamento,
            "Planejamento gerado para " + cultura + ", área de " + area +
                " ha, em " + localizacao + "."
        );
    });
}

let formObservacoes = document.getElementById("form-observacoes");
if (formObservacoes) {
    let campoObservacao = document.getElementById("observacao");
    let mensagemObservacoes = document.getElementById("feedback-observacoes");
    let listaObservacoes = document.getElementById("lista-observacoes");

    formObservacoes.addEventListener("submit", function (evento) {
        evento.preventDefault();
        let texto = campoObservacao.value.trim();
        if (!texto) {
            mostrarErro(campoObservacao, "Escreva uma observação antes de registrar.");
            mostrarMensagem(mensagemObservacoes, "Não foi possível registrar: o campo está vazio.", true);
            campoObservacao.focus();
            return;
        }
        mostrarErro(campoObservacao, "");

        let item = document.createElement("li");
        let horario = document.createElement("time");
        let agora = new Date();
        horario.dateTime = agora.toISOString();
        horario.textContent = agora.toLocaleString("pt-BR");
        item.appendChild(horario);
        item.appendChild(document.createTextNode(texto));
        listaObservacoes.prepend(item);

        campoObservacao.value = "";
        mostrarMensagem(
            mensagemObservacoes,
            "Observação registrada! Disponível até recarregar a página."
        );
    });

    campoObservacao.addEventListener("input", function () {
        if (campoObservacao.value.trim()) {
            mostrarErro(campoObservacao, "");
        }
    });
}

let botaoAnalise = document.getElementById("btn-nova-analise");
if (botaoAnalise) {
    let exemplos = [
        {
            classe: "",
            titulo: "Sua plantação está saudável!",
            texto: "Continue monitorando as condições para manter uma boa produção.",
            dicas: ["Mantenha a umidade do solo adequada.", "Fique atento a possíveis pragas."]
        },
        {
            classe: "is-warn",
            titulo: "Atenção à umidade do solo",
            texto: "A umidade parece abaixo do ideal. Verifique a necessidade de irrigação.",
            dicas: ["Observe o solo no início da manhã.", "Use a água de forma consciente, sem desperdício."]
        },
        {
            classe: "is-alert",
            titulo: "Observe sinais de pragas",
            texto: "Folhas com manchas podem merecer uma inspeção mais atenta.",
            dicas: ["Inspecione as folhas com frequência.", "Registre o que observar e busque apoio técnico local."]
        }
    ];
    let indice = 0;
    let cartao = document.getElementById("status-card");
    let tituloCartao = document.getElementById("status-titulo");
    let textoCartao = document.getElementById("status-texto");
    let listaDicas = document.getElementById("lista-dicas");
    let mensagemAnalise = document.getElementById("feedback-analise");

    botaoAnalise.addEventListener("click", function () {
        indice = (indice + 1) % exemplos.length;
        let exemplo = exemplos[indice];
        cartao.className = "status-card " + exemplo.classe;
        tituloCartao.textContent = exemplo.titulo;
        textoCartao.textContent = exemplo.texto;
        listaDicas.innerHTML = "";
        exemplo.dicas.forEach(function (dica) {
            let item = document.createElement("li");
            item.textContent = dica;
            listaDicas.appendChild(item);
        });
        mostrarMensagem(mensagemAnalise, "Recomendações atualizadas.");
    });
}

let formContato = document.getElementById("form-contato");
if (formContato) {
    validarFormulario(formContato);
    let mensagemContato = document.getElementById("feedback-contato");

    formContato.addEventListener("submit", function (evento) {
        evento.preventDefault();
        if (!formContato.checkValidity()) {
            mostrarMensagem(mensagemContato, "Revise os campos destacados antes de enviar.", true);
            focarCampoInvalido(formContato);
            return;
        }
        let nome = limparTexto(formContato.nome.value.trim().split(" ")[0]);
        mostrarMensagem(
            mensagemContato,
            "Obrigado, " + nome + "! Demonstração concluída. Nenhuma mensagem foi enviada."
        );
        formContato.reset();
    });
}

let caixaVideo = document.querySelector(".video-box");
if (caixaVideo) {
    let video = caixaVideo.querySelector(".video-player");
    let capa = caixaVideo.querySelector(".video-cover");
    capa.addEventListener("click", function () {
        if (window.location.protocol !== "http:" && window.location.protocol !== "https:") {
            window.open("https://www.youtube.com/watch?v=QftPNP8WEoM", "_blank", "noopener,noreferrer");
            return;
        }
        let urlVideo = new URL(video.getAttribute("data-src"));
        urlVideo.searchParams.set("origin", window.location.origin);
        video.src = urlVideo.toString();
        video.removeAttribute("tabindex");
        caixaVideo.classList.add("is-playing");
        video.focus();
    });
}
