import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";

export default class vDonacion extends Cl_vGeneral {
    private inFecha: HTMLInputElement;
    private inDescripcion: HTMLInputElement;
    private inMonto: HTMLInputElement;
    private inNombre: HTMLInputElement;
    private inTipoDonacion: HTMLInputElement;
    private inTipoDonador: HTMLInputElement;
    private btVolver: HTMLButtonElement;
    private btGuardar: HTMLButtonElement;
    
    constructor(){
        super({formName: "registroDonacion"})
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

    private guardar(){ //ARREGLADO
        if (!this.inFecha.value || !this.inDescripcion.value || !this.inMonto.value || !this.inNombre.value || !this.inTipoDonacion.value || !this.inTipoDonador.value){ 
            alert("Debes llenar todos los campos.");
            return;}
        if (+this.inMonto.value <= 0){ 
            alert("El monto debe ser mayor a 0.");
            return;
        }
        if (this.inNombre.value.length !== 4){
            alert("El nombre debe tener 4 letras.");
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
    private volver(){
        this.limpiar();
        this.controlador?.mostrarVista("donaciones");
    }

    private limpiar() {
        this.inFecha.value = "";
        this.inDescripcion.value = "";
        this.inNombre.value = "";
        //Prueba
        this.inMonto.value = "";
        this.inTipoDonacion.value = "";
        this.inTipoDonador.value = "";
    }

    public mostrar() { this.vista!.hidden = false; }
    public ocultar() { this.vista!.hidden = true; }
        
}

