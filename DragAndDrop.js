var count = 0;

$.getJSON(itemsURL)
  .done(function (data) {
    loadImages(data);
  })
  .fail(function (error) {
    console.log(error);
  });

function loadImages(data) {
  $.each(data.data, function (i, item) {
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
  ev.target.appendChild(document.getElementById(data));
}


var instructor = {
  firstName: "Edwin",
  sayHi: () => {
    setTimeout(() => {
      console.log("Hello" + this.firstname);
    }, 1000);
  }
}