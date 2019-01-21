import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthProvider } from '../../providers/auth/auth.service';
import { DataService } from '../../providers/data/data.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthProvider, private data: DataService) {
  }

  getExistingProfile(profile: Profile) {
    this.existingProfile = profile;
  }
  
  navigateToProfilePage() {
    this.navCtrl.push('EditProfilePage', { existingProfile: this.existingProfile });
  }

  signOut() {
    this.auth.signOut();
    this.data.disconnect();
    this.navCtrl.setRoot('LoginPage');
  }

}
