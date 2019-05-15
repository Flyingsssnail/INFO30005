var app = require('../controller/controller')
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

describe('#testing the createUser() function', function() {

    context('test without arguments', function() {
        it('createUser() should throw error', function() {
          expect(function() {
               app.createUser()
          }).to.throw()
        })
    });
});