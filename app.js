// imports
var fs = require('fs')
const http = require('http')
const express = require('express')
var bodyParser = require('body-parser')
var xmlreader = require('xml2js')
var parser = new xmlreader.Parser();

const app = express()
var jsonParson = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 5000

var exec = require('child_process').exec;

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Views
app.get('', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
})

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

app.post('/writeXML', urlencodedParser, (req, res) => {
   console.log(req.body.deliverXML);
   fs.writeFile('results/temp.xml', req.body.deliverXML, function(err) {
      if (err) throw err;
      console.log('Saved data');
   })
   res.send("Successfully updated the XML file")
})

app.get('/readXML', (req, res) => {
   var tempXML = 'results/temp.xml'
   fs.readFile(tempXML, "utf8", function(err, data) {
      parser.parseString(data, function(err2, result) {
      	 console.log(result['SampleXML']['SampleNumber'][0])
         res.send(result['SampleXML']['SampleNumber'][0])
      })
   })
})