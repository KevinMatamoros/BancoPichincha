export interface FinanceProductI {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export class FinanceProduct implements FinanceProductI {
  id = '';
  name = '';
  description = '';
  logo = '';
  date_release = new Date();
  date_revision = new Date();
  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    logo: string = '',
    date_release: Date = new Date(),
    date_revision: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.date_release = date_release;
    this.date_revision = date_revision;
  }
  static adapt(value: string[]) {
    return new FinanceProduct(
      value[5],
      value[1],
      value[2],
      value[0],
      new Date(value[3]),
      new Date(value[4])
    );
  }
}
