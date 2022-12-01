
export default (services) => {
    return {
        "": function (req, res) {
            res.send(services['users'].getUsers().name)
            res.send('Hello World!')
            res.status(200).send()
        }
    }
}

