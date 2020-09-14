/**********************************************
***** Statebuilt Facebook Page Like Popup *****
**********************************************/

/*********************************
* Variables from Plugin Settings *
*********************************/
var sbfp_countdown  = sbfp_script_data.countdown; // Seconds before firing
var sbfp_timeout    = sbfp_script_data.timeout; // Minutes before firing again
var sbfp_fbpage     = sbfp_script_data.fbpage; // User's Facebook Page URL (after facebook.com/)

(function( $ ) {
  'use strict';

  $(document).ready(function($) {

    /***************************
    ***** THE POPUP OBJECT *****
    ***************************/

    var Popup = {
      elem: $('.state-fb-pop-up'), // the Popup element
      closeButton: $('.state-fb-pop-up-close'), // Button to close the popup
      countdown: sbfp_countdown, // Seconds before firing

      // Function to close the Popup
      closeEvent: function() {
        var self = Popup;

        self.elem.animate({
          left: '-2000px'
        }, 1000);
      },

      // Function to initialize the popup
      init: function() {
        var self = Popup;

        // Wait X seconds before firing the popup
        self.elem.delay( self.countdown * 1000 ).animate({
          left: '0px',
          bottom: '0px'
        }, 2000);

        self.closeButton.on('click', self.closeEvent);
      }
    }


    /***************************
    ******** THE COOKIE ********
    ***************************/

    var sbfpCookie = {
      name: 'sbfpPopup=', // Cookie Name
      page: sbfp_fbpage, // Cookie Value
      expires: sbfp_timeout * 60 * 1000, // Cookie expires in X minutes

      // Set the Cookie
      set: function(cname, cvalue, exmin) {
        var date = new Date();

        // Cookie expires after X minutes; Specified by admin
        date.setTime(date.getTime() + (sbfpCookie.expires));

        var expires = "expires=" + date.toUTCString();

        // Create the cookie
        document.cookie = sbfpCookie.name + sbfpCookie.page + ';' + expires + ';path=/';
      },

      // Get the Cookie
      get: function(cname) {
        var name = sbfpCookie.name;
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
      },

      // Check the cookie
      check: function() {

        var name = sbfpCookie.get(sbfpCookie.name);

        // If cookie already exists
        if (name !== '') {

            // DO NOT FIRE THE POPUP

        } else {
          // FIRE THE POPUP
          Popup.init();

          // Set up variable to track existence of Cookie
          var cookieExists = 'yes';

          // If cookie doesn't exist
          if (name !== cookieExists && name !== null) {
            // Set the cookie
            sbfpCookie.set('showpopup=', cookieExists , sbfpCookie.expires);
          }
        }
      }
    };

    // Check for the existence of a cookie and
    // fire the popup if cookie doesn't exist
    // or has expired
    sbfpCookie.check();

  });

})(jQuery);