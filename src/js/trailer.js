define(function() {
  const TOGGLE_CLASS = '.js-trailer-toggle';
  const CONTAINER_CLASS = '.js-trailer';
  const ACTIVE_CLASS = 'is-active';

  let $container;

  /**
  * Main init function, all start here
  * @return void
  **/
  const init = function () {
      listen();

      $container = document.querySelector(CONTAINER_CLASS);
  }

  /**
  * Main listener function, all listen here
  * @return void
  **/
  const listen = function () {
      let $toggleList = document.querySelectorAll(TOGGLE_CLASS);

      for (var i = $toggleList.length - 1; i >= 0; i--) {
          $toggleList[i].addEventListener('click', onClick);
      }
  }

  /**
    * User click on a toggler
    * @param e Event | Click Event
    * @return void
    **/
  const onClick = function (e) {

    $container.classList.toggle(ACTIVE_CLASS);
    let $iframe = $container.querySelector('iframe');

    $iframe.src = $container.classList.contains(ACTIVE_CLASS) ? $iframe.getAttribute('data-src') : '';

    e.preventDefault();
  }


  init();
});