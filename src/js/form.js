define(['./form-ajax.js'],function(formAjax) {
  const FORM_CLASS = '.js-form'
  const FORM_SUBMIT_CLASS = '.js-form-submit'
  const INPUT_CLASS_SUCCESS = 'is-valid'
  const INPUT_CLASS_ERROR = 'is-invalid'
  const INPUT_CAPTCHA_NAME = 'g-recaptcha-response'
  let buttonList

  const init = function () {
    buttonList = document.querySelectorAll(FORM_SUBMIT_CLASS)

    if (buttonList.length > 0) {
      listen()
    }
  }
  const listen = function () {
    for (var i = buttonList.length - 1; i >= 0; i--) {
      buttonList[i].addEventListener('click', onSubmit)
    }
  }

  const onSubmit = function (e) {
    e.preventDefault()
    let $form = e.target.closest(FORM_CLASS)
    let inputList = $form.elements

    loading($form, true)

    if (inputList.length > 0) {
      filterInput(inputList)
    }

    if ($form.querySelectorAll('.is-invalid').length === 0) {
      if (formAjax.active === true) {
        formAjax.submit($form, formCallback)
      } else {
        $form.submit()
      }
    } else {
      formCallback($form, 'error')
    }
  }

  const formCallback = function (form, status) {
    loading(form, false)
    toggleMessage(form, status)

    if (status === 'success') {
      disableForm(form)
    }
  }

  const disableForm = function (form) {
    let formElement = form.elements
    for (var i = formElement.length - 1; i >= 0; i--) {
      formElement[i].disabled = true
    }
    form.disabled = true
    form.classList.add('is-disabled')
  }

  const loading = function (form, state) {
    let $submit = form.querySelector('.js-form-submit')
    let attr = state === true ? 'on' : 'off'

    $submit.innerHTML = $submit.getAttribute('data-'+attr);
    $submit.classList.toggle('is-loading')
  }

  const toggleMessage = function(form, type) {
    let $messageList = form.querySelectorAll('.js-form-feedback')

    for (var i = $messageList.length - 1; i >= 0; i--) {
      let $message = $messageList[i]
      $message.classList.add('d-none')
    }

    form.querySelector('.js-form-feedback-'+type).classList.remove('d-none')
  }

  const filterInput = function (list) {
    for (var i = list.length - 1; i >= 0; i--) {
      let $input = list[i]

      if (!$input.required && !inputIsCaptcha($input.name)) {
        continue
      }

      let type = getInputType($input)

      if (inputIsText(type) || inputIsCaptcha(type)) {
        validateText($input)
      } else if (inputIsEmail(type)) {
        validateEmail($input)
      } else if (inputIsCheckboxRadio(type)) {
        validateCheckboxRadio($input, list)
      } else if (inputIsSelect(type)) {
        validateSelect($input)
      } else if (inputIsTextArea(type)) {
        validateTextArea($input)
      } else {
        console.warn('unknow input', $input, type)
      }
    }
  }

  const toggleClass = function (input, add, remove) {
    input.classList.add(add)
    input.classList.remove(remove)
  }

  const validateSelect = function (input) {
    let classToAdd = input.selectedIndex === 0 ? INPUT_CLASS_ERROR : INPUT_CLASS_SUCCESS
    let classToRemove = input.selectedIndex === 0 ? INPUT_CLASS_SUCCESS : INPUT_CLASS_ERROR

    toggleClass(input, classToAdd, classToRemove)
  }

  const validateTextArea = function (input) {
    validateText(input)
  }

  const validateCheckboxRadio = function (input, list) {
    let name = input.name
    let siblingList = getSibling(name, list)
    let hasChecked = false
    let classToAdd, classToRemove

    for (var i = siblingList.length - 1; i >= 0; i--) {
      let $input = siblingList[i]

      if ($input.checked === true) {
        hasChecked = true
      }
    }

    classToAdd = hasChecked === false ? INPUT_CLASS_ERROR : INPUT_CLASS_SUCCESS
    classToRemove = hasChecked === false ? INPUT_CLASS_SUCCESS : INPUT_CLASS_ERROR

    for (var i = siblingList.length - 1; i >= 0; i--) {
      toggleClass(siblingList[i], classToAdd, classToRemove)
      siblingList[i].parentElement.classList.add(classToAdd)
      siblingList[i].parentElement.classList.remove(classToRemove)
    }
  }

  const validateEmail = function (input) {
    validateText(input)
  }

  const validateText = function (input) {
    let val = input.value
    let classToAdd = val === '' ? INPUT_CLASS_ERROR : INPUT_CLASS_SUCCESS
    let classToRemove = val === '' ? INPUT_CLASS_SUCCESS : INPUT_CLASS_ERROR

    toggleClass(input, classToAdd, classToRemove)
  }

  const getInputType = function (input) {
    if (input.nodeName === 'SELECT') {
      return 'select'
    } else if (input.nodeName === 'TEXTAREA') {
      return 'textarea'
    } else if (input.name === INPUT_CAPTCHA_NAME) {
      return INPUT_CAPTCHA_NAME
    } else {
      return input.type
    }
  }

  const getSibling = function (name, list) {
    let siblingList = []
    for (var i = list.length - 1; i >= 0; i--) {
      let $input = list[i]

      if ($input.name === name) {
        siblingList.push($input)
      }
    }

    return siblingList
  }

  const inputIsText = function(type) {
    return type === 'text' || type === 'number' || type === 'tel'
  }

  const inputIsEmail = function(type) {
    return type === 'email'
  }

  const inputIsSelect = function(type) {
    return type === 'select'
  }

  const inputIsCaptcha = function(type) {
    return type === INPUT_CAPTCHA_NAME
  }

  const inputIsTextArea = function(type) {
    return type === 'textarea'
  }

  const inputIsCheckboxRadio = function(type) {
    return type === 'checkbox' || type === 'radio'
  }

  init()
});