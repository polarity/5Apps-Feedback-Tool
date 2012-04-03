var FiveAppsFeedback = function() {
	var self = this

	self.vote = false
	self.appID = 'IrgendeineAppOderID'
	self.feedbackString = false
	self.html = false // Layer HTML

	self.controller = {}
	self.models = {}
	self.views = {}

	self.init = function() {
		self.controller.open()
	}
	self.events = function() {
		document.querySelector('#FiveAppsFeedback textarea').addEventListener('focus',function(event){
			this.innerHTML = ''
		})
		document.querySelector('#FiveAppsFeedback .FAF_send').addEventListener('click',function(event){
			console.log('absenden!')
			self.controller.addFeedback(document.querySelector('#FiveAppsFeedback textarea').innerHTML)
			self.models.sendFeedback()
			self.views.closeLayer()
		})
		document.querySelector('#FiveAppsFeedback .FAF_cancel').addEventListener('click',function(event){
			console.log('abbrechen!')
			self.views.closeLayer()
		})
	}
	self.controller.open = function() {
		// Append HTML
		self.views.appendLayer()
		self.events()
	}
	self.controller.addVote = function(vote) {
		if(vote && vote<5 && vote>0) {
			self.vote = vote
		}
	}
	self.controller.addFeedback = function(feedbackString) {
		if(feedbackString){
			self.feedbackString = feedbackString
		}
	}
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

	self.views.appendLayer = function() {
		self.html = '<div id="FiveAppsFeedback">\
			<h1>Bewerte Diese App</h1>\
			<p>Hier kannst Du eine Applikation bewerten und den Entwicklern Feedback geben</p>\
			<div class="FAF_stars"></div>\
			<textarea>Mein Text....</textarea>\
			<a class="FAF_button FAF_cancel">Abbrechen</a>\
			<a class="FAF_button FAF_send">Absenden</a>\
		</div>';
		document.querySelector('body').insertAdjacentHTML('beforeend', self.html);
	}
	self.views.closeLayer = function() {
		document.querySelector('body').removeChild(document.getElementById('FiveAppsFeedback'))
	}
	self.init()
}