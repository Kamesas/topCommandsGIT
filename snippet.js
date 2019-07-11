 const users: any[] =
    props.users && Object.keys(props.users).length
      ? Object.keys(props.users).map(user => {
          const userData = props.users[user];
          return (
            <li id={user} key={user}>
              {userData.name} {userData.work}
            </li>
          );
        })
      : [];


select.getElementsByTagName('option')[0].remove();

if (select) {
  if ('createEvent' in document) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', false, true);
    evt.value = '0';
    select.dispatchEvent(evt);
  } else {
    select.fireEvent('onchange');
  }
}


var startOlbSession = window.sessionStorage.olbSession && JSON.parse(window.sessionStorage.olbSession);
	var newOlbSession = {};

	Object.defineProperty(newOlbSession, 'olbSession', {
		get: function () {
			return JSON.parse(window.sessionStorage.olbSession);
		},
		set: function (value) {
			newOlbSession = value;
		},
	});



Object.keys(OlbSession).forEach(function (item) {
      var current = OlbSession[item];
      
      console.log('%c - - - - - [ keys ]  - - - - - ', 'color: green; font-size: 16px;', '\n', current);
      return current

    });




function LPChatInit() {

	/**
	 * Chat UI customisation
	 */
	if (window.lpTag === undefined || lpTag.events === undefined || lpTag.events.bind === undefined) {
		return;
	}

	var updateStorageEvent = new Event('LPSessionStorageUpdate');

	sessionStorage.setItem = function (p, v) {
		window.dispatchEvent(updateStorageEvent);
		this[p] = v;
	};

	function updateStorageMVJ() {
		if (!window.sessionStorage.userBookings) {
			return;
		}

		var MVJSession = JSON.parse(window.sessionStorage.userBookings);

		var LPChatInfo = {
			'type': 'cart',
			'products': [{
				'product': {
					'name': 'Booking Number :',
				},
			}, {
				'product': {
					'category': MVJSession.bookingNumber || '-',
				},
			}, {
				'product': {
					'name': 'SailingId :',
				},
			}, {
				'product': {
					'category': MVJSession.voyage['id'] || '-',
				},
			}],
		};

		MVJSession.passengers.forEach(function (val, i) {
			LPChatInfo.products.push({
				'product': {
					'name': 'Customer (cchid) :',
				},
			});

			LPChatInfo.products.push({
				product: {
					category: val.cchid || '-',
				},
			});
		});

		lpTag.sdes.push(LPChatInfo);
	}

	function updateStorageOLB() {
		var OlbSession = window.sessionStorage.olbSession && JSON.parse(window.sessionStorage.olbSession);
		var pageStep = window.location.pathname.substring(1);

		if (!OlbSession) {
			return;
		}

		lpTag.sdes.push({
			'type': 'lead',
			'lead': {
				'topic': OlbSession.optimizelyExperiments[0] || '-', //TOPIC OR NAME OF A SUBMITTED LEAD
				'leadId': OlbSession.optimizelyExperiments[1] || '-', //LEAD IDENTIFIER OR TICKET ID
			},
		});

		lpTag.sdes.push({
			'type': 'cart',
			'currency': OlbSession.currency,
			'products': [{
				'product': {
					'name': 'Booking number:',
				},
			}, {
				'product': {
					'category': OlbSession.bookingNumber || '-',
				},
			}, {
				'product': {
					'name': 'Session ID:',
				},
			}, {
				'product': {
					'category': OlbSession.sessionId || '-',
				},
			}, {
				'product': {
					'name': 'Cruise Type:',
				},
			}, {
				'product': {
					'category': OlbSession.voyageType || '-',
				},
			}, {
				'product': {
					'name': 'Cruise name:',
				},
			}, {
				'product': {
					'category': OlbSession.voyageName || '-',
				},
			}, {
				'product': {
					'name': 'Cruise sailing year:',
				},
			}, {
				'product': {
					'category': OlbSession.sailingYear || '-',
				},
			}, {
				'product': {
					'name': 'Cruise sailing month:',
				},
			}, {
				'product': {
					'category': OlbSession.sailingMonth || '-',
				},
			},
				{
					'product': {
						'name': 'Step/page the guest is on:',
					},
				}, {
					'product': {
						'category': pageStep || '-',
					},
				}, {
					'product': {
						'name': 'voyageId:',
					},
				}, {
					'product': {
						'category': OlbSession.voyageId || '-',
					},
				}, {
					'product': {
						'name': 'Offer code',
					},
				}, {
					'product': {
						'category': OlbSession.offerCode || '-',
					},
				}],
		});
	}

	lpTag.events.bind({
		eventName: 'OFFER_IMPRESSION',
		appName: 'LP_OFFERS',
		func: isAvailable,
		async: true, // default is false,
		triggerOnce: false,
	});

	function isAvailable(res) {
		if (res.state !== 1) {
			var chatButton = document.querySelector('.LPMcontainer.LPMoverlay');
			chatButton.style.display = 'none';
		} else {
			var chatButton = document.querySelector('.LPMcontainer.LPMoverlay');
			chatButton.style.display = 'block';
		}
	}

	lpTag.events.bind({
		eventName: 'conversationInfo',
		appName: 'lpUnifiedWindow',
		func: customiseLPChatFirstPage,
		async: true, // default is false,
		triggerOnce: false,
	});

	function customiseLPChatFirstPage(data, eventInfo) {
		var chat = document.getElementById('lpChat');

		if (!chat) {
			return;
		}

		if (data.state === 'waiting') {
			updateStorageOLB();
			updateStorageMVJ();
			window.removeEventListener('LPSessionStorageUpdate', updateStorageOLB);
			window.removeEventListener('LPSessionStorageUpdate', updateStorageMVJ);
			window.addEventListener('LPSessionStorageUpdate', updateStorageOLB);
			window.addEventListener('LPSessionStorageUpdate', updateStorageMVJ);
		}

		setTimeout(function () {
			var select = document.querySelector('.lp_select_field');

			if (select) {

				select.getElementsByTagName('option')[0].remove();

				if ('createEvent' in document) {
					var evt = document.createEvent('HTMLEvents');
					evt.initEvent('change', false, true);
					evt.value = '0';
					select.dispatchEvent(evt);
				} else {
					select.fireEvent('onchange');
				}
			}

			if (!select || !chat.querySelector('.lp_cancel_button')) {
				return;
			}

			var chatButton = document.querySelector('.lp_submit_button');
			chatButton.innerText = 'start';

			chat.querySelector('.lp_cancel_button').style.display = 'none';
			select.parentNode.classList.add('arrowDown');
		}, 100);
	}

	/* - - - - - - Chat button customisation START  - - - - - - */
	lpTag.events.bind({
		eventName: 'conversationInfo',
		appName: 'lpUnifiedWindow',
		func: customiseChatButton,
		async: true, // default is false,
		triggerOnce: false,
	});

	let fakeChatButton = null;

	function customiseChatButton() {
		setTimeout(function () {
			fakeChatButton = document.createElement('div');
			fakeChatButton.classList.add('LPMcontainer', 'LPMoverlay', 'fakeChatButton');
			fakeChatButton.setAttribute('role', 'button');
			fakeChatButton.setAttribute('tabindex', 0);
			fakeChatButton.addEventListener('click', function () {
				var minButton = document.querySelector('.lp_minimized .lp_maximize');
				minButton && minButton.click();
			});

			!document.querySelector('.LPMcontainer.LPMoverlay')
			&& document.body.appendChild(fakeChatButton);
			document.body.removeAttribute('style');
		}, 50);
	}

	lpTag.events.bind({
		eventName: 'maximized',
		appName: 'lpUnifiedWindow',
		func: collapse,
		async: true, // default is false,
		triggerOnce: false,
	});

	lpTag.events.bind({
		eventName: 'minimized',
		appName: 'lpUnifiedWindow',
		func: collapse,
		async: true, // default is false,
		triggerOnce: false,
	});

	function collapse(data, eventInfo) {
		var chatButton = document.querySelector('.LPMcontainer.LPMoverlay');
		!chatButton && document.body.appendChild(fakeChatButton);
		document.body.removeAttribute('style');
	}

	// Removing fake button after chat window was closed
	lpTag.events.bind({
		eventName: 'windowClosed',
		appName: 'lpUnifiedWindow',
		func: function () {
			document.body.removeChild(fakeChatButton);
		},
		async: true, // default is false,
		triggerOnce: false,
	});

	/* - - - - - - Chat button customisation END  - - - - - - */
};

window.onload = LPChatInit;

