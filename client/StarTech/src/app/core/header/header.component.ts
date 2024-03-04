import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAutenticated:boolean;
  currentUser:any;
  qtyItems:Number=0;
  constructor(){
    this.isAutenticated=false
    this.currentUser={
      name: "Gabriel García",
      email: "ggarcia@prueba.com"
    }
  }
  login(){
    
  }
}
