import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatMenuModule } from '@angular/material/menu';
import {MatDialogModule} from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { InventarioIndexComponent } from './inventario-index/inventario-index.component';
import { InventarioDetailComponent } from './inventario-detail/inventario-detail.component';
import { InventarioAllComponent } from './inventario-all/inventario-all.component';
import { InventarioDiagComponent } from './inventario-diag/inventario-diag.component';
import { InventarioFormComponent } from './inventario-form/inventario-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventarioIndexComponent,
    InventarioDetailComponent,
    InventarioAllComponent,
    InventarioDiagComponent,
    InventarioFormComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    ReactiveFormsModule, //Gestionar Formularios
  ]
})
export class InventarioModule { } 
