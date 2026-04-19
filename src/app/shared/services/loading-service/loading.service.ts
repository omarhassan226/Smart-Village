import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);
  showLoading = (): void => this.isLoading$.next(true);
  hideLoading = (): void => this.isLoading$.next(false);
}
