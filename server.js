var express = require('express');
var bodyParser = require('body-parser');

process.on('uncaughtException', function (err) {
    console.dir(err);
});

var app = express();
var router = express.Router();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var path = require('path');
var fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.get('/study/:studyId', function(req, res) {
    var studyFile = path.join(__dirname,
        '/studies',
        req.params.studyId,
        'study.json');
    if (fs.existsSync(studyFile)) {
        res.sendFile(studyFile);
    }
    else {
        res.status(404).send('not found');
    }
});
app.get('/study/:studyId/:seriesId/:fileId', function(req, res) {
    var dcmFile = path.join(__dirname,
        '/studies/',
        req.params.studyId,
        req.params.seriesId,
        req.params.fileId);
    //
    if (fs.existsSync(dcmFile)) {
        //encode file data to base64 string
        setTimeout(function() {
            function base64_encode(file) {
                var bitmap = fs.readFileSync(file);
                return new Buffer(bitmap).toString('base64');
            }
            res.send(base64_encode(dcmFile));
        }, 100);
    }
    else {
        res.status(404).send('not found');
    }
});


app.listen(port);

console.log('listening on port: '+ port);

