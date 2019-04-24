// Register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.
var hostname = window.location.hostname;
var match = /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
var isLocalhost = function () {
    return Boolean(
        hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        hostname.match(match)
    );
}

export function register(swUrl, hooks) {
    if (hooks === void 0) hooks = {};

    var registrationOptions = hooks.registrationOptions;
    if (registrationOptions === void 0) registrationOptions = {};
    delete hooks.registrationOptions

    var emit = function (hook) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];

        if (hooks && hooks[hook]) {
            hooks[hook].apply(hooks, args)
        }
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            if (isLocalhost()) {
                // This is running on localhost. Lets check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, emit, registrationOptions)
                navigator.serviceWorker.ready.then(function (registration) {
                    emit('ready', registration)
                })
            } else {
                // Is not local host. Just register service worker
                registerValidSW(swUrl, emit, registrationOptions)
            }
        })
    }
}

function registerValidSW(swUrl, emit, registrationOptions) {
    navigator.serviceWorker
        .register(swUrl, registrationOptions)
        .then(function (registration) {
            emit('registered', registration)
            if (registration.waiting) {
                emit('updated', registration)
                return
            }
            registration.onupdatefound = function () {
                emit('updatefound', registration)
                var installingWorker = registration.installing
                installingWorker.onstatechange = function () {
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
        .catch(function (error) {
            emit('error', error)
        })
}

function checkValidServiceWorker(swUrl, emit, registrationOptions) {
    // Check if the service worker can be found.
    fetch(swUrl)
        .then(function (response) {
            // Ensure service worker exists, and that we really are getting a JS file.
            if (response.status === 404) {
                // No service worker found.
                emit('error', new Error(("Service worker not found at " + swUrl)))
                unregister()
            } else if (response.headers.get('content-type').indexOf('javascript') === -1) {
                emit('error', new Error(
                    "Expected " + swUrl + " to have javascript content-type, " +
                    "but received " + (response.headers.get('content-type'))))
                unregister()
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, emit, registrationOptions)
            }
        })
        .catch(function (error) {
            if (!navigator.onLine) {
                emit('offline')
            } else {
                emit('error', error)
            }
        })
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.unregister()
        })
    }
}
