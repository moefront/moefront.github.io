// Like.js
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { observer }         from 'mobx-react';

import '../styles/Like.styl';

@observer
export default class Like extends Component {
  dataUrl = 'https://moefront-app.smartgslb.com/like.php?cmd=get';
  addUrl  = 'https://moefront-app.smartgslb.com/like.php?cmd=add';
  themeColor = '#fff'
  likedThemeColor = '#ec7068'

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    // update like count
    fetch(this.dataUrl).then(res => res.json()).then(data => {
      this.props.store.setLikeCount(data.likes);
    });
  }

  componentWillUnmount() {
    const { store } = this.props;
    if (store.likePageState) {
      store.setGlobalBackground(this.likedThemeColor);
    } else {
      store.setGlobalBackground(this.themeColor);      
    }
  }

  onLikeBtnClick = () => {
    // check state
    const isLiked = window.localStorage.getItem('isLiked');
    if (isLiked != null) {
      this.props.store.setLikePageState(true, '你的爱我们已经感受到了~(*^▽^*)');
      return;
    }
    window.localStorage.setItem('isLiked', 'true');

    // update remote data
    fetch(this.addUrl);

    // update view
    this.props.store.setLikeCount(Number(this.props.store.likeCount) + 1);
    this.props.store.setLikePageState(true, '感谢你的鼓励，在未来我们会做得更好！(*^▽^*)');
  };

  render() {
    const { likePageState, likeCount, likePageTips } = this.props.store;
    return (
      <div className={'moefront-likeus ' + (likePageState ? 'state-liked' : '')}>
        <h1 className={'likeus-title'}>Do you like us?</h1>
        <p className={'likeus-description'}>
           {likePageTips}
        </p>

        <div className={'likeus-button'} onClick={this.onLikeBtnClick}>
          <i className={'fa fa-heart'} />
          <span className={'like-count'}>
            {likeCount}
          </span>
        </div>

        <div className={'moefront-copyright'}>
          &copy;2015-2017 <a href={'https://github.com/moefront'} target={'_blank'}>MoeFront Studio</a>
          <span> / Finished by members of MFE with ❤ / </span>
          Powered by <a href={'https://github.com/facebook/react'} rel={'nofollow'} target={'_blank'}>React</a>
        </div>
      </div>
    );
  }
}