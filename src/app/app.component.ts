import {
  Component,
  ElementRef,
  VERSION,
  ViewChild,
  HostListener
} from '@angular/core';
import { ExcelService } from './service/excel.service';
import * as XLSX from 'xlsx';
import { IInvoice, Invoice } from './invoice.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ErrorMsg, IErrorMsg } from './errorMsg.model';
import { Displayed, IDisplayed } from './displayed.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  name = 'Certify to Sage Intacct AP Invoices Converter';
  willDownload = false;
  invoiceKeyList: string[] = [];
  invoices: any[] = [];
  errorMsg: IErrorMsg[] = [];
  fileName?: string;
  isEdit = false;
  acceptExcelOnly =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
  isExcelOnly = true;
  excelStyle = '  color: #141a46; background-color: #ec8b5e;';
  notExcelStyle = '  color: #ec8b5e; background-color: #141a46;';
  exportFileName = 'AP_Invoices';
  isEditExportFileName = false;
  isAdding = false;
  isSportMode = true;
  inputToBeAdded?: string;
  tempName?: string;
  isAutoDowload = true;
  hasOutput = false;
  outputList: any[] = [];
  displayedList: any[] = [];
  isShowDownloadBtn = false;
  allFiledNameList: Array<string[]> = [];
  storageName = 'gccny_ap_field_name';

  constructor(private excelService: ExcelService) {
    const invoice = new Invoice();
    this.invoiceKeyList = Object.keys(invoice);
    this.allFiledNameList.push(this.invoiceKeyList);
    localStorage.setItem(this.storageName, JSON.stringify(this.allFiledNameList));
    const checkPoint = localStorage.getItem(this.storageName);
    if(checkPoint !== null && checkPoint.length > 0){
      const filedNameListFromStorage: Array<string[]> = JSON.parse(checkPoint);
      if(filedNameListFromStorage instanceof Array){
        filedNameListFromStorage.forEach(strList => {
          this.allFiledNameList.push(strList);
        });
      }
    }
    console.log(this.allFiledNameList);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isEdit = false;
    }
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    this.fileName = ev.target.files[0].name;
    reader.onload = event => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      // document.getElementById('output').innerHTML = dataString
      //   .slice(0, 300)
      //   .concat('...');
      // this.setDownload(dataString);

      const jsonArr = JSON.parse(dataString);
      this.outputList = [];
      this.displayedList = [];
      if (workBook.SheetNames.length !== undefined) {
        for (let i = 0; i < workBook.SheetNames.length; i++) {
          this.invoices = [];
          jsonArr[workBook.SheetNames[i]].forEach(obj => {
            const invoiceObj = this.invoiceKeyList.reduce((carry, item) => {
              carry[item] = undefined;
              return carry;
            }, {});

            let isObjNotEmpty = false;
            for (var key in obj) {
              this.invoiceKeyList.forEach(k => {
                // console.log("key: " + key + ", value: " + obj[key])
                // console.log("k: " + k + ", value: " + invoiceObj[k]);
                // console.log(key === k);
                if (key === k) {
                  if (obj[key] !== undefined) {
                    invoiceObj[k] = obj[key];
                    isObjNotEmpty = true;
                  }
                }
              });
              // console.log("key: " + key + ", value: " + obj[key])
            }
            // console.log(isObjNotEmpty)
            // console.log(invoiceObj)
            if (isObjNotEmpty) {
              this.invoices.push(invoiceObj);
            }
          });
          this.countLineNO();
          if (this.invoices.length > 0) {
            this.excelService.exportAsExcelFile(
              this.invoices,
              this.exportFileName,
              !this.isAutoDowload
            );
            this.outputList.push(this.invoices);
            if(this.isAutoDowload){
              if(this.checkIfOutputListNotEmpty()){
                this.isShowDownloadBtn = true;
              }
            }
            else{
              if(this.checkIfOutputListNotEmpty()){
                this.hasOutput = true;
              }
            }
            const itemObj: IDisplayed = new Displayed();
            itemObj.name = workBook.SheetNames[i];
            if(itemObj.displayList === undefined){
              itemObj.displayList = [];
            }
            itemObj.displayList.push(this.invoices);
            this.displayedList.push(itemObj);
          } else {
            const msgObj = new ErrorMsg();
            msgObj.msg =
              'Sheet ' +
              (i + 1) +
              ' does not match any field names that are shown in the botton of the list OR File: ' +
              this.fileName +
              ' does not accept';
            msgObj.isDisplayed = true;
            this.errorMsg.push(msgObj);
            this.checkIfOutputListNotEmpty();
          }
        }
      } else {
        this.invoices = [];
        jsonArr[workBook.SheetNames[0]].forEach(obj => {
          const invoiceObj = this.invoiceKeyList.reduce((carry, item) => {
            carry[item] = undefined;
            return carry;
          }, {});

          let isObjNotEmpty = false;
          for (var key in obj) {
            this.invoiceKeyList.forEach(k => {
              // console.log("key: " + key + ", value: " + obj[key])
              // console.log("k: " + k + ", value: " + invoiceObj[k]);
              // console.log(key === k);
              if (key === k) {
                if (obj[key] !== undefined) {
                  invoiceObj[k] = obj[key];
                  isObjNotEmpty = true;
                }
              }
            });
            // console.log("key: " + key + ", value: " + obj[key])
          }
          // console.log(isObjNotEmpty)
          // console.log(invoiceObj)
          if (isObjNotEmpty) {
            this.invoices.push(invoiceObj);
          }
        });
        this.countLineNO();
        if (this.invoices.length > 0) {
          this.excelService.exportAsExcelFile(this.invoices, this.exportFileName, !this.isAutoDowload);
          this.outputList.push(this.invoices);
          if(this.isAutoDowload){
            if(this.checkIfOutputListNotEmpty()){
              this.isShowDownloadBtn = true;
            }
          }
          else{
            if(this.checkIfOutputListNotEmpty()){
              this.hasOutput = true;
            }
          }
          const itemObj: IDisplayed = new Displayed();
          itemObj.name = workBook.SheetNames[0];
          if(itemObj.displayList === undefined){
            itemObj.displayList = [];
          }
          itemObj.displayList.push(this.invoices);
          this.displayedList.push(itemObj);
        } else {
          const msgObj = new ErrorMsg();
          msgObj.msg =
            'Sheet 1 does not match any field names that are shown in the botton of the list OR File: ' +
            this.fileName +
            ' does not accept';
          msgObj.isDisplayed = true;
          this.errorMsg.push(msgObj);
          this.checkIfOutputListNotEmpty();
        }
      }
      this.resetFile();
    };
    reader.readAsBinaryString(file);
  }

  checkIfOutputListNotEmpty(): boolean{
    if(this.outputList.length > 0){
      return true;
    }
    else{
      return false;
    }
  }

  countLineNO(): void {
    for (let i = 0; i < this.invoices.length; i++) {
      const item = this.invoices[i];
      let counting = 1;
      for (let j = i - 1; j >= 0; j--) {
        const compareObj = this.invoices[j];
        if (item.BILL_NO === compareObj.BILL_NO) {
          counting++;
        }
      }
      item.LINE_NO = String(counting);
    }
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector('#download');
      el.setAttribute(
        'href',
        `data:text/json;charset=utf-8,${encodeURIComponent(data)}`
      );
      el.setAttribute('download', 'xlsxtojson.json');
    }, 1000);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.invoiceKeyList,
      event.previousIndex,
      event.currentIndex
    );
  }

  editOrder(): void {
    this.isEdit = !this.isEdit;
    this.isAdding = false;
  }

  changeAcceptedFile(): void {
    this.isExcelOnly = !this.isExcelOnly;
  }

  closeErrorMsg(item: IErrorMsg): void {
    item.isDisplayed = false;
  }

  resetFile() {
    this.myInputVariable.nativeElement.value = '';
  }

  delItems(i: number): void {
    this.invoiceKeyList.splice(i, 1);
    this.isAdding = false;
  }

  prepareAddingInput(): void {
    this.isAdding = !this.isAdding;
  }

  saveInvoiceColumn(): void {
    if (this.inputToBeAdded !== undefined) {
      this.inputToBeAdded = this.inputToBeAdded.trim();
      if (this.inputToBeAdded !== '') {
        this.invoiceKeyList.push(this.inputToBeAdded);
        this.inputToBeAdded = undefined;
        if (!this.isSportMode) {
          this.isAdding = false;
        }
      }
      else{
        this.addShakingAnimation('add-input');
      }
    }
    else{
      this.addShakingAnimation('add-input');
    }
  }

  changeMode(): void {
    this.isSportMode = !this.isSportMode;
  }

  editExportFileName(): void {
    this.isEditExportFileName = true;
    this.tempName = this.exportFileName;
  }

  cancelExportFileName(): void {
    this.isEditExportFileName = false;
  }

  saveExportFileName(): void {
    if (this.tempName !== undefined) {
      this.tempName = this.tempName.trim();
      if (this.tempName !== '') {
        this.exportFileName = this.tempName;
        this.isEditExportFileName = false;
      }
      else{
        this.addShakingAnimation('file-name-input-group');
      }
    }
    else{
      this.addShakingAnimation('file-name-input-group');
    }
  }

  changeAutoDowload(): void{
    this.isAutoDowload = !this.isAutoDowload;
  }

  dowloadTheFile(index: number): void{
    // this.excelService.exportAsExcelFile(item, this.exportFileName, false);
    this.excelService.exportAsExcelFile(this.outputList[index], this.exportFileName, false);
  }

  showDownloadFileBtn(): void{
    
    console.log(this.checkIfOutputListNotEmpty());
    if(this.checkIfOutputListNotEmpty()){
      this.isShowDownloadBtn = false;
      this.hasOutput = true;
    }
    else{
      const msgObj = new ErrorMsg();
      msgObj.msg = 'Sorry! There is no files'
      msgObj.isDisplayed = true;
      if(this.errorMsg === undefined){
        this.errorMsg = [];
      }
      this.errorMsg.push(msgObj);
    }
  }

  addShakingAnimation(targetId: string): void{
    document.getElementById(targetId)?.classList.add("animate__animated");
    document.getElementById(targetId)?.classList.add("animate__headShake");
    setTimeout(()=> {
      document.getElementById(targetId)?.classList.remove("animate__headShake");
      document.getElementById(targetId)?.classList.remove("animate__headShake");
    }, 500);
  }
}