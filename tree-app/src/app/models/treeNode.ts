export class TreeNode {
    id: number = 0;
    title: string = '';
    isOpen: boolean = false;
    isSelected: boolean = false;
    nodes: TreeNode[] | null = null;
}