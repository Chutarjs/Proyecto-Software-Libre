import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { BodegaAllComponent } from './bodega-all/bodega-all.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BodegaRoutingModule } from './bodega-routing.module';
import { BodegaFormComponent } from './bodega-form/bodega-form.component';


@NgModule({
  declarations: [
    BodegaAllComponent,
    BodegaFormComponent
  ],
  imports: [
    CommonModule,
    BodegaRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class BodegaModule { }
