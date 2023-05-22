class Materiales {
    constructor(descripcion,proveedor,tipo,cantidad, precio, porcentajeIva) {
        this.descripcion = descripcion;
        this.proveedor = proveedor;
        this.tipo = tipo;
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
        this.precioTotal = precioTotal.toFixed(2);
    }
}


