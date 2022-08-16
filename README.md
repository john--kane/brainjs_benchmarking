# Brain.js Runtime Benchmarking

## An attempt at Benchmarking brain.js with BunJS, NodeJS and Deno

I wanted to do a quick benchmark between BunJS and Node for the purposes of ML and AI. We start off with example basic neural networks to train on and see how long each runtime takes to execute.

I am not trying to benchmark the speed at which brain.js performs. It is intended as an empirical review of brain.js with different runtimes.

## TLDR

[https://github.com/john--kane/brainjs_benchmarking](https://github.com/john--kane/brainjs_benchmarking "Github benchmarking Code")

![Deno](<https://deno.land/logo.svg> width=50 height=50)

Basic Neural Network

- **_NodeJS_**: Best 7.65ms - Worst 7.91ms
- **_Deno_**: Best 6.71ms to Worst 7.37ms
- **_Bun_**: TBC

LSTM

- **_NodeJS_**: Best 9.84 ms - Worst 14.75 ms
- **_Deno_**: Best 8.28 ms to Worst 9.33 ms
- **_Bun_**: TBC

Based on these results it looks like the **Deno** runtime is more performant when using Brain.js. I had a bunch of trouble trying to get BunJS to work but will update this post or add a new one if I have new findings to report.

I also found on multiple execution that Deno was performing better over time.

## The Details

Here’s the basic setup. Deno was by far the easiest to get started and if you’re looking for just a quick processor for brain.js, I would go with Deno.

## The Setup

#### BunJS

```
bun create blank .

bun add brain.js
bun add gpu.js
bun add mitata
bun install
```

#### Deno

```
touch basic_nn.ts
touch lstm.ts
```

#### NodeJS

```
npm init
yarn add brain.js
yarn add gpu.js
yarn add mitata
```

```
/_ Add script to package.json _/
....
"scripts": {
"start:basic": "node basic_nn.js",
"start:lstm": "node lstm.js"
},
....
```

## Basic Neural Network (Hello World)

#### BunJS

Couldn’t go much further than setup at time of testing :(

#### Deno

```
import brain from "https://jspm.dev/brain.js";
import { bench, run } from "https://jspm.dev/mitata";

bench("Basic Neural Network", () => {
// provide optional config object (or undefined). Defaults shown.
const config = {
binaryThresh: 0.5,
hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
bun activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
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

await run({
avg: true, // enable/disable avg column (default: true)
json: false, // enable/disable json output (default: false)
colors: true, // enable/disable colors (default: true)
min_max: true, // enable/disable min/max column (default: true)
collect: false, // enable/disable collecting returned values into an array during the benchmark (default: false)
percentiles: false, // enable/disable percentiles column (default: true)
});
```

Execution

# Give the permissions you want but I went for expedience, --allow-all was selected

```
deno run --allow-all basic_nn.ts
```

#### NodeJS

```
import brain from "brain.js";
import { bench, run } from "mitata";

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

yarn start:basic
```

## LSTM

#### BunJS

Couldn’t go much further at time of testing :(

#### Deno

```
import brain from "https://jspm.dev/brain.js";
import { bench, run } from "https://jspm.dev/mitata";

//https://github.com/BrainJS/brain.js/blob/master/examples/javascript/predict-numbers.js

bench("Basic LSTM with strings with inputs and outputs:", () => {
const net = new brain.recurrent.LSTMTimeStep({
inputSize: 2,
hiddenLayers: [10],
outputSize: 2,
});

// Same test as previous, but combined on a single set
const trainingData = [
[
[1, 5],
[2, 4],
[3, 3],
[4, 2],
[5, 1],
],
];

net.train(trainingData, { errorThresh: 0.09 });

const closeToFiveAndOne = net.run([
[1, 5],
[2, 4],
[3, 3],
[4, 2],
]);

// console.log(closeToFiveAndOne);

// now we're cookin' with gas!
const forecast = net.forecast(
[
[1, 5],
[2, 4],
],
3
);
});

await run({
avg: true, // enable/disable avg column (default: true)
json: false, // enable/disable json output (default: false)
colors: true, // enable/disable colors (default: true)
min_max: true, // enable/disable min/max column (default: true)
collect: false, // enable/disable collecting returned values into an array during the benchmark (default: false)
percentiles: false, // enable/disable percentiles column (default: true)
});
```

Execution

# Give the permissions you want but I went for expedience, --allow-all was selected

deno run --allow-all lstm.ts

#### NodeJS

```
import brain from "brain.js";
import { bench, run } from "mitata";

//https://github.com/BrainJS/brain.js/blob/master/examples/javascript/predict-numbers.js
bench("Basic LSTM with strings with inputs and outputs:", () => {
const net = new brain.recurrent.LSTMTimeStep({
inputSize: 2,
hiddenLayers: [10],
outputSize: 2,
});

// Same test as previous, but combined on a single set
const trainingData = [
[
[1, 5],
[2, 4],
[3, 3],
[4, 2],
[5, 1],
],
];

net.train(trainingData, { errorThresh: 0.09 });

const closeToFiveAndOne = net.run([
[1, 5],
[2, 4],
[3, 3],
[4, 2],
]);

// console.log(closeToFiveAndOne);

// now we're cookin' with gas!
const forecast = net.forecast(
[
[1, 5],
[2, 4],
],
3
);

// console.log("next 3 predictions", forecast);
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

yarn start:lstm
```
