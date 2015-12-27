/**
 * Lib
 */
var AWS = require('aws-sdk');

// todo: not sure why I need to do this here
AWS.config.update({region:'us-east-1'});

var sns = new AWS.SNS();
var topic = process.env.NEW_ORDER_TOPIC;

module.exports.respond = function(event, cb) {
  var order = {
    NewOrder: {
      userId: event.userId,
      deliveryAddress: event.deliveryAddress,
      stripeSource: event.stripeSource,
      preferences: event.preferences
    }
  }
  sns.publish({
    TopicArn: topic,
    Message: JSON.stringify(order)
  }, function(err, data) {
    if(err) {
      console.log(err.stack);
    }
    else {
      console.log(data);
    }
  });

  console.log('Waiter took an order', order);

  return cb(null, payload);
};