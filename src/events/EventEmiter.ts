type Listener<T> = (args: T) => void;

export class EventEmitter<T> {
  private events: { [key: string]: Listener<T>[] } = {};

  on(event: string, listener: Listener<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: Listener<T>): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }

  emit(event: string, args: T): void {
    if (this.events[event]) {
      this.events[event].forEach((listener) => {
        listener(args);
      });
    }
  }
}
