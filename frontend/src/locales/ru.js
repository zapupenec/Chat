/* eslint-disable import/prefer-default-export */
export const ru = {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    header: {
      logo: 'Hexlet Chat',
    },
    footer: {
      createdBy: 'создано',
      basedOnProject: 'на основе проекта',
    },
    modals: {
      channelName: 'Имя канала',
      areYouSure: 'Уверены?',
      add: 'Добавить канал',
      rename: 'Переименовать канал',
      remove: 'Удалить канал',
    },
    chatPage: {
      messagesBox: {
        messagesCount_one: '{{count}} сообщение',
        messagesCount_few: '{{count}} сообщения',
        messagesCount_many: '{{count}} сообщений',
        nemMessage: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
        history: 'История',
        noLimit: 'б/о',
      },
      channelsBox: {
        title: 'Каналы',
        managementChannel: 'Управление каналом',
        unreadMessages_one: '{{count}} непрочитанное сообщение',
        unreadMessages_few: '{{count}} непрочитанных сообщения',
        unreadMessages_many: '{{count}} непрочитанных сообщений',
      },
      loading: 'Загрузка',
      error: 'Упс! Что-пошло не так =(',
    },
    notFoundPage: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    loginPage: {
      title: 'Войти',
      fields: {
        username: 'Ваш ник',
        password: 'Пароль',
      },
      text: 'Нет аккаунта? ',
      link: 'Регистрация',
    },
    signupPage: {
      title: 'Регистрация',
      fields: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
      },
      text: 'Уже есть аккаунт? ',
      link: 'Войти',
    },
    buttons: {
      login: 'Войти',
      signup: 'Зарегистрироваться',
      logOut: 'Выйти',
      add: '+',
      send: 'Отправить',
      cancel: 'Отменить',
      remove: 'Удалить',
      rename: 'Переименовать',
      refresh: 'Обновить страницу',
      scrollToBottom: 'Прокрутить вниз',
    },
    errors: {
      usernameLength: 'От 3 до 20 символов',
      channelNameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      required: 'Обязательное поле',
      passwordNotMatch: 'Пароли должны совпадать',
      login: 'Неверные имя пользователя или пароль',
      signup: 'Такой пользователь уже существует',
      mustBeUnique: 'Должно быть уникальным',
    },
    toasts: {
      add: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
      netWorkError: 'Ошибка сети',
      notAuth: 'Авторизуйтесь повторно',
    },
  },
};
