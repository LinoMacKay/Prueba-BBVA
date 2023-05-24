import { Component } from '@angular/core';
import { Client } from '../models/client';
import { MatDialog } from '@angular/material/dialog';

import { CreateClientComponent } from './create-client/create-client.component';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  constructor(public dialog: MatDialog, private clientService: ClientService) {}
  clients: Client[] = [];

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.clientService.getAllClients().subscribe((data: any) => {
      this.clients = data;
      console.log(this.clients);
      // this.candidatosFiltered = this.candidatos;
    });
  }

  createClient() {
    const dialogRef = this.dialog
      .open(CreateClientComponent, {
        width: '30vw',
        height: '50vh',
      })
      .afterClosed()
      .subscribe((response: any) => {
        this.initialize();
      });
  }
}
