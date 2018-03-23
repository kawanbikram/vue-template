const _ = require('lodash')
const random = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
const data = require('./data')
const height = 500;
const width = 500;
const color = ['lightgrey', 'grey'];
const DELAY = 100;
const TEXT_DELAY = 500;
const radiusDimension = [5, 100];
const clickAbleRadius = 0.8 * radiusDimension[1];
const simulationInterval = 3000;
const forceSeparation = -150;
const visibleText = 0.9 * radiusDimension[1];

module.exports = [
    {
        className: 'chart1',
        positionTop: true,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
    {
        className: 'chart2',
        positionTop: true,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
    {
        className: 'chart3',
        positionTop: true,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
    {
        className: 'chart4',
        positionTop: true,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
    {
        className: 'chart5',
        positionTop: false,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
    {
        className: 'chart6',
        positionTop: false,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
    {
        className: 'chart7',
        positionTop: false,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
    {
        className: 'chart8',
        positionTop: false,
        rawData: _.shuffle(data),
        alpha: _.sample(random),
        width,
        height,
        color,
        delay: DELAY,
        textDelay: TEXT_DELAY,
        simulationInterval,
        forceSeparation,
        clickAbleRadius,
        visibleText,
        radiusDimension
    },
]