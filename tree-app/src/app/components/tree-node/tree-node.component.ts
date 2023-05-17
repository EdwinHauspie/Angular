import { Component, Input } from '@angular/core';
import { TreeNode } from 'src/app/models/treeNode';

@Component({
    selector: 'tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent {
    @Input() node: TreeNode;
    //private lastClick: number;

    /*toggle() {
        function isDoubleClick() {
            return this.lastClick && new Date().getTime() - this.lastClick < 250;
        }

        if (isDoubleClick()) {
            let allChildren = this.node.nodes.flatten(x => x.nodes);
            allChildren.forEach(x => x.isOpen = true);
            this.node.isOpen = true;
        }
        else this.node.isOpen = !this.node.isOpen;

        this.lastClick = new Date().getTime();
    }*/

    toggle() {
        this.node.isOpen = !this.node.isOpen;
    }
}