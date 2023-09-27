import Popup from "./Popup.js";

 export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = this._popupElement.querySelector('.popup__image');
        this._name = this._popupElement.querySelector('.popup__image-decription');
    }

    open(link, name) {
        super.open()
        this._link.src = link;
        this._name.textContent = name;
        this._link.alt = name;
    }
}