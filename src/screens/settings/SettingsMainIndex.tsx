import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import { navigate, resetAndNavigate } from '../../utils/navigationRef';
import { logoutUser } from '../../services/loginService';
import { profileInfo } from '../../services/loginService'; // <-- import
import { showMessage } from 'react-native-flash-message';
import { useUserStore } from '../../store/userStore';
import CustomLoader from '../../components/CustomLoader';

const SettingsMainIndex = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null); // store real user data
  const { clearAuth } = useUserStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await profileInfo(setIsLoading);
      if (res?.statusCode === 200 && res?.data) {
        setProfile(res.data);
      } else {
        showMessage({
          message: 'প্রোফাইল লোড করতে সমস্যা হয়েছে!',
          type: 'danger',
        });
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const res = await logoutUser(setIsLoading);

    if (res?.statusCode === 200) {
      clearAuth();
      showMessage({
        message: res?.message || 'লগ আউট সফল হয়েছে!',
        description: 'আপনি সাফল্যের সাথে লগ আউট করেছেন।',
        type: 'success',
        duration: 1000,
        onHide: () => resetAndNavigate('LoginScreen'), // Navigate to login
      });
    } else {
      showMessage({
        message: 'লগ আউট ব্যর্থ হয়েছে!',
        description:
          res?.message || 'কিছু ভুল হয়েছে, দয়া করে আবার চেষ্টা করুন।',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  if (!profile) return null; // or a loading spinner

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="প্রোফাইল" />
      <CustomLoader loading={isLoading} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View style={styles.userCard}>
          <Text style={styles.userName}>{profile.fullName}</Text>
          <Text style={styles.userRole}>
            {profile.role === 'admin' ? 'অ্যাডমিন' : 'কর্মচারী'}
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <InfoRow icon="mail-outline" label="ইমেইল" value={profile.email} />
          <InfoRow icon="call-outline" label="ফোন" value={profile.phone} />
          <InfoRow
            icon="card-outline"
            label="কর্মচারী কোড"
            value={profile.employeeCode}
          />
          <InfoRow
            icon="person-outline"
            label="ইউজারনেম"
            value={profile.userName}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <CustomButton
            title="পাসওয়ার্ড পরিবর্তন করুন"
            onPress={() =>
              showMessage({
                message: 'Password change coming soon!',
                type: 'info',
                floating: true,
                icon: 'info',
              })
            }
            type="primary"
            style={styles.actionButton}
            textStyle={{ fontSize: 16 }}
          >
            <Icon name="key-outline" size={20} color={Colors.white} />
          </CustomButton>

          <CustomButton
            loading={isLoading}
            disabled={isLoading}
            title="লগ আউট"
            onPress={() => handleLogout()}
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

// InfoRow component remains the same
const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
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
  container: { padding: 16, paddingBottom: 30 },
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
  userName: { fontSize: 22, fontWeight: '700', color: Colors.text },
  userRole: { fontSize: 14, color: Colors.lightText, marginTop: 4 },
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
  iconContainer: { width: 30, alignItems: 'center', marginRight: 12 },
  infoLabel: { fontSize: 14, color: Colors.lightText },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  actionsContainer: { flexDirection: 'column', gap: 12 },
  actionButton: { justifyContent: 'center' },
});
