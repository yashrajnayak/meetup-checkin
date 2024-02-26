async function fetchFollowings() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert('Please enter a valid GitHub username.');
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/following`);
    const data = await response.json();
    const followingsList = data.map(following => following.login).join(',');
    const googleFormsURL = `https://docs.google.com/forms/d/e/1FAIpQLSduOWOnzB-JlTKt9loP8RL3qCzFqbSTpV7q5eFkTgYEqSuqRA/viewform?usp=pp_url&entry.74991674=${username}&entry.2080764552=${followingsList}`;
    window.open(googleFormsURL, '_blank');
  } catch (error) {
    alert('Error fetching data from GitHub API. Please try again later.');
    console.error(error);
  }
}
