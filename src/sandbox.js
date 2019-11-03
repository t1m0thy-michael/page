// import u from '@t1m0thy_michael/u'
import e from '@t1m0thy_michael/e'
window.e = e
import d from '@t1m0thy_michael/d'
d.setEventbus(e)
window.e = e

import p from './p'

d([
	{ h1: 'Title here'},
	{ div: [
		{ a: 'Home', name: 'Home', href: '/' },
		d.br(),
		{ a: 'Page 2', name: 'Page 2', href: '/page2/qwerty/123' },
		d.br(),
		{ a: 'Page 3', name: 'Page 3', href: '/page3/123/456' },
		d.br(),
		{ a: 'Page 4', name: 'Page 4', href: '/page4/arg1/srg2' },
		d.br(),
		{ a: 'Fake Route', name: 'No real', href: '/notreal/arg1/srg2' },
	]},
	{ div: [], id: 'cont1', width: '100%', height: '500px', background: { colour: 'rgb(106, 137, 202)'}},
]).appendTo('body')

p.setContainer('#cont1')



const pageFactory = (title) => function (...args) {

	if (!this.page.state.name) this.page.state.name = this.page.name

	const SELF = this

	const state = d({
		div: [
			'APP state: ',
			SELF.state.clickCount || '',
		],
		sub: {
			topic: 'testClick',
			fn: function () {
				console.log(SELF.state, this, 'hello?')
				this.innerHTML(`APP state: ${SELF.state.clickCount}`)
			}
		}
	})

	const pageState = d({
		div: [
			'PAGE state: ',
			SELF.page.state.clickCount || '',
		],
		sub: {
			topic: 'testClick',
			fn: function () {
				console.log(SELF.state, this, 'hello?')
				this.innerHTML(`PAGE state: ${SELF.page.state.clickCount}`)
			}
		}
	})

	d([
		{ h3: title },
		state,
		pageState,
		{
			button: 'click me',
			on: {
				event: 'click',
				fn: () => {
					this.state.clickCount = this.page.name
					this.page.state.clickCount = this.page.name
					console.log(this.page.state)

				},
				topic: 'testClick'
			}
		}
	]).appendTo(this.container)
}
 
p.setRoute([
	{ name: 'home', url: '/', fn: pageFactory('home') },
	{ name: 'page 2', url: 'page2/::arg1[str]/::arg2[int]', fn: pageFactory('page 2') },
	{ name: 'page 3', url: 'page3/::arg1[int]/::arg2[int]', fn: pageFactory('page 3') },
	{ name: 'page 4', url: 'page4/::arg1[str]/::arg2[str]', fn: pageFactory('page 4') },
])

p.setBeforeNavigate(function (){ console.log('before navigate', window.location.pathname, history.state, this.page.state) })
p.setAfterNavigate(function (){ console.log('after navigate', window.location.pathname, history.state, this.page.state) })

p.navigate()

