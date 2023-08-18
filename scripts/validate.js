const validationSelectorList = {
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
  const toggleButtonState = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationSelectorList.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(validationSelectorList.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }


// функции показа ошибок валидности
  const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(inputElement.id);
    inputElement.classList.add(validationSelectorList.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(validationSelectorList.inputErrorClass);
  };
// проверка инпутов на валидность
  const checkInputvalidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement);
    } else {
      hideInputError(formElement, inputElement);
    };
  };

// слушатели на форму валидности
  const setEventListeners = (formElement, validationSelectorList) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSelectorList.inputSelector));
    const buttonElement = formElement.querySelector(validationSelectorList.submitButtonSelector);
    toggleButtonState(buttonElement, inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputvalidity(formElement, inputElement);
        toggleButtonState(buttonElement, inputList);
      });
    });
  };
// запуск валидации
  const enableValidation = (validationSelectorList) => {
    const formList = Array.from(document.querySelectorAll(validationSelectorList.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationSelectorList);
    });
  };

  enableValidation(validationSelectorList);