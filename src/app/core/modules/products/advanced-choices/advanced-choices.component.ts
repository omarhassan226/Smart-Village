import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { element } from 'protractor';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';


@Component({
  selector: 'app-advanced-choices',
  templateUrl: './advanced-choices.component.html',
  styleUrls: ['./advanced-choices.component.css'],
})
export class AdvancedChoicesComponent implements OnInit {
  @Output() saveAdvanced: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveDetails: EventEmitter<any> = new EventEmitter<any>();
  select;
  advancedSearchForm: FormGroup;
  advancedSearchForm2: FormGroup;
  options = [];
  items: FormArray;
  types: FormArray;
  option1 = [];
  option2 = [];
  option3 = [];
  counter = 0;
  unlimited_quantity = false;
  disableCount = false;
  lengthOPtion: any;
  edit = false;
  lenrthvalues = 0;
  path = 'https://smartvillageapp.com/app/';
  imgSrc = '../../../../../assets/images/upload.png';


  advancedChoices = [{ key: 'text', value: 'نص' }, { key: 'Color', value: 'اللون' }, { key: 'image', value: 'صورة' }];
  companies = [
    {
      ID: 1,
      CompanyName: 'Super Mart of the West',
      Address: '702 SW 8th Street',
      City: 'Bentonville',
      State: 'Arkansas',
      Zipcode: 72716,
      Phone: '(800) 555-2797',
      Fax: '(800) 555-2171',
      Website: 'http://www.nowebsitesupermart.com',
    },
    {
      ID: 4,
      CompanyName: "Tom's Club",
      Address: '999 Lake Drive',
      City: 'Issaquah',
      State: 'Washington',
      Zipcode: 98027,
      Phone: '(800) 955-2292',
      Fax: '(800) 955-2293',
      Website: 'http://www.nowebsitetomsclub.com',
    },
  ];
  constructor(private fb: FormBuilder, private toaster: ToasterService) { }
  choices = [];
  values1 = [];
  values2 = [];
  values3 = [];
  allvalues = [];
  result = [];
  details = [];
  images = [];

  addValue = (i) => {

    this.options[i].values.push({
      "name_ar": "",
      "name_en": "",
      "display_value": "",
      "randam_key": this.getRandomKey()
    });

    this.options.forEach((el) => {
      this.allvalues.push(el.values);
    });
    this.getoptions();
    console.log(this.options)
    console.log(this.result)
  }
  getRandomKey = () => {
    return Math.floor(Math.random() * 5470 * 1000);
  }
  addOption = () => {
    this.allvalues = [];
    this.options.push({
      "label_ar": "",
      "label_en": "",
      "type": "",
      "values": []
    });
  }
  ngOnInit(): void {

  }
  patchOptions = (options, details, edit) => {
    this.edit = edit
    this.lengthOPtion = options.length;
    console.log("fdfdf", options.length);
    this.options = [];
    if (options && options.length > 0) {
      options.forEach((e1, i) => {
        this.lenrthvalues = this.lenrthvalues + options[i].values.length;
        options[i].values.forEach((e2, j) => {
          if (options[i].type == 'image') {


            options[i].values[j].display_value = options[i].values[j].display_value;
            console.log(options[i].values[j].display_value);
          }

        });
      });
      this.options = options;
      let l = 1;
      this.options.forEach(item => {
        l = l * item.values.length;
      }


      )
      console.log(l);
      if (details.length < l) {
        for (let i = 0; i < l - details.length; i++) {
          details.push({

            "id": "",
            "parcode": "",
            "price": '',
            "cost_price": "",
            "sku": "",
            "price_sale": "",
            "discount_price": "",
            "min_quantity": 0,
            "report_status": false,
            "quantity": 0,
            "values": [
              {
                "option_key1": "",
                "option_key2": "",
                "option_key3": ""
              }

            ]
          }
          )

        }


      }



      this.options.forEach((el) => {
        this.allvalues.push(el.values);
      });
      if (details && details.length > 0) {
        this.details = details;
      }


      this.getPatchoptions(details);
    }

    console.log("gdfgdfg", this.lenrthvalues)
  }
  plus = (i) => {
    this.details[i].quantity++;

  }
  minus = (i) => {
    this.details[i].quantity--;
  }
  getoptions = () => {

    this.result = [];
    let newdetails = [];
    let detailsCust = this.details;
    this.details = [];
    if (this.options.length == 1 && this.allvalues.length > 0) {

      this.allvalues[0].forEach(el1 => {
        this.result.push(`${el1.name_ar}`);
        newdetails.push({
          "id": "",
          "parcode": "",
          "price": '',
          "cost_price": "",
          "sku": "",
          "price_sale": "",
          "key_search": "",
          "discount_price": "",
          "min_quantity": 0,
          "report_status": false,
          "quantity": 0,
          "values": [
            {
              "option_key1": el1.randam_key,
              "option_key2": "",
              "option_key3": ""
            }

          ]
        }
        )
      });
    }
    else if (this.options.length == 2 && this.allvalues.length > 0) {
      this.allvalues[0].forEach(el1 => {
        this.allvalues[1].forEach(el2 => {
          this.result.push(`${el1.name_ar} / ${el2.name_ar}`);
          if (!this.details.length) {

          }
          newdetails.push({
            "id": "",
            "parcode": "",
            "price": '',
            "cost_price": "",
            "sku": "",
            "key_search": "",
            "price_sale": "",
            "discount_price": "",
            "min_quantity": '',
            "report_status": false,
            "quantity": "",
            "values": [
              {
                "option_key1": el1.randam_key,
                "option_key2": el2.randam_key,
                "option_key3": ""
              }

            ]
          }
          )
        });
      });
    } else if (this.options.length == 3 && this.allvalues.length > 0) {
      this.allvalues[0].forEach(el1 => {
        this.allvalues[1].forEach(el2 => {
          this.allvalues[2].forEach(el3 => {
            this.result.push(`${el1.name_ar} / ${el2.name_ar} / ${el3.name_ar}`);
            newdetails.push({
              "id": "",
              "parcode": "",
              "price": '',
              "cost_price": "",
              "sku": "",
              "key_search": "",
              "price_sale": "",
              "discount_price": "",
              "min_quantity": '',
              "report_status": false,
              "quantity": "",
              "values": [
                {
                  "option_key1": el1.randam_key,
                  "option_key2": el2.randam_key,
                  "option_key3": el3.randam_key
                }

              ]
            }
            )
          });
        });
      });

    }
    if (this.edit) {
      let valueslen = 0
      if (this.options && this.options.length > 0) {

        this.options.forEach((e1, i) => {
          valueslen = valueslen + this.options[i].values.length;
        })
      }
      if (this.options.length == this.lengthOPtion && valueslen >= this.lenrthvalues) {
        for (let x = 0; x < detailsCust.length; x++) {

          newdetails[x].id = detailsCust[x].id;
          newdetails[x].price_sale = detailsCust[x].price_sale;
          newdetails[x].parcode = detailsCust[x].parcode;
          newdetails[x].price = detailsCust[x].price;
          newdetails[x].cost_price = detailsCust[x].cost_price;
          newdetails[x].Key_search = detailsCust[x].Key_search;
          newdetails[x].sku = detailsCust[x].sku;
          newdetails[x].discount_price = detailsCust[x].discount_price;
          newdetails[x].report_status = detailsCust[x].report_status;
          newdetails[x].quantity = detailsCust[x].quantity;
          newdetails[x].values = detailsCust[x].values;




        }

      }
      else {
        if (this.options.length == this.lengthOPtion && valueslen < this.lenrthvalues) {
          for (let x = 0; x < newdetails.length; x++) {

            newdetails[x].id = detailsCust[x].id;
            newdetails[x].price_sale = detailsCust[x].price_sale;
            newdetails[x].parcode = detailsCust[x].parcode;
            newdetails[x].price = detailsCust[x].price;
            newdetails[x].cost_price = detailsCust[x].cost_price;
            newdetails[x].Key_search = detailsCust[x].Key_search;
            newdetails[x].sku = detailsCust[x].sku;
            newdetails[x].discount_price = detailsCust[x].discount_price;
            newdetails[x].report_status = detailsCust[x].report_status;
            newdetails[x].quantity = detailsCust[x].quantity;
            newdetails[x].values = detailsCust[x].values;

          }
        }

      }
    }
    this.details = newdetails;

    console.log(this.details);
    console.log(this.allvalues[0])
    console.log(this.allvalues[1])
    console.log(this.allvalues[2])

  }
  getPatchoptions = (details) => {

    this.result = [];
    this.details = [];
    if (this.options.length == 1 && this.allvalues.length > 0) {

      this.allvalues[0].forEach(el1 => {
        this.result.push(`${el1.name_ar} `);

      });
    }
    else if (this.options.length == 2 && this.allvalues.length > 0) {
      this.allvalues[0].forEach(el1 => {
        this.allvalues[1].forEach(el2 => {
          this.result.push(`${el1.name_ar}/ ${el2.name_ar}`);
          if (!this.details.length) {

          }

        });
      });
    } else if (this.options.length == 3 && this.allvalues.length > 0) {
      this.allvalues[0].forEach(el1 => {
        this.allvalues[1].forEach(el2 => {
          this.allvalues[2].forEach(el3 => {
            this.result.push(`${el1.name_ar} / ${el2.name_ar}/ ${el3.name_ar}`);

          });
        });
      });

    }
    this.details = details;


  }
  saveAll = () => {

    console.log(this.options)
    // const formData = new FormData();
    // this.options.forEach((el,i) => {
    //   this.options[i].values.forEach((element,j) => {
    //     formData.append('id',ele)
    //     formData.append('name_ar', element.name_ar);
    //     formData.append('name_en', element.name_en);
    //     formData.append('display_value', element.display_value);
    //     formData.append('randam_key', element.randam_key);
    //     this.options[i].values[j]= formData;

    //   });
    // } )
    console.log(this.options)
    let form = new FormData();
    this.options.forEach((el, i) => {

      form.append("options[" + i + "][label_ar]", el['label_ar']);
      form.append("options[" + i + "][label_en]", el['label_en']);
      form.append("options[" + i + "][type]", el['type']);

      this.options[i].values.forEach((el1, j) => {
        form.append("options[" + i + "][values][" + j + "][name_ar]", el1['name_ar']);
        form.append("options[" + i + "][values][" + j + "][name_en]", el1['name_en']);
        form.append("options[" + i + "][values][" + j + "][display_value]", el1['display_value'] || "");
        form.append("options[" + i + "][values][" + j + "][randam_key]", el1['randam_key']);
      });

    })


    this.details.forEach(element => {

      if (element.price_sale == "" || element.price_sale == null) {
        this.counter = this.counter + 1;

      }

      if (element.report_status == true) {
        element.report_status = "yes"

      }
      else {
        element.report_status = "no"


      }
    })
    if (this.counter > 0) {
      this.toaster.showErrorToast("سعر البيع مطلوب مع كل التفاصيل")
      this.counter = 0
    }
    else {
      this.saveAdvanced.emit(form);
      this.saveDetails.emit({ "details": this.details });
    }

    console.log(this.details)

  }
  showPreview(event: any, i, j, img) {


    this.images = [...this.allvalues];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => img.src = e.target.result;

      reader.readAsDataURL(event.target.files[0]);
      const form: FormData = new FormData();
      form.append('display_value', event.target.files[0]);
      console.log(event.target.files)
      this.options[i].values[j]['display_value'] = event.target.files[0];



    }
  }

  deleteValue = (i, j) => {
    this.options[i].values.splice(j, 1);
    this.getoptions();
  }
  deleteOption = (i) => {
    this.options.splice(i, 1);
    this.getoptions();
  }



}
