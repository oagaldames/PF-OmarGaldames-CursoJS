class Materiales {
    constructor(descripcion, tipo, proveedor, cantidad, precio, porcentajeIva) {
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.proveedor = proveedor;
        this.cantidad = cantidad;
        this.precio = precio;
        this.porcentajeIva = porcentajeIva;
        this.calcularIva();
        this.calcularPrecioTotal();
    }

    calcularIva() {
        const iva = this.precio * this.cantidad * (this.porcentajeIva / 100);
        this.iva = iva;
    }

    calcularPrecioTotal() {
        const subTotal = this.precio * this.cantidad
        const precioTotal = subTotal + this.iva;
        this.precioTotal = precioTotal;
    }
}

class Proveedor {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

class TipoMaterial {
    constructor(id, nombre, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

class TablaIva {
    constructor(id, porcentaje, descripcion) {
        this.id = id;
        this.porcentaje = porcentaje;
        this.descripcion = descripcion;
    }
}

class ManoDeObra {
    constructor(descripcion, tipo, cantidad, precioHora) {
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.precioHora = precioHora;
        this.calcularTotalItem();
    }
    calcularTotalItem() {
        const total = this.cantidad * this.precioHora;
        this.precioTotal = total;
    }
}

class TipoManoDeObra {
    constructor(id, nombre, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}