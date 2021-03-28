const chai = require('chai');
const User = require('../src/User');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');

describe('UserRepository', () => {
  let userRepo;
  let user;

  beforeEach(() => {
    userRepo = new UserRepository();
    user = new User(1, 'Michann Stoner', '1234 House Ln, Denver CO 80211-1234, michann.stoner@gmail.com', 4.1, 100, [2, 10, 20])
  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {

    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it('should hold user data', () => {
    const userRepo1 = new UserRepository(user);

    expect(userRepo1).to.equal(user);
  });
})