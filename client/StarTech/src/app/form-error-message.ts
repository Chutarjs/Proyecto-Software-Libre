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
  new ErrorMessage('subcategoria', 'required', 'Es requerido que seleccione una subcategoria')
];