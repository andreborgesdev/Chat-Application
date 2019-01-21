import { Profile } from '../../models/profile/profile.interface';

const userList: Profile[] = [
    {
        firstName: 'Paul',
        lastName: 'Halliday',
        email: 'paulHalliday@gmail.com',
        avatar: 'assets/imgs/avatar.png',
        dateOfBirth: new Date()
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        avatar: 'assets/imgs/avatar.png',
        dateOfBirth: new Date()
    },
    {
        firstName: 'Andre',
        lastName: 'Borges',
        email: 'andre@gmail.com',
        avatar: 'assets/imgs/avatar.png',
        dateOfBirth: new Date()
    },
    {
        firstName: 'Ze',
        lastName: 'Manel',
        email: 'ze@gmail.com',
        avatar: 'assets/imgs/avatar.png',
        dateOfBirth: new Date()
    }
];

export const USERS_LIST = userList;