import { Component } from '@angular/core';
import { ClimaService } from '../serveice/clima.service';
@Component({
  selector: 'app-calcular',
  templateUrl: './calcular.component.html',
  styleUrls: ['./calcular.component.css']
})
export class CalcularComponent {
  lluvia:number=0;
  coeficientes = [[5951.97633931], [684.73675898], [-60.7824355], [5401.08333866]];
  consumo_mean:number= 25401.3671232876;
  esFeriado: boolean = true;
  consumo_mean_lts:number=1000;
  consumo_mean_lts_result:number=0;
  mm_lluvia: number = 0;
  temp: number = 0;

  constructor(private climaService: ClimaService) { }
  ngOnInit(): void {
    this.calculo_sin_api()
  }

calculo_sin_api(): number {
  const x1 = this.temp;
  const x2 = this.lluvia;
  const x3 = this.esFeriado;

  let consumo: number;

  if (x3 == true) {
    const consumo_hoy = this.coeficientes[0][0] + x1 * this.coeficientes[1][0] + x2 * this.coeficientes[2][0] + this.coeficientes[3][0];
    consumo = (consumo_hoy - this.consumo_mean) * 100 / this.consumo_mean;
    this.consumo_mean_lts_result=(this.consumo_mean_lts*(consumo/100))+this.consumo_mean_lts
  } else if (x3 == false) {
    const consumo_hoy = this.coeficientes[0][0] + x1 * this.coeficientes[1][0] + x2 * this.coeficientes[2][0];
    consumo = (consumo_hoy - this.consumo_mean) * 100 / this.consumo_mean;
    this.consumo_mean_lts_result=(this.consumo_mean_lts*(consumo/100))+this.consumo_mean_lts
  } else {
    consumo = 0;
    this.consumo_mean_lts_result=0
  }
// console.log('consumo: ', consumo,' x1: ', x1,' x2: ', x2,' x3: ', x3)

  return consumo
}


}
