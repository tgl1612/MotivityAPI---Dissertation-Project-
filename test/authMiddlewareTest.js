const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const authMiddleware = require('../middleware/isAuth');


//unit tests on isAuth middleware

describe('Auth Middleware Tests', function(){
    //to check if error is thrown when no authorization header is present
    it('should throw an error if no authorization header is present', function(){
        const req = {
            get: function(){
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () =>{})).to.throw('Not authenticated.');
    })

    //to check if error is thrown if the authorization is only one string 
    it('should throw an error if the authorization is only one string', function(){
        const req = {
            get: function(){
                return 'abc';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () =>{})).to.throw();
    })
    //to check if error is thrown if token cannot be verified
    it('Should throw an error if the token cannot be verified', function(){
        const req = {
            get: function(){
                return 'Bearer abc';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () =>{})).to.throw();
    })
    //to check if userId is provided after decoding the token 
    it('Should provide a userId after decoding the token', function(){
        const req = {
            get: function(){
                return 'Bearer abc';
            }
        };
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({userId: 'TestUser1'});
        authMiddleware(req, {}, ()=>{})
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'TestUser1');
        jwt.verify.restore();
    })
})
