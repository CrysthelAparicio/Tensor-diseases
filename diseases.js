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
    { id: 20, name: "Insomnio"}
];

//const CANT_DISEASES = DISEASES.length;

//data para entrenamiento
const DISEASES_DATA = [
    [ 6, 7, 9, 20, 1],    [ 8, 12, 15, 7, 1],   [ 20, 9, 4, 3, 1],
    [ 7, 8, 9,  5, 2],    [ 1, 2, 15,  5, 2],   [  5, 9, 8, 1, 2],
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