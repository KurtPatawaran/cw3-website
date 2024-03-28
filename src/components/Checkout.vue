<template>
    <div>
      <!-- Enrollee Details Form -->
      <div id="usrDetailDiv">
        <h2>Enrollee Details</h2>
        <p>
          <strong>First Name:</strong>
          <input v-model.trim="localOrder.firstName" />
        </p>
        <p>
          <strong>Last Name:</strong>
          <input v-model.trim="localOrder.lastName" />
        </p>
        <p>
          <strong>Contact Number:</strong>
          <input v-model.trim="localOrder.contactNum" type="number" />
        </p>
      </div>
      <div id="copyDetailDiv">
        <h2>Enrollee Applicant</h2>
        <!-- Display applicant details -->
        <p>First Name: {{ localOrder.firstName }}</p>
        <p>Last Name: {{ localOrder.lastName }}</p>
        <p>Contact Number: {{ localOrder.contactNum }}</p>
      </div>
  
      <!-- Cart Contents -->
      <div id="cartlistPane">
        <ol>
          <li v-for="item in cart" :key="item.id" id="textCart">
            {{ getLessonById(item).title }} - {{ getLessonById(item).price }}
            <button @click="removeFromCart(item)">Remove</button>
          </li>
        </ol>
      </div>
  
      <!-- Submit Button -->
      <button @click="submitForm" id="submitBtn">Place Order</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckoutPage',
    props: ['cart', 'order'],
    data() {
      return {
        localOrder: { ...this.order } // Create a local copy of the order prop
      };
    },
    methods: {
      // Submit form
      submitForm() {
        this.$emit('submit-form');
      },
      // Remove from cart
      removeFromCart(id) {
        this.$emit('remove-from-cart', id);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your existing styles here */
  @import './styles.css';
  </style>
  