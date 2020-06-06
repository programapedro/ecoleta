// Imports
const express = require('express');
const nunjucks = require('nunjucks');
const database = require('./database/db');
//

// Declarations
const server = express();
//

// Nunjucks Configurations
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});
//

// Express Configurations
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true })); // Enable use `req.body`
//

// Server Routes

// Route to Home page
server.get("/", (req, res) => {
    return res.render('index.html');
});
//

// Route to Create Point page and the POST method to save in database
server.get("/create-point", (req, res) => {
    return res.render('create-point.html');
});
server.post("/save-point", (req,res) => {

    // DATABASE QUERY
    const query = `
    INSERT INTO points (
        name,
        image,
        address,
        number_complement,
        state,
        city,
        items
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
`
    // Data association to the values from the REQUEST body
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.number_complement,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    // Callback function to verify if the register was saved or not
    function afterInsertData(error) {
        if(error) {
            console.log(error);
            return res.render("create-point.html", { dont_saved: true });
         } else {
             return res.render("create-point.html", { saved: true });
             console.log(this);
         }        
    }

    // QUERY for INSERT data
    database.run(query, values, afterInsertData);

});
//

// Route to Results page and database QUERY to DISPlAY the available points 
server.get("/results", (req, res) => {

    search = req.query.search;

    // If the search input is empty
    if(search == "") {
        return res.render('search-results.html', { total: 0 });        
    }

    // QUERY for DISPLAY data
    database.all(`SELECT * FROM points WHERE city LIKE '%${search}%'`, function(error, rows) {
        if(error){
            res.send(`Houve um erro ao consultar os pontos cadastrados: ${error}`);
        } else {
            //Total is equals to the number of registers
            const total = rows.length;
            return res.render('search-results.html', { points: rows, total });
        }
    });
});
//

//

//Server PORT Listener
server.listen(3000);
//