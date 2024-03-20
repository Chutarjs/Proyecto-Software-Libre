import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImpresiónService {

  constructor() { }
  imprimir(encabezado : string [], body : Array<any>, title : string, guardar?: boolean){
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    doc.text(title, doc.internal.pageSize.width / 2, 25, {align:'center'})
    autoTable(doc, {
      theme: 'striped',
      head: [encabezado],
      body: body
    });
    if(guardar){
      const hoy = new Date();
      doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + ".pdf");
    }
    else
    {
      
    }
  }
  imprimirTabla(encabezado : string [], body : Array<any>, title : string, guardar?: boolean){
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: 'letter'
    });
    doc.text(title, doc.internal.pageSize.width / 2, 25, {align:'center'})
    autoTable(doc, {
      theme: 'grid',
      head: [encabezado],
      body: body
    });
    if(guardar){
      const hoy = new Date();
      doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + ".pdf");
    }
    else
    {
      
    }
  }
}
