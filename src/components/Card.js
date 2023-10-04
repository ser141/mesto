


export class Card {
    constructor(data, templateSelector, userId, handleCardclick, handleLikeClick, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._userId = userId
        this._isUserCard = this._userId === data.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardclick;
        this._handleLikeClick = handleLikeClick;
        this._handledeleteClick = handleDeleteClick;
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
        this._element.querySelector('.element__title').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
        this._likeBtn = this._element.querySelector('.element__like-icon');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._deleteBtn = this._element.querySelector('.element__delete-btn');
        this._likeCounter.textContent = this._likes.length;
        this._setEventListeners();
        this._chekLikes();
        return this._element;

    }

    getCardId() {
        return this._cardId;
    }

    // функция лайка

    setLike() {
        this._likeBtn.classList.add('element__like-icon_active');
        this.isLiked = true;
    }

    removeLike() {
        this._likeBtn.classList.remove('element__like-icon_active');
        this.isLiked = false;
    }


    likesCounter(likeData) {
        this._likeCounter.textContent = likeData.length
    }

    _chekLikes() {
        this._likes.forEach((item) => {
            if(item._id === this._userId) {
                this.setLike()  
            }
        })
    }
        

    // функция удаления

    _deleteCard() {
        this._element.remove()
}
  
    _setEventListeners() {
        // лайк
        this._element.querySelector('.element__like-icon').addEventListener('click', () => {
                this._handleLikeClick()
        });
        // удаление карточки
        if (!this._isUserCard) {
            this._deleteBtn.remove()
        } else {
            this._deleteBtn.addEventListener('click', (evt) => {
                this._handledeleteClick(evt)
            })
        }
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        })
    }

}

