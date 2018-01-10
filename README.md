# register-service-worker

A script to simplify service worker registration with hooks for common events.

## Usage

**Note:** this script uses ES modules export and is expected to be used with a client side bundler that can handle ES modules syntax.

``` js
import { register } from 'register-service-worker'

register('/service-worker.js', {
  ready () {
    console.log('Service worker is active.')
  },
  cached () {
    console.log('Content has been cached for offline use.')
  },
  updated () {
    console.log('New content is available; please refresh.')
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
```
