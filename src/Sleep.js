class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  __getUserDataById(userID) {
    return this.sleepData.filter(dataItem => {
      if (userID === dataItem.userID) {
        return dataItem;
      }
    });
  }

  __getUserDataByDate(userID, date) {
    return this.sleepData.find(dataItem => {
      if (userID === dataItem.userID && date === dataItem.date) {
        return dataItem;
      }
    });
  }

  getAvgDailySleepByUserId(userID) {
    const sleepDataByUserId = this.__getUserDataById(userID);
    const totalSleeps = sleepDataByUserId.length;

    // this is my example for eevery sum ever
    const totalSleepAmt = sleepDataByUserId.reduce((acc, item) => {
      return acc + item.hoursSlept;
    }, 0)
    return totalSleepAmt / totalSleeps;
  }

  getAvgAllTimeSleepQualityByUserId(userID) {
    const sleepDataByUserId = this.__getUserDataById(userID);
    const totalSleeps = sleepDataByUserId.length;

    const totalSleepQualityAmt = sleepDataByUserId.reduce((acc, item) => {
      return acc + item.sleepQuality;
    }, 0)
    return totalSleepQualityAmt / totalSleeps;
  }
  
  getHoursSleptForUserByDate(userID, date) {
    const sleepByDate = this.__getUserDataByDate(userID, date);
    return sleepByDate.hoursSlept;
  }

  getSleepQualityForUserByDate(userID, date) {
    const sleepByDate = this.__getUserDataByDate(userID, date);
    return sleepByDate.sleepQuality;
  }

  getDailyAvgSleptByWeekStarting(userID, date) {
    const sleepDataByUserId = this.__getUserDataById(userID);
    //to be continued...
  }

}
if (typeof module !== 'undefined') {
  module.exports = Sleep;
}