class EventBus {
  constructor() {
    this.subscribers = [];
  }
  on(event, func) {
    if(this.subscribers.find(sub => {
      sub.event === event && sub.func.toString() === func.toString()
    }))
      return;

    this.subscribers.push({event, func});
  }
  emit(event) {
    for(let sub of this.subscribers) {
      if(sub.event === event)
        (sub.func)();
    }
  }
}


export default new EventBus;
