class Activity {
  constructor(user, activityData) {
    this.user = user;
    this.id = user.id;
    this.data = activityData;
  }

  // __getUserDataById(userID) {
  //   return this.activityData.filter(dataItem => dataItem.userID === userID);
  // }

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
}


module.exports = Activity;