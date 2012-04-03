/*
	Shows a user feedback layer on top of the app.
	The user can type some comments and commit it 
	back to the developer.
*/
var FiveAppsFeedback = function() {
	var self = this

	self.vote = false // Voting Value
	self.appID = 'IrgendeineAppOderID' // App ID
	self.feedbackString = false // text string with feedback
	self.html = false // HTML  String Layer
	self.badgePosition = 'top' // Position of the Badge: top, left, right, bottom
	self.controller = {}
	self.models = {}
	self.views = {}

	// Init
	self.init = function() {
		self.views.appendBadge()
	}

	// define some events after the layer opened
	self.events = function() {
		// textarea becomes focused
		$('#FiveAppsFeedback textarea').bind('focus',function(event){
			this.innerHTML = ''
		})
		// click on "send feedback"
		$('#FiveAppsFeedback .FAF_send').bind('click',function(event){
			self.controller.addFeedback(document.querySelector('#FiveAppsFeedback textarea').innerHTML)
			self.models.sendFeedback()
			self.controller.close()
		})
		// click on cancel
		$('#FiveAppsFeedback .FAF_cancel').bind('click',function(event){
			self.controller.close()
		})
		// Star Mouseover
		$('#FiveAppsFeedback .FAF_stars span').bind('mouseover',function(event){
			// rollover?
		})
		// Click on a Star
		$('#FiveAppsFeedback .FAF_stars span').bind('click',function(event){
			self.controller.addVote( $(this).attr('data-vote') )
			$('#FiveAppsFeedback .FAF_stars span').removeClass('active')
			for(var i = 0; i <= self.vote; i++) {
				$('#FiveAppsFeedback .FAF_stars span[data-vote="'+i+'"]').addClass('active')
			}
		})
	}
	// Open a layer
	// Append html for the feedback layer
	// call all needed events and remove 
	// the badge from DOM
	self.controller.open = function() {
		// Append HTML
		self.views.appendLayer()
		self.events()
		self.views.removeBadge()
	}
	// Close layer
	// remove the layer html elements from the DOM
	// and append the Feedback Badge again
	self.controller.close = function() {
		self.views.removeLayer()
		self.views.appendBadge()
	}
	// get the actual voting from dom
	self.controller.addVote = function(vote) {
		if(vote && vote<5 && vote>0) {
			self.vote = vote
		}
	}
	// get the feedback from textarea
	self.controller.addFeedback = function(feedbackString) {
		if(feedbackString){
			self.feedbackString = feedbackString
		}
	}

	// ajax call to 5apps
	self.models.sendFeedback = function() {
		$.ajax({
			type: 'GET',
			url: "http://google.de/",
			data: {
				appId: self.appID,
				vote: self.vote,
				feedbackString: self.feedbackString
			}
		})
	}

	// construct the badge and append it to DOM
	self.views.appendBadge = function() {
		// define HTML
		self.html = '<div id="FiveAppsFeedbackBadge" class="'+self.badgePosition+'">Feedback</div>'
		// put it in before </body>
		document.querySelector('body').insertAdjacentHTML('beforeend', self.html)
		// Click on the Badge
		$('#FiveAppsFeedbackBadge').bind('click',self.controller.open)
	}
	// just removes the badge html from dom
	self.views.removeBadge = function() {
		$('#FiveAppsFeedbackBadge').remove()
	}
	// construct the layer and append it to dom
	self.views.appendLayer = function() {
		self.html = '<div id="FiveAppsFeedback">\
			<h1>Bewerte Diese App</h1>\
			<p>Hier kannst Du eine Applikation bewerten und den Entwicklern Feedback geben</p>\
			<div class="FAF_stars">\
				<span class="FAF_star" data-vote="1"></span>\
				<span class="FAF_star" data-vote="2"></span>\
				<span class="FAF_star" data-vote="3"></span>\
				<span class="FAF_star" data-vote="4"></span>\
			</div>\
			<textarea>Mein Text....</textarea>\
			<a class="FAF_button FAF_cancel">Abbrechen</a>\
			<a class="FAF_button FAF_send">Absenden</a>\
		</div>';
		document.querySelector('body').insertAdjacentHTML('beforeend', self.html);
	}
	// removes the layer completly
	self.views.removeLayer = function() {
		document.querySelector('body').removeChild(document.getElementById('FiveAppsFeedback'))
	}
	self.init()
}