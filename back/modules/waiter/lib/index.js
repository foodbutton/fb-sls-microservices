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
    RequestId: event.requestId,
    IdentityId: event.body.IdentityId,
    DeliveryAddress: event.body.DeliveryAddress,
    StripeSource: event.body.StripeSource,
    Preferences: event.body.Preferences
  }
  topic.publish(order, cb);
};