$(document).ready(function () {
  $("#teamStandingsBtn").click(function () {
    $.ajax({
      url: "https://f1-api.vercel.app/api/teams",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let standingsHTML = '<div class="container">';
        standingsHTML += '<h1 class="mt-4 text-center">Teams Standings</h1>';
        $.each(data, function (index, team) {
          standingsHTML += '<div class="row team-info shadow border p-3 mb-4 rounded border-secondary ">';
          standingsHTML += '<div class="col-md-6">';
          standingsHTML += '<h2 class="mt-3 ">' + team.rank + "</h2>";
          standingsHTML += '<h3 class="mt-4 " >' + team.name + "</h3>";
          standingsHTML += '<h3 class="mt-3 ">' + team.points + " PTS</h3>";
          standingsHTML += "</div>";
          standingsHTML += '<div class="col-md-6 rounded ">';
          standingsHTML +=
            '<img style="max-width:20%;" src="' +
            team["logo-small"] +
            '" alt="' +
            team.name +
            ' Logo" class="team-logo img-fluid float-right">';
          standingsHTML +=
            '<img  src="' +
            team["image-car"] +
            '" alt="' +
            team.name +
            ' Car" class="car-image img-fluid">';
          standingsHTML += "</div>";
          standingsHTML += "</div>"; 
        });
        standingsHTML += "</div>"; 
        $("#teamStandingsContainer").html(standingsHTML);
        $("#carouselExampleControls").hide();
        $("#title").hide(); 
      },
    });
  });
});
