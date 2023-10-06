export const editButton = document.querySelector('.profile__button-edit');
export const popupImage = document.querySelector('.popup_type_image');
export const addButton = document.querySelector('.profile__button-add');
export const profileForm = document.querySelector('.popup__form_type_edit');
export const addForm = document.querySelector('.popup__form_type_add');
export const avatarForm = document.querySelector('.popup__form_type_avatar')
export const nameInput = profileForm.querySelector('.popup__input_el_name');
export const jobInput = profileForm.querySelector('.popup__input_el_job');
export const popupImageItem = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-decription');
export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
  }; 