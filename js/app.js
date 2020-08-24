(function($, Vue) {
    'use strict';

    //var url = 'http://localhost/poslaravel/';

    new Vue({
        el: '#pos',
        data: {
            items: [],
            lineItems: [],
            searchQuery:null,
        },
        created: function() {
            
            $.get('items.json', function(items) {
                this.items = items;
            }.bind(this), 'json');
            
        },
        methods: {
            onItemClick: function(item) {
                //console.log(item);
                var found = false;
        
                for (var i = 0; i < this.lineItems.length; i++) {
                    if (this.lineItems[i].item === item) {
                        this.lineItems[i].numberOfItems++;
                        found = true;
                        break;
                    }
                }
        
                if (!found) {
                    this.lineItems.push({ item: item, numberOfItems: 1, editing: false });
                }
            },

            toggleEdit: function(lineItem) {
                lineItem.editing = !lineItem.editing;
            },
            removeItem: function(lineItem) {
                for (var i = 0; i < this.lineItems.length; i++) {
                    if (this.lineItems[i] === lineItem) {
                        this.lineItems.splice(i, 1);
                        break;
                    }
                }
            },

            search(){
                                
                
              if(this.searchQuery){

                  this.items.filter((i)=>{
                    if(i.code.toLowerCase() === this.searchQuery.toLowerCase()){
                        this.onItemClick(i);
                    }
                  });

                  

              }
            },

            roundToTwoDigitsAfterComma(floatNumber) {
                return parseFloat((Math.round(floatNumber * 100) / 100).toFixed(2));
            }
            
             
        },

        computed: {
            subtotal: function() {
                var subtotal = 0;

                this.lineItems.forEach(function(item) {
                    subtotal += item.item.price * item.numberOfItems;
                });

                return this.roundToTwoDigitsAfterComma(subtotal);
            },
            tax: function() {
                return this.roundToTwoDigitsAfterComma(this.subtotal * 0.065);
            },
            total: function() {
                return this.roundToTwoDigitsAfterComma(this.subtotal);
            },

            grandTotal: function(){
                return this.roundToTwoDigitsAfterComma(this.total + this.tax);

            }
            //searchcomputing
            /*filteredResources(){
              if(this.searchQuery){
                  return this.items.filter((i)=>{
                    return i.name.toLowerCase() == this.searchQuery.toLowerCase() ? i :null;
                  });
              }
            }*/

        }
    });

})(jQuery, Vue);