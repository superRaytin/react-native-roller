# react-native-roller

A roller component for React Native

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[npm-url]: https://npmjs.org/package/react-native-roller
[downloads-image]: http://img.shields.io/npm/dm/react-native-roller.svg
[npm-image]: http://img.shields.io/npm/v/react-native-roller.svg

## Installation

```
yarn add react-native-roller
```

or

```
npm i react-native-roller
```

## Examples

```jsx
<Roller
  rows={[
    '1 - While there is life, there is hope',
    '2 - Do what you say,say what you do',
    '3 - All things come to those who wait',
    '4 - Nothing seek, nothing find'
  ]}
  style={styles.bg}
/>
```

![](examples/images/demo1.gif)

```jsx
<Roller
  rows={[
    '1 - While there is life, there is hope',
    '2 - Do what you say,say what you do',
    '3 - All things come to those who wait',
    '4 - Nothing seek, nothing find'
  ]}
  itemStyle={styles.bg}
  visibleRowsNum={3}
  spaceBetween={6}
/>
```

![](examples/images/demo2.gif)

`bg` styles:

```css
{
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 4,
  paddingHorizontal: 9,
}
```

## API

| prop      | type  | default value |
| --------- | ------------- | ------------- |
| `rows`    | `string[]` |     |
| `visibleRowsNum` | `number` | 1 |
| `rowHeight` | `number` | 30 |
| `spaceBetween` | `number` | 0 |
| `interval` | `number` | 3000 |
| `animationDuration` | `number` | 600 |
| `fadeOutDuration` | `number` | 600 |
| `fadeInDuration` | `number` | 600 |
| `style` | `StyleProp<ViewStyle>` |  |
| `itemStyle` | `StyleProp<ViewStyle>` |  |
| `textStyle` | `StyleProp<TextStyle>` |  |
| `shouldRoll` | `boolean \| ((rowsLen: number, visibleRowsNum: number) => boolean)` | true |
| `forceRoll` | `boolean` | true |
| `enableVisibleOffset` | `boolean` | false |
