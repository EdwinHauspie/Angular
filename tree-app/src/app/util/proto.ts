declare global {
    interface Array<T> {
        last(findFunc?: (item: T) => boolean | null): T;
        selectMany(selectFunc: (item: T, idx: number) => T[]): T[];
        flatten(selectFunc: (item: T) => T[]): T[];
        remove(item: T): T[];
    }
}

const defaultConfig = {
    enumerable: false,
    writable: false,
    configurable: false
};

export default function initPrototypes() {
    Object.defineProperty(Array.prototype, 'last', {
        ...defaultConfig,
        value: function (findFunc?: (item: any) => boolean) {
            //This method is NOT obsolete; native [].findLast does not accept optional parameter
            if (findFunc) {
                let reversed = this.slice().reverse(); //Use slice, don't mutate original array
                return reversed.find(findFunc);
            }

            return this[this.length - 1];
        }
    });

    Object.defineProperty(Array.prototype, 'selectMany', {
        ...defaultConfig,
        value: function (selectFunc: (item: any, idx: number) => any[]) {
            let output = [];

            for (let i = 0; i < this.length; i++) {
                let childArray = selectFunc(this[i], i);
                if (childArray) output = output.concat(childArray);
            }

            return output;
        }
    });

    Object.defineProperty(Array.prototype, 'flatten', {
        ...defaultConfig,
        value: function (selectFunc: (item: any) => any[]) {
            let recursiveSelectMany = function (x: any) { return [x].concat(selectFunc(x).selectMany(recursiveSelectMany)); };
            return this.selectMany(recursiveSelectMany);
        }
    });

    Object.defineProperty(Array.prototype, 'remove', {
        ...defaultConfig,
        value: function (item: any) {
            let idx = this.indexOf(item);
            if (idx >= 0) this.splice(idx, 1);
            return this;
        }
    });
}