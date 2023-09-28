import { popupImage, popupImageItem, popupImageText } from "../pages/index.js";


export class Card {
    constructor(data, templateSelector, handleCardclick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardclick;
    }
    // получение темлэйта

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement
    }
//    генерация карточек

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._setEventListeners()
        this._element.querySelector('.element__title').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;

        return this._element
    }
    // функция лайка

    _like() {
        this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_active');
    }
    // функция удаления

    _deleteBtn() {
        this._element.remove()
}
  
    _setEventListeners() {
        // лайк
        this._element.querySelector('.element__like-icon').addEventListener('click', () => {
            this._like()
        });
        // удаление карточки
        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
            this._deleteBtn()
        });
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        })
    }

}

