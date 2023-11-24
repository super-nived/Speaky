# Speaky

Speaky is a professional voice recognition package designed to empower your applications with seamless voice command integration. Easily create functions that respond to specific voice commands, making user interactions more natural and intuitive.

## Installation

You can install Speaky using npm:

```
npm install speaky

```

## Usage


```
// Import the Speaky module
const createVoiceRecognition = require('speaky');

or 

// Import the Speaky in ES6 
import createVoiceRecognition from 'speaky';

// Create a voice recognition instance
const voiceRecognition = createVoiceRecognition();

// 1. Set a command
voiceRecognition.setCommand('play music', () => {
  console.log('Playing music...');
  // Add your code to play music here
});

// 2. Start listening with a timeout
voiceRecognition.startListeningWithTimeout(10000); // Listen for 10 seconds

// 3. Set a confidence threshold
voiceRecognition.setConfidenceThreshold(0.7); // Set confidence threshold to 70%

// 4. Add an alias
voiceRecognition.addAlias('start music', 'play music');

// 5. Handle recognition start
voiceRecognition.onRecognitionStart(() => {
  console.log('Recognition started...');
});

// 6. Handle recognition end
voiceRecognition.onRecognitionEnd(() => {
  console.log('Recognition ended...');
});

// 7. Handle recognition error
voiceRecognition.onRecognitionError((error) => {
  console.error('Recognition error:', error);
});

// 8. Set language
voiceRecognition.setLanguage('en-US');

// 9. Enable continuous listening
voiceRecognition.enableContinuousListening();

// 10. Disable continuous listening
voiceRecognition.disableContinuousListening();

// 11. Set feedback callback
voiceRecognition.setFeedbackCallback(() => {
  console.log('Audio feedback started or ended...');
});

// 12. Stop listening
voiceRecognition.stopListening();

// 13. Get command history
const history = voiceRecognition.getCommandHistory();
console.log('Command history:', history);


```

## License

This package is distributed under the MIT License. See the LICENSE file for more details.


## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.


## Credits

This package was created by Super Nived.

## Support

For questions or support, you can reach out to  nivedchandran7@gmail.com

