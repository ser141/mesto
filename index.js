let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');


function openPopup() {
    popup.classList.add('popup__opened');
}

function closePopup() {
    popup.classList.remove('popup__opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__activity');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit); 