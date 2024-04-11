//Este controlador manejará la lógica de carga de datos desde el archivo Excel y la interacción con la base de datos

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cargarDatosDesdeExcel(req, res) {
    console.log('Solicitud recibida para cargar datos desde Excel');
    console.log('Datos recibidos:', req.body); // Verifica los datos recibidos en el cuerpo de la solicitud
  
    const archivoExcel = req.file; // Archivo Excel recibido en la solicitud
    

    // Aquí implementamos la lógica para procesar el archivo Excel y actualizar la base de datos
    try {
        // Validación de datos (verificar si ya existe un inventario con el mismo producto y bodega)
        // Si no existe, insertar nuevo registro en la base de datos
        // Si existe, retornar un mensaje de error
        const inventarioExistente = await prisma.inventario.findFirst({
            where: {
                productoId: req.body.productoId,
                bodegaId: req.body.bodegaId
            }
        });

        if (inventarioExistente) {
            return res.status(400).json({ error: 'El inventario ya existe para este producto y bodega.' });
        }

        // Si no hay inventario existente, puedes insertar el nuevo registro
        const nuevoInventario = await prisma.inventario.create({
            data: {
                productoId: req.body.Producto,
                bodegaId: req.body.Bodega,
                cantidadStock: req.body.cantidadStock,
                cantidadMinima: req.body.cantidadMinima,
                cantidadMaxima: req.body.cantidadMaxima
            }
        });

        return res.status(200).json({ message: 'Datos del inventario cargados con éxito.' });
    } catch (error) {
        console.error('Error al cargar datos desde Excel:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar los datos del archivo Excel.' });
    }
}

module.exports = {
    cargarDatosDesdeExcel
};
