import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { Reserva } from 'src/app/interfaces/reserva';

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrls: ['./confirmar-reserva.component.css']
})
export class ConfirmarReservaComponent implements OnInit {

  constructor(private serviceReserva: ReservaService) { }

  cliente: Cliente = this.serviceReserva.getCliente()
  reserva: Reserva = this.serviceReserva.getReserva()
  ngOnInit(): void { 
  }
  
  convertPDF(){
    html2canvas(document.getElementById("main")!).then(canvas =>{
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p','mm','a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 20, width, height)
      pdf.save('reserva.pdf');
    })
  }

}
