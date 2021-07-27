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

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Darío',
    favoritos: [
      { id: 1, nombre: 'Dark Souls 3'},
      { id: 2, nombre: 'Hollow Knight'}
    ]
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
            id: this.persona.favoritos.length+1,
            nombre: this.nuevoJuego
          };
    this.persona.favoritos.push( {...nuevoFavorito} );
    this.nuevoJuego = '';

  }

  eliminar( id: number ): void {
    console.log(id);

    var index = this.persona.favoritos.map(x => {
      if(x.id>1){
        return x.id--;
      }else{
        return x.id;
      }
    }).indexOf(id);

    
    this.persona.favoritos.splice(index, 1);
    
  }


  guardar() {
    console.log('formulario posteado');
  }

}
