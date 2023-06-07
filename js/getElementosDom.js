// Lectura de elementos del DOM de la primer seccion del presupuesto
const numeroPresupuesto = document.getElementById("numeroPresupuesto");
const descripcionPresupuesto = document.getElementById("descripcionPresupuesto");
const btnLimpiarFormulario = document.getElementById("btnLimpiarFormulario");

// Lectura de elementos del DOM en la primera sección de Materiales
const ingresarMaterialInput = document.getElementById("ingresarMaterial");
const selectProveedor = document.getElementById("selectProveedor");
const selectTipo = document.getElementById("selectTipo");
const cantidadInput = document.getElementById("cantidad");
const costoInput = document.getElementById("costo");
const selectIva = document.getElementById("selectIva");
const btnAgregarMat = document.getElementById("btnAgregarMat");

// Lectura de elementos del DOM en la segunda sección de Materiales
const tablaItemMateriales = document.getElementById("tablaItemMateriales");
const totalPresupuestoMat = document.getElementById("totalPresupuestoMat");
const gananciaInput = document.getElementById("ganancia");
const totalMat = document.getElementById("total");
const btnEliminarMat = document.getElementById("btnEliminarMat");
const btnCalculoMat = document.getElementById("btnCalculoMat");

// Lectura de elementos del DOM en la sección de Mano de Obra
const selectTarea = document.getElementById("selectTarea");
const horasHombreInput = document.getElementById("horasHombre");
const costoMoInput = document.getElementById("costoMo");
const selectIvaMo = document.getElementById("selectIvaMo");
const btnAgregarMo = document.getElementById("btnAgregarMo");

// Lectura de elementos del DOM en la tabla de Mano de Obra
const tablaitemsMo = document.getElementById("tablatemMo");
const tablaPresupuestoMoTbody = document.getElementById("tablaPresupuestoMoBody");
const totalPresupuestoMo = document.getElementById("totalPresupuestoMo");
const gananciaMoInput = document.getElementById("gananciaMo");
const totalMo = document.getElementById("totalMo");
const btnEliminarMo = document.getElementById("btnEliminarMo");
const btnCalculoMo = document.getElementById("btnCalculoMo");

// Lectura de elementos del DOM en la sección de Resumen del Presupuesto
const containerResumen = document.getElementById("containerResumen");
const btnConfirmaPresupuesto = document.getElementById("btnConfirmaPresupuesto");
const btnAlmacenaPresupuesto = document.getElementById("btnAlmacenaPresupuesto");
const totalCostoProductos = document.getElementById("totalCostoProductos");
const rentabilidadProducto = document.getElementById("rentabilidadProducto");
const totalMateriales = document.getElementById("totalMateriales");
const totalCostoManoDeObra = document.getElementById("totalCostoManoDeObra");
const rentabilidadManoDeObra = document.getElementById("rentabilidadManoDeObra");
const totalManoDeObra = document.getElementById("totalManoDeObra");
const totalIva = document.getElementById("totalIva");
const iva = document.getElementById("iva");
const totalPresupuesto = document.getElementById("totalPresupuesto");

let itemsMateriales = [];
let itemsManoDeObra = [];

