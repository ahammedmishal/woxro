import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, ICONS} from '../constants';

const CardContainer = props => {
  const ItemView = ({item}) => {
    var finalData = item.images.replace(/[\\[\]"]+/g, '');
    var obj2 = JSON.parse(item.details);
    let display = [obj2];
    var obj1 = JSON.parse(item.propertyType);

    return (
      <>
        {obj1.name == props.categoryName ? (
          <View
            style={{
              flex: 1,
              width: '80%',
              paddingHorizontal: 4,
            }}>
            <View
              style={styles.cardContainer}>
              <Image
                style={styles.image}
                source={{uri: item.images.replace(/[\\[\]"]+/g, '')}}
              />
              <TouchableOpacity style={styles.wishListIcon}>
                <Ionicons name="heart" color="#f55757" size={13} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                  paddingHorizontal: 5,
                }}>
                {display.map((item, id) => {
                  return (
                    <View
                      key={id}
                      style={styles.cardDetailContainer}>
                      <Text style={styles.titleStyle}>{item.title}</Text>
                      {item.price?.rate ? (
                        <Text
                          style={
                            styles.priceText
                          }>{`Rs.${item.price?.rate}/Hr`}</Text>
                      ) : (
                        // if no price can add here any messages
                        <Text
                          style={styles.priceText}>{`₹ not disclosed`}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
              <View>
                {display.map((item, id) => {
                  return (
                    <View
                      key={id}
                      style={styles.cardLocationContainer}>
                      <Ionicons name="location" size={20} color={'#1c980f'} />
                      <Text numberOfLines={1} style={styles.locationText}>
                        {item.property_add}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        ) : (
          ''
        )}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 20, height: 40}}>
        <Text style={{fontWeight: 'bold', color: COLORS.black, fontSize: 17}}>
          {props.categoryName}
        </Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            style={styles.categoryContainerText}>
            see all
          </Text>
        </TouchableOpacity>
      </View>

      {/* flatList */}
      <FlatList
        data={props.filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.black,
  },
  priceText: {
    color: '#d75050',
    fontWeight: '800',
    fontSize: 10.3,
  },
  locationText: {
    fontWeight: '500',
    color: COLORS.black,
    fontSize: 12,
    flex: 1,
  },
  wishListIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    borderRadius: 15,
    width: 21,
    height: 21,
    backgroundColor: 'white',
    right: 5,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width1: 150,
    height: 125,
    borderRadius: 5,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightBg,
    height: 200,
    width: responsiveWidth(43),
    borderRadius: responsiveHeight(1),
    marginRight: 5,
  },
  cardLocationContainer:{
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    paddingLeft: 3,
  },
  cardDetailContainer:{
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  categoryContainerText:{
    color: '#cfcfcf',
    fontSize: 14,
    textAlign: 'right',
    marginRight: 10,
  }

});

export default CardContainer;
