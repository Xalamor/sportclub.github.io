const feedback_form = document.querySelector('.form');
  const feedback_button = document.querySelector('.buttons__feedback');
  
  feedback_button.addEventListener('click', () => {
      feedback_form.classList.remove('popup-closed');
  })
  
  function closePopup (cur_popup) {
    cur_popup.classList.add('popup-closed')
  }
  
  feedback_form.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
          closePopup(feedback_form);
      }
  })
  
  
  
  const textPatternEN = /[a-zA-Z]/;
  
  const parameters = {
      formSelector: '.form__input-container',
      inputSelector: '.form__item',
      submitButtonSelector: '.form__sending',
      inactiveButtonClass: 'button_inactive',
      inputErrorClass: 'popup__form-text-input_type_error'
  }
  
  function incorrectEmail(inputElement) {
      if (inputElement.value.indexOf('/') !== - 1) {
          return true;
      }
      const inputValue = inputElement.value.split(".");
      if (inputValue.length <= 1) {
          return true;
      }
      const emailEnd = inputValue.pop();
      return emailEnd.length < 2 || emailEnd.length > 6 || !(/[a-z]/i.test(emailEnd));
  }
  
  function incorrectTel(inputElement) {
      const inputValue = inputElement.value.split("+");
      const telEnd = inputValue.pop();
      return Number.isNaN(Number(telEnd)) || telEnd.length !== 11 || (inputValue.length === 1 && inputValue[0] !== "") || inputValue.length > 1;
  }
  
  function hasInvalidInput(inputsList) {
      return inputsList.some(function(inputElement) {
          return !inputElement.validity.valid || (inputElement.type === "email" && incorrectEmail(inputElement)) || (inputElement.type === "tel" && incorrectTel(inputElement)) || ((inputElement.id === "text-input" && (inputElement.value.search(textPatternEN) !== -1)));
      });
  }
  
  function toggleButton(inputsList, buttonElement, inactiveButtonClass) {
      if (hasInvalidInput(Array.from(inputsList))) {
          buttonElement.classList.add(inactiveButtonClass);
          buttonElement.disabled = true;
      } else  {
          buttonElement.classList.remove(inactiveButtonClass);
          buttonElement.disabled = false;
      }
  }
  
  function showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(inputErrorClass);
      errorElement.textContent = errorMessage;
      if (inputElement.type === "email" && incorrectEmail(inputElement)) {
          inputElement.classList.add(inputErrorClass);
          errorElement.textContent = "Некорректный email";
      }
      if ((inputElement.type === "tel" && incorrectTel(inputElement))) {
          inputElement.classList.add(inputErrorClass);
          errorElement.textContent = "Некорректный телефон";
      }
      if ((inputElement.id === "text-input" && (inputElement.value.search(textPatternEN) !== -1))) {
          inputElement.classList.add(inputErrorClass);
          errorElement.textContent = "Некорректный текст";
      }
  }
  
  function hideInputError(formElement, inputElement, inputErrorClass) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(inputErrorClass);
      errorElement.textContent = '';
  }
  
  function enableValidation(parameters) {
      const formsList = document.querySelector(parameters.formSelector);
      formsList.addEventListener('submit', function (evt) {
              evt.preventDefault();
      });
  
          const inputsList = Array.from(formsList.querySelectorAll(parameters.inputSelector));
          const buttonElement = formsList.querySelector(parameters.submitButtonSelector);
          toggleButton(inputsList, buttonElement, parameters.inactiveButtonClass);
          inputsList.forEach(function(inputElement) {
              inputElement.addEventListener('input', function() {
                  toggleButton(inputsList, buttonElement, parameters.inactiveButtonClass);
                  if (!inputElement.validity.valid || (inputElement.type === "email" && incorrectEmail(inputElement)) || (inputElement.type === "tel" && incorrectTel(inputElement)) || (inputElement.id === "text-input" && (inputElement.value.search(textPatternEN) !== -1))) {
                      showInputError(formsList, inputElement, inputElement.validationMessage, parameters.inputErrorClass);
                  } else {
                      hideInputError(formsList, inputElement, parameters.inputErrorClass);
                  }
              })
          });
  }
  
  enableValidation(parameters);
  
  function showLoading() {
      document.querySelector(parameters.submitButtonSelector).textContent = "Отправляется..."
  }
  
  function success() {
      document.querySelector(parameters.submitButtonSelector).textContent = "Успешная отправка!"
  }
  
  function hideLoading() {
      document.querySelector(parameters.submitButtonSelector).textContent = "Отправить"
  }
  
  function answer() {
    setTimeout(success, 500);
    setTimeout(function () {
        closePopup(document.querySelector('.form-popup'));
        hideLoading()
    }, 1000);
  }
  
  document.querySelector(parameters.formSelector).addEventListener('submit', function() {
      const popupForm = document.querySelector(parameters.formSelector);
      const telInput = popupForm.querySelector(".form__number");
      const emailInput = popupForm.querySelector(".form__email");
      const textInput = popupForm.querySelector(".form__text");
      showLoading();
      fetch("", {
          method: "POST",
          body: JSON.stringify({
              tel: telInput.value,
              email: emailInput.value,
              text: textInput.value
          })
      })
      answer();
  })