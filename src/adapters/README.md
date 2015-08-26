# Adapters

Adapters are the core component for all operations on the model. Simply put; 
they establish the connection and all methods to a data source with which 
the model can then interact through.

## Foundation, Goals

The goal of all adapters should be to attempt to closely mirror the other 
adapters. This makes it simple to develop applications which utilize multiple 
data sources and adapters without needing to know the intracacies of each 
data connection.

## Core Methods

Every adapter should have the following methods by default:

* `config` Loads the configuration passed into the adapter
* `extend` Allows methods to be attached to the adapter
* `create` Defines record creation method
* `read` Defines record access/read method
* `update` Defines record update method
* `delete` Defines record delete method

## Model Methods, Properties

When an adapter is paired with a model to create a `use` instance, the resulting 
object is an extension of the combination of the model and adapter.

This simply means that methods and properties of the model are accessible by the 
adapter.

The core method `validate` is an example of this. As a member of the model lib it 
is merged with the adapter exposing it so the adapter can then utilize this method 
to validate the schema during operations:

```javascript
// namespace: myAdapter
const validationErrors = myAdapter.validate({/*...*/});
```
