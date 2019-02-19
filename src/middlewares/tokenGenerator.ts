export function generateToken() {
    let allDatasForRandomize: string[] = [];

    let bigLetters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L',
        'M', 'N', 'O', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    bigLetters.map(item => {
        let randomizeNumber = Math.round(Math.random() * 10000);
        allDatasForRandomize.push(item);
        allDatasForRandomize.push(item.toLowerCase());
        allDatasForRandomize.push(item + randomizeNumber.toString());
        allDatasForRandomize.push(item.toLocaleLowerCase() + randomizeNumber.toString());
    });

    numbers.map(item => allDatasForRandomize.push(item.toString()));

    let randomizeData = [];

    for (let i = 0; i < 6; i++) {
        let min = Math.round(Math.random() * 10);
        let max = allDatasForRandomize.length - 1;
        let randomize = Math.round(min - 0.5 + Math.random() * (max - min + 1));
        randomizeData.push(allDatasForRandomize[randomize]);
    }
    return randomizeData.join('');
}
