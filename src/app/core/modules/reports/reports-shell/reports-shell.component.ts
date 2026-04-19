import { Component, OnInit } from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import * as Highcharts from 'highcharts';
import { DataService } from '../../../../shared/services/data-service/data.service';

@Component({
  selector: 'app-reports-shell',
  templateUrl: './reports-shell.component.html',
  styleUrls: ['./reports-shell.component.css'],
})
export class ReportsShellComponent implements OnInit {
  dataSource: any;

  architecturesInfo = [
    {
      year: 1997,
      smp: 263,
      mmp: 226,
      cnstl: 10,
      cluster: 1,
    },
    {
      year: 1999,
      smp: 169,
      mmp: 256,
      cnstl: 66,
      cluster: 7,
    },
    {
      year: 2001,
      smp: 57,
      mmp: 257,
      cnstl: 143,
      cluster: 43,
    },
    {
      year: 2003,
      smp: 0,
      mmp: 163,
      cnstl: 127,
      cluster: 210,
    },
    {
      year: 2005,
      smp: 0,
      mmp: 103,
      cnstl: 36,
      cluster: 361,
    },
    {
      year: 2007,
      smp: 0,
      mmp: 91,
      cnstl: 3,
      cluster: 406,
    },
  ];

  constructor(private navigationHeaderService: NavigationHeaderService, private dataservice:DataService) { }
  ngOnInit(): void {
    this.renderAllTabs();
    this.navigationHeaderService.headerObject$.next({
      headericon: 'reports-icon',
      headerTitle: 'التقارير',
    });
    this.ReportForsearchProduct()
    this.ReportPopularProduct()
    this.ReportOfSales()
    this.ReportOfCosts()
  }
  ReportForsearchProduct()
  {
    this.dataservice.ReportForsearchProduct().subscribe(
      res => { console.log(this.reportForsearchProduct = res) }
    )
  }
  reportPopularProduct: any[]
  reportOfCosts: any[]
  reportOfSales: any[]
  reportForsearchProduct:any[]
  ReportOfSales() {
    this.dataservice.ReportOfSales().subscribe(
      res => { console.log(this.reportOfSales = res.architecturesInfo)}
    )}
  ReportOfCosts() {
    this.dataservice.ReportOfCosts().subscribe(
      res => { console.log(this.reportOfCosts = res.architecturesInfo) }
    )}
  ReportPopularProduct() {

    this.dataservice.ReportPopularProduct().subscribe(
      res => { console.log(this.reportPopularProduct=res )}
    )
  }

  renderCharts = () => {};
  renderAllTabs = (): void => {
    this.dataSource = [
      {
        id: 0,
        text: 'التكاليف',
      },
      {
        id: 1,
        text: 'المنتجات الأكثر بحثا',
      },
      {
        id: 2,
        text: 'المنتجات الأكثر مبيعا',
      },
      {
        id: 3,
        text: 'المبيعات',
      },
    ];
  };
}
