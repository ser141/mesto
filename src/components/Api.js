export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if(res.ok){
            return res.json()
        }
        return Promise.reject(`Что-то пошло не так. Ошибка ${res.status}`);
    }

    getUserInfo() {
        const url = this._baseUrl + '/users/me';
        return fetch(url,{
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    updateUserInfo(body) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(body)
        })
        .then(this._checkResponse);
    }

    createNewCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse)
    }

    setLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse);
    }
 
    setAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        })
        .then(this._checkResponse);
    }
}

