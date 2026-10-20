
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../store';

import {
  increment,
  decrement,
  reset,
  incrementByFive,
} from '../store/counterSlice';

export default function CounterScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const counter = useSelector(
    (state: RootState) => state.counter.value
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Toolkit Counter</Text>

      <Text style={styles.label}>Giá trị hiện tại</Text>
      <Text style={styles.counter}>{counter}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>− Giảm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>+ Tăng</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.fiveButton]}
        onPress={() => dispatch(incrementByFive())}
      >
        <Text style={styles.buttonText}>+ 5</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.resetButton]}
        onPress={() => dispatch(reset())}
      >
        <Text style={styles.buttonText}>Reset về 0</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    color: '#64748B',
  },
  counter: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#2563EB',
    marginVertical: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    minWidth: 130,
  },
  incrementButton: {
    backgroundColor: '#2563EB',
  },
  decrementButton: {
    backgroundColor: '#64748B',
  },
  fiveButton: {
    backgroundColor: '#059669',
    width: 272,
  },
  resetButton: {
    backgroundColor: '#DC2626',
    width: 272,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
