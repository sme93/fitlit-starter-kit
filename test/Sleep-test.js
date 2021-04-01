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

    it('should calculate their average sleep quality per day over all time',
      () => {
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

    it('should return how many hours slept for a specific day', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          date: "2019/06/15",
          hoursSlept: 5,
        },
        {
          userID: 2,
          date: "2019/06/15",
          hoursSlept: 8,
        },
        {
          userID: 1,
          date: "2019/06/16",
          hoursSlept: 10,
        },
      ]);

      expect(sleep.getHoursSleptForUserByDate(1, "2019/06/16")).to.equal(10);
    });

    it('should return their sleep quality for a specific day', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          date: "2019/06/15",
          sleepQuality: 5,
        },
        {
          userID: 2,
          date: "2019/06/15",
          sleepQuality: 8,
        },
        {
          userID: 1,
          date: "2019/06/16",
          sleepQuality: 10,
        },
      ]);

      expect(sleep.getSleepQualityForUserByDate(1, "2019/06/16")).to.equal(10);
    });

    it.skip('should calculate how many hours slept per day over a week', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          date: "2019/06/15",
          hoursSlept: 5,
        },
        {
          userID: 2,
          date: "2019/06/15",
          hoursSlept: 8,
        },
        {
          userID: 1,
          date: "2019/06/16",
          hoursSlept: 10,
        },
        {
          userID: 1,
          date: "2019/06/17",
          hoursSlept: 7.5,
        },
        {
          userID: 1,
          date: "2019/06/21",
          hoursSlept: 7.5,
        },
        {
          userID: 1,
          date: "2019/06/23",
          hoursSlept: 100,
        },
      ]);

      expect(
        sleep.getDailyAvgSleptByWeekStarting(1, "2019/06/15")
      ).to.equal(7.5);
    });

    it.skip('should calculate the average sleep quality per day over a week', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          date: "2019/06/15",
          sleepQuality: 5,
        },
        {
          userID: 2,
          date: "2019/06/15",
          sleepQuality: 8,
        },
        {
          userID: 1,
          date: "2019/06/16",
          sleepQuality: 10,
        },
        {
          userID: 1,
          date: "2019/06/17",
          sleepQuality: 7.5,
        },
        {
          userID: 1,
          date: "2019/06/21",
          sleepQuality: 7.5,
        },
        {
          userID: 1,
          date: "2019/06/23",
          sleepQuality: 100,
        },
      ]);

      expect(
        sleep.getDailyAvgSleepQualityByWeekStarting(1, "2019/06/15")
      ).to.equal(7.5);
    });
  }); 
  describe('for all users', () => {

    it.skip('returns average sleep quality', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          sleepQuality: 5,
        },
        {
          userID: 2,
          sleepQuality: 7.5,
        },
        {
          userID: 3,
          sleepQuality: 10,
        },
      ]);

      expect(sleep.getAvgSleepQuality()).to.equal(7.5);
    });

    it.skip('returns all users with good sleep quality (over 3)', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          date: "2019/06/15",
          sleepQuality: 5,
        },
        {
          userID: 2,
          date: "2019/06/15",
          sleepQuality: 8,
        },
        {
          userID: 3,
          date: "2019/06/16",
          sleepQuality: 2,
        },
        {
          userID: 1,
          date: "2019/06/17",
          sleepQuality: 7.5,
        },
        {
          userID: 2,
          date: "2019/06/21",
          sleepQuality: 7.5,
        },
        {
          userID: 4,
          date: "2019/06/22",
          sleepQuality: 7.5,
        },
      ]);

      expect(
        sleep.getUsersBySleepQualityByWeekStarting("2019/06/15")
      ).to.deep.equal([1, 2]);
    });

    it.skip('returns the best sleeper(s) by date', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          date: "2019/06/15",
          hoursSlept: 5,
        },
        {
          userID: 2,
          date: "2019/06/15",
          hoursSlept: 8,
        },
      ]);
      expect(sleep.getBestSleepersByDate("2019/06/15").to.deep.equal([2]));
    });

    it.skip('returns the best sleeper(s) by date', () => {
      const sleep = new Sleep([
        {
          userID: 1,
          date: "2019/06/15",
          hoursSlept: 5,
        },
        {
          userID: 2,
          date: "2019/06/15",
          hoursSlept: 8,
        },
        {
          userID: 3,
          date: "2019/06/15",
          hoursSlept: 8,
        },
      ]);
      expect(sleep.getBestSleepersByDate("2019/06/15").to.deep.equal([2, 3]));
    });
  });
});