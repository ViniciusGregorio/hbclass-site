# High Business Class

Homepage de transporte executivo, com apresentação dos serviços, frota, galerias e pré-agendamento pelo WhatsApp. O código do site está em `versoes/evolucao/`.

## Visualizar localmente

É necessário Python 3.10 ou mais recente para os comandos de manutenção.

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000/versoes/evolucao/`.

## Atualizar o conteúdo

Os contatos e endereços públicos ficam em `versoes/evolucao/config.js`. As opções do pré-agendamento ficam em `booking-config.js`; as informações preenchidas são revisadas pelo visitante antes de seguir ao WhatsApp.

Para as galerias, adicione somente imagens finais em WebP, AVIF ou PNG nas pastas de `versoes/evolucao/assets/galerias/`. Use nomes simples, como `01-recepcao.webp`, e execute:

```sh
python3 scripts/update-galleries.py
```

Revise as descrições em português e inglês no arquivo `media-config.js`. A extensão deve corresponder ao formato real da imagem. Arquivos recebidos do WhatsApp, originais de edição e documentos de trabalho devem ficar fora das pastas públicas.

As fontes locais em `assets/fonts/` acompanham suas licenças OFL. Preserve esses arquivos ao atualizar o site.

## Capacidades da frota

Os cartões usam configurações de referência pesquisadas em 23/11/2026. Passageiros são lugares além do motorista. Ano, versão e configuração do veículo efetivamente disponibilizado devem ser confirmados no atendimento; o Commander também possui versões de cinco lugares. Os seletores dos SUVs representam as versões de sete lugares, com terceira fileira em uso ou rebatida, atualizando passageiros e bagagem juntos.

A quantidade de malas é uma **estimativa volumétrica do site solicitada pelo responsável**, e não uma contagem certificada pelo fabricante ou um teste físico de encaixe. O seletor compara malas de um tamanho por vez, sem somar pequenas, médias e grandes. Valores iniciais: malas médias e terceira fileira em uso nos SUVs.

| Referência | Passageiros | Porta-malas | Pequenas ≈ | Médias ≈ | Grandes ≈ |
|---|---:|---:|---:|---:|---:|
| Mercedes-Benz E 300 sedã | 4 | 540 L | 6 | 3 | 2 |
| Toyota Corolla sedã, ficha 2026 | 4 | 470 L | 5 | 3 | 2 |
| Commander, sete lugares, terceira fileira em uso | 6 | 233 L | 2 | 1 | 1 |
| Commander, terceira fileira rebatida | 4 | 661 L | 7 | 4 | 3 |
| Volvo XC90 T8 2026, terceira fileira em uso | 6 | 244 L | 2 | 1 | 1 |
| Volvo XC90 T8 2026, terceira fileira rebatida | 4 | 650 L | 7 | 4 | 3 |

O cálculo usa as dimensões de referência sem expansão: pequena 55 × 40 × 23 cm (50,6 L externos teóricos), média 68 × 45 × 28 cm (85,68 L) e grande 75 × 51 × 32 cm (122,4 L). A fórmula é `floor(porta-malas em litros × 0,60 / volume externo da mala em litros)`. A fração de 60% é uma hipótese própria para reservar espaço não aproveitado; não é fator validado pelo fabricante. Abertura, formato do compartimento e das malas, equipamentos e peso podem alterar o resultado. O volume externo calculado não corresponde à capacidade interna de roupas anunciada pelo fabricante da mala.

Dados e lógica ficam em `fleet-capacity.js`; os valores iniciais sem JavaScript estão no HTML e devem acompanhar qualquer alteração dos dados. Aparência e controles ficam em `fleet-capacity.css`. Esses seletores não adicionam campos ao planejamento, não alteram o veículo selecionado no formulário e não enviam o conteúdo das escolhas a serviços externos.

Fontes dos veículos: [Mercedes-Benz E 300 sedã](https://www2.mercedes-benz.com.br/passengercars/models/saloon/e-class/overview.html), [Toyota Brasil, Corolla 2026](https://media.toyota.com.br/18601352-66bd-4d30-865c-c0b0344be76f.pdf), [Toyota Corolla Sedan, lugares](https://www.toyota.pt/carros/corolla-sedan/configurador?financeOption=cash), [Jeep Commander, versões e ocupação](https://www.media.stellantis.com/br-pt/jeep/press/novo-jeep-commander-2025-chega-com-novo-motor-hurricane-2-0-turbo-de-272-cv-tecnologias-de-conducao-semiautonoma-de-nivel-2-em-todas-as-versoes-e-garantia-de-5-anos), [Volvo XC90, especificações](https://www.volvocars.com/br/cars/xc90-hybrid/specifications/).

Referências das dimensões: [Samsonite BOSS pequena](https://samsonite.com.br/products/mala-pequena-boss-samsonite-graphite-monogram), [Samsonite Odyssey média](https://samsonite.com.br/products/mala-media-odyssey-preta), [Samsonite Magnum Eco grande](https://samsonite.com.br/products/mala-grande-magnum-eco-graphite).

## Planejamento e privacidade

O planejamento pede nome para o atendimento, serviço, origem, destino, data, horário e veículo de preferência. Os sete dados são revisados no navegador antes de abrir o WhatsApp. A revisão também permite conferir o texto exato da mensagem. O pedido solicita orçamento, disponibilidade e condições; a reserva depende da confirmação do atendimento e não há cálculo automático de preços. O link aberto nesse serviço inclui o resumo; a mensagem chega à HBC depois que o visitante confirma o envio no WhatsApp. O formulário não salva o trajeto em cookies, armazenamento local ou banco de dados próprio.

A página `privacidade.html` apresenta a política em português e inglês. O rodapé e o formulário dão acesso à política; as preferências podem ser reabertas pelo rodapé. A identificação pública, o contato, a versão da política e os controles de estatísticas ficam em `privacy-config.js`. A razão social deve ser preenchida em `controllerLegalName` quando confirmada pelo responsável. Atualize a política e `policyVersion` quando houver mudança relevante de finalidade ou tratamento.

## Preparar o Google Analytics 4

A integração é entregue desativada. Sem ID, ativação e revisão da configuração, nenhuma tag do Google é carregada. Depois da ativação, o visitante recebe opções equivalentes para aceitar ou rejeitar estatísticas. A recusa mantém todo o atendimento disponível. A revogação bloqueia a ferramenta, remove cookies acessíveis e recarrega a página.

1. Acesse [Google Analytics](https://analytics.google.com/) com uma conta controlada pela empresa. Em **Administrador → Criar → Conta**, crie a conta High Business Class e revise as opções de compartilhamento. O responsável pela empresa deve manter acesso administrativo.
2. Crie uma propriedade **High Business Class**, com fuso de **São Paulo** e moeda **BRL**. Preencha as informações e os objetivos correspondentes à empresa e confira os termos exibidos pelo Google.
3. Em **Fluxos de dados → Adicionar fluxo → Web**, informe o endereço publicado do site e um nome para o fluxo. O endereço pode ser atualizado quando o domínio passar a apontar para o novo site.
4. **Desative toda a Medição otimizada** no fluxo Web antes de ativar esta integração. Revise também a detecção automática de eventos/configurações da tag, mantendo desativadas coletas adicionais de formulários, links externos, pesquisas, histórico e dados fornecidos pelo usuário. Preserve Google Signals e recursos de publicidade desativados; revise retenção, compartilhamento e condições de transferência internacional na conta. `send_page_view: false`, sozinho, não desativa as medições configuradas no painel.
5. Copie o **ID de medição**, que começa com `G-`. O código da tag já está integrado ao site; basta informar esse ID em `analytics.measurementId`, no arquivo `privacy-config.js`. Depois da revisão da etapa anterior e da política, altere `analytics.enabled` e `analytics.setupReviewed` para `true`.
6. Prepare e publique pelo fluxo manual do repositório. Em uma janela sem preferências anteriores, confirme a ausência de conexões ao Google antes de escolher, aceite as estatísticas e confira o relatório **Tempo real** do GA4. Teste também rejeitar e revogar pelo rodapé. Extensões de bloqueio podem impedir a medição mesmo com autorização.

As únicas interações encaminhadas por esta integração são categorias de ação, serviço e posição na página. A revisão do planejamento e a continuação para o WhatsApp usam eventos próprios; o nome, a origem, o destino, a data, o horário, o veículo de preferência, a mensagem e o URL completo do WhatsApp ficam fora deles. URLs enviadas ao Analytics não incluem parâmetros, fragmentos ou o endereço de origem da visita. A medição automática deve continuar desativada no painel para preservar esse comportamento.

Documentação de referência: [configuração do GA4](https://support.google.com/analytics/answer/14183469?hl=pt-BR), [Medição otimizada](https://support.google.com/analytics/answer/9216061?hl=pt-BR), [consentimento básico do Google](https://developers.google.com/tag-platform/security/concepts/consent-mode), [orientações da ANPD sobre cookies](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-emite-recomendacoes-para-adequacao-da-pratica-de-coleta-de-cookies-do-portal-gov.br).

## Conferir e preparar a publicação

```sh
python3 scripts/check-public.py
python3 scripts/build-release.py --version evolucao --output dist
python3 -m http.server 8001 --directory dist
```

Abra `http://localhost:8001/` e confira navegação, imagens, idiomas e pré-agendamento. A pasta `dist/` contém os arquivos para hospedagem; os comandos de preparação não publicam o site nem alteram DNS.

O verificador confere a lista de arquivos, formatos de mídia e padrões comuns de credenciais. Ele não substitui a revisão das informações publicadas. Qualquer conteúdo enviado ao repositório público poderá ser consultado por terceiros. As configurações JavaScript também são públicas: não inclua senhas, tokens ou chaves privadas.

## GitHub Pages

Em **Settings → Pages**, selecione **GitHub Actions** como origem. Para publicar, abra **Actions → Publicar v2 no GitHub Pages → Run workflow**. O fluxo é manual: verifica o conteúdo público, prepara `dist/` e envia somente essa pasta.

Para usar `hbclass.com.br`, configure o domínio em **Settings → Pages → Custom domain** antes de alterar o apontamento DNS. O arquivo `CNAME` da pasta preparada serve a publicações por branch; no fluxo Actions, a configuração do domínio é feita nas opções do repositório. Após a validação do domínio e do certificado, ative **Enforce HTTPS**.

## Arquivos permitidos no repositório

O `.gitignore` mantém uma lista restrita: esta documentação pública, workflow, ferramentas de publicação e arquivos finais da homepage. A regra é conferida por `scripts/public_policy.py` durante a verificação e o preparo da publicação.

Documentos comerciais, materiais de trabalho, capturas de revisão e pacotes locais ficam fora do repositório. O `.gitignore` atua sobre arquivos ainda não rastreados: ele não retira arquivos já versionados nem apaga versões anteriores do histórico.
