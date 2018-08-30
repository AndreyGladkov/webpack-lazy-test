### Webpack lazy example

**What is the current behavior?**
I’ve got a build target, that includes dynamically loaded modules.
If I’m not using `optimizations.splitChunks.cacheGroups` then all of my dynamically loaded modules are included for every dependant ones.

(Modules `js/lazy/a.js` and `js/lazy/c.js` have a dependency of `js/b.js`. When building got inlined `b.js` as a dependency in them)

If I’m set `cacheGroups.maxSize` to 1 byte, to build each module to a separate chunk, then all of my *lazy* modules become dependent on all of
chunk groups.


In `lib` folder module `!*** ./js/lazy lazy ^\.\/.*$ namespace object ***!` has the `map` object describing all of the module dependencies from the chunk groups. And in that map object, there are dependencies that are not actual dependencies for this module

**If the current behavior is a bug, please provide the steps to reproduce.**
* clone repo above
* run `yarn`
* run `yarn build`
* run `yarn build-max-size` 
* In `lib` folder module `!*** ./js/lazy lazy ^\.\/.*$ namespace object ***!` map object containing the dependency of the module dependencies on the chunk group is not dependent on all the chunk groups.
```js
{
	"./q": [
		"./js/lazy/q.js",
		"wtf~._js_b.js~ed1790c6",// all dependencies will be loaded the first time q.js module is loaded
		"wtf~._js_d.js~47056776",//but the module a does not depend on these chunk groups
		"wtf~._js_e.js~3ec8bd28", 
		"wtf~._js_init.js~9c190b95",
		"wtf~._js_lazy lazy _^_.__.*$_ groupOptions: {} namespace object~b65700d3",
		"wtf~._js_lazy_a.js~671c98c4",
		"wtf~._js_lazy_c.js~90351a97",
		"wtf~._js_lazy_q.js~b00cbd74",
		"wtf~._js_loader.js~e1b46ffd",
		"wtf~._node_modules_lodash_lodash.js~2ef0e502",
		"wtf~._node_modules_webpack_buildin_global.js~c8ba6360",
		"wtf~._node_modules_webpack_buildin_module.js~62e4e22d"
	]
}
```
**Repository:**
[webpack-lazy-test](https://github.com/AndreyGladkov/webpack-lazy-test)

**What is the expected behavior?**
Module! `*** ./js/lazy lazy ^ . \ /. * $ namespace object ***!` in the mapping object must only list actual dependencies of the module.
```
{
	"./q": [
		"./js/lazy/q.js"
	]
}
```

**Other relevant information:**
webpack version: 4.17.1
Node.js version: v9.8.0
Operating System: macOS


