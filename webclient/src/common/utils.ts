export class SimpleLocalStorage<T> {
    constructor(private name: string) {}

    get data(): T {
        return JSON.parse(localStorage.getItem(this.name) || '{}') as T;
    }

    set data(data: T) {
        localStorage.setItem(this.name, JSON.stringify(data));
    }

    setItemInData(key: string, item: object): void {
        const storage: T = this.data;
        // @ts-ignore
        storage[key] ? storage[key] = { ...storage[key], ...item } : storage[key] = { ...item };
        this.data = storage;
    }

    deleteByKey(keyInStorage: string): void {
        const storage: T = this.data;

        // @ts-ignore
        delete storage[keyInStorage];
        this.data = storage;
    }
}