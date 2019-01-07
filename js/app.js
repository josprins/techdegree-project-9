// Variables

const icon = document.querySelector('.bell-lt');
const bell = icon.parentNode;
const alertList = document.querySelector('.alrt-list');
const messageForm = document.querySelector('.msg-frm');
const searchUser = document.getElementById('srch-usr');
const results = document.getElementById('autocomplete-results');
const users = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];
let matches = [];
let resultsCursor = 0;

// Add (e)listener to Bell
bell.addEventListener('click', () => {
  // If bell hasnt been clicked..
  if(icon.style.display !== 'none'){
  // When Bell is clicked..
  icon.style.display = 'none';
  // Call notify(arr) function
  notify("I'm really happy this works!");
  notify("How 'bout d'em apples?");
 }
});


alertList.addEventListener('click', (e) => {
  let target = e.target;
  let li = target.parentNode;
  let ul = target.parentNode.parentNode;
  ul.removeChild(li);

});

// Create new alert notifications and to alert list
function notify(arr){
    let li = document.createElement('li');
    li.className = 'alrt-bx';
    // Avoid the use of innerHTML unless from a safe source or properly escaped
    li.innerHTML = '<span class="alrt">' + 'Alert' + '</span>' + '<span class="alrt-txt">' + arr + '</span>' + '<span class="chx">' + 'X' + '</span>';
    alertList.appendChild(li);
};


// Message SUBMIT and SEND

function submitReset(){
  let user = document.querySelector('.srch-usr');
  let msg = document.querySelector('.msg-area');
  // If input or textarea are empty
  if( user.value.length == 0 || msg.value.length == 0 ) {
    alert('Please enter a User and Message before submitting.')
  }
   else {
        alert("You're message has been sent.")
        messageForm.reset();
  }
};
// When message form is submitted prevent default and call submitReset()
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitReset();
});

// Search User autocomplete
// Prevent autocomplete selection from submitting Form
searchUser.addEventListener('keydown', function (e) {
  if(event.keyCode == '13') {
    event.preventDefault();
  }
});

searchUser.addEventListener('keyup', function (e)  {

results.innerHTML = '';
toggleResults('hide');

if( this.value.length > 0 ) {
   matches = getMatches( this.value );

  if( matches.length > 0 ) {
    displayMatches( matches );
    }
  }

  if(results.classList.contains('visible')) {
    switch( event.keyCode) {
      case 13:
        searchUser.value = results.children[resultsCursor].innerHTML;
        toggleResults('hide');
        resultsCursor = 0;
        break;
      case 38:
        if (resultsCursor > 0) {
          resultsCursor--;

          moveCursor(resultsCursor);
        }
        break;
      case 40:
        if (resultsCursor < (matches.length - 1)) {
          resultsCursor++;

          moveCursor(resultsCursor);
        }
        break;
    }
  }

});

// Define a function for togglingthe results list
function toggleResults(action) {
  if( action == 'show') {
    results.classList.add('visible');
  }
  else if( action == 'hide') {
    results.classList.remove('visible');
  }
}

// Define a function to check if input value matches any user names
function getMatches(inputText) {
  var matchList = [];

  for( let i = 0; i < users.length; i++ ) {
    if(users[i].toLowerCase().indexOf(inputText.toLowerCase() ) != -1 ) {
      matchList.push( users[i] );
    }

  }

  return matchList;
}

// Define a function for displaying autocomplete results
function displayMatches(matchList) {
  let j = 0;

  while( j < matchList.length ) {
    results.innerHTML += '<li class="results">' + matchList[j] + '</li>' ;
    j++;
  }
  // The first child gets a class of 'highlighted'
  moveCursor(resultsCursor);

  // Show the results
  toggleResults('show');
}

// Defines a function for moving the cursor in the results list
function moveCursor(pos) {
  for(let i = 0; i < results.children.length; i++) {
    results.children[i].classList.remove('highlighted');
  }
  results.children[pos].classList.add('highlighted');
}

// Save settings to localStorage

if (window.localStorage) {
  let email = document.getElementById('email-checkbox');
  let profile = document.getElementById('profile-checkbox');
  let timezone = document.getElementById('timezone');

  const save = document.getElementById('save');
  const cancel = document.getElementById('cancel');

  // Get localStorage values

  email.checked = localStorage.getItem(email.value) === 'true' ? true:false;
  profile.checked = localStorage.getItem(profile.value) === 'true' ? true:false;
  timezone.value = localStorage.getItem('timezone');


  // Define Event for saving settings to localStorage

  save.addEventListener('click', function (e) {
    event.preventDefault();
    localStorage.setItem(email.value , email.checked);
    localStorage.setItem(profile.value, profile.checked);
    localStorage.setItem('timezone', timezone.value);

    // Alert User of saved Changes
    window.alert("Your changes have been saved");
  });
}
