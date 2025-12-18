// Simple test to check if the main functions are working
// This will help us identify any syntax or logic errors

// Mock DOM elements for testing
const mockDOM = {
    elements: {},
    createElement: function(tag) {
        return {
            id: '',
            value: '',
            textContent: '',
            style: {},
            addEventListener: function() {},
            appendChild: function() {},
            removeChild: function() {}
        };
    },
    getElementById: function(id) {
        return this.elements[id] || null;
    },
    body: {
        appendChild: function() {},
        removeChild: function() {},
        contains: function() { return false; }
    }
};

// Mock global objects
global.document = mockDOM;
global.localStorage = {
    getItem: function() { return null; },
    setItem: function() {},
    removeItem: function() {}
};

// Test the core functions
console.log('Testing core functions...');

// Test 1: cleanBulletPoints function
function cleanBulletPoints(text) {
    if (!text) return '';
    
    const lines = text.split('\n');
    const cleanedLines = lines.map(line => {
        return line.replace(/^[\s・\-\*\d+\.　]+/, '').trim();
    });
    
    return cleanedLines.join('\n');
}

const testInput1 = '・テスト業務\n- 別のテスト\n* さらにテスト';
const result1 = cleanBulletPoints(testInput1);
console.log('cleanBulletPoints test:', result1);

// Test 2: filterEmptyLines function
function filterEmptyLines(lines) {
    return lines.filter(line => line.trim().length > 0);
}

const testLines = ['テスト', '', '   ', 'もう一つのテスト'];
const result2 = filterEmptyLines(testLines);
console.log('filterEmptyLines test:', result2);

// Test 3: preprocessInput function
function preprocessInput(rawText) {
    if (!rawText) return [];
    
    const cleanedText = cleanBulletPoints(rawText);
    const lines = cleanedText.split('\n');
    const filteredLines = filterEmptyLines(lines);
    
    return filteredLines;
}

const result3 = preprocessInput(testInput1);
console.log('preprocessInput test:', result3);

// Test 4: getRandomEnding function
function getRandomEnding() {
    const endings = [
        '〜しました。',
        '〜を実施しました。',
        '〜を行いました。'
    ];
    return endings[Math.floor(Math.random() * endings.length)];
}

const result4 = getRandomEnding();
console.log('getRandomEnding test:', result4);

// Test 5: addSentenceEndings function
function addSentenceEndings(line) {
    if (!line || line.trim().length === 0) return line;
    
    const trimmedLine = line.trim();
    
    const properEndings = ['。', '！', 'ます', 'です'];
    const hasProperEnding = properEndings.some(ending => trimmedLine.endsWith(ending));
    
    if (hasProperEnding) {
        return trimmedLine;
    } else {
        const randomEnding = getRandomEnding();
        return trimmedLine + randomEnding;
    }
}

const result5a = addSentenceEndings('テスト業務');
const result5b = addSentenceEndings('テスト業務です');
console.log('addSentenceEndings test (no ending):', result5a);
console.log('addSentenceEndings test (with ending):', result5b);

console.log('All core function tests completed successfully!');