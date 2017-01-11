(function() {

  var form = $('#contact-form');
  var modal = $('#contact-dialog');

  form.on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: form.serialize(),
      success: function(data) {
        showModal(data);
      },
      error: function(xhr, errmsg, err) {
        try {
          showErrors(JSON.parse(xhr.responseText));
        } catch(e) {
          console.log('Unknown errors: '+xhr.responseText);
        }
      }
    });
  });

  // Clear errors shown on the page
  function clearErrors() {
    $('.has-error .help-block').remove();
    $('.has-error').removeClass('has-error');
  }

  // Ajax call success, show 'thanks' dialog
  function showModal(data) {
    clearErrors();
    form.find('input:not([type=hidden]), textarea').val('');
    modal.modal('show');
  }

  // Show error on each form input
  function showErrors(errors) {
    clearErrors();
    for (var field in errors) {
      var err = errors[field].pop();
      $('input[name='+field+'], textarea[name='+field+']')
        .after('<span class="help-block">'+ err +'</span>')
        .parent().addClass('has-error');
    }
  }

})();
