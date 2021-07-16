"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 
const database_1 = require("./database");
void async function () {
    const db = await database_1.initDatabase();
    await db.Pessoa.adicionar({
        nome: "Caldo",
        sobrenome: "de Code",
        telefone: "47 9XXXX XXXX",
        email: "caldo@mail.com"
    });
    await db.Pessoa.adicionar({
        nome: "ONONO",
        sobrenome: "SEREI DELETADO",
        telefone: "47 9XXXX XXXX",
        email: "onono@mail.com"
    });
    await db.Pessoa.adicionar({
        nome: "Code",
        sobrenome: "de Cana",
        telefone: "47 9XXXX XXXX",
        email: "code@mail.com"
    });
    await db.Pessoa.alterar(1, {
        nome: "Caldo (alterado)",
        sobrenome: "de Code",
        telefone: "47 9XXXX XXXX",
        email: "caldo@mail.com"
    });
    await db.Pessoa.excluir(2);
    const pessoas = await db.Pessoa.listar();
    console.log("Todas as pessoas:", pessoas);
    const pessoa = await db.Pessoa.listarUm(3);
    console.log("Sr. Code de Cana:", pessoa);
}();
