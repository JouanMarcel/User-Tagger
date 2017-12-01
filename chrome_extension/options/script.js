

function entry_yt(uid, id){
	let template_user = `<td>${uid}</td>`
	if(id.more && id.more.type === 'user') template_user = `<td><a href="https://www.youtube.com/user/${uid}">${id.more.name}</a></td>`
	if(id.more && id.more.type === 'channel') template_user = `<td><a href="https://www.youtube.com/channel/${uid}">${id.more.name}</a></td>`
	let template_tag =  `<td>${id.tag}</td>`
	let template_post = `<td><a href="https://www.youtube.com/watch?v=${id.pid}">${id.pid}</a></td>`
	let entry = $(`<tr>${template_user}${template_tag}${template_post}</tr>`).get(0)

	return entry
}

function entry_fb(uid, id){
	let template_user = `<td><a href="https://www.facebook.com/profile.php?id=${uid}">${id.more.displayname}</a></td>`
	let template_tag =  `<td>${id.tag}</td>`
	let template_group =  `<td>${(id.more.isGroup) ? 'Yes' : 'No'}</td>`
	let entry = $(`<tr>${template_user}${template_tag}${template_group}</tr>`).get(0)

	return entry
}

function entry_hn(uid, id){
	let template_user = `<td><a href="https://news.ycombinator.com/user?id=${uid}">${uid}</a></td>`
	let template_tag =  `<td>${id.tag}</td>`
	let template_post = `<td><a href="https://news.ycombinator.com/item?id=${id.pid}">${id.pid}</a></td>`
	let entry = $(`<tr>${template_user}${template_tag}${template_post}</tr>`).get(0)

	return entry
}


chrome.storage.local.get((e) => {

	// Determine current network
	for(let i = 0; i < NETWORK_MAP.length; i++) {
		let nid = NETWORK_MAP[i].id
		let ids = e[nid]
		
		for(let uid in ids) {
			let id = ids[uid]

			let entry;
			if(nid === 'yt') entry = entry_yt(uid, id)
			else if(nid === 'fb') entry = entry_fb(uid, id)
			else if(nid === 'hn') entry = entry_hn(uid, id)

			let overviewSelector = `.overview-list[data-network="${nid}"] table tbody`
			let overview = document.querySelector(overviewSelector)
			overview.appendChild(entry)
		}
	}

})



let enablecheckboxes = document.querySelectorAll('.overview-meta input[type="checkbox"]')

for(let i = 0; i < enablecheckboxes.length; i++) {

	let enablecheckbox = enablecheckboxes[i]
	let overviewEl = enablecheckbox.parentElement.parentElement
	let network = overviewEl.dataset.network
	let option = '_enabled_' + network

	// Apply checked value to checkbox and overview
	chrome.storage.local.get(option, (e) => {
		let checked = e[option]
		enablecheckbox.checked = checked

		// Make it visible to the user
		if(checked) overviewEl.classList.remove('overview-disabled')
		else overviewEl.classList.add('overview-disabled')

	})

	enablecheckbox.addEventListener('change', (e) => {
		let checked = e.target.checked
		let setting = { [option]: checked }
		if(DEBUG_MODE) console.log(setting)
		chrome.storage.local.set(setting)
		
		// Make it visible to the user
		if(checked) overviewEl.classList.remove('overview-disabled')
		else overviewEl.classList.add('overview-disabled')

	})
}



let deletebuttons = document.querySelectorAll('.overview-meta input[type="button"]')

for(let i = 0; i < deletebuttons.length; i++) {
	deletebuttons[i].addEventListener('click', (e) => {
		if(!window.confirm('Do you really want to delete all tags for this network?')) return;
		let network = e.target.parentElement.parentElement.dataset.network
		let reset = { [network]: {} }
		chrome.storage.local.set(reset, () => window.location.reload() )
	})
}


