import fetch from 'isomorphic-fetch';

// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch is pre-installed.
// remember that fetch uses promises.

// step 2: implement the view and required behaviors

let pizzaObj = {
    data: [],
    filteredData: [],
    filterInput: document.querySelector('.filter-input'),
    sortBtn: document.querySelector('.pizza-btn--sort'),
    reverseBtn: document.querySelector('.pizza-btn--reverse'),
    pizzaItems: () => {
        fetch('./pizza.json')
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => {
            pizzaObj.data = data.pizzas;
            console.log(this);
            pizzaObj.renderPizzaItems(data.pizzas);
            // setTimeout(()=>{
            //     console.log(data);
            //   renderListItems(data);
            // },1000);
        });
    },
    renderPizzaItems: (data) => {
        const itemElement = document.querySelector('.pizza-list');
        pizzaObj.filteredData = data;
        var itemslist = '<ul class="pizza-list-group">';
        const len = data.length;
        for(let i=0;i<len; i++){
            itemslist += '<li class="pizza-list-item">' + data[i] + '</li>';
        }
        itemslist += '</ul>';
        itemElement.innerHTML = itemslist;
    },
    filterItems: function(value) {
        const data = this.data;
        const filteredList = data.filter((item) => {
            return item.toLowerCase().search(
                value.toLowerCase()) == 0;
        });
        this.renderPizzaItems(filteredList); 
    },
    sortItems: function() {
        const data = pizzaObj.filteredData.sort();
        this.renderPizzaItems(data); 
    },
    reverseItems: function() {
        const data = pizzaObj.filteredData.sort().reverse();
        this.renderPizzaItems(data);
    }
}

 pizzaObj.pizzaItems();

  pizzaObj.filterInput.addEventListener("keyup", (e) => {
      console.log(this);
      pizzaObj.filterItems(e.target.value);
  });

  pizzaObj.sortBtn.addEventListener("click", () => pizzaObj.sortItems());

  pizzaObj.reverseBtn.addEventListener("click", () => pizzaObj.reverseItems());
