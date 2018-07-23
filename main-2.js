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

let Pizza = function (ingredientsList, ingredientsPrice) {
    let ingredients = ingredientsList;
    let price = ingredientsPrice;
    this.getPrice = function() {
        return price;
    };
    this.getIngredients = function() {
        return ingredients;
    }
}

let Shelf = function() {
    let pizzaData = [];

    this.getIngredientsSet = function() {
        let notUsedIngredients = pizzaData.slice();
        let ingredientsSet = [];
        let pizzaPrice = 0;
        let ingredientsNumber = Math.floor(Math.random() * 4 + 3);

        for (let i = 0; i < ingredientsNumber; i++) {
            let curIngredient = Math.floor(Math.random() * notUsedIngredients.length);
            ingredientsSet.push(notUsedIngredients[curIngredient]['name']);
            pizzaPrice = pizzaPrice + notUsedIngredients[curIngredient]['price'];
            notUsedIngredients.splice(curIngredient, 1);
        }

        return {price: pizzaPrice, ingredients: ingredientsSet};
    };
    this.filterData = (function (){
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
    })(this);
};

let PizzasStore =  function() {
    let createdPizzas = [];
    let that = this;

    this.createPizza =  function () {
        let ingredientsData = this.shelf.getIngredientsSet();
        let newPizza = new Pizza(ingredientsData['ingredients'], ingredientsData['price']);
        createdPizzas.push(newPizza);
    };
    this.createFivePizzas = (function() {
        for (let i = 0; i < 5; i++) {
            that.createPizza();
        }
    })(that);

    this.getBiggestPrice = function () {
        let biggestPrice = 0;

        for (var i = 0; i < createdPizzas.length; i++) {
            if (biggestPrice < createdPizzas[i].getPrice()) {
                biggestPrice = createdPizzas[i].getPrice();
            }
        }
        return biggestPrice;
    };
    this.getPopularIngredients = function () {
        let topIng = [];
        let topIngNumber = 0;
        let usedIng = {};

        for (var i = 0; i < createdPizzas.length; i++) {
            let curPizza = createdPizzas[i].getIngredients();
            for (var j = 0; j < curPizza.length; j++) {
                if (curPizza[j] in usedIng) {
                    usedIng[curPizza[j]] = usedIng[curPizza[j]] + 1;
                } else {
                    usedIng[curPizza[j]] = 1;
                }
            }
        }

        for (let i = 0; i < Object.keys(usedIng).length; i++) {
            let curIng = usedIng[Object.keys(usedIng)[i]];
            if (topIng.length === 0) {
                topIng.push(Object.keys(usedIng)[i]);
                topIngNumber = curIng;
            } else if (curIng > topIngNumber) {
                topIng.length = 0;
                topIng.push(Object.keys(usedIng)[i]);
                topIngNumber = curIng;
            } else if (curIng === topIngNumber) {
                topIng.push(Object.keys(usedIng)[i]);
            }
        }

        for (let j = 0; j < topIng.length; j++) {
            console.log(topIng[j]);
        }

    };
    this.getCreatedPizzas = function () {
        return createdPizzas;
    };
};

PizzasStore.prototype.shelf = new Shelf();

let pizzaStore = new PizzasStore();

pizzaStore.getBiggestPrice();
pizzaStore.getPopularIngredients();
