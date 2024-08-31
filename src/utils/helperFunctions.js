export const getFirstFewSentences = (paragraph, numberOfLines = 3) => {
    // Split the paragraph into an array of sentences based on punctuation marks
    const sentences = paragraph.match(/[^\.!\?]+[\.!\?]+/g);

    // Check if there are fewer than 4 sentences
    if (!sentences || sentences.length < 4) {
        return paragraph;
    }

    // Join the first 4 sentences and return them
    return sentences.slice(0, numberOfLines).join(' ');
};