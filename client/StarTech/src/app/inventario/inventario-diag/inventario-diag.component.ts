import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-inventario-diag',
  templateUrl: './inventario-diag.component.html',
  styleUrls: ['./inventario-diag.component.css']
})
export class InventarioDiagComponent implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<InventarioDiagComponent>,
    @Inject(GenericService) private gService:GenericService
  ) { 
    this.datosDialog=data;
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerBodega(this.datosDialog.id);
    }
  }
  obtenerBodega(id:any){
    this.gService
    .get('bodega',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
    });
   
  }
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
