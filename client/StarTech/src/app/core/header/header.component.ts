import { Component } from '@angular/core';
import { CartService } from '../../share/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../share/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAutenticated:boolean;
  currentUser:any;
  qtyItems:Number=0;
  constructor(private cartService: CartService,
      private router: Router,
     private authService:AuthenticationService
    ){
    //Obtener valor actual de la cantidad de compra
    this.qtyItems=this.cartService.quantityItems()
    
  }
  ngOnInit(): void {
    //Sucripción para gestionar la cantidad de items comprados
    this.cartService.countItems.subscribe((valor)=>{
      this.qtyItems=valor
    })
    //Suscripción al booleano que indica si el usuario esta autenticado
    this.authService.isAuthenticated.subscribe((valor)=>(
      this.isAutenticated=valor
    ))
    //Suscripción para acceder a la información del usuario actual
    this.authService.decodeToken.subscribe((user:any)=>(
      this.currentUser=user
    ))
    console.log(this.currentUser);
  }

  login(){
    this.router.navigate(['usuario/login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio']);
  }
}
