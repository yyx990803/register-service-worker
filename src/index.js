// Register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

const isLocalhost = () => Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export function register (swUrl, hooks = {}) {
  const { registrationOptions = { scope: '/' }} = hooks
  delete hooks.registrationOptions

  const emit = (hook, ...args) => {
    if (hooks && hooks[hook]) {
      hooks[hook](...args)
    }
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      if (isLocalhost()) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, emit, registrationOptions)
        navigator.serviceWorker.ready.then(registration => {
          emit('ready', registration)
        })
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl, emit, registrationOptions)
      }
    })
  }
}

function registerValidSW (swUrl, emit, registrationOptions) {
  navigator.serviceWorker
    .register(swUrl, registrationOptions)
    .then(registration => {
      emit('registered', registration)
      if (registration.waiting) {
        emit('updated', registration)
        return
      }
      registration.onupdatefound = () => {
        emit('updatefound', registration)
        const installingWorker = registration.installing
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              emit('updated', registration)
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              emit('cached', registration)
            }
          }
        }
      }
    })
    .catch(error => {
      emit('error', error)
    })
}

function checkValidServiceWorker (swUrl, emit, registrationOptions) {
  // Check if the service worker can be found.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (response.status === 404) {
        // No service worker found.
        emit('error', new Error(`Service worker not found at ${swUrl}`))
        unregister()
      } else if (response.headers.get('content-type').indexOf('javascript') === -1) {
        emit('error', new Error(
          `Expected ${swUrl} to have javascript content-type, ` +
          `but received ${response.headers.get('content-type')}`))
        unregister()
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, emit, registrationOptions)
      }
    })
    .catch(error => {
      if (!navigator.onLine) {
        emit('offline')
      } else {
        emit('error', error)
      }
    })
}

export function unregister () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
