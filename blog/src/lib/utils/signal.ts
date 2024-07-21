// file: signal.ts
// createSignal like useState
// createEffect like useEffect

import { useState } from "react";

// https://viblo.asia/p/type-vs-interface-trong-typescript-gGJ599Gp5X2
// type vs interface
interface Subscriber<T> {
    (value?: T): void;
}

class Signal<T = any | undefined> {
    private value?: T;
    private subscribers?: Subscriber<T>[];

    constructor(value?: T) {
        this.value = value;
        this.subscribers = [];
    }

    public getValue() {
        return this?.value;
    }

    public setValue(newValue: T): void {
        this.value = newValue;
        this.emit();
    }
    emit() {
        this.subscribers?.forEach((sub) => sub(this.value));
    }
    subscribe(sub?: Subscriber<T>) {
        if (sub) this.subscribers?.push(sub);
    }
}

export function createEffect(callback?: () => any, deps?: Signal[]) {
    callback?.call({});
    deps?.forEach((dep) => {
        const { subscribe } = (dep as Signal)
        subscribe(callback);
    });
}

export function createSignal<T>(value?: T): [Signal<T>, (newValue: T) => void] {
    const signal = new Signal<T>(value);

    return [
        signal,
        function setValue(newValue: T) {
            signal.setValue(newValue);
        },
    ];
}

export const example = () => {
    const [name, setName] = createSignal<string>();
    const [age, setAge] = createSignal<number>(10);
    useState;

    // Effects automatically subscribes to signals used within
    createEffect(() => {
        // Runs whenever the count changes
        console.log(`Name: ${name.getValue()}, Age: ${age.getValue()}`);
    }, [name, age]);

    setName("Old rahul");
    setTimeout(() => {
        setAge(100);
    }, 2000);
};
