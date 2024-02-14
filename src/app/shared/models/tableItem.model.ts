import { FinanceProduct } from './financeProduct.model';

export interface TableItemsI {
  items: string[][];
}

export class TableItem implements TableItemsI {
  items: string[][] = [];
  constructor(items: string[][] = []) {
    this.items = items;
  }
  static adapt(elements: FinanceProduct[]) {
    if (!elements.length) return new TableItem();

    return new TableItem(
      elements.map((element: FinanceProduct) => [
        element.logo,
        element.name,
        element.description,
        element.date_release.toString(),
        element.date_revision.toString(),
        element.id,
      ])
    );
  }
}
