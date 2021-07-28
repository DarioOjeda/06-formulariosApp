import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent{

  miFormulario: FormGroup = this.fb.group({
     nombre: ['',  [Validators.required, Validators.minLength(3)]],
     favoritos: this.fb.array( [
       [ 'Metal Gear', Validators.required ],
       [ 'Hollow Knight', Validators.required],
     ], Validators.required )
    //  esta ultima restriccion determina que al menos debe haber un formcontrol
    });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required)

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }
  constructor( private fb: FormBuilder ) { }

  guardar() {
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value)
    
    this.miFormulario.reset();
  }

  comprobarCampo( nombreCampo: string ): boolean | null{
    return this.miFormulario.controls[nombreCampo].errors 
    && this.miFormulario.controls[nombreCampo].touched;
  }

  agregarFavorito() {
    if(this.nuevoFavorito.invalid){return;}

    // this.favoritosArr.push(new FormControl( this.nuevoFavorito.value, Validators.required));
    this.favoritosArr.push(this.fb.control( this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();
  }

  borrar(index: number) {
    this.favoritosArr.removeAt(index)
  }
}
