// jest.setup.js

// Polyfill for Web Worker in Jest (using jsdom)
global.Worker = class {
  constructor(scriptURL) {
    this.scriptURL = scriptURL;
    this.onmessage = null;
  }
  postMessage(message) {
    // Simulate asynchronous processing: for testing, assume worker function multiplies by 2.
    setTimeout(() => {
      if (this.onmessage) {
        // Here you can simulate different behavior based on message content if needed.
        const { data, taskId } = message;
        const result = data * 2;
        this.onmessage({ data: { result, taskId } });
      }
    }, 0);
  }
  terminate() {
    // Optionally, you can log or spy on termination here
  }
};

global.URL.createObjectURL = jest.fn().mockReturnValue('blob:test');
global.URL.revokeObjectURL = jest.fn();
