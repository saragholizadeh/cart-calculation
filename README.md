# Cart Calculation Task

A simple Node.js service that calculates the total price of a shopping cart.  
Built with **Node.js**, **Express**, and **TypeScript**.  

This project tries to demonstrate clean design, separation of concerns, and proper handling of financial calculations :)


## 🛠 Tools & Frameworks

- Node.js (>=18)
- Express
- TypeScript
- Zod (input validation)
- BigNumber.js (precise financial calculations)
- dotenv (environment configuration)
- Nodemon (development)

## Running the Project

You can run the project with docker or npm


### Using Docker

```bash
docker compose up app -d

```
### Using npm

❗️ Make sure Node.js is installed.

```bash
npm install
npm run dev
```

**`Server will run on http://localhost:3000.`**


### API Endpoint

```bash 
POST /cart/calculate
```
## Example Request

```json
{
    "items": [
        {
            "name": "Laptop",
            "price": 1200,
            "category": "electronics",
            "quantity": 1
        },
        {
            "name": "Coffee Beans",
            "price": 20,
            "category": "groceries",
            "quantity": 33
        },
        {
            "name": "Book",
            "price": 13.000002,
            "category": "books",
            "quantity": 1
        }
    ]
}
```
## Example Response

```json
{
    "success": true,
    "message": "Operation successful",
    "data": {
        "subtotal": "1873.00",
        "discountsApplied": "130.00",
        "totalAfterDiscounts": "1743.00",
        "vatAmount": "348.60",
        "totalPayable": "2091.60"
    }
}
```
<br>

**All monetary values are rounded to 2 decimal places like the assessment's example.**

<br>

## Running Unit Tests


### Using Docker

Build and run the test container:
```bash 
docker  compose up test -d
```

This will start a container that will run the tests using the test target defined in the Dockerfile. After the tests run, the container will exit. So you can see results from logs:

```bash
docker ps -a

docker logs <CONTAINER ID>
```

### Using npm (Locally)

1. Install dependencies first:

```bash
npm install
```
2. Run the tests:

```bash
npm test
```

This will execute the tests in your local environment using **Jest**.

<br>

## Unit Tests Coverage

*The unit tests are located in src/cart/tests/cart.service.spec.ts.*

Here's an overview of what each test checks:

1. Cart without bulk discount: Verifies that when the total is less than €50, no bulk discount is applied.

2. Cart with bulk discount: Verifies that when the total is over €50, the bulk discount is applied correctly.

3. Multiple items with mixed categories: Verifies that multiple items with different categories are handled correctly with their respective discounts.

4. Floating-point precision: Verifies that floating-point precision issues (like 0.1 + 0.2) are correctly handled with BigNumber.js.

<br>

## Project Structure

```
├── src
│   ├── cart
│   │   ├── cart.config.ts
│   │   ├── cart.controller.ts
│   │   ├── cart.route.ts
│   │   ├── cart.service.ts
│   │   ├── contracts
│   │   │   └── discount-rule.contract.ts
│   │   ├── rules
│   │   │   ├── cart-total-discount.rule.ts
│   │   │   └── category-discount.rule.ts
│   │   ├── tests
│   │   │   └── cart.service.spec.ts
│   │   └── types
│   │       ├── input.type.ts
│   │       └── response.type.ts
│   ├── libs
│   │   ├── api.config.ts
│   │   ├── get-vat-percentage.ts
│   │   └── response.ts
│   ├── middlewares
│   │   ├── error-handler.ts
│   │   ├── not-found.ts
│   │   └── validation.ts
│   ├── app.ts
│   └── server.ts
├── docker-compose.yml
├── Dockerfile
├── jest.config.ts
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── sample.env
└── tsconfig.json

```

### As you see, **Separation of Concerns** is followed:

- **Route** → API endpoints

- **Controller** → Handles request and response

- **Service** → Core calculation logic (CartService)

- **Contracts** → Interfaces for discounts (Strategy pattern)

- **Rules** → Discount implementations

- **Middlewares** → Validation & error handling


<hr>

### Calculation Logic (CartService)

*Core logic is inside cart.service.ts.*

It uses **Strategy Design Pattern** for discounts:

- Each discount type (CategoryDiscountRule, CartTotalDiscountRule) is a separate strategy.

- Adding a new discount is simple: create a new class and add it to discountRules.

<br>

**VAT => Currently has been set as 20%, it can be injected from environment or config if needed.**


<br>

## ✅ Input Validation & Edge Cases

Input is validated using **Zod**.

Prevents:
- Empty items array
- Negative or zero prices/quantities
- Strings exceeding max length
- Excessive decimal precision
- Ensures invalid data never reaches the service or database.


*Note: Integration tests can be added later; currently validation ensures data correctness.*

<br>

## How to add new discount rules?

- Create a new class implementing DiscountStrategy. (/src/cart/rules)

- Implement the apply method.

- Add the new rule to discountRules in /src/cart/cart.config.ts.

- Done, No changes needed in the core CartService :D 


## 💡 Just a few notes ...

Even though this is a simple task, when dealing with money, precision is key because we're talking about people's hard-earned cash :))

so:

- I used **BigNumber.js** to ensure accurate financial calculations.
  
- Monetary values are returned as **strings** with two decimal places to avoid floating-point issues and ensure consistent formatting, so no unexpected rounding happens.
