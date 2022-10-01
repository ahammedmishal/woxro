import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StackIcon from 'react-native-vector-icons/Octicons';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS } from '../constants';

const ContainerButton = () => {
  return (
    <View style={styles.containerBlock}>
      <View style={styles.containerButton}>
        <StackIcon name="stack" size={30} color={COLORS.lightgrey1} />
        <Text style={styles.containerButtonText}>Industrial{'\n'}land</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBlock: {
    marginTop: responsiveHeight(2.5),
  },
  containerButton: {
    borderWidth: 1,
    width: responsiveWidth(21),
    height: responsiveHeight(10),
    justifyContent: 'center',
    borderRadius: responsiveHeight(1),
    alignItems: 'center',
    borderColor: COLORS.lightBg,
  },
  containerButtonText: {
    fontSize: responsiveFontSize(1.2),
    color: COLORS.lightgrey1,
    fontWeight: '700',
    marginTop: responsiveHeight(1),
    textAlign: 'center',
  },
});

export default ContainerButton;
