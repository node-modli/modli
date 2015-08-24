# Custom Adapter

The included example shows how to develop and implement a custom adapter for
a datasource.

For the example, the adapter is simply an in-memory object store where records
are appended (`create`) and can be accessed by their `id` (`read`).

## Running the Code

The example is a simple express service with endpoint `/user` which has handlers
defined for `GET` and `POST`.

To start the server simply run the application:

```
node index.js
```

This will start a service on port `8000` which you can access via a REST testing
utility (such as [PostMan](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)).

### Create

To create an entry, run the following against the endpoint:

```
Method: POST
URL: http://localhost:8000/user
Body (JSON):
  {
    "fname": "John",
    "lname": "Smith",
    "email": "jsmith@gmail.com"
  }
```

The above will create a record and return `201` with the content you submitted.
You'll notice an `id` in the return, save this for future steps.

### Read

Now that there is something in the database, you can read using the `id` value 
from the previously created user:

```
Method: GET
URL: http://localhost:8000/user/{INSERT-ID=HERE}
```

This should return the record you just created.