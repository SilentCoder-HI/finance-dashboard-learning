import type { AuthUser } from '../store/store';

export const dummyUsers: AuthUser[] = [
    { id: 'dummy-superadmin', name: 'Super Admin', username: 'superadmin', email: 'superadmin@techvision.test', role: 'superadmin', companyId: null, isActive: true },
    { id: 'dummy-admin', name: 'Admin', username: 'admin', email: 'admin@techvision.test', role: 'admin', companyId: 'techvision', isActive: true },
    { id: 'dummy-accountant', name: 'Accountant', username: 'accountant', email: 'accountant@techvision.test', role: 'accountant', companyId: 'techvision', isActive: true },
    { id: 'dummy-viewer', name: 'Viewer', username: 'viewer', email: 'viewer@techvision.test', role: 'viewer', companyId: 'techvision', isActive: true },
];

export const dummyUser: AuthUser = dummyUsers[3];
