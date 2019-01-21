import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/first";
import { Channel } from "../../models/channel/channel.interface";
import { ChannelMessage } from "../../models/channel/channel-message.interface";
import { Message } from "../../models/messages/messages.interace";
import { AuthProvider } from "../auth/auth.service";

@Injectable()
export class ChatService {

    constructor(private database: AngularFireDatabase, private auth: AuthProvider) {

    }

    addChannel(channelName: string) {
        this.database.list(`channel-names`).push({ name: channelName });
    }

    getChannelListRef(): AngularFireList<Channel>  {
        return this.database.list(`channel-names`);
    }

    getChannelChatRef(key: string): AngularFireList<ChannelMessage> {
        return this.database.list(`channels/${key}`);
    }

    sendChannelChatMessage(channelKey: string, message: ChannelMessage) {
        this.database.list(`channels/${channelKey}`).push(message);
    }

    async sendChat(message: Message) {
        await this.database.list('/messages').push(message);
    }

    getChat(userTwoID: string) {
        return this.auth.getAuthenticatedUser()
        .map(auth => auth.uid)
        .mergeMap(uid => this.database.list(`/user-messages/${uid}/${userTwoID}`))
        .mergeMap(chats => {
            return Observable.forkJoin(
                chats.map(chat => this.database.object(`/messages/${chat.$key}`)
                .first()),
                (...vals) => {
                    return vals;
                }
            )
        });
    }

    getLastMessagesForUser(): Observable<Message[]>{
        return this.auth.getAuthenticatedUser()
        .map(auth => auth.uid)
        .mergeMap(authID => this.database.list(`/last-messages/${authID}`))
        .mergeMap(messageIDs => {
            return Observable.forkJoin(
                messageIDs.map(message => {
                    return this.database.object(`/messages/${message.key}`)
                        .first();
                }),
                (...vals) => {
                    return vals;
                }
            )
        });
    }
}