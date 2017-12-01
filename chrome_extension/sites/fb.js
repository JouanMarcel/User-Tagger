

function fb_Feed(){

	// Automtically watches for new hovercards,
	// and also process existing DOM structures

	let hovercards = document.querySelectorAll('a[data-hovercard]')
	for(let i = 0; i < hovercards.length; i++)
		fb_Feed_Post(hovercards[i])


	fb_Feed_Observe()

}


function fb_Feed_Post(hovercardEl){

	let hovercard = hovercardEl

	// Ignore if empty string or (solely) embeds image 
	if(hovercard.textContent === '') return;
	if(hovercard.querySelector('img') !== null) return;

	let string = hovercard.dataset.hovercard
	let regex = /ajax\/hovercard\/(.+?)\.php\?id=(\d+)/;
	let result = string.match(regex)

	if(!result) {
		if(DEBUG_MODE) console.log('This hovercard is strange:', string)
		return;
	}

	if(result[1] === 'page') {
		if(DEBUG_MODE) console.log('This hovercard is a page:', hovercard.textContent)
		return;
	}


	// Check for already added usertags
	if(hovercard.nextElementSibling && hovercard.nextElementSibling.classList.contains('usertagger')) return;

	let uid = result[2]
	let ids = {}
	ids.more = {}
	ids.nid = network.id
	ids.uid = uid
	ids.pid = null
	//ids.more.username = ''
	ids.more.displayname = hovercard.textContent
	if (hovercard.href && hovercard.href.startsWith('https://www.facebook.com/groups/')) ids.more.isGroup = true

	let gunHTML = new Usercard(ids, cache)

	$(gunHTML).insertAfter(hovercard)
}



function fb_Feed_Observe(){

	// Facebook utilizes dynamic content loading

	let target = document.querySelector('body')
	let config = { childList: true, subtree: true }
	let observer = new MutationObserver((mutations) =>
		mutations.forEach(mutation => {

			for(let i = 0; i < mutation.addedNodes.length; i++) {
				let node = mutation.addedNodes[i]
				if(node.nodeType !== Node.ELEMENT_NODE) continue

				// Existing children of newly added elements are not firing 
				// a MutationEvent, so these have to be searched inside them 
				let isHovercard = node.matches('a[data-hovercard]')
				let hasHovercards = node.querySelectorAll('a[data-hovercard]')
				if(!isHovercard && hasHovercards.length === 0) continue
				
				if(isHovercard) {
					// Haven't encountered a hovercard as added element yet
					// but this would be the procedure for processing it:
					// fb_Feed_Post(node)
					if(DEBUG_MODE) console.log('Actually is an hovercard:', node)
					continue
				}

				// Add all included hovercards
				for(let i = 0; i < hasHovercards.length; i++) {
					let hovercard = hasHovercards[i]
					fb_Feed_Post(hovercard)
				}


			}
		})
	)
	observer.observe(target, config)

}
