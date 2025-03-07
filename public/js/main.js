var cookie = 0;
var cookiePerClick = 1;
var cookiePerSecond = 0;







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
    sellStructuresColor();
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
    if (structures[structureName].number > 0)
    {
        cookie += Math.ceil(structures[structureName].cost * 0.25);
        structures[structureName].number--;
        cookiePerSecond -= structures[structureName].cps;
        structures[structureName].cost = Math.ceil(structures[structureName].cost / 1.15);
        majAth();
    }

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

function sellStructuresColor()
{
    $('.sellStructure').each(function() {
        var structureName = $(this).data('structure');
        if (structures[structureName].number > 0) {
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