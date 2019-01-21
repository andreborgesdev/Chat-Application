import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channel/channel.interface';
import { ChatService } from '../../providers/chat/chat.service';
import { Message } from '../../models/messages/messages.interace';
import { AngularFireList } from 'angularfire2/database';
import { ChannelMessage } from '../../models/channel/channel-message.interface';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  channelMessagesAF: AngularFireList<ChannelMessage>;
  channelMessages: Observable<ChannelMessage[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private chat: ChatService) {
  }

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');
    this.channelMessagesAF = this.chat.getChannelChatRef(this.channel.$key);
    this.channelMessages = this.channelMessagesAF.snapshotChanges().map(
      changes => {
        return changes.map(c => ({ content: c.payload.key, ... c.payload.val() }));
    });
  }

  sendMessage(content: string) {
    let channelMessage: ChannelMessage = {
      content: content
    }

    this.chat.sendChannelChatMessage(this.channel.$key, channelMessage);
  }
}
