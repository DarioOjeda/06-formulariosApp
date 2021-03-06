import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  // miFormulario: FormGroup = new FormGroup({
  //   'nombre'   : new FormControl('RTX 3080ti'),
  //   precio     : new FormControl(1800),
  //   existencias: new FormControl(6),
  // })
  
  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3)] ],
    precio: [  , [Validators.required, Validators.min(0)]],
    existencias: [ , [Validators.required, Validators.min(0)] ]
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    // this.miFormulario.setValue({
    //   nombre: 'RTX 3080ti',
    //   precio: 1000,
    //   existencias: 10
    // });
    // Esto revienta si algunos de los valores necesarios no es proveido
    this.miFormulario.reset({
      nombre: 'RTX 3080ti',
      precio: 1000,
      existencias: 10
    });
  }

  campoEsValido( campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors 
    && this.miFormulario.controls[campo].touched;
  }


  guardar() {

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value)
    this.miFormulario.reset();
  }


}
