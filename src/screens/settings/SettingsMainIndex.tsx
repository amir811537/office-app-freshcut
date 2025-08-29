import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import { navigate } from '../../utils/navigationRef';

const SettingsMainIndex = () => {
  const user = {
    fullName: 'মোঃ আমীর হোসেন',
    role: 'employee',
    email: 'amir@example.com',
    phone: '017xxxxxxxx',
    employeeCode: 'EMP12345',
    userName: 'amir123',
  };

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="প্রোফাইল" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userRole}>
            {user.role === 'admin' ? 'অ্যাডমিন' : 'কর্মচারী'}
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <InfoRow icon="mail-outline" label="ইমেইল" value={user.email} />
          <InfoRow icon="call-outline" label="ফোন" value={user.phone} />
          <InfoRow icon="card-outline" label="কর্মচারী কোড" value={user.employeeCode} />
          <InfoRow icon="person-outline" label="ইউজারনেম" value={user.userName} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <CustomButton
            title="পাসওয়ার্ড পরিবর্তন করুন"
            onPress={() => navigate('ChangePassword')}
            type="primary"
            style={styles.actionButton}
            textStyle={{ fontSize: 16 }}
          >
            <Icon name="key-outline" size={20} color={Colors.white} />
          </CustomButton>

          <CustomButton
            title="লগ আউট"
            onPress={() => navigate('Logout')}
            type="secondary"
            style={styles.actionButton}
            textStyle={{ fontSize: 16 }}
          >
            <Icon name="log-out-outline" size={20} color={Colors.white} />
          </CustomButton>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Icon name={icon} size={20} color={Colors.theme} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export default SettingsMainIndex;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  userCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  userRole: {
    fontSize: 14,
    color: Colors.lightText,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: Colors.divider,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.lightText,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  actionButton: {
    justifyContent: 'center',
  },
});
