var perks = {
    betterCusor1 : {
        cost: 100,
        cps: 0.1,
        condition : function() {
            return structures.cursor.number >= 2;
        },
        visible: false,
        active: false,
        name: 'Better Cursor 1',
        description: 'Curseur plus efficace, cps +0.1 chacun',
        effect : function() {
            structures.cursor.cps += this.cps;
        }
    }
}