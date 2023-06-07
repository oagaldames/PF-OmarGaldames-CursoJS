/// Funciones Seccion Resumen
let presupuestoItems = [];
let presupuestoHeader = [];

const habilitaBtnConfirma = () => {
    const habilitar = itemsMateriales.length || itemsManoDeObra.length;
    btnConfirmaPresupuesto.disabled = !habilitar;
    if (!habilitar) limpiarResumen();
};
const habilitaBtnAlmacena = () => {
    if (containerResumen.style.display === "none") {
        btnAlmacenaPresupuesto.disabled = true
    }
    else {
        btnAlmacenaPresupuesto.disabled = false;
    }
};
function limpiarResumen() {
    totalCostoProductos.innerText = "0";
    rentabilidadProducto.innerText = "0";
    totalMateriales.innerText = "0";
    totalCostoManoDeObra.innerText = "0";
    rentabilidadManoDeObra.innerText = "0";
    totalManoDeObra.innerText = "0";
    totalIva.innerText = "0";
    totalPresupuesto.innerText = "0";
    containerResumen.style.display = "none";
    
}

function mostrarResumen() {
    containerResumen.style.display = "block";
    totalCostoProductos.innerText = totalPresupuestoMat.innerText;
    rentabilidadProducto.innerText = ganancia.value;
    totalMateriales.innerText = totalMat.value;
    totalCostoManoDeObra.innerText = totalPresupuestoMo.innerText;
    rentabilidadManoDeObra.innerText = gananciaMo.value;
    totalManoDeObra.innerText = totalMo.value;
    totalIva.innerText = CalculoTotalIva();
    totalPresupuesto.innerText = parseFloat(+totalMat.value + +totalMo.value + +totalIva.innerText).toFixed(2);
    AlmacenarPresupuestoEnLocalStorage();
    habilitaBtnAlmacena();
}

function CalculoTotalIva() {
    const ivaMateriales = itemsMateriales.reduce((acumulador, item) => {
        return acumulador + +item.iva;
    }, 0);
    const ivaManoObra = itemsManoDeObra.reduce((acumulador, item) => {
        return acumulador + +item.iva;
    }, 0);
    const totalIva = (ivaMateriales * (1 + (+ganancia.value / 100)) + ivaManoObra * (1 + (+gananciaMo.value / 100))).toFixed(2);
    return totalIva;
}

function GuardarPresupuesto() {
    Swal.fire({
        title: "Desea Guardar el Presupuesto N° " + numeroPresupuesto.value + " ?",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No",
        icon: "question",
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            enviarPresupuestoAlServidor();
        }
    });
}
function AlmacenarPresupuestoEnLocalStorage() {
    presupuestoItems = [];
    const fechaActual = new Date();
    presupuestoHeader = new PresupuestoHeader(
        numeroPresupuesto.value,
        descripcionPresupuesto.value,
        fechaActual,
        totalCostoProductos.innerText,
        rentabilidadProducto.innerText,
        totalMateriales.innerText,
        totalCostoManoDeObra.innerText,
        rentabilidadManoDeObra.innerText,
        totalManoDeObra.innerText,
        totalIva.innerText,
        totalPresupuesto.innerText
    );
    localStorage.setItem("presupuestoHeader", JSON.stringify(presupuestoHeader));
    console.log(presupuestoHeader);
    almacenarItemsMateriales();
    almacenarItemsManoDeObra();
}

function almacenarItemsMateriales() {
    for (let i = 0; i < itemsMateriales.length; i++) {
        const material = itemsMateriales[i];
        const presuItems = new PresupuestoItems(
            numeroPresupuesto.value,
            0,
            material.descripcion,
            material.proveedor,
            material.tipo,
            material.cantidad,
            material.precio,
            material.porcentajeIva,
            material.iva,
            material.precioTotal
        );
        presupuestoItems.push(presuItems);
    }
    localStorage.setItem("presupuestoItems", JSON.stringify(presupuestoItems));
}

function almacenarItemsManoDeObra() {
    for (let i = 0; i < itemsManoDeObra.length; i++) {
        const manoDeObra = itemsManoDeObra[i];
        const presuItems = new PresupuestoItems(
            numeroPresupuesto.value,
            1,
            manoDeObra.descripcion,
            "",
            "",
            manoDeObra.cantidad,
            manoDeObra.precioHora,
            manoDeObra.porcentajeIva,
            manoDeObra.iva,
            manoDeObra.precioTotal
        );
        presupuestoItems.push(presuItems);
    }
    localStorage.setItem("presupuestoItems", JSON.stringify(presupuestoItems));
    console.log(presupuestoItems);
}

//Envio primero al servidor el json con 
//los datos del Header del presupuesto
async function enviarPresupuestoAlServidor() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(presupuestoHeader),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }

        });
        console.log(response.body)
        if (response.ok) {
            console.log('Presupuesto Header guardado exitosamente');
            console.log(response.json);
            console.log(response.status);
            //Si el envio del json con los datos del Header se realizo , 
            //envio al servidor el json con los items del presupuesto
            await enviarItemsPresupuesto(presupuestoItems);
        } else {
            console.log('Error al guardar el presupuesto');
            Swal.fire({
                title: "Error",
                text: "Error al guardar el header del presupuesto - respuesta del servidor: " + response.status,
                icon: "error",
                timer: 3000,

            });
        }
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        Swal.fire({
            title: "Error",
            text: "Error en la solicitud: - respuesta del servidor: " + error,
            icon: "error",
            timer: 3000,

        });
    }
}

//Envio al servidor el json con 
//los datos de los items del presupuesto
async function enviarItemsPresupuesto(itemspresupuesto) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(itemspresupuesto),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response.ok) {
            console.log('Items del presupuesto guardados exitosamente');
            console.log(response.json);
            console.log(response.status);

            Swal.fire({
                title: "Aviso",
                text: "Presupuesto guardado exitosamente - respuesta del servidor: " + response.status,
                icon: "success",
                timer: 3000
            }).then(() => {
                localStorage.setItem("presupuestoNumero", numeroPresupuesto.value);
                limpiarPresupuesto();
                let numPr = +numeroPresupuesto.value;
                numPr++;
                numeroPresupuesto.value = numPr;
            });

        } else {
            console.log('Error al guardar los items del presupuesto');
            Swal.fire({
                title: "Error",
                text: "Error al guardar los items del presupuesto - respuesta del servidor: " + response.status,
                icon: "error",
                timer: 3000
            });
        }
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        Swal.fire({
            title: "Error",
            text: "Error en la solicitud - respuesta del servidor: " + error,
            icon: "error",
            timer: 3000
        });
    }
}
