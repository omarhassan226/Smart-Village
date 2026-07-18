import { Component, OnInit } from '@angular/core';

import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';

@Component({
  selector: 'app-reports-main',
  templateUrl: './reports-main.component.html',
  styleUrls: ['./reports-main.component.css']
})
export class ReportsMainComponent implements OnInit {
  user = [];
  userPayment = [];
  product = [];
  productsearch = [];
  internetLanguages = [];
  internetLanguages2 = [];
  valueRadio: any;
  start: any;
  end: any;
  words = [];
  showTotalalaes = false;
  showTotalZakats = false;
  showCosts = false;
  totalSalaes = 0;
  sellers: any[];
  seller_Id: any;
  sallers = [];
  priorities;
  totalOrders = 0
  totalCompany_count = 0
  returnrReportZakat = 0
  returnrReportProductMoreSearch = [];
  returnsRalesSaller = []
  returnrReportCosts = 0
  returnrReportProfits = 0;
  showProfits = false;



  customizeLabel(point) {

    return point.argumentText + ": " + point.valueText + "%";
  }
  constructor(private navigationHeaderService: NavigationHeaderService, private dataservice: DataService) { }



  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'reports-icon',
      headerTitle: 'التقارير',

    })
    this.dataservice.getSellers().subscribe(res => { this.sellers = res.sellers })
    this.priorities = [
      "المنتجات الاكثر مبيعا",
      "الطلبات حسب الولايه",
      "الطلبات حسب شركات الشحن",
      "العملاء الاكثر دفعا/طلبا",
      "الكلام الاكثر بحثا",
      "حركه المبيعات",
      "المنتجات الاكثر بحث",

      "التكاليف خلال فتره زمنيه ",
      "الذكاه خلال فتره زمنيه ",
      "الارباح خلال فتره زمنيه ",
      'البائعين الاكثر مبيعا',
    ];
  }
  handleValueChange(event) {

  }
  showReport() {

    if (this.valueRadio == "الذكاه خلال فتره زمنيه ") {
      this.totalOrders = 0
      this.totalSalaes = 0;
      this.returnrReportCosts = 0;
      this.returnrReportProfits = 0;
      this.showProfits = false;
      this.showTotalalaes = false;
      this.showTotalZakats = false;
      this.showCosts = false;
      this.user = [];
      this.userPayment = [];
      this.sallers = [];
      this.product = [];
      this.productsearch = [];
      this.words = [];
      this.internetLanguages = [];
      this.internetLanguages2 = [];
      this.reportZakat();

    }

    else if (!this.end || !this.start || !this.valueRadio) { return }
    else {
      if (this.valueRadio == "الارباح خلال فتره زمنيه ") {
        this.totalOrders = 0
        this.returnrReportCosts = 0;
        this.totalSalaes = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.userPayment = [];
        this.productsearch = [];
        this.product = [];
        this.words = [];
        this.sallers = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.reportProfits();

      }
      if (this.valueRadio == "المنتجات الاكثر بحث") {
        this.totalOrders = 0
        this.returnrReportCosts = 0;
        this.totalSalaes = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.userPayment = [];
        this.productsearch = [];
        this.product = [];
        this.words = [];
        this.sallers = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.reportProductMoreSearch();





      }
      if (this.valueRadio == "البائعين الاكثر مبيعا") {
        if (!this.seller_Id) {
          return
        }
        this.totalOrders = 0
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.sallers = [];
        this.userPayment = [];
        this.product = [];
        this.productsearch = [];
        this.words = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.salesSaller();





      }
      if (this.valueRadio == "التكاليف خلال فتره زمنيه ") {
        this.totalOrders = 0
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.sallers = [];
        this.userPayment = [];
        this.product = [];
        this.productsearch = [];
        this.words = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.reportCosts();





      }
      if (this.valueRadio == "الذكاه خلال فتره زمنيه ") {
        this.totalOrders = 0
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.userPayment = [];
        this.sallers = [];
        this.product = [];
        this.productsearch = [];
        this.words = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.reportZakat();





      }

      if (this.valueRadio == "الطلبات حسب الولايه") {
        this.totalOrders = 0
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.userPayment = [];
        this.product = [];
        this.sallers = [];
        this.productsearch = [];
        this.words = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.getReportState();





      }
      if (this.valueRadio == "حركه المبيعات") {
        this.totalOrders = 0
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.sallers = [];
        this.userPayment = [];
        this.product = [];
        this.productsearch = [];
        this.words = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.ReportSalesTotal();


      }
      if (this.valueRadio == "الكلام الاكثر بحثا") {
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.sallers = [];
        this.userPayment = [];
        this.product = [];
        this.productsearch = [];
        this.words = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.WordsSearchReport();
      }
      if (this.valueRadio == "العملاء الاكثر دفعا/طلبا") {
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.sallers = [];
        this.userPayment = [];
        this.words = [];
        this.product = [];
        this.productsearch = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.ReportUser2();
        this.ReportUser3();
      }
      if (this.valueRadio == "الطلبات حسب شركات الشحن") {
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.totalCompany_count = 0
        this.user = [];
        this.sallers = [];
        this.userPayment = [];
        this.product = [];
        this.productsearch = [];
        this.words = [];
        this.internetLanguages = [];
        this.internetLanguages2 = [];
        this.CompanyShippingReport();
      }
      if (this.valueRadio == "المنتجات الاكثر مبيعا") {
        this.totalSalaes = 0;
        this.returnrReportCosts = 0;
        this.returnrReportProfits = 0;
        this.showProfits = false;
        this.showTotalalaes = false;
        this.showTotalZakats = false;
        this.showCosts = false;
        this.user = [];
        this.sallers = [];
        this.userPayment = [];
        this.words = [];
        this.product = [];
        this.productsearch = [];
        this.internetLanguages = [];
        this.internetLanguages2 = []; this.Report1();
      }


    }
  }

  getReportState() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.ReportStateSales(body).subscribe(res => {
      console.log(res)
      this.internetLanguages = [];
      res.states.forEach(element => {
        this.totalOrders = this.totalOrders + element.count_order
      })
      res.states.forEach(element => {

        this.internetLanguages.push({
          language: element.state,
          percent: (element.count_order * 100) / this.totalOrders
        })

      });



    })

  }
  Report1() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.Report1(body).subscribe(res => {
      console.log(res)
      res.sales.forEach(element => {
        element.offer_status = ''
        element.values.forEach(item => {
          element.offer_status = element.offer_status + item.name_ar + "_";

        });
      });
      this.product = res.sales

    });

  }
  ReportUser2() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.ReportUser2(body).subscribe(res => {
      console.log(res)
      res.users.forEach(element => {
        this.user.push({ fullName: element.full_name, count_sales: element.count_sales })

      });


    })

  }
  ReportUser3() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.ReportUser3(body).subscribe(res => {
      console.log(res)
      res.users.forEach(element => {
        this.userPayment.push({ fullName: element.full_name, cost_order: element.cost_order })

      });

    })
  }
  WordsSearchReport() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.WordsSearchReport(body).subscribe(res => {
      console.log(res)
      this.words = res.words

    })
  }
  CompanyShippingReport() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.CompanyShippingReport(body).subscribe(res => {
      console.log(res)
      this.internetLanguages2 = [];
      res.company.forEach(element => {
        this.totalCompany_count = this.totalCompany_count + element.company_shipping_count
      })
      res.company.forEach(element => {

        this.internetLanguages2.push({
          language: element.name_ar,
          percent: (element.company_shipping_count * 100) / this.totalCompany_count
        })

      });
    })
  }

  ReportSalesTotal() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.ReportSalesTotal(body).subscribe(res => {
      this.totalSalaes = res.cost;
      this.showTotalalaes = true
    })

  }


  formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  reportZakat() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.reportZakat(body).subscribe(res => {
      this.returnrReportZakat = res.orders;
      this.showTotalZakats = true
    })



  }
  reportCosts() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.reportCosts(body).subscribe(res => {
      this.returnrReportCosts = res.costs;
      this.showCosts = true
    })



  }
  reportProductMoreSearch() {
    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.reportProductMoreSearch(body).subscribe(res => {
      this.productsearch = res;
    })



  }
  salesSaller() {
    const body = { saller_id: this.seller_Id, start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.salesSaller(body).subscribe(res => {
      res.sallers.forEach(element => {
        element.offer_status = ''
        element.values.forEach(item => {
          element.offer_status = element.offer_status + item.name_ar + "_";

        });
      });
      this.sallers = res.sallers;
    })



  }
  reportProfits() {

    const body = { start_at: this.formatDate(this.start), end_at: this.formatDate(this.end) }
    this.dataservice.reportProfits(body).subscribe(res => {
      this.returnrReportProfits = res.cost;

      this.showProfits = true;
    })

  }
}
