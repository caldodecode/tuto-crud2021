//
import stringStyle from "bundle-text:./form-pessoa.scss"

//
import stringHtml from "bundle-text:./form-pessoa.html"

//
class FormPessoa extends HTMLElement {
    //
    private _root = this.attachShadow({ mode: "closed" })
    
    //
    constructor() {
        //
        super()

        //
        const style = document.createElement("style")
        const main = document.createElement("main")

        //
        main.innerHTML = stringStyle
        style.innerHTML = stringHtml

        //
        this._root.append(style, main)
    }
}

//
customElements.define("comp-form-pessoa", FormPessoa)