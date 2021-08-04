# 1. Cliente (browser)

...

# 2. Preparação do Ambiente de Desenvolvimento
 
Antes de iniciar é necessário certificar-se de que você possui o `NodeJs` e o `NPM` instalados em seu computador:
- para usuários windows acesse [o site do nodejs para download](https://nodejs.org/en/download/), baixe a versão adequada para sua máquina, e faça o clássico _next > next > finish_.
- para usuários Linux:
   - Fedora: `dnf install nodejs`
   - Ubuntu: `apt install nodejs npm`
 
## 2.1. Estrutura de arquivos inicial

Crie manualmente a seguinte estrutura de arquivos:

> :warning: **ATENÇÃO** todos os arquivos texto devem ser criados com o encode UTF-8

```bash
tutorial/                        # pasta raiz geral de nosso projeto
└─ client-browser/               # pasta da aplicação cliente -> ARRASTE ESTA PASTA PARA DENTRO DO VSCODE
   └─ src/                       # pasta onde o código fonte da aplicação
      ├─ components/             # pasta onde serão criados componentes reutilizáveis de inteface 
      │  └─ form-pessoa          # pasta do componente de formulário para cadastro de pessoas
      │     ├─ form-pessoa.html  # arquivo com a estrutura HTML do componente
      │     ├─ form-pessoa.scss  # arquivo com a aparência/estilo do componente
      │     └─ index.ts          # arquivo com as regras e interações do componente
      ├─ def.d.ts                # arquivo com tipos necessários para o typescript
      ├─ index.html              # arquivo com a estrutura HTML principal da aplicação
      ├─ main.scss               # arquivo com a aparência/estilo pricipal da aplicação
      └─ main.ts                 # arquivo principal de funcuinalidade da aplicação
```

## 2.2. Instalação de dependências

Arraste a pasta `client-browser` para dentro de seu `vscode`, e abra o terminal, pelo menu `Terminal > New Terminal`, execute os comandos abaixo:

> :warning: **ATENÇÃO** é importante que a pasta **client-browser** seja arrastado e não a pasta **TUTORIAL** ou **SRC**

> :warning: **ATENÇÃO** se você estiver seguindo este tutorial antes da versão 2 do parcel ter sido lançada, substitua o comando de instalação do parcel por `npm install --save-dev parcel@nightly`

```bash
# criação do arquivo de configuração do projeto
npm init -y

# instalação de bibliotecas necessárias para desenvolvimento da aplicação
npm install --save-dev parcel
```

### 2.2.1. O que o comando `npm init -y` faz?
 
Quando executado este comando o `npm` cria um arquivo chamado `package.json`, este arquivo é responsável por manter informações sensíveis ao seu projeto como, quais bibliotecas são necessárias para o desenvolvimento e execução da aplicação, comandos para execução e depuração da aplicação, autor, palavras chaves, versão da aplicação dentre outras.

### 2.2.2. O que o comando `npm install --save-dev parcel`

Ao executar esse comando o `npm` baixa o bundler `parcel`, este será responsável por compilar o projeto, tanto para testes como para a versão final:
- O `npm` baixa e salva esta biblioteca em uma pasta chamada `node_modules`.
- A bibliotecada depende de outras bibliotecas, portanto, o `npm` se encarregará em baixar também estas bibliotecas e, assim como as demais, irá salvá-las na pasta `node_modules`.
- Para controle do projeto após baixar a biblioteca, o `npm` as lista-ra no arquivo `package.json` dentro da chave `dependencies`.
- As interdependências destas bibliotecas são listadas no arquivo `package-lock.json`, para controle interno do `npm`.

## 2.3. Estrutura final de arquivos

```bash
tutorial/                        # criado manualmente
└─ client-browser/               # criado manualmente
   ├─ .parcel-cache              # criado futuramente ao executar `npm run dev` ou `npm run build`
   ├─ dist/                      # criado futuramente ao executar `npm run build`
   ├─ dist-dev/                  # criado futuramente ao executar `npm run dev`
   ├─ node_modules/              # criado ao executar `npm install ...`
   ├─ src/                       # criado manualmente
   │  ├─ components/             # criado manualmente
   │  │  └─ form-pessoa          # criado manualmente
   │  │     ├─ form-pessoa.html  # criado manualmente
   │  │     ├─ form-pessoa.scss  # criado manualmente
   │  │     └─ index.ts          # criado manualmente
   │  ├─ def.d.ts                # criado manualmente
   │  ├─ index.html              # criado manualmente
   │  ├─ main.scss               # criado manualmente
   │  └─ main.ts                 # criado manualmente
   ├─ package.json               # criado ao executar `npm init`
   └─ package-lock.json          # criado ao executar `npm install ...`
```

## 2.4. Configuração do projeto `package.json`
 
Se tudo ocorreu bem até este ponto, você deve ter um arquivo `package.json` parecido com o listado abaixo, precisaremos alterar algumas coisas e alterar outras:

**`package.json`**

```jsonc
{
  "name": "client-browser",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel": "*"
  }
}
```

...

o resultado final do nossa arquivo `package.json` deve ser a seguinte:

**`package.json`**

```jsonc
{
  "name": "client-browser",
  "version": "0.0.1",
  "description": "",
  // linha `"main": "index.js"` removida
  "scripts": {
    "dev": "parcel serve ./src/index.html --dist-dir=./dist-dev",  // adicionado
    "build": "parcel build ./src/index.html --dist-dir=./dist",    // adicionado
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel": "*"
  }
}
```

## 2.5. Testando/Executando o ambiente

Para que o teste da aplicação seja mais visual, é sugerido que os arquivos `src\index.html`, `src\main.ts` e `src\main.scss` tenham algum conteúdo, portanto seguem sugestões de conteúdo para estes arquivos, note que estes conteúdos serão utilizados somente para teste da aplicação e futuramente serão alterados ou possivelmente totalmente substituídos.

**`src\index.html`**
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Browser Client</title>
    <script defer type="module" src="./main.ts"></script>
  </head>
  <body>
      Olá do mundo do HTML!
  </body>
</html>
```

**`src\main.ts`**
```typescript
import "./main.scss"

document.innerHTML += "Olá do mundo do TypeScript! "
```

**`src\main.scss`**
```scss
body {
    &::before {
        content: "Olá do mundo do SASS!"
    }
}
```

### 2.5.1. Criando uma versão de distribuição

Para testar a criação da versão final de distribuição da aplicação o comando a seguir deve ser executado no terminal, isso deve criar uma pasta chama `dist` e seu conteúdo é a versão dos arquivos prontos para serem distribuídos:

```bash
npm run build
```
### 2.5.2. Testando a aplicação 

Para testar a aplicação em tempo de desenvolvimento o comando a seguir deve ser executado no terminal, isso iniciará um servidor que pode ser acessado em qualquer navegador web moderno pelo endereço `http://127.0.0.1:1234` ou `http://localhost:1234`:

```bash
npm run dev
```

# 3. Aparência (estilo) da página inicial

> :warning: **ATENÇÃO** Este tópico está sendo detalhado, caso encontre problemas ao fazê-lo, contacte o professor.

**`src\index.html`**

> :warning: **ATENÇÃO** apague o conteúdo já existente no arquivo e adicione este trecho de código no lugar

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Browser Client</title>
    <script defer type="module" src="./main.ts"></script>
  </head>
  <body>
    <header>
        <div>
          Browser Client
        </div>
        <div>
          <button class="bt-adicionar-pessoa">adicionar pessoa</button>
        </div>
    </header>
    <main>
    </main>
  </body>
</html>
```

**`src\main.scss`**

> :warning: **ATENÇÃO** apague o conteúdo já existente no arquivo e adicione este trecho de código no lugar

```scss
:root {
    --default-font: sans-serif
}

body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0;
    margin: 0;
}

header {
    background: #24252A;
    padding: 1em;
    display: flex;
    color: #FFFFFF;
    font-family: var(--default-font);
    
    button {
        border: 0 none;
        background-color: transparent;
        color: #FFF;
        transition: .3s;
        padding: 0.5em 1em;
        cursor: pointer;
        
        &:hover {
            border-radius: 25px;
            background: #0385A8;
        }
    }
    
    div {
        flex: 1 1 0;
        align-items: center;
        
        &:first-child {
            display: flex;
            justify-content: flex-start;
            text-transform: uppercase;
        }
        
        &:last-child {
            display: flex;
            justify-content: flex-end;
        }
    }
}

main {
    background: #20B2AA;
    padding: 1em;
    flex: 1 1 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    overflow: auto;

    > * {
        border: 1px solid #D4D4D4;
        flex: 0 0 30%;
        margin: .25em;
    }
}
```

# 4. Componentes (formulário)

> :warning: **ATENÇÃO** Este tópico está sendo detalhado, caso encontre problemas ao fazê-lo, contacte o professor.

**`src\components\form-pessoa\form-pessoa.html`**
```html
<div>
    <label for="nome">nome</label>
    <input placeholder="insira o nome" name="nome" id="nome">
</div>
<div>
    <label for="sobrenome">sobrenome</label>
    <input placeholder="insira o sobrenome" name="sobrenome" id="sobrenome">
</div>
<div>
    <label for="email">email</label>
    <input placeholder="insira o endereço email" name="email" id="email">
</div>
<div>
    <label for="telefone">telefone</label>
    <input placeholder="insira o número telefone" name="telefone" id="telefone">
</div>
<div class="actions" data-tipo="inserir">
    <button class="bt-remover" name="remover">remover</button>
    <button class="bt-salvar" name="salvar">salvar</button>
</div>
```

**`src\components\form-pessoa\form-pessoa.scss`**
```scss
* {
    box-sizing: border-box;
}

:host {
    background-color: #FFFFFF;
    display: inline-block;
    box-shadow: 2px 2px 2px #00000066;
    min-width: 400px;
    padding: 1em;
    font-family: var(--default-font);
    border: 1px solid #909090;
    border-radius: 15px;
}

div {
    padding: 1em;
    height: 100%;

    &.actions {
        display: flex;
        justify-content: flex-end;
    }

    label {
        display: block;
        padding-left: .8em;
    }

    input {
        border: 1px solid #909090;
        padding: 1em;
        border-radius: 15px;
        width: 100%;
        outline: none;
    }
}

.actions {
    &[data-tipo='adicionar'] {
        button.bt-alterar {
            display: none;
        }
    }

    &[data-tipo='alterar'] {
        button.bt-adicionar {
            display: none;
        }
    }

    button {
        border: 0 none;
        background-color: transparent;
        color: #FFF;
        transition: .3s;
        padding: 0.5em 1em;
        cursor: pointer;
        background: #0385A8;
        border-radius: 25px;
        margin-left: 1em;

        &:hover {
            transform: scale(1.05);
        }

        &.bt-remover {
            background: transparent;
            color: #F44336;

            &:hover {
                background: #F44336;
                color: #FFFFFF;
            }
        }
    }
}
```

**`src\components\form-pessoa\index.ts`**
```typescript
import stringStyle from "bundle-text:./form-pessoa.scss"
import stringHtml from "bundle-text:./form-pessoa.html"

export class FormPessoa extends HTMLElement {
    protected _id: number
    protected _root = this.attachShadow({ mode: "closed" })
    protected _domMain: HTMLElement
    protected _domActionBar: HTMLDivElement
    protected _inputs: { [prop: string]: HTMLInputElement } = {}
    protected _buttons: { [prop: string]: HTMLButtonElement } = {}

    constructor() {
        super()
        this._criarElementosPrincipais()
        this._referenciarBotoesEElementos()
        this._atribuirEventos()
    }

    protected _criarElementosPrincipais() {
        const style = document.createElement("style")
        const main = document.createElement("main")
        style.innerHTML = stringStyle
        main.innerHTML = stringHtml
        this._root.append(style, main)
        this._domMain = main
        this._domActionBar = main.querySelector(".actions")
    }

    protected _referenciarBotoesEElementos() {
        this._domMain.querySelectorAll("input[name]").forEach(input => {
            this._inputs[input.getAttribute("name")] = input as HTMLInputElement
        })

        this._domMain.querySelectorAll("button[name]").forEach(button => {
            this._buttons[button.getAttribute("name")] = button as HTMLButtonElement
        })
    }

    protected _atribuirEventos() {
        this._buttons.remover.addEventListener("click", ev => this._remover())
        this._buttons.salvar.addEventListener("click", ev => this._salvar())
    }

    carregarDadosPreCarregados() {
        // este método será desenvolvido futuramente neste tutorial
    }

    protected async _remover() {
        if (this._id) {
            try {
                await fetch(`http://localhost:8080/pessoa/${this._id}`, { method: "DELETE" })
            } catch (e) {
                alert("ERRO: " + e)
                throw new Error(e)
            }
        }
        this.remove()
    }

    protected async _salvar() {
        const values = Object.fromEntries(Object.entries(this._inputs).map(([key, input]) => [key, input.value]))

        const resposta = await fetch(`http://localhost:8080/pessoa/${this._id || ''}`, {
            method: this._id ? "PUT" : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })

        if (resposta.status !== 200) {
            alert("ERRO NO SERVIDOR!")
            throw new Error("Erro por parte do servidor ao inserir dados")
        }

        const dadosDaResposta = await resposta.json()
        if (!dadosDaResposta.id) return
        this._id = dadosDaResposta.id
    }
}

//
customElements.define("comp-form-pessoa", FormPessoa)
```

**`src\.d.ts`**
```typescript
declare module "bundle-text:*" {
    const val: string
    export default val
}
```

**`src\main.ts`**

> :warning: **ATENÇÃO** não apague o conteúdo já existente no arquivo, apenas adicione este trecho de código após a última linha

```typescript
import { FormPessoa } from "./components/form-pessoa"

const elMain = document.querySelector("main")
const elBtNovaPessoa = document.querySelector(".bt-adicionar-pessoa")

elBtNovaPessoa.addEventListener("click", ev => {
    const elFormPessoa = new FormPessoa()
    elMain.append(elFormPessoa)
})
```

# 5. Carregar pessoas já cadastrada

> :warning: **ATENÇÃO** Este tópico está sendo detalhado, caso encontre problemas ao fazê-lo, contacte o professor.

Para que assim que a aplicação seja carregada, também sejam carregados todas as pessoas que já cadastramos no banco de dados, faremos uma função que fará uma requisição em nosso servidor e em seguida adicionará um componente `FormPessoa` para cada uma das pessoas existentes no banco de dados 

**`src\main.ts`**

> :warning: **ATENÇÃO** não apague o conteúdo já existente no arquivo, apenas adicione este trecho de código após a última linha

```typescript
void async function carregarPessoas() {
    const resposta = await fetch("http://localhost:8080/pessoa")
    const dadosDeResposta = await resposta.json()
    dadosDeResposta.forEach(dadosDePessoa => {
        const elFormPessoa = new FormPessoa()
        elFormPessoa.carregarDadosPreCarregados(dadosDePessoa)
        elMain.append(elFormPessoa)
    });
}()
```

**`src\components\form-pessoa\index.ts`**
```typescript
carregarDadosPreCarregados(dadosPreCarregados?: { id?: number, [prop: string]: String | number }) {
    if (dadosPreCarregados.id)
        this._id = dadosPreCarregados.id

    Object.entries(dadosPreCarregados).forEach(([chave, valor]) => {
        if (this._inputs[chave])
            this._inputs[chave].value = valor as string
    })
}
```