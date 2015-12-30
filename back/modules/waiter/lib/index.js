/**
 * Lib
 */
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

var Saws = new require('saws')(AWS);
Saws.stage = process.env.SERVERLESS_STAGE;

var topic = new Saws.Topic("NewOrders");

module.exports.takeOrder = function(event, cb) {
  var order = {
    NewOrder: {
      userId: event.userId,
      deliveryAddress: event.deliveryAddress,
      stripeSource: event.stripeSource,
      preferences: event.preferences
    }
  }
  topic.publish(order, cb);
};