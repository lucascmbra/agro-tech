# AgroTech | Todos Contra a Fome

Protótipo navegável da **Fase 3** (Engenharia de Software — FIAP, 1ESOR 2026): uma plataforma de apoio à agricultura familiar e aos pequenos produtores rurais, alinhada à **ODS 2 — Fome Zero e Agricultura Sustentável (Meta 2.4)**.

## Descrição

Segundo o Censo Agropecuário 2017 (IBGE), a agricultura familiar responde por cerca de 77% dos estabelecimentos agropecuários do país, mas poucos receberam orientação técnica. O AgroTech propõe uma tecnologia simples que aproxima informação de quem produz, em três etapas: **planejamento**, **monitoramento** e **recomendações compreensíveis**. Este site é a interface prototipada dessa proposta (Entregas 1 e 2).

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, Grid, media queries, variáveis CSS)
- JavaScript puro (Vanilla JS)
- Ícones e ilustrações em SVG (sem bibliotecas, sem frameworks, sem backend)

## Como executar

1. Baixe/clone a pasta `agrotech/`.
2. Abra `index.html` no navegador (duplo clique) **ou** sirva a pasta com qualquer servidor estático, por exemplo:
   ```bash
   cd agrotech
   python3 -m http.server 8000
   # acesse http://localhost:8000
   ```
3. **GitHub Pages:** envie a pasta para um repositório e ative Pages na branch desejada. Todos os caminhos são relativos e funcionam em hospedagem estática.

### Pitch Vídeo

A Home já contém o player HTML5. Coloque o vídeo em `assets/videos/pitch.mp4` e ele será exibido. Enquanto o arquivo não existir, aparece um aviso de espaço reservado (nenhum vídeo foi inventado).

### Imagens

As imagens de `assets/images/` são ilustrações SVG autorais, usadas no lugar de fotografias. Para usar fotos reais, substitua `plantacao.svg` e `muda.svg` por imagens de licença livre (ajustando o `src` e o `alt` nos HTMLs).

## Estrutura

```text
agrotech/
├── index.html           Início (hero, 3 cards, Pitch Vídeo)
├── planejamento.html    Planejamento do Cultivo (formulário)
├── monitoramento.html   Monitoramento da Plantação (indicadores + observações)
├── ia.html              Recomendações Inteligentes (exemplos)
├── contato.html         Fale Conosco (formulário com validação HTML5)
├── css/styles.css
├── js/main.js
├── assets/{images,icons,videos}/
└── README.md
```

## Páginas

| Página | Conteúdo |
| --- | --- |
| Início | Título, texto, botão para Planejamento, cards que levam às demais páginas, Pitch Vídeo |
| Planejamento | Cultura, área (ha) e localização com `required`, `min`, `max`; mensagem demonstrativa |
| Monitoramento | Umidade 72%, temperatura 24 °C, luminosidade 85% (fictícios); registro de observações com validação |
| IA | Card de status e dicas; "Nova Análise" alterna entre exemplos pré-definidos |
| Contato | Nome, e-mail, assunto (`select`), mensagem; `required`, `minlength`, `maxlength`, `type="email"` |

## Acessibilidade e responsividade

Menu hambúrguer funcional no mobile (fecha com `Esc`), link "pular para o conteúdo", foco visível, labels associados, um `h1` por página, página ativa com `aria-current="page"`, mensagens em regiões `aria-live` e respeito a `prefers-reduced-motion`.

## Limitações do protótipo

- Não há backend, autenticação, banco de dados, APIs, IA real nem integração com sensores.
- Indicadores do Monitoramento são **dados fictícios** fixos.
- O "planejamento" e as "recomendações" são **simulações de interface**, não análises agronômicas.
- Observações registradas ficam apenas na página e somem ao recarregar.
- O formulário de contato **não envia** mensagens: o envio é simulado.
- O Pitch Vídeo depende de o arquivo `assets/videos/pitch.mp4` ser adicionado.
