$(document).ready(function () {
  $("#teamStandingsBtn").click(function () {
    $.ajax({
      url: "https://f1-api.vercel.app/api/teams",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var standingsHTML = "<h2>Team Standings</h2>";
        $.each(data, function (index, team) {
          standingsHTML += '<div class="team-info">';
          standingsHTML += "<h3>" + team.name + "</h3>";
          standingsHTML += "<p>Rank: " + team.rank + "</p>";
          standingsHTML += "<p>Points: " + team.points + "</p>";
          standingsHTML +=
            '<img src="' +
            team["logo-small"] +
            '" alt="' +
            team.name +
            ' Logo" class="team-logo">';
          standingsHTML +=
            '<img src="' +
            team["image-car"] +
            '" alt="' +
            team.name +
            ' Car" class="car-image">';
          standingsHTML += "</div>";
        });
        $("#teamStandingsContainer").html(standingsHTML);
        $("#carouselExampleControls").hide(); // Hide the carousel
      },
    });
  });
});

