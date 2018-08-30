define(['../d'], function() {
    document.body.insertAdjacentHTML('beforeend', 'loader loaded<br />');

    return {
        load: function (name) {
            import(
                /* webpackMode: "lazy" */
                `../../js/${name}`
            );
        }
    }
});
