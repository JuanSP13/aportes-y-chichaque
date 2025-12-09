import Cl_mDonacion, { iDonacion } from "./Cl_mDonacion.js";

export default class Cl_mOrganizacion {
    private donaciones: Cl_mDonacion[] = [];
    private readonly STORAGE_KEY = "Movimientos_Bancarios_data";
    //Atributos derivados para los metodos de Aportes y Donaciones (en revision)
    private acmMontoEfectivo: number = 0;
    private acmMontoMaterial: number = 0; 
    //Métodos por Tipo Donador
    private cntDonaciones: number = 0;
    private tipoDonador1: number = 0; // Natural
    private tipoDonador2: number = 0; // Juridico
    private cntTipoDonador1: number = 0;
    private cntTipoDonador2: number = 0;


    constructor() {
        this.cargar();
    }

    private cargar() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
            try {
                const json = JSON.parse(data);
                this.donaciones = json.map((registro: any) => new Cl_mDonacion(registro));
            } catch (error) {
                console.error("Error al cargar data del almacenamiento local:", error);
                this.donaciones = [];
            }
        }
    }

    private guardar() {
        const data = this.donaciones.map(registro2 => registro2.toJSON());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    public procesarDonacion(data: any): boolean {
        let existe = this.donaciones.find(a => a.nombre === data.nombre);
        
        if (existe) {
            if (data.nombre !== undefined) existe.nombre = data.nombre;
            if (data.fecha !== undefined) existe.fecha = data.fecha;
            if (data.descripcion !== undefined) existe.descripcion = data.descripcion;
            if (data.monto !== undefined) existe.monto = data.monto;
            if (data.tipoDonacion !== undefined) existe.tipoDonacion = data.tipoDonacion;
            if (data.tipoDonador !== undefined) existe.tipoDonador = data.tipoDonador;
        } else {
            this.donaciones.push(new Cl_mDonacion(data));
        }
        
        this.guardar();
        return true;
    }

    public deleteDonacion(nombre: string): boolean {
        let index = this.donaciones.findIndex(registro3 => registro3.nombre === nombre);
        if (index !== -1) {
            this.donaciones.splice(index, 1);
            this.guardar();
            return true;
        }
        return false;
    }

    public getDonacion(nombre: string): Cl_mDonacion | undefined {
        return this.donaciones.find(registro4 => registro4.nombre === nombre);
    }

    get dtDonaciones(): Cl_mDonacion[] {
        return this.donaciones;
    }
    
     //Metodos 
     /*   public resumen(donaciones: Cl_mDonacion[]): { totalEfectivo: number; totalMaterial: number; saldoFinal:number }{
        for (let d of donaciones) {
            if (d.tipoTransaccion === 1) {
                this.acmMontoEfectivo += d.monto;
            } else if (d.tipoTransaccion === 2) {
                this.acmMontoMaterial += d.monto;
            }
        }
        return { totalEfectivo: this.acmMontoEfectivo, totalMaterial: this.acmMontoMaterial, saldoFinal: this.acmMontoEfectivo + this.acmMontoMaterial };    
    }

        public desgloseTipoDonador(donaciones: Cl_mDonacion[]): { 
    natural: number; 
    juridico: number;  
    pNatural: number;
    pJuridico: number; 
} {
    let natural = 0;
    let juridico = 0;
    let pNatural = 0;
    let pJuridico = 0;

    for (let d of donaciones) {
        if (d.tipoDonador === 1) {
            natural += d.monto;
            cntTipoDonador1++;
        } else if (d.tipoDonador === 2) {
            juridico += d.monto;
            cntTipoDonador2++;
        }
    }
    pNatural = this.cntTipoDonador1 / this.cntDonaciones;
    pJuridico = this.cntTipoDonador2 / this.cntDonaciones;
    return { 
        natural, 
        juridico, 
        pNatural,
        pJuridico, 

    };
}*/
}