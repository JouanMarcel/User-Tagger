
const NETWORK_MAP = [
	{
		'id': 'hn',
		'fullname': 'Hacker News',
		'hostname': 'news.ycombinator.com',
		'conditions': [
			{
				'pathnames': ['/', '/news', '/newest', '/show', '/ask', '/best'],
				'functioncalls': ['hn_Index_Body']
			}, {
				'pathnames': ['/item'],
				'functioncalls': ['hn_Post_Body', 'hn_Post_Head']
			}, {
				'pathnames': ['/user'],
				'functioncalls': ['hn_User_Head']
			}, {
				'functioncalls': []
			}
		]
	}, {
		'id': 'yt',
		'fullname': 'YouTube',
		'hostname': 'www.youtube.com',
		'conditions': [
			{
				'pathnames': ['/watch'],
				'functioncalls': ['yt_Watch']
			}, {
				'functioncalls': []
			}
		]
	}, {
		'id': 'fb',
		'fullname': 'Facebook',
		'hostname': 'www.facebook.com',
		'conditions': [
			{
				'functioncalls': ['fb_Feed']
			}
		]
	}
]

const TAG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.32 86.31"><path d="M33.28,0H5A5,5,0,0,0,0,5V33.28a5,5,0,0,0,1.47,3.54l48,48a5,5,0,0,0,7.09,0L84.86,56.56a5,5,0,0,0,0-7.06l-48-48A5,5,0,0,0,33.28,0ZM17.68,24.75a5,5,0,1,1,7.07,0A5,5,0,0,1,17.68,24.75Z" /></svg>`

const TAG_TIP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" preserveAspectRatio="none">
<path d="M66.58,0,2.68,68a10.44,10.44,0,0,0,0,14l63.9,68H100V0ZM70,87.5A12.5,12.5,0,1,1,82.5,75,12.5,12.5,0,0,1,70,87.5Z" />
</svg>`

const TAG_PLACEHOLDER = 'Tag user...'

const TAG_TEMPLATE = `
<span class="usertagger">
	<span class="usertagger-icon">${TAG_ICON}</span>
	<span class="usertagger-input">
		<input name="usertagger-inputelement" placeholder="${TAG_PLACEHOLDER}">
	</span>
	<span class="usertagger-tag">
		<span class="usertagger-tagtip">${TAG_TIP}</span>
		<span class="usertagger-tagtext"></span>
	</span>
</span>
`

const USERCARD_JQ = $(TAG_TEMPLATE)

const DEBUG_MODE = false


