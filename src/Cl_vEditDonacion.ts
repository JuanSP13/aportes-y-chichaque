import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";
import Cl_mDonacion , { iDonacion } from "./Cl_mDonacion.js";

export default class Cl_vEditDonacion extends Cl_vGeneral {
    private inFecha: HTMLInputElement;
    private inDescripcion: HTMLInputElement;
    private inMonto: HTMLInputElement;
    private inNombre: HTMLInputElement;
    private inTipoDonacion: HTMLInputElement;
    private inTipoDonador: HTMLInputElement;
    private btCancelar: HTMLButtonElement;
    private btGuardar: HTMLButtonElement;
    private editingNombre: string | null = null;
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

    public cargarDatos(trans: iDonacion) {
        this.editingNombre = trans.nombre;
        this.inFecha.value = trans.fecha;
        this.inDescripcion.value = trans.descripcion;
        this.inMonto.value = trans.monto.toString();
        this.inNombre.value = trans.nombre;
        this.inTipoDonacion.value = trans.tipoDonacion.toString();
        this.inTipoDonador.value = trans.tipoDonador.toString();
        this.inNombre.disabled = true;
    }
    private guardar() {
        if (!this.inFecha.value || !this.inDescripcion.value || !this.inMonto.value || !this.inNombre.value || !this.inTipoDonacion.value || !this.inTipoDonador.value) {
            alert("Debes llenar todos los campos.");
            return;
        }
        if (+this.inMonto.value <= 0){ 
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
    private cancelar() {
        this.limpiar();
        this.editingNombre = null;
        this.inNombre.disabled = false;
        this.controlador?.mostrarVista("donaciones");
    }
    private limpiar() {
        this.inFecha.value = "";
        this.inDescripcion.value = "";
        this.inNombre.value = "";
        this.inMonto.value = "";
        this.inTipoDonacion.value = "";
        this.inTipoDonador.value = "";
    }
    public mostrar() { this.vista!.hidden = false; }
    public ocultar() { this.vista!.hidden = true; }
}