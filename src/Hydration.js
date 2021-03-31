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
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}