import Cl_controlador from "./Cl_controlador.js";
import Cl_mOrganizacion from "./Cl_mOrganizacion.js";
import Cl_vOrganizacion from "./Cl_vOrganizacion.js";
import Cl_vDonacion from "./Cl_vDonacion.js";
import Cl_vEditDonacion from "./Cl_vEditDonacion.js";
import { dtDonaciones } from "./Cl_controlador.js";
export default class Cl_index {
    constructor() {
        let modelo = new Cl_mOrganizacion();
        let vista = new Cl_vOrganizacion();
        let vDonacion = new Cl_vDonacion();
        let vEditDonacion = new Cl_vEditDonacion();
        // Inyectamos todas las vistas
        let controlador = new Cl_controlador(modelo, vista, vDonacion, vEditDonacion);
        dtDonaciones.forEach((Donacion) => {
        });
        vista.controlador = controlador;
        vDonacion.controlador = controlador;
        vEditDonacion.controlador = controlador;
        controlador.mostrarVista("donaciones");
    }
}
