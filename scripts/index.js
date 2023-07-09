let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__activity');


function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 