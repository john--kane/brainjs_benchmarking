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

  //   console.log(closeToFiveAndOne);

  // now we're cookin' with gas!
  const forecast = net.forecast(
    [
      [1, 5],
      [2, 4],
    ],
    3
  );

  //   console.log("next 3 predictions", forecast);
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
