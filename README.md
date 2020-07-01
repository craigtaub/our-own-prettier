# our-own-prettier

A simple VSCode extension which auto-formats 1 scenario.

## How to run the extension

1. Checkout + install code
2. F5 (launch client in debug mode)
3. Open `files/test.txt` + highlight text
4. Open "Command Palette"
5. Click "Sexify it"

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
