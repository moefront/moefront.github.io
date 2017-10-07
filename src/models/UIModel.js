import { observable, action } from 'mobx';
import { membersProfile, maps } from '../utils/membersProfile';

export default class UIModel {
  @observable terminalText = '';
  @observable globalBackground = '';
  @observable currentMember = undefined;
  @observable memberItems = [];
  @observable currentMemberInfo = {};
  @observable isEmailVisible = false;
  @observable likeCount = 0;
  @observable likePageState = false;
  @observable likePageTips = '如果你喜欢我们，就请给我们一个赞吧（认真脸） _( : з」∠)_';

  @action
  setGlobalBackground(target) {
    this.globalBackground = target;
  }

  @action
  setTerminalText(text) {
    this.terminalText = text;
  }

  @action
  setCurrentMember(member) {
    this.currentMember = member;
    this.currentMemberInfo = membersProfile[maps[member]];
    this.isEmailVisible = false;
  }

  @action
  setMemberListItems(items) {
    this.memberItems = items;
  }

  @action
  setEmailVisible() {
    this.isEmailVisible = true;
  }

  @action
  setLikeCount(count) {
    this.likeCount = count;
  }

  @action
  setLikePageState(pageState, tips) {
    this.likePageState = pageState;
    this.likePageTips = tips;
  }
}