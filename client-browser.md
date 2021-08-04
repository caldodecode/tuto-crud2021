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

# 3. Estrutura e Aparência/estilo da página inicial

> :warning: **ATENÇÃO** Este tópico está sendo detalhado, caso encontre problemas ao fazê-lo, contacte o professor.

Neste tópico será desenvolvido a aparência da página inicial da aplicação, para isso será necessário alterar os arquivos `src\index.html` e `src\main.sass`, estes arquivos serão comentados linha a linha para que seja possível compreender seu funcionamento, considerando que nesta aplicação está sendo utilizado o `Parcel` como `Bundler`, não será importado o arquivo de estilo diretamente no arquivo `src\index.html`, portanto faz-se necessário a alteração do arquivo `src\main.ts` para que o mesmo importe o arquivos de estilo, `src\main.scss`.

**`src\index.html`**

> :warning: **ATENÇÃO** note que comentários em arquivos HTML são extremamente desencorajados, pois tratam-se de arquivos que serão trafegados pela web, quanto menos bites desnecessários melhor, pois torna-se menos custoso para que estes arquivos sejam enviados e recebidos. 

> :warning: **ATENÇÃO** apague o conteúdo já existente no arquivo e adicione este trecho de código no lugar

```html
<!-- 
  indica ao navegador que o conteúdo deste documento é HTML e não XHTML, XML ou 
  qualquer outro formado 
-->
<!DOCTYPE html>
<!-- 
    cria elemento raiz do HTML, todo os demais elementos desta página devem ser 
    definidos dentro deste 
-->
<html lang="pt-BR">
  <!-- 
    cria elemento cabeça, neste elemento é definido metadados e diretrizes de 
    como o elemento corpo deve ser renderizado 
  -->
  <head>
    <!-- 
      meta-dado que define qual tipo de charset a página deve utilizar para 
      renderizar seus textos 
    -->
    <meta charset="UTF-8">
    <!-- 
      define o título desta página, este título é o que aparece na barra e aba 
      do navegador 
    -->
    <title>Browser Client</title>
    <!-- 
      importa o script main.ts como módulo e define que o mesmo só deve ser 
      executado após a criação de todos os componentes desta página 
    -->
    <script defer type="module" src="./main.ts"></script>
  </head>
  <!-- 
    cria elemento de corpo, neste elemento é renderizado o que é visto na página 
    web 
  -->
  <body>
    <!-- 
      criação do elemento de cabeçalho 
    -->
    <header>
        <!-- 
          cria divisão no cabeçalho onde será apresentado a logo e/ou texto 
          título da aplicação cliente 
        -->
        <div>
          Browser Client
        </div>
        <!-- 
          cria divisão no cabeçalho onde serão inseridos botões de ação da 
          aplicação 
        -->
        <div>
          <!-- 
            cria botão de ação: Adicionar Pessoas 
          -->
          <button class="bt-adicionar-pessoa">adicionar pessoa</button>
        </div>
    </header>
    <!-- 
      cria elemento principal, neste elemento serão inseridos programaticamente 
      componentes customizados de formulário que faremos nos próximos passos 
    -->
    <main>
    </main>
  </body>
</html>
```

**`src\main.ts`**

> :warning: **ATENÇÃO** apague o conteúdo já existente no arquivo e adicione este trecho de código no lugar

```typescript
// importa o arquivo de estilo
import "./main.scss" 
```

**`src\main.scss`**

> :warning: **ATENÇÃO** apague o conteúdo já existente no arquivo e adicione este trecho de código no lugar

```scss
// seleciona o elemento raiz do contexto atual
:root {
    // cria variável `default-font`, variáveis CSS é a forma melhor indicada para estilização de web components e também 
    // torna-se útil para manipulação de valores por javascript, além de ser um excelente maneira de reaproveitamento de 
    // estilos em arquivos CSS.
    --default-font: sans-serif
}
 
// seleciona o elemento body
body {
    // define a forma de apresentação deste elemento como flex
    display: flex;          
    // define que os elementos filhos deste serão apresentados em colunas 
    flex-direction: column; 
    // define que a altura deste elemento é 100% da altura do view port
    height: 100vh;          
    // remove a margem interna do elemento
    padding: 0;             
    // remove a margem do elemento
    margin: 0;              
}
 
// seleciona o elemento header
header {
    // define a cor de fundo do elemento
    background: #24252A;              
    // define a margem interna do elemento como sendo igual ao tamanho de um M maiúsculo
    padding: 1em;                     
    // define a forma de apresentação deste elemento como flex
    display: flex;                    
    // define a cor da fonte do elemento e seus filhos
    color: #FFFFFF;                   
    // define a fonte do elemento e seus filhos como sendo a mesma da variável `default-font`
    font-family: var(--default-font); 
    
    // seleciona os elemento button que sejam filhos do elemento header
    button {
        // remove a borda do elemento
        border: 0 none;           
        // define a cor de fundo do elemento como sendo transparente 
        background: transparent;  
        // define a cor da letra do elemento
        color: #FFFFFF;           
        // define que a transição de estilos do elemento é de 300ms
        transition: .3s;          
        // define a margem interna como sendo topo e baixo igual a meio M e direita e esquerda como 1 M
        padding: 0.5em 1em;       
        // define o ponteiro do mouse como `pointer` quando estiver sobre este elemento
        cursor: pointer;          
        
        // seleciona os elemento button quando estão com o mouse sobre e que são filhos do elemento header
        &:hover {
            // define arredondamento da borda em 25px
            border-radius: 25px;  
            // define a cor de fundo do elemento 
            background: #0385A8;  
        }
    }
    
    // seleciona os elementos div filhos do elemento header
    div {
        // define a forma de apresentação deste elemento como flex
        display: flex;       
        // define que cada um dos elementos irá ocupar uma fração do espaço disponível
        flex: 1 1 0;         
        // define que o conteúdo destes elementos devem cer centralizados verticalmente
        align-items: center; 
        
        // seleciona a primeira div filha do elemento header
        &:first-child {
            // define que os conteúdos deste elemento devam alinhar-se no início (neste caso à esquerda)
            justify-content: flex-start; 
            // define que o texto deste elemento devam ser em caixa alta
            text-transform: uppercase;   
        }
        
        // seleciona a última div filha do elemento header
        &:last-child {
            // define que os conteúdos deste elemento devam alinhar-se no final (neste caso à direita)
            justify-content: flex-end; 
        }
    }
}
 
// seleciona o elemento main
main {
    // define a forma de apresentação deste elemento como flex
    display: flex;             
    // define as margens internas como sendo do mesmo tamanho de um M maiúsculo
    padding: 1em;              
    // define que este deva ocupar uma fração do espaço disponível de seu elemento pai (neste caso o body)
    flex: 1 1 0;               
    // define que se necessário os elementos filhos deste devam quebrar linhas
    flex-wrap: wrap;           
    // define que os elementos filhos deste devam ser centralizado horizontalmente
    justify-content: center;   
    // define que os elementos filhos deste devam ser alinhados verticalmente no início (neste caso no topo)
    align-content: flex-start; 
    // define a cor de fundo do elemento
    background: #20B2AA;       
    // define que se necessário o elemento apresentará barras de rolagem
    overflow: auto;            
 
    // seleciona os elementos filhos diretos do elemento main
    > * {
        // define as bordas do elemento como sendo da espessura de um pixel, e que estas sejam sólidas e cinza
        border: 1px solid #D4D4D4; 
        // define que este elemento deva ocupar 30% do espaço disponível em seu elemento pai (neste caso main)
        flex: 0 0 30%;             
        // define que a margem deste elemento é de 0.25 do tamanho de um M maiúsculo
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