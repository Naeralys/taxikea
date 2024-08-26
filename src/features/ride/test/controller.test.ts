import each from 'jest-each'
import controller from '../controller'

/**
 * Helper test function which takes in a controller and expected existing routes
 * Will fail if the controller does not contain a matching endpoint
 */
export const testControllerRoutes = (controller, controllerRoutes) => describe('controller has paths and routes', () => {
  each(controllerRoutes).test('%s', ({ path, method }) => {
    const hasPath = controller.some(route => route.path === path)
    const hasMethod = controller.some(route => route.method === method)

    expect(hasPath).toBeTruthy()
    expect(hasMethod).toBeTruthy()
  })
})

const controllerRoutes = [{
  path: '/ride',
  method: 'post'
}, {
  path: '/ride',
  method: 'get'
}, {
  path: '/ride/bid',
  method: 'post'
}]

describe('Ride controller tests', () => {
  testControllerRoutes(controller, controllerRoutes)
})
