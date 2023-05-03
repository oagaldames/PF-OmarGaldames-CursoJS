//Variables Globales
let ingresarTexto;
let nombreMaterial;
let tipoMaterial;
let proveedorMaterial;
let cantidadMaterial;
let precioMaterial;
let ivaMaterial;
let descripcionMo;
let tipoMo;
let cantidadMo;
let precioHoraMo;
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
let totalIvaMateriales;
let totalManoDeObra;
let totalPresupuesto;
let contadorIngresos;
let salirLoop;
let filtroCampo;
let filtroValor;

const materialesPresupuesto = [];

//cargo un array de proveedores validos
const proveedor1 = new Proveedor(1, "Proveedor 1");
const proveedor2 = new Proveedor(2, "Proveedor 2");
const proveedor3 = new Proveedor(3, "Proveedor 3");
const proveedores = [];
proveedores.push(proveedor1);
proveedores.push(proveedor2);
proveedores.push(proveedor3);

//cargo un array de tipos de materiales validos
const tipoMaterial1 = new TipoMaterial(1, "Eléctrico", "Materiales Electricos");
const tipoMaterial2 = new TipoMaterial(2, "Neumático", "Materiales Neumáticos");
const tipoMaterial3 = new TipoMaterial(3, "Control", "Materiales de Control");
const tipoMaterial4 = new TipoMaterial(4, "Fluidos", "Materiales de Fluidos");
const tiposMateriales = [];
tiposMateriales.push(tipoMaterial1);
tiposMateriales.push(tipoMaterial2);
tiposMateriales.push(tipoMaterial3);
tiposMateriales.push(tipoMaterial4);

//cargo un array con los tasas de iva validos
const valorIva1 = new TablaIva(1, 0, "IVA Exento");
const valorIva2 = new TablaIva(2, 10.5, "IVA 10.5%");
const valorIva3 = new TablaIva(3, 21, "IVA 21%");
const valorIva = [];
valorIva.push(valorIva1);
valorIva.push(valorIva2);
valorIva.push(valorIva3);

const itemsManoDeObra = [];
//cargo un array de tipos de mano de obra validos
const tipoMo1 = new TipoManoDeObra(1, "Ingeniería", "Ingeniero");
const tipoMo2 = new TipoManoDeObra(2, "Eléctrica", "Electricista");
const tipoMo3 = new TipoManoDeObra(3, "Mecánica", "Mecánico");
const tipoMo4 = new TipoManoDeObra(4, "Programación", "Programador");
const tiposMo = [];
tiposMo.push(tipoMo1);
tiposMo.push(tipoMo2);
tiposMo.push(tipoMo3);
tiposMo.push(tipoMo4);

ingresarTexto = "S";
totalCostoProductos = 0;

// INGRESO LOS ITEMS DE MATERIALES
do {
    nombreMaterial = prompt("Ingrese el material");
    tipoMaterial = prompt(
        "Ingrese el tipo de material (válidos: Eléctrico/ Neumático/ Control/Fluidos)"
    );
    proveedorMaterial = prompt(
        "Ingrese el proveedor (válidos: Proveedor 1/ Proveedor 2/ Proveedor 3)"
    );
    cantidadMaterial = parseFloat(prompt("Ingrese la cantidad"));
    precioMaterial = parseFloat(prompt("Ingrese el precio de compra"));
    ivaMaterial = parseFloat(
        prompt("Ingrese el porcentaje de iva (válidos: 0/ 10.5/ 21)")
    );

    const resultadoValidacion = validaDatosIngresados(
        nombreMaterial,
        tipoMaterial,
        proveedorMaterial,
        cantidadMaterial,
        precioMaterial,
        ivaMaterial
    );
    if (resultadoValidacion == 0) {
        const materialIngresado = new Materiales(
            nombreMaterial,
            tipoMaterial,
            proveedorMaterial,
            cantidadMaterial,
            precioMaterial,
            ivaMaterial
        );
        materialesPresupuesto.push(materialIngresado);
    } else {
        switch (resultadoValidacion) {
            case 1:
                alert("El nombre ingresado no es válido");
                break;
            case 2:
                alert("El tipo ingresado no es válido");
                break;
            case 3:
                alert("El proveedor ingresado no es válido");
                break;
            case 4:
                alert("La cantidad ingresada no es válida");
                break;
            case 5:
                alert("El precio ingresado no es válido");
                break;
            case 6:
                alert("El IVA ingresado no es válido");
                break;
            default:
                alertg("Error en la validación de datos");
                break;
        }
    }

    ingresarTexto = prompt("Ingresa otro producto (S si)");
} while (ingresarTexto.toUpperCase() == "S");

console.log(materialesPresupuesto);

totalCostoProductos = materialesPresupuesto.reduce(
    (acumulador, materialesPresupuesto) => {
        return acumulador + materialesPresupuesto.precioTotal;
    },
    0
);
console.log("Total del costo de los Materiales : " + totalCostoProductos);

// INGRESO ITEMS DE MANO DE OBRA, CANTIDAD DE HORAS HOMBRE, COSTO HORA HOMBRE Y CALCULO EL TOTAL DEL ITEM
ingresarTexto = "S";
totalCostoManoDeObra = 0;

do {
    descripcionMo = prompt("Ingrese la Tarea");
    tipoMo = prompt(
        "Ingrese el tipo de tarea (válidos: Ingeniería/ Eléctrica/ Mecánica/ Programación)"
    );
    cantidadMo = prompt("Ingrese la cantidad de horas hombre");
    precioHoraMo = parseFloat(prompt("Ingrese el valor hora"));
    const resultadoValidacionMo = validaDatosIngresadosMo(
        descripcionMo,
        tipoMo,
        cantidadMo,
        precioHoraMo
    );
    if (resultadoValidacionMo == 0) {
        const moIngresado = new ManoDeObra(
            descripcionMo,
            tipoMo,
            cantidadMo,
            precioHoraMo
        );
        itemsManoDeObra.push(moIngresado);
    } else {
        switch (resultadoValidacionMo) {
            case 1:
                alert("Debe ingresar una tarea");
                break;
            case 2:
                alert("El tipo de tarea ingresada no es válida");
                break;
            case 3:
                alert("La cantidad ingresada no es válida");
                break;
            case 4:
                alert("El valor hora ingresado no es válido");
                break;
            default:
                alertg("Error en la validación de datos");
                break;
        }
    }
    ingresarTexto = prompt("Ingresa otra Tarea (S si)");
} while (ingresarTexto.toUpperCase() == "S");

console.log(itemsManoDeObra);

totalCostoManoDeObra = itemsManoDeObra.reduce((acumulador, itemsManoDeObra) => {
    return acumulador + itemsManoDeObra.precioTotal;
}, 0);
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

// //AGREGO EL % DE RENTABILIDAD A LA MANO DE OBRA
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
totalIvaMateriales = materialesPresupuesto.reduce(
    (acumulador, materialesPresupuesto) => {
        return acumulador + materialesPresupuesto.iva;
    },
    0
);
totalIva = totalConRentabilidad(totalIvaMateriales, rentabilidadProducto) + (totalManoDeObra * 0.21);

totalPresupuesto = totalMateriales + totalManoDeObra + totalIva;

//ENVIO TODOS LOS DATOS A LA CONSOLA
// lista de materiales
mostrarMateriales(materialesPresupuesto);
mostrarTareas(itemsManoDeObra);
mostrarResumen();

// Mostrar filtrado de materiales cargados por tipo

// filtrar por proveedor
if (prompt("Quiere filtrar materiale por Proveedor S/N").toUpperCase() == "S") {
    filtroValor = prompt("ingrese el proveedor (válidos: Proveedor 1/ Proveedor 2/ Proveedor 3)")
    filtrarMateriales('proveedor', filtroValor, materialesPresupuesto);
}
if (prompt("Quiere filtrar materiale por Tipo S/N").toUpperCase() == "S") {
    filtroValor = prompt("ingrese el tipo de materiales a filtar (válidos: Eléctrico/ Neumático/ Control/Fluidos)")
    filtrarMateriales('tipo', filtroValor, materialesPresupuesto);
}

// FUNCIONES

function validaDatosIngresados(nombre, tipo, proveedor, cantidad, precio, iva) {
    if (validaTexto(nombre)) {
        if (validaTipo(tipo)) {
            if (validaProveedor(proveedor)) {
                if (validarNumero(cantidad)) {
                    if (validarNumero(precio)) {
                        if (validaIva(iva)) {
                            return 0;
                        } else {
                            return 6;
                        }
                    } else {
                        return 5;
                    }
                } else {
                    return 4;
                }
            } else {
                return 3;
            }
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}

function validaDatosIngresadosMo(nombre, tipo, cantidad, precio) {
    if (validaTexto(nombre)) {
        if (validaTipoMo(tipo)) {
            if (validarNumero(cantidad)) {
                if (validarNumero(precio)) {
                    return 0;
                } else {
                    return 4;
                }
            } else {
                return 3;
            }
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}

function validaTexto(textoingresado) {
    if (textoingresado.length > 0) {
        return true;
    } else {
        return false;
    }
}

function validarNumero(numeroIngresado) {
    if (isNaN(numeroIngresado) || numeroIngresado < 0) {
        return false;
    } else {
        return true;
    }
}

function validaProveedor(proveedorIngresado) {
    if (
        proveedores.some((proveedor) => proveedor.nombre === proveedorIngresado)
    ) {
        return true;
    } else {
        return false;
    }
}

function validaTipo(tipoIngresado) {
    if (
        tiposMateriales.some(
            (tiposMateriales) => tiposMateriales.nombre === tipoIngresado
        )
    ) {
        return true;
    } else {
        return false;
    }
}

function validaIva(ivaIngresado) {
    if (valorIva.some((valorIva) => valorIva.porcentaje === ivaIngresado)) {
        return true;
    } else {
        return false;
    }
}

function validaTipoMo(tipoIngresado) {
    if (
        tiposMo.some(
            (tiposMo) => tiposMo.nombre === tipoIngresado
        )
    ) {
        return true;
    } else {
        return false;
    }
}

function totalConRentabilidad(costo, porcentaje) {
    let totalCalculado;
    totalCalculado = costo * (1 + porcentaje / 100);
    return totalCalculado;
}

function mostrarMateriales(arrayIngresado) {
    console.log("MATERIALES");
    arrayIngresado.forEach(material => {
        console.log(`Descripción: ${material.descripcion}`);
        console.log(`Tipo: ${material.tipo}`);
        console.log(`Proveedor: ${material.proveedor}`);
        console.log(`Cantidad: ${material.cantidad} unidades`);
        console.log(`Precio unitario: $${material.precio}`);
        console.log(`Porcentaje de IVA: ${material.porcentajeIva}%`);
        console.log(`IVA: $${material.iva}`);
        console.log(`Precio total: $${material.precioTotal}`);
        console.log("------------------------------------");
    });
    console.log("------------------------------------");

}

function mostrarTareas(arrayIngresado) {
    console.log("MANO DE OBRA");
    arrayIngresado.forEach(tarea => {
        console.log(`Descripción: ${tarea.descripcion}`);
        console.log(`Tipo: ${tarea.tipo}`);
        console.log(`Cantidad Horas: ${tarea.cantidad} horas`);
        console.log(`Precio Hora: $${tarea.precioHora}`);
        console.log(`Precio total: $${tarea.precioTotal}`);
        console.log("------------------------------------");
    });
    console.log("------------------------------------");

}

function mostrarResumen() {
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

}

function filtrarMateriales(campo, valor, arrayIngresado) {
    const materialesFiltrados = arrayIngresado.filter(material => material[campo] === valor);
    console.log(`Materiales filtrados por ${campo}:`);
    console.table(materialesFiltrados);
}