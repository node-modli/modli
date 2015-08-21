import chai from 'chai'
import sinon from 'sinon'
import schai from 'sinon-chai'
global.request = require('supertest')
global.assert = require('assert')
global.should = require('should')
global.sinon = sinon
global.expect = chai.expect
chai.use(schai)

// Ensure local dynamo is set
if (!process.env.DYNAMODB_LOCAL) {
  console.log('Need to set ENV: DYNAMODB_LOCAL');
  process.exit(1);
}