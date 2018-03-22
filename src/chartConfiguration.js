const _ = require('lodash')
const random = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
const temp = require('./data')
const height = 500;
const width = 500;
const color = ['lightgrey', 'grey'];

module.exports = [
    {
        className: 'chart1',
        positionTop: true,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
    {
        className: 'chart2',
        positionTop: true,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
    {
        className: 'chart3',
        positionTop: true,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
    {
        className: 'chart4',
        positionTop: true,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
    {
        className: 'chart5',
        positionTop: false,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
    {
        className: 'chart6',
        positionTop: false,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
    {
        className: 'chart7',
        positionTop: false,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
    {
        className: 'chart8',
        positionTop: false,
        rawData: _.shuffle(temp),
        alpha: _.sample(random),
        width,
        height,
        color
    },
]