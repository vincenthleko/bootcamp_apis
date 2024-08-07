export function longestWord(sentence) {
    const words = sentence.split(' ');
    let longest = '';
    for (let i=0; i<words.length; i++) {
      const word = words[i];
        if (word.length >= longest.length) {
            longest = word;
        }
    }
    return longest;
}

export function shortestWord(sentence) {
    const words = sentence.split(' ');
    let shortest = words[0];
    for (let i=0; i<words.length; i++) {
      const word = words[i];
        if (word.length <= shortest.length) {
            shortest = word;
        }
    }
    return shortest;
}

export function wordLengths(sentence) {
    const words = sentence.split(' ');
    let sum = 0;
    for (let i=0; i<words.length; i++) {
      const word = words[i];
        sum += word.length;
    }
    return sum;
}