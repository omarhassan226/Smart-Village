import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';
import { AdvancedChoicesComponent } from '../advanced-choices/advanced-choices.component';
import { ProductsMainDataFormComponent } from '../products-main-data-form/products-main-data-form.component';

@Component({
  selector: 'app-products-tab-shell',
  templateUrl: './products-tab-shell.component.html',
  styleUrls: ['./products-tab-shell.component.css']
})
export class ProductsTabShellComponent implements OnInit, OnDestroy {
  @Output() addProduct:EventEmitter<any> = new EventEmitter <any>();
  @Output() saveAdvanced:EventEmitter<any> = new EventEmitter <any>();
  @Output() saveDetails: EventEmitter<any> = new EventEmitter<any>();
  
  @ViewChild('mainDataForm') mainDataForm: ProductsMainDataFormComponent;
  @ViewChild('advancedChoices') advancedChoices: AdvancedChoicesComponent;

  private subs = new SubSink();
  categories;
  maincategory;
  banners:any[];
  companies;
  suppliers;
  @Input() addState;
  dataSource: any;
  getCategories = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getCategories().subscribe(res => {
      this.maincategory = res.maincategories.data;
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getSubCategories = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getSubCategories().subscribe(res => {
      this.categories = res.categories;
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getCompanies = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getCompanies().subscribe(res => {
      this.companies = res.companies;
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  
  getBanners = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getBanners().subscribe(res => {
      this.banners = res.banners;
      console.log(this.banners)

      this.banners.push({ id:'', banner_type:"اختر نوع البنر"})
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
 
 
 
  ngOnInit(): void {
    this.renderAllTabs();
    this.getBanners();
    this.getCategories();
    this.getSubCategories();
    this.getCompanies();
    this.getSellers();
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
   renderAllTabs = (): void => {
    this.dataSource = [
      {
        id: 0,
        text: 'البيانات الأساسية'
      },
      {
        id: 1,
        text: 'الخيارات المتقدمة'
      },
 
    ]
  }
  getSellers =()=>
  { 
    this.dataService.getSellers().subscribe(
    res=>
    {
     this.suppliers=res.sellers.data; 
     console.log(this.suppliers) ;})}
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  handleError = (error: any) => this.errorService.handleError(error);
  constructor( 
    private loading: LoadingService,
    public dataService: DataService,
    private errorService: ErrorHandlerService,
    private toaster: ToasterService) { };
}
