![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Image Uploader Web Component

A side project for myself to create a reusable drag&drop image uploader web component and practice StencilJS.

![Image uploader](https://stuff.p-kin.com/screentogif/pk-image-uploader.gif)

You can check out a [DEMO PEN here](https://codepen.io/kinpeter/pen/yLNZNMX).

## Properties

The component can receive the following properties as html attributes.
Only the `label` is required. If the `image` is not set, the component will simply start off with an empty state (showing the drop box).
All the requirement rule properties have default values thus they are not required.

| Property         | Attribute    | Description                           | Type     | Default     |
| ---------------- | ------------ | ------------------------------------- | -------- | ----------- |
| `image`          | `image`      | The URL of an already existing image  | `string` | `undefined` |
| `label`*         | `label`      | Text label shown over the image box   | `string` | `undefined` |
| `maxFileSize`    | `size-max`   | Maximum allowed file size in MB       | `number` | `5`         |
| `maxImageHeight` | `height-max` | Maximum allowed image height in pixel | `number` | `4000`      |
| `maxImageWidth`  | `width-max`  | Maximum allowed image width in pixel  | `number` | `6000`      |
| `minImageHeight` | `height-min` | Minimum allowed image height in pixel | `number` | `240`       |
| `minImageWidth`  | `width-min`  | Minimum allowed image width in pixel  | `number` | `320`       |

> For image dimensions (px) if either of the values are set to `0` that minimum or maximum size accordingly will NOT be validated.

## Events

Every time the loaded image changes and the file is valid, an `imagechange` event is fired with the image file as the payload, or a `null` value if the images has been removed.

| Event         | Description  | Type               |
| ------------- | ------------ | ------------------ |
| `imagechange` | Payload: the selected file or `null` | `CustomEvent<File | null>` |

## Styles

* Component width is set to `100%` of the parent element
* Component height is `350px` by default but can be easily overwritten by simply assigning a new height in CSS for the `pk-image-uploader` element
* CSS variables can be set to overwrite some of the default settings:

| CSS variable | Description | Default        |
| ------------ | ----------- | -------------- |
| `--iu-primary-color`  | Color of the texts and borders | `#00000099` |
| `--iu-dragging-color` | Color of the border while dragging | `#425AC9`   |
| `--iu-error-color`    | Color of the border and the error message in case of invalid file | `#D20000` |
| `--iu-border-radius`  | Border radius of the component box and buttons | `5px` |
