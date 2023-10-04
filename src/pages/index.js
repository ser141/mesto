import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';
import { data } from 'autoprefixer';
import PopupDelete from '../components/PopupDelete.js';
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: 'ab9c2ba5-81ee-491a-8e2e-3ceb1212a51c',
    'Content-Type': 'application/json'
  }
}); 



/// константы /////////////////////////////////////////////
const editButton = document.querySelector('.profile__button-edit');
export const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__button-add');
const profileForm = document.querySelector('.popup__form_type_edit');
const addForm = document.querySelector('.popup__form_type_add');
const avatarForm = document.querySelector('.popup__form_type_avatar')
const nameInput = profileForm.querySelector('.popup__input_el_name');
const jobInput = profileForm.querySelector('.popup__input_el_job');
export const popupImageItem = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-decription');



const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
  }; 

 ///////////////////////////////////////////////////////////////////

 /// информация пользователя ///////////////////////////////
  const user = new UserInfo({
    profileName: '.profile__name',
    profileJob: '.profile__activity',
    avatar: '.profile__avatar'
  });

  Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
      user.setUserInfo({
        name: userData.name,
        about: userData.about,
        userId: userData._id,
        avatar: userData.avatar,
      });
      cardList.renderItems(cardData)
  })


//////////////////////////////////////////////////////////////


//// попап картинки ///////////////////////////////////

  const popupWithImage = new PopupWithImage('.popup_type_image')
  const handleCardClick = (link, name) => {
    popupWithImage.open(link, name);
  };
  popupWithImage.setEventListeners()

///////////////////////////////////////////////////////

///экземляры карточек////////////////////////////
const popupDelete = new PopupDelete('.popup_type_delete')
popupDelete.setEventListeners()


const createEl = (item) => {
  const card = new Card(item,
     '.cards',
      user.getUserId(),
      // popup card //
      handleCardClick,
      // like card ///
      () => {
        if (card.isLiked) {
          api.deleteLike(card.getCardId()).then((data) => {
            card.removeLike();
            card.likesCounter(data.likes);
          }).catch((error) => {
            console.log(`Ошибка: ${error.status}, ${error.message}`)
          })
        } else {
          api.setLike(card.getCardId()).then((data) => {
            card.setLike();
            card.likesCounter(data.likes)
          }).catch((error) => {
            console.log(`Ошибка: ${error.status}, ${error.message}`)
          })
        }
      },
      //delete card//
      (evt) => {
        const deleteCard = evt.target.closest('.element')
        popupDelete.open()
        popupDelete.confiramtionHandler(() => {
          api.deleteCard(card.getCardId()).then(() => {
            deleteCard.remove()
          }).catch((error) => {
            console.log(`Ошибка: ${error.status}, ${error.message}`)
          })
        })
      })
  const cardElement = card.generateCard();
 cardList.addItem(cardElement)
}


const cardList = new Section ({
  renderer: (cards) => {
    createEl(cards)
  }
}, '.elements')



const openAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
   formSubmit: (item) => {
    openAddPopup.saving(true)
    api.createNewCard({name: item.name, link: item.link}).then((newCard) => {
      createEl(newCard)
    }).catch((error) => {
      console.log(`Ошибка: ${error.status}, ${error.message}`)
    }).finally(() => {
      openAddPopup.saving(false)
    })
    
    addFormValidation.disableSubmitButton()
   }
  })
  openAddPopup.setEventListeners()
/////////////////////////////////////////////////////////////


//  экземпляры валидации форм //////////////////////////////

const profileFormValidation = new FormValidator(validationSettings, profileForm);
profileFormValidation.enableValidation()

const addFormValidation = new FormValidator(validationSettings, addForm);
addFormValidation.enableValidation();

const avatarvalidation = new FormValidator(validationSettings, avatarForm);
avatarvalidation.enableValidation()
///////////////////////////////////////////////////////////



// попап добавления/////////////////////////////////////

addButton.addEventListener('click', function() {
    openAddPopup.open();
})


// измение данных пользвоателя/////////////////////////////

editButton.addEventListener('click', function() {
  openEditPopup.open()
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.about;
});

const openEditPopup = new PopupWithForm({
  popupSelector:'.popup_type_edit', 
  formSubmit: (formData) => {
    openEditPopup.saving(true)
   api.updateUserInfo({name: formData.userName, about: formData.about}).then((updatedData) => {
    user.setUserInfo(updatedData)
   }).catch((error) => {
    console.log(`Ошибка: ${error.status}, ${error.message}`)
  })
   .finally(() => {
    openEditPopup.saving(false)
   })
  }
});

openEditPopup.setEventListeners();

////аватар////////////////////////////////////////////////////////////////////

const setAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  formSubmit: (formData) => {
    setAvatar.saving(true)
    api.setAvatar({avatar: formData.avatar}).then((updatedData) => {
      user.setUserInfo(updatedData)
    }).catch(err => console.log(err))
    .finally(() => {
      setAvatar.saving(false)
    })
    avatarvalidation.disableSubmitButton()
  }
})

setAvatar.setEventListeners()

const avatarBtn = document.querySelector('.profile__avatar-btn')
avatarBtn.addEventListener('click', () => {
  setAvatar.open()
})


///////////////////////////////////////////////////////////

