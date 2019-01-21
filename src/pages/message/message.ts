import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { Message } from '../../models/messages/messages.interace';s
import { AuthProvider } from '../../providers/auth/auth.service';
import { DataService } from '../../providers/data/data.service';
import { ChatService } from '../../providers/chat/chat.service';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  selectedProfile: Profile;
  messageList: Observable<Message[]>;
  userID: string;
  userProfile: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
     private data: DataService, private chat: ChatService) {
  }

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    this.data.getAuthenticatedUserProfile()
    .subscribe(profile => {
      this.userProfile = profile;
      this.userID = profile.$key;
    });

    this.messageList = this.chat.getChat(this.selectedProfile.$key);
  }

  async sendMessage(content: string) {
    try {
      const message: Message = {
        userToID: this.selectedProfile.$key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName
        },
        userFromProfile: {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName
        },
        userFromID: this.userID,
        content: content
      };

      await this.chat.sendChat(message);
    } catch (e) {
      console.error(e);
    }
  }
}
