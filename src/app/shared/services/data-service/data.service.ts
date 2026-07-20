import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: string;
  apiUrl = "https://smartvillageapp.com/app/admin"
  httpOptions;
  httpOptions2;

  $productDetails = new BehaviorSubject<any>(false);
  $loginDetails = new BehaviorSubject<any>(false);
  Token$ = new Observable<any>();
  login = (body: any): Observable<any> => {
    this.Token$ = this.http.post(`https://smartvillageapp.com/app/oauth/token`, body);
    this.Token$.subscribe(res => {
      this.httpOptions = {
        headers: new HttpHeaders({
          'access-control-allow-origin': "*",
          'content': 'application/json',
          'Authorization': 'Bearer ' + res["access_token"]
        })
      }
      this.getuserName().subscribe(res => {
        this.$loginDetails.next(res.admin.username);
        this.cookieService.set('userName', res.admin.username)
      });

    })
    return this.Token$;
  }

  getSocial = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/Social`, this.httpOptions);
  updateSocial = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/Social`, body, this.httpOptions);
  getQuestions = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/questions`, this.httpOptions);
  getQuestionById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/questions/${id}`, this.httpOptions);
  addQuestion = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/questions`, body, this.httpOptions);
  deleteQuestion = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/questions/${id}`, this.httpOptions);
  editQuestion = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/questions/${id}`, body, this.httpOptions);

  getCompanies = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/companies`, this.httpOptions);
  addcompany = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/companies`, body, this.httpOptions);
  deletecompany = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/companies/${id}`, this.httpOptions);
  getCompanyById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/companies/${id}/edit`, this.httpOptions);
  editCompany = (body, id): Observable<any> => this.http.post<any>(`${this.apiUrl}/companies/${id}?_method=PUT`, body, this.httpOptions);
  getProductsall = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/product`, this.httpOptions);

  getProducts = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/product/available/stock`, this.httpOptions);
  getProductById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/product/${id}`, this.httpOptions);
  addProduct = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/product`, body, this.httpOptions);
  deleteProduct = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/product/${id}`, this.httpOptions);
  editProduct = (body, id): Observable<any> => this.http.post<any>(`${this.apiUrl}/product/${id}?_method=PUT`, body, this.httpOptions);
  saveAdvanced = (body, id): Observable<any> => this.http.post<any>(`${this.apiUrl}/save/advanced/setting/product/${id}`, body, this.httpOptions);
  saveDetails = (body, id): Observable<any> => this.http.post<any>(`${this.apiUrl}/save/advanced/details/product/${id}`, body, this.httpOptions);

  addCustomer = (body: any): Observable<any> => this.http.post<any>(`${this.apiUrl}/users`, body, this.httpOptions);
  deleteCustomer = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/users/${id}`, this.httpOptions);
  editCustomer = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/users/${id}`, body, this.httpOptions);
  getCustomerList = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/users`, this.httpOptions);
  getCustomerById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/users/${id}`, this.httpOptions);

  addVillage = (body: any): Observable<any> => this.http.post<any>(`${this.apiUrl}/Village`, body, this.httpOptions);
  getVillages = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/Village`, this.httpOptions);
  deleteVillage = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/Village/${id}`, this.httpOptions);
  editVillage = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/Village/${id}`, body, this.httpOptions);
  getVillageList = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/Village`, this.httpOptions);
  getVillageById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/Village/${id}`, this.httpOptions);
  filterVillage = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/getVillage/belong/City?city_id=${id}`, this.httpOptions);

  addState = (body: any): Observable<any> => this.http.post<any>(`${this.apiUrl}/state`, body, this.httpOptions);
  getStates = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/state`, this.httpOptions);
  deleteState = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/state/${id}`, this.httpOptions);
  editState = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/state/${id}`, body, this.httpOptions);
  getStateList = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/state`, this.httpOptions);
  getStateById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/state/${id}`, this.httpOptions);

  addCity = (body: any): Observable<any> => this.http.post<any>(`${this.apiUrl}/city`, body, this.httpOptions);
  getCities = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/city`, this.httpOptions);
  deleteCity = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/city/${id}`, this.httpOptions);
  editCity = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/city/${id}`, body, this.httpOptions);
  getCityList = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/city`, this.httpOptions);
  getCityById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/city/${id}`, this.httpOptions);
  filterCity = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/getCity/belong/state?state_id=${id}`, this.httpOptions);


  getCosts = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/costs`, this.httpOptions);
  filterCosts = (query): Observable<any> => this.http.get<any>(`${this.apiUrl}/filter/costs?${query}`, this.httpOptions);
  getCostById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/costs/${id}`, this.httpOptions);
  addCost = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/costs`, body, this.httpOptions);
  deleteCost = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/costs/${id}`, this.httpOptions);
  editCost = (body, id): Observable<any> => this.http.post<any>(`${this.apiUrl}/costs/${id}?_method=PUT`, body, this.httpOptions);

  getShippings = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/shipping`, this.httpOptions);
  getShippingById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/shipping/${id}/edit`, this.httpOptions);
  addShipping = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/shipping`, body, this.httpOptions);
  deleteShipping = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/shipping/${id}`, this.httpOptions);
  editShipping = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/shipping/${id}`, body, this.httpOptions);
  getCategories = (): Observable<any> => this.http.get(`${this.apiUrl}/category`, this.httpOptions);
  getSubCategories = (): Observable<any> => this.http.get(`${this.apiUrl}/subcategories`, this.httpOptions);


  addCategory = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/category`, body, this.httpOptions2);
  getCategoryById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/category/${id}`, this.httpOptions);
  editCategory = (body, id): Observable<any> => this.http.post<any>(`${this.apiUrl}/category/${id}?_method=put`, body, this.httpOptions2);
  deleteCategory = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/category/${id}`, this.httpOptions);
  getRoles = (): Observable<any> => this.http.get(`${this.apiUrl}/roles`, this.httpOptions);
  addAdmin = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/admins`, body, this.httpOptions);
  getAdmins = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/admins`, this.httpOptions);
  deleteAdmin = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/admins/${id}`, this.httpOptions);
  editAdmin = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/admins/${id}`, body, this.httpOptions);


  getBanners = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/banner`, this.httpOptions);
  getBannerById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/banner/${id}/edit`, this.httpOptions);
  addBanner = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/banner`, body, this.httpOptions);
  deleteBanner = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/banner/${id}`, this.httpOptions);
  editBanner = (body, id): Observable<any> => this.http.post<any>(`${this.apiUrl}/banner/${id}?_method=put`, body, this.httpOptions);

  getOrdersReview = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/review/orders`, this.httpOptions);

  getOrders = (query): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/orders${query}`, this.httpOptions);
  concelOrder = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/cancel/order`, body, this.httpOptions);
  getDetailsOrder = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/order?order_id=${id}`, this.httpOptions);
  getPayments = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/payments`, this.httpOptions);
  getOrderById = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/product/${id}`, this.httpOptions);

  filterProductPrice = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/filter/product/price`, body, this.httpOptions);
  CalculatePriceShipping = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/calculate/price/shipping`, body, this.httpOptions);
  getUsers = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/users`, this.httpOptions);
  saveOrder = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/save/order`, body, this.httpOptions);
  getProductsMin = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/getProducts/min`, this.httpOptions);
  getInsight = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/insight`, this.httpOptions);
  addRole = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/roles`, body, this.httpOptions);
  editRole = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/roles/${id}`, body, this.httpOptions);
  getRoleById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/roles/${id}`, this.httpOptions);
  deleteRoleById = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/roles/${id}`, this.httpOptions);
  deleteSubCategoryById = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/subcategory/${id}`, this.httpOptions);
  authAdmins = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/auth/admins`, this.httpOptions);
  ReportPerOfWeek = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/ReportPerOfWeek`, this.httpOptions);
  ReportPerOfMonth = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/ReportPerOfMonth`, this.httpOptions);
  ReportPerOfYear = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/ReportPerOfYear`, this.httpOptions);
  ReportOfSales = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/ReportOfSales`, this.httpOptions);
  ReportOfCosts = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/ReportOfCosts`, this.httpOptions);
  ReportPopularProduct = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/ReportPopularProduct`, this.httpOptions);
  updaterderStatus = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/order/status`, body, this.httpOptions);
  ReportForsearchProduct = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/ReportForsearchProduct`, this.httpOptions);

  updateSecure = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/secure`, body, this.httpOptions);
  updateShipping = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/shipping`, body, this.httpOptions);
  Secure_policy = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/secure_policy`, body, this.httpOptions);
  Privacy_policy = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/Privacy_policy`, body, this.httpOptions);

  Sales_policy = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/sales_policy`, body, this.httpOptions);
  // getShippings = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/shipping`, this.httpOptions);
  // getProducts = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/products`, this.httpOptions);
  getuserName = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/auth/admins`, this.httpOptions);
  filterCategory = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/filter/Category`, body, this.httpOptions);

  getSecure = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/secure`, this.httpOptions);

  activeUser = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/active/user`, body, this.httpOptions);
  updatePayment = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/update/payment/status?order_id=${id}`, this.httpOptions);

  // shipingsUser = (id, status, price): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/shipings/support/user?status=${status}&user_id=${id}&price=${price}`, this.httpOptions);
  shipingsUser = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/get/shipping/support/user`, body, this.httpOptions);

  updatePaymentPending = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/update/payment/status/pending?order_id=${id}`, this.httpOptions);

  getUnits = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/units`, this.httpOptions);
  sendNotification = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/sendNotification`, body, this.httpOptions);
  getcitiesbelongstate = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/get/cities/belong/state`, body, this.httpOptions);
  getvillagesbelongCity = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/get/villages/belong/City`, body, this.httpOptions);

  saveAreas = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/save/areas`, body, this.httpOptions);

  showNotifications = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/showNotifications`, this.httpOptions);
  getSuppliers = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/suppliers`, this.httpOptions);
  addSupplier = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/suppliers`, body, this.httpOptions);
  editSupplier = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/suppliers/${id}`, body, this.httpOptions);
  deleteSupplier = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/suppliers/${id}`, this.httpOptions);
  getAvailableAmount = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/available/amount`, this.httpOptions);
  getDebit = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/Debit`, this.httpOptions);
  getTracker = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/tracker`, this.httpOptions);
  getSellers = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/sellers`, this.httpOptions);
  AddSellers = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/sellers`, body, this.httpOptions);
  DeleteSellers = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/sellers/${id}`, this.httpOptions);
  UpdateSellers = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/sellers/${id}`, body, this.httpOptions);
  AddSalesInvoices = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/sales/invoices`, body, this.httpOptions);
  AddDamageInvoices = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/invoices/damage`, body, this.httpOptions);
  GetInvoicesReturn = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/invoices/return`, this.httpOptions);
  GetInvoicesSales = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/invoices`, this.httpOptions);
  GetInvoicesDamage = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/invoices/damage`, this.httpOptions);
  GetsalesInvoicesById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/sales/invoices/${id}`, this.httpOptions);
  GetDamageInvoicesById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/damage/invoices/${id}`, this.httpOptions);
  GetReturnInvoicesById = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/return/invoices/${id}`, this.httpOptions);
  AddReturnInvoices = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/invoices/return`, body, this.httpOptions);

  filterProductbarcode = (barcode): Observable<any> => this.http.get<any>(`${this.apiUrl}/filter/product/barcode/?barcode=${barcode}#R`, this.httpOptions);
  getAddressUser = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/show/shipping/address?user_id=${id}`, this.httpOptions);
  addAddressUser = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/add/shipping/address`, body, this.httpOptions);
  deleteAddressUser = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/delete/shipping/address`, body, this.httpOptions);
  getAllAddress = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/shipping/address/all`, this.httpOptions);
  ReportStateSales = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/state/sales`, body, this.httpOptions);
  WordsSearchReport = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/words/search/report`, body, this.httpOptions);

  CompanyShippingReport = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/company/shipping/report`, body, this.httpOptions);

  ReportUser3 = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/user/3`, body, this.httpOptions);

  ReportUser2 = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/user/2`, body, this.httpOptions);
  Report1 = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/1`, body, this.httpOptions);

  ReportSalesTotal = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/sales/total`, body, this.httpOptions);

  updateShippingAddress = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/shipping/address`, body, this.httpOptions);
  ReturnOrder = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/return/order`, body, this.httpOptions);

  EditvailableAmount = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/available/amount`, body, this.httpOptions);
  productReturn = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/product/return`, body, this.httpOptions);
  ProductAvailableInvoices = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/product/available/invoices`, this.httpOptions);
  updateBill = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/invoices`, body, this.httpOptions);
  UpdateDepit = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/update/depit`, body, this.httpOptions);
  salesSaller = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/sales/saller`, body, this.httpOptions);
  reportProductMoreSearch = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/product/more/search `, body, this.httpOptions);

  reportCosts = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/costs`, body, this.httpOptions);
  reportZakat = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/zakat`, body, this.httpOptions);
  reportProfits = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/report/profits`, body, this.httpOptions);
  invoicesDebit = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/invoices/debit`, this.httpOptions);
  payDebit = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/pay/debit`, body, this.httpOptions);

  GetAllkeywords = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/keywords`, this.httpOptions);
  addkeywords = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/keywords`, body, this.httpOptions);
  Updatekeywords = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/keywords/${id}`, body, this.httpOptions);
  ShowSingleCategory = (id): Observable<any> => this.http.get<any>(`${this.apiUrl}/keywords/${id}`, this.httpOptions);
  DeleteKeywords = (id): Observable<any> => this.http.delete<any>(`${this.apiUrl}/keywords/${id}`, this.httpOptions);
  GetAllSubcategories = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/categories`, this.httpOptions);
  Filterkeywords = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/category/keywords`, body, this.httpOptions);
  GetOffer = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/offer/image`, this.httpOptions);
  SetOffer = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/set/offer/image`, body, this.httpOptions);

  getBanks = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/banks`, this.httpOptions);
  addBank = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/banks`, body, this.httpOptions);
  editBank = (body, id): Observable<any> => this.http.put<any>(`${this.apiUrl}/banks/${id}`, body, this.httpOptions);

  getNotifications = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/notification`, this.httpOptions);
  getReturnOrders = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/get/orders/return/products`, this.httpOptions);

  getContactInfo = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/contact-info`, this.httpOptions);
  updateContactInfo = (body): Observable<any> => this.http.post<any>(`${this.apiUrl}/contact-info`, body, this.httpOptions);



  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("user_token")
      })
    }
    this.httpOptions2 = {
      headers: new HttpHeaders({

        'Authorization': 'Bearer ' + this.cookieService.get("user_token")
      })
    }
  }
}
