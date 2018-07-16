"use strict";

const endpoint1 = {
    "ingredients": [
            {
            "id": 1,
            "name": "cheese",
            "price": "12$"
        },
        {
            "id": 2,
            "name": "meatballs",
            "price": "20$"
        },
        {
            "id": 3,
            "name": "potato",
            "price": "2£"
        }
    ]
};

const endpoint2 = {
    "parmesan": {
        "id": 123,
        "price": "10.00",
        "currency": "$"
    },
    "tomatos": {
        "id": 222,
        "price": "5.60",
        "currency": "$"
    },
    "salami": {
        "id": 124,
        "price": "22.00",
        "currency": "£"
    }
};

const endpoint3 = {
    "data": [
        {
            "ingredient": [
                {
                    "key": "Name",
                    "value": "Fish"
                },
                {
                    "key": "Id",
                    "value": "15"
                },
                {
                    "key": "Price",
                    "value": "22.2$"
                }
            ]
        },
        {
            "ingredient": [
                {
                    "key": "Name",
                    "value": "Crab"
                },
                {
                    "key": "Id",
                    "value": "16"
                },
                {
                    "key": "Price",
                    "value": "50.00$"
                }
            ]
        },
        {
            "ingredient": [
                {
                    "key": "Name",
                    "value": "Prawns"
                },
                {
                    "key": "Id",
                    "value": "17"
                },
                {
                    "key": "Price",
                    "value": "33.3$"
                }
            ]
        }
    ]
};


function Pizza () {
    this.ing = [];
    this.price = 0;
}


let PizzasStore = {
    topPrice: 0,
    usedIng: {},
    readyPizzas: {},
    getTopIng: function () {
        let topIng = [];
        let topIngNumber = 0;
        let usedIng = PizzasStore['usedIng'];
        for (let i = 0; i < Object.keys(usedIng).length; i++) {
            let curIng = usedIng[Object.keys(usedIng)[i]];
            if (topIng.length === 0) {
                topIng.push(Object.keys(usedIng)[i]);
                topIngNumber = curIng;
            } else if (curIng > topIngNumber) {
                topIng.length = 0;
                topIng.push(Object.keys(usedIng)[i]);
            } else if (curIng === topIngNumber) {
                topIng.push(Object.keys(usedIng)[i]);
            }
        }

        for (let j = 0; j < topIng.length; j++) {
            console.log(topIng[i]);
        }
    }
};


let Shelf =  function() {
    let pizzaData = [];

    this.createPizzas = function () {
        let higherPrice = 0;
        let usedIng = {};
        for (let i = 0; i < 5; i++) {
            let newPizza = ('Pizza' + (i + 1));
            let ingNumber = Math.floor(Math.random() * 4 + 3);
            let curPrice = 0;
            let curIng = [];
            let usedPizzaData = pizzaData.slice();
            for (let j = 0; j < ingNumber; j++) {
                let useIng = Math.floor(Math.random() * usedPizzaData.length);
                curIng.push(usedPizzaData[useIng]['name']);
                curPrice = curPrice + usedPizzaData[useIng]['price'];
                if (usedPizzaData[useIng]['name'] in usedIng) {
                    usedIng[usedPizzaData[useIng]['name']] = usedIng[usedPizzaData[useIng]['name']] + 1;
                } else {
                    usedIng[usedPizzaData[useIng]['name']] = 1;
                }
                usedPizzaData.splice(useIng, 1);
            }
            window.newPizza = new Pizza();
            window.newPizza.price = curPrice;
            if (higherPrice < curPrice) higherPrice = curPrice;
            window.newPizza.ing = curIng;
            PizzasStore['readyPizzas'][newPizza] = (window.newPizza);
        }
        PizzasStore['topPrice'] = higherPrice;
        PizzasStore['usedIng'] = usedIng;
    };

    this.filterPizzaData = function() {
        endpoint1['ingredients'].forEach(function(elem) {
            if (elem['price'].substr( elem['price'].length - 1) === '£') {
                var newPrice = +elem['price'].slice(0, -1) * 3;
            }
            pizzaData.push({
                id:  elem['id'],
                name:  elem['name'],
                price:  newPrice || +elem['price'].slice(0, -1)
            });
        });

        Object.keys(endpoint2).forEach(function(elem) {
            if (endpoint2[elem]['currency'].substr(endpoint2[elem]['currency'].length - 1) === '£') {
                var newPrice = +endpoint2[elem]['price'].slice(0, -1) * 3;
            }

            pizzaData.push({
                id: endpoint2[elem]['id'],
                name: elem,
                price: newPrice || +endpoint2[elem]['price']
            });
        });

        endpoint3['data'].forEach(function(elem) {
            let newItem= {};
            elem['ingredient'].forEach(function(item) {
                switch(item['key']) {
                    case 'Id':
                        newItem['id'] = +item['value'];
                        break;
                    case 'Name':
                        newItem['name'] = item['value'];
                        break;
                    case 'Price':
                        if (item['value'].substr(item['value'].length - 1) === '£') {
                            return newItem['price'] = +item['value'].slice(0, -1) * 3;
                        }
                        return newItem['price'] = +item['value'].slice(0, -1);
                    default:
                        throw new Error('error in endpoint3 data');
                }
            });

            pizzaData.push(newItem);
        });
    };
};

let shelf = new Shelf();
shelf.filterPizzaData();
shelf.createPizzas();
