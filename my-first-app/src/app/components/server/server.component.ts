import { Component, Input } from "@angular/core";

@Component({
    selector: 'server-component',
    templateUrl: './server.component.html'
})
export class ServerComponent {
    id: number = 0;
    status: string = 'online';
    @Input() name: string = 'noname';

    constructor() {
        this.id = Math.floor(Math.random() * 10);
    }

    getServerStatus() {
        return this.status;
    }
}