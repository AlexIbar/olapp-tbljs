
# Olapp Tbljs

- Componente web construido en Lit.js para la creación de tablas basicas

# Como usuario

- Definición del componente
```html
    <olapp-tbljs id="tbl" .columns=${this.columns} .selectMultiple=${this.canMultipleCheck} .datos=${this.datos} @olapp-change-check=${this._checkear}>
        some light-dom
    </olapp-tbljs>
```

- Tener en cuenta que el componente recibe los siguientes parametros:
    - .columns -> Es un Objeto Json el cual tiene datos de configuración y la información que se va pintar en el encabezado de la tabla
    - .datos -> Es un array de objetos Json el cual contiene el cuerpo de la información que se va pintar en el cuerpor de la tabla
    - .selectMultiple -> es un boolean que le informa a la tabla si permite selección multiple o no
    - @olapp-change-check -> evento que se dispara cada que el usuario selecciona el checkbox

## Diseño de la información que recibe: 

#### -  Columns
```js
this.columns = {
    option:{
        type:"input",
        title:"#",
        filter:false
    },
    impreso:{
        type:"string", //Tipo de dato
        title:"Impreso", //Titulo que aparecera en el encabezado
        filter:true, //True si la columna puede ser filtrada
        identificador:"impreso", //Identificador con el que hace match con la numbre de la columna o key de los datos
        reglas:[ //Regla para agregar algun resaltado en la celda de la data
          {
            estado:"Generada",
            color:"successful"
          }
        ]
    }
}

```

#### -  Datos
```js
this.datos = {
    {
        impreso: "Generada"
    },
    {
        impreso: "Generar"
    }
}

```

#### Variables css para personalización

```css
    :root{
      --olapp-header-background:rgb(58, 123, 191);
      --olapp-header-color:white;
      --olapp-header-hover:rgb(37, 103, 173);
      --olapp-color-primary: rgb(37, 103, 173);
      --olapp-color-secondary:rgb(255,209,0);
      --olapp-2n-background-rows:#f2f2f28f;
      --olapp-color-warning:rgba(243, 243, 156, 0.68);
      --olapp-color-danger:#ffdddd;
      --olapp-color-successful:rgb(5 186 5 / 20%);
    }
```

# Comandos
    - npm i olapp-tbljs