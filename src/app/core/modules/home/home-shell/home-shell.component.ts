import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { LoadingService } from '../../../../shared/services/loading-service/loading.service';

@Component({
  selector: 'app-home-shell',
  templateUrl: './home-shell.component.html',
  styleUrls: ['./home-shell.component.css'],
})
export class HomeShellComponent implements OnInit {
  dataSource: any;
  products: any[]
  insights: any
  review: any
  reportPerOfMonth: any[];
  reportPerOfWeek: any[]
  reportPerOfYear: any[]
  ngOnInit(): void {
    this.renderAllTabs();
    this.navigationHeaderService.headerObject$.next({
      headericon: 'home-icon',
      headerTitle: 'الرئيسية',
    });
    this.getInsight()
    this.reviewCount()
    this.getProductsMin()
    this.ReportPerOfMonth()
    this.ReportPerOfWeek()
    this.ReportPerOfYear()
    console.log(this.grossProductData)
  }
  reviewCount() {
    this.dataservice.getOrdersReview().subscribe(

      res => {
        this.review = res.count_review_orders

      }
    )
  }
  renderAllTabs = (): void => {
    this.dataSource = [
      {
        id: 0,
        text: 'أسبوعيا',
      },
      {
        id: 1,
        text: 'شهريا',
      },
      {
        id: 2,
        text: 'سنويا',
      },
    ];
  };

  grossProductData = [
    {
      state: 'Illinois',
      year1998: 423.721,
      year2001: 476.851,
      year2004: 528.904,
    },
    {
      state: 'Indiana',
      year1998: 178.719,
      year2001: 195.769,
      year2004: 227.271,
    },
    {
      state: 'Michigan',
      year1998: 308.845,
      year2001: 335.793,
      year2004: 372.576,
    },
    {
      state: 'Ohio',
      year1998: 348.555,
      year2001: 374.771,
      year2004: 418.258,
    },
    {
      state: 'chanton',
      year1998: 160.274,
      year2001: 182.373,
      year2004: 211.727,
    },
    ,
    {
      state: 'broksl',
      year1998: 160.274,
      year2001: 182.373,
      year2004: 211.727,
    },
    {
      state: 'tttt',
      year1998: 160.274,
      year2001: 182.373,
      year2004: 211.727,
    },

    {
      state: 'Wisconsin',
      year1998: 160.274,
      year2001: 182.373,
      year2004: 211.727,
    },
  ];
  showDetails = (id) => {
    this.dataservice.$productDetails.next(id);
    this.router.navigate(['/products']);

  }
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  constructor(private navigationHeaderService: NavigationHeaderService,
    private dataservice: DataService,
    private loading: LoadingService,
    private router: Router) { }
  onPointClick(e) {
    e.target.select();
  }
  getInsight() {
    /*this.showLoading()*/
    this.dataservice.getInsight().subscribe(res => {
      this.insights = res

      this.hideLoading();
    }
    );

  }
  ReportPerOfMonth(


  ) {
    this.dataservice.ReportPerOfMonth().subscribe(
      res => {
        this.reportPerOfMonth = res.grossProductData
        res.grossProductData.forEach(item => {
          item.year1998 = parseFloat(item.year1998)
          item.year2001 = parseFloat(item.year2001)
        })
        this.reportPerOfMonth = res.grossProductData
        console.log(res.grossProductData)
      })
  }
  ReportPerOfYear(


  ) {
    this.dataservice.ReportPerOfYear().subscribe(res => {
      this.reportPerOfYear = res.grossProductData
      res.grossProductData.forEach(item => {
        item.year1998 = parseFloat(item.year1998)
        item.year2001 = parseFloat(item.year2001)
      })
      this.reportPerOfYear = res.grossProductData
      console.log(res.grossProductData)
    })
  }
  ReportPerOfWeek(


  ) {
    this.dataservice.ReportPerOfWeek().subscribe(
      res => {
        this.reportPerOfWeek = res.grossProductData
        res.grossProductData.forEach(item => {
          item.year1998 = parseFloat(item.year1998)
          item.year2001 = parseFloat(item.year2001)
        })
        this.reportPerOfWeek = res.grossProductData
        console.log(res.grossProductData)
      })
  }

  getProductsMin() {
    this.dataservice.getProductsMin(


    ).subscribe(res => {

      console.log(res)
      console.log(this.products = res.details)
      this.products.forEach(element => {

        element.discount_price = element.options.map(x => x).join("-");;

        //  element.options.forEach(item => {
        //   element.discount_price=  element.discount_price+"-"+item;


        //     })
        element.product.image.image = 'https://smartvillageapp.com/app/' + element.product.image.image

      })


    })
  }
}
