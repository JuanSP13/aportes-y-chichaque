export interface iDonacion{
    fecha: string;
    descripcion: string;
    monto: number;
    nombre: string;
    tipoDonacion: number; //1 para Efectivo, 2 para Material
    tipoDonador: number; //1 para Natural, 2 para Jurídico
}

export default class Cl_mDonacion{
    protected _fecha: string = "";
    protected _descripcion: string ="";
    protected _monto: number =0 ;
    protected _nombre: string ="";
    protected _tipoDonacion: number = 0;
    protected _tipoDonador: number =0 ;
    constructor({
        fecha = "",
        descripcion = "",
        monto = 0,
        nombre = "",
        tipoDonacion = 0,
        tipoDonador = 0
    }: {
        fecha: string;
        descripcion: string;
        monto: number;
        nombre: string;
        tipoDonacion: number;
        tipoDonador: number;
    }){
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.monto = monto;
        this.nombre = nombre;
        this.tipoDonacion = tipoDonacion;
        this.tipoDonador = tipoDonador;
    }
    set fecha(f: string) {
        this._fecha = f;
    }
    get fecha(): string {
        return this._fecha;
    }
    set descripcion(d: string) {
        this._descripcion = d;
    }
    get descripcion(): string {
        return this._descripcion;
    }
    set monto(m: number) {
        this._monto = +m;
    }
    get monto(): number {
        return this._monto;
    }
    set nombre(r: string) {
        this._nombre = r;
    }
    get nombre(): string {
        return this._nombre;
    }
    set tipoDonacion(t: number) {
        this._tipoDonacion = +t;
    }
    get tipoDonacion(): number {
        return this._tipoDonacion;
    }
    set tipoDonador(tD: number) {
        this._tipoDonador = +tD;
    }
    get tipoDonador(): number {
        return this._tipoDonador;
    }
    public montoEfectivo(): number{
        if (this.tipoDonacion === 1)
            return this.monto;
        else 
            return 0;
    }
    public montoMaterial(): number{
        if (this.tipoDonacion === 2)
            return this.monto;
        else 
            return 0;
    }
    public tipoDonadorTexto(): string{
        if (this.tipoDonador === 1)
            return "Natural";
        else 
            return "Jurídico";
    }
        toJSON(): iDonacion {
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