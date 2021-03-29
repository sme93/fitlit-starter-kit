const allUsers = new UserRepository(userData);
const user = new User(userData[0]);


const userNameGreeting = document.querySelector('#userGreeting');
const userInformationSection = 
            document.querySelector('#userInformationSection');
const friendSection = document.querySelector('#friendsSection');
const userAveragesSection = document.querySelector('#userAveragesSection')




const greetUser = () => {
  userNameGreeting.innerHTML = `Hi, ${user.getFirstName()}!`;
}

const displayUserInformation = () => {
  const markup = `
    <section class="user-info-card">
      <p><span>Full Name: </span><span>${user.name}</span></p>
      <p><span>Address: </span><span>${user.address}</span></p>
      <p><span>Email: </span><span>${user.email}</span></p>
      <p><span>Stride Length: </span><span>${user.strideLength}</span></p>
      <p><span>Daily Step Goal: </span><span>${user.dailyStepGoal}</span></p>
    </section>`
  userInformationSection.innerHTML = markup;
}

const displayFriends = () => {
    //need function to convert friends.id to actual friend info
  friendSection.innerHTML = `${user.friends}`;
}

const displayAllUserAvgs = () => {
userAveragesSection.innerText = `All User Average:${allUsers.calculateAvgStepGoal()}`;
}

window.addEventListener('load', greetUser);
window.addEventListener('load', displayUserInformation);
window.addEventListener('load', displayFriends);
window.addEventListener('load', displayAllUserAvgs);