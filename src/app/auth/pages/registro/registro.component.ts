import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerCabesa } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)] ],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern) ] ],
    // Podriamos usar el Validators.email, pero F Herrera no se fía de esa validación.
    username: ['',[Validators.required, this.vs.noPuedeSerCabesa ], ],
    password: ['',[Validators.required, Validators.minLength(6)], ],
    password2: ['',[Validators.required ], ],
  },/*Opciones que le podemos mandar al form group*/ {
    validators: [this.vs.camposIguales('password','password2')]
  })

  constructor( private fb: FormBuilder,
               private vs: ValidatorService ) { }

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
