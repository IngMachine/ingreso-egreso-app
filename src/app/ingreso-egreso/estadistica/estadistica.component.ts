import { Component, OnInit } from '@angular/core';
import { Label, SingleDataSet} from 'ng2-charts';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import { AppStateR } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: SingleDataSet = [];

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  susbcrition: Subscription;

  constructor(
    private store: Store<AppStateR>
  ) { }

  ngOnInit(): void {
    this.susbcrition = this.store.select('ingresoEgreso')
                                 .subscribe( ingresoEgreso => {
                                   this.contarIngresoEgreso( ingresoEgreso.items );
                                 });
  }

  contarIngresoEgreso( items: IngresoEgreso[]) : void{
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {
      if ( item.tipo === 'ingreso' ){
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [ this.ingresos, this.egresos];
  }

}
