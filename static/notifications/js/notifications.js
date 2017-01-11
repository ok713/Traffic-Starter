$(document).ready(function() {

  var userNotifications = $('.user-notifications');
  var lastUnreadCount = -1;

  // Fetch notification count every second
  setInterval(getNotificationsCount, 1000);  

  // Function to get the notifications count from server
  function getNotificationsCount() {
    $.ajax({
      url: '../../../accounts/login/_a3e4681a.html',
      success: function(data) {
        userNotifications.find('.badge').text(data.unread);
        userNotifications.toggleClass('has-unread', data.unread > 0);
        userNotifications.toggleClass('empty', data.count == 0);
        if (data.unread != lastUnreadCount) 
          fetchNotificationsList();
        lastUnreadCount = data.unread;
      }
    });
  }

  // Function to fetch the notification list from server
  function fetchNotificationsList() {
    $.ajax({
      url: '/notifications/',
      success: function(content) {
        userNotifications.find('.notification-list').html(content);
      }
    });
  }

  // Flag all notifications as read when dropdown is closed
  userNotifications.on('hide.bs.dropdown', function() {
    $.ajax({
      url: '/notifications/opened/',
      method: 'post',
      success: function() {
        fetchNotificationsList();
      }
    });
  });

  // Clear all notifications
  userNotifications.find('.clear').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/notifications/clear/',
      method: 'post',
      success: function() {
        fetchNotificationsList();
      }
    });
  });

});