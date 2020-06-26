const dis = require('./diseases');
const tf = require('@tensorflow/tfjs');

async function trainModel(xTrain, yTrain, xTest, yTest){
    const model = tf.sequential(); //la salida de una capa es la entrada de otra 
    const learningRate = .01; //velocidad de aprendizaje, 
    const numberOfEpochs = 50; //epocas de entrenamiento
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

async function predictDiseases(sintomas){
    const [xTrain, yTrain, xTest, yTest ] = dis.getDiseases(.2);
    const model = await trainModel(xTrain, yTrain, xTest, yTest);
    const input = tf.tensor2d(sintomas, [1, sintomas.length]);
    const prediction = model.predict(input).argMax(-1).dataSync();
    return "" + await getDiseaseName(prediction);
}

async function getDiseaseName( idPrediction ){
    let diseaseName = "El analisis devolvio una enfermedad que no existe!";
    for (let i = 0; i < dis.DISEASES.length; i++) {
        if(dis.DISEASES[i].id===idPrediction[0]){
            diseaseName=dis.DISEASES[i].name;
        } 
    }
    return diseaseName;
}

exports.predictDiseases = predictDiseases;