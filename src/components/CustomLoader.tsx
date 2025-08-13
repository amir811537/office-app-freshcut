import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';

interface CustomLoaderProps {
  loading: boolean;
  containerStyle?: ViewStyle;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({
  loading,
  containerStyle,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={loading}
      statusBarTranslucent
    >
      <View style={[styles.container, containerStyle]}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={Colors.theme} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.overlay, // semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default CustomLoader;
