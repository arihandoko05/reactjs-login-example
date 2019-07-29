import { API_URL } from '../utils/apiConfig';
import { fetchRequest } from '../utils/fetchRequest';

export const authService = {
    login,
    logout,
};

function login(dataModel) {
    const data = {
        username: dataModel.username,
        password: dataModel.password
    };

    return fetchRequest.fetchPost(API_URL.login, data);
}

function logout() {
    // remove user from local storage to log user out
    fetchRequest.unAuthorized();
}