
function Usercard(_ids, _cache){

	let usertag = (typeof _cache[_ids.nid][_ids.uid] !== 'undefined') ? _cache[_ids.nid][_ids.uid]['tag'] : null;

	let usercardHTML = USERCARD_JQ.clone().get(0)
	usercardHTML.dataset['edit'] = 'false'
	usercardHTML.dataset['nid'] = _ids.nid
	usercardHTML.dataset['uid'] = _ids.uid
	usercardHTML.dataset['pid'] = _ids.pid
	if (usertag !== null) usercardHTML.dataset['tag'] = usertag

	let usercardIconDOM = usercardHTML.querySelector('.usertagger-icon')
	let usercardInputDOM = usercardHTML.querySelector('.usertagger-input input')
	let usercardTagDOM = usercardHTML.querySelector('.usertagger-tag')
	let usercardTagtextDOM = usercardHTML.querySelector('.usertagger-tagtext')
	if (usertag !== null) usercardTagtextDOM.textContent = usertag

	

	// Extension user clicks on tag, can edit tag
	//
	usercardIconDOM.addEventListener('click', () => {
		usercardInputDOM.value
			= (typeof usercardHTML.dataset['tag'] !== 'undefined')
			? usercardHTML.dataset['tag'] : ''
		usercardHTML.dataset['edit'] = 'true'
		usercardInputDOM.focus()
	})


	// Extension user clicks on tag, can edit tag
	//
	usercardTagDOM.addEventListener('click', () => {
		usercardInputDOM.value
			= (typeof usercardHTML.dataset['tag'] !== 'undefined')
			? usercardHTML.dataset['tag'] : ''
		usercardHTML.dataset['edit'] = 'true'
		usercardInputDOM.focus()
	})


	// Extension user clicks outside, aborts edit
	//
	usercardInputDOM.addEventListener('blur', () =>
		usercardHTML.dataset['edit'] = 'false'
	)


	// Extension user enters the edited tag, saves it
	//
	usercardInputDOM.addEventListener('keydown', (e) => {

		// ESC, cancel edit
		if(e.keyCode === 27) {
			usercardHTML.dataset['edit'] = 'false'
			return
		}

		// If not ENTER, no need to go further
		if(e.keyCode !== 13) return;
		usercardHTML.dataset['edit'] = 'false'


		let usertag = usercardInputDOM.value.trim()

		var badges = document.querySelectorAll('[data-uid="' + _ids.uid + '"]')
		for(let i = 0; i < badges.length; i++) {
			let badge = badges[i]

			if(usertag === '') {
				badge.removeAttribute('data-tag')
				badge.querySelector('.usertagger-tagtext').textContent = ''
			} else {
				badge.dataset['tag'] = usertag
				badge.querySelector('.usertagger-tagtext').textContent = usertag
			}
		}


		saveTag(_ids, usertag, _cache)
		
		// let copy = JSON.parse(JSON.stringify(_ids))
		// copy.tag = usertag
		// chrome.runtime.sendMessage(copy, (response) => { if(DEBUG_MODE) console.log('Tag set:', response) })


		if(DEBUG_MODE) console.log('Setting tag:', usertag, '...')

	})


	return usercardHTML;
}


