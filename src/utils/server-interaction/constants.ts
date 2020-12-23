export const SERVICE_NAMES = {
  'get-identification-session': 'Идентификация',
  'send-sms': 'Отправка SMS',
  'sign-send-sms': 'Отправка SMS',
  'get-authentification': 'Проверка SMS',
  'get-auth-close': 'Получение аутентификационной сессии',
  'get-limit': 'Получение лимитов',
  'offer-get': 'Получение предложений',
  'create-vcard': 'Создание виртуальной карты',
  'get-vcards': 'Получение активных карт',
  'save-transh': 'Сохрание транша',
  'sign-session': 'Создание сессии подписания',
  'sign-anything': 'Подписание',
  'get-documents': 'Получение списка документов',
  'get-credits': 'Получение активных кредитов',
  'get-transh': 'Получение активных кредитов',
  'update-vcard': 'Получение активных кредитов',
  'create-transh': 'Получение активных кредитов',
  '/v1/authenticate': 'Получение сессионного токена',
  '/v1/authenticate/proceed': 'Проверка ОТП кода',
  '/v1/security/ping': 'Продлить сессию',
  '/v1/security/logout': 'Выход из приложения',
} as const;

export const FAKE_RESPONSE_DEFAULT_TIME = 1000;
