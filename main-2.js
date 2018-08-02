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

function Pizza (ingredientsList, ingredientsPrice) {
    let ingredients = ingredientsList;
    let price = ingredientsPrice;
    this.getPrice = function() {
        return price;
    };
    this.getIngredients = function() {
        return ingredients;
    }
}

function Shelf () {
    this.pizzaData = [];
    this.filterData();
}

Shelf.prototype.getIngredientsSet = function() {
    let notUsedIngredients = this.pizzaData.slice();
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

Shelf.prototype.filterData = function() {
    endpoint1['ingredients'].forEach(function(elem) {
        if (elem['price'].substr( elem['price'].length - 1) === '£') {
            var newPrice = +elem['price'].slice(0, -1) * 3;
        }
        this.pizzaData.push({
            id:  elem['id'],
            name:  elem['name'],
            price:  newPrice || Number(elem['price'].slice(0, -1))
        });
    }, this);

    Object.keys(endpoint2).forEach(function(elem) {
        if (endpoint2[elem]['currency']- 1 === '£') {
            var newPrice = +endpoint2[elem]['price'] * 3;
        }

        this.pizzaData.push({
            id: endpoint2[elem]['id'],
            name: elem,
            price: newPrice || +endpoint2[elem]['price']
        });
    }, this);

    endpoint3['data'].forEach(function(elem) {
        let newItem= {};
        elem['ingredient'].forEach(function(item) {
            switch(item['key']) {
                case 'Id':
                    newItem['id'] = Number(item['value']);
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

        this.pizzaData.push(newItem);
    }, this);
};

function PizzasStore () {
    this.createdPizzas = [];
    this.createFivePizzas();
}

PizzasStore.prototype.createPizza = function () {
    let ingredientsData = this.shelf.getIngredientsSet();
    let newPizza = new Pizza(ingredientsData['ingredients'], ingredientsData['price']);
    this.createdPizzas.push(newPizza);
};

PizzasStore.prototype.createFivePizzas = function() {
    for (let i = 0; i < 5; i++) {
        this.createPizza();
    }
};

PizzasStore.prototype.getBiggestPrice = function () {
    let biggestPrice = 0;

    for (var i = 0; i < this.createdPizzas.length; i++) {
        if (biggestPrice < this.createdPizzas[i].getPrice()) {
            biggestPrice = this.createdPizzas[i].getPrice();
        }
    }

    console.log('the most expensive pizza' + biggestPrice);
    return biggestPrice;
};

PizzasStore.prototype.getPopularIngredients = function() {
    let topIngredients = [];
    let usedIngredient = {};
    let usedIngredientsArr = [];

    this.createdPizzas.forEach (function(elem) {
        let curPizza = elem.getIngredients();
        curPizza.map(function(ingredient) {
            if (ingredient in usedIngredient) {
                usedIngredient[ingredient] = usedIngredient[ingredient ]+ 1;
            } else {
                usedIngredient[ingredient] = 1;
            }
        });
    });

    Object.keys(usedIngredient).map(function (elem, i) {
        usedIngredientsArr.push({name: elem, count: Object.values(usedIngredient)[i]});
    });

    usedIngredientsArr.reduce(function(topIngredient, curIngredient){
        if (curIngredient.count > topIngredient.count) {
            topIngredients.length = 0;
            topIngredients.push(curIngredient);
            return curIngredient;
        } else if (curIngredient.count === topIngredient.count) {
            topIngredients.push(curIngredient);
            return topIngredient;
        } else if (topIngredients.length === 0) {
            topIngredients.push(topIngredient);
            return topIngredient;
        } else {
            return topIngredient;
        }
    });

    console.log('top ingredients ' + topIngredients)
};

PizzasStore.prototype.shelf = new Shelf();

let pizzaStore = new PizzasStore();

pizzaStore.getBiggestPrice();
pizzaStore.getPopularIngredients();
