import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { DataService } from '../../providers/data/data.service';
import { Profile } from "../../models/profile/profile.interface";
import { AuthProvider } from '../../providers/auth/auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit {

  userListAF: AngularFireList<Profile>;
  userList: Observable<Profile[]>;

  constructor(private data: DataService, private auth: AuthProvider, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }

  setUserOnline() {
    //Get authenticated user
    this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.data.getProfile(user).snapshotChanges().subscribe(profile => {
        //Call to a service that sets the user online within Firebase
          this.data.setUserOnline(<Profile>profile.payload.val(), profile.payload.key);
        }
    )}
    );
  }

  getOnlineUsers() {
    this.userListAF = this.data.getOnlineUsers();
    this.userList = this.userListAF.snapshotChanges().map(
      changes => {
        return changes.map(c => ({ $key: c.payload.key, ... c.payload.val() }));
      });
  }

  openChat(profile: Profile) {
    this.navCtrl.push('MessagePage', { profile });
  }
}
