export default class Route {
    constructor(path, method, needAuthent, callback, callbackFail=() => {}) {
        this.path = path
        this.method = method
        this.needAuthent = needAuthent
        this.callback = callback
        this.callbackFail = callbackFail
    }
}