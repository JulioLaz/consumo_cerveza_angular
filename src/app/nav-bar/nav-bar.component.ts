import { Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isCalcularPage: boolean = false;

  constructor(private router: Router) {
    // Detectar cambios en la ruta y actualizar la variable isCalcularPage
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCalcularPage = event.url === '/calcular';
      }
    });
  }
}
