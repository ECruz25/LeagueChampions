const URL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/champion.json';
const imageURL = 'https://ddragon.leagueoflegends.com/cdn/7.19.1/img/champion/';
const itemsURL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/item.json';
const itemImageURL = 'http://ddragon.leagueoflegends.com/cdn/7.19.1/img/item/';
const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
let count = 0;
let items = [];
let itemsChampion1 = [];
let itemsChampion2 = [];
let statsCurrentValuesChampion1 = {
  hp: 0,
  mp: 0,
  armor: 0,
  spellblock: 0,
  hpregen: 0,
  mpregen: 0,
  attackdamage: 0,
  attackspeed: 0,
  critchance: 0
};
let statsCurrentValuesChampion2 = {
  hp: 0,
  mp: 0,
  armor: 0,
  spellblock: 0,
  hpregen: 0,
  mpregen: 0,
  attackdamage: 0,
  attackspeed: 0,
  critchance: 0
};

const statsInformation = [
  {
    hp: ['FlatHPPoolMod', 'rFlatHPModPerLevel', 'PercentHPPoolMod']
  },
  {
    mp: ['FlatMPPoolMod', 'rFlatMPModPerLevel', 'PercentMPPoolMod']
  },
  {
    armor: ['FlatArmorMod', 'rFlatArmorModPerLevel', 'PercentArmorMod']
  },
  {
    spellblock: [
      'FlatSpellBlockMod',
      'rFlatSpellBlockModPerLevel',
      'PercentSpellBlockMod'
    ]
  },
  {
    hpregen: ['FlatHPRegenMod', 'rFlatHPRegenModPerLevel', 'PercentHPRegenMod']
  },
  {
    mpregen: ['FlatMPRegenMod', 'rFlatMPRegenModPerLevel', 'PercentMPRegenMod']
  },
  {
    attackdamage: [
      'FlatPhysicalDamageMod',
      'rFlatPhysicalDamageModPerLevel',
      'PercentPhysicalDamageMod'
    ]
  },
  {
    attackspeed: [
      'FlatAttackSpeedMod',
      'rFlatHPModPerLevel',
      'PercentAttackSpeedMod',
      'rPercentAttackSpeedModPerLevel'
    ]
  },
  {
    critchance: [
      'FlatCritChanceMod',
      'rFlatCritChanceModPerLevel',
      'PercentCritChanceMod'
    ]
  }
];

loadInitialData();

$('.championSelect').change(() => {
  $.getJSON(URL)
    .done(data => {
      updatePictures(data);
      updateStats(data);
    })
    .fail(error => {
      console.log('Error');
    });
  $.getJSON(itemsURL)
    .done(data => {
      updateItemStats(data);
    })
    .fail(error => {
      console.log(error);
    });
});

$('.itemSelect').change(() => {
  $.getJSON(itemsURL)
    .done(data => {
      updateItemStats(data);
    })
    .fail(error => {
      console.log('Error');
    });
});

$('.levelSelect').change(() => {
  $.getJSON(URL)
    .done(data => {
      updateStats(data);
    })
    .fail(error => {
      console.log('Error');
    });
  $.getJSON(itemsURL)
    .done(data => {
      updateItemStats(data);
    })
    .fail(error => {
      console.log('Error');
    });
});

function loadInitialData() {
  $.getJSON(URL)
    .done(data => {
      updateChampionSelects(data);
      updatePictures(data);
      updateStats(data);
    })
    .fail(error => {
      console.log('Error');
    });
  $.getJSON(itemsURL)
    .done(data => {
      updateItemSelects(data);
    })
    .fail(error => {
      console.log('Error');
    });
  $.getJSON(itemsURL)
    .done(data => {
      loadImages(data);
    })
    .fail(error => {
      console.log('Error');
    });
  $.each(levels, (l, level) => {
    $('.levelSelect').append(
      $('<option>', {
        value: level,
        text: level
      })
    );
  });
}

function updateChampionSelects(data) {
  $.each(data.data, (c, champion) => {
    $('.championSelect').append(
      $('<option>', {
        value: champion.id,
        text: champion.name
      })
    );
  });
}

function updateItemSelects(data) {
  $.each(data.data, (i, item) => {
    if (item.gold.purchasable && item.maps[11] && item.colloq != '') {
      $('.itemSelect').append(
        $('<option>', {
          value: i,
          text: item.name
        })
      );
    }
  });
}

function updateItemStats(data) {
  $.each(statsCurrentValuesChampion2, (s, stat) => {
    $(`.${s} .byItems`).remove();
    //console.log(document.querySelector('#champion1Stats'));
    statsCurrentValuesChampion1[s] = 0;
    statsCurrentValuesChampion2[s] = 0;
  });
  updateItemStatsChampion1(data);
  updateItemStatsChampion2(data);
  console.log(statsCurrentValuesChampion1);
  console.log(statsCurrentValuesChampion2);
}

function updateItemStatsChampion1(data) {
  $(itemsChampion1).each(function() {
    if (this != '-') {
      $.each(data.data[this].stats, (s, stat) => {
        $.each(statsInformation, (i, item) => {
          $.each(statsInformation[i], (o, itemStat) => {
            $.each(statsInformation[i][o], (u, itemStat2) => {
              //asegurarme que hacer si es flat, o que pedos
              if (s === itemStat2) {
                $(`.${o} .champion1Span`).remove();
                if (s.startsWith('Flat')) {
                  statsCurrentValuesChampion1[o] =
                    statsCurrentValuesChampion1[o] + stat;
                  //console.log(o, statsCurrentValuesChampion1[o]);
                  //console.log(o);
                  $(`#champion1Stats .${o}`).append(
                    $('<span>')
                      .attr('class', 'byItems champion1Span')
                      .append(` +(${statsCurrentValuesChampion1[o]})`)
                  );
                }
              }
            });
          });
        });
      });
    }
  });
}

function updateItemStatsChampion2(data) {
  $(itemsChampion2).each(function() {
    if (this != '-') {
      $.each(data.data[this].stats, (s, stat) => {
        $.each(statsInformation, (i, item) => {
          $.each(statsInformation[i], (o, itemStat) => {
            $.each(statsInformation[i][o], (u, itemStat2) => {
              if (s === itemStat2) {
                $(`.${o} .champion2Span`).remove();
                console.log(s);
                if (s.startsWith('Flat')) {
                  statsCurrentValuesChampion2[o] =
                    statsCurrentValuesChampion2[o] + stat;
                  $(`#champion2Stats .${o}`).append(
                    $('<span>')
                      .attr('class', 'byItems champion2Span')
                      .append(`+ (${statsCurrentValuesChampion2[o]})`)
                  );
                }
              }
            });
          });
        });
      });
    }
  });
}

function updateStats(data) {
  let champion1Selected = $('#champion1Select').val();
  let champion2Selected = $('#champion2Select').val();
  let levelChampion1 = $('#levelsChampion1Select').val();
  let levelChampion2 = $('#levelsChampion2Select').val();
  $('#champion1Stats').empty();
  $('#champion2Stats').empty();

  $.each(data.data[champion1Selected].stats, (c, information) => {
    if ($('#levelsChampion1Select').val() == 1) {
      $('#champion1Stats').append(
        $('<li>')
          .attr('class', `info list-group-item ${c}`)
          .append(`${c}: `)
          .append(
            $('<span>')
              .attr('class', 'value')
              .append(` ${information}`)
          )
      );
    } else {
      if (!c.endsWith('perlevel')) {
        if (data.data[champion1Selected].stats[`${c}perlevel`]) {
          $('#champion1Stats').append(
            $('<li>')
              .attr('class', `info list-group-item ${c}`)
              .append(`${c}: `)
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(` ${information}`)
                  .append(
                    $('<span>')
                      .attr('class', 'perLevel')
                      .append(
                        `+(${Number(
                          data.data[champion1Selected].stats[`${c}perlevel`] *
                            $('#levelsChampion1Select').val()
                        ).toFixed(2)})`
                      )
                  )
              )
          );
        } else {
          $('#champion1Stats').append(
            $('<li>')
              .attr('class', `info list-group-item ${c}`)
              .append(c + ': ')
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(` ${information}`)
              )
          );
        }
      } else {
      }
    }
  });
  $.each(data.data[champion2Selected].stats, (c, information) => {
    if ($('#levelsChampion2Select').val() == 1) {
      $('#champion2Stats').append(
        $('<li>')
          .attr('class', `info list-group-item ${c}`)
          .append(c + ': ')
          .append(
            $('<span>')
              .attr('class', 'value')
              .append(` ${information}`)
          )
      );
    } else {
      if (c.substr(c.length - 8) !== 'perlevel') {
        if (data.data[champion2Selected].stats[`${c}perlevel`]) {
          $('#champion2Stats').append(
            $('<li>')
              .attr('class', 'info list-group-item ' + c)
              .append(`${c}: `)
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(`' ${information}`)
                  .append(
                    $('<span>')
                      .attr('class', `perLevel`)
                      .append(
                        `+(${Number(
                          data.data[champion2Selected].stats[`${c}perlevel`] *
                            $('#levelsChampion2Select').val()
                        ).toFixed(2)})`
                      )
                  )
              )
          );
        } else {
          $('#champion2Stats').append(
            $('<li>')
              .attr('class', 'info list-group-item ' + c)
              .append(`${c}:`)
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(` ${information}`)
              )
          );
        }
      }
    }
  });
}

function updatePictures(data) {
  let champion1Selected = $('#champion1Select').val();
  let champion2Selected = $('#champion2Select').val();
  $('#champion1Picture').attr(
    'src',
    imageURL + data.data[champion1Selected].image.full
  );
  $('#champion2Picture').attr(
    'src',
    imageURL + data.data[champion2Selected].image.full
  );
}

function loadImages(data) {
  let items = Object.values(data.data).filter(
    item =>
      item.gold.purchasable &&
      item.maps[11] == true &&
      item.colloq != '' &&
      Object.keys(item.stats).length !== 0
  );

  items.sort((a, b) => (a.gold.total > b.gold.total ? 1 : -1));
  for (let item of items) {
    //console.log(item.image.full.slice(0, 4), item.maps[11]);
    $.get(itemImageURL + item.image.full)
      .done(() => {
        $('#pictures').append(
          $('<img>').attr({
            src: itemImageURL + item.image.full,
            draggable: true,
            ondragstart: 'drag(event)',
            id: 'image' + item.image.full.slice(0, 4),
            class: 'item '
          })
        );
      })
      .fail(error => {
        console.log(error);
      });
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
  let x = document.getElementById(data);
  if (ev.target.tagName === 'DIV') {
    if (ev.target.childNodes.length < 6 || ev.target.id === 'pictures') {
      x.setAttribute('id', `copyOf${data}`);
      ev.target.appendChild(x);
    } else {
      alert('You`ve reached maximum amount of items');
    }
  } else if (ev.target.parentNode.tagName === 'DIV') {
    if (
      ev.target.parentNode.childNodes.length < 6 ||
      ev.target.parentNode.id === 'pictures'
    ) {
      x.setAttribute('id', `copyOf${data}`);
      ev.target.parentNode.appendChild(x);
    } else {
      alert('You`ve reached maximum amount of items');
    }
  }
  $('#pictures').empty();
  $.getJSON(itemsURL)
    .done(data => {
      loadImages(data);
    })
    .fail(error => {
      console.log(error);
    });
  getImagesIds();
  $.getJSON(itemsURL)
    .done(data => {
      updateItemStats(data);
    })
    .fail(error => {
      console.log('Error');
    });
}

function getImagesIds() {
  itemsChampion1 = [];
  itemsChampion2 = [];
  $.each(
    document.getElementById('itemsChampion1').getElementsByTagName('img'),
    (i, item) => {
      itemsChampion1.push(item.id.slice(-4));
    }
  );
  $.each(
    document.getElementById('itemsChampion2').getElementsByTagName('img'),
    (i, item) => {
      itemsChampion2.push(item.id.slice(-4));
    }
  );
}
