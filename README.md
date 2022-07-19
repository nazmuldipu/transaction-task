# Transaction Commission Calculator
A nodejs application to calculate commission on each transaction.

## Installing

* Clone the repository.
* Navigate to the repository folder using your preferred terminal
* Type in ``npm install`` to install the required dependencies

```js
git clone https://github.com/nazmuldipu/transaction-task.git
cd transaction-task
npm install
```


## Run the application

You can use the ``npm start`` command to run the application.

To run the application, a parameter must be passed to the application. The accepted parameter is a path to a json file, from which the app will receive the data. The JSON file should contain an array of objects. In this repo a file name ``data.json`` provided as sample data.

Example:
```js
npm start ./data.json
```
### Sample Data:
```js
[{
		"date": "2016-01-05",
		"user_id": 1,
		"user_type": "natural",
		"type": "cash_in",
		"operation": {
			"amount": 200.00,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-01-06",
		"user_id": 2,
		"user_type": "juridical",
		"type": "cash_out",
		"operation": {
			"amount": 300.00,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-01-06",
		"user_id": 1,
		"user_type": "natural",
		"type": "cash_out",
		"operation": {
			"amount": 30000,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-01-07",
		"user_id": 1,
		"user_type": "natural",
		"type": "cash_out",
		"operation": {
			"amount": 1000.00,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-01-07",
		"user_id": 1,
		"user_type": "natural",
		"type": "cash_out",
		"operation": {
			"amount": 100.00,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-01-10",
		"user_id": 1,
		"user_type": "natural",
		"type": "cash_out",
		"operation": {
			"amount": 100.00,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-01-10",
		"user_id": 2,
		"user_type": "juridical",
		"type": "cash_in",
		"operation": {
			"amount": 1000000.00,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-01-10",
		"user_id": 3,
		"user_type": "natural",
		"type": "cash_out",
		"operation": {
			"amount": 1000.00,
			"currency": "EUR"
		}
	},
	{
		"date": "2016-02-15",
		"user_id": 1,
		"user_type": "natural",
		"type": "cash_out",
		"operation": {
			"amount": 300.00,
			"currency": "EUR"
		}
	}
]
```

## Test the application

In this application few unit test written using ``Jest`` to test the functinality of code/module. To run the tests, you can simply execute the following command: 

```js
npm test
```

## Author:
Nazmul Alam 

Email: nazmuldipu@gmail.com