class Activity {
  constructor(user, activityData) {
    this.user = user;
    this.id = user.id;
    this.data = activityData;
  }

  __getUserDataById(user) {
    return this.data.filter(dataItem => dataItem.userID === user.id);
  }

  __getUserDataByDate(user, date) {
    return this.data.find(dataItem => dataItem.userID === user.id && dataItem.date === date);  
  }

  calculateMilesWalked(user, date) {
    const dataByDate = this.__getUserDataByDate(user, date);
    const milesWalked = Math.floor((dataByDate.numSteps * user.strideLength) / 5280);
    return milesWalked;
  }

  calculateMinutesActive(user, date) {
    const dataByDate = this.__getUserDataByDate(user, date);
    return dataByDate.minutesActive;
  }

  calculateAvgMinutesActiveForWeek(user, startDate) {
    const dataByID = this.__getUserDataById(user);
    const dates = dataByID.map(dataItem => dataItem.date);
    const startPoint = dates.indexOf(startDate);
    const weeklyActiveMins = dataByID.slice(startPoint, startPoint + 7);
    const weeklyAvg = weeklyActiveMins.reduce((avg, day) => {
      avg += day.minutesActive / 7;
      return avg;
    }, 0);
    return Math.floor(weeklyAvg);
  }

  determineStepsAchieved(user, date) {
    const dataByDate = this.__getUserDataByDate(user, date);
 console.log("dataByDate ", dataByDate);
 console.log(user);
    if (dataByDate.numSteps >= user.dailyStepGoal) {
      return `Congrats! You accomplished your step goal of ${user.dailyStepGoal} steps for today!`
    }
  }

  displayExceededStepGoal(user) {
    const userDataByID = this.__getUserDataById(user);
    const datesExceeded = userDataByID.filter(dataItem => dataItem.numSteps > user.dailyStepGoal);
    const reducedDatesExceeded = datesExceeded.reduce((dateObj, dataItem) => {
      dateObj[dataItem.date] = dataItem.numSteps;
      return dateObj;
    }, {});
    return reducedDatesExceeded;
  }

  findStairRecord(user) {
    const userDataByID = this.__getUserDataById(user);
    const sortByStairs = userDataByID.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    });
    return sortByStairs[0].flightsOfStairs;
  }

  calculateAllUserStairAvg(date) {
    const dataByDate = this.data.filter(dataItem => dataItem.date === date);
    const stairsClimbed = dataByDate.map(dataItem => dataItem.flightsOfStairs);
    const avgStairs = stairsClimbed.reduce((avg, stairs) => {
      avg += stairs / stairsClimbed.length;
      return avg;
    }, 0)
    return Math.floor(avgStairs);
  }

  calculateAllUserStepAvg(date) {
    const dataByDate = this.data.filter(dataItem => dataItem.date === date);
    const stepsTaken = dataByDate.map(dataItem => dataItem.numSteps);
    const avgSteps = stepsTaken.reduce((avg, steps) => {
      avg += steps / stepsTaken.length;
      return avg;
    }, 0);
    return Math.floor(avgSteps);
  }

  calculateAllUserActivityAvg(date) {
    const dataByDate = this.data.filter(dataItem => dataItem.date === date);
    const activity = dataByDate.map(dataItem => dataItem.minutesActive);
    const avgActivity = activity.reduce((avg, minutes) => {
      avg += minutes / activity.length;
      return avg;
    }, 0);
    return Math.floor(avgActivity);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}