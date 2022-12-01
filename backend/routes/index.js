
export default (services) => {
    return {
        "":["GET", function (req, res) {
            res.send(services['users'].getUsers().name)
            res.send('Hello World!')
            res.status(200).send()
        }]
    }
}

