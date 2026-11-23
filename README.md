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

## Planejamento e privacidade

O planejamento pede apenas serviço, origem, destino, data, horário e veículo de preferência. Os seis dados são revisados no navegador antes de abrir o WhatsApp. O link aberto nesse serviço inclui o resumo; a mensagem chega à HBC depois que o visitante confirma o envio no WhatsApp. O formulário não salva o trajeto em cookies, armazenamento local ou banco de dados próprio.

A página `privacidade.html` apresenta a política em português e inglês. O rodapé e o formulário dão acesso à política; as preferências podem ser reabertas pelo rodapé. A identificação pública, o contato, a versão da política e os controles de estatísticas ficam em `privacy-config.js`. A razão social deve ser preenchida em `controllerLegalName` quando confirmada pelo responsável. Atualize a política e `policyVersion` quando houver mudança relevante de finalidade ou tratamento.

## Preparar o Google Analytics 4

A integração é entregue desativada. Sem ID, ativação e revisão da configuração, nenhuma tag do Google é carregada. Depois da ativação, o visitante recebe opções equivalentes para aceitar ou rejeitar estatísticas. A recusa mantém todo o atendimento disponível. A revogação bloqueia a ferramenta, remove cookies acessíveis e recarrega a página.

1. Acesse [Google Analytics](https://analytics.google.com/) com uma conta controlada pela empresa. Em **Administrador → Criar → Conta**, crie a conta High Business Class e revise as opções de compartilhamento. O responsável pela empresa deve manter acesso administrativo.
2. Crie uma propriedade **High Business Class**, com fuso de **São Paulo** e moeda **BRL**. Preencha as informações e os objetivos correspondentes à empresa e confira os termos exibidos pelo Google.
3. Em **Fluxos de dados → Adicionar fluxo → Web**, informe o endereço publicado do site e um nome para o fluxo. O endereço pode ser atualizado quando o domínio passar a apontar para o novo site.
4. **Desative toda a Medição otimizada** no fluxo Web antes de ativar esta integração. Revise também a detecção automática de eventos/configurações da tag, mantendo desativadas coletas adicionais de formulários, links externos, pesquisas, histórico e dados fornecidos pelo usuário. Preserve Google Signals e recursos de publicidade desativados; revise retenção, compartilhamento e condições de transferência internacional na conta. `send_page_view: false`, sozinho, não desativa as medições configuradas no painel.
5. Copie o **ID de medição**, que começa com `G-`. O código da tag já está integrado ao site; basta informar esse ID em `analytics.measurementId`, no arquivo `privacy-config.js`. Depois da revisão da etapa anterior e da política, altere `analytics.enabled` e `analytics.setupReviewed` para `true`.
6. Prepare e publique pelo fluxo manual do repositório. Em uma janela sem preferências anteriores, confirme a ausência de conexões ao Google antes de escolher, aceite as estatísticas e confira o relatório **Tempo real** do GA4. Teste também rejeitar e revogar pelo rodapé. Extensões de bloqueio podem impedir a medição mesmo com autorização.

As únicas interações encaminhadas por esta integração são categorias de ação, serviço e posição na página. A revisão do planejamento e a continuação para o WhatsApp usam eventos próprios; a origem, o destino, a data, o horário, o veículo de preferência, a mensagem e o URL completo do WhatsApp ficam fora deles. URLs enviadas ao Analytics não incluem parâmetros, fragmentos ou o endereço de origem da visita. A medição automática deve continuar desativada no painel para preservar esse comportamento.

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
