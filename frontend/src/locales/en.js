/* eslint-disable import/prefer-default-export */
export const en = {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    header: {
      logo: 'Hexlet Chat',
    },
    footer: {
      createdBy: 'created by',
      basedOnProject: 'based on project',
    },
    modals: {
      channelName: 'channel name',
      areYouSure: 'Are you sure?',
      add: 'Add channel',
      rename: 'Rename channel',
      remove: 'Remove channel',
    },
    chatPage: {
      messagesBox: {
        messagesCount_one: '{{count}} message',
        messagesCount_other: '{{count}} messages',
        nemMessage: 'New message',
        placeholder: 'Enter your message...',
        history: 'History',
        noLimit: 'n/l',
      },
      channelsBox: {
        title: 'Channels',
        managementChannel: 'Management channel',
        unreadMessages_one: '{{count}} unread message',
        unreadMessages_other: '{{count}} unread messages',
      },
      loading: 'Loading',
      error: 'Oops! Something went wrong =(',
    },
    notFoundPage: {
      title: 'Page not found',
      text: 'But you can go ',
      link: 'to the main page',
    },
    loginPage: {
      title: 'Login',
      fields: {
        username: 'Username',
        password: 'Password',
      },
      text: "Don't have an account? ",
      link: 'Registration',
    },
    signupPage: {
      title: 'Registration',
      fields: {
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm password',
      },
      text: 'Already have an account? ',
      link: 'Login',
    },
    buttons: {
      login: 'Login',
      signup: 'Registration',
      logOut: 'Logout',
      add: '+',
      send: 'Send',
      cancel: 'Cancel',
      remove: 'Remove',
      rename: 'Rename',
      refresh: 'Refresh the page',
      scrollToBottom: 'Scroll to bottom',
    },
    errors: {
      usernameLength: 'From 3 to 20 characters',
      channelNameLength: 'From 3 to 20 characters',
      passwordLength: 'At least 6 characters',
      required: 'Required field',
      passwordNotMatch: 'Passwords must match',
      login: 'Invalid username or password',
      signup: 'This user already exists',
      mustBeUnique: 'Must be unique',
    },
    toasts: {
      add: 'Channel created',
      rename: 'Channel renamed',
      remove: 'Channel deleted',
      netWorkError: 'Network error',
      notAuth: 'Login again',
    },
  },
};
