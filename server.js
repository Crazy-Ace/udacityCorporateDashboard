var express = require('express'),
    path = require('path'),
    app = express(),
    root = path.normalize(__dirname + '/dist/'),
    port = process.env.PORT || 5000;

app.use(express.static(root));

app.get('*', function(req, res) {
    res.sendFile(path.join(root + '/index.html'));
});

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});