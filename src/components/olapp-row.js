import { LitElement, html, css } from 'lit';
import { done } from '../icons/icons';
import { styleGeneral } from '../style.css';
export class OlappRow extends LitElement {
    static styles = [
        styleGeneral,
        css`
            td{
                padding-left:5px
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
            }
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
            if (ele != 'option') return html`<td class=${this.isChecked ? 'row_selected' : ''}>${this.cuerpo[this.columns[ele].identificador]}</td>`
        })
        let input = [html`<td class=${this.isChecked ? 'row_selected' : ''}>${this.renderInput()}</td>`]
        return input.concat(n)
    }
    renderInput(){
        return html`<div @click=${this._checked} class=${this.isChecked ? 'input_checked' : 'input_check'}>
            ${ this.isChecked ? html`<style> :host {background-color:#eeeeee}</style>` : ''}
            <div>${done}</div>
        </div>`
    }
    /* createRenderRoot(){
        return this
    } */
    _checked(){
        this.isChecked=!this.isChecked
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
