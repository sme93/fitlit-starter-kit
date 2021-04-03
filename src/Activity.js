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
  };

  calculateMinutesActive(user, date) {
    const dataByDate = this.__getUserDataByDate(user, date);
    return dataByDate.minutesActive;
  };

  calculateAverageMinutesActiveForWeek() {

  };

  determineStepsAchieved(user, date) {
    const dataByDate = this.__getUserDataByDate(user, date);
    if (dataByDate.numSteps >= user.dailyStepGoal) {
      return `Congrats! You accomplished your step goal of ${user.dailyStepGoal} steps for today!`
    }
  };

  displayExceededStepGoal(user, activityData) {
    const userDataByID = this.__getUserDataById(user);
    const datesExceeded = userDataByID.filter(dataItem => dataItem.numSteps > user.dailyStepGoal);
    const reducedDatesExceeded = datesExceeded.reduce((dateObj, dataItem) => {
      dateObj[dataItem.date] = dataItem.numSteps;
      return dateObj;
    }, {});
    return reducedDatesExceeded;
  }
}


module.exports = Activity;