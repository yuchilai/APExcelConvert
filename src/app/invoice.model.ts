export interface IInvoice {
  DONOTIMPORT?: string;
  BATCH_TITLE?: string;
  BILL_NO?: string;
  PO_NO?: string;
  VENDOR_ID?: string;
  POSTING_DATE?: string;
  CREATED_DATE?: string;
  DUE_DATE?: string;
  TOTAL_DUE?: string;
  TOTAL_PAID?: string;
  PAID_DATE?: string;
  TERM_NAME?: string;
  DESCRIPTION?: string;
  BASECURR?: string;
  CURRENCY?: string;
  EXCH_RATE_DATE?: string;
  EXCH_RATE_TYPE_ID?: string;
  EXCHANGE_RATE?: string;
  LINE_NO?: string;
  MEMO?: string;
  ACCT_NO?: string;
  ACCT_LABEL?: string;
  LOCATION_ID?: string;
  DEPT_ID?: string;
  AMOUNT?: string;
  ALLOCATION_ID?: string;
  APBILLITEM_APACCOUNT?: string;
  ACTION?: string;
  SUPDOCID?: string;
  PAYTO?: string;
  RETURNTO?: string;
  BILLABLE?: string;
  BILLED?: string;
  ASSETS_IN_SERVICE?: string;
  COST_AMOUNT?: string;
  FIXED_ASSET?: string;
  RASSET?: string;
  RCONSTRUCTION_IN_PROGRESS?: string;
  RAP_BILL_MANAGER?: string;
  RMAINTENANCE_TASK?: string;
  APBILLITEM_PROJECTID?: string;
  APBILLITEM_CUSTOMERID?: string;
  APBILLITEM_VENDORID?: string;
  APBILLITEM_EMPLOYEEID?: string;
  APBILLITEM_ITEMID?: string;
  APBILLITEM_CLASSID?: string;
}

export class Invoice implements IInvoice {
  constructor(
    public DONOTIMPORT?: string,
    public BATCH_TITLE?: string,
    public BILL_NO?: string,
    public PO_NO?: string,
    public VENDOR_ID?: string,
    public POSTING_DATE?: string,
    public CREATED_DATE?: string,
    public DUE_DATE?: string,
    public TOTAL_DUE?: string,
    public TOTAL_PAID?: string,
    public PAID_DATE?: string,
    public TERM_NAME?: string,
    public DESCRIPTION?: string,
    public BASECURR?: string,
    public CURRENCY?: string,
    public EXCH_RATE_DATE?: string,
    public EXCH_RATE_TYPE_ID?: string,
    public EXCHANGE_RATE?: string,
    public LINE_NO?: string,
    public MEMO?: string,
    public ACCT_NO?: string,
    public ACCT_LABEL?: string,
    public LOCATION_ID?: string,
    public DEPT_ID?: string,
    public AMOUNT?: string,
    public ALLOCATION_ID?: string,
    public APBILLITEM_APACCOUNT?: string,
    public ACTION?: string,
    public SUPDOCID?: string,
    public PAYTO?: string,
    public RETURNTO?: string,
    public BILLABLE?: string,
    public BILLED?: string,
    public ASSETS_IN_SERVICE?: string,
    public COST_AMOUNT?: string,
    public FIXED_ASSET?: string,
    public RASSET?: string,
    public RCONSTRUCTION_IN_PROGRESS?: string,
    public RAP_BILL_MANAGER?: string,
    public RMAINTENANCE_TASK?: string,
    public APBILLITEM_PROJECTID?: string,
    public APBILLITEM_CUSTOMERID?: string,
    public APBILLITEM_VENDORID?: string,
    public APBILLITEM_EMPLOYEEID?: string,
    public APBILLITEM_ITEMID?: string,
    public APBILLITEM_CLASSID?: string
  ) {}
}
