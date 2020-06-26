//imprtando tensorflow
const tf = require("@tensorflow/tfjs");

const DISEASES = [
    { id: 1, name: "Hypertension"}, 
    { id: 2, name: "Infarto agudo del miocardio"}, 
    { id: 3, name: "Insuficiencia Cardiaca"}
];

/*
let enfermedad = {
    id: 00,
    name: "Hipopotomontrosesquipedialofobia",
    sintomas: [1, 2, 3, 4]
}
*/
const SINTOMAS = [
    { id: 1, name: "Dificultad para respirar"},//Infarto
    { id: 2, name: "Dolor en el pecho" },
    { id: 3, name: "Nauseas"},
    { id: 4, name: "Palidez"},
    { id: 5, name: "Sudoracion"},
    { id: 6, name: "Ansiedad"},//HYpertension
    { id: 7, name: "Dolor de cabeza"},
    { id: 8, name: "Sangrado nasal"},
    { id: 9, name: "Cegera"},
    { id: 10, name: "Vomito"}, //insuficiencia
    { id: 11, name: "Tos"},
    { id: 12, name: "Desmayos"},
    { id: 13, name: "Inhapetencia"},
    { id: 14, name: "Higado inflamado"},
    { id: 15, name: "Pulso irregularmente alto"},
    { id: 16, name: "Pulso irregularmente bajo"},
    { id: 17, name: "Miccion excesiva"},
    { id: 18, name: "Pies inflamados"},
    { id: 19, name: "Piernas inflamadas"},
    { id: 20, name: "Insomnio"},
    { id: 21, name: "Fatiga"}, //I
    { id: 22, name: "Dolor de Cuello"},
    { id: 23, name: "Malestar de estomago"},
    { id: 24, name: "Hormigueo en el brazo"},
    { id: 25, name: "Perdida de Conocimiento"},
    { id: 26, name: "Dolor de Garganta"}, //I
    { id: 27, name: "Arritmias"},//Insu
    { id: 28, name: "Asma"},
    { id: 29, name: "Aumento de peso"},
    { id: 30, name: "Problemas de la memoria"},
    { id: 31, name: "Piel fria y húmeda"},
    { id: 32, name: "Venas hinchadas en el cuello"},
    { id: 33, name: "Hinchazon"}, // Insu
    { id: 34, name: "Vision doble"}, //H
    { id: 35, name: "Destellos de luz"}, 
    { id: 36, name: "Zumbido en el oido"},
    { id: 37, name: "Hemorragias nasales"},
    { id: 38, name: "Somnolencia"},
    { id: 39, name: "Mancha de Sangre en los ojos"},
    { id: 40, name: "Rubor Facial"} //H
];

const CANT_DISEASES = DISEASES.length;

//data para entrenamiento

const DISEASES_DATA = [
    [ 6, 7, 9, 20, 1],   [ 8, 12, 15, 7, 1],   [ 20, 9, 4, 3, 1],
    [ 34, 35, 36, 37, 1],[ 38, 39, 20, 3, 1],  [ 7, 37, 34, 9, 1],
    [ 40, 34, 39, 35, 1],[ 36, 37, 34, 40, 1], [ 8, 6, 20, 3, 1],
    [ 20, 9, 7, 6, 1],   [ 7, 15, 12, 8, 1],   [ 9, 34, 37, 7, 1],  
    [ 9, 36, 39, 6, 1],  [ 12, 39, 37, 15, 1], [ 9, 37, 20, 34, 1],
    [ 6, 34, 40, 20 , 1], [ 8, 38, 36, 7, 1],   [ 20, 7, 8, 9, 1],
    [ 20, 37, 35, 6, 1], [ 7, 3, 40, 15, 1],   [ 9, 37, 6, 34, 1], 
    [ 1, 5, 10, 38, 1], [11, 14, 30, 34, 1], [12, 26, 29, 39, 1],
    [ 25, 34, 36, 38, 1], [2, 3, 33, 40, 1], [7, 25, 34, 35, 1],
    [2, 3, 31, 33, 1], [26, 36, 39, 40, 1], [29, 18, 26, 37, 1],
    [2, 4, 10, 37, 1], [36, 37, 38, 39, 1], [9, 32, 31, 35, 1],
    [7, 25, 34, 35, 1], [25, 33, 36, 37, 1], [8, 20, 21, 3, 1],

    /////
    [ 7, 8, 9,  5, 2],     [ 1, 2, 15,  5, 2],   [  5, 9, 8, 1, 2],
    [ 21, 22, 23, 24, 2],  [ 25, 26, 23, 21, 2], [ 24, 22, 25, 5, 2],
    [ 8, 2, 9, 22, 2],     [ 5, 24, 21, 22, 2],  [ 9, 23, 21, 2, 2],
    [ 5, 1, 24, 26, 2],    [ 26, 25, 24, 1, 2],  [ 8, 22, 9, 24, 2],
    [ 5, 24, 22, 26, 2],   [ 2, 26, 24, 25, 2],  [ 15, 5, 1, 7, 2],
    [ 22, 9, 8, 5, 2],     [ 15, 1, 7, 24, 2],   [ 7, 26, 2, 21, 2],
    [ 1, 8, 9, 5, 2],      [ 8, 25, 1, 21, 2],   [ 26, 24, 23, 7, 2],
    [7, 25, 34, 40, 2], [31, 32, 39, 40, 2], [30, 40, 1, 27, 2],
    [ 29, 33, 38, 40, 2], [29, 32, 33, 38, 2], [23, 36, 37, 38, 2],
    [7, 24, 34, 36, 2], [29, 31, 34, 40, 2], [33, 34, 36, 39, 2],
    [24, 25, 27, 28, 2], [7, 25, 30, 39, 2], [29, 30, 14, 33, 2],
    [32, 33, 3, 40, 2], [16, 20, 24, 36, 2], [30, 35, 37, 40, 2],


    //// Faltan aqui 
    [ 20, 10, 19, 11, 3], [ 18, 12, 17, 13, 3], [ 16, 14, 15, 20, 3],
    [7, 25, 27, 36, 3], [3, 12, 33, 39, 3], [12, 2, 13, 31, 3],
    [30, 40, 13, 1, 3], [10, 21, 15, 27, 3], [17, 10, 17, 37, 3],
    [31, 32, 34, 39, 3], [7, 25, 41, 37, 3], [16, 20, 27, 39, 3],
    [12, 10, 28, 35, 3], [16, 20, 24, 36, 3], [6, 10, 22, 37, 3],
    [29, 32, 36, 38, 3], [26, 11, 12, 28, 3], [16, 21, 22, 40, 3],
    [35, 22, 35, 40, 3], [7, 25, 30, 39, 3], [36, 11, 16, 37, 3],
    [16, 20, 24, 36, 3], [16, 22, 29, 40, 3], [10, 11, 13, 33, 3],
    [11, 38, 19, 20, 3], [24, 25, 27, 28, 3], [21, 28, 26, 20, 3],
    [7, 25, 30, 39, 3], [17, 11, 19, 30, 3], [39, 21, 14, 40, 3],
    [29, 32, 35, 37, 3], [38, 22, 15, 47, 3], [38, 13, 25, 38, 3],
    [28, 2, 17, 23, 3], [33, 34, 38, 39, 3], [18, 28, 26, 17, 3]
];

function getDiseases(testSplit) {
    return tf.tidy(() => {
        const dataByClass = []; //son los id de los sintomas
        const targetByClass = []; // id de las enfermedades
        for (let i = 0; i < DISEASES.length; ++i) {
            dataByClass.push([]); //ponemos arreglos vacios dentro de los arreglos que declaramos arriba
            targetByClass.push([]);
        }
        for(const example of DISEASES_DATA){
            const target = example[example.length -1]; //destino
            const data = example.slice(0, example.length-1); //informacion
            dataByClass[target-1].push(data);
            targetByClass[target-1].push(target);
        }

        const xTrains = [];
        const yTrains = [];
        const xTests = [];
        const yTests = [];

        for (let i = 0; i < DISEASES.length; ++i){
            const [xTrain, yTrain, xTest, yTest] = convertToTensors(dataByClass[i], targetByClass[i], testSplit); 
            xTrains.push(xTrain);
            yTrains.push(yTrain);
            xTests.push(xTest);
            yTests.push(yTest);
        }

        const concatAxis = 0;
        return [
            tf.concat(xTrains, concatAxis), tf.concat(yTrains, concatAxis), 
            tf.concat(xTests, concatAxis), tf.concat(yTests, concatAxis)
        ];
    });
}


function convertToTensors(data, target, testSplit){
    const numExamples = data.length; //cantidad total de datos
    if ( numExamples !== target.length ) {
        throw new Error("La cantidad de datos no coincide con la cantidad de enfermedades");
    }

    const numTestExamples = Math.round(numExamples*testSplit);//de la cantidad total de datos solo extrae un porcentaje de los mismos para brueba
    const numTrainExamples = numExamples - numTestExamples; //los dos restante que no se usan para prueba, se utilizan para entrenamiento

    const xDim = data[0].length;

    //construyendo un tensor2D a partir de los datos de recopilados de una fila  
    const xs = tf.tensor2d(data, [numExamples, xDim]);

    //Crear un tensor1d y convertir a onehot encoding
    const ys = tf.oneHot(tf.tensor1d(target).toInt(), CANT_DISEASES);
    
    //Dividir la y retornarla
    const xTrain = xs.slice([0,0], [numTrainExamples, xDim]);
    const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDim]);
    const yTrain = ys.slice([0,0], [numTrainExamples, CANT_DISEASES]);
    const yTest = ys.slice([0,0], [numTestExamples, CANT_DISEASES]);
    return [xTrain, yTrain, xTest, yTest];
}

exports.getDiseases = getDiseases;
exports.DISEASES = DISEASES;