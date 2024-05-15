(function (global) {
  const ns = {};
  let currentSound = null;
  const homeHtml = "snippets/home.html";
  const allTeamsUrl = "data/teams.json";
  const allDriversUrl = "data/drivers.json";
  const teamsTitleHtml = "snippets/teamsTitle.html";
  const driversTitleHtml = "snippets/driversTitle.html";
  const teamHtml = "snippets/teamItem.html";
  const driversHtml = "snippets/driversItem.html";
  const teamItemsUrl = "data/teams/";
  const driverItemsUrl = "data/drivers/";
  const catalogItemsTitleHtml = "snippets/productTitle.html";
  const teamDetailsItemHtml = "snippets/teamDetailsItem.html";
  const driverDetailsItemHtml = "snippets/driverDetailsItem.html";
  const aboutUsHtml = "snippets/aboutUs.html";
  const insertHtml = function (selector, html) {
    const targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  const showLoading = function (selector) {
    let html = '<div id="loader" class="loader"></div>';
    insertHtml(selector, html);
  };
  const showLoadingGame = function (selector) {
    let html = '  <div id="app"> <div id="map"></div> </div>';
    insertHtml(selector, html);
  };

  const insertProperty = function (string, propName, propValue) {
    const propToReplace = `{{${propName}}}`;
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  document.addEventListener("DOMContentLoaded", function () {
    showLoading("#mainHome");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#mainHome").innerHTML = responseText;
      },
      false
    );
  });

  ns.loadTeams = function () {
    showLoading("#mainHome");
    $ajaxUtils.sendGetRequest(allTeamsUrl, buildAndShowTeamsHTML);
  };
  ns.loadDrivers = function () {
    showLoading("#mainHome");
    $ajaxUtils.sendGetRequest(allDriversUrl, buildAndShowDriversHTML);
  };
  ns.loadGame = function () {
    showLoading("#mainHome");
    showLoadingGame("#mainHome");
    GameLoad.load();
    switchToActive("linkgame");
  };
  ns.loadHome = function () {
    showLoading("#mainHome");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        switchToActive("linkHome");
        document.querySelector("#mainHome").innerHTML = responseText;
      },
      false
    );
  };

  function buildAndShowTeamsHTML(teams) {
    $ajaxUtils.sendGetRequest(
      teamsTitleHtml,
      function (teamsTitleHtml) {
        $ajaxUtils.sendGetRequest(
          teamHtml,
          function (teamCardHtml) {
            switchToActive("linkTeams");
            const teamsViewHtml = buildTeamsViewHtml(
              teams,
              teamsTitleHtml,
              teamCardHtml
            );
            insertHtml("#mainHome", teamsViewHtml);
          },
          false
        );
      },
      false
    );
  }
  function buildAndShowDriversHTML(drivers) {
    $ajaxUtils.sendGetRequest(
      driversTitleHtml,
      function (driversTitleHtml) {
        $ajaxUtils.sendGetRequest(
          driversHtml,
          function (driverCardHtml) {
            switchToActive("linkDrivers");
            const driversViewHtml = buildDriversViewHtml(
              drivers,
              driversTitleHtml,
              driverCardHtml
            );
            insertHtml("#mainHome", driversViewHtml);
          },
          false
        );
      },
      false
    );
  }

  function buildTeamsViewHtml(teams, teamsTitleHtml, teamCardHtml) {
    let finalHTML = teamsTitleHtml;
    finalHTML += "<div class='container p-0'>";
    finalHTML += "<section class='row'>";
    for (let i = 0; i < teams.length; i++) {
      let html = teamCardHtml;
      html = insertProperty(html, "name", teams[i].name);
      html = insertProperty(html, "points", teams[i].points);
      html = insertProperty(html, "rank", teams[i].rank);
      html = insertProperty(html, "carimage", teams[i].carimage);
      html = insertProperty(html, "logosmall", teams[i].logosmall);
      finalHTML += html;
    }
    finalHTML += "</section>";
    finalHTML += "</div>";
    return finalHTML;
  }
  function buildDriversViewHtml(teams, teamsTitleHtml, teamCardHtml) {
    let finalHTML = teamsTitleHtml;
    finalHTML += "<div class='container p-0'>";
    finalHTML += "<section class='row'>";
    for (let i = 0; i < teams.length; i++) {
      let html = teamCardHtml;
      html = insertProperty(html, "drivername", teams[i].drivername);
      html = insertProperty(html, "points", teams[i].points);
      html = insertProperty(html, "rank", teams[i].rank);
      html = insertProperty(html, "numberlogo", teams[i].numberlogo);
      html = insertProperty(html, "driverimage", teams[i].driverimage);
      html = insertProperty(html, "countryflag", teams[i].countryflag);
      finalHTML += html;
    }
    finalHTML += "</section>";
    finalHTML += "</div>";
    return finalHTML;
  }

  ns.loadTeamDetails = function (teamShort) {
    showLoading("#mainHome");
    $ajaxUtils.sendGetRequest(
      teamItemsUrl + teamShort + ".json",
      buildAndShowTeamItemsHTML
    );
  };
  ns.loadDriverDetails = function (driverName) {
    showLoading("#mainHome");
    $ajaxUtils.sendGetRequest(
      driverItemsUrl + driverName + ".json",
      buildAndShowDriverItemsHTML
    );
  };
  function buildAndShowDriverItemsHTML(categoryCatalogItems) {
    $ajaxUtils.sendGetRequest(
      catalogItemsTitleHtml,
      function (catalogItemTitleHtml) {
        $ajaxUtils.sendGetRequest(
          driverDetailsItemHtml,
          function (driverDetailsItemHtml) {
            const catalogItemsViewHtml = buildDriverItemsViewHtml(
              categoryCatalogItems,
              catalogItemTitleHtml,
              driverDetailsItemHtml
            );
            insertHtml("#mainHome", catalogItemsViewHtml);
          },
          false
        );
      },
      false
    );
  }
  function buildAndShowTeamItemsHTML(categoryCatalogItems) {
    $ajaxUtils.sendGetRequest(
      catalogItemsTitleHtml,
      function (catalogItemTitleHtml) {
        $ajaxUtils.sendGetRequest(
          teamDetailsItemHtml,
          function (teamDetailsItemHtml) {
            const catalogItemsViewHtml = buildTeamItemsViewHtml(
              categoryCatalogItems,
              catalogItemTitleHtml,
              teamDetailsItemHtml
            );
            insertHtml("#mainHome", catalogItemsViewHtml);
          },
          false
        );
      },
      false
    );
  }
  function buildDriverItemsViewHtml(
    categoryCatalogItems,
    catalogItemsTitleHtml,
    teamDetailsItemHtml
  ) {
    catalogItemsTitleHtml = insertProperty(
      catalogItemsTitleHtml,
      "name",
      categoryCatalogItems.drivername
    );

    let finalHtml = catalogItemsTitleHtml;

    finalHtml += "<section class='row'>";

    const catalogItem = categoryCatalogItems;

    let html = teamDetailsItemHtml;

    html = insertProperty(html, "drivername", catalogItem.drivername);
    html = insertProperty(html, "driverimage", catalogItem.driverimage);

    html = insertProperty(html, "team", catalogItem.team);
    html = insertProperty(html, "country", catalogItem.country);
    html = insertProperty(html, "podiums", catalogItem.podiums);
    html = insertProperty(
      html,
      "grandsprixentered",
      catalogItem.grandsprixentered
    );
    html = insertProperty(
      html,
      "worldchampionships",
      catalogItem.worldchampionships
    );
    html = insertProperty(
      html,
      "highestRaceFinish",
      catalogItem.highestRaceFinish
    );
    html = insertProperty(html, "dateofbirth", catalogItem.dateofbirth);
    html = insertProperty(html, "countryflag", catalogItem.countryflag);
    html = insertProperty(html, "helmetimage", catalogItem.helmetimage);
    html = insertProperty(html, "number", catalogItem.number);
    html = insertProperty(html, "driver1Image", catalogItem.driver1Image);
    html = insertProperty(html, "driver2Image", catalogItem.driver2Image);
    html = insertProperty(html, "driver1Name", catalogItem.driver1Name);
    html = insertProperty(html, "driver2Name", catalogItem.driver2Name);
    html = insertProperty(html, "driver1Number", catalogItem.driver1Number);
    html = insertProperty(html, "driver2Number", catalogItem.driver2Number);
    finalHtml += html;

    finalHtml += "</section>";
    return finalHtml;
  }
  function buildTeamItemsViewHtml(
    categoryCatalogItems,
    catalogItemsTitleHtml,
    teamDetailsItemHtml
  ) {
    catalogItemsTitleHtml = insertProperty(
      catalogItemsTitleHtml,
      "name",
      categoryCatalogItems.fullTeamName
    );

    let finalHtml = catalogItemsTitleHtml;

    finalHtml += "<section class='row'>";

    const catalogItem = categoryCatalogItems;

    let html = teamDetailsItemHtml;

    html = insertProperty(html, "fullTeamName", catalogItem.fullTeamName);
    html = insertProperty(html, "logo", catalogItem.logo);

    html = insertProperty(html, "base", catalogItem.base);
    html = insertProperty(html, "teamChief", catalogItem.teamChief);
    html = insertProperty(html, "technicalChief", catalogItem.technicalChief);
    html = insertProperty(html, "chassis", catalogItem.chassis);
    html = insertProperty(html, "powerUnit", catalogItem.powerUnit);
    html = insertProperty(html, "firstTeamEntry", catalogItem.firstTeamEntry);
    html = insertProperty(
      html,
      "worldChampionships",
      catalogItem.worldChampionships
    );
    html = insertProperty(
      html,
      "highestRaceFinish",
      catalogItem.highestRaceFinish
    );
    html = insertProperty(html, "polePositions", catalogItem.polePositions);
    html = insertProperty(html, "fastestLaps", catalogItem.fastestLaps);
    html = insertProperty(html, "fastestLaps", catalogItem.fastestLaps);
    html = insertProperty(html, "driver1Image", catalogItem.driver1Image);
    html = insertProperty(html, "driver2Image", catalogItem.driver2Image);
    html = insertProperty(html, "driver1Name", catalogItem.driver1Name);
    html = insertProperty(html, "driver2Name", catalogItem.driver2Name);
    html = insertProperty(html, "driver1Number", catalogItem.driver1Number);
    html = insertProperty(html, "driver2Number", catalogItem.driver2Number);
    finalHtml += html;

    finalHtml += "</section>";
    return finalHtml;
  }

  const switchToActive = function (linkId) {
    // Remove 'active' class from all nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add 'active' class to the selected link
    const selectedLink = document.querySelector(`#${linkId}`);
    selectedLink.classList.add("active");
  };

  ns.loadAboutUsPage = function () {
    showLoading("#mainHome");
    $ajaxUtils.sendGetRequest(
      aboutUsHtml,
      function (aboutHtml) {
        switchToActive("aboutUs");
        insertHtml("#mainHome", aboutHtml);
      },
      false
    );
  };
  document
    .getElementById("soundPicker")
    .addEventListener("change", function () {
      var selectedSound = this.value;

      // If another sound is currently playing, stop it
      if (currentSound !== null) {
        currentSound.pause();
        currentSound.currentTime = 0;
      }

      // Play the selected sound
      currentSound = new Audio(selectedSound);
    });

  document.getElementById("playButton").addEventListener("click", function () {
    // If a sound is selected, play it
    if (currentSound !== null) {
      currentSound.play();

      // Enable the stop button
      document.getElementById("stopButton").disabled = false;
    }
  });

  document.getElementById("stopButton").addEventListener("click", function () {
    // If a sound is currently playing, stop it
    if (currentSound !== null) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }

    // Disable the stop button
    this.disabled = true;
  });
  document
    .getElementById("downloadButton")
    .addEventListener("click", function () {
      // Generate a random number between 1 and 6
      var randomNumber = Math.floor(Math.random() * 6) + 1;

      // Create a link element for downloading the random image
      var link = document.createElement("a");
      link.href = "img/pic" + randomNumber + ".jpg";
      link.download = "pic" + randomNumber + ".jpg";
      link.style.display = "none"; // Hide the link

      // Add the link to the document body and click it to trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);
    });

  global.$ns = ns;
})(window);
