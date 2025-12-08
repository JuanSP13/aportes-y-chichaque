import Cl_mOrganizacion from "./Cl_mOrganizacion.js";
import Cl_vOrganizacion from "./Cl_vOrganizacion.js";
import Cl_vDonacion from "./Cl_vDonacion.js";
import Cl_vEditDonacion from "./Cl_vEditDonacion.js";
import { iDonacion } from "./Cl_mDonacion.js";

export default class Cl_controlador {
    private mOrganizacion: Cl_mOrganizacion;
    private vOrganizacion: Cl_vOrganizacion;
    private vDonacion: Cl_vDonacion;
    private vEditDonacion: Cl_vEditDonacion;

    constructor(
        modelo: Cl_mOrganizacion, 
        vOrganizacion: Cl_vOrganizacion, 
        vDonacion: Cl_vDonacion,
        vEditDonacion: Cl_vEditDonacion
    ) {
        this.mOrganizacion = modelo;
        this.vOrganizacion = vOrganizacion;
        this.vDonacion = vDonacion;
        this.vEditDonacion = vEditDonacion;
    }

    public procesarDonacion(data: iDonacion) {
        this.mOrganizacion.procesarDonacion(data);
        this.mostrarVista("donaciones");
    }

    public deleteTrans(nombre: string) {
        if (confirm(`¿Está seguro de eliminar la donación de ${nombre}?`)) {
            this.mOrganizacion.deleteDonacion(nombre);
            this.vOrganizacion.refreshTable();
        }
    }

    public vDetails(nombre: string) { //Para despues
    const trans = this.mOrganizacion.getDonacion(nombre);
    if (trans) {
        alert(JSON.stringify(trans.toJSON(), null, 2));
    }
}

    public vEdit(nombre: string) {
        const trans = this.mOrganizacion.getDonacion(nombre);
        if (trans && this.vEditDonacion) {
            this.vEditDonacion.cargarDatos(trans.toJSON());
            this.mostrarVista("editDonacion");
        }
    }
    
    public mostrarVista(vista: string) {
        this.vOrganizacion.ocultar();
        this.vDonacion.ocultar();
        this.vEditDonacion.ocultar();


        if (vista === "donaciones") {
            this.vOrganizacion.mostrar();
            this.vOrganizacion.refreshTable(); // Refrescar para ver nuevos totales
        } else if (vista === "registro") {
            this.vDonacion.mostrar();
        } else if (vista === "editDonacion") {
            this.vEditDonacion.mostrar();
        }
    }
    
    get dtDonaciones() {
        return this.mOrganizacion.dtDonaciones;
    }
}