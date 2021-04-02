const dayjs = require("dayjs");
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore);
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter);


class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
    const devinsBday = dayjs("9/21/78")
    const thisMomentRightNow = dayjs()
    const sarahsBday = dayjs("12/14/78")
    const sevenDaysFromNow = dayjs("4/1/21").add(7, 'day');
    //console.log(devinsBday.isAfter(sarahsBday));
    //console.log(devinsBday.isBefore(thisMomentRightNow));
    //console.log(sevenDaysFromNow.isAfter(thisMomentRightNow));
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
    }, 0);
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
    const firstDay = dayjs(date);
    const lastDay = firstDay.add(7, 'day');

    const daysInAWeek = sleepDataByUserId.filter(dataItem => {
      const currentIterationDate = dayjs(dataItem.date);
      if (
        currentIterationDate.isSameOrBefore(lastDay) 
        && currentIterationDate.isSameOrAfter(firstDay)
      ) {
        return dataItem;
      }
    });

    const totalSleepAmt = daysInAWeek.reduce((acc, item) => {
      return acc + item.hoursSlept;
    }, 0);

    return totalSleepAmt / daysInAWeek.length; 
  }

  getDailyAvgSleepQualityByWeekStarting(userID, date) {
    const sleepDataByUserId = this.__getUserDataById(userID);
    const firstDay = dayjs(date);
    const lastDay = firstDay.add(7, 'day');

    const daysInAWeek = sleepDataByUserId.filter(dataItem => {
      const currentIterationDate = dayjs(dataItem.date);
      if (currentIterationDate.isSameOrBefore(lastDay)
      && currentIterationDate.isSameOrAfter(firstDay)
      ) {
        return dataItem;
      }
    });

    const totalSleepQuality = daysInAWeek.reduce((acc, item) => {
      return acc + item.sleepQuality;
    }, 0);

    return totalSleepQuality / daysInAWeek.length;
  }

  getAllUsersAvgSleepQuality() {
    const sleepQualityTotal = this.sleepData.reduce((acc, item) => {
      return acc + item.sleepQuality;
    }, 0);

    return sleepQualityTotal / this.sleepData.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}

