import { Message } from '../../models/messages/messages.interace';
import { USERS_LIST } from "../profiles/profiles";

const userList = USERS_LIST;
const messageList: Message[] = [];

// userList.forEach((user) => {
//     messageList.push({ User: user, date: new Date(), lastMessage: 'Hello'});
// });

export const MESSAGE_LIST = messageList;