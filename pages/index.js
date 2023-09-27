import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

/// константы /////////////////////////////////////////////
const editButton = document.querySelector('.profile__button-edit');
export const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__button-add');
const profileForm = document.querySelector('.popup__form_type_edit');
const addForm = document.querySelector('.popup__form_type_add');
const nameInput = profileForm.querySelector('.popup__input_el_name');
const jobInput = profileForm.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__activity');
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

 ///////////////////////////////////////////////////////////////////

 /// информация пользователя ///////////////////////////////
  const user = new UserInfo({
    profileName: '.profile__name',
    profileJob: '.profile__activity'
  });
//////////////////////////////////////////////////////////////


//// попап картинки ///////////////////////////////////

  const popupWithImage = new PopupWithImage('.popup_type_image')
  const handleCardClick = (link, name) => {
    popupWithImage.open(link, name);
  };
  popupWithImage.setEventListeners()

///////////////////////////////////////////////////////

////////рендер карточек ///////////////////////////////////////

const defaultCardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.cards', handleCardClick);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement)
  }
}, '.elements')

defaultCardList.renderItems()
/////////////////////////////////////////////////////////////


//  экземпляры валидации форм //////////////////////////////

const profileFormValidation = new FormValidator(validationSettings, profileForm);
profileFormValidation.enableValidation()

const addFormValidation = new FormValidator(validationSettings, addForm);
addFormValidation.enableValidation();


///////////////////////////////////////////////////////////



// попап добавления/////////////////////////////////////

addButton.addEventListener('click', function() {
    openAddPopup.open();
})

// создание карточек  
const createEl = () => {
  const newCard = new Card({name: titleInput.value, link: linkInput.value}, '.cards', handleCardClick);
  const cardElement = newCard.generateCard()
  document.querySelector('.elements').prepend(cardElement);

}

const openAddPopup = new PopupWithForm({
popupSelector: '.popup_type_add',
 formSubmit: createEl
})
openAddPopup.setEventListeners()

///////////////////////////////////////////////////////////

// измение данных пользвоателя/////////////////////////////

editButton.addEventListener('click', function() {
  openEditPopup.open()
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
});

const openEditPopup = new PopupWithForm({
  popupSelector:'.popup_type_edit', 
  formSubmit: (data) => {
    user.setUserInfo(data);
  }
});

openEditPopup.setEventListeners();

///////////////////////////////////////////////////////////