
// Genero los array para los selectores 
//si no existen en el localstore los genero 
// si existen en el local storage los cargo  

const proveedores = cargarProveedoresDesdeLocalStorage();
const tiposMateriales = cargartiposMaterialesDesdeLocalStorage();
const valorIva = cargartiposIvaDesdeLocalStorage();
const tiposMo = cargartiposMoDesdeLocalStorage();

function cargarProveedoresDesdeLocalStorage() {
    const proveedoresLocalStorage = localStorage.getItem("proveedores");
    const provLocalStorage = [];
    if (proveedoresLocalStorage) {
        return JSON.parse(proveedoresLocalStorage);
    } else {
        const proveedor1 = new Proveedor(1, "Proveedor 1", 1);
        const proveedor2 = new Proveedor(2, "Proveedor 2", 2);
        const proveedor3 = new Proveedor(3, "Proveedor 3", 3);
        const proveedor4 = new Proveedor(4, "Proveedor 4", 4);
        const proveedor5 = new Proveedor(5, "Proveedor 5", 5);
        provLocalStorage.push(proveedor1);
        provLocalStorage.push(proveedor2);
        provLocalStorage.push(proveedor3);
        provLocalStorage.push(proveedor4);
        provLocalStorage.push(proveedor5);
        localStorage.setItem("proveedores", JSON.stringify(provLocalStorage));
        return provLocalStorage;
    }
}

function cargartiposMaterialesDesdeLocalStorage() {
    const tiposMatLocalStorage = localStorage.getItem("tiposMateriales");
    const tipoMatLocal = [];
    if (tiposMatLocalStorage) {
        return JSON.parse(tiposMatLocalStorage);
    } else {
        const tipoMaterial1 = new Tipos(1, "Eléctrico", 1);
        const tipoMaterial2 = new Tipos(2, "Neumático", 2);
        const tipoMaterial3 = new Tipos(3, "Control", 3);
        const tipoMaterial4 = new Tipos(4, "Fluidos", 4);
        tipoMatLocal.push(tipoMaterial1);
        tipoMatLocal.push(tipoMaterial2);
        tipoMatLocal.push(tipoMaterial3);
        tipoMatLocal.push(tipoMaterial4);
        localStorage.setItem("tiposMateriales", JSON.stringify(tipoMatLocal)
        );
        return tipoMatLocal;
    }
}

function cargartiposIvaDesdeLocalStorage() {
    const tiposIvaLocalStorage = localStorage.getItem("valorIva");
    const tipoIvaLocal = [];
    if (tiposIvaLocalStorage) {
        return JSON.parse(tiposIvaLocalStorage);
    } else {
        const valorIva1 = new TablaIva(1, "IVA Exento", 0);
        const valorIva2 = new TablaIva(2, "IVA 10.5%", 10.5);
        const valorIva3 = new TablaIva(3, "IVA 21%", 21);
        tipoIvaLocal.push(valorIva1);
        tipoIvaLocal.push(valorIva2);
        tipoIvaLocal.push(valorIva3);
        localStorage.setItem("valorIva", JSON.stringify(tipoIvaLocal));
        return tipoIvaLocal;
    }
}

function cargartiposMoDesdeLocalStorage() {
    const tiposMoLocalStorage = localStorage.getItem("tiposMo");
    const tiposMoLocal = [];
    if (tiposMoLocalStorage) {
        return JSON.parse(tiposMoLocalStorage);
    } else {
        const tipoMo1 = new Tipos(1, "Ingeniería", 1);
        const tipoMo2 = new Tipos(2, "Eléctrica", 2);
        const tipoMo3 = new Tipos(3, "Mecánica", 3);
        const tipoMo4 = new Tipos(4, "Programación", 4);
        tiposMoLocal.push(tipoMo1);
        tiposMoLocal.push(tipoMo2);
        tiposMoLocal.push(tipoMo3);
        tiposMoLocal.push(tipoMo4);
        localStorage.setItem("tiposMo", JSON.stringify(tiposMoLocal));
        return tiposMoLocal;
    }
}

