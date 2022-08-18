import { LitElement, html, css } from 'lit';

export class OlappTblFiltros extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                background-color:#6b6a6a57;
                position:relative
            }
            .window-filter{
                color:grey;
                position:absolute;
                background-color: #f5f5f5;
                min-width:200px;
                padding:10px;
                margin:2px;
                z-index:2;
                box-shadow:5px 5px 10px grey;
                border-radius:5px;
                font-weight:100;
                max-height:300px;
                overflow:hidden
            }
            input {
                width:90%;
                height:20px;
                font-size:16px
            }
            .elemento-select{
                display:grid;
                grid-template-columns:20px 1fr;
                height: 30px;
                align-items: center;
                border-bottom: 1px solid;
            }
            .elemento-select p {
                margin:0px;
                padding:0px
            }
            .list{
                font-size:13px;
                height:140px;
                overflow-y:scroll
            }
            .btn{
                padding:3px;
                margin:3px;
                border-radius:5px;
                cursor:pointer;
                background-color:#1175e7;
                color:white;
                height:20px
            }
        `
    ];
    static get properties() {
        return {
            data: { type: Object, reflect: true },
            filtrada: { type: Object, reflect: true },
            identificador: { type: String, reflect: true },
            visible: { type: String, reflect: true },
            initFilter: { type: String, reflect: true },
            copia:{ type: Array, reflect: true },
        };
    }
    constructor() {
        super()
        this.data = {}
        this.identificador = ""
        this.visible = ""
    }
    connectedCallback(){
        super.connectedCallback()
        this.copia=[...this.data.data]
        console.log("swd")
    }
    render() {
        return html`<div class="window-filter">
            <div>
                Ordenar de menor a mayor
            </div>
            <hr>
            <div>
                Ordenar de mayor a menor
            </div>
            <hr>
            <div>
                <input @keyup=${this._filtroTexto} type="text"/>
            </div>
            <hr>
            <div class="list">
                ${this._render()}
            </div>
            <div class="btn" @click=${this._aceptar}>ACEPTAR</div>
        </div>`;
    }
    _render() {
        return this.copia.map((element, index) => {
            let selected = this.filtrada.find(ele => ele == element)
            return html`<div class="elemento-select">
                    <input type="checkbox" @change=${this._cambio} value=${element} key=${index} checked=${selected != -1 ? true : false}/>
                    <p>${element}</p>
                </div>`
        })
    }
    _cambio(e){
        let ele = e.target.value
        console.log(e.target.checked)
        if(e.target.checked){
            this.filtrada.push()
        }else{
            let indice = this.filtrada.findIndex(element => element==ele)
            let n = this.filtrada.splice(indice, 1)
            this.copia=this.filtrada
        }
    }
    _filtroTexto(e){
        let texto = e.target.value
        if(texto.length > 1){
            let n = this.data.data.filter(element=> element.search(texto) != -1 ? true : false)
            this.copia = n
            this.filtrada = n
        }else{
            this.copia = this.data.data
            this.filtrada = []
        }
    }
    _aceptar(){
        this.dispatchEvent(new CustomEvent('olapp-datos-filtro', {
            bubbles:true,
            composed:true,
            detail:{
                identificador:this.identificador,
                data: this.copia,
                //content: this.pages[this.activo]
            }
        }))
    }
}
customElements.define('olapp-tbl-filtros', OlappTblFiltros);
