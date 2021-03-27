const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');

describe('UserRepository', () => {

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    const userRepo = new UserRepository();

    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });
})