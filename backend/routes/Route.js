export default class Route {
    constructor(path, method, needAuthent, callback) {
        this.path = path
        this.method = method
        this.needAuthent = needAuthent
        this.callback = callback
    }
}