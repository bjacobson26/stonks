import { TreeItem, Command } from 'vscode';

export class Stock extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly quote: string,
    public readonly command?: Command
  ) {
    super(label);
  }

  get tooltip(): string {
    return `${this.label}`;
  }

  get description(): string {
    return `${this.quote}`;
  }
}