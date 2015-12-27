/**
 * Lib
 */

var AWS = require('aws-sdk');

// todo: not sure why I need to do this here
AWS.config.update({region:'us-east-1'});

var sns = new AWS.SNS();
var topic = process.env.NEW_ORDER_TOPIC;

module.exports.respond = function(event, cb) {
  var orderMessage = event.Records[0].Sns.Message;
  if(!orderMessage.destination) {
    orderMessage.destination = { restaurant: "SOME RESTAURANT"};
  }

  return cb(null, orderMessage);
};