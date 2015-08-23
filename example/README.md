# Example

The included example gives a basic view of the code required to complete basic 
CRUD operations on a model defined with Modli.

## Running the Code

The example is a simple express service with endpoint `/user` which has handlers 
defined for `GET`, `POST`, `PUT` and `DELETE`.

To start the server simply run the application:

```
node index.js
```

This will start a service on port `8000` which you can access via a REST testing 
utility (such as [PostMan](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)).

### Create

Since the database runs in memory it starts empty, the first step is to create 
an entry:

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
You'll notice an `_id` in the return, save this for future steps.

### Read

Now that there is something in the database, you can read using the `_id` value 
from the previously created user:

```
Method: GET
URL: http://localhost:8000/user/{INSERT-ID=HERE}
```

This should return an array where the `0` index is the record.

### Update

You can esily update the record using the `_id` again and a JSON body:

```
Method: PUT
URL: http://localhost:8000/user/{INSERT-ID=HERE}
Body:
  {
    "fname": "Bob",
    "email": "bsmith@gmail.com"
  }
```

This will return a `200` with the count of records updated.

### Delete

Deleting the record is as simple as passing the `_id`:

```
Method: DELETE
URL: http://localhost:8000/user/{INSERT-ID=HERE}
```

This will return a `200` with the count of records deleted.
