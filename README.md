# our-own-prettier

A simple VSCode extension which auto-formats 1 scenario.

## How to run the extension

1. Checkout + install code
2. > npm run compile
3. F5 (launch client in debug mode)
4. Open `files/test.txt` + highlight text
5. Open "Command Palette"
6. Click "Sexify it"

## Scenarios

### Scenario 1

#### Before

```javascript
myFunction();
```

#### After

```javascript
myFunction();
```

### Scenario 2

#### Before

```javascript
myFunction(one, two, three);
```

#### After

```
myFunction(
  one,
  two,
  three
);
```
