import { css } from 'lit'

export const styleGeneral = css`
    *{
        font-family:sans-serif
    }
    .footer-tabla{
        font-size:12px;
        user-select:none
    }
    .cuerpo::-webkit-scrollbar {
    width: 3px;
    }
    .cuerpo::-webkit-scrollbar-track {
    background: #f1f1f1;
    }
    .cuerpo::-webkit-scrollbar-thumb {
    background: #888;
    }
    .cuerpo::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .cuerpo>div:nth-child(2n){
      background-color:var(--olapp-2n-background-rows, #f2f2f2cc)
    }
    .footer-tabla{
      margin:5px;
      display:flex;
      justify-content:end
    }
    .por-pagina select{
      width:50px;
      height:35px;
      box-sizing:border-box;
      margin:0px 10px;
      background-color:#f1f1f1;
      border:0px;
      border-radius:5px;
      box-shadow:1px 2px 4px #b6b6b6;
      color:grey;
    }
    .por-pagina select option{
      background-color:white
    }
    .not-filtro{
      display:block !important;
    }
    .oculto{
      visibility:hidden
    }
    .cabecera>div, .cuerpo>div> olapp-row{
      display:grid;
      grid-template-columns:40px repeat(auto-fit, minmax(150px, 1fr));
      grid-gap:5px;
      user-select:none;
      overflow:hidden
    }
    .cabecera>div{
      background-color:var(--olapp-header-background, #ffffff)
    }
    .cuerpo{
        max-height:calc(95vh - 56px - 35px);
        overflow-y:scroll
    }
    .celda_head>.not-filtro{
        display:flex !important;
        justify-content:center;
        align-items:center
    }
    .cabecera>div{
      height:56px;
      border-bottom:1px solid #e2e2e2;
      font-weight:600
    }
    .cuerpo>div olapp-row{
      height:58px;
      align-items:center;
      border-bottom:1px solid #e2e2e2;
      transition: transform .4s,top .4s,background-color .1s,opacity .2s;
    }
    .cuerpo>div:hover{
        background-color:#e6e6e65e
    }
    .celda_head>div{
      display:grid;
      grid-template-columns:1fr 25px;
      color:var(--olapp-header-color, rgba(0,0,0,0.54));
      fill:var(--olapp-header-color, rgba(0,0,0,0.54));
      align-items:center;
      height:56px;
      padding-left:5px;
      box-shadow:border-box
    }
    .celda_head>div:hover{
      background-color:var(--olapp-header-hover, #f2f2f2);
    }
    .celda_head svg, .celda_head olapp-btn-filtrar{
      height:19.2px;
      width:19.2px;
    }
    .celda_head svg{
      transform:scale(.8)
    }
    .input_check, .input_checked{
        display:flex;
        justify-content:center;
        align-items:center;
        padding:0px;
        margin:0px;
        width:100%
    }
    .input_check, .input_checked, .input_check>div, .input_checked>div{
        height:48px
    }
    .input_check svg{
        transform:scale(.4);
        margin:0px;
        padding:0px;
        border:2px solid #727272;
        cursor:pointer;
        border-radius:3px;
        background-color:white
    }
    .input_check svg path{
        display:none
    }
    .input_checked svg{
        transform:scale(.4);
        margin:0px;
        padding:0px;
        border:2px solid #1058cb;
        cursor:pointer;
        border-radius:3px
    }
    .input_checked path{
        fill:#1058cb
    }
    olapp-row td {
        height:58px;
        display:flex;
        align-items:center
    }
`

export const svg = css`
svg {
    transform:scale(.8)
}
`
export const btn = css`
  .btn{
      min-width:100px;
      border:1px solid black;
      min-height:35px;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:5px;
      background-color:var(--olapp-color-primary, #28a745);
      color:var(--olapp-color-secondary, white);
      font-weight:600;
      border:none;
      user-select:none;
      margin:5px;
      box-shadow:3px 3px 5px #c7c6c6;
  }
  .btn:hover{
      opacity:.9;
      box-shadow:1px 1px 5px #c7c6c6;
  }
`