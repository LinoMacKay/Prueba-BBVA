import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,

    private clientService: ClientService,
    private snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}
  client: Client = new Client('', 0);
  isNew = true;

  clientForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    edad: new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    if (this.data != null) {
      this.client = this.data.personToEdit;
      this.initializeFormToEdit();
      this.isNew = false;
    } else {
      //    this.candidateForm.reset();
    }
  }

  initializeFormToEdit() {
    this.clientForm.patchValue({
      nombres: this.client.nombres,
      edad: this.client.edad,
    });
  }

  submitForm() {
    if (this.clientForm.valid) {
      let body = {
        nombres: this.clientForm.get('nombres')?.value,
        edad: this.clientForm.get('edad')?.value,
      };
      if (this.isNew) {
        this.clientService.createClients(body).subscribe((response: any) => {
          this.dialogRef.close();
          this.snackBar.open('Se ha guardado correctamente', '', {
            duration: 2000,
            panelClass: ['green-snackbar'],
          });
        });
      } else {
        this.clientService
          .updateClients(body, this.client.id!)
          .subscribe((response: any) => {
            this.dialogRef.close();
            this.snackBar.open('Se ha guardado correctamente', '', {
              duration: 2000,
              panelClass: ['green-snackbar'],
            });
          });
      }
    } else {
      this.snackBar.open('Rellene el formulario correctamente', '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
    }
  }

  deleteClient() {
    this.clientService.deleteClients(this.client.id!).subscribe({
      next: () => {
        this.closeDialog();
        this.snackBar.open('Se ha eliminado correctamente', '', {
          duration: 2000,
          panelClass: ['green-snackbar'],
        });
      },
      error: () => {
        this.closeDialog();
      },
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
