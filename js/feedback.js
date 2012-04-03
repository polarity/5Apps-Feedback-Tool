/*
	Blendet ein Layer für Feedback in diversen Apps ein
*/
var FiveAppsFeedback = function() {
	var self = this

	self.vote = false // Voting Value
	self.appID = 'IrgendeineAppOderID' // App ID
	self.feedbackString = false // text string with feedback
	self.html = false // HTML  String Layer

	self.controller = {}
	self.models = {}
	self.views = {}

	// Init
	self.init = function() {
		// open layer
		self.controller.open()
	}
	// define some events after the layer opened
	self.events = function() {
		// textarea becomes focused
		$('#FiveAppsFeedback textarea').bind('focus',function(event){
			this.innerHTML = ''
		})
		// click on "send feedback"
		$('#FiveAppsFeedback .FAF_send').bind('click',function(event){
			console.log('absenden!')
			self.controller.addFeedback(document.querySelector('#FiveAppsFeedback textarea').innerHTML)
			self.models.sendFeedback()
			self.views.closeLayer()
		})
		// click on cancel
		$('#FiveAppsFeedback .FAF_cancel').bind('click',function(event){
			self.views.closeLayer()
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
	self.controller.open = function() {
		// Append HTML
		self.views.appendLayer()
		self.events()
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
	self.views.closeLayer = function() {
		document.querySelector('body').removeChild(document.getElementById('FiveAppsFeedback'))
	}
	self.init()
}