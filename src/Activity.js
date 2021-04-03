class Activity {
  constructor(activityData, user) {
    this.data = activityData;
    this.user = user;
    this.id = user.id;
  }
}


module.exports = Activity;