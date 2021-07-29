import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {
  
  miFormulario: FormGroup = this.fb.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true, Validators.required ],
    condiciones: [ false, Validators.requiredTrue ]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }
  
  constructor( private fb: FormBuilder) { }

 ngOnInit(): void {

  //  this.miFormulario.reset( {  
  //     ...this.persona,
  //     condiciones: false,
  //     });
  this.miFormulario.reset(this.persona);
  //  este reset del oninit pone a null cualquier valor 
  // que no de la persona, en este caso, las condiciones y asi se mostrara al refrescar la pagina
  //en otras palabras, los valores por defecto de los controles del formgroup no sirven en este caso para nada
  
  // ***** Con esto puedo suscribirme a los cambios en un campo en particular
  
  // this.miFormulario.get('condiciones')?.valueChanges.subscribe( form => {
  //   console.log(form);
  // });

  // ***** Y con este a los cambios en cualquier parte del formulario

  this.miFormulario.valueChanges.subscribe( ({ condiciones, ...rest}) => {
    // delete form.condiciones;
    this.persona = rest;
  });
 }

 guardar() {

  const formValue= {...this.miFormulario.value};
  delete formValue.condiciones;
  
  this.persona = formValue;

  
 }

}
