export interface IInvoice {
  BILL_NO?: string;
  VENDOR_ID?: string;
  POSTING_DATE?: string;
  CREATED_DATE?: string;
  DUE_DATE?: string;
  TOTAL_DUE?: string;
  TOTAL_PAID?: string;
  PAID_DATE?: string;
  LINE_NO?: string;
  ACCT_NO?: string;
  LOCATION_ID?: string;
  DEPT_ID?: string;
  AMOUNT?: string;
  APBILLITEM_PROJECTID?: string;
}

export class Invoice implements IInvoice {
  constructor(
    public BILL_NO?: string,
    public VENDOR_ID?: string,
    public POSTING_DATE?: string,
    public CREATED_DATE?: string,
    public DUE_DATE?: string,
    public TOTAL_DUE?: string,
    public TOTAL_PAID?: string,
    public PAID_DATE?: string,
    public LINE_NO?: string,
    public ACCT_NO?: string,
    public LOCATION_ID?: string,
    public DEPT_ID?: string,
    public AMOUNT?: string,
    public APBILLITEM_PROJECTID?: string,
  ) {}
}
