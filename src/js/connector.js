console.log('Hello world!');

window.TrelloPowerUp.initialize({
    'card-badges': function(t, opts) {
        //retun an arrray of card badges for the given card
        return t.card('all')
        .then(function(card){
            console.log(card);
            return [{
                text: card.idShort
            }]
        })
    }
});