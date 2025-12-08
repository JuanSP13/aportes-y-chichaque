export default class Cl_mDonacion {
    _fecha = "";
    _descripcion = "";
    _monto = 0;
    _nombre = "";
    _tipoDonacion = 0;
    _tipoDonador = 0;
    constructor({ fecha = "", descripcion = "", monto = 0, nombre = "", tipoDonacion = 0, tipoDonador = 0 }) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.monto = monto;
        this.nombre = nombre;
        this.tipoDonacion = tipoDonacion;
        this.tipoDonador = tipoDonador;
    }
    set fecha(f) {
        this._fecha = f;
    }
    get fecha() {
        return this._fecha;
    }
    set descripcion(d) {
        this._descripcion = d;
    }
    get descripcion() {
        return this._descripcion;
    }
    set monto(m) {
        this._monto = +m;
    }
    get monto() {
        return this._monto;
    }
    set nombre(r) {
        this._nombre = r;
    }
    get nombre() {
        return this._nombre;
    }
    set tipoDonacion(t) {
        this._tipoDonacion = +t;
    }
    get tipoDonacion() {
        return this._tipoDonacion;
    }
    set tipoDonador(tD) {
        this._tipoDonador = +tD;
    }
    get tipoDonador() {
        return this._tipoDonador;
    }
    montoEfectivo() {
        if (this.tipoDonacion === 1)
            return this.monto;
        else
            return 0;
    }
    montoMaterial() {
        if (this.tipoDonacion === 2)
            return this.monto;
        else
            return 0;
    }
    tipoDonadorTexto() {
        if (this.tipoDonador === 1)
            return "Natural";
        else
            return "Jurídico";
    }
    toJSON() {
        return {
            descripcion: this.descripcion,
            monto: this.monto,
            nombre: this.nombre,
            tipoDonador: this.tipoDonador,
            fecha: this.fecha,
            tipoDonacion: this.tipoDonacion
        };
    }
}
