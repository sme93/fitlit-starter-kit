const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep');

describe('Sleep', () => {

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', () => {
    const sleep = new Sleep([{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 10.8,
      "sleepQuality": 4.7
    }]);

    expect(sleep).to.be.an.instanceof(Sleep);
  });

  it('should store sleepData', () => {
    const sleep = new Sleep([{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 10.8,
      "sleepQuality": 4.7
    }]);
    
    expect(sleep.sleepData.length).to.equal(3);
  });

  describe('for a user', () => {

    it('should calculate the average number of hours slept per day', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          hoursSlept: 5,
        },
        {
          userID: 2,
          hoursSlept: 8,
        },
        {
          userID: 1,
          hoursSlept: 10,
        },
      ]);
      
      expect(sleep.getAvgDailySleepByUserId(1)).to.equal(7.5);
    });

    it('should calculate their average sleep quality per day over all time', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          sleepQuality: 5,
        },
        {
          userID: 2,
          sleepQuality: 8,
        },
        {
          userID: 1,
          sleepQuality: 10,
        },
      ]);

      expect(sleep.getAvgAllTimeSleepQualityByUserId(1)).to.equal(7.5);
    });

  }); 
});