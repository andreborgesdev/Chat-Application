import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import { Profile } from '../../models/profile/profile.interface';

@Component({
  selector: 'app-profile-search',
  templateUrl: 'profile-search.component.html'
})

export class ProfileSearchComponent {

  query: string;
  profileList: Profile[];

  @Output() selectedProfile: EventEmitter<Profile>;

  constructor(private data: DataService) {
    this.selectedProfile = new EventEmitter<Profile>();
  }

  searchUser(query: string) {
    const trimmedQuery = query.trim();

    if(trimmedQuery === query){
      this.data.searchUser(query).
      subscribe(profiles => {
        this.profileList = profiles as Profile[];
      })
    }
  }

  selectProfile(profile: Profile) {
    this.selectedProfile.emit(profile);
  }

}
