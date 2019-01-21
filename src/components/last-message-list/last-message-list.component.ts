import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../providers/chat/chat.service';
import { Message } from '../../models/messages/messages.interace';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-last-message-list',
  templateUrl: 'last-message-list.component.html'
})
export class LastMessageListComponent implements OnInit {

  messageList$: Observable<Message[]>;

  constructor(private chat: ChatService, private navCtrl: NavController) {

  }

  ngOnInit() {
    this.messageList$ = this.chat.getLastMessagesForUser()
  }

  navigateToMessage(message: Message) {
    const selectedProfile = {
      $key: message.userToID,
      firstName: message.userToProfile.firstName,
      lastName: message.userToProfile.lastName
    }

    this.navCtrl.push('MessagePage', { profile: selectedProfile });
  }

}
