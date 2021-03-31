class Hydration {
  constructor(id, hydrationData) {
    this.id = id;
    this.hydrationData = hydrationData.filter(data => data.userID === this.id);
  }
  
  returnOuncesByDate(date) {
    const foundData = this.hydrationData.filter(data => data.date === date);
    let [result] = foundData;
    return result.numOunces;
  };
}





module.exports = Hydration;