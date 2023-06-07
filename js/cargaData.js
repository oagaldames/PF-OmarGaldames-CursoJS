
//Cargo los selectores con los datos provenientes del servidor (son archivos json locales en la carpeta Data)

async function cargaData(jsonFile, select, tipo) {
    try {
        const response = await fetch(jsonFile);
        if (response.ok) {
            const data = await response.json();
            cargarOpcionesSelect(select, data);
        } else {
            throw new Error('Hubo un error en el servidor: ' + response.status);
        }
    } catch (error) {
        throw new Error('Error al traer los ' + tipo + '...' + error);
    }
}

cargaData('./data/proveedores.json', selectProveedor, 'Proveedores');
cargaData('./data/tiposMateriales.json', selectTipo, 'Tipo Materiales');
cargaData('./data/tiposIva.json', selectIva, 'Tipo Iva');
cargaData('./data/tiposTarea.json', selectTarea, 'Tipo Tareas');
cargaData('./data/tiposIva.json', selectIvaMo, 'Tipo Iva');

function cargarOpcionesSelect(selector, DataACargar) {
    DataACargar.forEach((aCargar) => {
        const option = document.createElement("option");
        option.value = aCargar.valor;
        option.textContent = aCargar.nombre;
        selector.appendChild(option);
    });
}
