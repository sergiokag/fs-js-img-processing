# Image Processing API

Access the `/api/images` endpoint where you pass 3 query parameters:

-   filename
-   width
-   height

`/api/images?filename=FILE_NAME&width=WIDTH_AMOUNT&height=HEIGHT_AMOUNT`

**_Important!_**
Please use **fjord** as a filename in the filename query param
for example:

`/api/images?filename=fjord&width=200&height=200`

## Project setup

```
npm install
```

### Compiles for development

```
npm run serve
```

```
npm run watch
```

### Compiles and minifies for production

```
npm run serve:dist
```

### Tests files

```
npm run test
```

### Lints files

```
npm run lint
```
