module.exports.index = function (req, res) {
    res.status(404);
    res.render('404.handlebars');
};