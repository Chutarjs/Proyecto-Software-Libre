import { TipoMovimiento } from "@prisma/client";

export const ajusteInventario = [
    // Ajuste 1 
    {
        id: 1,
        fecha: new Date('2024-2-22'),
        bodegaId: 1,
        usuarioId: 1,
        tipoMovimiento: TipoMovimiento.ENTRADA,
        justificacion: 'Entrada de producto'
    },
    // Ajuste 2
    {
        id: 2,
        fecha: new Date('2024-2-26'),
        bodegaId: 1,
        usuarioId: 2,
        tipoMovimiento: TipoMovimiento.ENTRADA,
        justificacion: 'Entrada de producto'
    },
    // Ajuste 3
    {
        id: 3,
        fecha: new Date('2024-2-20'),
        bodegaId: 2,
        usuarioId: 2,
        tipoMovimiento: TipoMovimiento.ENTRADA,
        justificacion: 'Entrada de producto'
    },
    // Ajuste 4 
    {
        id: 4,
        fecha: new Date('2024-2-13'),
        bodegaId: 3,
        usuarioId: 1,
        tipoMovimiento: TipoMovimiento.ENTRADA,
        justificacion: 'Entrada de producto'
    },
    // Ajuste 5 
    {
        id: 5,
        fecha: new Date('2024-2-10'),
        bodegaId: 3,
        usuarioId: 3,
        tipoMovimiento: TipoMovimiento.ENTRADA,
        justificacion: 'Entrada de producto'
    },
    // Ajuste 6 
    {
        id: 6,
        fecha: new Date('2024-1-21'),
        bodegaId: 2,
        usuarioId: 2,
        tipoMovimiento: TipoMovimiento.ENTRADA,
        justificacion: 'Entrada de producto'
    },
  ];
  