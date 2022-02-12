'use strict';

const axios = require('axios');

module.exports.hello = async event => {
  console.log(event.body)
  const body = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: body.data.map((row) => [row[0], 'hello from lambda'])
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  //return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.GetNumberFromWebsite = async event => {
  console.log(event.body);
  const mybody = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: [[0,{"input": mybody }]]
      },
      null,
      2
    ),
  };
};

const GetJSONFromWebsiteInternal = async (webpage) => {
  
  const axiosGet = axios.get(webpage)

  axiosGet.then(res => {
    return (res.body);
  }).catch(error => {
    return "error";
  })

  return axiosGet;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

module.exports.GetJSONFromWebsite = async event => {

  console.log(event.body)
  const mybody = JSON.parse(event.body);
  //var rv = await sleep(1000);
  var rv = await GetJSONFromWebsiteInternal(mybody.data[0][1])
  console.log(rv.data)
  return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data: [[0,rv.data]]
        },
        null,
        2
      ),
    };
  
}
