import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class vDonacion extends Cl_vGeneral {
    inFecha;
    inDescripcion;
    inMonto;
    inNombre;
    inTipoDonacion;
    inTipoDonador;
    btVolver;
    btGuardar;
    constructor() {
        super({ formName: "registroDonacion" });
        this.inFecha = this.crearHTMLInputElement("inFecha");
        this.inDescripcion = this.crearHTMLInputElement("inDescripcion");
        this.inMonto = this.crearHTMLInputElement("inMonto");
        this.inNombre = this.crearHTMLInputElement("inNombre");
        this.inTipoDonacion = this.crearHTMLInputElement("inTipoDonacion");
        this.inTipoDonador = this.crearHTMLInputElement("inTipoDonador");
        this.btGuardar = this.crearHTMLButtonElement("btGuardar", {
            onclick: () => this.guardar()
        });
        this.btVolver = this.crearHTMLButtonElement("btVolver", {
            onclick: () => this.volver()
        });
    }
    guardar() {
        if (!this.inFecha.value || !this.inDescripcion.value || !this.inMonto.value || !this.inNombre.value || !this.inTipoDonacion.value || !this.inTipoDonador.value) {
            alert("Debes llenar todos los campos.");
            return;
        }
        if (+this.inMonto.value <= 0) {
            alert("El monto debe ser mayor a 0.");
            return;
        }
        const data = {
            fecha: this.inFecha.value,
            descripcion: this.inDescripcion.value.toLowerCase(),
            monto: parseFloat(this.inMonto.value || "0"),
            nombre: this.inNombre.value.trim().toUpperCase(),
            tipoDonacion: parseInt(this.inTipoDonacion.value || "0", 10),
            tipoDonador: parseInt(this.inTipoDonador.value || "0", 10)
        };
        this.controlador?.procesarDonacion(data);
        this.limpiar();
    }
    volver() {
        this.limpiar();
        this.controlador?.mostrarVista("donaciones");
    }
    limpiar() {
        this.inFecha.value = "";
        this.inDescripcion.value = "";
        this.inNombre.value = "";
        //Prueba
        this.inMonto.value = "";
        this.inTipoDonacion.value = "";
        this.inTipoDonador.value = "";
    }
    mostrar() { this.vista.hidden = false; }
    ocultar() { this.vista.hidden = true; }
}
