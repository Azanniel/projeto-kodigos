# Nodus 📃

O Nodus é um sistema de gerenciamento de ordem de serviço desenvolvido para atender às necessidades de empresas com demandas de manutenção, reparo e suporte técnico. Sendo generalista e flexível, ele pode ser adaptado para diversos setores, como TI, manutenção predial, serviços automotivos, entre outros.

## Detalhes técnicos

Nesse projeto backend (server) foi utilizado:
- [Bun](https://bun.sh/) - Runtime JavaScript moderno, rápido e eficiente.
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript que adiciona tipagem estática.
- [Elysia](https://elysiajs.com/) - Framework web minimalista e de alto desempenho.
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para TypeScript e JavaScript com foco em segurança.

## Funcionalidades

Por ser uma aplicação para um desafio, o foco será no desenvolvimento rápido e ágil das funcionalidades em formato de MVP (Produto Mínimo Viável) e conforme o avanço serão adicionadas novas funcionalidades e melhorias na arquitetura.

### Requisitos funcionais

- [x] Autenticação com e-mail e senha.
- [ ] Criação de uma ordem de serviço com detalhes como título, descrição do problema ou demanda, checklist (itens opcionais e obrigatórios), responsável pela ordem, data de criação e status (aberto, em andamento, concluído).
- [x] Execução de uma ordem de serviço (status vai para "em andamento"), permitindo que o responsável adicione as atividades realizadas, marque o checklist e adicione fotos para comprovação (pode salvar o progresso).
- [x] Finalização de uma ordem de serviço (status vai para "concluído"), permitindo que o responsável adicione as últimas informações e fotos para comprovação.
- [ ] Listagem das ordens de serviço mostrando informações como título, responsável, status e número da ordem.
- [ ] Visualizar detalhes de uma ordem de serviço específica, incluindo todas as informações, atividades realizadas, checklist, fotos, duração, responsável e quem solicitou.
- [ ] Edição de uma ordem de serviço (apenas se estiver no status "aberto"), permitindo que o responsável faça alterações nos detalhes da ordem.
- [ ] Exportação de uma ordem de serviço específica em formato PDF, incluindo todas as informações, atividades realizadas, checklist, fotos, duração, responsável e quem solicitou para que possa ser assinada pelo solicitante dando seu aceite.


### Requisitos não funcionais

- [x] Documentação da API com OpenAPI (Swagger).
- [x] Autenticação e autorização com JWT.
- [ ] Listagens devem ser paginadas.
- [ ] Docker para facilitar o deploy e execução local.
- [ ] Testes automatizados (unitários).

### Regras de negócio

- [ ] Apenas usuários autenticados podem criar, executar, finalizar, editar e visualizar ordens de serviço.
- [x] Uma ordem de serviço só pode ser editada e/ou executada se estiver no status "aberto".
- [x] Uma ordem de serviço só pode ser finalizada se estiver no status "em andamento" e os dados obrigatórios estiverem preenchidos.
- [x] O checklist pode conter itens obrigatórios e opcionais. Todos os itens obrigatórios devem ser marcados para que a ordem de serviço possa ser finalizada.
- [ ] Pelo menos uma foto deve ser adicionada a ordem de serviço para que ela possa ser finalizada.
- [ ] A duração da ordem de serviço deve ser calculada automaticamente com base na data de execução e finalização.