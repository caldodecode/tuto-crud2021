"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
void async function () {
    const db = await database_1.initDatabase();
    const app = express_1.default();
    app.use(body_parser_1.json());
    app.get("/pessoa", async (request, response) => {
        const result = await db.Pessoa.listar();
        response.json(result);
    });
    app.get("/pessoa/:id", async (request, response) => {
        try {
            const id = parseInt(request.params.id);
            const result = await db.Pessoa.listarUm(id);
            response.json(result);
        }
        catch (e) {
            response.statusCode = 500;
            response.json(e);
        }
    });
    app.post("/pessoa", async (request, response) => {
        try {
            const result = await db.Pessoa.adicionar(request.body);
            response.json(result);
        }
        catch (e) {
            response.statusCode = 500;
            response.json(e);
        }
    });
    app.put("/pessoa/:id", async (request, response) => {
        try {
            const id = parseInt(request.params.id);
            const result = await db.Pessoa.alterar(id, request.body);
            response.json(result);
        }
        catch (e) {
            response.statusCode = 500;
            response.json(e);
        }
    });
    app.delete("/pessoa/:id", async (request, response) => {
        try {
            const id = parseInt(request.params.id);
            const result = await db.Pessoa.excluir(id);
            response.json(result);
        }
        catch (e) {
            response.statusCode = 500;
            response.json(e);
        }
    });
    app.listen(8080, () => console.log("⚡ Servidor HTTP inicado!"));
}();
