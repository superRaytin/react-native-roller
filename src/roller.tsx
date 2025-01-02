import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { RollerProps } from './rollerProps'
import styles from './styles'

const RollingText: React.FC<RollerProps> = props => {
  const {
    style,
    itemStyle,
    textStyle,
    dataSource = [],
    visibleRowsNum = 1,
    interval = 3000,
    rowHeight = 30,
    spaceBetween = 0,
    animationDuration = 600,
    fadeOutDuration = 600,
    fadeInDuration = 600,
    shouldRoll = true,
    forceRoll = true,
    enableVisibleOffset = false,
  } = props;

  const [data, setData] = useState(dataSource);
  const [visibleData, setVisibleData] = useState<any[]>([]);
  const animationValue = useRef(new Animated.Value(0)).current;
  const fadeOutValue = useRef(new Animated.Value(1)).current;
  const fadeInValue = useRef(new Animated.Value(0)).current;
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const intervalRef = useRef<number>(0);
  const nextItemIndexRef = useRef<number>(null);

  useEffect(() => {
    const rowsLen = dataSource?.length || 0;

    if (!rowsLen) return;

    const shouldRollValue = typeof shouldRoll === 'function' ? shouldRoll(rowsLen, visibleRowsNum) : shouldRoll;

    if (rowsLen <= visibleRowsNum) {
      if (shouldRollValue && forceRoll) {
        // when the number of dataSource is insufficient
        // duplicate them multiple times until the number of rows is greater than the number of visible rows.
        const newData = completeData();

        setVisibleData(newData.slice(0, visibleRowsNum + 1));
        setData(newData);
        setAnimationEnabled(true);
      } else {
        setData(dataSource);
        setVisibleData(dataSource.slice(0, visibleRowsNum + 1));
      }

      return;
    }

    setData(dataSource);
    setVisibleData(dataSource.slice(0, visibleRowsNum + 1));

    if (shouldRollValue) {
      setAnimationEnabled(true);
    }
  }, [dataSource, visibleRowsNum, shouldRoll]);

  useEffect(() => {
    if (!animationEnabled) return;

    intervalRef.current = setInterval(() => {
      startAnimation();
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [animationEnabled, interval]);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(animationValue, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fadeOutValue, {
        toValue: 0.15,
        duration: fadeOutDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInValue, {
        toValue: 1,
        duration: fadeInDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animationValue.setValue(0);
      fadeOutValue.setValue(1);
      fadeInValue.setValue(0);
      updateVisibleData();
    });
  };

  // Update the visible data after the animation ends
  const updateVisibleData = () => {
    setVisibleData(prevData => {
      const nextData = [...prevData];

      nextData.shift();

      if (nextItemIndexRef.current === null) {
        nextItemIndexRef.current = visibleRowsNum + 1;
      } else {
        nextItemIndexRef.current = (nextItemIndexRef.current + 1) % data.length;
      }

      const itemToBeInserted = data[nextItemIndexRef.current] ? data[nextItemIndexRef.current] : data[0];

      nextData.push(itemToBeInserted);
      return nextData;
    });
  };

  const completeData = useCallback(() => {
    let newData = [...dataSource];
    let duplicateTimes = Math.floor(visibleRowsNum / dataSource.length);

    while (duplicateTimes) {
      newData = newData.concat([...dataSource]);
      duplicateTimes--;
    }

    return newData;
  }, [dataSource, visibleRowsNum]);

  const renderItem = (item: string, index: number) => {
    const isTop = index === 0;
    const isBottom = index === visibleRowsNum;
    const itemStyles = [
      styles.item,
      itemStyle,
      { height: rowHeight, marginTop: spaceBetween },
      isTop && { opacity: fadeOutValue },
      isBottom && { opacity: fadeInValue },
    ];
    return (
      <View style={styles.section} key={`${item}-${index}`}>
        <Animated.View style={itemStyles}>
          <Text style={[styles.text, textStyle]}>{item}</Text>
        </Animated.View>
      </View>
    );
  };

  const getContainerStyle = () => {
    const containerVisibleRowsNum = enableVisibleOffset ? visibleRowsNum + 1 : visibleRowsNum;
    return [
      styles.container,
      style,
      {
        height: (rowHeight + spaceBetween) * containerVisibleRowsNum,
      },
    ];
  };

  if (!dataSource?.length || !visibleData.length) return null;

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(rowHeight + spaceBetween)],
  });

  const getAnimationWrapperStyle: any = () => ({
    transform: [{ translateY }],
    height: rowHeight * visibleRowsNum + spaceBetween * visibleRowsNum,
    justifyContent: visibleRowsNum > data.length ? 'flex-end' : 'flex-start',
  });

  return (
    <View style={getContainerStyle()}>
      <Animated.View style={getAnimationWrapperStyle()}>
        {visibleData.map((item: string, index: number) => renderItem(item, index))}
      </Animated.View>
    </View>
  );
};

export default RollingText;
