import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  showErrorToast = (body?: string) => notify(body, 'error', 2000);
  showSuccessToast = (body?: string) => notify(body, 'success', 2000);
  showInfoToast = (body?: string) => notify(body, 'info', 2000);
  showWarningToast = (body?: string) => notify(body, 'warning', 2000);
  showInfoToastTwoSec = (body?: string) => notify(body, 'info', 3000);
}
