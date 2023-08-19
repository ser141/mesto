const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
  }; 


  // перебор инпутов на невалидность через some
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  // функция вкл/выкл кнопок
  const toggleButtonState = (buttonElement, inputList, validationSettings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(validationSettings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }


// функции показа ошибок валидности
  const showInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(validationSettings.inputErrorClass);
  };

  const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(validationSettings.inputErrorClass);
  };
// проверка инпутов на валидность
  const checkInputvalidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationSettings);
    } else {
      hideInputError(formElement, inputElement, validationSettings);
    };
  };

// слушатели на форму валидности
  const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(buttonElement, inputList, validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputvalidity(formElement, inputElement, validationSettings);
        toggleButtonState(buttonElement, inputList, validationSettings);
      });
    });
  };
// запуск валидации
  const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationSettings);
    });
  };

  enableValidation(validationSettings);