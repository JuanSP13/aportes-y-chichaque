import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";

export default class Cl_vOrganizacion extends Cl_vGeneral {
    private divDonaciones: HTMLElement; 
    private btAdd: HTMLButtonElement;

    constructor() {
        super({ formName: "donaciones" });
        this.divDonaciones = this.crearHTMLElement("divDonaciones"); 
        this.btAdd = this.crearHTMLButtonElement("btAdd", {
            onclick: () => this.controlador?.mostrarVista("registro")
        });
    }

    public refreshTable() {
        if (!this.controlador) return;
        let htmlTable = "";

        const donaciones = this.controlador.dtDonaciones;

        donaciones.forEach((dona: any) => {
            htmlTable += `
            <tr>
                <td>${dona.fecha}</td>
                <td>${dona.descripcion}</td>
                <td>${dona.tipoDonacion === 1 ? "Efectivo" : "Material"}</td>
                <td class= "${dona.monto ? "positive-amount " : "negative-amount"}">${dona.monto ? dona.monto.toFixed(2) : "--"}</td>
                <td>${dona.nombre}</td>
                <td>${dona.tipoDonadorTexto()}</td>
                <td>
                    <button class="btDetails" data-ref="${dona.nombre}" title="Detalles de la Donacion" style=" font-size: 1rem; color:black; background:black; border:2px solid black; padding:3px;">❔</button>
                    <button class="btEdit" data-ref="${dona.nombre}" title="Editar Donacion" style=" font-size: 1rem; color:black; background:black; border:2px solid black; padding:3px;">⚙️</button>
                    <button class="btDelete" data-ref="${dona.nombre}" title="Eliminar Donacion" style=" font-size: 1rem; color:red; background:red; border:2px solid black; padding:3px;">🗑️</button>
                </td>
            </tr>`;
        });
        
        this.divDonaciones.innerHTML = htmlTable;
        this.asignarEventos();
    }

    private asignarEventos() {
        //Detalles
        this.divDonaciones.querySelectorAll(".btDetails").forEach((det) => {
            (det as HTMLElement).onclick = () => {
                const ref = (det as HTMLElement).dataset.ref;
                if(ref) this.controlador?.vDetails(ref);
            };
        });

        //Editar
        this.divDonaciones.querySelectorAll(".btEdit").forEach((edi) => {
            (edi as HTMLElement).onclick = () => {
                const ref = (edi as HTMLElement).dataset.ref;
                if(ref) this.controlador?.vEdit(ref);
            };
        });

        //Eliminar
        this.divDonaciones.querySelectorAll(".btDelete").forEach((del) => {
            (del as HTMLElement).onclick = () => {
                const ref = (del as HTMLElement).dataset.ref;
                if(ref) this.controlador?.deleteDona(ref);
            };
        });
    }
    public mostrar() {
        this.vista!.hidden = false;
        this.refreshTable(); 
    }
    public ocultar() {
        this.vista!.hidden = true;
    }
}