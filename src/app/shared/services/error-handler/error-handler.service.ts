import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  error$ = new BehaviorSubject<object>(null);

  setErrors = (error: object): void => this.error$.next(error);
  clearErrors = (): void => this.error$.next(null);

  handleError = (error: any) => {
    if (!error) {
      return;
    }
    const errMsg = error.statusText ? error.statusText : 'Error';

    if (error.status === 400) {
      this.setErrors(error.error.errors);
      this.timeOutToClearError();
      return;
    } else if (error.status === 403) {
      this.handle403Error();
      return;
    } else if (error.status === 404) {
      this.setErrors({ msg: '404 Not Found' });
      return;
    } else {
      const msg =
        errMsg === 'Unauthorized' ? errMsg : `${errMsg} Or Method Not Allowed`;
      this.setErrors({ msg });
      this.timeOutToClearError();
    }
  };

  handleCustomError = (error: {}) => {
    this.setErrors(error);
    this.timeOutToClearError();
  };

  handleIdentityError = (error: any): void => {
    const errMsg = error ? error.error.error_description : 'IdentityError';
    this.setErrors({ errMsg });
    this.timeOutToClearError();
  };

  timeOutToClearError = (): any =>
    setTimeout(() => this.error$.next(null), 3000);

  handle403Error = (): void => {
    const errMsg = 'Error403';
    this.setErrors({ errMsg });
    this.timeOutToClearError();
  };
}
