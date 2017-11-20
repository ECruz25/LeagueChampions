import React from 'react';
const championImageURL =
  'https://ddragon.leagueoflegends.com/cdn/7.19.1/img/champion/';

class Champion extends React.Component {
  render() {
    const { details, index } = this.props;
    return (
      <div className="champion">
        <img
          src={championImageURL + details.image.full}
          alt=""
          className="championImage"
        />
      </div>
    );
  }
}

export default Champion;
