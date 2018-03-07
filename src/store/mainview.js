import { observable, action } from 'mobx'

class MainView {
  @observable active

  constructor() {
    this.active = 0
  }

  checkActive = (index) => {
    this.active = index
  }
}

export default new MainView()