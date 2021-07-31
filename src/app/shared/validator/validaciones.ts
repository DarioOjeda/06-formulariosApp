import { FormControl } from '@angular/forms';

export const nombreApellidoPattern: string = '([a-zA-z]+) ([a-zA-Z]+)';
export const emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const noPuedeSerCabesa = ( control: FormControl ) => {
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