import { NgModule } from '@angular/core';

import { MatNativeDateModule,
         MatDatepickerModule,
         MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatRippleModule,
         MatSelectModule,
         MatDialogModule
  
  } from '@angular/material';

  import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const materialComponents = [
  MatNativeDateModule, 
  MatDatepickerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  ReactiveFormsModule,
  FormsModule,
  MatSelectModule,
  MatDialogModule
]
@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
