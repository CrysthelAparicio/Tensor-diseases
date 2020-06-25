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

//const CANT_DISEASES = DISEASES.length;

//data para entrenamiento
const DISEASES_DATA = [
    [ 6, 7, 9, 20, 1],   [ 8, 12, 15, 7, 1],   [ 20, 9, 4, 3, 1],
    [ 34, 35, 36, 37, 1],[ 38, 39, 20, 3, 1],  [ 7, 37, 34, 9, 1],
    [ 40, 34, 39, 35, 1],[ 36, 37, 34, 40, 1], [ 8, 6, 20, 3, 1],
    [ 20, 9, 7, 6, 1],   [ 7, 15, 12, 8, 1],   [ 9, 34, 37, 7, 1],  
    [ 9, 36, 39, 6, 1],  [ 12, 39, 37, 15, 1], [ 9, 37, 20, 34, 1],
    [ 6, 34, 40, 20 ,2], [ 8, 38, 36, 7, 1],   [ 20, 7, 8, 9, 1],
    [ 20, 37, 35, 6, 1], [ 7, 3, 40, 15, 1],   [ 9, 37, 6, 34, 1], 
 
    /////
    [ 7, 8, 9,  5, 2],     [ 1, 2, 15,  5, 2],   [  5, 9, 8, 1, 2],
    [ 21, 22, 23, 24, 2],  [ 25, 26, 23, 21, 2], [ 24, 22, 25, 5, 2],
    [ 8, 2, 9, 22, 2],     [ 5, 24, 21, 22, 2],  [ 9, 23, 21, 2, 2],
    [ 5, 1, 24, 26, 2],    [ 26, 25, 24, 1, 2],  [ 8, 22, 9, 24, 2],
    [ 5, 24, 22, 26, 2],   [ 2, 26, 24, 25, 2],  [ 15, 5, 1, 7, 2],
    [ 22, 9, 8, 5, 2],     [ 15, 1, 7, 24, 2],   [ 7, 26, 2, 21, 2],
    [ 1, 8, 9, 5, 2],      [ 8, 25, 1, 21, 2],   [ 26, 24, 23, 7, 2],


    //// Faltan aqui 
    [ 20, 10, 19, 11, 3], [ 18, 12, 17, 13, 3], [ 16, 14, 15, 20, 3]
];
/*
function getDiseases(testSplit) {
    return tf.tidy(() => {
        const dataByClass = [];
        const targetByClass = [];
        for (let i = 0; i < DISEASES.length; ++i) {
            dataByClass.push([]);
            targetByClass.push([]);
        }
        for(const example of DISEASES_DATA){
            const target = example[example.length -1]; //destino
            const data = example.slice(0, example.length-1); //informacion
            dataByClass[target-1].push(data);
            targetByClass[target-1].push(target);
        }
        console.log(dataByClass);
        console.log(targetByClass);
        
        
        console.log(dataByClass);
        console.log(targetByClass);

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
            tf.concat(xTests, concatAxis), tf.concat(yTest, concatAxis)
        ];
    });
}

exports.getDiseases = getDiseases;
exports.DISEASES = DISEASES;*/