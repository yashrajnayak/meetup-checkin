function checkIn() {
  var username = document.getElementById('username').value.trim();
  if (username === '') {
    alert('Please enter a GitHub username.');
    return;
  }

  // Show loading spinner
  document.getElementById('status').innerHTML = '<div class="spinner"></div>';

  fetch('https://api.github.com/users/' + username)
    .then(response => response.json())
    .then(data => {
      var name = data.name || 'N/A';
      var followers = data.followers;
      var following = data.following;
      return fetch('https://api.github.com/users/' + username + '/following')
        .then(response => response.json())
        .then(followingData => {
          var followingList = followingData.map(user => user.login).join(',');
          var url = 'https://docs.google.com/forms/d/e/1FAIpQLSduOWOnzB-JlTKt9loP8RL3qCzFqbSTpV7q5eFkTgYEqSuqRA/viewform?usp=pp_url&entry.74991674=' + username + '&entry.1992563863=' + name + '&entry.1448618851=' + followers + '&entry.1722898164=' + following + '&entry.2080764552=' + followingList;
          window.open(url, '_blank');
        });
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('status').innerText = 'Error: User not found.';
    });
}
