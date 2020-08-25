const Registry = {};

export const RegisterFunction = (name, fn) => {
  Registry[name] = fn;
}

export const GetFunction = (name) => Registry[name];

export const CallFunction = (name, ...args) => Registry[name].call(args);

