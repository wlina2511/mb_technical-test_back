# MadBox project : Node.Js


###  Time spent on this part

I have spent a total of around **20** hours on Node.Js, split as following :
- Around **10** hours learning JavaScript and Node.Js (which I had started prior to the interview).
- Around **3** hours building the project architecture and getting the basic routes to work between Node.Js and Unity.
- Around **7** hours building the CouchDB architecture (and linking it to Node), which I'm going to talk about later in this README.

###  Architectural and technical choices
I have chose to use **CouchDB** as the database, as I couldn't get MongoDB to work on my computer and Couch seemed simple enough for a complete beginner like me to get a hold of. 

I have followed a part of [Couch Tutorial] to get it to work, and as soon as I understood how it worked, I tried to do the rest by myself.

![alt text](https://i.stack.imgur.com/giHlp.png "Image1")

As you can see in the screenshot above, my directory is set like following :
  - **nodes_modules** are where all the required modules are saved
  - **app** is the main JavaScript file and will be the one you're launching
  - **couchdb** and **init_couch** are dependencies used in **app.js**
  - **package** and **package-lock** are where the required packages are saved

### What was hard
As I said before, I had to scrap a lot of my work because I started to work with MongoDb and for some reason the MongoDb server wouldn't launch on my computer, so I wasted about 2 hours on something that could have been avoided.

When I switched to CouchDb, everyting went smooth at the beginning, then I hurt myself on **asynchronous functions** and spent more time that I would have like to understand them. The biggest offset for me was that I discovered far too late that **await** and **then** couldn't be used in a **forEach** function in JavaScipt, so there also went my time. 

But in the end, I'm very proud of what I have achieved as I started from scratch, and I hope you'll like it too !

### What I would do to push the project a step forward

For now, I havn't implemented a data type verification, also known as **"schemas"**. I tried to do so, but in the end it wasn't working so I dropped the idea. What those schema were doing was verifying that the data provided by the client were the right type and returned an error if they were not.

That brings me to my second way of improving the project, a **better error handling**. As of now, most of my errors are dealt with a console.log, so it should be pushed further with plugins like **"Boom"**.

Lastly, I would try to delegate functions into multiples files instead of one, but I was more confident putting all of my needs into one file **(app.js)** as I was beginning.

### Project startup

##### Node.Js installation

First you need to install [Node.JS].
Just go on the link above and install the appropriate version.
You can type 
```sh
$ node
```
to ensure that it is correctly installed.
##### CouchDB installation
As I said earlier, I used CouchDB as my database, so you'll need to install it :
You need to go on [CouchDB Install] website and download an appropriate version of the software.
It is important that during the CouchDB installation, you specify "admin" as **both** your username and your password.

This will then launch CouchDB as a service which will always be running, and is accessible by going to <http://localhost:5984/_utils/> and logging with username : admin / password : admin.

##### Server startup
Open a terminal in the directory where you cloned the project and type :

```sh
$ node app.js
```
You should see this in the console : 

![alt text](https://i.stack.imgur.com/kaSCz.png "Image1")
- The first line tells us that the NodeJs server is up and running
- the second one tells us that the CouchDB connection has been established
- the third one tells us that the view we will use to retrieve the players has been initialized correctly

You are then good to go ! 
Each time a player will be added/deleted/updated, you will be notified in the console and also displayed with the full database.

Have fun !

### Final thoughts and bibliography

I would like to thanks everyone at MadBox who has been so nice to me and gave me a shot at joining this wonderful company.
That was a great experience !

Here are the tutorials I used :
- [Express Database]
- [Nuno Job]
- [MongoDB tutorial that I ended up scrapping]

[//]: #

   [Couch Tutorial]: <https://medium.com/yld-blog/node-js-databases-using-couchdb-5135f6f45dc1>
   [CouchDB Install]: <https://couchdb.apache.org/>
   [Express database]: <https://expressjs.com/fr/guide/database-integration.html>
   [MongoDB tutorial that I ended up scrapping]: <https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d>
   [Nuno Job]: <https://writings.nunojob.com/2012/07/How-To-Update-A-Document-With-Nano-The-CouchDB-Client-for-Node.js.html>
   

   
