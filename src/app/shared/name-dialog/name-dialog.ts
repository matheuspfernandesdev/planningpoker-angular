import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-name-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDialogClose,
  ],
  templateUrl: './name-dialog.html',
  styleUrl: './name-dialog.scss'
})
export class NameDialog implements OnInit{
  
  constructor(    
      @Inject(MAT_DIALOG_DATA)

      public name: string,
      public dialogRef: MatDialogRef<NameDialog>
    ) {  }
    
    ngOnInit(): void {
      
    }
}
