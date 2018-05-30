type Callback = (event?: any) => void;

export default class Emitter {
  listeners: Map<string, Callback[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(type: string, callback: Callback) {
    const listeners = this.listeners.has(type) && this.listeners.get(type);
    listeners ? listeners.push(callback) : this.listeners.set(type, [callback]);
  }

  off(type: string, callback: Callback) {
    const listeners = this.listeners.get(type);
    listeners && listeners.splice(listeners.indexOf(callback) >>> 0, 1);
  }

  emit(type: string, payload: any) {
    const listeners = this.listeners.has(type) && this.listeners.get(type);
    listeners && listeners.slice().forEach(callback => callback(payload));
  }
}
