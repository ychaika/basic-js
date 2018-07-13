"use strict";

var endpoint1 = {
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

var endpoint2 = {
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

var endpoint3 = {
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

var Shelf = {
    pizzaData: [],
    createPizza: function() {

    }
};

(function () {
    var pizzaData = [];


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

    Shelf.pizzaData = pizzaData;

})();



function Pizza () {
    var curPizza;
    var makePizza = (function() {

    })();

    this.getIng = function() {

    };
};


// var pizza1 = new Pizza();

var PizzasStore = {
    topIng: '',
    topPrice: 0,
    readyPizza: []
};
