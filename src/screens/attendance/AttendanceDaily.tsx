import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

type StatusType = 'P' | 'L' | 'A';

type Employee = {
  id: string;
  name: string;
};

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Rony' },
  { id: '2', name: 'Hasan' },
  { id: '3', name: 'Shuvo' },
];

const AttendanceDaily = ({ navigation }: any) => {
  const [attendance, setAttendance] = useState<Record<string, StatusType>>({});

  const updateStatus = (id: string, status: StatusType) => {
    setAttendance(prev => ({
      ...prev,
      [id]: status,
    }));

    // 🔜 backend call here (auto-save)
    // saveAttendance({ employeeId: id, status });
  };

  const renderItem = ({ item }: { item: Employee }) => {
    const selected = attendance[item.id] || 'A';

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.actions}>
          <ActionButton
            label="Present"
            color={Colors.success}
            active={selected === 'P'}
            onPress={() => updateStatus(item.id, 'P')}
          />
          <ActionButton
            label="Leave"
            color={Colors.warning}
            active={selected === 'L'}
            onPress={() => updateStatus(item.id, 'L')}
          />
          <ActionButton
            label="Absent"
            color={Colors.error}
            active={selected === 'A'}
            onPress={() => updateStatus(item.id, 'A')}
          />
        </View>
      </View>
    );
  };

  return (
    <WrapperContainer style={styles.wrapper}>
      <CustomHeader
        title="Daily Attendance"
        leftIconName="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Date */}
        <View style={styles.dateCard}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={Colors.primary}
          />
          <Text style={styles.dateText}>
            Today · 12 September 2025
          </Text>
        </View>

        {/* List */}
        <FlatList
          data={EMPLOYEES}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </WrapperContainer>
  );
};

export default AttendanceDaily;
const ActionButton = ({
  label,
  color,
  active,
  onPress,
}: {
  label: string;
  color: string;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.actionButton,
        {
          backgroundColor: active ? color : Colors.surfaceLight,
          borderColor: color,
        },
      ]}
    >
      <Text
        style={[
          styles.actionText,
          { color: active ? Colors.white : color },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    padding: 16,
  },

  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },

  dateText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1.2,
    alignItems: 'center',
  },

  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
