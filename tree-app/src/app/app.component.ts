import { Component } from '@angular/core';
import { TreeNode } from './models/treeNode';
import { ApiService } from './services/api.service';
import { say, input } from './util/Popup';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'tree-app';
    nodes: TreeNode[] = [];
    apiService: ApiService;

    get flatNodes() {
        return this.nodes.flatten(x => x.nodes);
    }

    get selectedNodes() {
        return this.flatNodes.filter(x => x.isSelected);
    }

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async ngOnInit() {
        this.nodes = await this.apiService.get();
    }

    expandAll() {
        this.flatNodes.forEach(x => x.isOpen = true);
    }

    collapseAll() {
        this.flatNodes.forEach(x => x.isOpen = false);
    }

    async addNode() {
        let nodeTitle = await input('Node title');
        if (!nodeTitle) return;
        this.nodes.push(new TreeNode({ title: nodeTitle }));
    }
}