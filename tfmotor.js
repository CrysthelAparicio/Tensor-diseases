const dis = require('./diseases');
const tf = require('@tensorflow/tfjs');

async function trainModel(xTrain, yTrain, xTest, yTest){
    const model = tf.sequential();
    const learningRate = .01;
    const numberOfEpochs = 1000;
    const optimizer = tf.train.adam(learningRate);

    model.add(tf.layers.dense(
        { units: 10, activation: 'sigmoid', inputShape: [xTrain.shape[1]]}
    ));

    model.add(tf.layers.dense(
        { units: 3, activation: 'softmax'}
    ));

    model.compile(
        { optimizer: optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']}
    );

    const history = await model.fit(xTrain, yTrain, { 
        epochs: numberOfEpochs, validationData: [xTest, yTest], callbacks: {
            onEpochEnd: async (epoch, logs) => {
                //console.log("Epoch: "+epoch+" Logs: "+ logs.loss);
                await tf.nextFrame();
            }
        }});
    return model;
}

async function doDiseases(){
    const [xTrain, yTrain, xTest, yTest ] = dis.getDiseases(.2);
    const model = await trainModel(xTrain, yTrain, xTest, yTest);
    const input = tf.tensor2d([ 10, 11, 13, 33 ], [1, 4]);
    const prediction = model.predict(input).argMax(-1).dataSync();
    console.log("La enfermedad es: " + await getDiseaseName(prediction));
}

async function getDiseaseName( idPrediction ){
    console.log("El id devuelto por la prediccion es:"+ idPrediction[0]);
    let diseaseName = "El analisis devolvio una enfermedad que no existe!";
    for (let i = 0; i < dis.DISEASES.length; i++) {
        if(dis.DISEASES[i].id===idPrediction[0]){
            diseaseName=dis.DISEASES[i].name;
        } 
    }
    return diseaseName;
}


doDiseases();