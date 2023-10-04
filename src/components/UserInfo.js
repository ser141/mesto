export default class UserInfo {
    constructor({profileName, profileJob, avatar}) {
        this._profileName = document.querySelector(profileName);
        this._profileJob = document.querySelector(profileJob);
        this._avatar = document.querySelector(avatar)
    }

    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            about: this._profileJob.textContent,
            avatar: this._avatar.src
        }
    }

    setUserInfo({name, about, userId, avatar}) {
        this._profileName.textContent = name; 
        this._profileJob.textContent = about;
        this._userId = userId;
        this._avatar.src = avatar;
      }

      getUserId() {
        return this._userId;
      }
}