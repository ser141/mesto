import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const editButton = document.querySelector('.profile__button-edit');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__button-add');
const profileForm = document.querySelector('.popup__form_type_edit');
const addForm = document.querySelector('.popup__form_type_add');
const nameInput = profileForm.querySelector('.popup__input_el_name');
const jobInput = profileForm.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__activity');
const container = document.querySelector('.elements');
const template = document.querySelector('.cards');
const titleInput = addForm.querySelector('.popup__input_el_title');
const linkInput = addForm.querySelector('.popup__input_el_link');
export const popupImageItem = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-decription');

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
  }; 

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//   экземпляр рендера карточек
  initialCards.forEach((item) => {
    const card = new Card(item, '.cards');
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
});

//  экземпляры валидации форм

const profileFormValidation = new FormValidator(validationSettings, profileForm);
profileFormValidation.enableValidation()

const addFormValidation = new FormValidator(validationSettings, addForm);
addFormValidation.enableValidation();

// создание карточек  

const createEl = (evt) => {
    evt.preventDefault();
    const newCard = new Card({name: titleInput.value, link: linkInput.value}, '.cards');
    const cardElement = newCard.generateCard()
    document.querySelector('.elements').prepend(cardElement);
    addForm.reset();
    addFormValidation.disableSubmitButton();
    closePopup(popupAdd);
}

addForm.addEventListener('submit', createEl); 



// функция открытия попапа

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

// функция закрытия попапа

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened);
    }
}

const closePopupByOverlay = (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.target);
    };
};



popupEdit.addEventListener('mousedown', closePopupByOverlay);
popupAdd.addEventListener('mousedown', closePopupByOverlay);
popupImage.addEventListener('click', closePopupByOverlay);

// измение данных пользвоателя

editButton.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

// поиск через forEach кнопки закрытия в попапах

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
})


// попап добавления

addButton.addEventListener('click', function() {
    openPopup(popupAdd);
})

// форма редактирования профиля

function handleProfileForm (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    closePopup(popupEdit);
}

profileForm.addEventListener('submit', handleProfileForm); 


