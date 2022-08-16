import brain from "https://jspm.dev/brain.js";
import { bench, run } from "https://jspm.dev/mitata";

bench("Basic Neural Network", () => {
  // provide optional config object (or undefined). Defaults shown.
  const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  };

  // create a simple feed forward neural network with backpropagation

  const net = new brain.NeuralNetwork(config);

  net.train([
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] },
  ]);

  const output = net.run([1, 0]); // [0.987]
});

(async () => {
  await run({
    avg: true, // enable/disable avg column (default: true)
    json: false, // enable/disable json output (default: false)
    colors: true, // enable/disable colors (default: true)
    min_max: true, // enable/disable min/max column (default: true)
    collect: false, // enable/disable collecting returned values into an array during the benchmark (default: false)
    percentiles: false, // enable/disable percentiles column (default: true)
  });
})();
