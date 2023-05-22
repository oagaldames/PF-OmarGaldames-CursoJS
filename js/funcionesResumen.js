/// funciones Seccion Resumen
const habilitaBtnConfirma = () => {
    const habilitar = itemsMateriales.length || itemsManoDeObra.length;
    btnConfirmaPresupuesto.disabled = !habilitar;
    if (!habilitar) limpiarResumen();
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
}

function CalculoTotalIva() {
    const ivaMateriales = itemsMateriales.reduce((acumulador, item) => {
      return acumulador + +item.iva;
    }, 0);
    const totalIva = (ivaMateriales * (1 + (+ganancia.value / 100)) + (+totalMo.value * 0.21)).toFixed(2);
    return totalIva;
  }
