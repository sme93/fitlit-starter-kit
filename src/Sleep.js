if (typeof module !== "undefined") {
  const dayjs = require("dayjs");
  const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
  const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
}

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
    const lastDay = firstDay.add(6, "day");

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
    const lastDay = firstDay.add(6, "day");

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

  getUsersBySleepQualityByWeekStarting(date) {
    const startOfTheWeek = dayjs(date);
    const endOfTheWeek = startOfTheWeek.add(6, "day");
    const sleepsInWeek = this.sleepData.filter(dataItem => {
      const currentIterationDate = dayjs(dataItem.date);
      if (currentIterationDate.isSameOrBefore(endOfTheWeek)
      && currentIterationDate.isSameOrAfter(startOfTheWeek)
      ) {
        return dataItem;
      }
    });

    const reducedSleepers = sleepsInWeek.reduce((acc, item) => {
      if (!acc[item.userID]) {
        acc[item.userID] = {count: 1, sleep: item.sleepQuality};
      } else {
        const newCount = acc[item.userID].count + 1;
        const newSleep = acc[item.userID].sleep + item.sleepQuality;
        acc[item.userID] = {count: newCount, sleep: newSleep};
      }
      return acc;
    }, {});

    const goodSleepers = [];
    for (const sleeper in reducedSleepers) {
      const sleeperCount = reducedSleepers[sleeper].count;
      const sleeperSleep = reducedSleepers[sleeper].sleep;

      if (sleeperSleep / sleeperCount >= 3) {
        goodSleepers.push(parseInt(sleeper));
      }
    }

    return goodSleepers;
  }

  getBestSleepersByDate(date) {
    const sleepByDate = this.sleepData.filter(dataItem => {
      if (dataItem.date === date) {
        return dataItem;
      }
    });

    const sortedSleepers = sleepByDate.sort((a, b) => 
      b.hoursSlept - a.hoursSlept);
    const targetSleepNumber = sortedSleepers[0].hoursSlept;

    const bestSleepers = sortedSleepers.reduce((acc, sleeper) => {
      if (sleeper.hoursSlept === targetSleepNumber) {
        acc.push(sleeper.userID);
      }
      return acc;
    }, []);
    return bestSleepers;
  }
}

if (typeof module !== "undefined") {
  module.exports = Sleep;
}

