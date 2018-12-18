define(function() {
  const FORM_AJAX_CLASS = '.js-form-ajax'
  const AJAX = true

  const formSubmit = function ($form, callback) {
    let params = getFormParams($form)
    sendForm($form, params, callback)
  }

  const sendForm = function (form, params, callback) {
    let XHR = new XMLHttpRequest();
    XHR.open(form.method, form.action)
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    XHR.onload = function() {
      if (XHR.status === 200) {
        callback(form, JSON.parse(XHR.response).success === true ? 'success' : 'post-error')
      }
      else if (XHR.status !== 200) {
        callback(form, 'post-error')
      }
    }
    XHR.send(params.join('&'));
  }

  const getFormParams = function (form) {
    let inputList = form.elements
    let params = []

    for (var i = inputList.length - 1; i >= 0; i--) {
      let $input = inputList[i]
      if (namelessInput($input) || disabledInput($input) || uncheckedInput($input)) {
        continue;
      }
      params.push(encodeURIComponent($input.name) + '=' + encodeURIComponent(getInputValue($input)))
    }

    return params
  }

  const getInputValue = function (input) {
    if (input.nodeName == 'SELECT') {
      return input.options[input.selectedIndex].value
    } else {
      return input.value
    }
  }

  const namelessInput = function (input) {
    return input.name === ''
  }

  const disabledInput = function (input) {
    return input.disabled === true
  }

  const uncheckedInput = function (input) {
    return (input.type === 'checked' || input.type === 'radio') && input.checked === false
  }

  return {
    active: AJAX,
    submit: formSubmit
  }
});