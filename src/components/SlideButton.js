// SlideButton.js
import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import '../styles/SlideButton.styl';

export default class SlideButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    foreground: PropTypes.string,
    background: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  onMouseOver = () => {
    this.setState({
      isSelected: true
    });
  };

  onMouseLeave = () => {
    this.setState({
      isSelected: false
    });
  };

  render() {
    const { icon, name, link, foreground, background } = this.props,
      { isSelected } = this.state;
    return (
      <div
        className={'slide-button ' + (isSelected ? 'state-active' : '')}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        style={{
          background: background ? background : '#888'
        }}
      >
        <a href={link} target={'_blank'}>
          <span className={'slide-icon'} style={{
            background: foreground ? foreground : '#000'
          }}>
            <i className={'fa fa-' + icon} />
          </span>

          <span className={'slide-content'}>
            {name}
          </span>
        </a>
      </div>
    );
  }
}