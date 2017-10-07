/* react & react-dom */
import React from 'react';
import { render } from 'react-dom';

/* react-router */
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* Mobx */
import { observer } from 'mobx-react';
/* Mobx model */
import UIModel from './models/UIModel';

/* Components */
import AppIndex   from './components/AppIndex';
import Members    from './components/Members';
import Works      from './components/Works';
import Like       from './components/Like';

import './styles/Navigator.styl';

import registerServiceWorker from './registerServiceWorker';

const store = new UIModel();
const basename = '/';

const App = observer(props => {
  const locationKey = props.location.key,
    pathName = props.location.pathname.replace(/\//g, ""),
    { likePageState, globalBackground } = store;
  return (
    <div className={'moefront page-' + pathName}>
      <TransitionGroup>
        <CSSTransition
          key={locationKey}
          classNames={'fade'}
          timeout={{ enter: 500, exit: 500 }}
        >
          <Switch className={'page-background'}>
            <Route exact path={'/'} children={( rest ) => (
              <AppIndex {...rest} store={store} />
            )} />
            <Route path={'/members'} children={( rest ) => (
              <Members {...rest} store={store} />
            )} />
            <Route path={'/works'} children={( rest ) => (
              <Works {...rest} store={store} />
            )} />
            <Route path={'/like'} children={( rest ) => (
              <Like {...rest} store={store} />
            )} />
          </Switch>        
        </CSSTransition>
      </TransitionGroup>
      <div
        className={'index-background'}
        style={{
          background: globalBackground
        }}
      />

      <div className={'moefront-navigator' + (likePageState ? ' color-white' : '')}>
        <NavLink
          exact
          to={'/'}
          className={'nav-item nav-home'}
          activeClassName={'nav-item-active'}
        >
          <i className={'fa fa-home'} />
        </NavLink>

        <NavLink
          exact        
          to={'/members'}
          className={'nav-item nav-members'}
          activeClassName={'nav-item-active'}
          style={{
            marginLeft: '3px'
          }}
        >
          <i className={'fa fa-user'} />
        </NavLink>

        <NavLink
          exact
          to={'/works'}
          className={'nav-item nav-works'}
          activeClassName={'nav-item-active'}
        >
          <i className={'fa fa-cubes'} />
        </NavLink>

        <NavLink
          exact        
          to={'/like'}
          className={'nav-item nav-like'}
          activeClassName={'nav-item-active'}
        >
          <i className={'fa fa-heart'} />
        </NavLink>
      </div>
    </div>
  );
});

render(
  <BrowserRouter basename={basename}>
    <Route path={'/'} component={App} />
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
