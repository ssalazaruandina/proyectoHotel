import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoHabitacion } from '../interfaces/tipoHabitacion';
import { DetalleReservaH } from '../interfaces/detalleReservaH';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHotelService {

  constructor(private http: HttpClient) { }

  getTipoH(){
    return this.http.get<TipoHabitacion[]>('http://localhost:3800/hotel/registrar/thabitaciones')
  }

  getTipoHById(id:any){
    return this.http.get('http://localhost:3800/hotel/registrar/thabitaciones',id)
  }

  postCliente(cliente:any){
    return this.http.post('http://localhost:3800/hotel/registrar/cliente',cliente)
  }

  postReserva(reserva:any){
    return this.http.post('http://localhost:3800/hotel/registrar/reserva',reserva)
  }

  postDetalleReservaH(detalleReservaH: any): Observable<DetalleReservaH>{
    return this.http.post<DetalleReservaH>('http://localhost:3800/hotel/registrar/detalleReservaH',detalleReservaH)
  }

  postPago(pago:any){
    return this.http.post('http://localhost:3800/hotel/registrar/pago',pago)
  }
}
