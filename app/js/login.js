var loginModule = (function() {
  var form;
  var password;
  var passwordError;
  var genericError;

  var init = function(){
    initializeFields();
    initializeForm();
  };

  var initializeFields = function(){
    form = $('form');
    password = $('#password');
    passwordError = $("#passwordError");
    genericError =  $('#genericError');
  };

  var initializeForm = function(){
    form.submit(function(event) {
      event.preventDefault();
      passwordError.hide();
      genericError.hide();
      password.removeClass('error');

      if(helperModule.checkEmptyField(password, passwordError, "password")){
        return;
      }

      var data =  { "jsonrpc": "2.0", "method": "login", "params": ["root", password.val()], "id": 1 }
      var successCallback = function(data, textStatus, jqXHR) {
        helperModule.redirectTo("dashboard.html");
      };

      var request = {
        data: data,
        url: '/cgi-bin/routerapi/login',
        successCallback: successCallback
      };
      requestModule.submitRequest(request);
    });
  };

  return {
    init: init
  };

})();

$(document).ready(function() {
  loginModule.init();
});

