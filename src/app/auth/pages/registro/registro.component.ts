import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  // TODO: temporal
  nombreApellidoPattern: string = '([a-zA-z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  noPuedeSerCabesa( control: FormControl ) {
    const valor: string = control.value?.trim().toLowerCase();

    if( valor === 'cabesa') {
      return {
        noCabesa: true
      }
      // Esto ya se considera un error
    }
    return null;
    // Si se retorna un null en una validación, eso quiere decir que no hubo ningún error
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)] ],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern) ] ],
    // Podriamos usar el Validators.email, pero F Herrera no se fía de esa validación.
    username: ['',[Validators.required, this.noPuedeSerCabesa ], ],
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Dario Ojeda',
      email: 'dario_1887@gmail.com',
      username: 'Cabesita'
    })
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
              && this.miFormulario.get(campo)?.touched;

  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
