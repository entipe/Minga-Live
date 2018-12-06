import VanillaScrollspy from 'vanillajs-scrollspy';

import lazySizes from 'lazysizes';
import picturefill from 'picturefill';

const navbar = document.querySelector('.js-nav');
const scrollspy = new VanillaScrollspy(navbar);
scrollspy.init();

const nav = require('./nav.js');