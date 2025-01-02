# react-native-roller

React Native component for rolling things.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[npm-url]: https://npmjs.org/package/react-native-roller
[downloads-image]: http://img.shields.io/npm/dm/react-native-roller.svg
[npm-image]: http://img.shields.io/npm/v/react-native-roller.svg

## Installation

Supported version: react-native >= 0.68.0

```
yarn add react-native-roller
```

or

```
npm i react-native-roller
```

## Example

Scroll texts in a loop, one row at a time

```jsx
import Roller from 'react-native-roller'

<Roller
  dataSource={[
    '1 - While there is life, there is hope',
    '2 - Do what you say,say what you do',
    '3 - All things come to those who wait',
    '4 - Nothing seek, nothing find'
  ]}
  style={styles.bg}
/>
```

![](examples/images/demo1.gif)

Display 3 rows in the visible area

```jsx
<Roller
  dataSource={[
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

Enable the visible offset

```jsx
<Roller
  dataSource={[
    '1 - While there is life, there is hope',
    '2 - Do what you say,say what you do',
    '3 - All things come to those who wait',
    '4 - Nothing seek, nothing find'
  ]}
  itemStyle={styles.bg}
  visibleRowsNum={3}
  spaceBetween={6}
  enableVisibleOffset
/>
```

![](examples/images/demo3.gif)

`bg` styles:

```css
{
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 4,
  paddingHorizontal: 9,
}
```

## API

| prop      | type  | default value | description |
| --------- | ------------- | ------------- | ------------- |
| `dataSource`    | `any[]` |     | DataSource array for rows |
| `visibleRowsNum` | `number` | 1 | Number of rows visible |
| `rowHeight` | `number` | 30 | Height per row |
| `spaceBetween` | `number` | 0 | Space between rows |
| `interval` | `number` | 3000 | Interval between two rolling |
| `animationDuration` | `number` | 600 | Duration of each rolling animation (milliseconds) |
| `fadeOutDuration` | `number` | 600 | Duration of the fade-out animation for the first row |
| `fadeInDuration` | `number` | 600 | Duration of the fade-in animation for the last row |
| `style` | `StyleProp<ViewStyle>` | Container style |
| `itemStyle` | `StyleProp<ViewStyle>` | Item style |
| `textStyle` | `StyleProp<TextStyle>` | Text style |
| `shouldRoll` | `boolean \| ((rowsLen: number, visibleRowsNum: number) => boolean)` | true | Whether to roll |
| `forceRoll` | `boolean` | true | Whether to roll when the number of dataSource is insufficient |
| `enableVisibleOffset` | `boolean` | false | Whether to enable the visible offset |

# License

MIT, see the [LICENSE](/LICENSE) file for detail.
