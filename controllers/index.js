var renderIndex = (req, res) => {
    res.render("index.pug", { layout: false });
}

module.exports = {
    renderIndex: renderIndex
}