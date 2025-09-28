# ⛈️ [Clima App]
> Um aplicativo moderno para consulta de clima em tempo real, construído com React e tipagem forte via TypeScript.

## ✨ Funcionalidades

* **Busca por Cidade:** Pesquisa o clima em tempo real para qualquer cidade do mundo.
* **Detalhes Completos:** Exibe temperatura atual, mínima, máxima, velocidade do vento, umidade e pressão atmosférica.
* **Ícones Dinâmicos:** Usa os ícones oficiais do OpenWeather para representar o clima atual.
* **Tratamento de Erros:** Sistema robusto que permite ao usuário corrigir nomes de cidades inválidos (Erro 404) e tentar novamente sem precisar recarregar a página.
* **Tipagem Forte:** Todo o projeto é construído com **TypeScript** para garantir menos bugs e maior escalabilidade.


## 🛠️ Tecnologias

* **Frontend:** React (Hooks)
* **Linguagem:** TypeScript
* **Estilização:** CSS Modules
* **Build Tool:** Vite
* **API:** OpenWeatherMap API (Endpoint `weather` 2.5)


------------------------------------------------------------------------------------------------------------------------------------


## ⚙️ Configuração e Instalação

Siga os passos para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [link-repositorio]
    cd nome-do-projeto
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure a API Key:**
    Crie um arquivo chamado `.env` na raiz do projeto e insira sua chave da OpenWeather:
    ```
    VITE_OPENWEATHER_API_KEY=SUA_CHAVE_AQUI
    ```

4.  **Inicie o servidor:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou a porta exibida).