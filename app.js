// Import all modules
const express = require('express');
const app = express();
const dbName = "players";
// Import the view
const viewUrl = "_design/all/_view/all"
app.use(express.json());

// Might be useless
const NodeCouchDb = require ('node-couchdb');
const couch = new NodeCouchDb({
    auth : {
        user : 'admin',
        password : 'admin'
    }
});

// Import database route
var players = require('./couchdb').use('players');

var initCouch = require('./init_couch');
const { get } = require('mongoose');

// Initialize CouchDB
initCouch(function(err) {  
  if (err) {
    throw err
  }
  else {
    console.log('couchdb initialized');
  }
});

// Insert the view if not already done
couch.insert("players", {
    "_id": "_design/all",
    "views": {
        "all": {
            "map": "function (doc) {emit(doc._id, doc);}"
        }
    },
    "language": "javascript"
    }).then(({data, headers, status}) => {
        console.log("View created successfully");
    }, err => {
        console.log("View already exists");
    });


// Basic route
app.get('/', (req, res) => {
    res.send('Hello Madboxers!');
    
});


// Small function to create a player from attributes
function CreatePlayer(id,score)
{
    return (newPlayer = {'userId' : id, 'userScore' : score});
}


let temporaryPlayers = [];

// Get route to retrieve the full list of players from the BackEnd
app.get('/player', (req, res) => {
    // Reset temporaryPlayers    
    temporaryPlayers = [];

    // Use the view to get ALL the players
    couch.get(dbName, viewUrl).then(
        function(data, headers, status){
            let array = data.data.rows;
            let counter = 0;

            // Loop trough the results and fill temporaryPlayers with newly created players
            for (let i = 0; i<array.length; i++)
            {
                const newPlayer = CreatePlayer(array[i].value.userId, array[i].value.userScore); 
                temporaryPlayers.push(newPlayer); 
                if (counter == array.length-1)
                {
                    console.log(temporaryPlayers);
                    res.send(temporaryPlayers)
                }
                counter ++;            
            }
        },

        function(err)
        {
            res.send(err);
        });
        
});

// Post route to create or update a player
app.post('/player/create', (req, res) => {

    // Try to GET the soon to be created player, and if he exists his score is updated
    players.get(req.body.userId).then((retrieved) => {
        console.log("User already exists");
        couch.insert("players", {
            _id: retrieved.userId,
            userId : retrieved.userId,
            _rev: retrieved._rev,
            userScore : req.body.userScore
            }).then(({data, headers, status}) => {
                // This section is left empty for future debugging
            }, err => {
                // This section is left empty for future debugging
            });

        // If the get returns an error, it means that the player doesn't exist yet, so he is created
        }, err => {
            console.log("User doesn't exist yet");
            couch.insert("players", {
            _id: req.body.userId,
            userId : req.body.userId,
            userScore : req.body.userScore
            }).then(({data, headers, status}) => {
                // This section is left empty for future debugging
            }, err => {
                // This section is left empty for future debugging
            });
      }
    );   
     
    
});

// Post route to delete a player
app.post('/player/delete', (req, res) => {

    // Quick check to see if the user exists or not, and if it's the case, detroy him 
    players.get(req.body.userId).then((retrieved) => {
        console.log("User exists");
        players.destroy(req.body.userId, retrieved._rev);
        console.log('User destroyed');
      }, err => {
          console.log("User doesn't exist");          
      }
    ); 
    
});

app.listen(3000, () => console.log('started and listening on localhost:3000.'));
