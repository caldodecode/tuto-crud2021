// importa a biblioteca `sqlite3`, que servirá de driver para acesso ao banco de dados
import sqlite3 from "sqlite3"

// importa a biblioteca `sqlite`, que  servirá para fazermos requisições assíncronas no banco de dados sqlite
import { open } from "sqlite"


// cria e exporta (como item da biblioteca) a função assíncrona `initdatabase`, responsável por conectar-se, criar a 
// tabelas se necessário e manipular dados no banco de dados, esta função retorna um objeto contendo abstrações para 
// cada uma das ações a serem executadas no banco de dados
export async function initDatabase() {
    // aguarda conectar-se no arquivo `database.db` (cria o mesmo caso necessário), utilizando o `sqlite3` como driver, 
    // e assim que terminar a execução, armazena numa constante chamada `db` um objeto que permite a manipulação do 
    // banco de dados
    const db = await open({
        filename: "database.db",
        driver: sqlite3.Database
    })

    // aguarda a criação da tabela `pesssoa` caso a mesma não exista no banco de dados
    await db.exec(`
        CREATE TABLE IF NOT EXISTS pessoa  (
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
    class Pessoa {
        // define método estático que lista todas as pessoas contidas na tabela pessoas do banco de dados
        static async listar() {
            // aguarda execução da busca de todos os dados contidos na tabela pessoa e assim que retornado as armazena 
            // em uma constante chamada `result`
            const result = await db.all(`SELECT * FROM pessoa`)
            // retorna os dados da constante `result`
            return result
        }

        // define método estático que lista os dados de uma pessoa específica contido na tabela pessoa, este método 
        // recebe um parâmetro chamado `id` do tipo `number` que será utilizado para selecionar somente os dados da 
        // pessoa que tenha este `id`
        static async listarUm(id: number) {
            // aguarda execução da busca de dados de uma pessoa específica filtrada pelo campo `id`, contida na tabela 
            // pessoa e assim que retornado as armazena em uma constante chamada `result`
            const result = await db.all(`SELECT * FROM pessoa WHERE id=:id`, { ":id": id })
            // retorna os dados da constante `result`
            return result
        }

        // define método estático que adiciona uma pessoa no banco de dados, esta função recebe um parâmetro chamado 
        // `dados` do tipo `TipoDadosDePessoa`, estes dados serão utilizados para inserir uma nova pessoa no banco de 
        // dados
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
            // retorna um objeto contendo uma chave chamada `id` que é recebida pelo valor `lastID` contido na constante 
            // `result`, definida no passo anterior
            return { id: result.lastID }
        }

        // define método estático que altera dados de uma pessoa no banco de dados, esta função recebe um parâmetro 
        // chamado `id` do tipo `number` que será utilizado para selecionar para alteração somente os dados da pessoa 
        // que tenha este `id`, além deste parâmetro essa função também recebe um parâmetro chamado `dados` do tipo 
        // `TipoDadosDePessoa`, estes dados serão utilizados para alterar os dados de pessoa
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
            // retorna um objeto contendo uma chave chamada `linhasAfetadas` que é recebida pelo `lastID` contido na 
            // constante `changes`, definida no passo anterior
            return { linhasAfetadas: result.changes }
        }

        // define método estático que exclui dados de uma pessoa no banco de dados, esta função recebe um parâmetro 
        // chamado `id` do tipo `number` que será utilizado para selecionar para exclusão somente os dados da pessoa que 
        // tenha este `id`
        static async excluir(id: number) {
            // aguarda a execução da exclusão dos dados da pessoa com `id` determinado
            const result = await db.run(`DELETE FROM pessoa WHERE id=:id`, { ":id": id })
            // retorna um objeto contendo uma chave chamada `linhasAfetadas` que é recebida pelo `lastID` contido na 
            // constante `changes`, definida no passo anterior
            return { linhasAfetadas: result.changes }
        }
    }

    // retono da função `initDatabase`, retorna um objeto contendo a classe Pessoa (que contêm os métodos para 
    // manipulação do banco de dados)
    return { Pessoa }
}