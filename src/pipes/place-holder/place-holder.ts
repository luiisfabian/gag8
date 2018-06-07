import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PlaceHolderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'placeHolder',
})
export class PlaceHolderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  // transform(value: string, ...args) {

  // }


  transform(value: string, defecto: string = "Sin texto") {
    if(value){
      return value;
    }else{
      return defecto;
    }

  }
}
