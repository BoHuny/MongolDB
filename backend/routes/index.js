
export default () => {
    return {
        "": function (req, res) {
            res.send('Hello World!')
            res.status(200).send()
        }
    }
}

