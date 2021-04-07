const chai = require("chai");
const expect = chai.expect;

const UserRepository = require("../src/UserRepository");

describe("UserRepository", () => {
  let userRepo;
  let users;

  beforeEach(() => {
    users = [
      { 
        "id": 1,
        "name": "David Bowie",
        "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        "email": "d.bowie@gmail.com",
        "strideLength": 4.3,
        "dailyStepGoal": 40000,
        "friends": [
          16,
          4,
          8
        ]
      },
      {
        "id": 2,
        "name": "Billy Joel",
        "address": "30086 Kathryn Port, Ciceroland NE 07273",
        "email": "piano.man@outlook.com",
        "strideLength": 4.5,
        "dailyStepGoal": 5000,
        "friends": [
          9,
          18,
          24,
          19
        ]
      },
      {
        "id": 3,
        "name": "Tina Turner",
        "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
        "email": "itstinaturner@gmail.com",
        "strideLength": 4.4,
        "dailyStepGoal": 15000,
        "friends": [
          19,
          11,
          42,
          33
        ]
      }
    ];
    userRepo = new UserRepository(users);
  });

  it("should be a function", () => {
    expect(UserRepository).to.be.a("function");
  });

  it("should be an instance of UserRepository", () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it("should hold user data", () => { 
    expect(userRepo.userData).to.deep.equal(users);
  });

  it("should return user data when given a user ID", () => {
    const userData1 = userRepo.findUserData(1);
    
    expect(userData1).to.equal(users[0]);
  });

  it("should calculate average step goal amongst all users", () => {
    const avgGoal = userRepo.calculateAvgStepGoal();
    expect(avgGoal).to.equal(20000);
  });
});