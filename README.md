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
