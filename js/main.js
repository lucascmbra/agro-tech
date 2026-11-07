/* AgroTech | Todos Contra a Fome — JavaScript puro */
(function () {
  "use strict";

  /* ---------- Menu hambúrguer ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu-principal");

  if (toggle && nav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  /* ---------- Utilidades de formulário ---------- */
  function showFeedback(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("is-error", !!isError);
    el.classList.remove("is-visible");
    void el.offsetWidth; // reinicia a animação
    el.classList.add("is-visible");
  }

  function setFieldError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    var err = wrap.querySelector(".field-error");
    wrap.classList.toggle("has-error", !!message);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (err) err.textContent = message || "";
  }

  // Validação nativa do HTML5 com mensagens exibidas na tela
  function enableNativeValidation(form) {
    form.addEventListener(
      "invalid",
      function (e) {
        e.preventDefault(); // troca o balão do navegador por texto acessível
        setFieldError(e.target, e.target.validationMessage);
      },
      true
    );
    form.addEventListener("input", function (e) {
      if (e.target.validity && e.target.validity.valid) setFieldError(e.target, "");
    });
    form.addEventListener("change", function (e) {
      if (e.target.validity && e.target.validity.valid) setFieldError(e.target, "");
    });
  }

  function focusFirstInvalid(form) {
    var first = form.querySelector(":invalid");
    if (first) first.focus();
  }

  function escapeText(value) {
    return String(value).replace(/[<>&"]/g, "");
  }

  /* ---------- Planejamento ---------- */
  var formPlan = document.getElementById("form-planejamento");
  if (formPlan) {
    enableNativeValidation(formPlan);
    var planFeedback = document.getElementById("feedback-planejamento");

    formPlan.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formPlan.checkValidity()) {
        focusFirstInvalid(formPlan);
        return;
      }
      var cultura = formPlan.cultura.options[formPlan.cultura.selectedIndex].text;
      var area = Number(formPlan.area.value).toLocaleString("pt-BR");
      var local = escapeText(formPlan.localizacao.value.trim());
      showFeedback(
        planFeedback,
        "Planejamento de demonstração gerado para " + cultura + ", área de " + area +
          " ha, em " + local + ". Esta é apenas uma simulação da interface: " +
          "não há análise agronômica real. Procure orientação técnica antes de decidir o manejo."
      );
    });
  }

  /* ---------- Monitoramento: registrar observações ---------- */
  var formObs = document.getElementById("form-observacoes");
  if (formObs) {
    var obsField = document.getElementById("observacao");
    var obsFeedback = document.getElementById("feedback-observacoes");
    var obsList = document.getElementById("lista-observacoes");

    formObs.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = obsField.value.trim();
      if (!text) {
        setFieldError(obsField, "Escreva uma observação antes de registrar.");
        showFeedback(obsFeedback, "Não foi possível registrar: o campo está vazio.", true);
        obsField.focus();
        return;
      }
      setFieldError(obsField, "");

      var li = document.createElement("li");
      var time = document.createElement("time");
      var now = new Date();
      time.dateTime = now.toISOString();
      time.textContent = now.toLocaleString("pt-BR");
      li.appendChild(time);
      li.appendChild(document.createTextNode(text)); // textContent seguro
      obsList.prepend(li);

      obsField.value = "";
      showFeedback(
        obsFeedback,
        "Observação registrada com sucesso! (Demonstração: o registro fica apenas nesta página e é perdido ao recarregar.)"
      );
    });

    obsField.addEventListener("input", function () {
      if (obsField.value.trim()) setFieldError(obsField, "");
    });
  }

  /* ---------- IA: exemplos de recomendações ---------- */
  var btnAnalise = document.getElementById("btn-nova-analise");
  if (btnAnalise) {
    var examples = [
      {
        level: "",
        title: "Sua plantação está saudável!",
        text: "Continue monitorando as condições para manter uma boa produção.",
        tips: ["Mantenha a umidade do solo adequada.", "Fique atento a possíveis pragas."]
      },
      {
        level: "is-warn",
        title: "Atenção à umidade do solo",
        text: "Exemplo: a umidade parece abaixo do ideal. Verifique a necessidade de irrigação.",
        tips: ["Observe o solo no início da manhã.", "Use a água de forma consciente, sem desperdício."]
      },
      {
        level: "is-alert",
        title: "Observe sinais de pragas",
        text: "Exemplo: folhas com manchas podem merecer uma inspeção mais atenta.",
        tips: ["Inspecione as folhas com frequência.", "Registre o que observar e busque apoio técnico local."]
      }
    ];
    var current = 0;
    var card = document.getElementById("status-card");
    var cardTitle = document.getElementById("status-titulo");
    var cardText = document.getElementById("status-texto");
    var tipsList = document.getElementById("lista-dicas");
    var live = document.getElementById("feedback-analise");

    btnAnalise.addEventListener("click", function () {
      current = (current + 1) % examples.length;
      var ex = examples[current];
      card.className = "status-card " + ex.level;
      cardTitle.textContent = ex.title;
      cardText.textContent = ex.text;
      tipsList.innerHTML = "";
      ex.tips.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        tipsList.appendChild(li);
      });
      showFeedback(live, "Exemplo " + (current + 1) + " de " + examples.length + " exibido (demonstração, sem análise real).");
    });
  }

  /* ---------- Contato ---------- */
  var formContato = document.getElementById("form-contato");
  if (formContato) {
    enableNativeValidation(formContato);
    var contatoFeedback = document.getElementById("feedback-contato");

    formContato.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formContato.checkValidity()) {
        showFeedback(contatoFeedback, "Revise os campos destacados antes de enviar.", true);
        focusFirstInvalid(formContato);
        return;
      }
      var nome = escapeText(formContato.nome.value.trim().split(" ")[0]);
      showFeedback(
        contatoFeedback,
        "Obrigado, " + nome + "! Envio simulado: este protótipo não está integrado a nenhum serviço de mensagens, então nada foi enviado."
      );
      formContato.reset();
    });
  }

  /* ---------- Pitch Vídeo: placeholder se o arquivo não existir ---------- */
  var videoBox = document.querySelector(".video-box");
  if (videoBox) {
    var video = videoBox.querySelector("video");
    var source = video.querySelector("source");
    var markMissing = function () {
      videoBox.classList.add("is-missing");
      video.removeAttribute("controls");
    };
    if (source) source.addEventListener("error", markMissing);
    video.addEventListener("error", markMissing);
  }
})();
