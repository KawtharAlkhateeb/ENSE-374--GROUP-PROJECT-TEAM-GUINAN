$(document).ready(() => {
   $("#loginbutton").on("click", (event) => {
      var value1 = $('#exampleInputEmail1').val();
      var value2 = $('#exampleInputPassword1').val();
      if ((value1.length === 0) || (value2.length === 0)) {
         event.preventDefault();
         $(".logerr").show();
      }
   });
   $("#exampleInputEmail1").on("input", () => {
      $(".logerr").hide();
   });
   $("#exampleInputPassword1").on("input", () => {
      $(".logerr").hide();
   });
});