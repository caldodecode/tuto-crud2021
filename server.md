# 1. Servidor/API Rest API

...

## 1.1. Conhecimentos Necessários

- Lógica de Programação
    -
- O que são APIs 
    - ["Vídeo\Dicionário do Programador"](https://www.youtube.com/watch?v=vGuqKIRWosk)
- Json 
    - [Vídeo - Dicionário do Programador"](https://www.youtube.com/watch?v=P81dE-tkaaA)
    - [DevMedia](https://www.devmedia.com.br/json-tutorial/25275)
- POO - Programação Orientada a Objetos 
    -  [Vídeo - Dicionário do Programador](https://www.youtube.com/watch?v=QY0Kdg83orY)
- Javascript/ECMAScript
    - ["MDN Web Docs"](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- Modulos Javascript
    - ["Vídeo - High Tech Cursos Fábrica de Programador"](https://www.youtube.com/watch?v=6Avdyl8YgWg)
    - ["MDN Web Docs"](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules)
- URL
    - ["Caldo de Code"](https://www.youtube.com/watch?v=YccUWE6dito)
- HTTP
    - ["Vídeo - Dicionário do Programador"](https://www.youtube.com/watch?v=hwttZtWkXTk)

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
tutorial/             # pasta raiz geral de nosso projeto
├─ server/            # pasta da aplicação servidora (API) de nosso CRUD -> ARRASTE ESTA PASTA PARA DENTRO DO VSCODE
│  └─ src/            # pasta onde colocaremos nosso código fonte
│     ├─ main.ts      # onde faremos todos os endpoints de nossa aplicação
│     └─ database.ts  # onde serão escritas as regras de criação de tabelas e manipulação de dados no banco sqlite
└─ test-pessoa.http   # onde escreveremos testes dos endpoints (necessário para testes antes do desenvolvimento da interface)
```
 
## 2.2. Instalação de dependências
 
Arraste a pasta `server` para dentro de seu `vscode`, e abra o terminal, pelo menu `Terminal > New Terminal`, execute os comandos abaixo:

> :warning: **ATENÇÃO** é importante que a pasta **SERVER** seja arrastado e não a pasta **TUTORIAL** ou **SRC**
  
```bash
# criação do arquivo de configuração do projeto
npm init -y
 
# instalação de bibliotecas necessárias para execução da aplicação
npm install express body-parser sqlite sqlite3
 
# instalação de bibliotecas necessárias para desenvolvimento da aplicação
npm install --save-dev typescript ts-node
 
# instalação de bibliotecas de tipos, auxiliares durante o desenvolvimento
npm install --save-dev @types/node @types/express @types/sqlite3
 
# criação do arquivo de configuração do typescript
npx tsc --init
```
 
### 2.2.1. O que o comando `npm init -y` faz?
 
Quando executado este comando o `npm` cria um arquivo chamado `package.json`, este arquivo é responsável por manter informações sensíveis ao seu projeto como, quais bibliotecas são necessárias para o desenvolvimento e execução da aplicação, comandos para execução e depuração da aplicação, autor, palavras chaves, versão da aplicação dentre outras.
 
### 2.2.2. O que o comando `npm install express body-parser sqlite sqlite3` faz?

Ao executar esse comando, o `npm` baixa três bibliotecas `express`, `sqlite` e `sqlite3`, bem como as interdependências destas bibliotecas:
- O `npm` baixa e salva todas estas bibliotecas em uma pasta chamada `node_modules`.
- Cada uma das bibliotecas pode depender de outras bibliotecas, portanto, o `npm` se encarregará em baixar também estas bibliotecas e, assim como as demais, irá salvá-las na pasta `node_modules`.
- Para controle do projeto após baixar as bibliotecas, o `npm` as lista-ra no arquivo `package.json` dentro da chave `dependencies`.
- As interdependências destas bibliotecas são listadas no arquivo `package-lock.json`, para controle interno do `npm`.

Abaixo temos uma breve descrição da utilidade de cada uma dessas bibliotecas:

- *express*: Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web. [maiores informações no site oficial](https://expressjs.com/).
- *body-parser*: Esta biblioteca permite a manipulação de dados recebidos no corpo da requisição HTTP. [maiores informações no site oficial](https://expressjs.com/).
- *sqlite3*: Esta biblioteca permite a manipulação de bancos de dados sqlite. [maiores informações no site oficial](https://github.com/mapbox/node-sqlite3).
- *sqlite*: Esta biblioteca permite a utilização da biblioteca `sqlite3` de maneira assíncrona. [maiores informaçõe no site oficial](https://github.com/kriasoft/node-sqlite#readme).
 
### 2.2.3. O que o comando `npm install --save-dev typescript ts-node` faz?
 
Assim como o comando anterior, este também instala bibliotecas, nesta caso ele instala a biblioteca `typescript` e `ts-node`, estas bibliotecas são necessárias somente no momento de desenvolvimento da aplicação, por este motivo foi adicionado o parâmetro `--save-dev` ao comando. A única coisa que este comando difere do anterior é que ao invés de criar as referências dentro da chave `dependencies` do arquivo `package.json`, esta cria dentro da chave `devDependencies`, marcando-as assim como dependências necessárias somente para o desenvolvimento da aplicação.
Abaixo temos uma breve descrição da utilidade de cada uma dessas bibliotecas:
- *typescript*: TypeScript é um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem. [maiores informaçõe no site oficial](https://www.typescriptlang.org/)
- *ts-node*: Permite que o typescript seja executado sem a necessidade de criar os arquivos de distribuição da aplicação, facilitando assim o desenvolvimento da aplicação. [maiores informaçõe no site oficial](https://github.com/TypeStrong/ts-node#readme)
 
### 2.2.4. O que o comando `npm install --save-dev @types/node @types/express @types/sqlite3` faz?
 
Assim como o comando anterior, instala bibliotecas como bibliotecas necessárias para o desenvolvimento da aplicação, porém estas bibliotecas são utilizadas para ajudar o `vscode` com o _auto complete_, facilitando assim a escrita do código. De fato estas bibliotecas não são essenciais para o desenvolvimento, porém elas auxiliam o `typescript` e consequentemente o `vscode` a entender os tipos e dependências das bibliotecas `express`, `sqlite3` e do próprio `NodeJs`, isso melhora a capacidade do `vscode` em _auto completar_ trechos de código.
 
### 2.2.5. O que o comando `npx tsc --init` faz?
 
Cria o arquivo de configuração do `typescript`, `tsconfig.json`, este arquivo é importante para informar como os arquivos `javascript` serão criados, neste arquivo temos informações como, para qual versão `javascript` o `typescript` deve compilar, em qual pasta esses arquivos devem ser gerados, dentre outras informações pertinentes.
 
> É importante pontuar que neste momento utilizamos o comando com o prefixo `npx`,  este prefixo é utilizado quando se faz necessário executar um binário de uma  biblioteca instalada localmente ou seja, que está dentro da pasta `node_modules`, neste caso executamos o comando `tsc`, sigla para typescript compiler, com o parâmetro `--init`
 
## 2.3. Estrutura final de arquivos
 
```bash
tutorial/                # criado manualmente
└─ server/               # criado manualmente
   ├─ node_modules/      # criado ao executar `npm install ...`
   ├─ dist/              # criado futuramente ao executar `npm run build`
   ├─ src/               # criado manualmente
   │  ├─ main.ts         # criado manualmente
   │  └─ database.ts     # criado manualmente
   ├─ package.json       # criado ao executar `npm init`
   ├─ package-lock.json  # criado ao executar `npm install ...`
   ├─ test-pessoa.http   # criado manualmente
   └─ tsconfig.json      # criado ao executar `npx tsc --init`
```
 
## 2.4. Configuração do projeto `package.json`
 
Se tudo ocorreu bem até este ponto, você deve ter um arquivo `package.json` parecido com o listado abaixo, precisaremos alterar algumas coisas e alterar outras:
 
```json
{
 "name": "server",
 "version": "1.0.0",
 "main": "index.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
 "description": "",
 "dependencies": {
   "express": "*",
   "sqlite": "*",
   "sqlite3": "*"
 },
 "devDependencies": {
   "@types/express": "*",
   "@types/node": "*",
   "@types/sqlite3": "*",
   "ts-node": "*",
   "typescript": "*"
 }
}
```
 
É necessário alterar a linha `"main" : "index.js"` para `"main" : "dist/main.js"`, pois quando configurarmos o arquivo `tsconfig.json` iremos informar que os arquivos `javascript` serão gerados em uma pasta de nome `dist`, o porquê deste nome será explicado no passo em que falaremos sobre a configuração do `typescript`.
 
Além de alterar o caminho do arquivo main, também precisamos adicionar dois `scripts`, um que usaremos para criação dos arquivos final da aplicação e outro que usaremos durante os testes, então entre a linha `"scripts": {` e `"test": "..."` iremos adicionar `"dev": "ts-node-script src/main.ts",`, este script será utilizado durante o desenvolvimento da aplicação e para criação da aplicação, logo após esta linha adicionaremos `"build": "tsc",`.
 
pelo fato de termos adicionado esses dois comandos no `package.json`, agora é possível executar chamá-los da seguinte maneira pela linha de comando `npm run dev` e `npm run build`, o primeiro comando usaremos para os testes e o segundo para a criação da aplicação final.
 
o resultado final do nossa arquivo `package.json` deve ser a seguinte:
 
```jsonc
{
 "name": "server",
 "version": "1.0.0",
 "main": "dist/main.js",                                   // linha alterada
 "scripts": {
   "dev": "ts-node-script src/main.ts",                    // linha adicionada
   "build": "tsc",                                         // linha adicionada
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
 "description": "",
 "dependencies": {
   "express": "*",
   "sqlite": "*",
   "sqlite3": "*"
 },
 "devDependencies": {
   "@types/express": "*",
   "@types/node": "*",
   "@types/sqlite3": "*",
   "ts-node": "*",
   "typescript": "*"
 }
}
```
 
 
## 2.5. Configuração do transpilador/typescript `tsconfig.json`
 
O arquivo `tsconfig.json` que foi gerado no momento da execução do comando `npx tsc --init` tem todas as possíveis chaves de configurações, por isso é um arquivo relativamente grande, porém para este projeto iremos nos focar em apenas dois atributos definidos nele, o `"target"`, que define a versão do `javascript` para a qual iremos compilar/transpilar o `typescript` e. o `"outDir"`, que é a pasta onde os arquivos `javascript` serão salvos.
 
Para este projeto a linha `"target": "es5",` deve ser alterada para `"target": "ES2021",` e a linha `// "outDir": "./",` deve ser descomentada e alterada para `"outDir": "./dist",`, o nome da pasta `dist` é uma convenção e abreviação do termo em inglês `distributable`, que significa `distribuível`, é nessa pasta que ficarão os arquivos que serão distribuídos para os usuários final após o fechamento de uma versão da aplicação.
 
De forma resumida, o arquivo `tsconfig.json` ficará parecido com o seguinte:
 
```jsonc
{
 "compilerOptions": {
   "target": "ES2020",                             // linha alterada
   "module": "commonjs",
   "outDir": "./dist",                             // linha alterada
   "strict": true,
   "esModuleInterop": true,
   "skipLibCheck": true,
   "forceConsistentCasingInFileNames": true
 }
}
```
 
## 2.6. Testando/Executando o ambiente

Para que os testes a seguir sejam um pouco mais visual, é preciso alterar o arquivo `./src/main.ts`, adicionando a impressão de algo no terminal, então de forma temporária adicione o seguinte código ao arquivo `console.log("TESTE DE AMBIENTE: OK!")`, então se a frase `TESTE DE AMBIENTE: OK!` aparecer em seu terminal, significa que os testes foram bem sucedidos.

### 2.6.1. Criando uma versão de distribuição 

Execute o comando abaixo para compilar os arquivos `TypeScript` para `Javascript`, se tudo ocorrer bem uma pasta chamada `dist` deve ser criada com os arquivos `javascript` de uma versão de distribuição.

```bash
npm run build
```

Para executar a versão de distribuição que você acabou de criar execute o seguinte comando em seu terminal:

```bash
node dist\main.js
```

### 2.6.2. Testando a aplicação 

```bash
npm run dev
```

 
# 3. Acesso e manipulação do banco de dados
 
O arquivo `./src/database.ts` será o nosso módulo responsável por criar o banco de dados `SQLite` e suas tabelas caso não existam, bem como exportar as funções necessárias para manipulação dos dados, logo abaixo temos o arquivo editado e comentado para que seja possível compreender seu funcionamento:

**`./src/database.ts`**
```typescript
// importa a biblioteca `sqlite3`, que servirá de driver para acesso ao banco de dados
import sqlite3 from "sqlite3"

// importa a biblioteca `sqlite`, que  servirá para fazermos requisições assíncronas no banco de dados sqlite
import { open } from "sqlite"

// cria e exporta (como item da biblioteca) a função assíncrona `initdatabase`, responsável por conectar-se, criar 
// a tabelas se necessário e manipular dados no banco de dados, esta função retorna um objeto contendo abstrações 
// para cada uma das ações a serem executadas no banco de dados
export async function initDatabase() {
    // aguarda conectar-se no arquivo `database.db` (cria o mesmo caso necessário), utilizando o `sqlite3` como 
    // driver, e assim que terminar a execução, armazena numa constante chamada `db` um objeto que permite a 
    // manipulação do banco de dados
    const db = await open({
        filename: "database.db",
        driver: sqlite3.Database
    })

    // aguarda a criação da tabela `pesssoa` caso a mesma não exista no banco de dados
    await db.exec(`
        CREATE TABLE IF NOT EXISTS pessoa (
            id          INTEGER  PRIMARY KEY AUTOINCREMENT  ,
            nome        TEXT     NOT NULL                   ,
            sobrenome   TEXT     NOT NULL                   ,
            email       TEXT     NOT NULL    UNIQUE         ,
            telefone    TEXT     NOT NULL
        );
    `)

    // define os dados que utilizaremos para o cadastro e alteração dos dados de pessoas
    type TipoDadosDePessoa = {
        nome: string
        sobrenome: string
        email: string
        telefone: string
    }

    // define classe `Pessoa` com todos os métodos necessários para manipulação dos dados da tabela pessoa
    // *** ATENÇÃO *** é necessário ressaltar a importância de serem criados arquivos de módulos para
    //             *** organização do código, porém para fins didáticos a classe `Pessoa` está sendo definida
    //             *** aqui mesmo neste arquivo.
    class Pessoa {
        // define método estático que lista todas as pessoas contidas na tabela pessoas do banco de dados
        static async listar() {
            // aguarda execução da busca de todos os dados contidos na tabela pessoa e assim que retornar as 
            // armazena em uma constante chamada `result`
            const result = await db.all(`SELECT * FROM pessoa`)
            // retorna os dados da constante `result`
            return result
        }

        // define método estático que lista os dados de uma pessoa específica contido na tabela pessoa, este método
        // recebe um parâmetro chamado `id` do tipo `number` que será utilizado para selecionar somente os dados da
        // pessoa que tenha este `id`
        static async listarUm(id: number) {
            // aguarda execução da busca de dados de uma pessoa específica filtrada pelo campo `id`, contida na 
            // tabela pessoa e assim que retornar as armazena em uma constante chamada `result`
            const result = await db.all(`SELECT * FROM pessoa WHERE id=:id`, { ":id": id })
            // retorna os dados da constante `result`
            return result
        }

        // define método estático que adiciona uma pessoa no banco de dados, esta função recebe um parâmetro 
        // chamado `dados` do tipo `TipoDadosDePessoa`, estes dados serão utilizados para inserir uma nova pessoa 
        // no banco de dados
        static async adicionar(dados: TipoDadosDePessoa) {
            // aguarda a execução da inserção dos dados de uma nova pessoa no banco de dados e assim que inserido, 
            // armazena os dados desta execução em uma constante chamada `result`
            const result = await db.run(
                `
                    INSERT INTO 
                        pessoa(
                            nome, sobrenome, 
                            email, telefone
                        ) 
                        
                        VALUES(
                            :nome, :sobrenome, 
                            :email, :telefone
                        )
                `,
                {
                    ":nome": dados.nome,
                    ":sobrenome": dados.sobrenome,
                    ":email": dados.email,
                    ":telefone": dados.telefone
                }
            )
            // retorna um objeto contendo uma chave chamada `id` que é recebida pelo valor `lastID` contido na 
            // constante `result`, definida no passo anterior
            return { id: result.lastID }
        }

        // define método estático que altera dados de uma pessoa no banco de dados, esta função recebe um parâmetro 
        // chamado `id` do tipo `number` que será utilizado para selecionar para alteração somente os dados da 
        // pessoa que tenha este `id`, além deste parâmetro essa função também recebe um parâmetro chamado `dados` 
        // do tipo `TipoDadosDePessoa`, estes dados serão utilizados para alterar os dados de pessoa
        static async alterar(id: number, dados: TipoDadosDePessoa) {
            // aguarda a execução da alteração dos dados da pessoa com o `id` determinado
            const result = await db.run(
                `
                    UPDATE 
                        pessoa 
                    SET 
                        nome=:nome, sobrenome=:sobrenome, 
                        email=:email, telefone=:telefone 
                    WHERE 
                        id=:id
                `,
                {
                    ":id": id,
                    ":nome": dados.nome,
                    ":sobrenome": dados.sobrenome,
                    ":email": dados.email,
                    ":telefone": dados.telefone
                }
            )
            // retorna um objeto contendo uma chave chamada `linhasAfetadas` que é recebida pelo `lastID` contido 
            // na constante `changes`, definida no passo anterior
            return { linhasAfetadas: result.changes }
        }

        // define método estático que exclui dados de uma pessoa no banco de dados, esta função recebe um parâmetro 
        // chamado `id` do tipo `number` que será utilizado para selecionar para exclusão somente os dados da 
        // pessoa que tenha este `id`
        static async excluir(id: number) {
            // aguarda a execução da exclusão dos dados da pessoa com `id` determinado
            const result = await db.run(`DELETE FROM pessoa WHERE id=:id`, { ":id": id })
            // retorna um objeto contendo uma chave chamada `linhasAfetadas` que é recebida pelo `lastID` contido 
            // na constante `changes`, definida no passo anterior
            return { linhasAfetadas: result.changes }
        }
    }

    // retorno da função `initDatabase`, retorna um objeto contendo a classe Pessoa (que contêm os métodos para 
    // manipulação do banco de dados)
    return { Pessoa }
}
```

## 3.1. Teste do módulo de acesso ao banco de dados

**`./src/main.ts`**

> :warning: **ATENÇÃO** o arquivo `main.ts` somente será alterado neste momento para que seja possível executar teste a fim de verificar se o que foi desenvolvido até o momento está em ordem, nos próximos passos iremos remover estas alterações.

```typescript
import { initDatabase } from "./database"

void async function () {
    const db = await initDatabase()

    await db.Pessoa.adicionar({
        nome: "Caldo",
        sobrenome: "de Code",
        telefone: "47 9XXXX XXXX",
        email: "caldo@mail.com"
    })

    await db.Pessoa.adicionar({
        nome: "ONONO",
        sobrenome: "SEREI DELETADO",
        telefone: "47 9XXXX XXXX",
        email: "onono@mail.com"
    })

    await db.Pessoa.adicionar({
        nome: "Code",
        sobrenome: "de Cana",
        telefone: "47 9XXXX XXXX",
        email: "code@mail.com"
    })

    await db.Pessoa.alterar(1, {
        nome: "Caldo (alterado)",
        sobrenome: "de Code",
        telefone: "47 9XXXX XXXX",
        email: "caldo@mail.com"
    })

    await db.Pessoa.excluir(2)

    const pessoas = await db.Pessoa.listar()
    console.log("Todas as pessoas:", pessoas)

    const pessoa = await db.Pessoa.listarUm(3)
    console.log("Sr. Code de Cana:", pessoa)
}()
```

Se tudo ocorreu bem, ao executar o comando `npm run dev` no terminal, deve ver o seguinte resultado em seu terminal.

```bash
Todas as pessoas: [
  {
    id: 1,
    nome: 'Caldo (alterado)',
    sobrenome: 'de Code',
    email: 'caldo@mail.com',
    telefone: '47 9XXXX XXXX'
  },
  {
    id: 3,
    nome: 'Code',
    sobrenome: 'de Cana',
    email: 'code@mail.com',
    telefone: '47 9XXXX XXXX'
  }
]
Sr. Code de Cana: [
  {
    id: 3,
    nome: 'Code',
    sobrenome: 'de Cana',
    email: 'code@mail.com',
    telefone: '47 9XXXX XXXX'
  }
]
```

# 4. Criação de _endpoints_

`Endpoints` são caminhos para funcionalidades que a aplicações expõe para uso de terceiros, estes caminhos normalmente são acessíveis por HTTP, nesta aplicação para fins didáticos escreveremos todos os `endpoints` no arquivo principal `src\main.ts`, mas é extremamente importante que estas rotas de acesso sejam escritas de forma a propiciar manutenções futuras e não expor métodos e funções que possam pôr em risco a segurança da aplicação.
 
Abaixo temos o arquivo contendo todos os `endpoints` de nossa aplicação, nesta aplicação fizemos um `endpoint` para cada um dos métodos contidos na classe `Pessoa` definido no módulo `./src/Database.ts`, o arquivo está  comentado para que seja possível compreender seu funcionamento:
 
**`src\main.ts`**
 
> :warning: **ATENÇÃO** neste exemplo não será explicado como `try/catch` funcionam, vale pesquisa sobre o assunto caso não compreenda o funcionamento dessas diretivas, também neste exemplo para fins didáticos não serão efetuados todos os testes de dados recebidos nas requisições `HTTP` nos limitando apenas em retornar status de erro `500` quando não for possível efetuar qualquer ação, seja um erro de programação ou insucesso ao executar ação no banco de dados. 

```typescript
// importa o método initDatabse do módulo `./src/database.ts` criado no item 3 
import { initDatabase } from "./database"

// importa o a funcão padrão do modulo `express` e a armazena em uma constante chamada `express`, esta função será 
// utilizada para criar um objeto da classe `Express` que nos auxilia-ra a criar nosso servidor `HTTP` e os 
// `endpoints`de nossa aplicação 
import express from "express"

// importa a função `json` do módulo `body-parser`, esta função auxilia-rá a o recebimento de informações no 
// formato `json` em nossos `endpoins`
import { json } from "body-parser"

// cria a função principal de nossa aplicação e a executa imediatamente
void async function () {
    // aguarda a execução da função initDatabase e armazena seu resultado em uma constante aqui nomeada como `db`
    const db = await initDatabase()
    
    // executa a função `express` responsável por criar um objeto da classe `Express` e o armazena em uma constante 
    // chamada `app`
    const app = express()

    // executa o método `use` do objeto `Express` criado anteriormente, passando como parâmetro o retorno da 
    // execução da função `json` do , módulo `body-parser`, o método `use` é utilizado para que em todo e qualquer 
    // `endpoint` seja executado a função recebida como parâmetro (vale ressaltar que a função `json` retorna uma 
    // outra função e esta sim é executada em cada acesso de nossos `endpoints`, caso não entenda o conceito de 
    // `callbacks` sugiro breve pesquisa na internet ou contato com o Prof. Varela ;D)
    app.use(json())

    // executa o método `get` do objeto `Express` criado anteriormente, este método cria uma rota que responde 
    // quando uma requisição `HTTP` é feita utilizando o método de requisição `get`, o primeiro parâmetro deste 
    // método diz respeito a qual caminho o servidor deve responder, neste caso quando uma requisição `HTTP` do 
    // tipo `get` é efetuada no caminho `/pessoa`, o segundo parâmetro é um `callback` que recebe dois parâmetros, 
    // o primeiro aqui nomeado como `request` é utilizado para análise de informações enviadas do cliente para este 
    // servidor, já o segundo, aqui nomeado como `response` é utilizado para que o servidor envie informações de 
    // volta para o cliente 
    app.get("/pessoa", async (request, response) => {
        // aguarda a execução do método `listar` da classe `Pessoa` contida no objeto de retorno do método 
        // `initDatabase` do módulo `./src/database.ts` e armazena a mesma em uma constante nomeada 
        // `result`,
        const result = await db.Pessoa.listar()
        // converte o valor de `result` para `json` e responde a requisição
        response.json(result)
    })

    // executa o método `get` do objeto `Express` criado anteriormente, este método cria uma rota que responde 
    // quando uma requisição `HTTP` é feita utilizando o método de requisição `get`, o primeiro parâmetro deste 
    // método diz respeito a qual caminho o servidor deve responder, neste caso quando uma requisição `HTTP` do 
    // tipo `get` é efetuada no caminho `/pessoa/'variavel'`, o segundo parâmetro é um `callback` que recebe dois 
    // parâmetros, o primeiro aqui nomeado como `request` é utilizado para análise de informações enviadas do 
    // cliente para este servidor, já o segundo, aqui nomeado como `response` é utilizado para que o servidor envie 
    // informações de volta para o cliente
    app.get("/pessoa/:id", async (request, response) => {
        // tenta executar o bloco
        try {
            // busca no objeto `request` que contém informações sobre a requisição, um objeto objeto filho chamado 
            // `params`, este por sua vez contém os valores definidos no caminho da requisição, neste caso temos o 
            // parâmetro nomeado `:id`, então este valor é convertido em um número inteiro e o mesmo é armazenado 
            // em uma constante nomeada como `ìd`
            const id = parseInt(request.params.id)
            // aguarda a execução do método `listarUm` da classe `Pessoa` contida no objeto de retorno do método 
            // `initDatabase` do módulo `./src/database.ts` e armazena a mesma em uma constante 
            // nomeada `result`, passa como parâmetro da função o valor tratado no passo anterior
            const result = await db.Pessoa.listarUm(id)
            // converte o valor de `result` para `json` e responde a requisição
            response.json(result)
        } 
        
        // caso algum erro ocorra no bloco `try`, atribui objeto contendo detralhes deste erro para o parâmetro `e`
        catch (e) {
            // muda o staus de resposta do `HTTP` para `500`, que diz respeito a erro genérico ocorrido por parte 
            // do servidor
            response.statusCode = 500
            // converte o detalhes do erro para `json` e responde a requisição
            response.json(e)
        }
    })

    // executa o método `post` do objeto `Express` criado anteriormente, este método cria uma rota que responde 
    // quando uma requisição `HTTP` é feita utilizando o método de requisição `post`, o primeiro parâmetro deste 
    // método diz respeito a qual caminho o servidor deve responder, neste caso quando uma requisição `HTTP` do 
    // tipo `post` é efetuada no caminho `/pessoa`, o segundo parâmetro é um `callback` que recebe dois parâmetros, 
    // o primeiro aqui nomeado como `request` é utilizado para análise de informações enviadas do cliente para este 
    // servidor, já o segundo, aqui nomeado como `response` é utilizado para que o servidor envie informações de 
    // volta para o cliente
    app.post("/pessoa", async (request, response) => {
        // tenta executar o bloco
        try {   
            // aguarda a execução do método `adicionar` da classe `Pessoa` contida no objeto de retorno do método 
            // `initDatabase` do módulo `./src/database.ts` e armazena a mesma em uma constante 
            // nomeada `result`, passa como parâmetro o valor (como objeto) já tratato pelo método `json` do módulo 
            // `body-parser`
            const result = await db.Pessoa.adicionar(request.body)
            // converte o valor de `result` para `json` e responde a requisição
            response.json(result)
        } 
        
        // caso algum erro ocorra no bloco `try`, atribui objeto contendo detralhes deste erro para o parâmetro `e`
        catch (e) {
            // muda o staus de resposta do `HTTP` para `500`, que diz respeito a erro genérico ocorrido por parte 
            // do servidor
            response.statusCode = 500
            // converte o detalhes do erro para `json` e responde a requisição
            response.json(e)
        }
    })

    // executa o método `put` do objeto `Express` criado anteriormente, este método cria uma rota que responde 
    // quando uma requisição `HTTP` é feita utilizando o método de requisição `put`, o primeiro parâmetro deste 
    // método diz respeito a qual caminho o servidor deve responder, neste caso quando uma requisição `HTTP` do 
    // tipo `put` é efetuada no caminho `/pessoa/'variavel'`, o segundo parâmetro é um `callback` que recebe dois 
    // parâmetros, o primeiro aqui nomeado como `request` é utilizado para análise de informações enviadas do 
    // cliente para este servidor, já o segundo, aqui nomeado como `response` é utilizado para que o servidor envie 
    // informações de volta para o cliente
    app.put("/pessoa/:id", async (request, response) => { 
        // tenta executar o bloco
        try {
            // busca no objeto `request` que contém informações sobre a requisição, um objeto objeto filho chamado 
            // `params`, este por sua vez contém os valores definidos no caminho da requisição, neste caso temos o 
            // parâmetro nomeado `:id`, então este valor é convertido em um número inteiro e o mesmo é armazenado 
            // em uma constante nomeada como `ìd`
            const id = parseInt(request.params.id)
            // aguarda a execução do método `alterar` da classe `Pessoa` contida no objeto de retorno do método 
            // `initDatabase` do módulo `./src/database.ts` e armazena a mesma em uma constante 
            // nomeada `result`, passa como primeiro parâmetro da função o valor tratado no passo anterior, passa 
            // como segundo parâmetro o valor já tratato pelo método `json` do módulo `body-parser`
            const result = await db.Pessoa.alterar(id, request.body)
            // converte o valor de `result` para `json` e responde a requisição
            response.json(result)
        } 
        
        // caso algum erro ocorra no bloco `try`, atribui objeto contendo detralhes deste erro para o parâmetro `e`
        catch (e) {
            // muda o staus de resposta do `HTTP` para `500`, que diz respeito a erro genérico ocorrido por parte 
            // do servidor
            response.statusCode = 500
            // converte o detalhes do erro para `json` e responde a requisição
            response.json(e)
        }    
    })

    // executa o método `delete` do objeto `Express` criado anteriormente, este método cria uma rota que responde 
    // quando uma requisição `HTTP` é feita utilizando o método de requisição `delete`, o primeiro parâmetro deste 
    // método diz respeito a qual caminho o servidor deve responder, neste caso quando uma requisição `HTTP` do 
    // tipo `delete` é efetuada no caminho `/pessoa/'variavel'`, o segundo parâmetro é um `callback` que recebe 
    // dois parâmetros, o primeiro aqui nomeado como `request` é utilizado para análise de informações enviadas do 
    // cliente para este servidor, já o segundo, aqui nomeado como `response` é utilizado para que o servidor envie 
    // informações de volta para o cliente
    app.delete("/pessoa/:id", async (request, response) => {
        // tenta executar o bloco
        try {
            // busca no objeto `request` que contém informações sobre a requisição, um objeto objeto filho chamado 
            // `params`, este por sua vez contém os valores definidos no caminho da requisição, neste caso temos o 
            // parâmetro nomeado `:id`, então este valor é convertido em um número inteiro e o mesmo é armazenado 
            // em uma constante nomeada como `ìd`
            const id = parseInt(request.params.id)
            // aguarda a execução do método `excluir` da classe `Pessoa` contida no objeto de retorno do método 
            // `initDatabase` do módulo `./src/database.ts` e armazena a mesma em uma constante 
            // nomeada `result`, passa como parâmetro da função o valor tratado no passo anterior
            const result = await db.Pessoa.excluir(id)
            // converte o valor de `result` para `json` e responde a requisição
            response.json(result)
        } 
        
        // caso algum erro ocorra no bloco `try`, atribui objeto contendo detralhes deste erro para o parâmetro `e`
        catch (e) {
            // muda o staus de resposta do `HTTP` para `500`, que diz respeito a erro genérico ocorrido por parte 
            // do servidor
            response.statusCode = 500
            // converte o detalhes do erro para `json` e responde a requisição
            response.json(e)
        }
    })

     // executa o método `listen` do objeto `Express` criado anteriormente, este método inicia o servidor, o 
     // primeiro parâmetro diz respeito em qual porta o serviço deve ser executado, e o segundo parâmetro é um 
     // `callback` executado assim que o servidor inicializar, neste caso em específico o `callback` tem apenas uma 
     // instrução que imprime o terminal uma frase informando foi inicializado
    app.listen(8080, () => console.log("⚡ Servidor HTTP inicado!"))
}()
```

# 5. Testar a API
 
Sem um cliente não é possível fazer o teste dos `endpoints` criados, por isso utilizaremos um plugin do `VSCode` chamado `REST Client` (plugin identifier `humao.rest-client`), para substituir temporariamente nossa aplicação cliente.
 
> Para instalar extensões no `VSCode`, vá até o menu `View > Extensions` ou pressione o as teclas de atalho `CTRL + SHIFT + X` em seu teclado, ou clique no último ícone da barra lateral (Activity Bar), então pesquise pelo nome da extensão e clique em instalar.

Com este plugin é possível e executar requisições `HTTP`, para isso é necessário a criação de um arquivo com extensão `.http` ou `.rest`, cada arquivo pode ter uma ou mais requisições separadas por `###`.

> vale ressaltar que aqui somente para fins didáticos as requisições não utilizarão recursos avançados deste plugin, mas sugiro que pesquise sobre o mesmo pois ele tem uma infinidade de funcionalidades úteis.

Edite o arquivo `tutorial\server\test-pessoa.http` que criamos anteriormente com o seguinte conteúdo:

**`tutorial\server\test-pessoa.http`**
```
### BUSCAR DADOS DE TODAS AS PESSOAS

GET http://127.0.0.1:8080/pessoa HTTP/1.1

### BUSCAR DADOS DE UMA PESSOA POR ID

GET http://127.0.0.1:8080/pessoa/1 HTTP/1.1

### ADICIONAR NOVA PESSOA

POST http://127.0.0.1:8080/pessoa HTTP/1.1
content-type: application/json

{
    "nome": "Caldo",
    "sobrenome": "de Code",
    "telefone": "47 9XXXX XXXX",
    "email": "caldo@mail.com"
}

### ALTERAR UMA PESSOA PELO ID

PUT http://127.0.0.1:8080/pessoa/1 HTTP/1.1
content-type: application/json

{
    "nome": "Caldo (ALTERADO)",
    "sobrenome": "de Code",
    "telefone": "47 9XXXX XXXX",
    "email": "ALTERADO@mail.com"
}

### EXCLUIR PESSOA POR ID

DELETE http://127.0.0.1:8080/pessoa/1 HTTP/1.1

```

É possível perceber que logo à cima de cada uma das requisições escritas existe a frase `Send Request`, se clicado na mesma o plugin tentará fazer uma requisição, porém o servidor ainda não está em funcionamento, por isso é necessário iniciá-lo, digite no terminal `npm run dev`, assim que a frase de inicialização aparecer no terminal será possível executar os testes, clicando na frase `Send Request` ou selecionando uma das requisição e pressionando o seguinte atalho `CTRL + ALT + R`.