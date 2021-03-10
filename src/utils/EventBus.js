class EventBus {
    constructor() {
        this.subscribers = {};
        this.callbackIndex = {};
    }

    getSubscribers() {
        return this.subscribers;
    }

    subscribe(subscriber, event, callback) {
        if (!Array.isArray(this.subscribers[event])) {
            this.subscribers[event] = [];
        }

        if (!Array.isArray(this.callbackIndex[event])) {
            this.callbackIndex[event] = [];
        }

        const index = this.subscribers[event].push(callback) - 1;

        this.callbackIndex[event].push({id: subscriber.getName(), position: index});
        console.log(`${subscriber.getName()} is subscribed to the ${event} event.`);
    }

    register(subscriber) {
        const name = subscriber.getName();
        const interests = subscriber.getInterests();

        interests.forEach((interest) => {
            this.subscribe(subscriber, interest, (newValue) => {
                subscriber.notificationReceiver(name, interest, newValue);
            });
        });
    }

    unsubscribe(id, event) {
        for (let i = 0; i < this.callbackIndex[event].length; i++) {
            if (id === this.callbackIndex[event][i].id) {
                const index = this.callbackIndex[event][i].position;
                this.subscribers[event].splice(index, 1);

                for (let j = i+1; j < this.callbackIndex[event].length; ++i) {
                    this.callbackIndex[event][j].position--;
                }

                this.callbackIndex[event].splice(this.callbackIndex[event][i], 1);
            }
        }
    }

    publish(event, newValue = 'n/a') {
        if (!this.subscribers[event]) {
            return;
        }

        this.subscribers[event].forEach((subscriberCallback) => {
            subscriberCallback(newValue);
        });
    }
}

const eventBus = new EventBus();

export default eventBus;