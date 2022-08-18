import { LitElement, html, css } from 'lit';
import { done } from '../icons/icons';
import { styleGeneral } from '../style.css';
export class OlappRow extends LitElement {
    static styles = [
        styleGeneral,
        css`
            td{
                padding: 5px;
                /* border-radius: 5px; */
                box-sizing: border-box;
                height: 58px;
                align-items: center;
                /* align-self: center; */
                display: flex;
            }
            .successful{
                background-color:rgb(5 186 5 / 20%);
                text-align:center
            }
            .warning{
                background-color:rgba(243, 243, 156, 0.68);
                text-align:center
            }
            .danger{
                background-color:#ffdddd;
                text-align:center
            }
            .centrar{
                justify-content:center
            }
        `
    ]
    static get properties() {
        return {
            columns:{type:Object},
            encabezado: { type: Array},
            cuerpo:{type:Object},
            isChecked:{
                type:Boolean,
                reflect:true
            },
            selectMultiple: {type:Boolean},
            selected:{type:String}
        };
    }
    constructor(){
        super()
        this.encabezado=[]
        this.cuerpo={}
        this.isChecked=false
    }
    firstUpdated(){
        this.shadowRoot.addEventListener('dblclick', ()=> this._viewContent(this))
    }
    updated(){
    }
    render(){
        this.encabezado = Object.keys(this.columns)
        return html`${this.renderizarRow()}`
    }
    renderizarRow(){
        let n = this.encabezado.map((ele)=>{
            let color = this.verificaEstado(ele, this.cuerpo[this.columns[ele].identificador])
            if (ele != 'option') return html`<td class=${this.isChecked ? 'row_selected '+color : color}><div>${this.cuerpo[this.columns[ele].identificador]}</div></td>`
        })
        let input = [html`<td class=${this.isChecked ? 'row_selected' : ''}>${this.renderInput()}</td>`]
        return input.concat(n)
    }
    renderInput(){
        if(this.selectMultiple == false && this.selected != JSON.stringify(this.cuerpo)){
            this.isChecked = false
        }
        if(this.selectMultiple == false && this.selected == JSON.stringify(this.cuerpo)){
            this.isChecked = true
        }

        return html`<div @click=${this._checked} class=${this.isChecked ? 'input_checked' : 'input_check'}>
            ${ this.isChecked ? html`<style> :host {background-color:#eeeeee}</style>` : ''}
            <div>${done}</div>
        </div>`
    }
    verificaEstado(ele, nombre){
        if(this.columns[ele].reglas && this.columns[ele].reglas.length){
            let columns = this.columns[ele].reglas.filter(content => content.estado == nombre)
            if(columns.length > 0 ) return columns[0].color + ' centrar'
            return 'centrar'         
        }else{
            return ''
        }
    }
    /* createRenderRoot(){
        return this
    } */
    _checked(){
        this.isChecked=!this.isChecked
        this.dispatchEvent(new CustomEvent('olapp-change-check', {
            bubbles:true,
            composed:true,
            detail:{
                status:this.isChecked,
                data:this.cuerpo
            }
        }));
    }
    _viewContent(thiss){
        thiss.dispatchEvent(new CustomEvent('olapp-view-content', {
            bubbles:true,
            composed:true,
            detail:thiss.cuerpo
        }));
    }
}
customElements.define('olapp-row', OlappRow);
