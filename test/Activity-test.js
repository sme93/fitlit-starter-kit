const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity');

describe('Activity', () => {
  let user;
  let activityData;

  beforeEach(() => {
    user = {
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [
        19,
        11,
        42,
        33
      ]
    };

    activityData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 3,
        "date": "2019/06/16",
        "numSteps": 4000,
        "minutesActive": 116,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/17",
        "numSteps": 2000,
        "minutesActive": 116,
        "flightsOfStairs": 45
      },
      {
        "userID": 3,
        "date": "2019/06/18",
        "numSteps": 8000,
        "minutesActive": 150,
        "flightsOfStairs": 60
      },
      {
        "userID": 3,
        "date": "2019/06/19",
        "numSteps": 4000,
        "minutesActive": 30,
        "flightsOfStairs": 37
      },
      {
        "userID": 3,
        "date": "2019/06/20",
        "numSteps": 1000,
        "minutesActive": 300,
        "flightsOfStairs": 15
      },
      {
        "userID": 3,
        "date": "2019/06/21",
        "numSteps": 3000,
        "minutesActive": 45,
        "flightsOfStairs": 26
      },
    ];

    activity = new Activity(user, activityData);
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it('should hold activity data', ()=> {
    expect(activity.data).to.equal(activityData);
  });

  it('should take in a user', () => {
    expect(activity.user).to.deep.equal(user);
  });

  it('should have an ID', () => {
    expect(activity.id).to.equal(3);
  });

  it('should calculate miles walked', () => {
    const milesWalked = activity.calculateMilesWalked(user, '2019/06/15');

    expect(milesWalked).to.equal(6);
  });

  it('should return minutes a user was active on a given day', () => {
    const minutesActive = activity.calculateMinutesActive(user, '2019/06/15');

    expect(minutesActive).to.equal(116);
  });

  it('should return average minutes active for a given week', () => {
    const weeklyAvg = activity.calculateAvgMinutesActiveForWeek(user, '2019/06/15');

    expect(weeklyAvg).to.equal(124);
  });

  it('should determine whether a user reached their step goal for a given day', () => {
    const accomplishedGoal = activity.determineStepsAchieved(user, '2019/06/15');

    expect(accomplishedGoal).to.deep.equal('Congrats! You accomplished your step goal of 5000 steps for today!');
  });

  it('should find the days where a user exceeded their step goal', () => {
    const exceededGoal = activity.displayExceededStepGoal(user, activityData);

    expect(exceededGoal).to.deep.equal({
      '2019/06/15': 7402,
      '2019/06/18': 8000,
    })
  });

  it('should find a user\'s all time stair climbing record', () => {
    const stairRecord = activity.findStairRecord(user, activityData);

    expect(stairRecord).to.equal(60);
  });

  it('should find the average stairs climbed for all users, for a given day', () => {
    const averageStairs = activity.calculateAllUserStairAvg('2019/06/15');

    expect(averageStairs).to.equal(19);
  });

  it('should find the average steps taken for all users, for a given day', () => {
    const averageSteps = activity.calculateAllUserStepAvg('2019/06/15');

    expect(averageSteps).to.equal(5091);
  });

  it('should calculate average minutes active for all users, for a given day', () => {
    const averageActivity = activity.calculateAllUserActivityAvg('2019/06/15');

    expect(averageActivity).to.equal(131);
  });
})
