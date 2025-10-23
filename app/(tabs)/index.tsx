import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const cartItems = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQnErBf_SS1dFZeFFAlARVIQcJV9_JyULZBLOy-44eBuDVlkeCRYQoEa-z6JnxME6qHw5LgUUDzYC3vhyTaWFwRq1FbUjhvxBsCLZohQjL4cDEzIdn2Qjl3',
  },
  {
    id: 2,
    name: 'Premium Coffee Mug',
    price: 24.99,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGC7JuKS7nE-OCQf68F94_qTzJ0zMxbGvyRuiZZ24Pf8yR80PElHG4dRDfaXwC-3pWY4TBG-8DYazyMwx2YcJUOh-LzK7zz7dTrYzLOOQq_D8YB6v4wEXP',
  },
  {
    id: 3,
    name: 'Smartphone',
    price: 699.99,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSezJbfxH_Tp0osEp8JDDJznZco40ac3qA26evgok5s9sxGQcXGgXC4a8RZRyV-6CEBMcYGCumqJiyn7E-nQbjoEABZG6Vyq-F6p16hZaA',
  },
];

export default function App() {
  const [quantities, setQuantities] = useState([0, 5, 0]);

  const handleAdd = (index: number) => {
    setQuantities(q => q.map((v, i) => (i === index ? v + 1 : v)));
  };

  const handleRemove = (index: number) => {
    setQuantities(q => q.map((v, i) => (i === index ? Math.max(v - 1, 0) : v)));
  };

  const subtotal = cartItems.map((item, i) => item.price * quantities[i]);
  const total = subtotal.reduce((acc, curr) => acc + curr, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🛒</Text>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }}>
        {cartItems.map((item, i) => (
          <View style={styles.itemCard} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.itemQtyPanel}>
              <TouchableOpacity
                style={[styles.qtyBtn, quantities[i] === 0 && styles.qtyBtnDisabled]}
                onPress={() => handleRemove(i)}
                disabled={quantities[i] === 0}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{quantities[i]}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => handleAdd(i)}>
                <Text style={styles.qtyBtnText}>＋</Text>
              </TouchableOpacity>
            </View>
            {quantities[i] > 0 && (
              <View style={styles.itemSubtotal}>
                <Text style={styles.subtotalLabel}>Subtotal:</Text>
                <Text style={styles.subtotalValue}>${subtotal[i].toFixed(2)}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Items in cart</Text>
        {cartItems.map(
          (item, i) =>
            quantities[i] > 0 && (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={styles.summaryText}>
                  {item.name}: {quantities[i]} × ${item.price.toFixed(2)}
                </Text>
                <Text style={styles.summaryText}>${subtotal[i].toFixed(2)}</Text>
              </View>
            )
        )}
        <View style={styles.summaryTotalRow}>
          <Text style={styles.summaryTotalLabel}>Total:</Text>
          <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117' }, 
  scroll: { marginHorizontal: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#30363D',
  },
  headerIcon: {
    fontSize: 28,
    color: '#C9D1D9',
  },
  headerText: {
    marginLeft: 12,
    fontSize: 22,
    fontWeight: '600',
    color: '#C9D1D9',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#30363D',
    backgroundColor: '#161B22',
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 6,
    marginRight: 14,
    backgroundColor: '#21262D',
  },
  itemInfo: { flex: 1 },
  itemName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#C9D1D9',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#8B949E',
  },
  itemQtyPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#30363D',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21262D',
  },
  qtyBtnDisabled: {
    borderColor: '#484F58',
    backgroundColor: '#161B22',
  },
  qtyBtnText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#58A6FF', // GitHub blue accent in dark mode
    lineHeight: 20,
  },
  qtyNumber: {
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
    color: '#C9D1D9',
    fontWeight: '600',
  },
  itemSubtotal: {
    position: 'absolute',
    right: 16,
    bottom: 14,
    flexDirection: 'row',
    gap: 6,
  },
  subtotalLabel: {
    fontSize: 13,
    color: '#8B949E',
  },
  subtotalValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C9D1D9',
  },
  summaryBox: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    backgroundColor: '#161B22',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#30363D',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },
  summaryTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#C9D1D9',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryText: {
    fontSize: 14,
    color: '#C9D1D9',
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#30363D',
    paddingTop: 12,
  },
  summaryTotalLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#C9D1D9',
  },
  summaryTotalValue: {
    fontWeight: '700',
    fontSize: 16,
    color: '#58A6FF',
  },
});
