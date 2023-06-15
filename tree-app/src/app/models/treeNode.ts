export class TreeNode {
    id: number = 0;
    title: string = 'No title';
    isOpen: boolean = false;
    isSelected: boolean = false;
    nodes: TreeNode[] = [];

    public constructor(objectInitializer?: Partial<TreeNode>) {
        Object.assign(this, objectInitializer);
    }
}