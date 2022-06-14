import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarReservaComponent } from './components/confirmar-reserva/confirmar-reserva.component';
import { MainComponent } from './components/main/main.component';
import { ReservarClienteComponent } from './components/reservar-cliente/reservar-cliente.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/main', pathMatch: 'full'
  },

  {
    path: 'main', component: MainComponent
  },
  {
    path: 'reservar', component: ReservarClienteComponent
  },
  {
    path: 'confirmar', component: ConfirmarReservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
