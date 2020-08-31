$(function () {

    $("button").on("click", function () {
        let stealth;

        switch ($(this).attr("id")) {
            case "stealth":
                stealth = ["Optional", "Forced"];

                break;
            case "either":
                stealth = ["Optional", "Forced", "Loud"];

                break;
            case "loud":
                stealth = ["Loud"];

                break;

            default:
                break;
        }

        $.getJSON("/assets/js/heists.json", function (heists_all) {
            let heists = [];
            $.each(heists_all, function (i, heist) {
                $.each(stealth, function (i, s) {
                    if (heist.stealth === s) {
                        heists.push(heist);
                    }
                });
            });

            let heist = heists[Math.floor(Math.random() * heists.length)];
            let border
            console.log(heist);
            if (heist.stealth === "Loud") {
                border = "danger";
            } else {
                border = "info";
            }

            $("#result").html(`
                <div class="card border-${border} mb-3 mx-auto" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${heist.name}</h5>
                        <p class="card-text">${heist.contractor}</p>
                    </div>
                    ${(heist.stealth === "Loud") ? '<div class="card-footer">Loud</div>' : '<div class="card-footer"><span class="float-left">Stealth: ' + heist.stealth + '</span><span class="float-right">Bonus: ' + heist.bonus + '</span></div>'}
                    
                </div>
            `)
        });

    });




});