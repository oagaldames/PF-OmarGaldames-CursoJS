// El proyecto final seria para realizar presupestos
// de un trabajo, dividiendo los materiales y la mano de obra.
// En la Pre entrega1 se realiza lo siguiente:
// Se ingresa los materiales y el precio de compra 
// Se ingresa las tareas a realizar, las horas hombre, el valor de la hora hombre y se calcula el valor total de la tarea en base a los datos ingresados
// Se ingresa el porcentaje de rentabilidad que se quiere tener (uno para materiales y uno para mano de obra)
// luego se calcula el iva y se calcula el valor total del presupuesto
// Se realizan validaciones de texto ingresado, de numeros ingresados y calculo de rentabilidad utilizando funciones


//Variables Globales
let ingresarTexto;
let nombreProducto;
let costoProducto;
let totalCostoProductos;
let itemManoDeObra;
let horasHombre;
let costomanoDeObra;
let totalItemManoDeObra;
let totalCostoManoDeObra;
let rentabilidadProducto;
let rentabilidadManoDeObra;
let totalMateriales;
let totalIva;
let totalManoDeObra;
let totalPresupuesto;
let contadorIngresos;
let salirLoop;

ingresarTexto = "S";
totalCostoProductos = 0;

// INGRESO ITEMS MATERIALES CON SU PRECIO DE COMPRA
do {
    nombreProducto = prompt("Ingrese el producto");
    if (validaTexto(nombreProducto)) {
        costoProducto = parseFloat(
            prompt("Ingrese el Precio de compra del producto")
        );
        if (validarNumero(costoProducto) == true) {
            totalCostoProductos += costoProducto;
            console.log(
                "Producto : " + nombreProducto + " Precio de compra : " + costoProducto
            );
            ingresarTexto = prompt("Ingresa otro producto (S si)");
        }
    }
} while (ingresarTexto.toUpperCase() == "S");

console.log("Total del costo de los Materiales : " + totalCostoProductos);

// INGRESO ITEMS DE MANO DE OBRA, CANTIDAD DE HORAS HOMBRE, COSTO HORA HOMBRE Y CALCULO EL TOTAL DEL ITEM
ingresarTexto = "S";
totalCostoManoDeObra = 0;

do {
    itemManoDeObra = prompt("Ingrese Tarea");
    if (validaTexto(itemManoDeObra)) {
        horasHombre = parseFloat(prompt("Ingrese la cantidad de horas hombre"));
        if (validarNumero(horasHombre) == true) {
            costomanoDeObra = parseFloat(
                prompt("Ingrese el valor hora para esta Tarea")
            );
            if (validarNumero(costomanoDeObra) == true) {
                totalItemManoDeObra = horasHombre * costomanoDeObra;
                totalCostoManoDeObra += totalItemManoDeObra;
                console.log(
                    "Tarea : " +
                    itemManoDeObra +
                    " Cantidad de horas : " +
                    horasHombre +
                    " Valor hora: " +
                    costomanoDeObra +
                    " Valor total Tarea: " +
                    totalItemManoDeObra
                );
                ingresarTexto = prompt("Ingresa otra Tarea (S si)");
            }
        }
    }
} while (ingresarTexto.toUpperCase() == "S");

console.log("Total del costo de mano de obra : " + totalCostoManoDeObra);

//AGREGO EL % DE RENTABILIDAD A LOS MATERIALES
rentabilidadProducto = 0;
contadorIngresos = 0;
salirLoop = false;

do {
    rentabilidadProducto = parseFloat(prompt("Ingrese el % de rentabilidad para los Materiales"));
    if (validarNumero(rentabilidadProducto) == true) {
        salirLoop = true;
    } else {
        contadorIngresos++;
        if (contadorIngresos == 3) {// se deja hasta un maximo de ingresos incorrectos
            rentabilidadProducto = 0;
            salirLoop = true;
        }
    }
} while (salirLoop == false);

totalMateriales = totalConRentabilidad(totalCostoProductos, rentabilidadProducto);

//AGREGO EL % DE RENTABILIDAD A LA MANO DE OBRA
rentabilidadManoDeObra = 0;
salirLoop = false;
contadorIngresos = 0;

do {
    rentabilidadManoDeObra = parseFloat(prompt("Ingrese el % de rentabilidad para la Mano de Obra"));
    if (validarNumero(rentabilidadManoDeObra) == true) {
        salirLoop = true;
    } else {
        contadorIngresos++;
        if (contadorIngresos == 3) { // se deja hasta un maximo de ingresos incorrectos 
            rentabilidadManoDeObra = 0;
            salirLoop = true;
        }
    }
} while (salirLoop == false);

totalManoDeObra = totalConRentabilidad(totalCostoManoDeObra, rentabilidadManoDeObra);

// CALCULO EL IVA Y EL TOTAL DEL PRESUPUESTO
totalIva = (totalMateriales + totalManoDeObra) * 0.21;
totalPresupuesto = totalMateriales + totalManoDeObra + totalIva;

//ENVIO TODOS LOS DATOS A LA CONSOLA
console.log(
    "Resumen del presupuesto :" +
    "\n" +
    "Costo Materiales: $" +
    totalCostoProductos +
    " - rentabilidad :" +
    rentabilidadProducto +
    "%  - Total Materiales : $" +
    totalMateriales +
    "\n" +
    "Costo de mano de obra: $" +
    totalCostoManoDeObra +
    "- rentabilidad :" +
    rentabilidadManoDeObra +
    "% - Total mano de obra : $" +
    totalManoDeObra +
    "\n" +
    "Total iva : $" +
    totalIva +
    "\n" +
    "TOTAL PRESUPUESTO : $" +
    totalPresupuesto
);


// FUNCIONES

function validaTexto(textoingresado) {
    if (textoingresado.length > 0) {
        return true;
    } else {
        alert("Texto incorrecto..");
        return false;
    }
}

function validarNumero(numeroIngresado) {
    if (isNaN(numeroIngresado) || numeroIngresado < 0) {
        alert("Debe ingresar un numero válido");
        return false;
    } else {
        return true;
    }
}

function totalConRentabilidad(costo, porcentaje) {
    let totalCalculado;
    totalCalculado = costo * (1 + porcentaje / 100);
    return totalCalculado;
}
