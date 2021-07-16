import style from "bundle-text:./form-pessoa.scss"
import html from "bundle-text:./form-pessoa.html"

class FormPessoa extends HTMLElement {
    private _root = this.attachShadow({mode: "closed"})
    private _style = document.createElement("style")
    private _main = document.createElement("main")
    
    constructor() {
        super()
        this._style.innerHTML = style
        this._main.innerHTML = html
        this._root.append(
            this._style,
            this._main
        )
    }
}

customElements.define("comp-form-pessoa", FormPessoa)