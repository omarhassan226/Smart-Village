import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationHeaderService {
  headerObject$ = new BehaviorSubject<any>({headericon: 'menu',headerTitle: 'الرئيسية' });
  constructor() { }
}
