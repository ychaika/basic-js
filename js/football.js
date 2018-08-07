'use strict';

let names = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Kevin De Bruyne', 'Harry Kane', 'Luka Modric', 'Robert Lewandowski', 'Kylian Mbappé', 'Toni Kroos', 'Eden Hazard', 'Sergio Ramos', 'Isco', 'Edinson Cavani', 'Paulo Dybala', 'Luis Suárez', 'Gianluigi Buffon', 'N\'Golo Kanté', 'Antoine Griezmann', 'Marcelo', 'Sergio Agüero', 'Pierre-Emerick Aubameyang', 'Mohamed Salah', 'David de Gea', 'Philippe Coutinho', 'Christian Eriksen', 'Dani Alves', 'Dries Mertens', 'Casemiro', 'Andrés Iniesta', 'Paul Pogba', 'Dele Alli', 'Alexis Sánchez', 'Mauro Icardi', 'Gonzalo Higuaín', 'Jan Oblak', 'Sadio Mané', 'Romelu Lukaku', 'David Silva', 'Gabriel Jesus', 'Manuel Neuer', 'Radamel Falcao', 'Marco Asensio', 'Edin Dzeko', 'Lorenzo Insigne', 'Leonardo Bonucci', 'Sergio Busquets', 'Marco Verratti', 'Álvaro Morata', 'Thiago Alcântara', 'Gareth Bale'];

let roles = ['goalkeeper', 'defender', 'midfield', 'forward'];

function Player (parameters, skills, role, extraSkill) {
    this.parameters = parameters;
    this.skills = skills;
    this.role = role;
    this.extraSkill = extraSkill;
}

function Market () {
    this.players = [];
    this.generatePlayers();
    this.generatePlayersRating();
}

Market.prototype.generatePlayer = function (playerName) {
    let parameters = this.createParameters(playerName);
    let skills = this.generateSkills();
    let role = this.pickRole();
    let extraSkill = this.getExtraSkill(role.role);

    return new Player(parameters, skills, role, extraSkill);
};

Market.prototype.createParameters = function (playerName) {
    return {
        name: playerName,
        height: Math.floor(Math.random() * (195 - 160 + 1)) + 160,
        weight: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
        age: Math.floor(Math.random() * (40 - 17 + 1)) + 17,
        speed: Math.floor(Math.random() * (35 - 25 + 1)) + 25,
        stamina: Math.floor(Math.random() * (100 - 70 + 1)) + 70
    };
};

Market.prototype.generateSkills = function () {
  return {
      pass: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
      kick: Math.floor(Math.random() * (100 - 60 + 1)) + 60
  };
};

Market.prototype.pickRole = function () {
    return {
        role: roles[Math.floor(Math.random()*4)]
    };
};

Market.prototype.getExtraSkill = function (role) {
    let extraSkill = {};

    switch (role) {
        case 'Goalkeeper':
            extraSkill = {extraSkill: 'Saving strikes on goal'};
            break;
        case 'Defender':
            extraSkill = {extraSkill: 'Defend zone'};
            break;
        case 'Midfield':
            extraSkill = {extraSkill: 'Start the attack'};
            break;
        case 'Forward':
            extraSkill = {extraSkill: 'Score goal'};
            break;
    }

    return extraSkill;
};


Market.prototype.generatePlayers = function () {
    this.players = names.map(function (playerName) {
        return this.generatePlayer(playerName);
    }, this);

};

Market.prototype.generatePlayersRating  = function () {
    this.players.map(function (player) {
        let ageRating = getAgeRating(player.parameters.age);
        let speedRating = getOtherRating(player.parameters.speed, 35, 25);
        let staminaRating = getOtherRating(player.parameters.stamina, 100, 70);

        player['rating'] = Math.round((ageRating + speedRating + staminaRating) / 3);
    });

    function getAgeRating (curAge) {
        let maxAge = 40;
        let minAge = 17;
        let ageInterval = maxAge - minAge;
        let ageDifference = maxAge - curAge;

        return 100 / ageInterval * ageDifference;
    }
    function getOtherRating (value, max, min) {
        let interval = max - min;
        let difference = value - min;

        return 100 / interval * difference;
    }
};

function Coach (coachName) {
    this.coachName = coachName;
    this.team = [];

    this.createTeam();
    this.showPlayersList();
}

Coach.prototype.market = new Market();

Coach.prototype.createTeam = function () {
    let goalkeepers = {role: 'goalkeeper', count: 1};
    let defenders = {role: 'defender', count: 3};
    let midfields = {role: 'midfield', count: 3};
    let forwards = {role: 'forward', count: 2};
    let others = {count: 6};

    this.getPlayers(goalkeepers.count, goalkeepers.role);
    this.getPlayers(defenders.count, defenders.role);
    this.getPlayers(midfields.count, midfields.role);
    this.getPlayers(forwards.count, forwards.role);
    this.getPlayers(others.count);
};

Coach.prototype.getPlayers = function (playersCount, playersRole) {
    let players = playersCount;
    let role = playersRole;


    for (let i = 0; i < players; i++) {
        let bestPlayerIndex = 0;

        if (playersRole) {
            this.market.players.reduce(function (topPlayer, curPlayer, index) {
                if (curPlayer.role.role === role && topPlayer.role.role === role && curPlayer.rating >= topPlayer.rating || topPlayer.role.role !== role && curPlayer.role.role === role) {
                    bestPlayerIndex = index;
                    return curPlayer;
                } else {
                    return topPlayer;
                }
            });
        } else {
            this.market.players.reduce(function (topPlayer, curPlayer, index) {
                if (curPlayer.rating > topPlayer.rating) {
                    bestPlayerIndex = index;
                    return curPlayer;
                } else {
                    return topPlayer;
                }
            });
        }

        this.setNumber(bestPlayerIndex);
        this.team.push(this.market.players[bestPlayerIndex]);
        this.market.players.splice(bestPlayerIndex, 1);
    }
};

Coach.prototype.setNumber = function (playerIndex) {
    let newNumber =  0;
    let usedNumbers = this.team.map(function (elem) {
        return elem.number;
    });

    pickNumber();

    function pickNumber() {
        newNumber = Math.floor((Math.random() * 99) + 1);

        if (usedNumbers.indexOf(newNumber) > 0) {
            pickNumber();
        }
    }

    usedNumbers.push(newNumber);
    this.market.players[playerIndex].number = newNumber;
};

Coach.prototype.showPlayersList = function () {
    this.team.map(function (elem) {
        console.log(elem.parameters.name + ' - ' + elem.number);
    });
};

var newTeam = new Coach('Den');