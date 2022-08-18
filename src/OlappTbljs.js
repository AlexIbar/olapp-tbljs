import { html, css, LitElement } from 'lit';
import { styleGeneral } from './style.css.js';
import './components/olapp-pagination.js'
import './components/olapp-tbl-filtros.js'
import './components/olapp-btn-filtrar.js'
import './components/olapp-row.js'
import './components/olapp-info-content.js'
export default class OlappTbl extends LitElement {
  static styles = [
    styleGeneral,
  ];
  static get properties() {
    return {
      counter: { type: String },
      datos: { type: Array },
      columns: { type: Object },
      cantidad: { type: Number },
      activo: { type: Number },
      numData: { type: Number },
      maestros: { tyoe: Object },
      visible: { type: String },
      datFiltrada: { type: Array },
      initFilter: { type: String },
      copia: { type: Array },
      viewContent: { type: Object }
    };
  }

  constructor() {
    super()
    this.counter = 5
    this.datos = []
    this.columns = {}
    this.cantidad = 15
    this.activo = 1
    this.numData = 0
    this.maestros = {}
    this.visible = ""
    this.datFiltrada = []
    this.initFilter = ""
    this.viewContent = null
  }

  firstUpdated() {
    this._filtrado()
  }
  connectedCallback() {
    super.connectedCallback()
    this.numData = this.datos.length
    let encabezadoList = Object.keys(this.columns)
    encabezadoList.forEach(element => {
      let identificador = this.columns[element].identificador
      let type = this.columns[element].type
      if (identificador != undefined) {
        this.maestros[identificador] = {
          data: [],
          type: type
        }
      }
    })
    this.datFiltrada = Object.assign({}, this.maestros)
    this.copia = [...this.datos]
  }
  render() {
    return html`
      <article style="position:relative;padding:3px">
        <section class="cabecera">
          <div>
            ${this._renderHead()}
          </div>
        </section>
        <section class="cuerpo">
          ${this._renderBody()}
        </section>
        ${this.viewContent != null ? html`<olapp-info-content @olapp-close-window=${this._closeWindowInfo} .content=${this.viewContent}></olapp-info-content>` : ''}
        <div class="footer-tabla">
          <div class="por-pagina">
            <label for="forPage">Por pagina</label>
            <select id="forPage" @change=${this._cambioCantidad}>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          ${this.establecerPaginacion()}
        </div>
        ${this.visible != "" ?  html`<olapp-tbl-filtros visible=${this.visible} .maestros=${this.maestros} @olapp-change-order=${this._changeOrderColumn} @olapp-datos-filtro=${this._newFiltro} .columns=${this.columns} @olapp-close-window=${this._closeWindowInfo}></olapp-tbl-filtros>` :''}
      </article>
    `;
  }
  establecerPaginacion() {
    return html`<olapp-pagination @olapp-change-page=${this._cambioPage} total=${this.numData} activo=${this.activo} cantidad=${this.cantidad}></olapp-pagination>`
  }
  _renderHead() {
    let encabezadoList = Object.keys(this.columns)
    let n = this.columns
    return encabezadoList.map(element => {
      let identificador = this.columns[element].identificador
      return html`<div class="celda_head">
          <div class=${!n[element].filter ? 'not-filtro' : ''}>
            <div>${n[element].title}</div> ${n[element].filter ? html`<olapp-btn-filtrar key=${identificador} @olapp-filter-window=${this._filtrar}></olapp-btn-filtrar>` : ''}
          </div>
        </div>`
    })
  }
  _renderBody() {
    this.columns
    let fin = this.cantidad * this.activo <= this.datos.length ? this.cantidad * this.activo : this.datos.length
    let inicio = (fin % this.cantidad == 0 ? fin - this.cantidad : this.cantidad * (this.activo - 1))
    let datosSlice = this.copia.slice(inicio, fin)
    return datosSlice.map(element => {
      return html`<div><olapp-row @olapp-view-content=${this._mostrarContent} .columns=${this.columns} .cuerpo=${element}></olapp-row></olapp-row></div>`
    })
  }

  _cambioPage(e) {
    this.activo = e.detail.activo
  }
  _cambioCantidad(e) {
    this.cantidad = parseInt(e.target.value)
  }
  _filtrado() {
    let datos = Object.keys(this.maestros)
    datos.forEach((element) => {
      let n = this.datos.map(ele => {
        if (this.maestros[element].type == 'date') {
          return this._fecha(ele[element])
        } else {
          return ele[element]
        }
      })
      let nuevo = [...new Set(n)]
      this.maestros[element].data = nuevo
    })
  }
  _fecha(fecha) {
    let f = fecha.split(' ')[0]
    let fech = new Date(f.split('/').reverse().join('/') + ' 00:00')
    return `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`
  }
  _filtrar(e) {
    let key = e.detail.key
    if (key != "" && key != undefined) {
      this.visible = key
    }
  }
  _newFiltro(e) {
    console.log(this.maestros)
    let tipo = e.detail.type
    if (tipo == "date") {
      this.copia = this.datos.filter(element => {
        let n = e.detail.data.find(ele => ele == this._fecha(element[e.detail.identificador]))
        if (n != -1 && n !== undefined) {
          return element
        }
      })
    } else {
      this.copia = this.datos.filter(element => {
        let n = e.detail.data.find(ele => ele == element[e.detail.identificador])
        if (n != -1 && n !== undefined) {
          return element
        }
      })
    }
    this.activo = 1
    this.visible = ""
  }
  _mostrarContent(e) {
    this.viewContent = e.detail
  }
  _closeWindowInfo(e) {
    if(e.detail.window == 'filtro'){
      this.visible=''
    }
    if(e.detail.window == 'infoOculto'){
      this.viewContent = null
    }
  }
  _changeOrderColumn(e){
    this.columns=e.detail
  }
}
