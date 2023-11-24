// tests/index.test.js

const { createVoiceRecognition } = require('../src');

describe('createVoiceRecognition', () => {
  let voiceRecognition;

  beforeEach(() => {
    voiceRecognition = createVoiceRecognition();
  });

  afterEach(() => {
    // Cleanup or reset any necessary state
  });

  test('should set and execute a command', () => {
    // Arrange
    const mockCommand = jest.fn();
    voiceRecognition.setCommand('test', mockCommand);

    // Act
    voiceRecognition.startListeningWithTimeout(100);
    voiceRecognition.setConfidenceThreshold(0.7);

    const event = {
      results: [
        {
          0: {
            transcript: 'test',
            confidence: 0.8,
          },
        },
      ],
    };
    voiceRecognition.onresult(event);

    // Assert
    expect(mockCommand).toHaveBeenCalled();
  });

  // Add more test cases for other functions

  test('should handle unrecognized command gracefully', () => {
    // Arrange
    const mockCommand = jest.fn();
    voiceRecognition.setCommand('recognized', mockCommand);

    // Act
    const event = {
      results: [
        {
          0: {
            transcript: 'unrecognized',
          },
        },
      ],
    };
    voiceRecognition.onresult(event);

    // Assert
    expect(mockCommand).not.toHaveBeenCalled();
  });
});
