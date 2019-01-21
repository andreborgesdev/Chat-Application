import { Component, Output, EventEmitter } from '@angular/core';
import { AuthProvider } from "../../providers/auth/auth.service";

import { Account } from "../../models/account/account.interace";
import { LoginResponse } from "../../models/login/login-response.interface";

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account = {} as Account;
  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthProvider) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);
    } 
    catch (error) {
      this.registerStatus.emit(error);
    }
  }

}
