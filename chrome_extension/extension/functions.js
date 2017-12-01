
function saveTag(ids, tag, cached) {

	let nid = ids.nid
	let uid = ids.uid
	let pid = ids.pid
	let more = ids.more

	let obj = {}
	obj[nid] = {}
	obj[nid][uid] = {}
	obj[nid][uid]['tag'] = tag
	obj[nid][uid]['pid'] = pid
	if(more) obj[nid][uid]['more'] = more

	if(tag === '') {
		if(typeof cached[nid][uid] !== 'undefined') delete cached[nid][uid]

	} else {
		if(typeof cached[nid][uid] === 'undefined') cached[nid][uid] = {}
		cached[nid][uid] = obj[nid][uid]
	}

	chrome.storage.local.set(cached, () => { if(DEBUG_MODE) console.log('Tag is set:', tag, 'on', uid) })

}

