import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export interface ErrorResult{
    StatusCode?:number;
    Message?:string;
    DetailMessage?:string;
}
export class FormErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }


  
export class ConfirmDialogModel {

  constructor(public title: string, public userId: number) {
  }
}