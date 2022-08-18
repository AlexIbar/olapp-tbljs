import { LitElement, html, css } from 'lit';
import {navigate_next, navigate_before } from '../icons/icons.js'
export class OlappPagination extends LitElement {
    static styles = [
        css`
            .father-pages{
                margin:auto;
                display:flex;
                justify-content:center;
                color:grey;
                fill:grey;
                font-size:12px
            }
            .father-pages>div{
                width:35px;
                height:35px;
                background-color:#f1f1f1;
                display:flex;
                justify-content:center;
                align-items:center;
                user-select:none;
                cursor:pointer;
                box-shadow:1px 2px 4px #b6b6b6
            }
            .active{
                background-color:#d8d8d4 !important
            }
            .father-pages>div:hover{
                color:white;
                fill:white
            }
        `
    ];

    static get properties() {
        return {
            total: { type:Number },
            cantidad: { type:Number },
            activo: { type:Number },
            numPages: { type:Number },
        };
    }

    constructor(){
        super()
        this.total=0
        this.activo=1
        this.numPages=1
        this.cantidad=15
    }
    render() {
        return html`<div class="father-pages">${this._cantidad()}</div>`;
    }
    firstUpdated(){
        this.numPages = Math.ceil(this.total/this.cantidad)
    }
    _cantidad(){
        let elementos=[];
        elementos.push(html`<div @click=${this._disminuir}>${navigate_before}</div>`)
        if(this.total != 0 && this.total > this.cantidad){
            let cantidad = Math.ceil(this.total/this.cantidad)
            let s=0
            if(cantidad > 5 ){
                if(this.activo <= 3){
                    for(let i = 0; i<4; i++){
                        elementos.push(html`<div class=${this.activo == i+1? 'active':''} @click=${this._cambioActive} key=${i+1}>${i+1}</div>`)
                    }
                    elementos.push(html`<div @click=${this._cambioActive} key=${cantidad}>...</div>`)
                }else{
                    let max = this.activo == cantidad ? this.activo : this.activo+1
                    let min = this.activo == cantidad ? this.activo-3 : this.activo+1 == cantidad ? this.activo-2 :  this.activo-1
                    elementos.push(html`<div @click=${this._cambioActive} key="1">...</div>`)
                    while(min<=max){
                        elementos.push(html`<div class=${this.activo == min? 'active':''} @click=${this._cambioActive} key=${min}>${min}</div>`)
                        min++
                    }
                    if(max < cantidad){
                        elementos.push(html`<div @click=${this._cambioActive} key=${cantidad}>...</div>`)
                    }
                }
            }else{
                while(s<cantidad){
                    elementos.push(html`<div class=${this.activo == s+1? 'active':''} @click=${this._cambioActive} key=${s+1}>${s+1}</div>`)
                    s++
                }
            }
        }else{
            elementos.push( html`<div>1</div>`)
        }
        elementos.push(html`<div @click=${this._aumentar}>${navigate_next}</div>`)
        return html`${elementos}`
    }
    _cambioActive(element){
        this.activo = parseInt(element.target.getAttribute('key'))
        this.changeActive()
    }
    _aumentar(){
        if(this.activo < this.numPages) this.activo++
        this.changeActive()
    }
    _disminuir(){
        if(this.activo > 1) this.activo--
        this.changeActive()
    }
    changeActive(){
        this.dispatchEvent(new CustomEvent('olapp-change-page', {
            bubbles:true,
            composed:true,
            detail:{
                activo: this.activo,
                //content: this.pages[this.activo]
            }
        }))
    }
}
customElements.define('olapp-pagination', OlappPagination);
