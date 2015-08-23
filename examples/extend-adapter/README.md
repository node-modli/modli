# Extending Adapters

Adapters should all have a method `extend`. This method simply allows new 
methods to be attached to the object with the same scope as native methods.

## Running the Code

The code shows an example of extending `nedb` to have a `createWithRand` 
method which creates an item while automatically adding the property `randNum`
with a randomly generated integer between `1` and `5`.

To start the server simply run the application:

```
node index.js
```

This will start a service on port `8000` which you can access via a REST testing 
utility (such as [PostMan](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)).

### Create With Random

This example only supports the `POST` method:

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

The above will create the item based on the JSON object passed. In the `201` 
response body you will notice a `randNum` property was added.