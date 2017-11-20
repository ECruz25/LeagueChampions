import React from 'react';
import ChampionPicker from './ChampionPicker';
import Champions from './Champions';
import Champion from './Champion';
import Item from './Item';
import loadAllChampions from '../champions.js';

const championsURL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/champion.json';
const itemsURL =
  'http://ddragon.leagueoflegends.com/cdn/7.19.1/data/en_US/item.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false
    };
  }

  // addChampion(champion) {
  //   //update state
  //   const champions = { ...this.state.fishes };
  //   //add in our new champ
  //   champions[champion] = champion;
  // }

  componentDidMount() {
    fetch(championsURL)
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed');
        }
        return response;
      })
      .then(d => d.json())
      .then(
        d => {
          this.setState({
            champions: d.data
          });
        },
        () => {
          this.setState({
            requestFailed: true
          });
        }
      );
    fetch(itemsURL)
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed');
        }
        return response;
      })
      .then(d => d.json())
      .then(
        d => {
          this.setState({
            items: d.data
          });
        },
        () => {
          this.setState({
            requestFailed: true
          });
        }
      );
  }

  render() {
    if (!this.state.champions) return <p>Loading....</p>;
    return (
      <div>
        <ChampionPicker />
        <h2>{this.state.champions[0]}</h2>
        <ul className="champions">
          {Object.keys(this.state.champions).map(key => (
            //Aqui paso al campeon
            <Champion
              key={key}
              index={key}
              details={this.state.champions[key]}
            />
          ))}
        </ul>
        <ul className="items">
          {Object.keys(this.state.items).map(key => (
            //Aqui paso al campeon
            <Item key={key} index={key} details={this.state.items[key]} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
