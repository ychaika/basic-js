var names = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Kevin De Bruyne', 'Harry Kane', 'Luka Modric', 'Robert Lewandowski', 'Kylian Mbappé', 'Toni Kroos', 'Eden Hazard', 'Sergio Ramos', 'Isco', 'Edinson Cavani', 'Paulo Dybala', 'Luis Suárez', 'Gianluigi Buffon', 'N\'Golo Kanté', 'Antoine Griezmann', 'Marcelo', 'Sergio Agüero', 'Pierre-Emerick Aubameyang', 'Mohamed Salah', 'David de Gea', 'Philippe Coutinho', 'Christian Eriksen', 'Dani Alves', 'Dries Mertens', 'Casemiro', 'Andrés Iniesta', 'Paul Pogba', 'Dele Alli', 'Alexis Sánchez', 'Mauro Icardi', 'Gonzalo Higuaín', 'Jan Oblak', 'Sadio Mané', 'Romelu Lukaku', 'David Silva', 'Gabriel Jesus', 'Manuel Neuer', 'Radamel Falcao', 'Marco Asensio', 'Edin Dzeko', 'Lorenzo Insigne', 'Leonardo Bonucci', 'Sergio Busquets', 'Marco Verratti', 'Álvaro Morata', 'Thiago Alcântara', 'Gareth Bale'];
var roles = ['goalkeeper', 'defender', 'midfield', 'forward'];
var Player = /** @class */ (function () {
    function Player(parameters, skills, role, extraSkill) {
        this.parameters = parameters;
        this.skills = skills;
        this.role = role;
        this.extraSkill = extraSkill;
    }
    return Player;
}());
var Market = /** @class */ (function () {
    function Market() {
        var _this = this;
        this.generatePlayers = function () {
            _this.players = names.map(function (playerName) {
                return _this.generatePlayer(playerName);
            });
        };
        this.generatePlayer = function (playerName) {
            var parameters = _this.createParameters(playerName);
            var skills = _this.generateSkills();
            var role = _this.pickRole();
            var extraSkill = _this.getExtraSkill(role.role);
            return new Player(parameters, skills, role, extraSkill);
        };
        this.createParameters = function (playerName) {
            return {
                name: playerName,
                height: Math.floor(Math.random() * (195 - 160 + 1)) + 160,
                weight: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
                age: Math.floor(Math.random() * (40 - 17 + 1)) + 17,
                speed: Math.floor(Math.random() * (35 - 25 + 1)) + 25,
                stamina: Math.floor(Math.random() * (100 - 70 + 1)) + 70
            };
        };
        this.generateSkills = function () {
            return {
                pass: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
                kick: Math.floor(Math.random() * (100 - 60 + 1)) + 60
            };
        };
        this.pickRole = function () {
            return {
                role: roles[Math.floor(Math.random() * 4)]
            };
        };
        this.getExtraSkill = function (role) {
            switch (role) {
                case 'Goalkeeper':
                    return { extraSkill: 'Saving strikes on goal' };
                case 'Defender':
                    return { extraSkill: 'Defend zone' };
                case 'Midfield':
                    return { extraSkill: 'Start the attack' };
                case 'Forward':
                    return { extraSkill: 'Score goal' };
            }
        };
        this.generatePlayersRating = function () {
            _this.players.map(function (player) {
                var ageRating = _this.getAgeRating(player.parameters.age);
                var speedRating = _this.getOtherRating(player.parameters.speed, 35, 25);
                var staminaRating = _this.getOtherRating(player.parameters.stamina, 100, 70);
                player.rating = Math.round((ageRating + speedRating + staminaRating) / 3);
            });
        };
        this.getAgeRating = function (curAge) {
            var maxAge = 40;
            var minAge = 17;
            var ageInterval = maxAge - minAge;
            var ageDifference = maxAge - curAge;
            return 100 / ageInterval * ageDifference;
        };
        this.getOtherRating = function (value, max, min) {
            var interval = max - min;
            var difference = value - min;
            return 100 / interval * difference;
        };
        this.generatePlayers();
        this.generatePlayersRating();
    }
    return Market;
}());
var Coach = /** @class */ (function () {
    function Coach(coachName) {
        var _this = this;
        this.createTeam = function () {
            var goalkeepers = { role: 'goalkeeper', count: 1 };
            var defenders = { role: 'defender', count: 3 };
            var midfields = { role: 'midfield', count: 3 };
            var forwards = { role: 'forward', count: 2 };
            var others = { count: 6 };
            _this.getPlayers(goalkeepers.count, goalkeepers.role);
            _this.getPlayers(defenders.count, defenders.role);
            _this.getPlayers(midfields.count, midfields.role);
            _this.getPlayers(forwards.count, forwards.role);
            _this.getPlayers(others.count);
        };
        this.getPlayers = function (playersCount, playersRole) {
            var players = playersCount;
            var role = playersRole;
            var _loop_1 = function (i) {
                var bestPlayerIndex = 0;
                if (playersRole) {
                    _this.market.players.reduce(function (topPlayer, curPlayer, index) {
                        if (curPlayer.role.role === role && topPlayer.role.role === role && curPlayer.rating >= topPlayer.rating
                            || topPlayer.role.role !== role && curPlayer.role.role === role) {
                            bestPlayerIndex = index;
                            return curPlayer;
                        }
                        else {
                            return topPlayer;
                        }
                    });
                }
                else {
                    _this.market.players.reduce(function (topPlayer, curPlayer, index) {
                        if (curPlayer.rating > topPlayer.rating) {
                            bestPlayerIndex = index;
                            return curPlayer;
                        }
                        else {
                            return topPlayer;
                        }
                    });
                }
                _this.setNumber(bestPlayerIndex);
                _this.team.push(_this.market.players[bestPlayerIndex]);
                _this.market.players.splice(bestPlayerIndex, 1);
            };
            for (var i = 0; i < players; i++) {
                _loop_1(i);
            }
        };
        this.setNumber = function (playerIndex) {
            var newNumber = null;
            var usedNumbers = _this.team.map(function (elem) { return elem.playerNumber; });
            while (newNumber == null || usedNumbers.indexOf(newNumber) > 0) {
                newNumber = Math.floor((Math.random() * 99) + 1);
            }
            usedNumbers.push(newNumber);
            _this.market.players[playerIndex].playerNumber = newNumber;
        };
        this.showPlayersList = function () {
            _this.team.map(function (elem) {
                console.log(elem.parameters.name + ' - ' + elem.playerNumber);
            });
        };
        this.coachName = coachName;
        this.market = new Market();
        this.team = [];
        this.createTeam();
        this.showPlayersList();
    }
    return Coach;
}());
var newTeam = new Coach('den');
