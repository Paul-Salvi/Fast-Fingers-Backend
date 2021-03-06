import words from '../../data/dictionary.json';
const WordManager = require('../models/words.model');

const DATA_BY_LEVEL = {
   'EASY': words.filter(word => word.length <= 4),
   'MEDIUM': wordsData.filter(word => word.length >= 5 && word.length <= 8),
   'HARD': wordsData.filter(word => word.length > 8)
}

