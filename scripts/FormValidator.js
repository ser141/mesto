export class FormValidator {
    constructor(validationSettings, formElement) {
      this._formSelector = validationSettings.formSelector;
      this._inputSelector = validationSettings.inputSelector;
      this._submitButtonSelector = validationSettings.submitButtonSelector;
      this._inactiveButtonClass = validationSettings.inactiveButtonClass;
      this._inputErrorClass = validationSettings.inputErrorClass;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
//   перебор инпутов на невалидность
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid
      })
    }
//   вкл/откл кнопки сабмита
    _toggleButtonState() {
      if(this._hasInvalidInput()){
        this.disableSubmitButton();
      } else {
        this._enableSubmitButton();
      }
      
    }
//   отключение кнопки сабмита
    disableSubmitButton() {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true)
    }
//   вкл кнопки сабмита
    _enableSubmitButton() {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true)
    }
//   показать ошибки валидации
    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._inputErrorClass);
    }
//   скрыть ошибки валидации
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = '';
      inputElement.classList.remove(this._inputErrorClass);
    };
//   проверка валидности
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement)
      } else {
        this._hideInputError(inputElement)
      };
    }
//   слушатели
    _setEventListeners() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement)
          this._toggleButtonState()
        });
      });
    }
//   валидация
    enableValidation() {
      this._setEventListeners();
    }
  }
  