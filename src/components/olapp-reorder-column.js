import { LitElement, html, css } from 'lit';
import { reorder, low_priority } from '../icons/icons';
export class OlappReorderColumn extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                border-bottom:1px solid grey
            }
            .header-reorder{
                user-select:none
            }
            .header-reorder, .body-reorder>div {
                display:grid;
                grid-template-columns:40px 1fr;
                align-items:center;
                min-height:35px
            }
            .header-reorder svg{
                transform:rotate(90deg);
                height:30px
            }
            svg{
                height:30px
            }
        `
    ];
    static get properties() {
        return {
            columns: { type: Object, noAccessor:true},
            activo: {type:Boolean}
        };
    }
    firstUpdated(){
        this.shadowRoot.querySelectorAll('.draggable').forEach(item=>{
            item.addEventListener('dragstart', this._handleDragStart);
            item.addEventListener('dragend', this._handleDragEnd);
            item.addEventListener('drop', this._handleDrop);
        })
    }

    render() {
        return html`<section><div class="header-reorder" @click=${this._viewOrder}>${low_priority}<p>Ordenar columnas</p></div>
        ${this.activo ? html`<sortable-list id="my-list" @sorted=${this._sortedChange}>${this.columns != undefined ? this._renderizarItem() : ''}</sortable-list>` : ''}
        </section>`;
    }
    _renderizarItem(){
        return Object.keys(this.columns).map((ele,index)=>{
            if(ele != 'option') return html`<sortable-item class="draggable" key=${ele} id=${index}>${reorder}<div>${this.columns[ele].title}</div></sortable-item>`
        })
    }
    _viewOrder(){
        this.activo=!this.activo
    }
    _sortedChange(e){
        let n = {
            "option":this.columns["option"]
        }
        Object.keys(e.detail.items).forEach((ele)=>{
            let objetoColumn = e.detail.items[ele]
            n[objetoColumn.key]=this.columns[objetoColumn.key]
        })
        this.dispatchEvent(new CustomEvent('olapp-change-order', {
            bubbles:true,
            composed:true,
            detail:n
        }))
    }
}
class BaseElement extends LitElement {
    trigger(ev, detail) {
      this.dispatchEvent(new CustomEvent(ev, {
        detail,
        bubbles: true,
        composed: true
      }))
    }
  }
  
  class SortableList extends BaseElement {
    static get properties() {
      return {
        currentSource: { type: Number },
        currentTarget: { type: Number }
      }
    }
    
    firstUpdated() {
      this.addEventListener('dragover', ev => ev.preventDefault())
      this.addEventListener("currentTarget", ev => this.setCurrentTarget(ev))
      this.addEventListener("currentSource", ev => this.setCurrentSource(ev))
      this.addEventListener("complete", ev => this.setComplete(ev))
      this.items.map((e, i) => {
        e.key = e.getAttribute('key')
        e.index = e.originalIndex = e.currentIndex = i
        e.currentSource = null
        return e
      })
    }
    
    get items() {
      return [...this.querySelectorAll("sortable-item")]
    }
    
    get arrangement() {
      return this.items.map((item, id) => { 
        return {id, oid: item.originalIndex, key:item.key}
      })
    }
    
    reindex() {
      this.items.map((e, i) => e.index = i)
    }
    
    render() {
      return html`
        <style>
          :host {
            display: block;
          }
        </style>
        <slot></slot>
      `
    }
    
    sort() {
      const mapIndex = (item, i) => {
        if (item.currentIndex == this.currentSource) {
          item.index = this.currentTarget + 1
        } else if (item.index >= this.currentTarget) {
          item.index += 1
        }
        return item
      }
      const sortIndex = (a, b) => (a.index > b.index) ? 1 : -1
      const reduceIndex = (item, i) => {
        item.index = i
      }
      const unordered = (item, i) => item.index != i
      
      this.items.map(mapIndex).sort(sortIndex).map(reduceIndex)
  
      if (this.items.filter(unordered).length) {
        this.items.sort(sortIndex).map(e => {
          this.removeChild(e); return e
        }).map(e => {
          this.append(e)
        })
      }
    }
    
    setCurrentTarget(ev) {
        this.currentTarget = ev.detail.index
        this.sort()    
    }
    
    setCurrentSource(ev) {
        this.items.map(i => {
          i.currentSource = ev.detail.index
        })
        this.currentSource = ev.detail.index    
    }
    
    setComplete(ev) {
        this.items.map((e, i) => {
          e.currentIndex = i
          e.currentSource = null
        })
        this.trigger("sorted", { items: this.arrangement })
    }
  }
  
class SortableItem extends BaseElement {
    static styles = [
        css`
            :host {
                display:grid;
                grid-template-columns:40px 1fr;
                align-items:center;
                min-height:45px;
                padding-left:10px;
            }
            :host svg{
                height:25px
            }
        `
    ]
    static get properties() {
      return {
        index: { type: Number },
        originalIndex: { type: Number },
        currentIndex: { type: Number },
        currentSource: { type: Number },
        html: { type: String }
      }
    }
  
    firstUpdated() {
      this.setAttribute('draggable', 'true')
      const events = ['dragstart', 'dragover', 'dragend']
      events.map(e => this.addEventListener(e, ev => this[e](ev), false))
    }
    
    render() {
      const isSource = this.currentSource == this.currentIndex
      const highlight = '#beeaf7'
      
      return html`

        <slot></slot>
        `
    }
  
    dragstart(ev) {
      this.trigger("currentSource", { index: this.index })
    }
    
    dragover(ev) {
      ev.preventDefault()
      const before = (ev.offsetY - (ev.target.clientHeight / 2)) < 1
      const index = before ? this.index - 1 : this.index
      this.trigger("currentTarget", { index })
    }
    
    dragend(ev) {
      ev.preventDefault()
      this.trigger("complete")
    }
  }
  
customElements.define("sortable-item", SortableItem)
customElements.define("sortable-list", SortableList)  
customElements.define('olapp-reorder-column', OlappReorderColumn);
