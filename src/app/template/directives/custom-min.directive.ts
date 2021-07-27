import { Directive, Input } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[customMin][ngModel]',
    // Según este selector, necesita el elemento del DOM pretinente
    // tener esa propiedad customMin y ser un ngModel, si no, no va a entrar a nuestra directiva.
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator {
    
    @Input() minimo!: number;

    constructor() {
        console.log('Directiva customMin')
    }

    validate( control: FormControl ) {
        const inputValue = control.value;

        return (inputValue < this.minimo )
                        ? {'customMin':true}
                        :  null;
    }
}