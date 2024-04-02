<template>
  <div id="app">
    <!-- Header -->
    <header>
      <link rel="manifest" href="../public/manifest.json">
      <div id="headText">
        <h1>{{ siteName }}</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Conditional rendering based on showSubject -->
      <div v-if="showSubject">
        <!-- Lessons Component -->
        <div>
          <Lessons
            v-for="subject in subjects" :key="subject.id" 
            :subject="subject"      
            @add-to-cart="addToCart"
            @toggle-checkout="toggleCheckout"
            @toggle-lessons="toggleLessons"
            :cart="cart">            
          </Lessons>
        </div>
      </div>

      <!-- Conditional rendering based on showSubject -->
      <div v-else>
        <!-- Checkout Component -->
        <Checkout
          :cart="cart"
          :order="order"

          @remove-from-cart="handleRemoveFromCart"
          @submit-form="submitForm"
          @toggle-checkout="toggleCheckout"
          @toggle-lessons="toggleLessons"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Lessons from './components/Lessons.vue';
import Checkout from './components/Checkout.vue';

export default {
  components: {
    Lessons,
    Checkout
  },
  data() {
    return {
      siteName: 'After School Activities - Enroll Now!',
      showSubject: true,
      subjects: [],
      cart: [],
      sortOrder: '',
      searchQuery: ''
    };
  },
  created() {
    // Fetch lessons data from the server
    fetch('http://localhost:3000/collection/lessons')
      .then(response => response.json())
      .then(data => {
        this.subjects = data;
        console.log('Subjects in App.vue:', this.subjects);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
  methods: {
    // Add lesson to cart
    addToCart(lesson) {
      this.cart.push(lesson); // Push the full lesson object to the cart
      console.log('Cart:', this.cart);
    },

    // Method to handle removing item from cart
    handleRemoveFromCart(id) {
      const index = this.cart.findIndex(item => item.id === id);
      if (index !== -1) {
        this.cart.splice(index, 1); // Remove item from cart
      }

      // If the cart is empty after removal, bringing the user back to the lesson page
      if (this.cart.length === 0) {
          this.showSubject = !this.showSubject;
        }
    },
    
    // Toggle to Checkout view
    toggleCheckout() {
      if (this.cart.length > 0) {      
        this.showSubject = !this.showSubject;
      } else {
        alert('Your cart is empty. Please add items to proceed to checkout.');
      }
    },

    // Toggle between lesson and checkout view
    toggleLessons() {
        this.showSubject = 1;
    }
  },
};
</script>

<style>
/* Additional styles for stacking checkout buttons vertically */
#chkBox {
  text-align: center; /* Align the buttons to the center */
}

#chkBox button {
  display: block; /* Display the buttons as block elements */
  margin-bottom: 10px; /* Add some space between each button */
}

/* Import component styles */
@import './components/styles.css';
</style>
