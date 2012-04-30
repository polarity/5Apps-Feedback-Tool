/*
	Shows a user feedback layer on top of the app.
	The user can type some comments and commit it 
	back to the developer.
*/
if(typeof FiveApps == 'undefined'){FiveApps={}}
FiveApps.Feedback = function() {
	var self = this
	self.mood = "neutral" // smiley mood
	self.appID = '4f7ad8fac4393415f10001e5' // App ID
	self.apiEndpoint = 'https://5apsps.com/api/feedback/'+self.appID
	self.feedbackString = false // text string with feedback
	self.html = false // HTML  String Layer
	self.bagde = true // shows a badge with event to open a layer
	self.badgePosition = 'top' // Position of the Badge: top, left, right, bottom
	self.categories = ["question","suggestion","problem"]
	self.moods = ['positive','neutral','negative']
	self.category = false
	self.controller = {}
	self.models = {}
	self.views = {}
	self.helper = {}
	self.lang = 'de'
	self.wording = {
		de: {
			badge: {
				text: 'Feedback'
			},
			info: {
				header: 'Bewerte Diese App',
				desc: 'Hier kannst Du eine Applikation bewerten und den Entwicklern Feedback geben',
				inputFeedback: 'dein Feedback ...',
				close: 'Schliessen'
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
		self.events()
		if(window.localStorage.FiveAppsUserRef) {
			self.userref = window.localStorage.FiveAppsUserRef
		} else {
			self.userref = self.helper.generateUserId()
			window.localStorage.setItem('FiveAppsUserRef',self.userref)
		}
	}

	// define some events after the layer opened
	self.events = function() {
		// Click on the Badge
		var elem = FiveApps.Zepto('body')
		elem.on('click','#FiveAppsFeedbackBadge',self.controller.open) // click on the badge
		elem.on('click','#FiveAppsFeedback .FAF_smileys span', self.controller.clickMood) // click on a smiley
		elem.on('click','#FiveAppsFeedback .FAF_send', self.controller.clickSendFeedback) // click on send
		elem.on('click','#FiveAppsFeedback .FAF_cancel',self.controller.close) // click on cancel/close
		elem.on('click','#FiveAppsFeedback .FAF_back', self.views.showForm) // click on back 
		elem.on('focus','#FiveAppsFeedback textarea', function(){ console.log('BUG!')})
	}
	// Open a layer
	// Append html for the feedback layer
	// call all needed events and remove 
	// the badge from DOM
	self.controller.open = function() {
		self.views.showForm()
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
	// get the feedback from textarea
	self.controller.addFeedback = function(feedbackString) {
		if(feedbackString){
			self.feedbackString = feedbackString
		}
	}
	// get the mood
	self.controller.addMood = function(moodId) {
		if(moodId) {
			self.mood = self.moods[moodId]
		}
	}
	// gets the values from the feedback form, stores it
	// and trigger an ajax call to the api, submitting all data
	self.controller.clickSendFeedback = function(event){
		// get the actual textarea content 
		self.controller.addFeedback(FiveApps.Zepto('#FiveAppsFeedback textarea').val())
		// get the selected category
		self.category = self.categories[FiveApps.Zepto('#FiveAppsFeedback .FAF_category select').val()]
		// send all infos to 5Apps
		self.models.sendFeedback(
			function(){self.views.showResponse(self.wording[self.lang].response.success)},
			function(){self.views.showResponse(self.wording[self.lang].response.error)}
		)
		console.log(self.wording[self.lang].response.err)
	}
	// user event: user clicks on a star:
	self.controller.clickMood = function(event){
		var clickedMood = FiveApps.Zepto(this).attr('data-vote')
		// get the selected star as voting
		self.controller.addMood(clickedMood)
		// remove all active css-classes from all stars
		FiveApps.Zepto('#FiveAppsFeedback .FAF_smileys span').removeClass('active')
		FiveApps.Zepto('#FiveAppsFeedback .FAF_smileys span').eq(clickedMood).addClass('active')
	}
	// genrates a random user_id and returns it
	self.helper.generateUserId = function() {
		var date = +new Date()
		return date+(Math.ceil(Math.random()*10000000000))
	}
	// ajax call to 5apps
	self.models.sendFeedback = function(callback, callbackErr) {
		Zepto.ajax({
			type: 'POST',
			url: self.apiEndpoint,
			data: {
				category: self.category,
				comment: self.feedbackString,
				mood: self.mood,
				userref: self.userref
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
		FiveApps.Zepto('body').append(self.html)
	}
	// just removes the badge html from dom
	self.views.removeBadge = function() {
		FiveApps.Zepto('#FiveAppsFeedbackBadge').remove()
	}
	// construct the layer and append it to dom
	self.views.appendLayer = function() {
		self.html = '<div id="FiveAppsFeedback"></div>';
		FiveApps.Zepto('body').append(self.html)
	}
	self.views.removeLayer = function() {
		FiveApps.Zepto('#FiveAppsFeedback').remove()
	}
	self.views.putFeedbackForm = function(){
		var feedback = self.feedbackString === false ? self.wording[self.lang].info.inputFeedback : self.feedbackString
		var moodBlock = ''
		for(var key in self.moods) {
			var active = self.mood == self.moods[key] ? ' active': ''
			moodBlock = moodBlock + '<span class="FAF_smiley'+active+'" data-vote="'+key+'"></span>'
		}
		var catBlock = '<select>'
		for(var key in self.categories) {
			var selected = self.category == self.categories[key] ? ' selected': ''
			catBlock = catBlock + '<option value="'+key+'"'+selected+'>'+self.categories[key]+'</option>'
		}
		catBlock = catBlock+'</select>'
		self.html = '<h1>'+self.wording[self.lang].info.header+'</h1>\
			<p>'+self.wording[self.lang].info.desc+'</p>\
			<div class="FAF_category">'+catBlock+'</div>\
			<div class="FAF_smileys">'+moodBlock+'</div>\
			<textarea>'+feedback+'</textarea>\
			<a class="FAF_button FAF_cancel">'+self.wording[self.lang].buttons.cancel+'</a>\
			<a class="FAF_button FAF_send">'+self.wording[self.lang].buttons.send+'</a>';
		FiveApps.Zepto('#FiveAppsFeedback').html(self.html)
	}
	// shows a response after the request
	self.views.putResponse = function(obj) {
		self.html = '<h1>'+obj.header+'</h1>\
			<p>'+obj.desc+'</p>\
			<a class="FAF_button FAF_cancel">Schliessen</a>\
			<a class="FAF_button FAF_back">Zurück</a>';
		FiveApps.Zepto('#FiveAppsFeedback').html(self.html)
	}
	self.views.showForm = function() {
		self.views.removeLayer()
		// Append HTML
		self.views.appendLayer()
		// Append HTML
		self.views.putFeedbackForm()
	}
	// shows a response after the request
	self.views.showResponse = function(obj) {
		self.views.removeLayer()
		// Append HTML for the Feedback Layer
		self.views.appendLayer()
		// Append HTML for the Response
		self.views.putResponse(obj)
	}
	// removes the layer completly
	self.views.removeLayer = function() {
		FiveApps.Zepto('#FiveAppsFeedback').remove()
	}
	self.init()
}