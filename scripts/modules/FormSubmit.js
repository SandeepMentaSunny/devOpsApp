import { getLocalStorage } from './storageData.js';
import { setLocalStorage } from './storageData.js';

export function FormSubmit(data, type, event) {
    const usersData = getLocalStorage('users');
    if (type === 'login') {
        if (usersData && usersData.length > 0) {
            const existingUser = usersData.filter((user) => {
                if (user.emailId === data.emailId && user.password === data.password) {
                    return user;
                }
            });
            if (existingUser.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        if (!usersData) {
            setLocalStorage('users', [data], 'add');
            return true;
        } else {
            const existingUser = usersData.filter((user) => {
                if (user.emailId === data.emailId) {
                    return user;
                }
            });
            if (existingUser.length > 0) {
                return false;
            } else {
                if (data.password.toLowerCase() !== data.rePassword.toLowerCase()) {
                    return false;
                } else {
                    setLocalStorage('users', data, 'update');
                    return true;
                }
            }
        }
    }
}