$(document).ready(() => {
    $("#tryagain").on("click", () => {
       document.location.href= "/register";
    });
    $("#login").on("click", () => {
        document.location.href= "/";
     });
     $("#logtryagain").on("click", () => {
      document.location.href= "/";
   });
   $("#errreg").on("click", () => {
       document.location.href= "/register";
    });
    $("#logtovote").on("click", () => {
      document.location.href= "/";
   });
});
    