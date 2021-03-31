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
        "date": "2019/06/14",
        "numOunces": 30
      },
      {
        "userID": 1,
        "date": "2019/05/10",
        "numOunces": 40
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

  it('should take in a user ID', () => {
    expect(hydration.id).to.equal(1);
  });

  it('should hold hydration data', () => {
    const userData = hydrationData.filter(data => data.userID === 1);
    expect(hydration.hydrationData).to.deep.equal(userData);
  });

  it('should calculate average daily ounces consumed for a user, for all time', () => {
    const allTime = hydration.calculateAllTimeAvg();
    expect(allTime).to.equal(30)
  });

  it('should return ounces consumed for a user, for a specific day', () => {
    const ouncesConsumed = hydration.returnOuncesByDate('2019/06/15');
    expect(ouncesConsumed).to.equal(20);
  });

  it('should return ounces consumed per day, over a week', () => {
    const hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 20
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numOunces": 25
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numOunces": 30
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numOunces": 40
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numOunces": 45
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numOunces": 50
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numOunces": 55
      }
    ];
    const hydration1 = new Hydration(1, hydrationData);
      const weeklyOunces = hydration1.findWeeklyFluidIntake('2019/06/15');
      expect(weeklyOunces).to.equal({
        '2019/06/15': 20,
        '2019/06/16': 25,
        '2019/06/17': 30,
        '2019/06/18': 40,
        '2019/06/19': 45,
        '2019/06/20': 50,
        '2019/06/21': 55
      });
  });
})