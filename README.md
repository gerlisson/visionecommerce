# Internal Operations Dashboard

Dashboard demonstrativo que transforma dados externos brutos em informações operacionais para apoiar análise e tomada de decisão. O projeto foi desenvolvido como desafio técnico de Full Stack Development, com foco em integração, modelagem, métricas, separação de responsabilidades e uma entrega pequena e verificável.

Os dados são públicos e simulados: eles não representam clientes, interações ou resultados comerciais reais.

## Funcionalidades entregues

- integração server-side com os recursos `users` e `posts` do JSONPlaceholder;
- cards com métricas agregadas do dashboard;
- tabela de atividade por customer, ordenada por quantidade de interactions;
- contexto explícito sobre o caráter simulado dos dados;
- estados de loading e erro, com nova tentativa manual;
- testes automatizados das camadas de acesso à API e cálculo de métricas.

## Stack e requisitos

- Next.js 16.3.2 com App Router;
- React e React DOM 19.2.8;
- TypeScript 6.0.3 com modo `strict`;
- Fetch API nativa;
- CSS Modules;
- Node.js 22.21.0 recomendado pela `.nvmrc`, com faixa suportada `>=22.18.0 <23`;
- npm;
- Vercel como plataforma-alvo de deploy.

## Fonte e interpretação dos dados

A aplicação consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com) sem autenticação ou configuração de ambiente:

- `GET /users` → customers;
- `GET /posts` → interactions.

As requisições são feitas no servidor. Falhas de rede ou respostas HTTP sem sucesso geram erros compreensíveis e não são convertidas silenciosamente em métricas zeradas.

## Métricas

| Saída | Regra atual |
| --- | --- |
| `Customers` | Quantidade de itens retornados por `/users`. |
| `Interactions` | Quantidade de itens retornados por `/posts`. |
| `Avg. Interactions / Customer` | Total de interactions dividido pelo total de customers; retorna zero quando não há customers. |
| `Most Active Customer` | Customer com a maior quantidade de interactions; a interface apresenta um fallback quando não há customers. |
| `Customer Activity` | Nome, e-mail e total de interactions de cada customer, em ordem decrescente; customers sem posts recebem total zero. |

O cálculo considera somente os customers retornados por `/users` na lista e na identificação do mais ativo. Posts sem customer correspondente ainda compõem o total global de interactions.

## Arquitetura

O fluxo principal mantém integração, transformação e apresentação separadas:

```text
JSONPlaceholder
      ↓
lib/api (data access)
      ↓
lib/metrics (domain logic)
      ↓
types/dashboard (modelo derivado)
      ↓
components/dashboard (presentation)
      ↓
app/page.tsx (composição)
```

- `lib/api/`: centraliza a URL externa, utiliza Fetch nativo, valida `response.ok` e expõe respostas tipadas.
- `lib/metrics/`: contém a função pura que agrega usuários e posts, sem dependência de React ou da rede.
- `types/`: separa contratos de transporte da API dos modelos derivados do dashboard.
- `components/dashboard/`: recebe dados preparados e cuida apenas da apresentação.
- `app/page.tsx`: carrega os dois recursos em paralelo com `Promise.all`, calcula as métricas uma vez e compõe a página.
- `app/loading.tsx` e `app/error.tsx`: implementam os estados do segmento pelo App Router.

## Decisões técnicas

- Server Components são o padrão; não existe carregamento via `useEffect` no navegador.
- A Fetch API da plataforma evita uma dependência de cliente HTTP.
- A lógica de métricas é pura, determinística e testada isoladamente.
- A rota `/` usa `force-dynamic`, portanto consulta a fonte externa durante cada requisição.
- Uma falha em `/users` ou `/posts` interrompe o cálculo e chega ao error boundary, evitando números parciais ou falsos.
- Somente o error boundary é Client Component, pois o botão `Try again` precisa chamar `reset()`.
- CSS Modules atendem a apresentação sem biblioteca visual adicional.

## Como executar localmente

Com uma versão compatível do Node.js:

```bash
npm install
npm run dev
```

A aplicação fica disponível em [http://localhost:3000](http://localhost:3000). Nenhuma variável de ambiente é necessária para a fonte simulada atual.

## Como validar

```bash
npm run lint
npm run typecheck
npm test
```

O script de testes usa o runner nativo do Node.js e cobre a integração da API e o motor de métricas. A interface não possui testes automatizados de componentes ou ponta a ponta nesta versão.

## Build e produção local

```bash
npm run build
npm start
```

`npm start` deve ser executado após um build concluído. Por padrão, o servidor de produção local também utiliza `http://localhost:3000`.

## Configuração e segurança

O protótipo usa somente uma API pública e não requer tokens, secrets ou arquivos `.env`. Apesar do nome “Internal Operations Dashboard”, a versão atual não implementa autenticação nem autorização e não deve ser tratada como uma ferramenta interna protegida.

Uma integração futura com dados reais deve permanecer server-side, adotar gestão segura de secrets e aplicar controle de acesso segundo o princípio do menor privilégio.

## Limitações atuais

- os dados são genéricos e simulados, sem pedidos, receita ou histórico operacional real;
- a disponibilidade e a latência da rota dependem do JSONPlaceholder em runtime;
- não há autenticação, autorização, persistência ou armazenamento histórico;
- não há timeout, retry automático, cache customizado ou observabilidade externa;
- respostas HTTP 2xx têm tipos TypeScript, mas não passam por validação estrutural em runtime;
- os testes automatizados não cobrem renderização de UI nem fluxos ponta a ponta;
- não há configuração específica de CI/CD ou Vercel no repositório;
- não existe URL pública de produção validada para documentar.

## Evoluções possíveis para produção

Os itens abaixo são possibilidades futuras e não fazem parte da implementação atual:

- integrar fontes reais no servidor com gestão de secrets;
- adicionar autenticação, autorização e controle de acesso;
- persistir dados e manter histórico para análises temporais;
- definir freshness, cache, timeout e retry conforme SLA da fonte;
- adotar logging estruturado, error tracking, monitoramento e alertas;
- calcular métricas reais como pedidos, receita, conversão, retenção, churn, LTV e ticket médio;
- ampliar testes de integração, componentes e ponta a ponta.

## Deploy

O projeto foi estruturado tendo a Vercel como plataforma-alvo. Nenhuma URL pública foi encontrada e validada nesta entrega, portanto o README não apresenta um link de produção.

## Documentação complementar

- [Índice da documentação](docs/index.md)
- [Arquitetura](docs/architecture.md)
- [Operações](docs/operations.md)
- [Padrões de desenvolvimento](docs/standards.md)
