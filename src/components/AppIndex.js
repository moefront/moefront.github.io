// AppIndex.js
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { observer }         from 'mobx-react';
// eslint-disable-next-line
import { initAnimation }    from '../utils/animation';

import '../styles/balloon.css';
import '../styles/AppIndex.styl';


const moefrontLogo = require('../images/moefront.jpg');
const background   = require('../images/background.jpg');

@observer
export default class AppIndexComponent extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };
  
  text = 'Make the world MOE';
  timer = undefined;

  typeTerminal(text, timeout) {
    if (!text)
      return;

    const { store } = this.props;
    const prev = store.terminalText;
    const cur = text[0];
    const next = text.substr(1);

    store.setTerminalText(prev + cur);
    this.timer = setTimeout(() => this.typeTerminal(next, timeout), timeout);
  }

  componentWillMount() {
    // clear terminal
    const { store } = this.props;
    store.setTerminalText('');
  }

  componentDidMount() {
    const { store } = this.props;
    store.setGlobalBackground("url('" + background + "') no-repeat center / cover");
    // responsive
    const width = document.body.offsetWidth;
    if (width <= 710) {
      this.moe.setAttribute('data-balloon-length', 'xlarge');
    }
    // delay for typing effect
    this.timer = setTimeout(() => {
      /* initAnimation(); */
      this.typeTerminal(this.text, 150);
    }, 1500);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
    if (window.canvasControl)
      window.canvasControl.dots = [];
  }

  render() {
    const { terminalText } = this.props.store;
    return (
      <div className={'moefront-index'} ref={ref => this.dom = ref}>
        <canvas id={'canvas'}></canvas>
        <div className={'index-container'}>
          <a href={'https://github.com/moefront'}>
            <img
              className={'index-logo'}
              src={moefrontLogo}
              alt={'MoeFront Studio'}
            />
          </a>
          <div className={'index-text'}>
            <h1 className={'index-title'}>
              <div
                className={'word-container'}
                data-balloon={`MoeFront 的全称是 Moe Front-End，Front-End 即 Web 开发中的前端。
最初我们主要以前端的界面设计、WebApp 开发和探索前端的无限可能为兴趣，组建了这个团队。
在团队打滚了两年后的今天，团队已不再将目光拘束于前端上，
我们正在向后端/移动端等未知的领域不断前行中。`}
                data-balloon-pos={'up'}
                data-balloon-break
                ref={ref => this.moe = ref}
              >
                <span className={'word-moe'}>
                  MoeFront
                </span>
              </div>

              <div
                className={'word-container'}
                data-balloon={`MoeFront Studio 最初成立于 2015 年 7 月的百度前端技术学院暑期训练营之际；
团队成员的平均年龄都很小，我们有着年轻的心。
由最初的五名萌新到今天整整十名成员，不忘初心，
在 Web 开发的圈子中找到一片属于我们自己的天空，一直是我们的目标。
无论何时，我们都会继续朝着这个目标努力前行和探索。`}
                data-balloon-pos={'down'}
                data-balloon-length={'large'}
                data-balloon-break={'true'}
                ref={ref => this.studio = ref}
              >
                <span className={'word-studio'}>Studio</span>
              </div>
            </h1>
            <p className={'index-description'}>
              当
              <span className={'index-stress'}>#二次元#</span>
              遇到
              <span className={'index-stress'}>#前端#</span>
            </p>
          </div>
        </div>

        <div className={'index-terminal'}>
          <span>&gt;&nbsp;</span>
          <span className={'terminal-text'}>{terminalText}</span>
          <span className={'terminal-cursor'}>_</span>
        </div>
      </div>
    );
  }
}
