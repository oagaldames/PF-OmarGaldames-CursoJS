
allEventListeners();
cargarOpcionesSelect(selectProveedor, proveedores);
cargarOpcionesSelect(selectTipo, tiposMateriales);
cargarOpcionesSelect(selectIva, valorIva);
cargarOpcionesSelect(selectTarea, tiposMo);
habilitaBtnAgregarMat();
habilitaBtnAgregarMo();
limpiarResumen();


function allEventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    numeroPresupuesto.value = 1;
    cargarTablas();
    limpiarResumen();
  });

  btnNuevo.addEventListener("click", (evento) => {
    evento.preventDefault();
    nuevoPresupuesto();
  });
  ingresarMaterialInput.addEventListener("blur", (evento) => {
    evento.preventDefault();
    ingresarMaterialInput.value = validarIngresoText(ingresarMaterialInput.value);
    habilitaBtnAgregarMat();
  });
 
  cantidadInput.addEventListener("blur", (evento) => {
    evento.preventDefault();
    cantidadInput.value = validarIngresoNumero(parseFloat(cantidadInput.value));
    habilitaBtnAgregarMat();
  });
 
  costoInput.addEventListener("blur", (evento) => {
    evento.preventDefault();
    costoInput.value = validarIngresoNumero(parseFloat(costoInput.value));
    habilitaBtnAgregarMat();
  });

  btnAgregarMat.addEventListener("click", (evento) => {
    evento.preventDefault();
    insertarNuevoMaterial();
    localStorage.setItem("itemsMateriales", JSON.stringify(itemsMateriales));
    actualizarTablaMateriales();
  });

  btnEliminarMat.addEventListener("click", (evento) => {
    evento.preventDefault();
    eliminarTodosItemsMateriales();
  });

  btnCalculoMat.addEventListener("click", (evento) => {
    evento.preventDefault();
    CalcularTotalConGanancia();
  });

  horasHombreInput.addEventListener("blur", (evento) => {
    evento.preventDefault();
    horasHombreInput.value = validarIngresoNumero(parseFloat(horasHombreInput.value));
    habilitaBtnAgregarMo();
  });
 
  costoMoInput.addEventListener("blur", (evento) => {
    evento.preventDefault();
    costoMoInput.value = validarIngresoNumero(parseFloat(costoMoInput.value));
    habilitaBtnAgregarMo();
  });
  
  btnAgregarMo.addEventListener("click", (evento) => {
    evento.preventDefault();
    insertarNuevoMo();
    localStorage.setItem("itemsManoDeObra", JSON.stringify(itemsManoDeObra));
    actualizarTablaMo();
  });

  btnEliminarMo.addEventListener("click", (evento) => {
    evento.preventDefault();
    eliminarTodosItemsMo();
  });

  btnCalculoMo.addEventListener("click", (evento) => {
    evento.preventDefault();
    CalcularTotalMoConGanancia();
  });
  
  btnConfirmaPresupuesto.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrarResumen();
  });
}

const validarIngresoText = (valor) => {
  if (valor !== "") {
    return valor;
  } else {
    Swal.fire({
      title: "Aviso",
      text: "Debe ingresar un texto!",
      icon: "warning",
      button: "OK",
    });
    return "";
  }
};

const validarIngresoNumero = (valor) => {
  if (valor !== "" && !isNaN(valor) && valor >= 0) {
    return valor;
  } else {
    Swal.fire({
      title: "Aviso",
      text: "Valor ingresado incorrecto!",
      icon: "warning",
      button: "OK",
    });
    return "";
  }
};

function cargarOpcionesSelect(selector, arrayACargar) {
  arrayACargar.forEach((aCargar) => {
    const option = document.createElement("option");
    option.value = aCargar.valor;
    option.textContent = aCargar.nombre;
    selector.appendChild(option);
  });
}

function cargarTablas() {
  itemsMateriales = JSON.parse(localStorage.getItem("itemsMateriales")) || [];
  itemsManoDeObra = JSON.parse(localStorage.getItem("itemsManoDeObra")) || [];
  actualizarTablaMateriales();
  actualizarTablaMo();
  gananciaInput.value="";
  gananciaMoInput.value="";
}
function nuevoPresupuesto() {
  Swal.fire({
    title: "Desea realizar un nuevo Presupuesto?",
    confirmButtonText: "Si",
    showCancelButton: true,
    cancelButtonText: "No",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      itemsMateriales = [];
      itemsManoDeObra = [];
      localStorage.setItem("itemsMateriales", JSON.stringify(itemsMateriales));
      localStorage.setItem("itemsManoDeObra", JSON.stringify(itemsMateriales));
      actualizarTablaMateriales();
      actualizarTablaMo();
      let numPr= +numeroPresupuesto.value;
      numPr++;
      numeroPresupuesto.value = numPr;
      gananciaInput.value="";
      gananciaMoInput.value="";
    }
  });
}
  

