const { getInputData } = require('../utils');

const inputFileName = '2023/2_cube-conundrum.txt';

const isGamePossible = (game, conditions) => {
    let isGamePossible = true;
    game.rounds.forEach((round) => {
        if (round.red > conditions.red || round.green > conditions.green || round.blue > conditions.blue) {
            isGamePossible = false;
        }
    });
    return isGamePossible;
};

const partOne = (data) => {
    const gamesData = data.split('\n');
    const games = gamesData.map((game) => {
        const id = parseInt(game.match(/Game (\d+):/)[1]);
        const rounds = game
            .match(/Game \d+: (.+?)(?=(Game \d+:|$))/)[1]
            .split(';')
            .map((round) => round.trim())
            .map((round) => {
                const matches = {
                    red: round.match(/(\d+) red.*?/),
                    green: round.match(/(\d+) green.*?/),
                    blue: round.match(/(\d+) blue.*?/),
                };
                const cubes = {
                    red: matches.red ? parseInt(matches.red[1]) : 0,
                    green: matches.green ? parseInt(matches.green[1]) : 0,
                    blue: matches.blue ? parseInt(matches.blue[1]) : 0,
                };
                return cubes;
            });

        return {
            id,
            rounds,
        };
    });
    const cubesInBag = {
        red: 12,
        green: 13,
        blue: 14,
    };
    const possibleGames = games.filter((game) => isGamePossible(game, cubesInBag));
    const possibleGamesIdsSum = possibleGames.reduce((acc, game) => acc + game.id, 0);
    return possibleGamesIdsSum;
};

const partTwo = (data) => {
    const gamesData = data.split('\n');
    const games = gamesData.map((game) => {
        const id = parseInt(game.match(/Game (\d+):/)[1]);
        const rounds = game
            .match(/Game \d+: (.+?)(?=(Game \d+:|$))/)[1]
            .split(';')
            .map((round) => round.trim())
            .map((round) => {
                const matches = {
                    red: round.match(/(\d+) red.*?/),
                    green: round.match(/(\d+) green.*?/),
                    blue: round.match(/(\d+) blue.*?/),
                };
                const cubes = {
                    red: matches.red ? parseInt(matches.red[1]) : 0,
                    green: matches.green ? parseInt(matches.green[1]) : 0,
                    blue: matches.blue ? parseInt(matches.blue[1]) : 0,
                };
                return cubes;
            });

        return {
            id,
            rounds,
        };
    });
    const maxCubesForGames = games.map((game) => {
        const maxCubesForGame = {
            red: 0,
            green: 0,
            blue: 0,
        };
        game.rounds.forEach((round) => {
            maxCubesForGame.red = round.red > maxCubesForGame.red ? round.red : maxCubesForGame.red;
            maxCubesForGame.green = round.green > maxCubesForGame.green ? round.green : maxCubesForGame.green;
            maxCubesForGame.blue = round.blue > maxCubesForGame.blue ? round.blue : maxCubesForGame.blue;
        });
        return maxCubesForGame;
    });
    const sumOfCubesMultiplied = maxCubesForGames
        .map((game) => game.red * game.green * game.blue)
        .reduce((acc, value) => acc + value, 0);
    return sumOfCubesMultiplied;
};

getInputData(inputFileName).then((data) => {
    console.log('Part 1: ', partOne(data));
    console.log('Part 2: ', partTwo(data));
});
