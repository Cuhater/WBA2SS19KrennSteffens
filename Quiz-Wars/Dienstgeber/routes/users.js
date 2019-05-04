var express = require('express');
var router = express.Router();
const https = require('https');
let ressource = ''
let jsonData = [];
let preparedObject;
let steadyObj = [];
/* GET home page. */

/*

const options = {
    protocol: 'https:',
    hostname: 'swapi.co',
    path: '/api/people',
    port: 80,
    format: 'json',
    method: 'GET',
    headers: {
        'Content-Type': 'text/json'
    }
};
*/


router.get('/', async (req, res, next)=>{


  /*
      console.log('-- Get People Data from API --')
      getData( '/people/1/',  function(data){
      //await console.log(JSON.parse(data))
          console.log("people?" + data);
      })
       console.log('-- End People Data from API --')

      console.log('-- Get Planet Data from API --')
      getData( '/planets/1/',  function(data){
        console.log(JSON.parse(data));
      })
      console.log('-- End Planet Data from API --')
  */

  /*test().then(res.status(29));*/

  let baseURL = 'https://swapi.co/api'




  //let people_all = await getData(baseURL,'/species/' , '?page=4')
  let people_all = await getData(baseURL,'/species/' , '?page=3')


  //await getJSONData();
  //let planet_all = await getData('/planets/' + '?page=2')
  //console.log("2 :)))" + JSON.stringify(planet_all))
  //await getJSONData();
  console.log("3 :)))")
  res.status(200).send((people_all))
});

function getData(url, path, parameter, currentObjects){
  return new Promise((resolve, reject) => {



    if(currentObjects !== undefined) {
      console.log("MY CURRENT OBJECTS \n" +  JSON.stringify(currentObjects) + "\n\n")
      // console.log("++++++++++++++++++++++++\n ++++++++++++++++++++++++++++++++\n" + steadyObj)
      // console.log("++++++++++++++++++++++++\n +++++++++++++++++++CRRRRRRRRRRRRRRRRR+++++++++++++\n" + JSON.stringify(currentObjects))
      steadyObj = steadyObj.concat(currentObjects);

      console.log("MY STEADYYY OBJECTS \n\n" +  JSON.stringify(steadyObj) + "\n\n")
      //  console.log("++++++++++++++++++++++++\n ++++++++++++++++++++++++++++++++\n" + steadyObj)
    }
    if(parameter === undefined) {
      parameter = ''
    }
    if(path === undefined) {
      path = ''
    }

    https.get(url + path + parameter, (res) => {
      let str = '';
      res.on('data', function (chunk) {



        str += chunk


        //console.log("str: " + str);


      });

      res.on('end', async function () {


        let jsonObject = JSON.parse(str);
        console.log("testiii" + JSON.stringify(jsonObject.next))
        if(jsonObject.next !== null)
        {
          console.log("JSON OBJECT NEXT" + JSON.stringify(jsonObject.next))
          //console.log("JSON OBJECT RESULTS" + JSON.stringify(jsonObject.results))
          //getData(jsonObject.next)
          preparedObject = jsonObject.results
          console.log("########## PREPARED OBJECT RESULTS" + JSON.stringify(preparedObject) + "\n\n")
          console.log("JETZ WIRD NOCHMAL GESCHEPPERT \n")
          resolve(await getData(jsonObject.next, '', '', jsonObject.results))
        }
        else
        {
          console.log("is riss")
          steadyObj = steadyObj.concat(jsonObject.results)

          console.log("FINAL OUTPUT : \n\n" + JSON.stringify(steadyObj) + "\n\n")
          resolve(steadyObj)
        }





      });

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
const getCall = ()=> {
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



