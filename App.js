import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {ICONS, COLORS} from './constants';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContainerButton from './components/ContainerButton';
import CardContainer from './components/CardContainer';

const App = () => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPost();
    console.log(filterData);
    return () => {};
  }, []);

  const fetchPost = () => {
    const apiURL = 'https://api.xentice.com/api/postadSelect';
     fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setFilterData(responseJson);
        setMasterData(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.Ingredient
          ? item.Ingredient.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  const FlatList_Header = () => {
    return (
      <View
        style={{
          height: 45,
          width: '100%',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#30384d',
          }}>
          Comercial Office
        </Text>
      </View>
    );
  };

  const ItemView = ({item}) => {
    var finalData = item.images.replace(/[\\[\]"]+/g, '');
    var obj2 = JSON.parse(item.details);
    let display = [obj2];

    var obj1 = JSON.parse(item.propertyType);
    let propertyType = [obj1];
    // console.log(propertyType);

    return (
      <>
        {obj1.name == 'Commercial Office' ? (
          <View
            style={{
              flex: 1,
              width: '80%',
              paddingHorizontal: 4,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightBg,
                height: 200,
                width: 180,
                borderRadius: responsiveHeight(1),
                marginRight: 5,
              }}>
              <Image
                style={{width1: 150, height: 125, borderRadius: 5}}
                source={{uri: item.images.replace(/[\\[\]"]+/g, '')}}
              />
              <TouchableOpacity
                style={{
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
                }}>
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
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <Text style={styles.titleStyle}>{item.title}</Text>
                      {item.price?.rate ? (
                        <Text
                          style={
                            styles.priceText
                          }>{`Rs.${item.price?.rate}/Hr`}</Text>
                      ) : (
                        // if no price can add here any messages
                        <Text style={styles.priceText}>{` `}</Text>
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
                      style={{
                        flexDirection: 'row',
                        marginTop: 8,
                        alignItems: 'center',
                        paddingLeft: 3,
                      }}>
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.20)"
        translucent
      />
      <SafeAreaView style={{marginTop: 30}} />
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerIconConatiner}>
          <TouchableOpacity>
            <Image source={ICONS.Drawer} style={styles.drawerIconImage} />
          </TouchableOpacity>
          <Image source={ICONS.Logo} style={styles.logoImage} />
        </View>
        <Image source={ICONS.Avatar} style={styles.avatarImage} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Icon
          style={styles.searchIcon}
          name="search"
          size={20}
          color={COLORS.black}
        />
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="Search"
          placeholderTextColor={COLORS.lightgrey2}
          underlineColorAndroid="transparent"
          onChangeText={text => searchFilter(text)}
        />
      </View>

      {/* lists */}
      <View style={styles.listContainer}>
        <View style={styles.activeList}>
          <Text style={styles.activeListText}>Property</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>Services</Text>
        </View>
      </View>

      {/* container buttons */}
      <View style={styles.containerButtonView}>
        <ContainerButton />
        <ContainerButton />
        <ContainerButton />
        <ContainerButton />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardContainer
          filterData={filterData}
          categoryName={'Commercial Office'}
        />
        <CardContainer
          filterData={filterData}
          categoryName={'Commercial Land'}
        />
        <View style={{height: 20}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: responsiveWidth(4),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(8),
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: responsiveFontSize(3.4),
    color: COLORS.blue,
    paddingLeft: responsiveWidth(4),
  },
  headerIconConatiner: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  drawerIconImage: {
    width: responsiveWidth(9),
    height: responsiveHeight(2),
    resizeMode: 'contain',
    marginTop: 8,
  },
  logoImage: {
    width: responsiveWidth(29),
    height: responsiveHeight(8),
    resizeMode: 'contain',
    marginLeft: 15,
  },
  avatarImage: {
    width: responsiveWidth(11),
    height: responsiveHeight(13),
    resizeMode: 'contain',
  },
  textInputStyle: {
    paddingLeft: responsiveWidth(5),
    width: '90%',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(5.5),
    borderRadius: responsiveHeight(1),
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: COLORS.lightBg,
    borderWidth: 1,
    marginTop: responsiveHeight(2.5),
  },
  searchIcon: {
    paddingLeft: responsiveWidth(5),
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1.5),
  },
  activeList: {
    width: responsiveWidth(28),
    height: responsiveHeight(5),
    borderWidth: 1,
    borderRadius: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.lightBg,
  },
  activeListText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.black,
    fontWeight: '800',
  },
  list: {
    width: responsiveWidth(23),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.lightgrey1,
    fontWeight: '700',
  },
  containerButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});

export default App;
