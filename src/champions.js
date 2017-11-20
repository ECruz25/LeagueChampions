const URL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/champion.json';
//const imageURL = 'https://ddragon.leagueoflegends.com/cdn/7.19.1/img/champion/';
var champions;
console.log('I am Here');

fetch(URL)
  .then(response => {
    if (!response.ok) {
      throw Error(404);
    }
    return response.json();
  })
  .then(passData)
  .catch(displayErrors);

function displayErrors(err) {
  console.log('INSIDE displayErrors!');
  console.log(err);
}

function passData(data) {
  champions = data.data;
}

function errorHandler(response) {
  if (!response.ok) {
    throw Error(404);
  }
  return response.json();
}

export default champions;
