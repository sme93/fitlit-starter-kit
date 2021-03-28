const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');

describe('UserRepository', () => {
  let userRepo;
  let user1;
  let user2;
  let user3;

  beforeEach(() => {
    user1 = new User(1, 'Michann Stoner', '1234 House Ln, Denver CO 80211-1234', 'michann.stoner@gmail.com', 4.1, 100, [2, 10, 20]);
    user2 = new User(2, 'Sarah Fitzsimons', '4321 House St, Loveland CO 80246-1234', 'sarah.f@gmail.com', 4.3, 2000, [3, 15, 1]);
    user3 = new User(3, 'John Doe', '5555 Apartment Rd, Denver CO 80211-4321', 'johndoe@outlook.com', 3.2, 1000, [4, 20, 17]);
    userRepo = new UserRepository([user1, user2, user3]);
  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it('should hold user data', () => {
    expect(userRepo.userData).to.deep.equal([user1, user2, user3]);
  });

  it.skip('should return user data when given a user ID', () => {
    const userData1 = userRepo.findUserData(1);
    
    expect(userData1).to.deep.equal(user1);
  });

  it('should calculate average step goal amongst all users', () => {
    const avgGoal = userRepo.calculateAvgStepGoal();
    expect(avgGoal).to.equal(1033);
  });
})