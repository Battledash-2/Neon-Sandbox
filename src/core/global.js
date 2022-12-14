const Lexer = require('../lexer.js');
const Parser = require('../parser.js');

const Environment = require('../environment.js');
const LiteralConstructors = require('./literal_constructors.js');
const Builtin = require('./builtin.js');

module.exports = (Interpreter) => {
	let exp = {};


	const glbl = {
		VER: '3.0.1-mod', // { constant: false, value: '1.0.0', },
		PLATFORM: process.platform, // { constant: true, value: process.platform, },

		...Builtin,
		...LiteralConstructors,

		// ---------------------------
		// Native
		// -- Console
		print(_env, ...args) { console.log(...args); return args.join(" "); },
		clear: (_env)=>console.clear(),

		// -- Types
		isNaN(_env, arg) { return isNaN(arg); },

		// -------------
		// -- Functional
		// - TIMEOUTS
		timeout(_env, arg, time) { return setTimeout(arg.exec, time); },
		interval(_env, arg, time) { return setInterval(arg.exec, time); },

		deleteInterval(_env, arg) { return clearInterval(arg); },

		// -------------
		// -- OOP
		// - CLASSES
		instanceId(_env, arg) { // not a class: -1; not a class, but a function: 0; a class: CID
			if (!arg.hasOwnProperty('raw') && !arg.hasOwnProperty('classID')) return -1;
			if (arg.raw && arg.raw.value.hasOwnProperty('cid')) return arg.raw.value.cid;
			return arg.classID ?? -1;
		},

		// -------------
		// - ENVIRONMENTS
		getfenv(_e, f, l=-1) { 
			if (typeof f === 'undefined') return _e;
			if (l < 0) return f?.raw?.value?.env;
			if (l >= 0) {
				let env = f?.raw?.value?.env;
				for (let i = 0; i < l; i++) env = env?.parent;
				return env;
			}
			throw new Error('getfenv: invalid arguments');
		},
		setfenv(_e, f, o) {
			if (typeof o === 'undefined') return _e = new Environment(f?.record, _e);
			return f.raw.value.env = new Environment(o?.record, f.raw.value.env);
		},

		// -------------
		// - EVAL
		load(_env, string) {
			const lexed = new Lexer(string);
			const parsed = new Parser(lexed);
			const env = new Environment({}, _env);
			return new Interpreter('loadstring').eval(parsed, env);
		},
		global(_env, varn, varv) {
			let env = _env;
			while (env?.parent != null) {
				env = env.parent;
			}
			if (varn == null || varv == null) throw new Error('global: invalid arguments');
			env.assign(varn, varv);
			return varv;
		},
	};

	const global = new Environment({...glbl});

	global.define('true', true, {}, true);
	global.define('false', false, {}, true);
	global.define('null', null, {}, true);

	exp['default'] = global;
	exp['create'] = ()=>{
		let nv = new Environment({...glbl}); // dup for an actual 'new' env
		nv.define('true', true, {}, true);
		nv.define('false', false, {}, true);
		nv.define('null', null, {}, true);

		return nv;
	};

	return exp;
}