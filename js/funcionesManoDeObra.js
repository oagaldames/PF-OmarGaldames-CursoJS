/// Funciones Seccion Mano de Obra
function actualizarTablaMo() {
    tablaitemsMo.innerHTML = "";
    itemsManoDeObra.length || btnEliminarMo.setAttribute("disabled", true);
    itemsManoDeObra.forEach((item) => {
        agregarFilaMo(item);
    });
    calcularTotalItemMo();
    CalcularTotalMoConGanancia();
    limpiarCamposMo();
    habilitaBtnConfirma();
    habilitaBtnAlmacena();
}

function habilitaBtnAgregarMo() {
    if (+horasHombreInput.value && +costoMoInput.value) {
        btnAgregarMo.removeAttribute("disabled");
    } else {
        btnAgregarMo.setAttribute("disabled", true);
    }
}

function insertarNuevoMo() {
    const moIngresado = new ManoDeObra(
        selectTarea.options[selectTarea.selectedIndex].text,
        horasHombreInput.value,
        costoMoInput.value,
        selectIvaMo.value,
    );
    //Verifico si existe actualizo, sumo la cantidad anterior a la ingresada
    //si cambio el costo y el % de iva tambien se actualiza
    const indexItems = itemsManoDeObra.findIndex((item) => {
        return (
            item.descripcion === selectTarea.options[selectTarea.selectedIndex].text
        );
    });
    if (indexItems != -1) {
        const itemManoDeObra = itemsManoDeObra[indexItems];
        const { cantidad, precioHora, porcentajeIva } = moIngresado;
        itemManoDeObra.cantidad = parseInt(itemManoDeObra.cantidad, 10) || 0; 
        itemManoDeObra.cantidad += parseInt(cantidad, 10);
        itemManoDeObra.precioHora = precioHora;
        itemManoDeObra.porcentajeIva = porcentajeIva;
        itemManoDeObra.calcularIva();
        itemManoDeObra.calcularTotalItem(); 
    } else {
        itemsManoDeObra.push(moIngresado);
    }
}

function agregarFilaMo(data) {
    const row = document.createElement("tr");
    let td = document.createElement("td");
    const indexTabla = itemsManoDeObra.indexOf(data);
    td.textContent = data.descripcion;
    row.appendChild(td);
    td = document.createElement("td");
    td.textContent = data.cantidad;
    row.appendChild(td);
    td = document.createElement("td");
    td.textContent = data.precioHora;
    row.appendChild(td);
    td = document.createElement("td");
    td.textContent = data.porcentajeIva;
    row.appendChild(td);
    td = document.createElement("td");
    td.textContent = data.precioTotal;
    row.appendChild(td);
    const btnEliminarItem = document.createElement("button");
    btnEliminarItem.className = "btn btn-danger";
    btnEliminarItem.textContent = "Eliminar";
    btnEliminarItem.onclick = () => {
        Swal.fire({
            title:
                "Desea eliminar la tarea : " +
                itemsManoDeObra[indexTabla].descripcion +
                " ?",
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonText: "No",
            icon: "question",
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                itemsManoDeObra.splice(indexTabla, 1);
                actualizarTablaMo();
                localStorage.setItem(
                    "itemsManoDeObra",
                    JSON.stringify(itemsManoDeObra)
                );
                Swal.fire({
                    title: "Item Eliminado!",
                    icon: "success",
                });
            }
        });
    };
    td = document.createElement("td");
    td.appendChild(btnEliminarItem);
    row.appendChild(td);
    tablaitemsMo.appendChild(row);
    btnEliminarMo.removeAttribute("disabled");
}

function limpiarCamposMo() {
    selectTarea.selectedIndex = 0;
    horasHombreInput.value = "";
    costoMoInput.value = "";
    btnAgregarMo.setAttribute("disabled", true);
}

function calcularTotalItemMo() {
    const total = itemsManoDeObra.reduce((acumulador, item) => {
        return acumulador + parseFloat(item.precioTotal);
    }, 0);
    totalPresupuestoMo.innerText = total.toFixed(2);
}

function eliminarTodosItemsMo() {
    Swal.fire({
        title: "Desea eliminar todos los Items?",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No",
        icon: "question",
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            itemsManoDeObra = [];
            localStorage.setItem("itemsManoDeObra", JSON.stringify(itemsManoDeObra));
            actualizarTablaMo();
            Swal.fire({
                title: "Items Eliminados!",
                icon: "success",
            });
        }
    });
}

function habilitaBtnAgregarMo() {
    if (+horasHombreInput.value && +costoMoInput.value) {
        btnAgregarMo.removeAttribute("disabled");
    } else {
        btnAgregarMo.setAttribute("disabled", true);
    }
}

function CalcularTotalMoConGanancia() {
    const validarGanancia = () => {
        const valor = parseFloat(gananciaMoInput.value);
        if (isNaN(valor)) {
            return (gananciaMoInput.value = 0);
        } else {
            return (gananciaMoInput.value = valor);
        }
    };
    const CalcularTotalMo = (porcentaje, costo) => costo * (1 + porcentaje / 100);
    totalMo.value = CalcularTotalMo(
        validarGanancia(),
        parseFloat(totalPresupuestoMo.innerText)
    ).toFixed(2);
}
