export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
  }
//Mensajes de errores de validación
export const FormErrorMessage = [
  new ErrorMessage('nombre', 'required', 'El Nombre es requerido'),
  new ErrorMessage('nombre', 'minlength', 'El nombre debe tener 3 carácteres mínimo'),
  new ErrorMessage('descripcion', 'required', 'La descripción es requerida'),
  new ErrorMessage('costoUnitario', 'required', 'El precio es requerido'),
  new ErrorMessage('costoUnitario', 'pattern', 'El precio solo acepta números con dos decimales'),
  new ErrorMessage('mesesGarantia', 'required', 'Los meses de garantia son requeridos'),
  new ErrorMessage('categoria', 'required', 'Es requerido que seleccione una categoria'),
  new ErrorMessage('subcategoria', 'required', 'Es requerido que seleccione una subcategoria'),


  new ErrorMessage('bodegaId', 'required', 'La bodega es requerid1'),
  new ErrorMessage('productoId', 'required', 'El producto es requerido'),
  new ErrorMessage('cantidadStock', 'required', 'La cantidad en stock es requerida'),
  new ErrorMessage('cantidadMinima', 'required', 'Es requerido que ingrese la cantidad mínima de existencias'),
  new ErrorMessage('cantidadMinima', 'cantidadInvalida', 'La cantidad mínima debe ser menor que la máxima'),
  new ErrorMessage('cantidadMaxima', 'required', 'Es requerido que ingrese la cantidad máxima de existencias'),
  new ErrorMessage('cantidadMaxima', 'cantidadMaximaInvalida', 'La cantidad máxima debe ser mayor que la mínima'),

  new ErrorMessage('direccion', 'required', 'La direccion es necesaria'),
  new ErrorMessage('provincia', 'required', 'La provincia es requerida'),
  new ErrorMessage('canton', 'required', 'El canton es requerido'),
  new ErrorMessage('distrito', 'required', 'El distrito es requerido'),
  new ErrorMessage('correoElectronico', 'required', 'El correo es requerido'),
  new ErrorMessage('numeroTelefono', 'required', 'El telefono es requerido'),


];