var MAIN = (function () {
  var expose = {
      attemptLogin: attemptLogin,
      logOut: logOut,
    },
    hide = {
      establishAPIGWStatus: establishAPIGWStatus,
      establishAndHandleCognitoStatus: establishAndHandleCognitoStatus,
      setUpHandlers: setUpHandlers,
      showCreateReportBtn: showCreateReportBtn,
      handleReportCreationSuccess: handleReportCreationSuccess,
      handleReportCreationError: handleReportCreationError,
    };

  function attemptLogin() {
    if (window.BOOK_CONFIG.COGNITO_LOGIN_BASE_URL_STR !== null) {
      window.location = window.BOOK_CONFIG.COGNITO_LOGIN_BASE_URL_STR;
    } else {
      alert("No API to call");
      BOOKs.loadItems();
      document.getElementById("loginOldal").style.display = "none";
      document.getElementById("konyvek").style.display = "block";
    }
  }

  function logOut() {
    BOOKs.reset();
    document.getElementById("loginOldal").style.display = "block";
    document.getElementById("konyvek").style.display = "none";
  }

  function establishAPIGWStatus() {
    if (window.BOOK_CONFIG.API_GW_BASE_URL_STR !== null) {
      console.log(
        "You are now using API GW to get either mock or real(later) product data"
      );
    } else {
      console.log("Error while connecting to the API!");
    }
  }

  function showCreateReportBtn() {
    var html_str = "";
    var $target = $("[data-action='attempt_login']");
    html_str += '<aside data-action="attempt_create_report">report</aside>';
    $(html_str).insertAfter($target);
    $target.hide();
  }

  function establishAndHandleCognitoStatus() {
    if (window.BOOK_CONFIG.COGNITO_LOGIN_BASE_URL_STR !== null) {
      console.log("You are using Cognito for logins. How cool!");
      $(document).on("click", "[data-role='login_button']", function () {
        location.href = window.BOOK_CONFIG.COGNITO_LOGIN_BASE_URL_STR;
      });
      if (localStorage.getItem("bearer_str") !== null) {
        console.log("We have a token to use");
        showCreateReportBtn();
      }
    } else {
      console.log("Cognito has not beed set up yet");
      $(document).on("click", "[data-role='login_button']", function () {
        alert("I Have No POST API to call!");
      });
    }
  }

  function attemptCreateReport(ce) {
    if (window.BOOK_CONFIG.API_GW_BASE_URL_STR === null) {
      showProblem("I have no POST API to call!");
      return;
    }
    //have to be logge din
    var token_str_or_null = localStorage.getItem("bearer_str");

    if (token_str_or_null === null) {
      return showProblem("You need to be logged in to create a report");
    }

    // showWorking();
    //construct bearer token  in the headerTODO
    //use $.ajax to get error handling too
    $.ajax({
      url: window.BOOK_CONFIG.API_GW_BASE_URL_STR + "/" + "create_report",
      method: "POST",
      data: {},
      headers: {
        Authorization: "Bearer " + token_str_or_null,
      },
      error: handleReportCreationError,
      success: handleReportCreationSuccess,
    });
  }

  function handleReportCreationSuccess(response) {
    console.info(response);
    //shoudl have message str (ok)
    if (response.message_str) {
      showProblem(response.message_str);
    } else {
      if (response.executionArn) {
        showProblem("Report is being generated, please check your email");
      } else {
        showProblem(JSON.parse(response).message_str);
      }
    }
  }

  function handleReportCreationError(response) {
    console.error(response);
    showProblem("Something went wrong");
  }

  function showProblem(msg_str) {
    alert(msg_str);
  }

  (function init() {
    console.log("Ok lets get started");
    document.getElementById("konyvek").style.display = "none";
    establishAPIGWStatus();
    establishAndHandleCognitoStatus();
    setUpHandlers();
  })();

  function setUpHandlers() {
    $(document).on("click", "[data-action='attempt_login']", attemptLogin);
    $(document).on(
      "click",
      "[data-action='attempt_create_report']",
      attemptCreateReport
    );
  }

  function showSpecialHighlight() {
    $("[data-role2='special_highlight']").attr("data-showing", "showing");
  }

  return expose;
})();
