class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getAvgDailySleepByUserId(userID) {
    // this is my example for every filter ever
    const sleepDataByUserId = this.sleepData.filter(dataItem => {
      if (userID === dataItem.userID) {
        return dataItem;
      }
    });
    const totalSleeps = sleepDataByUserId.length;

    // this is my example for eevery sum ever
    const totalSleepAmt = sleepDataByUserId.reduce((acc, item) => {
      return acc + item.hoursSlept;
    }, 0)
    return totalSleepAmt / totalSleeps;
  }

  getAvgAllTimeSleepQualityByUserId(userID) {
    const sleepDataByUserId = this.sleepData.filter(dataItem => {
      if (userID === dataItem.userID) {
        return dataItem;
      }
    });
    const totalSleeps = sleepDataByUserId.length;

    const totalSleepQualityAmt = sleepDataByUserId.reduce((acc, item) => {
      return acc + item.sleepQuality;
    }, 0)
    return totalSleepQualityAmt / totalSleeps;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}