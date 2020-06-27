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
    { id: 2, name: "Dolor en el pecho" }, //Infarto
    { id: 3, name: "Nauseas"}, //Infarto
    { id: 4, name: "Palidez"}, //Infarto
    { id: 5, name: "Sudoracion"}, //Infarto
    { id: 6, name: "Ansiedad"},//HYpertension
    { id: 7, name: "Dolor de cabeza"}, //HYpertension
    { id: 8, name: "Sangrado nasal"}, //HYpertension
    { id: 9, name: "Cegera"}, //HYpertension
    { id: 10, name: "Vomito"}, //insuficiencia
    { id: 11, name: "Tos"}, //insuficiencia
    { id: 12, name: "Desmayos"}, //insuficiencia
    { id: 13, name: "Inhapetencia"}, //insuficiencia
    { id: 14, name: "Higado inflamado"}, //insuficiencia
    { id: 15, name: "Pulso irregularmente alto"}, //Infarto
    { id: 16, name: "Pulso irregularmente bajo"},//Infarto
    { id: 17, name: "Miccion excesiva"}, //HYpertension
    { id: 18, name: "Pies inflamados"}, //insuficiencia
    { id: 19, name: "Piernas inflamadas"}, //insuficiencia
    { id: 20, name: "Insomnio"}, //HYpertension
    { id: 21, name: "Fatiga"}, //Infarto
    { id: 22, name: "Dolor de Cuello"}, //Infarto
    { id: 23, name: "Malestar de estomago"}, //Infarto
    { id: 24, name: "Hormigueo en el brazo"}, //Infarto
    { id: 25, name: "Perdida de Conocimiento"}, //Infarto
    { id: 26, name: "Dolor de Garganta"}, //Infarto
    { id: 27, name: "Arritmias"},//Insuficiencia
    { id: 28, name: "Asma"}, //Insuficiencia
    { id: 29, name: "Aumento de peso"}, //Insuficiencia
    { id: 30, name: "Problemas de la memoria"}, //Insuficiencia
    { id: 31, name: "Piel fria y húmeda"}, //Insuficiencia
    { id: 32, name: "Venas hinchadas en el cuello"}, //Insuficiencia
    { id: 33, name: "Hinchazon"}, //Insuficiencia
    { id: 34, name: "Vision doble"}, //HYpertension
    { id: 35, name: "Destellos de luz"}, //HYpertension
    { id: 36, name: "Zumbido en el oido"}, //HYpertension
    { id: 37, name: "Hemorragias nasales"}, //HYpertension
    { id: 38, name: "Somnolencia"}, //HYpertension
    { id: 39, name: "Mancha de Sangre en los ojos"}, //HYpertension
    { id: 40, name: "Rubor Facial"} //Hypertension
];

const CANT_DISEASES = DISEASES.length;

//data para entrenamiento

const DISEASES_DATA = [
    //Hypertesion
    [ 6, 7, 8, 9, 1],     [ 6, 7, 8, 17, 1],   [ 6, 7, 8, 20, 1],
    [ 6, 7, 8, 34, 1],    [ 7, 35, 39, 40, 1], [ 7, 37, 34, 9, 1],
    [ 7 ,36 ,37 ,39,1],   [ 7, 36 ,38 ,40, 1], [ 7, 37, 38, 39, 1],
    [ 7, 37, 39, 40, 1],  [ 7, 15, 12, 8, 1],  [ 8, 9, 17, 20, 1],  
    [ 8, 9, 17, 34, 1],   [ 8, 9, 17, 35, 1],  [ 8, 9, 17, 36, 1],
    [ 8, 9, 17, 37, 1],   [ 8, 9, 17, 39, 1],  [ 8, 9, 20, 34,1],
    [ 8, 9, 20, 35, 1],   [ 8, 9, 20, 36, 1],  [ 8, 9, 20, 37, 1], 
    [ 9, 17, 20, 34, 1],  [ 9, 17, 20, 35, 1], [ 9, 17, 20, 36, 1],
    [ 9, 17, 20, 37, 1],  [ 9, 17, 20, 38, 1], [ 9, 17, 20, 39, 1],
    [ 17, 20, 37, 39, 1], [ 17, 20, 37, 40, 1],[ 17, 20, 37, 38, 1],
    [ 17, 20, 35, 36, 1], [ 17, 20, 35, 37, 1],[ 17, 20, 35, 38, 1],
    [ 20, 34, 36, 40, 1], [ 20, 34, 37, 38, 1],[ 20, 34, 37, 39, 1],
    [ 20, 34, 37, 40, 1], [ 20, 34, 38, 39, 1],[ 20, 34, 38, 40,1],
    [ 34, 35, 36, 37, 1], [ 34, 35, 36, 38, 1],[ 34, 35, 36, 39, 1],
    [ 34, 35, 36, 40, 1], [ 34, 35, 37, 38, 1],[ 34, 35, 37, 39, 1],
    [ 35, 36, 37, 38, 1], [ 35, 36, 37, 39, 1],[ 35, 36, 37, 40, 1],
    [ 35, 36, 38, 39, 1], [ 35, 36, 38, 40, 1],[ 35, 37, 38, 39, 1],
    [ 36, 37, 38, 39,1],  [ 36, 37, 38, 40, 1],[ 36, 37, 39, 40, 1],

    //Infarto
    [ 1, 2, 4, 15, 2],     [ 1, 2, 4, 16, 2],   [ 1, 2, 4, 21, 2],
    [ 1, 2, 4, 22, 2],     [ 1, 2, 4, 23, 2],   [ 1, 2, 4, 24, 2],
    [ 1, 2, 15, 16, 2],    [ 1, 2, 15, 21, 2],  [ 1, 2, 15, 22, 2],
    [ 1, 22, 23, 24, 2],   [ 1, 22, 23, 25, 2], [ 1, 22, 23, 26, 2],
    [ 2, 3, 4, 15, 2],     [ 2, 3, 4, 16, 2],   [ 2, 3, 4, 21, 2],
    [ 2, 3, 4, 22, 2],     [ 2, 3, 4, 23, 2],   [ 2, 3, 4, 24, 2],
    [ 2, 3, 15, 23, 2],    [ 2, 3, 15, 24, 2],  [ 2, 3, 15, 25, 2],
    [ 2, 4, 5, 15, 2],     [ 2, 4, 5, 16, 2],   [ 2, 4, 5, 21, 2],
    [ 3, 4, 16, 21, 2],    [ 3, 4, 16, 22, 2],  [ 3, 4, 16, 23, 2],
    [ 3, 5, 15, 22, 2],    [ 3, 5, 15, 23, 2],  [ 3, 5, 15, 24, 2],
    [ 3, 15, 23, 24, 2],   [ 3, 15, 23, 24, 2], [ 3, 15, 23, 25, 2],
    [ 4, 5, 15, 16, 2],    [ 4, 5, 15, 22, 2],  [ 4, 5, 15, 23, 2],
    [ 4, 5, 15, 25, 2],    [ 4, 5, 15, 26, 2],  [ 4, 5, 16, 21, 2],
    [ 5, 16, 21, 22, 2],   [ 5, 16, 21, 22, 2], [ 5, 16, 21, 24, 2],
    [ 5, 16, 21, 25, 2],   [ 5, 16, 21, 26, 2], [ 5, 16, 22, 23, 2],
    [ 15, 16, 21, 22, 2],  [ 15, 16, 21, 23, 2],[ 15, 16, 21, 24, 2],
    [ 16, 22, 23, 24,2],   [ 16, 22, 23, 25,2], [ 16, 22, 23, 26, 2],
    [ 22, 23, 25, 26,2],   [ 22, 24, 25, 26, 2],[ 23, 24, 25, 26, 2],


    //// Insuficiencia
    [ 10, 11, 12, 13, 3], [ 10, 11, 12, 14, 3], [ 10, 11, 12, 18, 3],
    [ 10, 12, 13, 28, 3], [ 10, 12, 13, 29, 3], [ 10, 12, 13, 30, 3],
    [ 10, 29, 31, 33, 3], [ 10, 29, 32, 33, 3], [ 10, 30, 31, 32, 3],
    [ 11, 13, 14, 18, 3], [ 11, 13, 14, 19, 3], [ 11, 13, 14, 27, 3],
    [ 12, 13, 14, 18, 3], [ 12, 13, 14, 19, 3], [ 12, 13, 14, 27, 3],
    [ 13, 14, 27, 32, 3], [ 13, 14, 27, 33, 3], [ 13, 14, 28, 29, 3],
    [ 14, 18, 19, 27, 3], [ 14, 18, 19, 28, 3], [ 14, 18, 19, 29, 3],
    [ 14, 18, 28, 31, 3], [ 14, 18, 28, 32, 3], [ 14, 18, 28, 33, 3],
    [ 18, 19, 27, 28, 3], [ 18, 19, 27, 29, 3], [ 18, 19, 27, 30, 3],
    [ 18, 19, 28, 30, 3], [ 18, 19, 28, 31, 3], [ 18, 19, 28, 32, 3],
    [ 18, 28, 30, 31, 3], [ 18, 28, 30, 32, 3], [ 18, 28, 30, 33, 3],
    [ 19, 27, 28, 29, 3], [ 19, 27, 28, 30, 3], [ 19, 27, 28, 31, 3],
    [ 19, 27, 28, 32, 3], [ 19, 27, 29, 30, 3], [ 19, 27, 29, 31, 3],
    [ 19, 27, 30, 31, 3], [ 19, 27, 30, 32, 3], [ 19, 27, 30, 33, 3],
    [ 27, 28, 29, 30, 3], [ 27, 28, 29, 31, 3], [ 27, 28, 29, 32, 3],
    [ 27, 29, 30, 31, 3], [ 27, 29, 30, 32, 3], [ 27, 29, 30, 33, 3],
    [ 28, 29, 30, 31, 3], [ 28, 29, 30, 32, 3], [ 28, 29, 30, 33, 3],
    [ 29, 30, 32, 33, 3], [ 29, 31, 32, 33, 3], [ 30, 31, 32, 33, 3]
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
            const target = example[example.length -1]; // id de la enfermedad
            const data = example.slice(0, example.length-1); // arreglo de los id de 4 sintomas
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

    const xDim = data[0].length; //tamaño de un bloque de la data 

    //construyendo un tensor2D a partir de los datos de recopilados de una fila  
    const xs = tf.tensor2d(data, [numExamples, xDim]);

    //Crear un tensor1d y convertir a onehot encoding
    const ys = tf.oneHot(tf.tensor1d(target).toInt(), CANT_DISEASES);
    
    //Recogiendo la data y retornarla
    const xTrain = xs.slice([0,0], [numTrainExamples, xDim]);
    const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDim]);
    const yTrain = ys.slice([0,0], [numTrainExamples, CANT_DISEASES]);
    const yTest = ys.slice([0,0], [numTestExamples, CANT_DISEASES]);
    return [xTrain, yTrain, xTest, yTest];
}

exports.getDiseases = getDiseases;
exports.DISEASES = DISEASES;