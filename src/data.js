const sampleQues = ['where can my son learn Aikido', 'can i have my guide don in a rental ?', 'how do i find an ot that can help ?', 'what is the minimnm age']
const _ = require('lodash')

module.exports = [
    {"label": _.sample(sampleQues), "score": "0.1",},
    {"label": _.sample(sampleQues), "score": "0.5",},
    {"label": _.sample(sampleQues), "score": "3",},
    {"label": _.sample(sampleQues), "score": "1"},
    {"label": _.sample(sampleQues), "score": "1.7",},
    {"label": _.sample(sampleQues), "score": "8.8",},
    {"label": _.sample(sampleQues), "score": "2.7",},
    {"label": _.sample(sampleQues), "score": "3.8",},
    {"label": _.sample(sampleQues), "score": "4.8",},
    {"label": _.sample(sampleQues), "score": "30.8"},
    {"label": _.sample(sampleQues), "score": "5.8"},
    {"label": _.sample(sampleQues), "score": "8",},
    {"label": _.sample(sampleQues), "score": "2"},
    {"label": _.sample(sampleQues), "score": "1.8"},
    {"label": _.sample(sampleQues), "score": "80"}


]
