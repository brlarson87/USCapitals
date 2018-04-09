var answers = [
  'montgomery',
  'juneau',
  'phoenix',
  'little rock',
  'sacramento',
  'denver',
  'hartford',
  'dover',
  'tallahassee',
  'atlanta',
  'honolulu',
  'Boise',
  'springfield',
  'indianapolis',
  'des moines',
  'topeka',
  'frankfort',
  'baton rouge',
  'augusta',
  'annapolis',
  'boston',
  'lansing',
  'st paul',
  'jackson',
  'jefferson city',
  'helena',
  'lincoln',
  'carson city',
  'concord',
  'trenton',
  'santa fe',
  'albany',
  'raleigh',
  'bismark',
  'columbus',
  'oklahoma city',
  'salem',
  'harrisburg',
  'providence',
  'columbia',
  'pierre',
  'nashville',
  'austin',
  'salt lake city',
  'montpelier',
  'richmond',
  'olympia',
  'charleston',
  'madison',
  'cheyenne'
];

/////////////// VARS ///////////////////////////////
var startBtn = document.getElementById('btn-start');
var endBtn = document.getElementById('btn-end');
var score = document.getElementById('score');
var answerFields = document.querySelectorAll('.answer-field');
var title = document.getElementById('title');
var points = 0;

////////////// EVENTS ////////////////////////////
startBtn.addEventListener('click', startQuiz);
endBtn.addEventListener('click', endQuiz);
document.getElementById('modalBtn').addEventListener('click', refresh);
document.getElementById('closeModal').addEventListener('click', closeModal);


///////////// LOGIC //////////////////////////////
function startQuiz() {
  startBtn.style.display = 'none';
  endBtn.style.display = 'block';
  score.style.display = 'block';
  score.innerHTML = `${points}/50`;
  title.style.display = 'none';
  for(var i = 0; i < answerFields.length; i++) {
    answerFields[i].index = i;
    answerFields[i].addEventListener('keyup', verifyGuess);

  }
}

function endQuiz() {
  for(var i = 0; i < answerFields.length; i ++) {
     if(answerFields[i].value === "") {
        answerFields[i].value = answers[i].toUpperCase();
    }
  }
  showScoreModal();
}

function verifyGuess(e) {
  if(e.code === "Enter") {
    e.target.value = e.target.value.toUpperCase();
    var guessValue = e.target.value;
    var guessIndex = this.index;
    if(guessValue === answers[guessIndex].toUpperCase()) {
      points++;
      if(points === 50) {
        showScoreModal();
      }
      score.innerHTML = `${points}/50`;
      this.style.background = 'lightgreen';
      this.style.color = 'white';
      this.parentElement.style.boxShadow = '3px 3px 5px lightgreen, -2px -2px 3px lightgreen';
      this.removeEventListener('keyup', verifyGuess);
      this.disabled = true;
    } else {
      this.style.background = 'red';
      this.style.color = 'white';
      this.parentElement.style.boxShadow = '3px 3px 5px red, -2px -2px 3px red';
    }
  }
}

function showScoreModal() {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal-header-info').innerHTML = `Your score is : ${points}`
  if(points >=35) {
    document.getElementById('modal-body-info').innerHTML = 'That is very impressive!'
  } else if(points >=15 && points < 35) {
    document.getElementById('modal-body-info').innerHTML = 'Not bad at all!'
  } else {
    document.getElementById('modal-body-info').innerHTML = 'Maybe you should study more...'
  }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  for(var i = 0; i < answerFields.length; i++) {
    answerFields[i].disabled = true;
  }

}

function refresh() {
  window.location = "index.html";
}
