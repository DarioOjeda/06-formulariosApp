import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerCabesa } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)] ],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern) ], [ this.emailValidator ] ],
    // Podriamos usar el Validators.email, pero F Herrera no se fía de esa validación.
    username: ['',[Validators.required, this.vs.noPuedeSerCabesa ], ],
    password: ['',[Validators.required, Validators.minLength(6)], ],
    password2: ['', ],
  },/*Opciones que le podemos mandar al form group*/ {
    validators: [this.vs.camposIguales('password','password2')]
  })

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required) {
      return 'El email es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El formato de email no es válido.';
    } else if( errors?.emailTomado){
      return 'El correo indicado ya está en uso.';
    }
    
    return '';
  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Dario Ojeda',
      email: 'test1@test.com',
      username: 'Cabesita',
      password: '123456',
      password2: '123456',
    })
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
              && this.miFormulario.get(campo)?.touched;

  }

  emailRequired() {
    return this.miFormulario.get('email')?.errors?.required
              && this.miFormulario.get('email')?.touched;
  }

  emailFormatInvalid() {
    return this.miFormulario.get('email')?.errors?.pattern
              && this.miFormulario.get('email')?.touched;
  }

  emailAreadyTaken() {
    return this.miFormulario.get('email')?.errors?.emailTomado
              && this.miFormulario.get('email')?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
