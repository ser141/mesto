const editButton = document.querySelector('.profile__button-edit');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
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
const popupImageItem = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-decription');


// создание карточки через шаблон

const createElByTemplate = (data) => {
    const el = template.content.cloneNode(true);
    const title = el.querySelector('.element__title');
    title.textContent = data.name;
    const image = el.querySelector('.element__image');
    image.src = data.link
    image.alt = title.textContent;

    const deleteBtn = el.querySelector('.element__delete-btn');
    deleteBtn.addEventListener('click', deleteEl)

    const likeBtn = el.querySelector('.element__like-icon');
    likeBtn.addEventListener('click', likeEl);

    image.addEventListener('click', function(){
      openPopup(popupImage);
      popupImageItem.src = data.link;
      popupImageItem.alt = data.name;
      popupImageText.textContent = data.name;
    });

    return el;

}



// удаление карточки

const deleteEl = (e) => {
  const el = e.target.closest('.element');
  el.remove();
}

// лайк карточки

const likeEl = (e) => {
  const el = e.target.closest('.element__like-icon');
  el.classList.toggle('element__like-icon_active');
}

// рендер карточек

const render = () => {
    initialCards.forEach((item) => {
        container.append(createElByTemplate(item));
    });
    
}

render();

// создание карточки

const createEl = (evt) => {
    evt.preventDefault();
    const newEl = createElByTemplate({name: titleInput.value, link: linkInput.value});
    container.prepend(newEl);
    addForm.reset();
    evt.submitter.classList.add('popup__save-btn_disabled');
    evt.submitter.disabled = true;
    closePopup(popupAdd);
}

addForm.addEventListener('submit', createEl); 



// функция открытия попапа

function openPopup(popupElement) {
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

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
})


// попап добавления

addButton.addEventListener('click', function() {
    openPopup(popupAdd);
})



function handleProfileForm (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    closePopup(popupEdit);
}

profileForm.addEventListener('submit', handleProfileForm); 


