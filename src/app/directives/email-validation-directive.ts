import {AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Directive} from "@angular/core";
import {LoginService} from "../services/login-service";

export function existingEmailValidator(loginService: LoginService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return loginService.getUserByEmail(control.value).switchMap(
      isFound => {
        return Observable.of((isFound) ? {"emailExists": true} : null);
      }
    );
  };
}

@Directive({
  selector: '[emailExists][formControlName],[emailExists][formControl],[emailExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingEmailValidatorDirective, multi: true}]
})
export class ExistingEmailValidatorDirective implements AsyncValidator {
  constructor(private loginService: LoginService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingEmailValidator(this.loginService)(control);
  }
}
