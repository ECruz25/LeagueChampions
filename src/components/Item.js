import React from 'react';

const itemImageURL = 'http://ddragon.leagueoflegends.com/cdn/7.19.1/img/item/';

class Champion extends React.Component {
  render() {
    const { details, index } = this.props;
    return (
      <div className="item">
        <img src={itemImageURL + details.image.full} alt="" className="item" />
      </div>
    );
  }
}

export default Champion;
