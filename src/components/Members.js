// Members.js
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { observer }         from 'mobx-react';

import SlideButton                   from './SlideButton';
import { membersProfile as profile } from '../utils/membersProfile';

import '../styles/Members.styl';

const Circle = ({ avatar, name, style, className, onClick }) => {
  return (
    <div
      className={'members-circle ' + className}
      onClick={onClick}
      style={style}
    >
      <img
        className={'members-circle-avatar'}
        src={avatar}
        alt={name}
        title={name}
      />
    </div>
  );
};

Circle.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

const Card = observer(({ store }) => {
  const { currentMember, currentMemberInfo, isEmailVisible } = store;
  const info = currentMemberInfo;

  return (
    <div
      className={
        'members-card ' +
        (currentMember === undefined ? '' : 'members-card-active')
      }
    >
      <p className={'card-name'}>
        {info && info.name ? info.name : ''}
        <small className={'card-nickname'}>
          {info && info.nickname ? info.nickname : ''}
        </small>
      </p>
      <p className={'card-description'}>
        {info && info.description ? info.description : ''}
      </p>
      {(() => {
        const el = [],
          el2 = [];
        // position & status
        el.push(
          <p key={'status'} className={'card-status'}>
            {info && info.status && info.position
              ? info.status + ' in ' + info.position + ' / '
              : ''}
            {info && info.speciality ? info.speciality : ''}
          </p>
        );

        // blog
        if (info && info.blog) {
          el2.push(
            <div className={'card-read-blog'} key={'read-blog'}>
              <a href={info.blog} target={'_blank'}>
                <i className={'fa fa-podcast'} />
                Read my blog
              </a>
            </div>
          );
        }

        // mail
        if (info && info.email) {
          el2.push(
            <div
              className={'card-contact-me'}
              key={'contact-me'}
              onClick={() => store.setEmailVisible()}
            >
              <i className={'fa fa-envelope'} />
              <span>{isEmailVisible ? atob(info.email) : 'Contact me'}</span>
            </div>
          );
        }

        // merge el & el2
        el.push(
          <div className={'card-button-container'} key={'button-container'}>
            {el2}
          </div>
        );
        return el;
      })()}

      <div className={'card-skills'}>
        <p className={'card-skills-title'}>Skills list</p>
        {(() => {
          if (info && info.skills) {
            const el = [];
            let i = 0;
            info.skills.forEach(Skill => el.push(<Skill key={i++} />));
            return el;
          }
        })()}
      </div>

      <div className={'card-buttons'}>
        {(() => {
          const btns = [];
          // github
          if (info && info.github) {
            btns.push(
              <SlideButton
                key={'github'}
                name={'@' + info.github}
                icon={'github'}
                link={'https://github.com/' + info.github}
              />
            );
          }
          // weibo
          if (info && info.weibo) {
            btns.push(
              <SlideButton
                key={'weibo'}
                name={'@' + info.weibo.nickname}
                icon={'weibo'}
                link={info.weibo.link}
                background={'#e6162d'}
                foreground={'#fa7d3c'}
              />
            );
          }
          // twitter
          if (info && info.twitter) {
            btns.push(
              <SlideButton
                key={'twitter'}
                name={'@' + info.twitter}
                icon={'twitter'}
                link={'https://twitter.com/' + info.twitter}
                foreground={'#1da1f2'}
                background={'#84d4f4'}
              />
            );
          }
          return btns;
        })()}
      </div>
    </div>
  );
});

Card.propTypes = {
  store: PropTypes.object.isRequired
};

@observer
export default class MembersComponent extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  themeColor = 'linear-gradient(135deg, #4D93B8 0%, #4D93B8 30%, #83faff 100%) fixed';
  recordedWidth = 0;

  componentWillMount() {
    window.addEventListener('resize', this.onWindowResized);
  }

  componentWillUnmount() {
    // reset member list
    const { store } = this.props;
    store.setGlobalBackground(this.themeColor);
    store.setCurrentMember(undefined);
    this.renderMembers();

    window.removeEventListener('resize', this.onWindowResized);
  }

  componentDidMount() {
    const { store } = this.props;

    this.recordedWidth = this.refs.circleContainer.offsetWidth;
    this.renderMembers();

    setTimeout(() => {
      const selected = Math.floor(Math.random() * 10);
      store.setCurrentMember(profile[selected].name);
      this.renderMembers();
    }, 1000);
  }

  onCircleSelected = name => {
    const { store } = this.props;
    store.setCurrentMember(name);

    this.renderMembers();
  };

  onWindowResized = () => {
    this.recordedWidth = this.refs.circleContainer.offsetWidth;
    this.renderMembers();
  };

  renderMembers() {
    const { store } = this.props,
      current = store.currentMember,
      circles = [],
      containerWidth = this.recordedWidth,
      length = profile.length,
      spaceAround = length === 0
        ? 0
        : current === undefined
          ? containerWidth / length
          : containerWidth / (length - 1);
    let i = 0;

    profile.forEach(pro => {
      // complex layout orz
      const left = pro.name === current
        ? '50%'
        : containerWidth <= 560 && i > length / 2 - 1
          ? (i++ - length / 2) * 2 * spaceAround +
              0.02 * containerWidth +
              (current !== undefined ? spaceAround : 0)
          : containerWidth <= 560
            ? i++ * 2 * spaceAround + 0.02 * containerWidth
            : i++ * spaceAround + 0.02 * containerWidth;
      const top = pro.name === current
        ? undefined
        : containerWidth <= 560 && i > length / 2 ? 100 : 15;
      circles.push(
        <Circle
          avatar={pro.avatar}
          name={pro.name}
          key={pro.name}
          className={pro.name === current ? 'circle-current' : ''}
          style={{
            left: left,
            top: top
          }}
          onClick={() => {
            this.onCircleSelected(pro.name);
          }}
        />
      );
    });

    store.setMemberListItems(circles);
  }

  render() {
    const { memberItems, currentMember } = this.props.store;

    return (
      <div className={'moefront-members'}>
        <div
          className={
            'members-all ' +
            (currentMember === undefined ? 'members-unselected' : '')
          }
          ref={'circleContainer'}
        >
          {memberItems}
        </div>
        <Card store={this.props.store} />
      </div>
    );
  }
}