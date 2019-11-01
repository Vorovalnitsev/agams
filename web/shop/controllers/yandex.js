//Яндекс-подтверждение аккаунта
module.exports.index = function index(req, res) {
    res.write(
        '<html>' +
            '<head>' +
                '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
            '</head>' +
            '<body>Verification: ee499d938446415b</body>' +
        '</html>');
    res.end();
}