

function hn_Post_Head(){
	let op = document.querySelector('.fatitem tbody')
	
	let userHTML = op.querySelector('.hnuser')
	let postHTML = op.querySelector('.age a')

	if(userHTML.nextElementSibling && userHTML.nextElementSibling.classList.contains('usertagger')) return;

	let ids = {}
	ids.nid = network.id
	ids.uid = userHTML.href.split('?id=')[1]
	ids.pid = postHTML.href.split('?id=')[1]

	let gunHTML = new Usercard(ids, cache)

	$(gunHTML).insertAfter(userHTML)
}


function hn_Post_Body(){

	let comments = document.querySelectorAll('td.default')

	for (let i = 0; i < comments.length; i++) {
		let comment = comments[i]
		let userHTML = comment.querySelector('.hnuser')
		let postHTML = comment.querySelector('.age a')

		if(userHTML === null) continue;

		let ids = {}
		ids.nid = network.id
		ids.uid = userHTML.href.split('?id=')[1]
		ids.pid = postHTML.href.split('?id=')[1]

		let gunHTML = new Usercard(ids, cache)

		$(gunHTML).insertAfter(userHTML)
	}
}


function hn_Index_Body(){

	let ca = cache
	let posts = document.querySelectorAll('.itemlist tr .subtext')

	for (let i = 0; i < posts.length; i++) {
		let post = posts[i]
		let userHTML = post.querySelector('.hnuser')
		let postHTML = post.querySelector('.age a')
		
		if(userHTML === null || postHTML === null ) continue;

		let ids = {}
		ids.nid = network.id
		ids.uid = userHTML.href.split('?id=')[1]
		ids.pid = postHTML.href.split('?id=')[1]

		let gunHTML = new Usercard(ids, ca)

		$(gunHTML).insertAfter(userHTML)
	}

}


function hn_User_Head(){

	let userHTML = document.querySelector('.hnuser')

	let ids = {}
	ids.nid = network.id
	ids.uid = userHTML.href.split('?id=')[1]
	ids.pid = userHTML.href.split('?id=')[1]

	let gunHTML = new Usercard(ids, cache)

	$(gunHTML).insertAfter(userHTML)
}

