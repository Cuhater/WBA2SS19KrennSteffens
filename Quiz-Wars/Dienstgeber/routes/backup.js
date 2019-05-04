var express = require('express');
var router = express.Router();
const https = require('https');
//let preparedObject;
let finalObject = [];

router.get('/', async (req, res, next) => {

    let baseURL = 'https://swapi.co/api'
    let species_all = await getData(baseURL, '/species/', '?page=3')
    console.log("\n\n### Finish router.get Routine ###")

    // Try get all names in one object
    console.log('start get value');
    getValue(species_all, "skin_colors");


    res.status(200).send((species_all))
});


function getRandom(range) {
    return Math.floor(Math.random()* range)
}

function getValue(object, propertyName) {

    console.log('Try to get name');
    //console.log('object' + JSON.stringify(object.length));
    //console.log('test' + (object.length));
    let testi = []
    let rnd1 = getRandom(object.length)
    let rnd2 = getRandom(object.length)
    let rnd3 = getRandom(object.length)

    let ra = getRandom(5)

    console.log("RIGHT ANSWER " + ra);
    console.log("1 " + rnd1);
    console.log("2 " + rnd2);
    console.log("3 " + rnd3);

    let rnd = Math.floor(Math.random() * object.length + 1)
    //Get all Values
    for(let i= 0; i< object.length; i++)
    {
        var obj = object[i]
        //console.log(propertyName);
        console.log("Klappts???" +obj[propertyName])

        testi[i] = obj[propertyName]
    }



    console.log("RND NAME ?" + object[rnd].name + "RND RND " + rnd + "RND RND SKIN" + object[rnd][propertyName]);

    console.log("Which Skincolor got the spezies : '" + object[rnd].name + "' ?")

    // answers = A1, A2, A3, A4, Integer
    let answers = [];

    console.log("ANSWER 1: " + testi[rnd1]);
    console.log("ANSWER 2: " + testi[rnd2]);
    console.log("ANSWER 3: " + testi[rnd3]);
    console.log("ANSWER 4: " + testi[rnd] + "\n\n");
    console.log(" RIGHT A " + ra)


    // Prepare answer Block
    for(let x = 0; x < 4 ; x++)
    {
        if(x === ra)
        {
            answers.push(testi[rnd])
            //console.log("HALLO JAMOIN MEINE FRAGE IS GLEICH RA" + ra + x);
        }
        else
        {
            answers.push(testi[getRandom(object.length)])
            //console.log("nope");

        }
    }
    answers.push(ra);

    /*    answers.push(testi[rnd]);
        answers.push(testi[rnd1]);
        answers.push(testi[rnd2]);
        answers.push(testi[rnd3]);
        answers.push(ra);*/

    for(let y = 0; y < 4; y++)
    {
        console.log(answers[y]);
    }



    console.log("RIGHT ANSWER: " + object[rnd].skin_colors )


}


function makeQuestion(question, answers) {

}

function getData(url, path, parameter, currentObjects) {

    //console.log("Starting  get Call on Path [extern API] : " + url + path + parameter + "\n\n")

    //Return new Promise to guarantee right Process timing
    return new Promise((resolve, reject) => {


        if (currentObjects !== undefined) {
            finalObject = finalObject.concat(currentObjects);
        }
        else
        {
            console.log("Finish get Call on Path [extern API] : " + url + path + parameter + "\n\n")
        }
        if (parameter === undefined) { parameter = '' }
        if (path === undefined) { path = '' }
        https.get(url + path + parameter, (res) => {
            let str = '';

            //Response on Data
            res.on('data', function (chunk) {
                str += chunk
            });

            //On Respond End
            res.on('end', async function () {
                let jsonObject = JSON.parse(str);

                //If more Pages are available start async recursive getData call
                if (jsonObject.next !== null) {
                    //preparedObject = jsonObject.results

                    console.log("Finish get Call next Path [extern API] : " + jsonObject.next + "\n\n")
                    resolve(await getData(jsonObject.next, '', '', jsonObject.results))
                } else {
                    //Concat Final Object with last results
                    finalObject = finalObject.concat(jsonObject.results)
                    resolve(finalObject)
                }
            });
            // On Error reject Promise
            res.on('error', function (error) {
                reject(error);
            })
        });
    })
}


/*async function test() {
    let path = "/people/1/";

    let response = await promisifiedRequest(path, function(data){
        console.log(JSON.parse(data));
    });

    console.log(response.headers);
    console.log(response.body);
}*/

/*
function getData (path, callbackData){
    var str = '';
    callback = function(response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(str);
            callbackData(str);
        });

        //return str;
    }
    var req = https.request('https://swapi.co/api' + path, callback).end();
}*/


/*const fetch = async  () => {
    return new Promise(((resolve, reject) => {



        https.get('https://swapi.co/api/people/1/',  (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            let mydata = resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data));
                jsonData = (JSON.parse(data));

                //console.log("parse data inner? " + jsonData)


            });

        })

        resolve = jsonData
        return resolve;
    }))
}

const foo = async () => {
    let result = await fetch()
        console.log("DAS SIND MEINE DATEN " + result)
/!*        .then(result => console.log(JSON.parse(result)))
        .catch(error => console.log(error))*!/
}*/

/*
var getData = async (path) => new Promise  ((resolves ) => {

    https.get('https://swapi.co/api' + path, (res) => {
        let str;
        res.on('data', function (chunk) {
            str = chunk;
            console.log(str);

        });

        res.on('end', function () {
            //console.log(str);

        });

    });
});

const doStuff = async () => {
    console.log('starting');
    await getData('/people/1/');
    console.log("test :)");
    console.log("äh");
    console.log("finish");

    return Promise.resolve();
};*/


/*const getData = () => {

};*/
/*    console.log("B4");

    let data = await getData();
    console.log("AFTER" + data);*/
/*   //res.render('index', { title: 'Express' });


   console.log("xx -1- Start get asynchronous Data");
    await initData().then(res.status(200, "ok"));

   console.log("xx -5- Get asychronous Data complete");

   console.log("xx -6- Final JSONLOG");
   //
*/

/*
    apiCall().then((body) => {
        console.log(body.data);

    })
        .catch((err) => console.log(err));

    //getData().then(req);
*/


/*let test;
await getCall();
await console.log('FERTIG?');*/

/*



function getData() {
    // Setting URL and headers for request
    https.get('https://swapi.co/api/people/1/',  (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            jsonData = (JSON.parse(data));

            console.log("parse data inner? " + jsonData)

            return("test");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    console.log("NOCH EIN TEST " + jsonData);
}*/


let myVar = '';
const getCall = () => {
    console.info('Do the GET call');

// do the GET request
    var reqGet = https.request('https://swapi.co/api/people/1/', async function (res) {
        console.log("statusCode: ", res.statusCode);
        // uncomment it for header details
//  console.log("headers: ", res.headers);


        await res.on('data', function (d) {
            console.info('GET result:\n');
            process.stdout.write(d);
            console.info('\n\nCall completed');
            myVar = d;
        });

    });

    reqGet.end();
    reqGet.on('error', function (e) {
        console.error(e);

        console.log(reqGet.data);


        return Promise.resolve(reqGet.data)
    });
    console.log("MYDATAAAA" + myVar);
}


/*
const apiCall = () => {
    return new Promise((resolve, reject) => {
        var options = {
            url: ''
        };
        let callback = https.get('https://swapi.co/api/people/1/', (res) => {
            let str;
            res.on('data', function (chunk) {
                str = chunk;


            });

            res.on('end', function () {
                console.log(str);
                resolve(str);
            });

        });

    });
}
*/


/*
let callback = https.get('https://swapi.co/api/people/1/', (res) => {
    let str;
    res.on('data', function (chunk) {
        str = chunk;


    });

    res.on('end', function () {
        console.log(req.data);
        console.log(str);
        return(str);
    });

});

*/


/*
async function getData() {

    let promise = new Promise((resolve, reject) => {





        let callback = https.get('https://swapi.co/api/people/1/', (res) => {
        let str;
             res.on('data', function (chunk) {
                str = chunk;


            });

            res.on('end', function () {
                console.log(req.data);
                console.log(str);
                return(str);
            });

        });


        let req = https.request('https://swapi.co/api/people/1/', callback).end();
        //setTimeout(() => resolve("done!"), 2000)

        return resolve(req);
    });

    let result = await promise; // wait till the promise resolves (*)


    console.log(result); // "done!"
    await console.log("SRSLY?");
}





let getData2 =  () => {

    let dat = "dummy";
    const req =  https.get('https://swapi.co/api/people/1/', (res) => {
        console.log(`statusCode: ${res.statusCode}`)

         res.on('data', (d) => {
            //process.stdout.write(d)
             dat = d;
        })
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.end();
    console.log(dat);
    return Promise.resolve(dat);


};*/

module.exports = router;

/*

let initData = () => {

    console.log("pp -2- Start getting Data from API");

     getData();


    console.log("pp -4-  Out of Await");

    //console.log("HIERE");
    //console.log("DATA :  " + myData);
    return Promise.resolve("TEST");
};

let getData = () => {

    let options = {
        host: 'swapi.co',
        path: ''
    };
    let str = '';

    https.get('https://swapi.co/api/people/1/', (res) => {

        console.log("pp -XXX- AWAITTT");


        res.on('data', function (chunk) {
            str = chunk;
            //console.log("STRING IN DATA " + str);

            return (str);
        });

        res.on('end', function () {
            console.log("pp -3-  Get Data in Method complete");

        });
        //return (str);

        console.log("pp -XXX- AWAITTT");
    });
    return str;

};

*/

/*var req = http.request(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  //res.setEncoding('utf8');
  res.on('data', (d) => {
    return(d);
    process.stdout.write(d);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body

req.write('data\n');
req.write('data\n');
req.end();*/

/*

  let options = {
    hostname: 'swapi.co',
    path: body,
    method: 'GET',
    port: 8080,
    headers: {
      'Content-Type': 'application/json'
    }};

  let req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

// write data to request body
  req.write('data\n');
  req.write('data\n');
  req.end();

*/





/*async function test() {
    let path = "/people/1/";

    let response = await promisifiedRequest(path, function(data){
        console.log(JSON.parse(data));
    });

    console.log(response.headers);
    console.log(response.body);
}*/

/*
function getData (path, callbackData){
    var str = '';
    callback = function(response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(str);
            callbackData(str);
        });

        //return str;
    }
    var req = https.request('https://swapi.co/api' + path, callback).end();
}*/


/*const fetch = async  () => {
    return new Promise(((resolve, reject) => {



        https.get('https://swapi.co/api/people/1/',  (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            let mydata = resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data));
                jsonData = (JSON.parse(data));

                //console.log("parse data inner? " + jsonData)


            });

        })

        resolve = jsonData
        return resolve;
    }))
}

const foo = async () => {
    let result = await fetch()
        console.log("DAS SIND MEINE DATEN " + result)
/!*        .then(result => console.log(JSON.parse(result)))
        .catch(error => console.log(error))*!/
}*/

/*
var getData = async (path) => new Promise  ((resolves ) => {

    https.get('https://swapi.co/api' + path, (res) => {
        let str;
        res.on('data', function (chunk) {
            str = chunk;
            console.log(str);

        });

        res.on('end', function () {
            //console.log(str);

        });

    });
});

const doStuff = async () => {
    console.log('starting');
    await getData('/people/1/');
    console.log("test :)");
    console.log("äh");
    console.log("finish");

    return Promise.resolve();
};*/


/*const getData = () => {

};*/
/*    console.log("B4");

    let data = await getData();
    console.log("AFTER" + data);*/
/*   //res.render('index', { title: 'Express' });


   console.log("xx -1- Start get asynchronous Data");
    await initData().then(res.status(200, "ok"));

   console.log("xx -5- Get asychronous Data complete");

   console.log("xx -6- Final JSONLOG");
   //
*/

/*
    apiCall().then((body) => {
        console.log(body.data);

    })
        .catch((err) => console.log(err));

    //getData().then(req);
*/


/*let test;
await getCall();
await console.log('FERTIG?');*/

/*



function getData() {
    // Setting URL and headers for request
    https.get('https://swapi.co/api/people/1/',  (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            jsonData = (JSON.parse(data));

            console.log("parse data inner? " + jsonData)

            return("test");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    console.log("NOCH EIN TEST " + jsonData);
}*/


let myVar = '';
const getCall = () => {
    console.info('Do the GET call');

// do the GET request
    var reqGet = https.request('https://swapi.co/api/people/1/', async function (res) {
        console.log("statusCode: ", res.statusCode);
        // uncomment it for header details
//  console.log("headers: ", res.headers);


        await res.on('data', function (d) {
            console.info('GET result:\n');
            process.stdout.write(d);
            console.info('\n\nCall completed');
            myVar = d;
        });

    });

    reqGet.end();
    reqGet.on('error', function (e) {
        console.error(e);

        console.log(reqGet.data);


        return Promise.resolve(reqGet.data)
    });
    console.log("MYDATAAAA" + myVar);
}


/*
const apiCall = () => {
    return new Promise((resolve, reject) => {
        var options = {
            url: ''
        };
        let callback = https.get('https://swapi.co/api/people/1/', (res) => {
            let str;
            res.on('data', function (chunk) {
                str = chunk;


            });

            res.on('end', function () {
                console.log(str);
                resolve(str);
            });

        });

    });
}
*/


/*
let callback = https.get('https://swapi.co/api/people/1/', (res) => {
    let str;
    res.on('data', function (chunk) {
        str = chunk;


    });

    res.on('end', function () {
        console.log(req.data);
        console.log(str);
        return(str);
    });

});

*/


/*
async function getData() {

    let promise = new Promise((resolve, reject) => {





        let callback = https.get('https://swapi.co/api/people/1/', (res) => {
        let str;
             res.on('data', function (chunk) {
                str = chunk;


            });

            res.on('end', function () {
                console.log(req.data);
                console.log(str);
                return(str);
            });

        });


        let req = https.request('https://swapi.co/api/people/1/', callback).end();
        //setTimeout(() => resolve("done!"), 2000)

        return resolve(req);
    });

    let result = await promise; // wait till the promise resolves (*)


    console.log(result); // "done!"
    await console.log("SRSLY?");
}





let getData2 =  () => {

    let dat = "dummy";
    const req =  https.get('https://swapi.co/api/people/1/', (res) => {
        console.log(`statusCode: ${res.statusCode}`)

         res.on('data', (d) => {
            //process.stdout.write(d)
             dat = d;
        })
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.end();
    console.log(dat);
    return Promise.resolve(dat);


};*/

module.exports = router;

/*

let initData = () => {

    console.log("pp -2- Start getting Data from API");

     getData();


    console.log("pp -4-  Out of Await");

    //console.log("HIERE");
    //console.log("DATA :  " + myData);
    return Promise.resolve("TEST");
};

let getData = () => {

    let options = {
        host: 'swapi.co',
        path: ''
    };
    let str = '';

    https.get('https://swapi.co/api/people/1/', (res) => {

        console.log("pp -XXX- AWAITTT");


        res.on('data', function (chunk) {
            str = chunk;
            //console.log("STRING IN DATA " + str);

            return (str);
        });

        res.on('end', function () {
            console.log("pp -3-  Get Data in Method complete");

        });
        //return (str);

        console.log("pp -XXX- AWAITTT");
    });
    return str;

};

*/

/*var req = http.request(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  //res.setEncoding('utf8');
  res.on('data', (d) => {
    return(d);
    process.stdout.write(d);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body

req.write('data\n');
req.write('data\n');
req.end();*/

/*

  let options = {
    hostname: 'swapi.co',
    path: body,
    method: 'GET',
    port: 8080,
    headers: {
      'Content-Type': 'application/json'
    }};

  let req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

// write data to request body
  req.write('data\n');
  req.write('data\n');
  req.end();

*/
