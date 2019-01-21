import { Profile } from "../profile/profile.interface";

export interface Message {
    userFromID: string;
    userFromProfile: {
        firstName: string;
        lastName: string;
    }
    userToID: string;
    userToProfile: {
        firstName: string;
        lastName: string;
    }
    content: string;
}