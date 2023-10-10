/**
 * Template Name: Nova
 * Updated: Aug 30 2023 with Bootstrap v5.3.1
 * Template URL: https://bootstrapmade.com/nova-bootstrap-business-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  console.log(preloader);
  if (preloader) {
    window.addEventListener('load', () => {
      console.log('preloader remove');
      preloader.remove();
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    console.log('aos init');
    aos_init();
  });
  console.log('main.js load');
});
