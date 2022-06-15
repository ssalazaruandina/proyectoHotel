import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Pago } from 'src/app/interfaces/pago';
import { Reserva } from 'src/app/interfaces/reserva';
import { TipoHabitacion } from 'src/app/interfaces/tipoHabitacion';

import { ApiHotelService } from 'src/app/services/api-hotel.service';
import { ReservaService } from 'src/app/services/reserva/reserva.service';

import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Countries, countries } from 'src/app/interfaces/shared/countries';
import { Router } from '@angular/router';
import { DetalleReservaH } from 'src/app/interfaces/detalleReservaH';


@Component({
  selector: 'app-reservar-cliente',
  templateUrl: './reservar-cliente.component.html',
  styleUrls: ['./reservar-cliente.component.css']
})
export class ReservarClienteComponent implements OnInit {

  panelOpenState:boolean = false;

  public formCliente: FormGroup = new FormGroup({
    CodCliente: new FormControl(''),
    ApellidoP: new FormControl(''),
    ApellidoM: new FormControl(''),
    Nombres: new FormControl(''),
    Dni: new FormControl(''),
    Sexo: new FormControl(''),
    Nacionalidad: new FormControl(''),
    Celular: new FormControl(''),
    Email: new FormControl('')
  });

  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });

  reserva: Reserva = this.reservaVacia();

  detalleReservaH: DetalleReservaH = this.detalleReservaHVacio();

  pago: Pago = this.pagoVacio();

  listaTipoH: TipoHabitacion[] = []
  constructor(private router:Router,
              private apiReserva: ApiHotelService,
              private serviceReserva: ReservaService,
              private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.apiReserva.getTipoH().subscribe(data=>{
      this.listaTipoH=data
    })
    // this.formFechas = this.formBuilder.group({

    // })
    this.formCliente = this.formBuilder.group({
      CodCliente: [""],
      ApellidoP: ["",[Validators.required]],
      ApellidoM: ["",[Validators.required]],
      Nombres: ["",[Validators.required]],
      Dni: ["",[Validators.required]],
      Sexo: ["",[Validators.required]],
      Nacionalidad: ["",[Validators.required]],
      Celular: ["",[Validators.required]],
      Email: ["",[Validators.required,Validators.email]]
    })
  }

  // habitacion:string = "";
  
  reservaVacia(): Reserva {
    return {
      CodReserva: "",
      CodCliente: "",
      NumHabitaciones: 0,
      FechaReserva: "",
      FechaLlegada: "",
      FechaSalida: ""
    }
  }

  clienteVacio(): Cliente {
    return {
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
  }

  detalleReservaHVacio(): DetalleReservaH{
    return {
      CodDetalleReservaH: "",
      CodReserva: "",
      CodTipoH: ""
    }
  }

  pagoVacio(): Pago{
    return {
      CodPago: "",
      CodReserva: "",
      Monto: 0
    }
  }

  //AGREGAR CARRITO
  listaCarrito: TipoHabitacion[] = [];
  posicionActual: number = -1;

  precio: number = 0

 onAgregarCarrito(i: number){
    this.posicionActual = i;
    this.listaCarrito.push(this.listaTipoH[this.posicionActual])
    this.precio = this.calcularValor()
    if(this.listaCarrito.length>=this.reserva.NumHabitaciones){
      this.disabled=true
    }else{
      this.disabled=false
    }
  }

  disabled: boolean = true;

  calcularValor(): number {
    return this.listaCarrito.reduce((valorActual, item) => valorActual + item.Precio, 0);
  }

  onEliminarCarrito(i:number){
    this.posicionActual = i;
    this.listaCarrito.splice(i,1) //Debe eliminar buscando posicion
    this.precio = this.calcularValor()
    if(this.listaCarrito.length>=this.reserva.NumHabitaciones){
      this.disabled=true
    }else{
      this.disabled=false
    }
  }

  onChange(): void{    
    if(this.listaCarrito.length>=this.reserva.NumHabitaciones){
      this.disabled=true
    }else{
      this.disabled=false
    }
  }

  datosIncorrectos:boolean = false;
  validar(form: FormGroup):void{
    if( form.valid ){
      console.log("correcto")
      this.router.navigate(['confirmar']);
    }
    else{
      console.log("datos incorrectos")
      this.datosIncorrectos = true;
    }
  }

  reservaCod: string = "";
  // Pagando
  async onPagar(){
    this.formCliente.value.CodCliente = "0001-"+(Math.floor(Math.random() * (9999 - 4000)) + 4000).toString();
    this.reserva.CodReserva = (Math.floor(Math.random() * (9999 - 4000)) + 4000).toString()
    this.reservaCod = this.reserva.CodReserva;
    let tiempoHoy = Date.now()
    this.reserva.FechaReserva = new Date(tiempoHoy).toDateString();
    this.reserva.CodCliente = this.formCliente.value.CodCliente;
    
    this.detalleReservaH.CodReserva = this.reservaCod;

    this.apiReserva.postCliente(this.formCliente.value).subscribe( data => {
    })
    
    this.apiReserva.postReserva(this.reserva).subscribe(data => {
    })

    this.pago.CodPago = (Math.floor(Math.random() * (99999999 - 40000000)) + 40000000).toString();
    this.pago.CodReserva =  this.reservaCod
    this.pago.Monto = this.precio;

    this.apiReserva.postPago(this.pago).subscribe(data => {
    })  

    //Detalle de habitaciones en la reserva
    for(let i = 0; i<this.listaCarrito.length; i++){
      this.detalleReservaH.CodDetalleReservaH = (Math.floor(Math.random() * (99999999 - 40000000)) + 40000000).toString();
      this.detalleReservaH.CodTipoH = this.listaCarrito[i].CodTipoH
      this.apiReserva.postDetalleReservaH(this.detalleReservaH).subscribe(data=>{
        this.detalleReservaH = this.detalleReservaHVacio();
      })
    }
    
    this.validar(this.formCliente)

    this.serviceReserva.setCliente(this.formCliente.value)
    this.serviceReserva.setReserva(this.reserva)
    this.pago = this.pagoVacio();
    this.reserva = this.reservaVacia();
    this.detalleReservaH = this.detalleReservaHVacio();
    this.formCliente.reset()
    this.precio = 0;
    this.listaCarrito = []

  }
 
  //Email correcto
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese un email válido';
    }

    return this.email.hasError('email') ? 'No es un email válido' : '';
  }

  public listCountries: Countries[] = countries;

}