try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch (e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var outLocation;
function setOutputLocation(ansId = 'general') {
  outLocation = document.getElementById(ansId);
  outLocation.value = 'nice';
  console.log(`output set: ${ansId}`);
}

/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = false;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function (event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if (!mobileRepeatBug) {
    console.log(transcript);
    outLocation.value = transcript;
  }
};

// recognition.onstart = function() { 
//   instructions.text('Voice recognition activated. Try speaking into the microphone.');
// }

// recognition.onspeechend = function() {
//   instructions.text('You were quiet for a while so voice recognition turned itself off.');
// }

// recognition.onerror = function(event) {
//   if(event.error == 'no-speech') {
//     instructions.text('No speech was detected. Try again.');  
//   };
// }


/*-----------------------------
      Speech Synthesis 
------------------------------*/

async function readOutLoud(qid) {
  const qnId = `qn${qid}`;
  var msg = document.getElementById(qnId).innerHTML;
  var speech = new SpeechSynthesisUtterance();
  console.log(msg);
  // Set the text and voice attributes.
  speech.text = "Please tell Your" + msg + "After the beep ";
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  await setTimeout(function () {
    beep(100, 520, 200);
  }, 3000);

}



function deleteNote(dateTime) {
  localStorage.removeItem('note-' + dateTime);
}

async function recStart(qid) {
  await readOutLoud(qid);
  const ansId = `ans${qid}`;
  console.log(ansId);
  setOutputLocation(ansId);
  recognition.start();
  console.log('rec started');
}

function recStop() {
  recognition.stop();
  console.log('stopped');
}

function clearInput(id) {
  const ansId = `ans${id}`;
  document.getElementById(ansId).value = '';
}
//beep
a = new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

function beep(vol, freq, duration) {
  v = a.createOscillator()
  u = a.createGain()
  v.connect(u)
  v.frequency.value = freq
  v.type = "square"
  u.connect(a.destination)
  u.gain.value = vol * 0.01
  v.start(a.currentTime)
  v.stop(a.currentTime + duration * 0.001)
}


function foo() {
  return confirm("Form Submitted Successfully.! Thank You.")
}