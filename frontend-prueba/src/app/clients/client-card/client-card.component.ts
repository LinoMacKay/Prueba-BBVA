import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { CreateClientComponent } from '../create-client/create-client.component';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientCardComponent {
  @Input() client: Client = new Client('Test', 0);
  @Output() resultEmitter = new EventEmitter();

  constructor(public dialog: MatDialog, private clientService: ClientService) {}

  ngOnInit(): void {}

  openEdit() {
    const dialogRef = this.dialog
      .open(CreateClientComponent, {
        width: '30vw',
        height: '50vh',
        data: {
          personToEdit: this.client,
        },
      })
      .afterClosed()
      .subscribe((data: any) => {
        console.log(data);
        this.resultEmitter.emit();
      });
  }
}
