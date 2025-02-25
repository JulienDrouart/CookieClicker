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

$(document).ready(function() {
    // Code to execute when the page is fully loaded
    majAth
});

setInterval(function() {
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
    }

    buyButtonColor();
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