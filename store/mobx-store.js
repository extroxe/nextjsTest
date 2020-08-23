import {observable, action} from "mobx";

class MobxStore {
    @observable user = {}

    @action
    getUser = (userInfo) => {
        this.user = userInfo
    }

    @action
    testConsole = () => {
        console.log("sasaTestStore")
    }
}

export default MobxStore