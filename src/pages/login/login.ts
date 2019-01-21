import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginResponse } from "../../models/login/login-response.interface";
import { DataService } from '../../providers/data/data.service';
import { User } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private data: DataService ,private navCtrl: NavController, private navParams: NavParams, private toast: ToastController) {
  }

  login(event: LoginResponse) {
    if(!event.error) {
      this.toast.create({
        message: `Welcome to Beep, ${event.result.user.email}`,
        duration: 3000
      }).present();
      
      this.data.getProfile(<User>event.result.user).snapshotChanges().subscribe(profile => {
        profile.payload.val() ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditProfilePage');
      });
      this.navCtrl.setRoot('EditProfilePage');
    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
  }
}
