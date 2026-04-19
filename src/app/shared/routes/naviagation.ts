export const ProjectRoutes = [
  {
    id: '1',
    text: 'الرئيسية',
    icon: 'home-icon',
    route: 'home',
  },
  {
    id: '2',
    text: 'المنتجات',
    icon: 'products-icon',
    route: 'products',
  },
  {
    id: '3',
    text: 'التصنيفات',
    icon: 'categories',
    route: 'categories',
  },

  {
    id: '4',
    text: 'العملاء',
    icon: 'customers-icon',
    route: 'customers',
  },
  {
    id: '5',
    text: 'الطلبات',
    icon: 'far fa-shopping-cart',
    items: [
      {
        id: '2_1',
        text: 'طلبات العميل',
        route: 'orders',
      },
      {
        id: '2_2',
        text: 'كل الطلبات',
        route: 'orders-status',
      },
    ],
  },
  {
    id: '6',
    text: 'التوصيل',
    icon: 'delivery-icon',
    route: 'delivering',
  },
  {
    id: '7',
    text: 'التقارير',
    icon: 'reports-icon',
    route: 'reports',
  },
  {
    id: '8',
    text: 'التكاليف',
    icon: 'costs',
    route: 'costs',
  },
  {
    id: '9',
    text: 'الإعدادت',
    icon: 'settings-icon',
    route: 'settings',
  },
  {
    id: '10',
    text: 'المشرفين',
    icon: 'user',
    route: 'admin',
  },
  {
    id: '11',
    text: 'البنرات',
    icon: 'image',
    route: 'banners',
  },
  {
    id: '12',
    text: 'الصلاحيات',
    icon: 'key',
    route: 'roles',
  },
];
