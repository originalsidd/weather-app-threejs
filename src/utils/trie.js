// Uses trie to implement drop down functionality
import TrieSearch from 'trie-search';
import cityList from './Cities.json';

const helperSet = new Set();
const trie = new TrieSearch();
for (let country in cityList) {
    for (let city of cityList[country]) {
        city = city.toLowerCase();
        if (helperSet.has(city)) continue;
        helperSet.add(city);
        city = city.split(' ');
        const key = city.join('');
        for (let i = 0; i < city.length; ++i) {
            city[i] = city[i][0].toUpperCase() + city[i].slice(1);
        }
        const value = city.join(' ');
        trie.map(key, value);
    }
}

export default trie;
