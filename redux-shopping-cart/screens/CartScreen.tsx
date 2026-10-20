import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/cartSlice';

const PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS', price: 1200 },
  { id: 2, name: 'Mouse Logitech', price: 45 },
  { id: 3, name: 'Keyboard', price: 120 },
];

export default function CartScreen() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAddProduct = () => {
    const product =
      PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

    dispatch(addToCart(product));
  };

  const handleDecrease = (item: (typeof cartItems)[number]) => {
    if (item.quantity <= 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Giỏ Hàng</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={
          cartItems.length === 0 ? styles.emptyContainer : undefined
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Giỏ hàng đang trống!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {item.name}
              </Text>
              <Text style={styles.price}>
                ${item.price.toLocaleString('en-US')}
              </Text>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleDecrease(item)}
              >
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantity}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
              >
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
              </View>

            <TouchableOpacity
              onPress={() => dispatch(removeFromCart(item.id))}
            >
              <Text style={styles.deleteText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>
          Tổng: ${total.toLocaleString('en-US')}
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddProduct}
        >
          <Text style={styles.buttonText}>
            + Thêm Sản Phẩm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.buttonText}>
            🗑️ Xóa Giỏ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
  },
  price: {
    color: '#666',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    minWidth: 30,
    alignItems: 'center',
  },
  qtyBtn: {
    fontSize: 20,
    paddingHorizontal: 6,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteText: {
    color: 'red',
    fontWeight: '500',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  footer: {
    paddingTop: 16,
    gap: 12,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#c8f7c5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f7c5c5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});