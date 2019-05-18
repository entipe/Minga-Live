define(function() {
  const TOGGLE_CLASS = '.js-view-more-button';
  const CONTAINER_CLASS = '.js-view-more-container';
  const VISIBILITY_CLASS = 'is-active';

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
      document.querySelector(TOGGLE_CLASS).addEventListener('click', onClick);
  }

  /**
    * User click on a toggler
    * @param e Event | Click Event
    * @return void
    **/
  const onClick = function (e) {
    $container.classList.toggle(VISIBILITY_CLASS);
    e.preventDefault();
  }


  init();
});
