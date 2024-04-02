// // const standingsList = document.getElementById('standingsList');

// // const standingsData = [
// //     {
// //       "id": 0,
// //       "rank": "1",
// //       "points": "97",
// //       "color": "#3671C6",
// //       "name": "Red Bull Racing",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 1,
// //       "rank": "2",
// //       "points": "93",
// //       "color": "#E80020",
// //       "name": "Ferrari",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/ferrari.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 2,
// //       "rank": "3",
// //       "points": "55",
// //       "color": "#FF8000",
// //       "name": "McLaren",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mclaren.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 3,
// //       "rank": "4",
// //       "points": "26",
// //       "color": "#27F4D2",
// //       "name": "Mercedes",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mercedes.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 4,
// //       "rank": "5",
// //       "points": "25",
// //       "color": "#229971",
// //       "name": "Aston Martin",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/aston-martin.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 5,
// //       "rank": "6",
// //       "points": "6",
// //       "color": "#6692FF",
// //       "name": "RB",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/rb.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 6,
// //       "rank": "7",
// //       "points": "4",
// //       "color": "#B6BABD",
// //       "name": "Haas F1 Team",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/haas-f1-team.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 7,
// //       "rank": "8",
// //       "points": "0",
// //       "color": "#64C4FF",
// //       "name": "Williams",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/williams.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 8,
// //       "rank": "9",
// //       "points": "0",
// //       "color": "#52e252",
// //       "name": "Kick Sauber",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/kick-sauber.png.transform/4col/image.png"
// //     },
// //     {
// //       "id": 9,
// //       "rank": "10",
// //       "points": "0",
// //       "color": "#0093CC",
// //       "name": "Alpine",
// //       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png.transform/2col/image.png",
// //       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/alpine.png.transform/4col/image.png"
// //     }
// //   ];

// // standingsData.forEach((standing, index) => {
// //   const standingsItem = document.createElement('li');
// //   standingsItem.classList.add('standingsItem');

// //   const standingsHead = document.createElement('div');
// //   standingsHead.classList.add('standingsHead');

// //   const position = document.createElement('span');
// //   position.classList.add('position');
// //   position.textContent = standing.rank;

// //   const teamLogo = document.createElement('img');
// //   teamLogo.classList.add('team-logo');
// //   teamLogo.src = standing.logoSmall;

// //   const pointsInfo = document.createElement('div');
// //   pointsInfo.classList.add('points-info');

// //   const points = document.createElement('span');
// //   points.classList.add('points');
// //   points.textContent = standing.points;

// //   const rank = document.createElement('span');
// //   rank.classList.add('rank');
// //   rank.textContent = standing.rank;

// //   const carImage = document.createElement('img');
// //   carImage.classList.add('car-image');
// //   carImage.src = standing.imageCar;

// //   pointsInfo.appendChild(points);
// //   pointsInfo.appendChild(rank);

// //   standingsHead.appendChild(position);
// //   standingsHead.appendChild(teamLogo);
// //   standingsHead.appendChild(pointsInfo);

// //   standingsItem.appendChild(standingsHead);
// //   standingsItem.appendChild(carImage);

// //   standingsList.appendChild(standingsItem);
// // });
// const teams =[
//     {
//       "id": 0,
//       "rank": "1",
//       "points": "97",
//       "color": "#3671C6",
//       "name": "Red Bull Racing",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png.transform/4col/image.png"
//     },
//     {
//       "id": 1,
//       "rank": "2",
//       "points": "93",
//       "color": "#E80020",
//       "name": "Ferrari",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/ferrari.png.transform/4col/image.png"
//     },
//     {
//       "id": 2,
//       "rank": "3",
//       "points": "55",
//       "color": "#FF8000",
//       "name": "McLaren",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mclaren.png.transform/4col/image.png"
//     },
//     {
//       "id": 3,
//       "rank": "4",
//       "points": "26",
//       "color": "#27F4D2",
//       "name": "Mercedes",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mercedes.png.transform/4col/image.png"
//     },
//     {
//       "id": 4,
//       "rank": "5",
//       "points": "25",
//       "color": "#229971",
//       "name": "Aston Martin",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/aston-martin.png.transform/4col/image.png"
//     },
//     {
//       "id": 5,
//       "rank": "6",
//       "points": "6",
//       "color": "#6692FF",
//       "name": "RB",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/rb.png.transform/4col/image.png"
//     },
//     {
//       "id": 6,
//       "rank": "7",
//       "points": "4",
//       "color": "#B6BABD",
//       "name": "Haas F1 Team",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/haas-f1-team.png.transform/4col/image.png"
//     },
//     {
//       "id": 7,
//       "rank": "8",
//       "points": "0",
//       "color": "#64C4FF",
//       "name": "Williams",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/williams.png.transform/4col/image.png"
//     },
//     {
//       "id": 8,
//       "rank": "9",
//       "points": "0",
//       "color": "#52e252",
//       "name": "Kick Sauber",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/kick-sauber.png.transform/4col/image.png"
//     },
//     {
//       "id": 9,
//       "rank": "10",
//       "points": "0",
//       "color": "#0093CC",
//       "name": "Alpine",
//       "logo-small": "https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png.transform/2col/image.png",
//       "image-car": "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/alpine.png.transform/4col/image.png"
//     }
//   ]

//   const tableBody = document.querySelector("#teamTable tbody");

//   teams.forEach(team => {
//     const row = document.createElement("tr");

//     const rankCell = document.createElement("td");
//     rankCell.textContent = team.rank;
//     row.appendChild(rankCell);

//     const pointsCell = document.createElement("td");
//     pointsCell.textContent = team.points;
//     row.appendChild(pointsCell);

//     const nameCell = document.createElement("td");
//     nameCell.textContent = team.name;
//     row.appendChild(nameCell);

//     const logoCell = document.createElement("td");
//     const logoImg = document.createElement("img");
//     logoImg.src = team["logo-small"];
//     logoImg.alt = team.name;
//     logoImg.width = "50";
//     logoCell.appendChild(logoImg);
//     row.appendChild(logoCell);

//     const carCell = document.createElement("td");
//     const carImg = document.createElement("img");
//     carImg.src = team["image-car"];
//     carImg.alt = team.name;
//     carImg.width = "100";
//     carCell.appendChild(carImg);
//     row.appendChild(carCell);

//     tableBody.appendChild(row);
//   });
// const url = "https://f1-api.vercel.app/api/teams";

// async function fetching() {
//   try {
//     let response = await fetch(url);
//     let data = await response.json();
//     displayData(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// function displayData(data) {
//   let teamInfoElement = document.getElementById("teamInfo");
//   let html = "<ul>";

//   data.forEach((team) => {
//     html += `<li>
//                     <strong>${team.name}</strong><br>
//                     Rank: ${team.rank}<br>
//                     Points: ${team.points}<br>
//                     <img src="${team["logo-small"]}" alt="${team.name} Logo">
//                     <img src="${team["image-car"]}" alt="${team.name} Car">
//                 </li>`;
//   });

//   html += "</ul>";
//   teamInfoElement.innerHTML = html;
// }

// fetching();
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

