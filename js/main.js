(function() {
	'use strict';

	var $data = $('#data');
	var loggedIn = false;
	Parse.initialize("JQmm2hKsFD7OJoVzBzJl4uUaV6VABCU059u9ZHBN", "oDmb5bkVH33KnVbNmqAK45uAd5VQ4xSbvFDAoe0T");

	var login = function(user) {
		loggedIn = true;
		$(data).html('<h3>Great! You\'re logged in.</h3>');
		$('#showLogin').text('Logout');
		$('#signup').hide();

		// display info
		var info = '<p>Name: ' + user.get('username') + '</p><p>Email: ' + user.get('email') + '</p><p>Phone: ' + user.get('phone') + '</p>';
		$(data).html($(data).html() + info);
	}

	var storeUser = function(username, password, email, phone) {

		var user = new Parse.User();
		user.set('username', username);
		user.set('password', password);
		user.set('email', email);
		user.set('phone', phone);

		user.signUp(null, {
			success: function(user) {
				login(user);
			},
			error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				$(data).text('Error: ' + error.code + ' ' + error.message);
			}
		});

	}

	var getUser = function(username, password) {

		Parse.User.logIn(username, password, {
			success: function(user) {
				login(user);
			},
			error: function(user, error) {
				$(data).text('Error: ' + error.code + ' ' + error.message);
			}
		});

	}

	var init = function() {

		$('#signup').hide();
		$('#login').hide();

		// event listenres
		$('#showSignup').click(function() {
			$(data).text('');
			$('#login').hide();
			$('#signup').show();
		});
		$('#showLogin').click(function() {
			if ($(this).text() === 'Login') {
				$(data).text('');
				$('#signup').hide();
				$('#login').show();
			} else {
				$(this).text('Login');
			}
		});
		$('#signup').submit(function(e) {
			e.preventDefault();
			storeUser($('#suUsername').val(), $('#suPassword').val(), $('#suEmail').val(), $('#suPhone').val())
		});
		$('#login').submit(function(e) {
			e.preventDefault();
			getUser($('#loUsername').val(), $('#loPassword').val());
		});
	}

	init();

})();