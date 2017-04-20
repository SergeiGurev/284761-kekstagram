'use strict';

window.photos = (function () {
  var NUMBER_PHOTOS = 25;
  var COMMENTS_MAX = 200;
  var COMMENTS_MIN = 15;

  var commentsList = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var photos = getPhotos(NUMBER_PHOTOS);

  return photos;

  function getPhotos(numberPhotos) {
    var arrayPhotos = [];

    for (var i = 0; i < numberPhotos; i++) {
      var randomLikes = Math.ceil(Math.random() * (COMMENTS_MAX - COMMENTS_MIN) + COMMENTS_MIN);
      var randomComments = getRandomComments();

      arrayPhotos[i] = {};
      arrayPhotos[i].url = 'photos/' + (i + 1) + '.jpg';
      arrayPhotos[i].likes = randomLikes;
      arrayPhotos[i].comments = randomComments;
    }

    return arrayPhotos;
  }

  function getRandomComments() {
    var comments = [];

    if (Math.random() < 0.5) {
      comments.push(commentsList[Math.floor(Math.random() * commentsList.length)]);
    }

    comments.push(commentsList[Math.floor(Math.random() * commentsList.length)]);

    return comments;
  }
})();
