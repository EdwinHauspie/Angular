import { Component, OnInit } from '@angular/core';
import { TreeNode } from './models/treeNode';
import { TreeService } from './services/tree.service';
import { say, input } from './util/Popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tree-app';
  tree: TreeNode[] = [];

  get flatNodes() {
    return this.tree.flatten(x => x.nodes);
  }

  get selectedNodes() {
    return this.flatNodes.filter(x => x.isSelected);
  }

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.treeService.tree.subscribe(x => this.tree = x);
  }

  expandAll() {
    this.flatNodes.forEach(x => x.isOpen = true);
  }

  collapseAll() {
    this.flatNodes.forEach(x => x.isOpen = false);
  }

  setNewTree() {
    this.treeService.setNewTree([
      new TreeNode({ title: 'Node A' }),
      new TreeNode({ title: 'Node B' }),
      new TreeNode({ title: 'Node C' })
    ]);
  }
}