import { Component, OnDestroy, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { User } from "firebase/app";

import { Profile } from "../../models/profile/profile.interface";
import { DataService } from "../../providers/data/data.service";
import { AuthProvider } from "../../providers/auth/auth.service";

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnInit ,OnDestroy {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  @Output() saveProfileResult: EventEmitter<Boolean>;
  @Input() profile: Profile;

  constructor(private auth: AuthProvider, private data: DataService) {

    this.saveProfileResult = new EventEmitter<Boolean>();

    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }

  async saveProfile() {
    if(this.authenticatedUser){
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ngOnInit(): void {
    if(!this.profile){
      this.profile = {} as Profile;
    }
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
