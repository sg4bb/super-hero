
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/consult', component: () => import('pages/ConsultHero.vue') }, // Consultar Todos los superheroes
      { path: '/consult/id', component: () => import('pages/ConsultHerobyID.vue') }, // Consultar Superheroe por ID
      { path: '/consult/param', component: () => import('pages/ConsultHerobyParam.vue') }, // Consultar Superheroe por Parametro
      { path: '/edit', component: () => import('pages/ModHero.vue') }, // Modificar o eliminar Superheroe
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
