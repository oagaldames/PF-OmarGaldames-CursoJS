/// Funciones Seccion Materiales
function actualizarTablaMateriales() {
  tablaItemMateriales.innerHTML = "";
  itemsMateriales.length || btnEliminarMat.setAttribute("disabled", true);
  itemsMateriales.forEach((item) => {
    agregarFilaMateriales(item);
  });
  calcularTotalItemMateriales();
  CalcularTotalConGanancia();
  limpiarCamposMateriales();
  habilitaBtnConfirma();
  habilitaBtnAlmacena();
}

function insertarNuevoMaterial() {
  let indexItems=-1;
  const materialIngresado = new Materiales(
    ingresarMaterialInput.value,
    selectProveedor.options[selectProveedor.selectedIndex].text,
    selectTipo.options[selectTipo.selectedIndex].text,
    cantidadInput.value,
    costoInput.value,
    selectIva.value
  );
    //Verifico si esxite el material con el mismo proveedor y tipo ,
    //si existe actualizo sumo la cantidad anterior a la ingresada
    //si cambio el costo y el % de iva tambien se actualiza
  indexItems = itemsMateriales.findIndex((item) => {
    return (
      item.descripcion === materialIngresado.descripcion &&
      item.proveedor === materialIngresado.proveedor &&
      item.tipo === materialIngresado.tipo
    );
  });
  if (indexItems != -1) {
    
    const itemMaterial = itemsMateriales[indexItems];const { cantidad, precio, porcentajeIva } = materialIngresado;
    itemMaterial.cantidad = parseInt(itemMaterial.cantidad, 10) || 0; 
    itemMaterial.cantidad += parseInt(cantidad, 10);
    itemMaterial.precio = precio;
    itemMaterial.porcentajeIva = porcentajeIva;
    itemMaterial.calcularIva();
    itemMaterial.calcularPrecioTotal(); 
  } else {
    itemsMateriales.push(materialIngresado);
  }
}

function agregarFilaMateriales(data) {
  const row = document.createElement("tr");
  let td = document.createElement("td");
  const indexTabla = itemsMateriales.indexOf(data);
  td.textContent = data.descripcion;
  row.appendChild(td);
  td = document.createElement("td");
  td.textContent = data.proveedor;
  row.appendChild(td);
  td = document.createElement("td");
  td.textContent = data.tipo;
  row.appendChild(td);
  td = document.createElement("td");
  td.textContent = data.cantidad;
  row.appendChild(td);
  td = document.createElement("td");
  td.textContent = data.precio;
  row.appendChild(td);
  td = document.createElement("td");
  td.textContent = data.porcentajeIva;
  row.appendChild(td);
  td = document.createElement("td");
  td.textContent = data.precioTotal;
  row.appendChild(td);
  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn btn-danger";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.onclick = () => {
    Swal.fire({
      title:
        "Desea eliminar : " + itemsMateriales[indexTabla].descripcion + " ?",
      confirmButtonText: "Si",
      showCancelButton: true,
      cancelButtonText: "No",
      icon: "question",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        itemsMateriales.splice(indexTabla, 1);
        actualizarTablaMateriales();
        localStorage.setItem(
          "itemsMateriales",
          JSON.stringify(itemsMateriales)
        );
        Swal.fire({
          title: "Item Eliminado!",
          icon: "success",
        });
      }
    });
  };
  td = document.createElement("td");
  td.appendChild(btnEliminar);
  row.appendChild(td);
  tablaItemMateriales.appendChild(row);
  btnEliminarMat.removeAttribute("disabled");
}

function limpiarCamposMateriales() {
  ingresarMaterialInput.value = "";
  selectProveedor.selectedIndex = 0;
  selectTipo.selectedIndex = 0;
  cantidadInput.value = "";
  costoInput.value = "";
  selectIva.selectedIndex = 0;
  btnAgregarMat.setAttribute("disabled", true);
}

function calcularTotalItemMateriales() {
  const total = itemsMateriales.reduce((acumulador, item) => {
    return acumulador + parseFloat(item.precioTotal);
  }, 0);
  totalPresupuestoMat.innerText = total.toFixed(2);
}

function eliminarTodosItemsMateriales() {
  Swal.fire({
    title: "Desea eliminar todos los Materiales?",
    confirmButtonText: "Si",
    showCancelButton: true,
    cancelButtonText: "No",
    icon: "question",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      itemsMateriales = [];
      localStorage.setItem("itemsMateriales", JSON.stringify(itemsMateriales));
      actualizarTablaMateriales();
      Swal.fire({
        title: "Items Eliminados!",
        icon: "success",
      });
    }
  });
}

function habilitaBtnAgregarMat() {
  if (
    ingresarMaterialInput.value &&
    +cantidadInput.value &&
    +costoInput.value
  ) {
    btnAgregarMat.removeAttribute("disabled");
  } else {
    btnAgregarMat.setAttribute("disabled", true);
  }
}
function CalcularTotalConGanancia() {
  const validarGanancia = () => {
    const valor = parseFloat(gananciaInput.value);
    if (isNaN(valor)) {
      return (gananciaInput.value = 0);
    } else {
      return (gananciaInput.value = valor);
    }
  };
  const CalcularTotalMateriales = (porcentaje, costo) =>
    costo * (1 + porcentaje / 100);
  totalMat.value = CalcularTotalMateriales(
    validarGanancia(),
    parseFloat(totalPresupuestoMat.innerText)
  ).toFixed(2);
}
