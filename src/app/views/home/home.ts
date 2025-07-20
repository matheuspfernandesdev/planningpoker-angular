import { Component, OnInit, NgZone } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import * as signalr from '@microsoft/signalr'
import { NameDialog } from '../../shared/name-dialog/name-dialog';
import { DialogRef } from '@angular/cdk/dialog';

interface Message {
  userName: string,
  text: string
}

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{ 

  currentYear: number = new Date().getFullYear();

  messages: Message[] = []
  messageControl = new FormControl('');
  userName! :string;
  connection = new signalr.HubConnectionBuilder()
    .withUrl("https://localhost:44393/chat", {
      withCredentials: true
    })
    .build();

  constructor(public dialog: MatDialog, private ngZone: NgZone) { 
    this.openDialog();
  }

  ngOnInit(): void {

  }

  openDialog(){
    const dialogRef = this.dialog.open(NameDialog, {
      width: '250px',
      data: this.userName,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      this.userName = result;
      this.startConnection();
    })
  }

  startConnection(){
    this.connection.on("newMessage", (userName: string, text: string) => {
      console.log('this.connection.on');
      this.ngZone.run(() => {
        console.log('ngZone.run');
        this.messages.push({
          text: text,
          userName: userName
        })
      })
    })

    this.connection.start()
      .then(() => {
      console.log('SignalR conectado!');
      })
      .catch(err => {
        console.error('Erro ao conectar SignalR:', err);
      });
  }

  sendMessage() { 
     this.connection.send("newMessage", this.userName, this.messageControl.value)
      .then(() => {
        this.messageControl.setValue('');
      })
  }

}
