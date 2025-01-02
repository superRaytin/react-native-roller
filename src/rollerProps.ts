import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface RollerProps {
  dataSource?: any[];
  // defaults to 1
  visibleRowsNum?: number;
  // defaults to 3000
  interval?: number;
  // defaults to 30
  rowHeight?: number;
  // defaults to 0
  spaceBetween?: number;
  // defaults to 600
  animationDuration?: number;
  // defaults to 600
  fadeOutDuration?: number;
  // defaults to 600
  fadeInDuration?: number;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  // defaults to true
  shouldRoll?: boolean | ((rowsLen: number, visibleRowsNum: number) => boolean);
  // defaults to true
  forceRoll?: boolean;
  // defaults to false
  enableVisibleOffset?: boolean;
}