import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';
import { ChatService } from '../../providers/chat/chat.service';
import { Channel } from '../../models/channel/channel.interface';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channelAFList: AngularFireList<Channel>;
  channelList: Observable<Channel[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCrtl: AlertController, private chat: ChatService) {
  }

  showAddChannelDialog() {
    this.alertCrtl.create({
      title: 'Channel Name',
      inputs: [{
        name: 'channelName'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.chat.addChannel(data.channelName);
          }
        }
    ]
    }).present();
  }

  ionViewWillLoad() {
    this.getChannels();
  }

  getChannels() {
    this.channelAFList = this.chat.getChannelListRef();
    this.channelList = this.channelAFList.snapshotChanges().map(
      changes => {
        return changes.map(c => ({ $key: c.payload.key, ... c.payload.val() }));
    });
  }

  selectChannel(channel: Channel) {
    this.navCtrl.push('ChannelChatPage', { channel });
  }

}
