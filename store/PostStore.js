import { observable } from 'mobx';

class PostStore {
    @observable userInfo = {}

    constructor(initialData = {}) {
        // console.log("initialDatauserInfo",initialData)
        this.userInfo = initialData
    }

}

export default PostStore;