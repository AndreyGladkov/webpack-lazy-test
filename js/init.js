define(['HH/loader', 'lodash'], function(loader, lodash) {
    document.body.insertAdjacentHTML('beforeend', 'init loaded<br />');
    __webpack_public_path__ = window.lazyPath;
    console.log(loader);
    loader.load('lazy/a');
});
