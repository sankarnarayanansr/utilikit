// CustomWorkerEnvironment.js
const JSDOMEnvironment = require('jest-environment-jsdom').TestEnvironment;

class CustomWorkerEnvironment extends JSDOMEnvironment {
  async setup() {
    await super.setup();
    // Create a global property to capture our worker code.
    this.global.__WORKER_CODE__ = '';

    // Override URL.createObjectURL to capture the blob’s text.
    this.global.URL.createObjectURL = (blob) => {
      if (blob._text) {
        this.global.__WORKER_CODE__ = blob._text;
      }
      // Return a dummy URL.
      return 'blob:test';
    };

    // Minimal implementation for URL.revokeObjectURL.
    this.global.URL.revokeObjectURL = () => {};

    // Override Worker to simulate a real worker by evaluating the captured code.
    this.global.Worker = class {
      constructor(scriptURL) {
        this.scriptURL = scriptURL;
        this.onmessage = null;
        // Retrieve the worker code captured by createObjectURL.
        this._workerCode = this.global.__WORKER_CODE__ || '';
      }
      postMessage(message) {
        const simulatedSelf = {};
        try {
          // Evaluate the worker code in the context of simulated self.
          const fn = new Function('self', this._workerCode);
          fn(simulatedSelf);
          if (typeof simulatedSelf.onmessage === 'function') {
            const event = { data: message };
            simulatedSelf.onmessage(event);
          }
        } catch (error) {
          console.error('Worker simulation error:', error);
        }
      }
      terminate() {
        // No cleanup needed for simulation.
      }
    };
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = CustomWorkerEnvironment;
