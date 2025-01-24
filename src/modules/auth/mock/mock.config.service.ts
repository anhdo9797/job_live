export const mockConfigService = {
  get(key: string) {
    switch (key) {
      case 'MAIL_HOST':
        return 'smtp.gmail.com';
      case 'MAIL_USER':
        return '***@gmail.com';
      case 'MAIL_PASS':
        return '********';
      case 'FALLBACK_LANGUAGE':
        return 'en';
      case 'VALIDATE_EMAIL':
        return 'false';
    }
  },
};
