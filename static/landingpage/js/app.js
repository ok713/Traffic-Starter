$(document).ready(function() {

  var newsletterForm = $('#form-newsletter');
  var newsletterModal = $('#modal-newsletter');

  newsletterForm.on('submit', function(e) {
    var firstName = newsletterForm.find('input[name=first_name]').val();
    var lastName = newsletterForm.find('input[name=last_name]').val();
    var email = newsletterForm.find('input[name=email]').val();

    e.preventDefault();

    newsletterModal
      .find('form').show().end()
      .find('input[name=first_name]').val(firstName).end()
      .find('input[name=last_name]').val(lastName).end()
      .find('input[name=email]').val(email).end()
      .find('.btn-subscribe').val('Subscribe').end()
      .find('.message').hide().end()
      .modal('show')
      .find('form').on('submit', function(e) {
        e.preventDefault();
        newsletterModal.find('.btn-subscribe').val('Please wait...');
        $.ajax({
          url: '/subscribe-newsletter/',
          method: 'POST',
          data: $(this).serialize(),
          success: function(data) {
            newsletterModal
              .find('form').hide().end()
              .find('.message-success').show().end();
          },
          error: function(xhr, status, err) {
            newsletterModal
              .find('form').hide().end()
              .find('.message-error').show().end();
          }
        });
      });
  });
  
  // Enable popover on pricing plans
  $('.pricing-plan-help').popover ({
    placement: 'right'
    , trigger: 'hover'
    , container: 'body'
    , delay: { show: 250, hide: 250 }
  })

});


/**
 * ouibounce 
 * http://carlsednaoui.github.io/ouibounce/
 */
var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
  aggressive: true,
  timer: 0,
  callback: function() { console.log('ouibounce fired!'); }
});
$('body').on('click', function() {
  $('#ouibounce-modal').hide();
});
$('#ouibounce-modal .ouibounce-modal-footer').on('click', function() {
  $('#ouibounce-modal').hide();
});
$('#ouibounce-modal .ouibounce-modal').on('click', function(e) {
  e.stopPropagation();
});