const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');

describe('User', () => {
    let defaultUser;
    beforeEach(() => {
       defaultUser = {
           id: 3,
           name: "Al Green",
           address: "85823 Bosco Fork, East Oscarstad MI 85126"
    } 
    });
    
  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a User', () => {
    const user = new User(defaultUser);

    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', () => {
      const user = new User({ ...defaultUser, id: 21});

    expect(user.id).to.equal(21);
  });

  it('should have a name', () => {
      const user = new User({ ...defaultUser, name: "Marvin Gaye"});

      expect(user.name).to.equal("Marvin Gaye");
  });

  it('should have an address', () => {
      const user = new User({ ...defaultUser, address: "805 Parkridge Dr, Media, PA 19063"});

      expect(user.address).to.equal("805 Parkridge Dr, Media, PA 19063");
  })
})