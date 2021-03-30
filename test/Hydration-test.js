const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');

describe('Hydration', () => {
  let hydration, hydrationData;

  beforeEach(() => {
    hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 20
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 25
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numOunces": 30
      }
    ];

    hydration = new Hydration(1, hydrationData);
  });
  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it('should take in a user ID and hydration data', () => {
    expect(hydration.id).to.equal(1);
    expect(hydration.hydrationData).to.equal(hydrationData);
  });
})