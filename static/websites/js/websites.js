$(document).ready(function() {

  // Display confirmation dialog when user is deleting a campaign
  var form = $('#form-delete-campaign');
  form.find('button').click(function(e) {
    e.preventDefault();
    var title = 'Delete campaign';
    var message = 'Once you delete this campaign, there is no turning back. Are you sure?'
    confirmModal(title, message, function() {
      form.submit();
    });
  });

  // Limit the views and retention inputs to their respective max values
  $('input[type=number]').on('change keyup input', function() {
    var elem = $(this);
    var maxValue = parseInt(elem.attr('max'));
    var lastValue = parseInt(elem.attr('data-last-value'));
    var newValue = parseInt(elem.val()) > maxValue ? lastValue : elem.val();
    elem.attr('data-last-value', newValue).val(newValue);
    calculator(elem, true);
  });

  // Trigger minutes calculation on adding new website
  calculator($('input[name=views]'));

  function calculator(elem, reset) {
    if (typeof(reset) == 'boolean' && reset == true)  {
      elem
        .parents('form')
        .find('.form-group').removeClass('has-success has-error').end()
        .find('.help-block').text('').end();
    }
    var currentMinutes = parseInt($('input[name=current_minutes]').val());
    var retention = parseInt($('#form-website #id_retention').val());
    var views = parseInt($('#form-website #id_views').val());
    if (isNaN(retention) || isNaN(views)) {
      return;
    }
    var minutes = Math.ceil((retention / 60.) * views)
    var className = "";
    var message = "";
    if (currentMinutes > minutes) {
      className = 'has-success';
      message = formatNumber(currentMinutes-minutes) + ' minutes will be returned to your account.';
    } else if (currentMinutes < minutes) {
      var extraMinutes = minutes - currentMinutes;
      if (availableMinutes >= extraMinutes) {
        className = 'has-success';
        message = formatNumber(extraMinutes) + ' extra minutes will be taken from your account.';
      } else {
        className = 'has-error';
        message = 'You are '+ formatNumber(extraMinutes - availableMinutes) +' minutes short of being able to do that.';
      }
    }

    if (className && message) {
      elem.parents('.form-group').addClass(className).find('.help-block').text(message);
    }
  }

  function formatNumber(x) {
    x = Math.abs(x);
    return isNaN(x)?"":x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

});