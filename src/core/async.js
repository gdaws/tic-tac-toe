
export function signal() {

  const listeners = [];

  const emit = (...args) => {
    listeners.forEach(promise => promise.resolve(...args));
    listeners.splice(0, listeners.length);
  };

  const interrupt = (reason) => {
    listeners.forEach(promise => promise.reject(reason));
    listeners.splice(0, listeners.length);
  };

  const wait = () => {
    
    const promise = new Promise((resolve, reject) => {
      listeners.push({resolve, reject});
    });

    return promise;
  };

  return { emit, wait, interrupt };
}

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

