import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent{

  miFormulario: FormGroup = this.fb.group({
     nombre: ['',  [Validators.required, Validators.minLength(4)]]
  });

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

}
