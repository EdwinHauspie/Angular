import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

declare global {
    interface Array<T> {
        last(func): T[];
    }
}

Object.defineProperty(Array.prototype, 'last', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function (func: any) {
        if (func) {
            let reversed = this.slice().reverse(); //Use slice, don't mutate original array
            return reversed.find(func);
        }

        return this[this.length - 1];
    }
});

platformBrowserDynamic()
	.bootstrapModule(AppModule)
    .catch(err => console.error(err));