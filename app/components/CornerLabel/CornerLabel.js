import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ({
  cornerRadius,
  alignment = 'left',
  style,
  text,
  textStyle,
}) {
  const _labelHeight = Math.sqrt(Math.pow(cornerRadius, 2) / 2);
  const _labelWidth = _labelHeight * 2;
  const originOffset = Math.sqrt(Math.pow(_labelHeight / 2, 2) / 2);
  const labelHorizontalPosition = -_labelWidth / 2 + originOffset;
  const labelVerticalPosition = -_labelHeight / 2 + originOffset;
  let _labelPosition = {};
  let _labelTransform = {};

  if (alignment === 'left') {
    _labelPosition = {
      left: labelHorizontalPosition,
      top: labelVerticalPosition,
    };
    _labelTransform = {transform: [{rotate: '-45deg'}]};
  } else {
    this._labelPosition = {
      right: labelHorizontalPosition,
      top: labelVerticalPosition,
    };
    _labelTransform = {transform: [{rotate: '45deg'}]};
  }
  return (
    <View
      style={[
        styles.container,
        _labelPosition,
        _labelTransform,
        {width: _labelWidth, height: _labelHeight},
      ]}>
      <View style={[styles.label, {height: _labelHeight}, style]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    //transform: [{rotate: '45deg'}],
    justifyContent: 'flex-end',
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    // fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 12,
  },
});
