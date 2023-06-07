class ManoDeObra {
    constructor(descripcion, cantidad, precioHora,porcentajeIva) {
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precioHora = precioHora;
        this.porcentajeIva = porcentajeIva;
        this.calcularIva();
        this.calcularTotalItem();
    }
    calcularIva() {
        const iva = this.precioHora * this.cantidad * (this.porcentajeIva / 100);
        this.iva = iva;
    }
    calcularTotalItem() {
        const subTotal = this.cantidad * this.precioHora;
        const precioTotal = subTotal + this.iva;
        this.precioTotal = precioTotal.toFixed(2);
    }
    
}

