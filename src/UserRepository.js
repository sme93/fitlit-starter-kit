class UserRepository {
  constructor(users) {
    this.userData = users;
  }
  findUserData(id) {
    const foundUser = this.userData.find(user => user.id === id);
    return foundUser;
  }
  calculateAvgStepGoal() {
    const userAverage = this.userData.reduce((averageGoal, user) => {
      averageGoal += user.dailyStepGoal / this.userData.length;
      return averageGoal;
    }, 0);
    return userAverage;
  }
}

if (typeof module !== "undefined") {
  module.exports = UserRepository;
}