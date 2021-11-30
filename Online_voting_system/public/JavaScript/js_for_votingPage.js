$(document).ready(() => {
    $('input[id^="forsweet"]').on('click', function(event) { 
        event.preventDefault();
        var form = $(this).parents('form');
        Swal.fire({
            title: 'Are you sure, you want to proceed?',
            text: "It's a responsibilty to vote right!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Thank You!',
                'Your vote has been counted.',
                'success'
              ).then(() =>
              {
                form.submit();
              })
            }
          })
    });
});