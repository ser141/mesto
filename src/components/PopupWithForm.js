import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmit}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._saveBtn = this._popupElement.querySelector('.popup__save-btn')
    }

    _getInputValues() {
        this._inputValues = {}
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners()

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues())
            this.close()
        })
    }

    close() {
        super.close()
        this._form.reset();
    }

    saving(isSaving) {
        if(isSaving === true) {
            this._saveBtn.textContent = 'Сохранение...'
        }else {
            this._saveBtn.textContent = 'Сохраненить'
        }
    }
}