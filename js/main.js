var templates = {
	login: '\
	<form id="login">\
		<div class="form-group">\
			<label for="loUsername">Username</label>\
			<input type="text" class="form-control" id="loUsername" placeholder="">\
		</div>\
		<div class="form-group">\
			<label for="loPassword">Password</label>\
			<input type="password" class="form-control" id="loPassword" placeholder="">\
		</div>\
		<button type="submit" class="btn btn-primary">Login</button>\
	</form>\
	',
	signup: '\
	<form id="signup">\
		<div class="form-group">\
			<label for="suUsername">Username</label>\
			<input type="text" class="form-control" id="suUsername" placeholder="Pick a username">\
		</div>\
		<div class="form-group">\
			<label for="suPassword">Password</label>\
			<input type="password" class="form-control" id="suPassword" placeholder="Make it secure!">\
		</div>\
		<div class="form-group">\
			<label for="suEmail">Email Address</label>\
			<input type="email" class="form-control" id="suEmail" placeholder="ex. me@me.com">\
		</div>\
		<div class="form-group">\
			<label for="suPhone">Phone Number</label>\
			<input type="text" class="form-control" id="suPhone" placeholder="ex. (123) 456-7890">\
		</div>\
		<button type="submit" class="btn btn-primary">Signup</button>\
	</form>\
	'
};

;(function() {
	'use strict';

	var $view = $('#view');
	var loggedIn = false;
	Parse.initialize('JQmm2hKsFD7OJoVzBzJl4uUaV6VABCU059u9ZHBN', 'oDmb5bkVH33KnVbNmqAK45uAd5VQ4xSbvFDAoe0T');

	var login = function(user) {
		loggedIn = true;
		$view.html('<h3>Great! You\'re logged in.</h3>');
		$('#showLogin').text('Logout');
		$('#signup').hide();

		// display info
		var info = '<p>Name: ' + user.get('username') + '</p><p>Email: ' + user.get('email') + '</p><p>Phone: ' + user.get('phone') + '</p>';
		$view.html($view.html() + info);
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
				$view.text('Error: ' + error.code + ' ' + error.message);
			}
		});

	}

	var getUser = function(username, password) {

		Parse.User.logIn(username, password, {
			success: function(user) {
				login(user);
			},
			error: function(user, error) {
				$view.text('Error: ' + error.code + ' ' + error.message);
			}
		});

	}

	var init = function() {

		// event listenres
		$('#showSignup').click(function() {
			$.get('https://api.parse.com', function(data) {
				console.log(data);
			});
			$view.html(templates.signup);
				$('#signup').submit(function(e) {
				e.preventDefault();
				storeUser($('#suUsername').val(), $('#suPassword').val(), $('#suEmail').val(), $('#suPhone').val())
			});
		});
		$('#showLogin').click(function() {
			if ($(this).text() === 'Login') {
				$view.html(templates.login);
				$('#login').submit(function(e) {
					e.preventDefault();
					getUser($('#loUsername').val(), $('#loPassword').val());
				});
			} else {
				$view.text('You\'ve been logged out');
				$(this).text('Login');
			}
		});
	}

	init();

})();