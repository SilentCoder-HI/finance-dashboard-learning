import type { User } from '../store/store';

// A simple local user used for instant "dummy login".
// No backend/MongoDB call is made when this is used.
export const dummyUser: User = {
    id: 'dummy-user',
    username: 'guest',
    email: 'guest@example.com',
    role: 'user',
};