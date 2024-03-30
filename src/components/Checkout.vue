<template>
    <div>
      <button @click="toggleLessons" id="chkBtn" style="padding: 10px;">
        <span class="fas fa-cart-plus"></span> Return
      </button>

      <!-- Enrollee Details Form -->
      <div id="usrDetailDiv">
        <h2>Enrollee Details</h2>
        <!-- Input fields for enrollee details -->
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

      <!-- Display details of the enrolled applicant in a styled div -->
      <div id="copyDetailDiv">
        <h2>Enrollee Applicant</h2>
        <!-- Display applicant details -->
        <p>First Name: {{localOrder.firstName}}</p>
        <p>Last Name: {{localOrder.lastName}}</p>
        <p>Contact Number: {{localOrder.contactNum}}</p>
      </div>
  
      <!-- Cart Contents -->
      <div id="cartlistPane">
        <h2>Cart Contents</h2>
        <ul>
          <li v-for="item in cart" :key="item.id" id="textCart">
            <!-- Display lesson details from the cart -->
            {{ getLessonById(item.id).title }} - {{ getLessonById(item.id).price }}
            <!-- Button to remove the lesson from the cart -->
            <button @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
      </div>
  
      <!-- Submit Button -->
      <button @click="submitForm" id="submitBtn">Place Order</button>
    </div>
  </template>
  
  <script>
    export default {
      name: 'CheckoutPage',
      props: ['cart'],
      data() {
    return {
      localOrder: { firstName: '', lastName: '', contactNum: '' },
      // Initialize cart as an empty array
    };
  },
    methods: {
    // Submit form
    submitForm() {
      // Submitting the order after validating details
      if (!this.localOrder.firstName || !this.localOrder.lastName || !this.localOrder.contactNum) {
        console.log(this.localOrder.firstName || this.localOrder.lastName || this.localOrder.contactNum);
        alert('Please enter all required details before placing the order.');
      } else {
        alert('You Have Successfully Applied :D');
        window.location.reload();
      }
    },

    // Emit event to remove item from cart
    removeFromCart(id) {
      this.$emit('remove-from-cart', id); // Emit event to inform parent component
    },
    // Get lesson details by ID
    getLessonById(lessonId) {
      return this.cart.find(item => item.id === lessonId); // Find the lesson object by its ID
    },
    toggleLessons() {
      this.$emit('toggle-lessons');
    }
      }
    };
  </script>

  
  <style scoped>
  /* Your existing styles here */
  @import './styles.css';
  </style>
  