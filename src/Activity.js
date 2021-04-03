class Activity {
  constructor(user, activityData) {
    this.user = user;
    this.id = user.id;
    this.data = activityData;
  }

  calculateMilesWalked(user, date) {
    const dateWalked = this.data.find(data => data.date === date);
    return (dateWalked.numSteps * user.strideLength) / 5280;
  }
}


module.exports = Activity;