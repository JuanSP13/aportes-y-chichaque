import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vEditDonacion extends Cl_vGeneral {
    inFecha;
    inDescripcion;
    inMonto;
    inNombre;
    inTipoDonacion;
    inTipoDonador;
    btCancelar;
    btGuardar;
    editingNombre = null;
    constructor() {
        super({ formName: "editDonacion" });
        this.inFecha = this.crearHTMLInputElement("inFecha");
        this.inDescripcion = this.crearHTMLInputElement("inDescripcion");
        this.inMonto = this.crearHTMLInputElement("inMonto");
        this.inNombre = this.crearHTMLInputElement("inNombre");
        this.inTipoDonacion = this.crearHTMLInputElement("inTipoDonacion");
        this.inTipoDonador = this.crearHTMLInputElement("inTipoDonador");
        this.btGuardar = this.crearHTMLButtonElement("btGuardar", {
            onclick: () => this.guardar()
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => this.cancelar()
        });
    }
    cargarDatos(dona) {
        this.editingNombre = dona.nombre;
        this.inFecha.value = dona.fecha;
        this.inDescripcion.value = dona.descripcion;
        this.inMonto.value = dona.monto.toString();
        this.inNombre.value = dona.nombre;
        this.inTipoDonacion.value = dona.tipoDonacion.toString();
        this.inTipoDonador.value = dona.tipoDonador.toString();
        this.inNombre.disabled = true;
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
            nombre: this.editingNombre ?? this.inNombre.value.trim().toUpperCase(),
            tipoDonacion: parseInt(this.inTipoDonacion.value || "0", 10),
            tipoDonador: parseInt(this.inTipoDonador.value || "0", 10)
        };
        this.controlador?.procesarDonacion(data);
        this.limpiar();
        this.editingNombre = null;
        this.inNombre.disabled = false;
    }
    cancelar() {
        this.limpiar();
        this.editingNombre = null;
        this.inNombre.disabled = false;
        this.controlador?.mostrarVista("donaciones");
    }
    limpiar() {
        this.inFecha.value = "";
        this.inDescripcion.value = "";
        this.inNombre.value = "";
        this.inMonto.value = "";
        this.inTipoDonacion.value = "";
        this.inTipoDonador.value = "";
    }
    mostrar() { this.vista.hidden = false; }
    ocultar() { this.vista.hidden = true; }
}
