export default async ({ app }) => {

    app.router.afterEach((to, from) => {
      if (from.name == null && (to.name != 'portfolio' && to.name != 'account' && to.name != 'transactions')){
          //app.router.push('/portfolio')
      }
    });
  }