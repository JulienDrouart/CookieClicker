var cookie = 0;
var cookiePerClick = 1;
var cookiePerSecond = 0;



var structures = {
    cursor: {
        number: 0,
        cost: 15,
        cps: 0.1
    },
    grandma: {
        number: 0,
        cost: 100,
        cps: 1
    },
    farm: {
        number: 0,
        cost: 500,
        cps: 4
    },
    mine: {
        number: 0,
        cost: 2000,
        cps: 10
    },
    factory: {
        number: 0,
        cost: 7000,
        cps: 40
    },
    bank: {
        number: 0,
        cost: 50000,
        cps: 100
    },
    temple: {
        number: 0,
        cost: 100000,
        cps: 400
    },
    wizardTower: {
        number: 0,
        cost: 330000,
        cps: 666
    },
    shipment: {
        number: 0,
        cost: 510000,
        cps: 1000
    },
    alchemyLab: {
        number: 0,
        cost: 750000,
        cps: 1600
    },
    portal: {
        number: 0,
        cost: 1000000,
        cps: 6666
    },
    timeMachine: {
        number: 0,
        cost: 123456789,
        cps: 9876
    },
    antimatterCondenser: {
        number: 0,
        cost: 3999999999,
        cps: 99999
    },
    prism: {
        number: 0,
        cost: 75000000000,
        cps: 1000000
    },
    chancemaker: {
        number: 0,
        cost: 777777777777,
        cps: 7777777
    },
    fractalEngine: {
        number: 0,
        cost: 1234567890123,
        cps: 9876543
    },
    javascriptConsole: {
        number: 0,
        cost: 15000000000000,
        cps: 15000000
    },
    idleverse: {
        number: 0,
        cost: 210000000000000,
        cps: 210000000
    },
};

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

$(document).ready(function() {
    // Code to execute when the page is fully loaded
    majAth
});

setInterval(function() {
    cookiePerSecond = 0;
    for (var structure in structures) {
        cookiePerSecond += structures[structure].number * structures[structure].cps;
    }
    cookie += cookiePerSecond;
    majAth();
}, 1000);

function clickCookie() {
    cookie += cookiePerClick;
    majAth();
}

function majAth()
{
    $('#NbCookies').text(cookie.toFixed(1));
    $('#cookiePerSecond').text(cookiePerSecond.toFixed(1));
    
    for (var structure in structures) {
        $('#'+structure+'Cost').text(structures[structure].cost);
        $('#Nb' + structure.charAt(0).toUpperCase() + structure.slice(1)).text(structures[structure].number);
        console.log()
        $('#' + structure + 'CPS').text((structures[structure].cps).toFixed(1));
    }

    for(var perk in perks) {
        if(perks[perk].condition() && !perks[perk].visible) {
            var perkButton = $('<button class="col-2 perk btn" data-perk="' + perk + '" title="' + perks[perk].description + '">' + perks[perk].name + ' (' + perks[perk].cost + ' cookies)</button>');
            perkButton.on('click', function() {
                buyPerk(perk);
            });
            if (cookie >= perks[perk].cost) {
                perkButton.addClass('btn-success');
            } else {
                perkButton.addClass('btn-danger');
            }
            $('#bonusList').append(perkButton);
            perks[perk].visible = true;
        }
    }

    buyButtonColor();
    buyPerkColor();
}

function buyPerk(perkName)
{
    cookie -= perks[perkName].cost;
    perks[perkName].effect();
    perks[perkName].active = true;
    $('button[data-perk="' + perkName + '"]').remove();
    majAth();
}

function buyStructures(structureName)
{
    if (cookie >= structures[structureName].cost)
    {
        cookie -= structures[structureName].cost;
        structures[structureName].number++;
        cookiePerSecond += structures[structureName].cps;
        structures[structureName].cost = Math.ceil(structures[structureName].cost * 1.15);
        majAth();
    }
}

function sellStructures(structureName)
{

}

function buyButtonColor()
{
    $('.buyStructure').each(function() {
        var structureName = $(this).data('structure');
        if (cookie >= structures[structureName].cost) {
            $(this).addClass('btn-success');
            $(this).removeClass('btn-danger');
            $(this).prop('disabled', false);
        } else {
            $(this).addClass('btn-danger');
            $(this).removeClass('btn-success');
            $(this).prop('disabled', true);
        }
    });
}

function buyPerkColor()
{
    $('.perk').each(function() {
        var perkName = $(this).data('perk');
        if (cookie >= perks[perkName].cost) {
            $(this).addClass('btn-success');
            $(this).removeClass('btn-danger');
            $(this).prop('disabled', false);
        } else {
            $(this).addClass('btn-danger');
            $(this).removeClass('btn-success');
            $(this).prop('disabled', true);
        }
    });
}