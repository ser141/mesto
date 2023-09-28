export default class Popup {
    constructor (popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this))
    }
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
 
    setEventListeners() {
        const closeButtons = document.querySelectorAll('.popup__close-btn')
        closeButtons.forEach((button) => {
            button.addEventListener('click', () => this.close());
        })

        this._popupElement.addEventListener('mousedown', (evt) => {
            if(evt.target === evt.currentTarget) {
                this.close()
            }
        })
}
}