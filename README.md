# Projeto Kodigos 🚀

Este repositório apresenta uma solução completa para o desafio de desenvolvimento da Kodigos, demonstrando habilidades técnicas em algoritmos, estruturas de dados, banco de dados e desenvolvimento de aplicações modernas.

## 📋 Visão Geral

O projeto está dividido em duas partes principais:

1. **Parte Teórica** (`theory/`) - Questões de algoritmos, estruturas de dados e SQL
2. **Parte Prática** (`server/`) - Sistema Nodus de gerenciamento de ordens de serviço

## 🎯 Como Começar

### Pré-requisitos
- [Bun](https://bun.sh/) - Runtime JavaScript/TypeScript moderno
- [Docker](https://www.docker.com/) - Para execução dos bancos de dados
- [Git](https://git-scm.com/) - Para controle de versão

### 1. Clone o repositório
```bash
git clone https://github.com/Azanniel/projeto-kodigos.git
cd projeto-kodigos
```

### 2. Comece pela Parte Teórica
Recomendamos iniciar pela pasta `theory/` para entender os fundamentos:

```bash
cd theory
bun install
bun test
```

### 3. Explore o Projeto Prático
Depois de revisar a teoria, prossiga para o sistema Nodus:

```bash
cd ../server
bun install
docker-compose up -d
cp .env.example .env
bun run db:migrate
bun run db:seed
bun run dev
```

Após isso acesse a documentação da API em: [http://localhost:3000/docs](http://localhost:3000/docs).

## 📚 Parte Teórica

### Algoritmos e Estruturas de Dados

A pasta [`theory/questions`](./theory/questions/) contém 5 questões práticas implementadas em TypeScript:

1. **Merge de Arrays** - Combinação e ordenação de arrays de números inteiros
2. **Busca de String** - Algoritmo para encontrar posição de substring em texto
3. **Sequência Fibonacci** - Geração dos N primeiros números da sequência
4. **Maior Número em Matriz** - Busca do valor máximo em matriz bidimensional
5. **Produto de Números Primos** - Multiplicação dos N primeiros números primos

### Banco de Dados e SQL

A pasta [`theory/database`](./theory/database/) apresenta um esquema completo de gestão de estoque com 6 consultas SQL:

1. **Criação de Tabelas** - Schema completo com relacionamentos
2. **Consulta de Ocupação** - Armazéns com total ocupado
3. **Procedure** - Top 5 armazéns por produto
4. **Relatório Multi-Armazém** - Produtos em múltiplos armazéns
5. **Produtos Órfãos** - Itens sem armazém
6. **Ranking Financeiro** - Armazéns por valor total

**Executar ambiente de banco:**
```bash
cd theory
docker-compose up -d
```

Após isso, você pode acessar o phpMyAdmin em `http://localhost:8080` para explorar o banco de dados e executar consultas SQL.

## 🏭 Parte Prática - Sistema Nodus

### Sobre o Nodus

O **Nodus** é um sistema de gerenciamento de ordens de serviço (OS) desenvolvido como MVP, sendo flexível para diversos setores como TI, manutenção predial, serviços automotivos, entre outros.

### Como Executar o Nodus

```bash
cd server

# Instalar dependências
bun install

# Configurar banco de dados
docker-compose up -d
cp .env.example .env

# Executar migrações e seed
bun run db:migrate
bun run db:seed

# Iniciar servidor de desenvolvimento
bun run dev
```

Após isso acesse a documentação da API em: [http://localhost:3000/docs](http://localhost:3000/docs).

## 🚶 Próximos Passos

1. **Finalização do MVP:** Completar funcionalidades em desenvolvimento
2. **Testes Unitários:** Implementar testes unitários
3. **CI/CD Pipeline:** Configurar automação de deploy
4. **Monitoramento:** Implementar logs e métricas
5. **Escalabilidade:** Preparar para crescimento da aplicação
6. **Aplicação Web:** Finalizar a interface web para usuários finais

---

**Desenvolvido por:** Azanniel  
**GitHub:** [@Azanniel](https://github.com/Azanniel)  