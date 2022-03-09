## tiny Storage Libs

this is a tiny storage lib.

it's support all morden browser and support set or get a js object value.

### simple use

1. save a object value

```javascript
    import Storage from 'tiny-storage'
    const storage = new Storage('tiny');
    const testVal = {say: 'hello world!'}
    // set to localstorage
    storage.setItem('test', testVal);
    // you will save this value

```

2. get a value

```javascript
    import Storage from 'tiny-storage'
    const storage = new Storage('tiny');

    // set to localstorage
    const val = storage.getItem('test');
    console.log(val);
    // => {say: 'hello world!'}
    // that's so cool!

```