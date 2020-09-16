import { Injectable } from '@angular/core';
import { ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }
  successmsg(msg): void {
    this.toastr.success(msg, 'Success');
  }
  erromsg(msg): void {
    this.toastr.error(msg, 'Error');
  }
  infomsg(msg): void {
    this.toastr.info(msg, 'Information');
  }
  warningmsg(msg): void {
    this.toastr.success(msg, 'Warning');
  }

}
