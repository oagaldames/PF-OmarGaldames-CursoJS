class ManoDeObra {
    constructor(descripcion, cantidad, precioHora) {
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precioHora = precioHora;
        this.calcularTotalItem();
    }
    calcularTotalItem() {
        const total = this.cantidad * this.precioHora;
        this.precioTotal = total;
    }
}

