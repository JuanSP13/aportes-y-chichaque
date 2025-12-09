import Cl_mDonacion from "./Cl_mDonacion.js";
export default class Cl_mOrganizacion {
    donaciones = [];
    STORAGE_KEY = "Movimientos_Bancarios_data";
    //Atributos derivados para los metodos de Aportes y Donaciones (en revision)
    acmMontoEfectivo = 0;
    acmMontoMaterial = 0;
    //Métodos por Tipo Donador
    cntDonaciones = 0;
    tipoDonador1 = 0; // Natural
    tipoDonador2 = 0; // Juridico
    cntTipoDonador1 = 0;
    cntTipoDonador2 = 0;
    constructor() {
        this.cargar();
    }
    cargar() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
            try {
                const json = JSON.parse(data);
                this.donaciones = json.map((registro) => new Cl_mDonacion(registro));
            }
            catch (error) {
                console.error("Error al cargar data del almacenamiento local:", error);
                this.donaciones = [];
            }
        }
    }
    guardar() {
        const data = this.donaciones.map(registro2 => registro2.toJSON());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
    procesarDonacion(data) {
        let existe = this.donaciones.find(a => a.nombre === data.nombre);
        if (existe) {
            if (data.nombre !== undefined)
                existe.nombre = data.nombre;
            if (data.fecha !== undefined)
                existe.fecha = data.fecha;
            if (data.descripcion !== undefined)
                existe.descripcion = data.descripcion;
            if (data.monto !== undefined)
                existe.monto = data.monto;
            if (data.tipoDonacion !== undefined)
                existe.tipoDonacion = data.tipoDonacion;
            if (data.tipoDonador !== undefined)
                existe.tipoDonador = data.tipoDonador;
        }
        else {
            this.donaciones.push(new Cl_mDonacion(data));
        }
        this.guardar();
        return true;
    }
    deleteDonacion(nombre) {
        let index = this.donaciones.findIndex(registro3 => registro3.nombre === nombre);
        if (index !== -1) {
            this.donaciones.splice(index, 1);
            this.guardar();
            return true;
        }
        return false;
    }
    getDonacion(nombre) {
        return this.donaciones.find(registro4 => registro4.nombre === nombre);
    }
    get dtDonaciones() {
        return this.donaciones;
    }
}
