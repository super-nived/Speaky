// createVoiceRecognition.js

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function createVoiceRecognition() {
  const commands = {};
  const commandHistory = [];

  // Timeout
  let timeoutId;

  function setCommand(command, callback) {
    commands[command.toLowerCase()] = callback;
  }

  function executeCommand(command) {
    const normalizedCommand = command.toLowerCase();
    if (commands[normalizedCommand]) {
      commands[normalizedCommand]();
      stopListening();
    } else {
      console.log(`Command not found: ${normalizedCommand}`);
    }
    commandHistory.push(normalizedCommand);
  }

  function stopListening() {
    recognition.stop();
    console.log('Stopped listening.');
  }

  function startListeningWithTimeout(timeoutMillis) {
    recognition.start();
    console.log('Listening...');
    timeoutId = setTimeout(stopListening, timeoutMillis);
  }

  function setConfidenceThreshold(threshold) {
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function (event) {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript.trim().toLowerCase();
      const confidence = event.results[last][0].confidence;
      if (confidence >= threshold) {
        executeCommand(transcript);
      }
    };
  }

  function addAlias(commandAlias, originalCommand) {
    commands[commandAlias.toLowerCase()] = commands[originalCommand.toLowerCase()];
  }

  function onRecognitionStart(callback) {
    recognition.onstart = callback;
  }

  function onRecognitionEnd(callback) {
    recognition.onend = callback;
  }

  function onRecognitionError(callback) {
    recognition.onerror = callback;
  }

  function setLanguage(language) {
    recognition.lang = language;
  }

  function enableContinuousListening() {
    recognition.continuous = true;
  }

  function disableContinuousListening() {
    recognition.continuous = false;
  }

  function setFeedbackCallback(callback) {
    recognition.onaudiostart = callback;
    recognition.onaudioend = callback;
  }

  function getCommandHistory() {
    return commandHistory;
  }

  recognition.onresult = function (event) {
    clearTimeout(timeoutId); // Clear timeout when a result is received
    const last = event.results.length - 1;
    const transcript = event.results[last][0].transcript.trim().toLowerCase();
    console.log(`Spoken words: ${transcript}`);
    executeCommand(transcript);
  };

  return {
    setCommand,
    startListeningWithTimeout,
    setConfidenceThreshold,
    addAlias,
    onRecognitionStart,
    onRecognitionEnd,
    onRecognitionError,
    setLanguage,
    enableContinuousListening,
    disableContinuousListening,
    setFeedbackCallback,
    stopListening,
    getCommandHistory,
  };
}

export default createVoiceRecognition;
