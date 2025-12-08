export default class Cl_controlador {
    mOrganizacion;
    vOrganizacion;
    vDonacion;
    vEditDonacion;
    constructor(modelo, vOrganizacion, vDonacion, vEditDonacion) {
        this.mOrganizacion = modelo;
        this.vOrganizacion = vOrganizacion;
        this.vDonacion = vDonacion;
        this.vEditDonacion = vEditDonacion;
    }
    procesarDonacion(data) {
        this.mOrganizacion.procesarDonacion(data);
        this.mostrarVista("donaciones");
    }
    deleteTrans(nombre) {
        if (confirm(`¿Está seguro de eliminar la donación de ${nombre}?`)) {
            this.mOrganizacion.deleteDonacion(nombre);
            this.vOrganizacion.refreshTable();
        }
    }
    vDetails(nombre) {
        const trans = this.mOrganizacion.getDonacion(nombre);
        if (trans) {
            alert(JSON.stringify(trans.toJSON(), null, 2));
        }
    }
    vEdit(nombre) {
        const trans = this.mOrganizacion.getDonacion(nombre);
        if (trans && this.vEditDonacion) {
            this.vEditDonacion.cargarDatos(trans.toJSON());
            this.mostrarVista("editDonacion");
        }
    }
    mostrarVista(vista) {
        this.vOrganizacion.ocultar();
        this.vDonacion.ocultar();
        this.vEditDonacion.ocultar();
        if (vista === "donaciones") {
            this.vOrganizacion.mostrar();
            this.vOrganizacion.refreshTable(); // Refrescar para ver nuevos totales
        }
        else if (vista === "registro") {
            this.vDonacion.mostrar();
        }
        else if (vista === "editDonacion") {
            this.vEditDonacion.mostrar();
        }
    }
    get dtDonaciones() {
        return this.mOrganizacion.dtDonaciones;
    }
}
