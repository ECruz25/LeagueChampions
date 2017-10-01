const itemsURL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/item.json';
const itemImageURL = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';
var count = 0;

$.getJSON(itemsURL)
  .done(function(data) {
    loadImages(data);
  })
  .fail(function(error) {
    console.log(error);
  });

function loadImages(data) {
  $.each(data.data, function(i, item) {
    if (item.gold.purchasable && item.maps[11] && item.colloq != '') {
      $('#pictures').append(
        $('<img>').attr({
          src: itemImageURL + item.image.full,
          draggable: true,
          ondragstart: 'drag(event)',
          id: 'image' + i,
          class: 'item'
        })
      );
    }
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  console.log(ev.target.id, ev.target.childNodes.length);
  if (ev.target.tagName === 'DIV') {
    if (ev.target.childNodes.length < 6 || ev.target.id === 'pictures') {
      ev.target.appendChild(document.getElementById(data));
    } else {
      alert('You`ve reched mximum amount of items');
    }
  } else if (ev.target.parentNode.tagName === 'DIV') {
    ev.target.parentNode.appendChild(document.getElementById(data));
  }
}
