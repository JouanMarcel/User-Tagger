
let cache;
let network;



// Every site loads the current 
chrome.storage.local.get( (e) => {
	cache = e

	// Determine current network
	for(let i = 0; i < NETWORK_MAP.length; i++) {
		let network_info = NETWORK_MAP[i]
		if(document.location.hostname !== network_info.hostname) continue
		network = network_info
		break
	}

	if(!network) {
		console.error('Network not found')
		return
	}
	// User might disable UT for network
	if(!cache['_enabled_' + network.id]) {
		if(DEBUG_MODE) console.log('User tagger not enabled for network')
		return
	}

	// Insert default network value, if network not saved yet
	if(typeof cache[network.id] === 'undefined') cache[network.id] = {}
	if(DEBUG_MODE) console.log('Cached:', cache)

	// Get subpage of network
	const pathname = document.location.pathname
	if(DEBUG_MODE) console.log('Current pathname:', pathname)


	// The moment a match is found, there's no need for the main loop
	conditions_loop:
	for(let i = 0; i < network.conditions.length; i++) {

		let condition = network.conditions[i]

		// Last resort / call on any other page
		if(!condition.pathnames) {
			if(DEBUG_MODE) console.log('No matching pathname, calling:', condition.functioncalls)
			callFunctionStack(condition.functioncalls)
			break conditions_loop
		}

		// Check all pathnames
		for(let j = 0; j < condition.pathnames.length; j++) {
			if(pathname !== condition.pathnames[j]) continue

			callFunctionStack(condition.functioncalls)
			break conditions_loop
		}
	}

	// Call all functionnames in an array with window context
	function callFunctionStack(functionNames){
		for(let k = 0; k < functionNames.length; k++) {
			let functionName = functionNames[k]
			window[functionName]()
		}
	}

})



// Apply changes across all opened tabs
// to cache in all other instances
chrome.storage.onChanged.addListener((changes, namespace) => {
	if(DEBUG_MODE) console.log('Change registered:', changes, namespace)
	if(namespace !== 'local') return;

	let keys = Object.keys(changes)
	for(let i = 0; i < keys.length; i++) {
		let key = keys[i]
		if(key[0] === '_') continue // checks for settings
		cache[key] = Object.assign(cache[key], changes[key].newValue)
	}

})



