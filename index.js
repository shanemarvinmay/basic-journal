const express = require('express');
const app = express();
const port = process.env.PORT | 3000;
const fs = require('fs');

app.get('/', (req, res) => {
    //res.send('Welcome to basic jounral!')
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(fs.readFileSync('./index.html'));
});

app.post('/saveEntry', (req, res) => {
    //res.send('Welcome to basic jounral!')
    console.log('saveEntry reached!');
    // res.writeHead(200, {"Content-Type": "text/html"});
    // res.write("saveEntry reached!");
    res.send("saved entry");
    console.log(req.query);
    let data = JSON.stringify(req.query);
    let fileName = "entries/" + new Date().getTime();
    fs.writeFile(`${fileName}`,data, (err) => {
        if (err) throw err;
        console.log(`file written: ${fileName}`);
    })
});

app.get('/getEntries', (req, res) => {
    getEntries(res);
    // res.send('Entries!');
    // res.writeHead(200, {"Content-Type": "text/html"});
    // res.write(fs.readFileSync('./index.html'));
});

const getEntries = (res) => {
    let entries = '';
    fs.readdir('./entries', (err, files) =>{
        if (err) throw err;
        for(let i = 0; i < files.length; i++){
            console.log(files[i]);
            entries += fs.readFileSync(`entries/${files[i]}`);
        }
        res.send( entries );
    });
}

app.listen(port, () => console.log(`App running and listening at http://localhost:${port}`));