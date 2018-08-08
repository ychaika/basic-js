let names = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Kevin De Bruyne', 'Harry Kane', 'Luka Modric', 'Robert Lewandowski', 'Kylian Mbappé', 'Toni Kroos', 'Eden Hazard', 'Sergio Ramos', 'Isco', 'Edinson Cavani', 'Paulo Dybala', 'Luis Suárez', 'Gianluigi Buffon', 'N\'Golo Kanté', 'Antoine Griezmann', 'Marcelo', 'Sergio Agüero', 'Pierre-Emerick Aubameyang', 'Mohamed Salah', 'David de Gea', 'Philippe Coutinho', 'Christian Eriksen', 'Dani Alves', 'Dries Mertens', 'Casemiro', 'Andrés Iniesta', 'Paul Pogba', 'Dele Alli', 'Alexis Sánchez', 'Mauro Icardi', 'Gonzalo Higuaín', 'Jan Oblak', 'Sadio Mané', 'Romelu Lukaku', 'David Silva', 'Gabriel Jesus', 'Manuel Neuer', 'Radamel Falcao', 'Marco Asensio', 'Edin Dzeko', 'Lorenzo Insigne', 'Leonardo Bonucci', 'Sergio Busquets', 'Marco Verratti', 'Álvaro Morata', 'Thiago Alcântara', 'Gareth Bale'];
let roles = ['goalkeeper', 'defender', 'midfield', 'forward'];

interface Parameters {
    name: string,
    height: number,
    weight: number,
    age: number,
    speed: number,
    stamina: number
}

interface Skills {
    pass: number,
    kick: number
}

interface Role {
    role: string
}

interface ExtraSkill {
    extraSkill: string
}

class Player {
    public parameters: Parameters;
    public skills: Skills;
    public role: Role;
    public extraSkill: ExtraSkill;
    public rating: number;
    public playerNumber: number;

    constructor (parameters: Parameters, skills: Skills, role: Role, extraSkill: ExtraSkill) {
        this.parameters = parameters;
        this.skills = skills;
        this.role = role;
        this.extraSkill = extraSkill;
    }
}

class Market {
    public players: Array<Player>;

    constructor() {
        this.generatePlayers();
        this.generatePlayersRating();
    }

    private generatePlayers = () => {
        this.players = names.map( (playerName):Player => {
            return this.generatePlayer(playerName);
        });

    };
    private generatePlayer = (playerName: string):Player => {
        let parameters = this.createParameters(playerName);
        let skills = this.generateSkills();
        let role = this.pickRole();
        let extraSkill = this.getExtraSkill(role.role);

        return new Player(parameters, skills, role, extraSkill);
    };
    private createParameters = (playerName: string):Parameters => {
        return {
            name: playerName,
            height: Math.floor(Math.random() * (195 - 160 + 1)) + 160,
            weight: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
            age: Math.floor(Math.random() * (40 - 17 + 1)) + 17,
            speed: Math.floor(Math.random() * (35 - 25 + 1)) + 25,
            stamina: Math.floor(Math.random() * (100 - 70 + 1)) + 70
        };
    };
    private generateSkills = ():Skills => {
        return {
            pass: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
            kick: Math.floor(Math.random() * (100 - 60 + 1)) + 60
        };
    };
    private pickRole = ():Role => {
        return {
            role: roles[Math.floor(Math.random()*4)]
        };
    };
    private getExtraSkill = (role: string):ExtraSkill => {
        switch (role) {
            case 'Goalkeeper':
                return {extraSkill: 'Saving strikes on goal'};
            case 'Defender':
                return {extraSkill: 'Defend zone'};
            case 'Midfield':
                return {extraSkill: 'Start the attack'};
            case 'Forward':
                return {extraSkill: 'Score goal'};
        }
    };
    private generatePlayersRating = ():void => {
        this.players.map((player: Player) => {
            let ageRating = this.getAgeRating(player.parameters.age);
            let speedRating = this.getOtherRating(player.parameters.speed, 35, 25);
            let staminaRating = this.getOtherRating(player.parameters.stamina, 100, 70);

            player.rating = Math.round((ageRating + speedRating + staminaRating) / 3);
        });


    };
    private getAgeRating = (curAge: number):number => {
        let maxAge = 40;
        let minAge = 17;
        let ageInterval = maxAge - minAge;
        let ageDifference = maxAge - curAge;

        return 100 / ageInterval * ageDifference;
    };
    private getOtherRating = (value: number, max: number, min: number):number => {
        let interval = max - min;
        let difference = value - min;

        return 100 / interval * difference;
    };
}

class Coach {
    public coachName: string;
    public market: Market;
    public team: Array<Player>;

    constructor(coachName: string) {
        this.coachName = coachName;
        this.market = new Market();
        this.team = [];
        this.createTeam();
        this.showPlayersList();
    }

    public createTeam = ():void => {
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

    public getPlayers = (playersCount: number, playersRole?: string):void => {
        let players = playersCount;
        let role = playersRole;

        for (let i = 0; i < players; i++) {
            let bestPlayerIndex = 0;

            if (playersRole) {
                this.market.players.reduce((topPlayer, curPlayer, index: number) => {
                    if (curPlayer.role.role === role  && topPlayer.role.role === role && curPlayer.rating >= topPlayer.rating
                        || topPlayer.role.role !== role && curPlayer.role.role === role) {
                        bestPlayerIndex = index;
                        return curPlayer;
                    } else {
                        return topPlayer;
                    }
                });
            } else {
                this.market.players.reduce((topPlayer, curPlayer, index) => {
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

    public setNumber = (playerIndex: number):void => {
        let newNumber =  null;
        let usedNumbers = this.team.map((elem) => elem.playerNumber);

        while (newNumber == null || usedNumbers.indexOf(newNumber) > 0) {
            newNumber = Math.floor((Math.random() * 99) + 1);
        }

        usedNumbers.push(newNumber);
        this.market.players[playerIndex].playerNumber = newNumber;
    };

    public showPlayersList = ():void => {
        this.team.map((elem) => {
            console.log(elem.parameters.name + ' - ' + elem.playerNumber);
        });
    };
}

let newTeam = new Coach('den');