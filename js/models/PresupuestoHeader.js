class PresupuestoHeader {
    constructor(id, descripcion, fecha,
        costomateriales, gananciamateriales, totalmateriales,
        costomamodeobra, gananciamanodeobra, totalmanodeobra,
        totaliva,total) {
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.costomateriales = costomateriales;
        this.gananciamateriales = gananciamateriales;
        this.totalmateriales = totalmateriales;
        this.costomamodeobra = costomamodeobra;
        this.gananciamanodeobra = gananciamanodeobra;
        this.totalmanodeobra = totalmanodeobra;
        this.totaliva = totaliva;
        this.total = total;
    }
}