const URL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/champion.json';
const imageURL = 'https://ddragon.leagueoflegends.com/cdn/7.19.1/img/champion/';
const itemsURL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/item.json';
const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var items = [];
var statsCurrentValues = {
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

var statsInformation = [
  { hp: ['FlatHPPoolMod', 'rFlatHPModPerLevel', 'PercentHPPoolMod'] },
  { mp: ['FlatMPPoolMod', 'rFlatMPModPerLevel', 'PercentMPPoolMod'] },
  { armor: ['FlatArmorMod', 'rFlatArmorModPerLevel', 'PercentArmorMod'] },
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

$('#compareBTn').click(function() {
  $.getJSON(URL)
    .done(function(data) {
      updatePictures(data);
    })
    .fail(function(error) {
      console.log(error);
    });
});

$('.championSelect').change(function() {
  $.getJSON(URL)
    .done(function(data) {
      updatePictures(data);
      updateStats(data);
    })
    .fail(function(error) {
      console.log(error);
    });
  $.getJSON(itemsURL)
    .done(function(data) {
      updateItemStats(data);
    })
    .fail(function(error) {
      console.log(error);
    });
});

$('.itemSelect').change(function() {
  $.getJSON(itemsURL)
    .done(function(data) {
      updateItemStats(data);
    })
    .fail(function(error) {
      console.log(error);
    });
});

$('.levelSelect').change(function() {
  $.getJSON(URL)
    .done(function(data) {
      updateStats(data);
    })
    .fail(function(error) {
      console.log(error);
    });
  $.getJSON(itemsURL)
    .done(function(data) {
      updateItemStats(data);
    })
    .fail(function(error) {
      console.log(error);
    });
});

function loadInitialData() {
  $.getJSON(URL)
    .done(function(data) {
      updateChampionSelects(data);
      updatePictures(data);
      updateStats(data);
    })
    .fail(function(error) {
      console.log(error);
    });
  $.getJSON(itemsURL)
    .done(function(data) {
      updateItemSelects(data);
    })
    .fail(function(error) {
      console.log(error);
    });
  $.each(levels, function(l, level) {
    $('.levelSelect').append(
      $('<option>', {
        value: level,
        text: level
      })
    );
  });
}

function updateChampionSelects(data) {
  $.each(data.data, function(c, champion) {
    $('.championSelect').append(
      $('<option>', {
        value: champion.id,
        text: champion.name
      })
    );
  });
}

function updateItemSelects(data) {
  $.each(data.data, function(i, item) {
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
  //Please refactor this code!!!
  $.each(statsCurrentValues, function(s, stat) {
    $('.' + s + ' ' + '.byItems').empty();
  });
  $('.itemSelect option:selected').each(function() {
    if (this.value != '-') {
      $.each(data.data[this.value].stats, function(s, stat) {
        $.each(statsInformation, function(i, item) {
          $.each(statsInformation[i], function(o, itemStat) {
            $.each(statsInformation[i][o], function(u, itemStat2) {
              //asegurarme que hacer si es flat, % o que pedos
              if (s === itemStat2) {
                $('.' + o + ' ' + '.byItems').empty();
                if (s.substring(0, 4) === 'Flat') {
                  statsCurrentValues[o] = statsCurrentValues[o] + stat;
                  console.log(o);
                  $('.' + o).append(
                    $('<span>')
                      .attr('class', 'byItems')
                      .append(' + (')
                      .append(statsCurrentValues[o])
                      .append(')')
                  );
                }
              }
            });
          });
        });
      });
    }
  });
  //hacer una funcion para limpiar las que no se usan
  $.each(statsCurrentValues, function(s, stat) {
    statsCurrentValues[s] = 0;
  });
}

function updateStats(data) {
  var champion1Selected = $('#champion1Select').val();
  var champion2Selected = $('#champion2Select').val();
  var levelChampion1 = $('#levelsChampion1Select').val();
  var levelChampion2 = $('#levelsChampion2Select').val();
  $('#champion1Stats').empty();
  $('#champion2Stats').empty();

  $.each(data.data[champion1Selected].stats, function(c, information) {
    if ($('#levelsChampion1Select').val() == 1) {
      console.log(c);
      $('#champion1Stats').append(
        $('<li>')
          .attr('class', 'info list-group-item ' + c)
          .append(c + ': ')
          .append(
            $('<span>')
              .attr('class', 'value')
              .append(information)
          )
      );
    } else {
      if (c.substr(c.length - 8) !== 'perlevel') {
        if (data.data[champion1Selected].stats[c + 'perlevel']) {
          $('#champion1Stats').append(
            $('<li>')
              .attr('class', 'info list-group-item ' + c)
              .append(c + ': ')
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(information)
                  .append(
                    $('<span>')
                      .attr('class', 'perLevel')
                      .append(' + (')
                      .append(
                        Number(
                          data.data[champion1Selected].stats[c + 'perlevel'] *
                            $('#levelsChampion1Select').val()
                        ).toFixed(2)
                      )
                      .append(')')
                  )
              )
          );
        } else {
          $('#champion1Stats').append(
            $('<li>')
              .attr('class', 'info list-group-item ' + c)
              .append(c + ': ')
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(information)
              )
          );
        }
      } else {
      }
    }
  });
  $.each(data.data[champion2Selected].stats, function(c, information) {
    if ($('#levelsChampion2Select').val() == 1) {
      $('#champion2Stats').append(
        $('<li>')
          .attr('class', 'info list-group-item ' + c)
          .append(c + ': ')
          .append(
            $('<span>')
              .attr('class', 'value')
              .append(information)
          )
      );
    } else {
      if (c.substr(c.length - 8) !== 'perlevel') {
        if (data.data[champion2Selected].stats[c + 'perlevel']) {
          $('#champion2Stats').append(
            $('<li>')
              .attr('class', 'info list-group-item ' + c)
              .append(c + ': ')
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(information)
                  .append(
                    $('<span>')
                      .attr('class', 'perLevel')
                      .append(' + (')
                      .append(
                        Number(
                          data.data[champion2Selected].stats[c + 'perlevel'] *
                            $('#levelsChampion2Select').val()
                        ).toFixed(2)
                      )
                      .append(')')
                  )
              )
          );
        } else {
          $('#champion2Stats').append(
            $('<li>')
              .attr('class', 'info list-group-item ' + c)
              .append(c + ': ')
              .append(
                $('<span>')
                  .attr('class', 'value')
                  .append(information)
              )
          );
        }
      } else {
      }
    }
  });
}

function updatePictures(data) {
  var champion1Selected = $('#champion1Select').val();
  var champion2Selected = $('#champion2Select').val();
  $('#champion1Picture').attr(
    'src',
    imageURL + data.data[champion1Selected].image.full
  );
  $('#champion2Picture').attr(
    'src',
    imageURL + data.data[champion2Selected].image.full
  );
}
