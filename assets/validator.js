function Validator(options) {
  function validate(inputElement, rule) {
    const errorMessage = rule.test(inputElement.value);
    const elementParent = inputElement.parentElement;
    const errorElement = elementParent.querySelector(options.errorSelector);

    if (errorMessage) {
      elementParent.classList.add("invalid");
      errorElement.textContent = errorMessage;
    } else {
      elementParent.classList.remove("invalid");
      errorElement.textContent = errorMessage;
    }
  }

  const formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach((rule) => {
      const inputElement = formElement.querySelector(rule.selector);
      const elementParent = inputElement.parentElement;
      const errorElement = elementParent.querySelector(options.errorSelector);

      if (inputElement) {
        // xu ly khi blur khoi input
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        // xu ly khi ng dung nhap input
        inputElement.oninput = () => {
            errorElement.textContent = ''
            elementParent.classList.remove('invalid')
        };
      }
    });
  }
}

// rules
// Nguyen tac cua cac rule:
// 1. Khi co loi =>  Tra ra message loi
// 2. Nguoc lai return undefined
Validator.isRequired = (selector) => {
  return {
    selector,
    test: (value) => {
      return value.trim() ? undefined : "Vui lòng nhập trường này";
    },
  };
};

Validator.isEmail = (selector) => {
  return {
    selector,
    test: (value) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ? undefined
        : "Trường này phải là email";
    },
  };
};

Validator.minLength = (selector, min) => {
    return {
      selector,
      test: (value) => {
        return value.length >= min ? undefined : `Trường này tối thiểu ${min} kí tự`;
      },
    };
};

Validator.isConfirmed = (selector, getConfirmValue) => {
  return {
    selector,
    test: (value) => {
      return value === getConfirmValue() ? undefined : 'Giá trị nhập vào không chính xác'
    }
  }
}