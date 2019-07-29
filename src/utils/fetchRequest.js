import { Base64 } from 'js-base64';
import utf8 from 'utf8';

export const fetchRequest = {
    unAuthorized,
    fetchGet,
    fetchPost
};

function authHeader(param) {
    let user = JSON.parse(localStorage.getItem('user'));

    let headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Accept', '*/*');

    if (user && user.token) {
        headers.append('Authorization', 'Bearer ' + user.token);
    } else {
        if (param) {
            headers.append('Authorization', 'Basic ' + Base64.encode(utf8.encode(param.username+':'+param.password)));
        }
    }

    return headers;
}

function fetchGet(url, dataJson) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(dataJson)
    };

    if (dataJson) {
        let params = ''
        for (let item in dataJson) {
            params += '&'+item+'='+dataJson[item];
        }

        url = url+''+params;
    }

    const sweetPromise = new Promise((resolve, reject) => {
        fetch(url, requestOptions).then((response) => {
            resolve(response.json());
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 401 && localStorage.getItem('user')) {
                    unAuthorized();
                }
            }
            console.log(response);
        }).catch(error => {
            reject(error);
            console.log(error);
        });
    });

    return sweetPromise;
}

function fetchPost(url, dataJson) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(dataJson),
        body: JSON.stringify(dataJson)
    };

    const sweetPromise = new Promise((resolve, reject) => {
        fetch(url, requestOptions).then((response) => {
            return response.json();
        }).then(data => {
            if (!data.ok) {
                if (data.status === 401 && localStorage.getItem('user')) {
                    unAuthorized();
                }
            }
            resolve(data);
        }).catch(error => {
            reject(error);
            console.log(error);
        });
    });

    return sweetPromise;
}

function unAuthorized() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.reload(true);
}