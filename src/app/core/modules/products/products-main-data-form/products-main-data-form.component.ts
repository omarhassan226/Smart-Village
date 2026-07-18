import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { DxValidatorComponent } from 'devextreme-angular';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { DataService } from '../../../../shared/services/data-service/data.service';
import * as Editor from '../../../../../../src/ckeditor5-31.0.0-ygi80ogtwnzf/build/ckeditor';

@Component({
  selector: 'app-products-main-data-form',
  templateUrl: './products-main-data-form.component.html',
  styleUrls: ['./products-main-data-form.component.css']
})
export class ProductsMainDataFormComponent implements OnInit {
  public Editor = Editor;
  public config = {
    toolbar: {
      items: [
        'heading', '|',
        'alignment', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'todoList',
        '-', // break point
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'outdent', 'indent', '|',
        'uploadImage', 'blockQuote', '|',
        'undo', 'redo'
      ],
      shouldNotGroupWhenFull: true
    }
  }

  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  @Output() addProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() editProduct: EventEmitter<any> = new EventEmitter<any>();
  @Input() addState;
  @Input() maincategory;
  @Input() categories;
  @Input() banners;
  @Input() companies;
  @Input() suppliers;
  categoryList: any[] = [];
  KeywordList: any[] = [];
  mainCategoryList: any[] = [];
  minCategoryList: any[] = [];
  mainKeywordList: any[] = [];
  imgSrc = '../../../../../assets/images/upload.png';
  selectedImg = ''
  choices = [{ key: 'yes', value: 'نعم' }, { key: 'no', value: 'لا' }];
  secures = [{ key: 'yes', value: 'نعم' }, { key: 'no', value: 'لا' }];
  units: any[]
  editProductStatus = false;
  name_ar = '';
  name_en = '';
  price = '';

  discount_price = '';
  cost = '';
  unit_number = '';
  start_discount = '';
  end_discount = '';
  symbol = '';
  stock = '';
  min_quantity = '';
  product_unit = '';
  seller_Id = '';
  weight = '';
  company_manfacure = '';
  secure = '';
  content_en = '';
  content_ar = '';
  is_choice = "";

  show_app = false;
  images = [];
  blanner_type;
  text: any

  getMinCatergories() {




    let main_category_id = [];
    if (this.mainCategoryList && this.mainCategoryList.length) {
      this.mainCategoryList.forEach(item => {
        main_category_id.push(item)
      }

      )
      const body = { main_category_id: main_category_id }
      console.log(body)

      this.dataservice.filterCategory(body).subscribe(
        res => {

          console.log(this.minCategoryList = res.categories)
        }
      )
    }
  }
  getKeywords() {


    if (this.categoryList && this.categoryList.length) {

      let min_category_id = [];
      this.categoryList.forEach(item => {
        min_category_id.push(item)
      }

      )
      const body = { categories: min_category_id }
      console.log(body)

      this.dataservice.Filterkeywords(body).subscribe(
        res => {
          this.mainKeywordList = res.keywords;
          console.log(res);
          //console.log(this.minCategoryList=res.categories)
        }
      )
    }
  }


  constructor(private toaster: ToasterService, private dataservice: DataService) { }

  ngOnInit(): void {
    this.dataservice.getSecure().subscribe(
      res => { this.secures = res.secures }
    )
    this.dataservice.getUnits().subscribe(
      res => { this.units = res.units }
    )
  }

  resetProduct = () => {
    this.is_choice = "";
    this.name_ar = '';
    this.name_en = '';
    this.price = '';
    this.discount_price = '';
    this.cost = '';
    this.start_discount = '';
    this.end_discount = '';
    this.symbol = '';
    this.stock = '';
    this.min_quantity = '';
    this.product_unit = '';
    this.weight = '';
    this.company_manfacure = '';
    this.secure = '';
    this.content_en = '';
    this.content_ar = '';
    this.seller_Id = '';
    this.unit_number = '';
    this.show_app = false;
    this.images = [];
  }
  patchProduct = (data) => {

    console.log(data)
    this.name_ar = data?.name_ar;
    this.name_en = data?.name_en;

    this.seller_Id = data?.seller_id;
    this.is_choice = data?.is_choice;
    this.price = data?.price;
    this.discount_price = data?.discount_price;
    // this.cost = data?.cost;
    this.start_discount = data?.start_discount;
    this.end_discount = data?.end_discount;
    // this.symbol = data?.symbol;
    this.stock = data?.stock;
    // this.min_quantity = data?.min_quantity;
    this.product_unit = data?.product_unit;
    this.weight = data?.weight;
    this.company_manfacure = data?.company_manfacure;
    this.secure = data?.secure;
    this.unit_number = data?.number;
    this.content_en = data?.content_en;
    this.content_ar = data?.content_ar;
    this.show_app = data?.show_app == 'false' ? true : false;
    this.images = data?.sliders;
    this.imgSrc = "https://smartvillageapp.com/app/" + data?.sliders[0]?.image;
    this.blanner_type = data.blanner_type;
    let main_categories: any[] = data?.main_categories;
    let categories: any[] = data?.categories;
    let keywords: any[] = data?.keywords;
    this.minCategoryList = data?.categories;
    this.mainKeywordList = data?.keywords;
    this.mainCategoryList = this.mainCategoryList || [];
    this.KeywordList = this.KeywordList || [];
    this.categoryList = this.categoryList || [];
    if (main_categories && main_categories.length) {
      main_categories.forEach(element => {
        if (element.id) {

          this.mainCategoryList.push(element.id);
        }


      });
    }
    if (keywords && keywords.length) {
      keywords.forEach(element => {
        if (element.id) {

          this.KeywordList.push(element.id);
        }


      });
    }

    if (categories && categories.length) {
      categories.forEach(element => {
        if (element.id) {
          this.categoryList.push(element.id);
        }

      });
    }

  }
  handleProductData = () => {

    console.log(this.price)

    let form = new FormData();
    form.append("name_ar", this.name_ar);
    form.append("name_en", this.name_en);
    form.append("price", this.price);
    form.append("number", this.unit_number)
    form.append("discount_price", this.discount_price);
    // form.append("cost", this.cost);
    if (this.start_discount == '') {
      form.append("start_discount", this.start_discount);

    }
    else {
      form.append("start_discount", this.formatDate(this.start_discount));
    }
    if (this.start_discount == '') {
      form.append("end_discount", this.end_discount);
    }
    else {
      form.append("end_discount", this.formatDate(this.end_discount));
    }
    // form.append("symbol", this.symbol);
    // form.append("stock", this.stock);
    // form.append("min_quantity", this.min_quantity);
    form.append("product_unit", this.product_unit);
    form.append("weight", this.weight);
    form.append("company_manfacure", this.company_manfacure);
    form.append("secure", this.secure);
    form.append("content_en", this.content_en);
    form.append("content_ar", this.content_ar);
    form.append("is_choice", this.is_choice);

    form.append("show_app", this.show_app.toString() == 'false' ? 'true' : 'false');
    form.append("blanner_type", this.blanner_type)
    form.append("seller_id", this.seller_Id)
    for (let i = 0; i < this.images.length; i++) {
      form.append("images[]", this.images[i]);
    }
    for (let i = 0; i < this.mainCategoryList.length; i++) {
      form.append(`maincategory[${i}][category_id]`, this.mainCategoryList[i])
    }
    for (let i = 0; i < this.categoryList.length; i++) {
      form.append(`categories[${i}][category_id]`, this.categoryList[i])
    }
    for (let i = 0; i < this.KeywordList.length; i++) {
      form.append(`keywords[${i}][word_id]`, this.KeywordList[i])
    }

    if (!this.images.length) {
      this.toaster.showErrorToast("صورة المنتج مطلوبة");
      return;
    }
    else if (!this.name_ar ||
      !this.name_en ||
      !this.price ||

      !this.product_unit ||
      !this.weight ||
      !this.company_manfacure ||
      !this.secure ||
      !this.content_en ||
      !this.content_ar || !this.unit_number || !this.is_choice) {
      return;
    } else {

      this.addProduct.emit(form);

    }
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
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
      this.images = event.target.files;
    }
    else {
      this.selectedImg = null;
    }
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }

}
