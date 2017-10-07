import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { worksList } from '../utils/worksList';
import '../styles/Works.styl';

const colors = [
  '#03a9f4', '#00bbd3', '#9c27b0', '#e81e62', '#4caf50', '#663ab6', '#feea3b', '#ccdb39', '#8ac249', '#785447'
];

export const Item = ({ name, description, icon, link, author }) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className={'works-item' + (icon === undefined ? '' : ' item-has-icon')}>
      <div
        className={'project-container'}
        title={name + ' created by ' + author}
        onClick={() => window.open(link)}
        style={{
          background: icon === undefined ? color : '#fff'
        }}
      >
        {(icon ? <img src={icon} alt={name} /> : '')}
        <p className={'project-name'}>{name}</p>
        <div className={'project-details'}>
          <p className={'project-description'}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
  link: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default class Works extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  themeColor = 'linear-gradient(135deg, #F9A01B 0%, #F9A01B 30%, #ffff2e 100%) fixed';

  componentWillUnmount() {
    const { store } = this.props;
    store.setGlobalBackground(this.themeColor);
  }

  render() {
    return (
      <div className={'moefront-works'}>
        <h1 className={'works-title'}>
          Our Works
        </h1>
        <p className={'works-description'}>
          There is a list collecting awesome works of MFE & MFE's members~
        </p>

        <div className={'works-container'}>
          {(() => {
            let key = 0, comp = [];
            worksList.forEach(work => comp.push(
             <Item
                key={key++}
                name={work.name}
                description={work.description}
                icon={work.icon}
                author={work.author}
                link={work.link}
              />
            ));
            return comp;
          })()}
        </div>
      </div>
    );
  }
};
