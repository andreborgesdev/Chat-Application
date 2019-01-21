import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { User, database } from "firebase/app";
import { Profile } from "../../models/profile/profile.interface";
import { AuthProvider } from '../auth/auth.service';

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/take";

@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>

  constructor(private database: AngularFireDatabase, private auth: AuthProvider) {
  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);    

    return this.profileObject;
  }

  getAuthenticatedUserProfile() {
    return this.auth.getAuthenticatedUser()
    .map(user => user.uid)
    .mergeMap(authID => this.database.object(`profiles/${authID}`).valueChanges())
    .take(1);
  }

  searchUser(firstName: string) {
    this.profileList = this.database.list('/profiles/', query => { 
      let q = query.orderByChild('firstName').equalTo(firstName).limitToFirst(1);
      return q;
      });

    return this.profileList.valueChanges();
  }
  
  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);    

    try {
      await this.profileObject.set(profile);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  disconnect() {
    this.database.database.goOffline();
  }

  setUserOnline(profile: Profile, key?:string) {
    const ref = database().ref(`online-users/${key}`);

    try {
      ref.update({...profile});
      ref.onDisconnect().remove();
    } catch (e) {
      console.error(e);
    }
  }

  getOnlineUsers(): AngularFireList<Profile> {
    return this.database.list(`online-users`);
  }
}

