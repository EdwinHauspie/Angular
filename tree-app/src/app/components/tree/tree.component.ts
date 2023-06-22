import { Component, Input } from '@angular/core';
import { TreeNode } from 'src/app/models/treeNode';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent {
  @Input() tree: TreeNode[];
}
