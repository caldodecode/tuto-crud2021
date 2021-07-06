
 
1 - Servidor
============


1.1 - Conhecimentos Necessários
------------------------

- lógica de programação
- uso do terminal
- json
- javascript
- protocolo http

2 - Preparação do Ambiente de Desenvolvimento
---------------------------------------------
 
Antes de iniciar é necessário certificar-se de que você possui o `NodeJs` e o `NPM` instalados em seu computador:
- para usuários windows acesse [o site do nodejs para download](https://nodejs.org/en/download/), baixe a versão adequada para sua máquina, e faça o clássico `next next finish`
- para usuários Linux:
   - Fedora: `dnf install nodejs`
   - Ubuntu: `apt install nodejs npm`
 
### 2.1 - Estrutura de arquivos inicial
 
Crie manualmente a seguinte estrutura de arquivos:
 
```bash
tutorial/
└── server/
    └── src/
        ├── main.ts
        └── create-database.ts
```
 
### 2.2 - Instalação de dependências
 
Arraste a pasta `server` para dentro de seu `vscode`, e abra o terminal, pelo menu `Terminal\New Terminal`, execute os comandos abaixo:
 
 
```bash
# criação do arquivo de configuração do projeto
npm init -y
 
# instalação de bibliotecas necessárias para execução da aplicação
npm install express sqlite sqlite3
 
# instalação de bibliotecas necessárias para desenvolvimento da aplicação
npm install --save-dev typescript ts-node
 
# instalação de bibliotecas de tipos, auxiliares durante o desenvolvimento
npm install --save-dev @types/node @types/express @types/sqlite3
 
# criação do arquivo de configuração do typescript
npx tsc --init
```
 
#### 2.2.1 - O que aconteceu quando é executado o comando `npm init -y`
 
Quando você executa esse comando o `npm` cria um arquivo chamado `package.json`, este arquivo é responsável por manter informações sensiveis ao seu projeto como, quais bibliotecas são necessárias para o desenvolvimento e execução da aplicação, comandos para execução e depuração da aplicação, autor, palavras chaves, versão da aplicação dentre outras.
 
#### 2.2.2 - O que aconteceu quando é executado o comando `npm install express sqlite sqlite3`
 
Ao executar esse comando o `npm` baixa três bibliotecas `express`, `sqlite` e `sqlite3`, bem como as interdependências destas bibliotecas:
- O `npm` baixa e salva todas estas bibliotecas em uma pasta chamada `node_modules`.
- Cada uma das bibliotecas podem depender de outras bibliotecas, portanto o `npm` se encarregará em baixar também estas bibliotecas e assim como as outras irá colocá-las na pasta `node_modules`.
- Para controle do projeto após baixar as bibliotecas, o `npm` as lista-ra no arquivo `package.json` dentro da chave `dependencies`.
- As interdependências destas bibliotecas são listadas no arquivo `package-lock.json`, para controle interno do `npm`.
 
Abaixo temos uma breve descrição da utilidade de cada uma dessas bibliotecas:
 
- *express*: Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web. [maiores informações no site oficial](https://expressjs.com/).
- *sqlite3*: Esta biblioteca permite a manipulação de bancos de dados sqlite. [maiores informaçõe no site oficial](https://github.com/mapbox/node-sqlite3).
- *sqlite*: Esta biblioteca permite a utilização da biblioteca `sqlite3` de maneira assíncrona. [maiores informaçõe no site oficial](https://github.com/kriasoft/node-sqlite#readme).
 
#### 2.2.3 - O que aconteceu quando é executado o comando `npm install --save-dev typescript ts-node`
 
Assim como o comando anterior, este também instala bibliotecas, nesta caso ele instala a biblioteca `typescript` e `ts-node`, estas bibliotecas são necessárias somente no momento de desenvolvimento da aplicação por isso adicionamos o parâmetro `--save-dev` ao comando, a única coisa que este comando difere do anterior é que ao invés de criar as referências dentro da chave `dependencies` do arquivo `package.json`, esta cria dentro da chave `devDependencies`, marcando-as assim como dependências necessárias somente para o desenvolvimento da aplicação.
Abaixo temos uma breve descrição da utilidade de cada uma dessas bibliotecas:
- *typescript*: TypeScript é um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem. [maiores informaçõe no site oficial](https://www.typescriptlang.org/)
- *ts-node*: Permite que o typescript seja executado sem a necessidade de criar os arquivos de distribuição da aplicação, facilitando assim o desenvolvimento da aplicação. [maiores informaçõe no site oficial](https://github.com/TypeStrong/ts-node#readme)
 
#### 2.2.4 - O que aconteceu quando é executado o comando `npm install --save-dev @types/node @types/express @types/sqlite3`
 
Assim como o comando anterior, instala bibliotecas como bibliotecas necessárias para o desenvolvimento da aplicação, porém estas bibliotecas são utilizadas para ajudar o `vscode` com o `auto complete`, facilitando assim a escrita do código, de fato estas bibliotecas não são essenciais para o desenvolvimento mas ela ajuda o `typescript` e consequentemente o `vscode` a entender os tipos e dependências das bibliotecas `express`, `sqlite3` e do próprio `NodeJs`.
 
#### 2.2.5 - O que aconteceu quando é executado o comando `npx tsc --init`
 
Cria o arquivo de configuração do `typescript`, `tsconfig.json`, este arquivo é importante para informar como os arquivos `javascript` serão criados, neste arquivo temos informações como, para qual versão `javascript` o `typescript` deve compilar, em qual pasta esses arquivos devem ser gerados, dentre outras informações pertinentes.
 
> É importante pontuar que neste momento utilizamos o comando com o prefixo `npx`,  este prefixo é utilizado quando se faz necessário executar um binário de uma  biblioteca instalada localmente ou seja, que esta dentro da pasta `node_modules`, neste caso executamos o comando `tsc`, sigla para typescript compiler, com o parâmetro `--init`
 
### 2.3 - Estrutura final de arquivos
 
```bash
tutorial/                     # criado pelo desenvolvedor
└── server/                   # criado pelo desenvolvedor
    ├── node_modules/          # criado ao executar `npm install ...`
    ├── dist/                  # será criado futuramente ao executar `npm run build`
    ├── src/                   # criado pelo desenvolvedor
    │   ├── main.ts            # criado pelo desenvolvedor
    │   └── create-database.ts # criado pelo desenvolvedor
    ├── package.json           # criado ao executar `npm init`
    ├── package-lock.json      # criado ao executar `npm install ...`
    └── tsconfig.json          # criado ao executar `npx tsc --init`
```
 
### 2.4 - Configuração do projeto `package.json`
 
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
 
é necessário alterar a linha `"main" : "index.js"` para `"main" : "dist/main.js"`, pois quando configuramos o arquivo `tsconfig.json` iremos informar que os arquivos `javascript` serão gerados em uma pasta de nome `dist`, o porquê deste nome será explicado no passo em que falaremos sobre a configuração do `typescript`.
 
Além de alterar o caminho do arquivo main, também precisamos adicionar dois `scripts`, um que usaremos para criação dos arquivos final da aplicação e outro que usaremos durante os testes, então entre a linha `"scripts": {` e `"test": "..."` iremos adicionar `"dev": "ts-node-script src/main.ts",`, este script sera utilizado durante o desenvolvimento da aplicação e para criação da aplicação, logo após esta linha adicionaremos `"build": "tsc",`.
 
pelo fato de termos adicionado esses dois comandos no `package.json`, agora é possível executar chamá-los da seguinte maneira pela linha de comando `npm run dev` e `npm run debug`, o primeiro comando usaremos para os testes e o segundo para a criação da aplicação final.
 
o resultado final do nossa arquivo `package.json` deve ser a seguinte:
 
```jsonc
{
 "name": "server",
 "version": "1.0.0",
 "main": "dist/main.js",                                   // alterado
 "scripts": {
   "dev": "ts-node-script src/main.ts",                    // adicionado
   "build": "tsc",                                         // adicionado
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
 
 
### 2.5 - Configuração do transpilador/typescript `tsconfig.json`
 
O arquivo `tsconfig.json` que foi gerado no momento da execução do comando `npx tsc --init` é um arquivo grande, porém para este projeto vamos nos focar em apenas dois atributos definidos nele o `"target"`, que define a versão do `javascript` para a qual iremos compilar/transpilar o `typescript` e o `"outDir"`, que é a pasta onde os arquivos `javascript` serão salvos.
 
Para este projeto a linha `"target": "es5",` deve ser alterada para `"target": "ES2021",` e a linha `// "outDir": "./",` deve ser descomentada e alterada para `"outDir": "./dist",`, o nome da pasta `dist` é uma convenção e abreviação do termo em inglês `distributable` que significa `distribuível`, é nessa pasta que ficam os arquivos que são distribuidos para os usuários após o fechamento de uma versão.
 
 
De forma resumida, o arquivo `tsconfig.json` ficará parecido com o seguinte:
 
```jsonc
{
 "compilerOptions": {
   "target": "ES2021",                             // alterado
   "module": "commonjs",
   "outDir": "./dis",                              // alterado
   "strict": true,
   "esModuleInterop": true,
   "skipLibCheck": true,
   "forceConsistentCasingInFileNames": true
 }
}
```
 
### 2.6 - Testando/executando o projeto
 
```bash
npm run build
```
 
```bash
npm run dev
```
 
3 -
---------------------------------------------

