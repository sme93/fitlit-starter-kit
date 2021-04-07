const chai = require("chai");
const expect = chai.expect;

const User = require("../src/User");

describe("User", () => {
  let defaultUser;
  beforeEach(() => {
    defaultUser = {
      id: 3,
      name: "Al Green",
      address: "85823 Bosco Fork, East Oscarstad MI 85126",
      email: "AGreen@yahoo.com",
      strideLength: 4.2,
      dailyStepGoal: 8000,
      friends: [2, 5, 23]
    } 
  });
    
  it("should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("should be an instance of a User", () => {
    const user = new User(defaultUser);

    expect(user).to.be.an.instanceof(User);
  });

  it("should have an id", () => {
    const user = new User({ ...defaultUser, id: 21});

    expect(user.id).to.equal(21);
  });

  it("should have a name", () => {
    const user = new User({ ...defaultUser, name: "Marvin Gaye"});

    expect(user.name).to.equal("Marvin Gaye");
  });

  it("should have an address", () => {
    const user = new User({ 
      ...defaultUser, 
      address: "805 Parkridge Dr, Media, PA 19063"
    });

    expect(user.address).to.equal("805 Parkridge Dr, Media, PA 19063");
  });

  it("should have an email address", () => {
    const user = new User({ ...defaultUser, email: "MGaye@hotmail.com"});

    expect(user.email).to.equal("MGaye@hotmail.com");
  });

  it("should have a stridelength", () => {
    const user = new User({ ...defaultUser, strideLength: 3.8});

    expect(user.strideLength).to.equal(3.8);
  });

  it("should have a daily step goal", () => {
    const user = new User({ ...defaultUser, dailyStepGoal: 10000});

    expect(user.dailyStepGoal).to.equal(10000);
  });

  it("should have friends", () => {
    const user = new User({ ...defaultUser, friends: [3, 21]});

    expect(user.friends).to.deep.equal([3, 21]);
  });

  it("should return a user/s first name only", () => {
    const user = new User({ ...defaultUser, name: "Marvin Gaye"});

    
    const firstName = user.getFirstName();
    expect(firstName).to.equal("Marvin");
  });
});