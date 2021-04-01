class Hydration {
  constructor(id, hydrationData) {
    this.id = id;
    this.hydrationData = hydrationData.filter(data => data.userID === this.id);
  };
  
  calculateAllTimeAvg() {
    const ouncesData = this.hydrationData.map(data => data.numOunces);
    const totalOunces = ouncesData.reduce((totalOz, oz) => {
      totalOz += oz;
      return totalOz;
    }, 0);
    return totalOunces / ouncesData.length;
  };

  returnOuncesByDate(date) {
    const foundData = this.hydrationData.filter(data => data.date === date);
    let [result] = foundData;
    return result.numOunces;
  };

  findDailyFluidIntakeForWeek(startDate) {
    const dates = this.hydrationData.map(data => data.date);
    const startPoint = dates.indexOf(startDate); 
    const weeklyOunces = this.hydrationData.slice(startPoint, startPoint + 7);
    return weeklyOunces;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Hydration;
}