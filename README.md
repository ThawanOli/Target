# 🎯 Target - Gerenciador de Metas Financeiras

Aplicação mobile desenvolvida para consolidar conhecimentos em **React Native**, **Expo Router** e persistência de dados local com **SQLite**. Este projeto faz parte da disciplina Sistemas Móveis do curso Ciência da Computação (6º Período) no **Centro Universitário Católica do Leste de Minas Gerais (Unileste)**.

##  Funcionalidades

- **Criação de Metas:** Defina um título e um valor total para o seu objetivo.
- **Gestão de Transações:** Adicione depósitos (Guardar) ou retiradas (Resgatar) de forma dinâmica.
- **Progresso em Tempo Real:** Visualização clara através de barras de progresso que refletem o estado atual da meta.
- **Persistência Local:** Todos os dados são salvos no dispositivo utilizando SQLite, garantindo que as informações não se percam ao fechar o app.

##  Tecnologias Utilizadas

- **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
- **Linguagem:** TypeScript
- **Roteamento:** Expo Router (File-based routing)
- **Banco de Dados:** SQLite (expo-sqlite)
- **Estilização:** StyleSheet nativo com suporte a temas customizados.
- **Ícones:** @expo/vector-icons (MaterialIcons)

##  Estrutura do Projeto

- `src/app`: Rotas e telas da aplicação.
- `src/components`: Componentes reutilizáveis (Botões, Inputs, Cards).
- `src/database`: Configuração do banco de dados e Hooks de acesso aos dados.
- `src/theme`: Definições de cores e tipografia (Fonte Inter).

##  Como executar

1. Clone o repositório:
   ```bash
   git clone [https://github.com/ThawanOli/Target.git](https://github.com/ThawanOli/Target.git)
