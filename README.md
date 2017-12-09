# Emitter
A small event emitter with typescript

```js
import Emitter from 'emitter'

const emitter = new Emitter()

// Listen to an event
emitter.on('myEvent', event => console.log('myEvent:', event) )

// Fire an event
emitter.emit('myEvent', { a: 'b' })

// Working with handler references:
function onEvent() {}
emitter.on('myEvent', onEvent)   // listen
emitter.off('myEvent', onEvent)  // unlisten
```
