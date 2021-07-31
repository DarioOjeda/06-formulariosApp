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
