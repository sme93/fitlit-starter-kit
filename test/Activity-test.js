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
      }
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

  it.skip('should calculate miles walked', () => {
    const milesWalked = activity.calculateMilesWalked(user, '2019/06/15');

    expect(milesWalked).to.equal(6);
  });

  it.skip('should return minutes a user was active on a given day', () => {
    const minutesActive = activity.calculateMinutesActive('2019/06/15');

    expect(minutesActive).to.equal(116);
  });
})
