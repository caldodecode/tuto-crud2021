import { initDatabase } from "./database"
import express from "express"
import { json } from "body-parser"

void async function () {
    const db = await initDatabase()
    const app = express()

    app.use(json())

    app.get("/pessoa", async (request, response) => {
        const result = await db.Pessoa.listar()
        response.json(result)
    })

    app.get("/pessoa/:id", async (request, response) => {
        try {
            const id = parseInt(request.params.id)
            const result = await db.Pessoa.listarUm(id)
            response.json(result)
        } catch (e) {
            response.statusCode = 500
            response.json(e)
        }
    })

    app.post("/pessoa", async (request, response) => {
        try {   
            const result = await db.Pessoa.adicionar(request.body)
            response.json(result)
        } catch (e) {
            response.statusCode = 500
            response.json(e)
        }
    })

    app.put("/pessoa/:id", async (request, response) => { 
        try {
            const id = parseInt(request.params.id)
            const result = await db.Pessoa.alterar(id, request.body)
            response.json(result)
        } catch (e) {
            response.statusCode = 500
            response.json(e)
        }    
    })

    app.delete("/pessoa/:id", async (request, response) => {
        try {
            const id = parseInt(request.params.id)
            const result = await db.Pessoa.excluir(id)
            response.json(result)
        } catch (e) {
            response.statusCode = 500
            response.json(e)
        }
    })

    app.listen(8080, () => console.log("⚡ Servidor HTTP inicado!"))
}()