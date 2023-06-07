
allEventListeners();
habilitaBtnAgregarMat();
habilitaBtnAgregarMo();
limpiarResumen();

function allEventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    cargarPresupuestoDeLocalStorage()
  });

  btnLimpiarFormulario.addEventListener("click", (evento) => {
    evento.preventDefault();
    limpiarFormulario();
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

  gananciaInput.addEventListener("blur", (evento) => {
    evento.preventDefault();
    gananciaInput.value = validarIngresoNumero(parseFloat(gananciaInput.value));
    CalcularTotalConGanancia();
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

  gananciaMoInput.addEventListener("blur", (evento) => {
    evento.preventDefault();
    gananciaMoInput.value = validarIngresoNumero(parseFloat(gananciaMoInput.value));
    CalcularTotalMoConGanancia();
  });
  btnCalculoMo.addEventListener("click", (evento) => {
    evento.preventDefault();
    CalcularTotalMoConGanancia();
  });

  btnConfirmaPresupuesto.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrarResumen();
  });
  btnAlmacenaPresupuesto.addEventListener("click", (evento) => {
    evento.preventDefault();
    GuardarPresupuesto();
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

function cargarPresupuestoDeLocalStorage() {
  presupuestoHeader = JSON.parse(localStorage.getItem("presupuestoHeader")) || [];
  console.log(presupuestoHeader);
  if (presupuestoHeader.length === 0) {
    numeroPresupuesto.value = +localStorage.getItem("presupuestoNumero") + 1 || 1;
  } else {
    cargarDatosFormulario();
    cargarTablas();
  }
  actualizarTablaMateriales();
  actualizarTablaMo();
}

function cargarDatosFormulario(){
  const {
    id,
    descripcion,
    costomateriales,
    gananciamateriales,
    totalmateriales,
    costomamodeobra,
    gananciamanodeobra,
    totalmanodeobra,
    totaliva,
    total
  } = presupuestoHeader;

  numeroPresupuesto.value = id;
  descripcionPresupuesto.value = descripcion;
  totalPresupuestoMat.innerText = costomateriales;
  ganancia.value = gananciamateriales;
  totalMat.value = totalmateriales;
  totalPresupuestoMo.innerText = costomamodeobra;
  gananciaMo.value = gananciamanodeobra;
  totalMo.value = totalmanodeobra;
  totalCostoProductos.innerText = costomateriales;
  rentabilidadProducto.innerText = gananciamateriales;
  totalMateriales.innerText = totalmateriales;
  totalCostoManoDeObra.innerText = costomamodeobra;
  rentabilidadManoDeObra.innerText = gananciamanodeobra;
  totalManoDeObra.innerText = totalmanodeobra;
  totalIva.innerText = totaliva;
  totalPresupuesto.innerText = total;
  containerResumen.style.display = "block";
}

function cargarTablas() {
  presupuestoItems = JSON.parse(localStorage.getItem("presupuestoItems")) || [];
  console.log(presupuestoItems);
  if (presupuestoItems.length === 0) {
    itemsMateriales = [];
    itemsManoDeObra = [];
  }
  else {
    presupuestoItems.forEach(objeto => {
      if (objeto.tipoItem === 0) {
        const material = new Materiales(
          objeto.descripcion,
          objeto.proveedor,
          objeto.tipo,
          objeto.cantidad,
          objeto.precio,
          objeto.porcentajeIva
        );
        itemsMateriales.push(material);
      } else {
        const manoDeObra = new ManoDeObra(
          objeto.descripcion,
          objeto.cantidad,
          objeto.precio,
          objeto.porcentajeIva
        );
        itemsManoDeObra.push(manoDeObra)
      }
    });
  }
  //actualizarTablaMateriales();
  //actualizarTablaMo();
}

function limpiarFormulario() {
  Swal.fire({
    title: "Desea realizar eliminar los datos ingresados?",
    confirmButtonText: "Si",
    showCancelButton: true,
    cancelButtonText: "No",
    icon: "question",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      limpiarPresupuesto()
    }
  });
}

function limpiarPresupuesto() {
  itemsMateriales = [];
  itemsManoDeObra = [];
  const objVacio = [];
  localStorage.setItem("itemsMateriales", JSON.stringify(objVacio));
  localStorage.setItem("itemsManoDeObra", JSON.stringify(objVacio));
  localStorage.setItem("presupuestoHeader", JSON.stringify(objVacio));
  localStorage.setItem("presupuestoItems", JSON.stringify(objVacio));
  actualizarTablaMateriales();
  actualizarTablaMo();
  descripcionPresupuesto.value = "";
  gananciaInput.value = "";
  gananciaMoInput.value = "";
}