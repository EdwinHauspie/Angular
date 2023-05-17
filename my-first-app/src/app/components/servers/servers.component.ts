import { Component } from '@angular/core';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.scss']
})
export class ServersComponent {
    serverName = '';
    creationStatus = '';
    servers = ['Server 1', 'Server 2'];

    onCreateServer() {
        this.creationStatus = `Server with name "${this.serverName}" was created.`;
        this.servers.push(this.serverName);
        this.serverName = '';
    }
}
