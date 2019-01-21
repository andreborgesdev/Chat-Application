import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelChatPage } from './channel-chat';
import { ComponentModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ChannelChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelChatPage),
    ComponentModule
  ],
})
export class ChannelChatPageModule {}
