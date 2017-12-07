import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, key) {
    const fish = this.props.fishes[key];
    //take a copy of the fish and update it with the new data
    const updatedFish = { ...fish, [e.target.name]: e.target.value };
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return [
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          placeholder="name"
          value={fish.name}
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          placeholder="price"
          value={fish.price}
        />
        <select
          type="text"
          name="status"
          placeholder="status"
          value={fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="description"
          placeholder="Sescription"
          value={fish.desc}
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={fish.image}
        />
      </div>
    ];
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;