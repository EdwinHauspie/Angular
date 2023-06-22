import { Injectable } from '@angular/core';
import nodeData from '../data/nodes';
import { Subscriber, Observable } from 'rxjs';
import { TreeNode } from '../models/treeNode';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private treeSubscriber: Subscriber<TreeNode[]> = null;
  public tree: Observable<TreeNode[]>;

  constructor() {
    this.tree = new Observable<TreeNode[]>(s => {
      this.treeSubscriber = s;
      this.treeSubscriber.next(nodeData);
    });
  }

  public setNewTree(newTree: TreeNode[]): void {
    this.treeSubscriber.next(newTree);
  }
}
