'use strict';

var linkMore = document.querySelector('.link-more'),
  text = document.querySelector('.text');

linkMore.onclick = function(e) {
  e.preventDefault();
  text.classList.toggle('text-open');
}