import { LitElement, html, css } from 'lit';
import { btn } from '../style.css';
export class OlappInfoContent extends LitElement {
    static styles = [
        btn,
        css`
            :host {
                display: block;
            }
            .contenido{
                position:absolute;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
                box-sizing:border-box;
                background-color:rgba(0,0,0,25%);
                display:flex;
                justify-content:center;
                align-items:center
            }
            .contenido>div{
                background-color:#ffffff;
                min-width:300px;
                min-height:200px;
                border-radius:10px;
                border-top:3px solid var(--olapp-color-primary,#08b768)
            }
            .title{
                font-weight:bold;
                margin:30px 0px 20px 20px;
                font-size:1.2em;
                color:#575555
            }
            .content-body{
                color:#8b8b8b;
                margin-left:20px;
                line-height:25px
            }
            .footer{
                padding:10px;
                display:flex;
                justify-content:end
            }
        `
    ];
    static get properties() {
        return {
            content: { type: Object },
        };
    }
    render() {
        let titles = Object.keys(this.content)
        return html`<div class="contenido">
            <div>
                <div class="title">
                    Información del registro
                </div>
                <div class="content-body">
                    ${
                        titles.map(element=>{
                            return html`<div><b>${element}: </b><span>${this.content[element]}</span></div>`
                        })
                    }
                </div>
                <div class="footer" @click=${this._cerrarWindow}>
                    <div class="btn">Aceptar</div>
                </div>
            </div>
        </div>`;
    }
    _cerrarWindow(){
        this.dispatchEvent(new CustomEvent('olapp-close-window', {
            bubbles:true,
            composed:true,
            detail:{
                window:"infoOculto",
                //content: this.pages[this.activo]
            }
        }))
    }
}
customElements.define('olapp-info-content', OlappInfoContent);
