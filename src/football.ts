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

abstract class Player {
    public parameters: Parameters;
    public role: string;
    public rating: number;
    public playerNumber: number;

    protected constructor (parameters: Parameters, role: string) {
        this.parameters = parameters;
        this.role = role;
    }

    public kick () {
        console.log(this.parameters.name + ' did kick');
    }
    public pass () {
        console.log(this.parameters.name + ' did pass');
    }
    abstract extraSkill():void;
}

class Goalkeeper extends Player {
    constructor(parameters: Parameters, role:string) {
        super(parameters, role);
    }

    public extraSkill() {
        console.log(this.parameters.name + 'saving strikes on goal');
    }
}

class Defender extends Player {
    constructor(parameters: Parameters, role:string) {
        super(parameters, role);
    }

    public extraSkill() {
        console.log(this.parameters.name + 'defend zone');
    }
}
class Midfield extends Player {
    constructor(parameters: Parameters, role:string) {
        super(parameters, role);
    }

    public extraSkill() {
        console.log(this.parameters.name + 'start the attack');
    }
}
class Forward extends Player {
    constructor(parameters: Parameters, role:string) {
        super(parameters, role);
    }

    public extraSkill() {
        console.log(this.parameters.name + 'score goal');
    }
}

class Market {
    public players: Array<Player>;
    public numbers: Array<number>;

    constructor() {
        this.numbers = [];
        this.generatePlayers();
        this.generatePlayersRating();
    }

    private generatePlayers () {
        this.players = names.map((playerName) => {
            return this.generatePlayer(playerName);
        });

    };
    private generatePlayer (playerName: string):Player {
        let parameters = this.createParameters(playerName);
        let role = this.pickRole();
        switch (role) {
            case 'goalkeeper':
                return new Goalkeeper(parameters, role);
            case 'defender':
                return new Defender(parameters, role);
            case 'midfield':
                return new Midfield(parameters, role);
            case 'forward':
                return new Forward(parameters, role);
        }
    };
    private createParameters (playerName: string):Parameters {
        return {
            name: playerName,
            height: Math.floor(Math.random() * (195 - 160 + 1)) + 160,
            weight: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
            age: Math.floor(Math.random() * (40 - 17 + 1)) + 17,
            speed: Math.floor(Math.random() * (35 - 25 + 1)) + 25,
            stamina: Math.floor(Math.random() * (100 - 70 + 1)) + 70
        };
    };
    private pickRole () {
        return roles[Math.floor(Math.random()*4)];
    };

    private generatePlayersRating ():void {
        this.players.map((player) => {
            let ageRating = this.getAgeRating(player.parameters.age);
            let speedRating = this.getOtherRating(player.parameters.speed, 35, 25);
            let staminaRating = this.getOtherRating(player.parameters.stamina, 100, 70);

            player.rating = Math.round((ageRating + speedRating + staminaRating) / 3);
        });
    };
    private getAgeRating (curAge: number):number {
        let maxAge = 40;
        let minAge = 17;
        let ageInterval = maxAge - minAge;
        let ageDifference = maxAge - curAge;

        return 100 / ageInterval * ageDifference;
    };
    private getOtherRating (value: number, max: number, min: number):number {
        let interval = max - min;
        let difference = value - min;

        return 100 / interval * difference;
    };
}

class Coach {
    private static instance: Coach;
    public coachName: string;
    public market: Market;
    public team: Array<Player>;

    private constructor() {
        this.market = new Market();
        this.team = [];
        this.createTeam();
        this.showPlayersList();
    }

    public static getInstance():Coach {
        if (!Coach.instance) {
            Coach.instance = new Coach();
        }
        return Coach.instance;
    }
    public set newName(name: string) {
        this.coachName = name;
    }
    public createTeam ():void {
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

    public getPlayers (playersCount: number, playersRole?: string):void {
        let players = playersCount;
        let role = playersRole;

        for (let i = 0; i < players; i++) {
            let bestPlayerIndex = 0;

            if (playersRole) {
                this.market.players.reduce((topPlayer, curPlayer, index: number) => {
                    if (curPlayer.role === role  && topPlayer.role === role && curPlayer.rating >= topPlayer.rating
                        || topPlayer.role !== role && curPlayer.role === role) {
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

    public setNumber (playerIndex: number):void {
        let newNumber =  null;

        while (newNumber == null || this.market.numbers.indexOf(newNumber) > 0) {
            newNumber = Math.floor((Math.random() * 99) + 1);
        }

        this.market.numbers.push(newNumber);
        this.market.players[playerIndex].playerNumber = newNumber;
    };

    public showPlayersList = ():void => {
        this.team.forEach((elem) => {
            console.log(elem.parameters.name + ' - ' + elem.playerNumber);
        });
    };
}

let Den = Coach.getInstance();
Den.newName = 'Den';
console.log(Den.team[0]);
Den.team[0].extraSkill();
Den.team[0].kick();
Den.team[0].pass();
