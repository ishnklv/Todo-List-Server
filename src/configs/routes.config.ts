const roots = {
  authRoot: '/auth',
  taskRoot: '/tasks',
};

export default {
  root: '/',
  swagger: 'docs',
  auth: {
    root: roots.authRoot,
    signUp: 'sign-up',
    login: 'login',
    refreshToken: 'refresh-token',
    me: 'me',
  },
  task: {
    root: roots.taskRoot,
    create: '',
    findById: '/:id',
    updateById: '/:id',
    list: '',
    deleteById: '/:id',
  },
};
