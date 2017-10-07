// Navigator.js
import React        from 'react';
import { NavLink }  from 'react-router-dom';
import { observer } from 'mobx-react';

import '../styles/Navigator.styl';

export const Navigator = observer(({ store }) => {
  const { likePageState } = store;
  return (
    <div className={'moefront-navigator' + (likePageState ? ' color-white' : '')}>
      <NavLink
        exact
        to={'/'}
        className={'nav-item nav-home'}
      >
        <i className={'fa fa-home'} />
      </NavLink>

      <NavLink
        exact        
        to={'/members'}
        className={'nav-item nav-members'}
        style={{
          marginLeft: '3px'
        }}
      >
        <i className={'fa fa-user'} />
      </NavLink>

      <NavLink
        exact        
        to={'/like'}
        className={'nav-item nav-like'}
      >
        <i className={'fa fa-heart'} />
      </NavLink>
    </div>
  );
});

export default Navigator;