import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjusteInventarioRoutingModule } from './ajuste-inventario-routing.module';
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
import { AjusteInventarioDetailComponent } from './ajuste-inventario-detail/ajuste-inventario-detail.component';
import { AjusteInventarioIndexComponent } from './ajuste-inventario-index/ajuste-inventario-index.component';
import { AjusteInventarioFormComponent } from './ajuste-inventario-form/ajuste-inventario-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AjusteInventarioDetailComponent,
    AjusteInventarioIndexComponent,
    AjusteInventarioFormComponent
  ],
  imports: [
    CommonModule,
    AjusteInventarioRoutingModule,
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
export class AjusteInventarioModule { }
