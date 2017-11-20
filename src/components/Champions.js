import React from 'react';

class Champions extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <button onClick={this.props.loadChampions}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Champions;
