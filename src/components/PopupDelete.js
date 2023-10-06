import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupElement.querySelector('.popup__form'); 
    }

    confiramtionHandler(submit) {
        this._submit = submit;
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        })
    }
}