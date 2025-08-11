import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const ComponentName = () => {
  useEffect(() => {
    // TODO: Add your side effects here
  }, []);

  const onPressFab = () => {
    // TODO: Handle FAB press
  };

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="Create" />
      <View style={styles.container}>
        <Text style={styles.text}>Content goes here</Text>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={onPressFab}
        activeOpacity={0.7}
      >
        <Icon name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </WrapperContainer>
  );
};

export default ComponentName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.black,
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 24,
    backgroundColor: Colors.theme,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
