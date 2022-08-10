# Services Plugin

This is a simple Nuxt plugin to register services.

## Defining a service

### Implementation

Create the service implementation in `~/services`.
You can export a class or a factory function that returns an object, depending
on the needs of the service.
 
An example for a factory function in `userServiceFactory.ts`

```
// Dependencies are arguments on the factory function
export default function userServiceFactory(api: ApiService) {

    // The factory function returns an object with the exposed service methods
    return {
        getUser(id: string) {
            return apiService.get(...)
        }
    }
}
```

Or a class in `ApiService.ts`:

```
export default class ApiService {

    // Dependencies are constructor parameters
    constructor(private axios: NuxtAxiosInstance) {
    }

    get() {
        return this.axios.get(...)
    }
```

### Registration

Register all services in `config/serviceRegistry.ts`

```
import ApiService from '~/services/ApiService'
import userServiceFactory from '~/services/userServiceFactory'

export default (ctx: Context) => {

    // Init class service by creating new instance with dependencies...
    const api = new ApiService(ctx.$axios)

    // Init factory service by calling the factory with dependencies... 
    const user = userServiceFactory(api)

    // Returning the services object
    return {
        api
        user 
    }
}
```
