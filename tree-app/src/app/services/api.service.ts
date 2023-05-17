import { Injectable } from '@angular/core';
import nodeData from '../data/nodes';
import sleep from '../util/sleep';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    async get() {
        await sleep(222);
        console.log('Data was loaded from server!');
        return nodeData;
    }

    async post() {
        await sleep(777);
        console.log('Data was posted to server!');
    }
}
