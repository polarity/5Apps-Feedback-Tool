/*
	Shows a user feedback layer on top of the app.
	The user can type some comments and commit it 
	back to the developer.
*/
if(typeof FiveApps == 'undefined'){FiveApps = {}}
FiveApps.Feedback = function() {
	var self = this
	self.vote = false // Voting Value
	self.appID = '4f7ad8fac4393415f10001e5' // App ID
	self.apiEndpoint = 'https://5apps.com/api/feedback/'+self.appID
	self.feedbackString = false // text string with feedback
	self.html = false // HTML  String Layer
	self.bagde = true // shows a badge with event to open a layer
	self.badgePosition = 'top' // Position of the Badge: top, left, right, bottom
	self.categories = ["question","suggestion","problem"]
	self.category = false
	self.controller = {}
	self.models = {}
	self.views = {}
	self.lang = 'de'
	self.wording = {
		de: {
			badge: {
				text: 'Feedback'
			},
			info: {
				header: 'Bewerte Diese App',
				desc: 'Hier kannst Du eine Applikation bewerten und den Entwicklern Feedback geben'
			},
			buttons: {
				send: 'Senden',
				cancel: 'Abbrechen'
			},
			response: {
				success: {
					header: 'Danke!',
					desc: 'Deine Bewertung wurde abgesendet!'
				},
				error: {
					header: 'Fehler',
					desc: 'Deine Bewertung konnte nicht abgesendet werden!'
				}
			}
		}
	}
	// Init
	self.init = function() {
		self.views.appendBadge()
	}

	// define some events after the layer opened
	self.events = function() {
		// textarea becomes focused
		$('#FiveAppsFeedback textarea').bind('focus',function(event){
			$(this).html('')
		})
		// click on "send feedback"
		$('#FiveAppsFeedback .FAF_send').bind('click',function(event){
			// get the actual textarea content 
			self.controller.addFeedback($('#FiveAppsFeedback textarea').val())
			// set category
			self.category = self.categories[$('#FiveAppsFeedback .FAF_category select').val()]
			// send all infos to 5Apps
			self.models.sendFeedback(
				function(){self.views.showResponse(self.wording[self.lang].response.success)},
				function(){self.views.showResponse(self.wording[self.lang].response.error)}
			)
			console.log(self.wording[self.lang].response.err)
		})
		// click on cancel
		$('#FiveAppsFeedback').on('click','.FAF_cancel',function(event){
			// cancel, closing
			self.controller.close()
		})
		// Star Mouseover
		$('#FiveAppsFeedback .FAF_stars span').bind('mouseover',function(event){
			// rollover?
		})
		// Click on a Star
		$('#FiveAppsFeedback .FAF_stars span').bind('click',function(event){
			// get the selected star as voting
			self.controller.addVote( $(this).attr('data-vote') )
			// remove all active css-classes from all stars
			$('#FiveAppsFeedback .FAF_stars span').removeClass('active')
			// make all stars til the clicked active
			for(var i = 0; i <= self.vote; i++) {
				// add css-class "active" to this star
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
		// listen to all needed events
		self.events()
		// kill the badge from the dom
		self.views.removeBadge()
	}
	// Close layer
	// remove the layer html elements from the DOM
	// and append the Feedback Badge again
	self.controller.close = function() {
		// kill the feedback layer from the dom
		self.views.removeLayer()
		// bring the badge back
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
	self.models.sendFeedback = function(callback, callbackErr) {
		$.ajax({
			type: 'POST',
			url: self.apiEndpoint,
			data: {
				category: self.category,
				comment: self.feedbackString
			},
			success: function(response){
				if(typeof callback == 'function'){callback(response)}
			},
			error: function(response){
				if(typeof callbackErr == 'function'){callbackErr(response)}
			}
		})
	}

	// construct the badge and append it to DOM
	self.views.appendBadge = function() {
		// define HTML
		self.html = '<div id="FiveAppsFeedbackBadge" class="'+self.badgePosition+'">'+self.wording[self.lang].badge.text+'</div>'
		// put it in before </body>
		$('body').append(self.html)
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
			<h1>'+self.wording[self.lang].info.header+'</h1>\
			<p>'+self.wording[self.lang].info.desc+'</p>\
			<!--\
			<div class="FAF_stars">\
				<span class="FAF_star" data-vote="1"></span>\
				<span class="FAF_star" data-vote="2"></span>\
				<span class="FAF_star" data-vote="3"></span>\
				<span class="FAF_star" data-vote="4"></span>\
			</div>-->\
			<div class="FAF_category">\
				<select>\
					<option value="0">Question</option>\
					<option value="1">Suggestion</option>\
					<option value="2">Problem</option>\
				</select>\
			</div>\
			<textarea>Mein Text....</textarea>\
			<a class="FAF_button FAF_cancel">'+self.wording[self.lang].buttons.cancel+'</a>\
			<a class="FAF_button FAF_send">'+self.wording[self.lang].buttons.send+'</a>\
		</div>';
		$('body').append(self.html)
	}
	// shows a response after the request
	self.views.showResponse = function(obj) {
		self.html = '<h1>'+obj.header+'</h1>\
			<p>'+obj.desc+'</p>\
			<a class="FAF_button FAF_cancel">Schliessen</a>';
		$('#FiveAppsFeedback').html(self.html)
	}

	// removes the layer completly
	self.views.removeLayer = function() {
		$('#FiveAppsFeedback').remove()
	}
	self.init()
}