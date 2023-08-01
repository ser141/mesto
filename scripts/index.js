const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__close-btn_type_edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__button-add');
const closeAddPopupBtn = document.querySelector('.popup__close-btn_type_add');
const closeImagePopupBtn = document.querySelector('.popup__close-btn_type_image');
const formElement = document.querySelector('.popup__form_type_edit');
const formAddElement = document.querySelector('.popup__form_type_add');
const nameInput = formElement.querySelector('.popup__input_el_name');
const jobInput = formElement.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__activity');
const container = document.querySelector('.elements');
const template = document.querySelector('.cards');
const titleInput = document.querySelector('.popup__input_el_title');
const linkInput = document.querySelector('.popup__input_el_link');
const popupImageItem = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-decription');
// создание карточки через шаблон

const createElByTemplate = (data) => {
    const el = template.content.cloneNode(true);
    const title = el.querySelector('.element__title');
    title.textContent = data.name;
    const image = el.querySelector('.element__image');
    image.src = data.link

    const deleteBtn = el.querySelector('.element__delete-btn');
    deleteBtn.addEventListener('click', deleteEl)

    const likeBtn = el.querySelector('.element__like-icon');
    likeBtn.addEventListener('click', likeEl);

    image.addEventListener('click', function(){
      openPopup(popupImage);
      popupImageItem.src = data.link;
      popupImageText.textContent = data.name;
    });

    closeImagePopupBtn.addEventListener('click', function() {
      closePopup(popupImage);
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

    closePopup(popupAdd);
}

formAddElement.addEventListener('submit', createEl); 



// функция открытия попапа

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

// функция закрытия попапа

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

// измение данных пользвоателя

editButton.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

closeButton.addEventListener('click', function() {
    closePopup(popupEdit);
});

// попап добавления

addButton.addEventListener('click', function() {
    openPopup(popupAdd);
})

closeAddPopupBtn.addEventListener('click', function() {
    closePopup(popupAdd);
});




function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 
