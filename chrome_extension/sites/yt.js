

function yt_Watch(){

	// Watches for new comments, as all of them are dynamically loaded
	yt_Watch_Comments_Live()

}


// YT comment from Channel creator will be as badge, responsible for the switch
function yt_Watch_Comments(commentEl){

	let comment = commentEl
	let userHTML = comment.querySelector('#author-text')
	let postHTML = comment.querySelector('#published-time-text a')


	// Magic part for frameworks that utilize reconciliation
	if(userHTML.nextElementSibling && userHTML.nextElementSibling.classList.contains('usertagger')) {

		// If a usertag already exists, remove it, as it is useless now after element reuse of Polymer
		userHTML.nextElementSibling.remove()

	} else {

		// If this is the first time in process, add a MutationObserver to watch
		// the recycling happening and recursively call this function again
		let config = { attributes: true, attributeOldValue: true, attributeFilter: ['href'] }
		let observer = new MutationObserver(mutation => {
			if(DEBUG_MODE) console.log('Mutation detected:', mutation[0].oldValue, '->', mutation[0].target.getAttribute('href'))
			yt_Watch_Comments(comment)
		})
		observer.observe(userHTML, config)

	}


	let ids = {}
	ids.more = {}
	ids.nid = network.id

	let uid = userHTML.href.split('/channel/')
	if(uid.length > 1) {
		ids.uid = uid[1]
		ids.more.type = 'channel'
	}
	
	uid = userHTML.href.split('/user/')
	if(uid.length > 1) {
		ids.uid = uid[1]
		ids.more.type = 'user'
	}

	uid = userHTML.href.split('/c/')
	if(uid.length > 1) {
		console.warn('We found a /c/:', userHTML)
		return;
	}

	if(!ids.uid) {
		console.warn('UID not found:', ids)
		return;
	}

	ids.pid = postHTML.href.split('/watch?v=')[1]
	ids.more.name = userHTML.querySelector('span').innerText

	let gunHTML = new Usercard(ids, cache)

	$(gunHTML).insertAfter(userHTML)
}



function yt_Watch_Comments_Live(){

	// YouTube utilizes dynamic comment loading
	// for initial comments, auto-scroll and replies (threads)

	let target = document.querySelector('body')
	let config = { childList: true, subtree: true }
	let observer = new MutationObserver((mutations) =>
		mutations.forEach(mutation => {
			
			for(let i = 0; i < mutation.addedNodes.length; i++) {
				let node = mutation.addedNodes[i]
				if(node.nodeType !== Node.ELEMENT_NODE) continue

				let isReply = node.matches('ytd-comment-renderer')
				let isThread = node.matches('ytd-comment-thread-renderer')
				if(!isReply && !isThread) continue
				if(isThread) node = node.querySelector('ytd-comment-renderer')
				
				yt_Watch_Comments(node)

			}
		})
	)
	observer.observe(target, config)

}
