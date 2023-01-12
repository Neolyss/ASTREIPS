import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {faker} from "@faker-js/faker";
import {Bar} from "react-chartjs-2";
import Papa from "papaparse";
import csvFilePath from "../datasets/answers.tsv";
import coefs from "../datasets/coefficients.json";
import coefficients from "../datasets/coefficients.json";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Display(){
    var accents = require("remove-accents")
    const ref = React.useRef();
    const [options] = useState({
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    })
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    })

    function getQuestionCoefficients(question, counter, coefficients) {
        let index = "0"
        const questionNumber = question.substring(0, 2).replace(".", "")
        if (!counter.has(questionNumber)) {
            counter.set(questionNumber, 1)
            index = 1
        } else {
            index = counter.get(questionNumber) + 1
            counter.set(questionNumber, index)
        }
        index = String(questionNumber + "." + index)
        //console.log(index)
        let obj = coefficients.find(element => index === String(element.id))
        return obj;
    }

    function getCoeffFromAnswer(questionCoefficients, answer) {
        let matchAnswer = ""
        for (const reponse of questionCoefficients.reponses) {
            console.log(questionCoefficients.id + " -- Reponse du gars -- " + answer)
            if(answer === "") {
                return 0
            }
            let responseAccents= accents.remove(reponse.texte.toLowerCase())
            let answerAccents = accents.remove(answer.toLowerCase())
            if (responseAccents.localeCompare(answerAccents) === 0) {
                console.log(questionCoefficients.id + " => " + reponse.texte)
                matchAnswer = reponse
            }
        }
        if (matchAnswer === undefined) {
            console.log(questionCoefficients.id + " PAS BON !")
            return 0
        } else {
            console.log(questionCoefficients.id + " => " + matchAnswer.coeff)
            return matchAnswer.coeff
        }

    }

    function updateData(resultData) {
        const newLabel = []
        let coefficients = require('../datasets/coefficients.json');
        let scoreStudents = []
        //console.log(coefficients)
        resultData.map((row) => { // For each student
            let score = 0
            let keys = Object.keys(row)
            let labelKey = keys.shift() // Retrieve the id of the current student
            let label = row[labelKey]
            console.log("STUDENT = " + label)
            newLabel.push(label)
            let counter = new Map()
            for (const question of keys) { // For all the questions
                let sumQuestion = 0
                const answer = row[question]
                //const regex = /(?<=\([a-zA-Z],\s)/
                const regex = /(?<!\(|Rien|générale)\s*\,\s*(?![^\(]*\))/
                const split = answer.split(regex)
                let questionCoefficients = getQuestionCoefficients(question, counter, coefficients);
                const coefficientGlobal = questionCoefficients.coeff
                if(split.length === 1) { // If this is simple question
                    sumQuestion += getCoeffFromAnswer(questionCoefficients, answer);
                } else { // Multiple choices
                    console.log(split)
                    let sumMultiple = 0
                    for (const answer of split) {
                        sumMultiple += getCoeffFromAnswer(questionCoefficients, answer.trim());
                    }
                    sumQuestion += sumMultiple
                }
                //console.log("question " + question + " ---" + questionCoefficients.id)
                console.log(questionCoefficients.id + " sumQ " + sumQuestion)
                score += sumQuestion * coefficientGlobal
            }
            console.log(score)
            scoreStudents.push(score)
        })
        const newData = {...data}

        newData.datasets = [{
            label: 'Score',
            data: scoreStudents,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]

        newData.labels = newLabel;

        setData(newData)
    }

    useEffect(() => {
        Papa.parse(csvFilePath, {
            download: true,
            header: true,
            complete: (results) => {
                updateData(results.data);
            }
        });
    }, [])

    return(
        <Bar options={options} data={data} />
    )
}

export default Display