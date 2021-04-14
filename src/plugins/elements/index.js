import Vue from 'vue';
/* tslint:disable-next-line */
/* eslint-disable-line */
import lang from 'element-ui/lib/locale/lang/en';
/* tslint:disable-next-line */
import locale from 'element-ui/lib/locale';
import 'element-ui/packages/theme-chalk/lib/index.css';

import {
  Alert,
  Button,
  Card,
  Dialog,
  Form,
  FormItem,
  Input,
  Option,
  Select,
  Table,
  Tag,
} from 'element-ui';

const elements = [
  Alert,
  Button,
  Card,
  Dialog,
  Form,
  FormItem,
  Input,
  Option,
  Select,
  Table,
  Tag,
];

locale.use(lang);

elements.forEach((El) => Vue.use(El, { locale }));
