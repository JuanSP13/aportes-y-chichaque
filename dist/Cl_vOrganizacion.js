import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vOrganizacion extends Cl_vGeneral {
    divDonaciones;
    btAdd;
    constructor() {
        super({ formName: "donaciones" });
        this.divDonaciones = this.crearHTMLElement("divDonaciones");
        this.btAdd = this.crearHTMLButtonElement("btAdd", {
            onclick: () => this.controlador?.mostrarVista("registro")
        });
    }
    refreshTable() {
        if (!this.controlador)
            return;
        let htmlTable = "";
        const donaciones = this.controlador.dtDonaciones;
        donaciones.forEach((trans) => {
            htmlTable += `
            <tr>
                <td>${trans.fecha}</td>
                <td>${trans.descripcion}</td>
                <td>${trans.tipoDonacion === 1 ? "Efectivo" : "Material"}</td>
                <td class= "${trans.monto ? "positive-amount " : "negative-amount"}">${trans.monto ? trans.monto.toFixed(2) : "--"}</td>
                <td>${trans.nombre}</td>
                <td>${trans.tipoDonadorTexto()}</td>
                <td>
                    <button class="btDetails" data-ref="${trans.nombre}" title="Detalles de la Donacion" style=" font-size: 1rem; color:black; background:black; border:2px solid black; padding:3px;">❔</button>
                    <button class="btEdit" data-ref="${trans.nombre}" title="Editar Donacion" style=" font-size: 1rem; color:black; background:black; border:2px solid black; padding:3px;">⚙️</button>
                    <button class="btDelete" data-ref="${trans.nombre}" title="Eliminar Donacion" style=" font-size: 1rem; color:red; background:red; border:2px solid black; padding:3px;">🗑️</button>
                </td>
            </tr>`;
        });
        this.divDonaciones.innerHTML = htmlTable;
        this.asignarEventos();
    }
    asignarEventos() {
        //Detalles
        this.divDonaciones.querySelectorAll(".btDetails").forEach((det) => {
            det.onclick = () => {
                const ref = det.dataset.ref;
                if (ref)
                    this.controlador?.vDetails(ref);
            };
        });
        //Editar
        this.divDonaciones.querySelectorAll(".btEdit").forEach((edi) => {
            edi.onclick = () => {
                const ref = edi.dataset.ref;
                if (ref)
                    this.controlador?.vEdit(ref);
            };
        });
        //Eliminar
        this.divDonaciones.querySelectorAll(".btDelete").forEach((del) => {
            del.onclick = () => {
                const ref = del.dataset.ref;
                if (ref)
                    this.controlador?.deleteTrans(ref);
            };
        });
    }
    mostrar() {
        this.vista.hidden = false;
        this.refreshTable();
    }
    ocultar() {
        this.vista.hidden = true;
    }
}
