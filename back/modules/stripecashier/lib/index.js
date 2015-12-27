var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

var doc = require('dynamodb-doc');
var ddb = new doc.DynamoDB();

var stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports.createCustomer = function(event, cb) {
  var description = event.name + " " + event.email;
  stripe.customers.create({
    description: description,
    source: event.Token,
  }, function(err, customer) {
    ddb.putItem({
      "TableName": process.env.STRIPE_CASHIER_DDB_CUSTOMERS_TABLENAME,
      "Item": {
        "IdentityId": event.IdentityId,
        "StripeCustomerId": customer.id
      }
    }, cb);
  });
};