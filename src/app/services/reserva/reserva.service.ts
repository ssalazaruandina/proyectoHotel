import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Reserva } from 'src/app/interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  
  private reserva: Reserva = {
    CodReserva: "",
    CodCliente: "",
    NumHabitaciones: 0,
    FechaReserva: "",
    FechaLlegada: "",
    FechaSalida: ""
  }

  private cliente: Cliente = {
    CodCliente: "",
    ApellidoP: "",
    ApellidoM: "",
    Nombres: "",
    Dni: "",
    Sexo: "",
    Nacionalidad: "",
    Celular: "",
    Email: ""
  }

  constructor() { }

  getCliente(){
    return this.cliente
  }

  setCliente(setCliente:Cliente){
    this.cliente = setCliente
  }

  getReserva(){
    return this.reserva
  }

  setReserva(setReserva:Reserva){
    this.reserva = setReserva
  }
}
