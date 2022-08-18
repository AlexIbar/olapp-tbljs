import { LitElement, html, css } from 'lit';
import { btn } from '../style.css';
import './olapp-reorder-column'

export class OlappTblFiltros extends LitElement {
    static styles = [
        btn,
        css`
            :host>div{
                position:absolute;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
                background-color:rgba(0,0,0,25%);
                display:flex;
                justify-content:center;
                padding-top:30px;
                box-sizing:border-box;
                align-items:flex-start
            }
            .window-filter{
                background-color:white;
                width:300px;
                padding:10px;
                box-sizing:border-box;
                border-radius:10px;
                height:460px;
                overflow:hidden
            }
            .section-filter{
                padding-top:10px;
                height:calc(100% - 51px - 30px);
                display:grid;
                grid-template-rows:31px minmax(200px, 1fr) 50px;
                grid-gap:5px
            }
            .body-section{
                overflow-y:scroll
            }
            input[type="text"]{
                width: 90%;
                display: block;
                margin: auto;
                height: 25px;
                font-size: 16px;
            }
            .element-check{
                display: grid;
                grid-template-columns: 30px 1fr;
                align-items: center;
                margin-left: 10px;
                height:30px
            }
            input[type="checkbox"]{
                width:20px;
                height:20px
            }
            .titulo{
                text-align: center;
                font-size: 1.3em;
                font-weight: 600;
            }

        `
    ];
    static get properties() {
        return {
            maestros: { type: Object},
            filtrada: { type: Object},
            //identificador: { type: String, reflect: true },
            visible: { type: String},
            //initFilter: { type: String, reflect: true },
            copia:{ type: Array},
            columns: {type:Object},
            columnsKeys:{type:Array}
        };
    }
    constructor() {
        super()
    }
    connectedCallback(){
        super.connectedCallback()
        const n =this.maestros[this.visible].data
            this.filtrada = [...n]
            let maes=this.maestros[this.visible].data
            this.copia = [...maes]
    }
    firstUpdated(){
    }
    render() {
        console.log(this.columns)
        return html`<div @click=${this._cerrar} id="cerrar">
            <div class="window-filter">
                <div class="titulo">${this.columns[this.visible].title}</div>
                <olapp-reorder-column .columns=${this.columns}></olapp-reorder-column>
                <section class="section-filter">
                    <input type="text" @keyup=${this._filtroTexto}>
                    <div class="body-section">
                        <div class="element-check">
                        <input type="checkbox" @change=${this._seleccionar} checked=${this.filtrada.length == this.copia.length ? true : false}/> <div>Seleccionar</div>
                        </div>
                    ${this._renderInit()}
                    </div>
                    <div>
                        <div class="btn" @click=${this._aceptar}>Aceptar</div>
                    </div>
                </section>
            </div>
        </div>`;
    }
    _renderInit() {
        return this.copia.map((element)=>{
            let checked = this.filtrada.find(ele=> ele== element)
            if(checked == -1 || checked == undefined){
                checked= false
            }else {
                checked=true
            }
            return html`<div class="element-check">
                <input type="checkbox" key=${element} @change=${this._cambio} ?checked=${checked}/> <div>${element}</div>
            </div>`
        })
    }
    _cambio(e){
        let key = e.target.getAttribute('key')
        if(e.target.checked){
            this.filtrada.push(key)
        }else{
            let indice = this.filtrada.findIndex(element => element==key)
            this.filtrada.splice(indice, 1)
        }
    }
    _filtroTexto(e){
        let texto = e.target.value.toLowerCase()
        let maes = [...this.maestros[this.visible].data]
        if(texto.length >= 0){
            let n = maes.filter(element=>{
                let ele = element.toLowerCase()
                return ele.search(texto) != -1 ? true : false
            })
            this.copia = n
            this.filtrada=[...n]
        }else{
            this.copia = [...this.maestros[this.visible].data]
            this.filtrada =  [...this.maestros[this.visible].data]
        }
    }
    _aceptar(){
        this.dispatchEvent(new CustomEvent('olapp-datos-filtro', {
            bubbles:true,
            composed:true,
            detail:{
                identificador:this.visible,
                data: this.filtrada,
                type: this.maestros[this.visible].type
            }
        }))
    }
    _cerrar(e){
        let id=e.target.getAttribute('id')
        if(id =="cerrar"){
            this.dispatchEvent(new CustomEvent('olapp-close-window',{
                bubbles:true,
                composed:true,
                detail:{
                    window: "filtro",
                    //content: this.pages[this.activo]
                }
            }))
        }
    }
    _seleccionar(e){
        let isCheckedFiltro = e.target.checked
        if(isCheckedFiltro){
            this.filtrada =this.copia
        }
        if(!isCheckedFiltro) this.filtrada = []
    }
}
customElements.define('olapp-tbl-filtros', OlappTblFiltros);
