import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent{

  persona: Persona = {
    nombre: 'Darío',
    favoritos: [
      { id: 1, nombre: 'Dark Souls 3'},
      { id: 2, nombre: 'Hollow Knight'}
    ]
  }


  guardar() {
    console.log('formulario posteado');
  }

}
