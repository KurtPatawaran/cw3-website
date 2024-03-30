<template>
    <div>
      <!-- Cart Button -->
      <button @click="toggleCheckout" id="chkBtn" style="padding: 10px;">
      {{ cart && cart.length > 0 ? cart.length : '' }}
      <span class="fas fa-cart-plus"></span> Cart
    </button>

        <div id="viewPane">
        <!-- Subject Pane -->
        <div id="subjectPane">
          <!-- Subject Divs -->
          <div id="subjectDiv" >
            <!-- Display subject image -->
            <div id="imgDiv">
              <figure>
                <img :src="subject.image">
              </figure>
            </div>
            <!-- Display subject information -->
            <div id="subjectText">
              <p id="subText" :textContent="subject.title" style="font-size: 30px;"></p>
              <p id="subText">Location: {{ subject.location }}</p>
              <p id="subText">Space: {{ subject.availableSpaces - cartCount(subject.id) }}</p>
              <p id="subText">Price: {{ subject.price }}</p>
  
              <!-- Add to cart button, conditionally shown based on availability -->
              <button @click="addToCart(subject)" v-if="canAddToCart(subject)"> Add to cart </button>
              <!-- Disabled button if the subject is not available -->
              <button disabled="disabled" v-else> N/A </button>
  
              <!-- Display availability status -->
              <span v-if="subject.availableSpaces === cartCount(subject.id)">
                All Out!
              </span>
              <span v-else-if="subject.availableSpaces - cartCount(subject.id) < 5">
                only {{subject.availableSpaces - cartCount(subject.id)}} Left!!
              </span>
              <span v-else>
                BUY NOW!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LessonList',
    props: ['subject', 'cart'],
  
    created() {
      console.log('Subjects in lessonslist:', this.subject); // Add this line to log the subjects array
    },

    methods: {
      // Add to cart
      addToCart(subject) {
        // Check if there are available spaces for the lesson
        if (this.canAddToCart(subject)) {
          // Add lesson to cart
          this.$emit('add-to-cart', subject);
        } else {
          // Handle case when no available spaces
          console.log('No available spaces for this lesson.');
        }
      },
      // Placeholder method for cartCount
      cartCount(subjectId) {
        let count = 0;
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === subjectId) { // Fix: Use id for comparison
            count++;
          }
        }
        return count;
      },

      // Placeholder method for canAddToCart
      canAddToCart(lesson) {
        return lesson.availableSpaces > this.cartCount(lesson.id); // Fix: Use id for comparison
      },

      // Placeholder method for toggleCheckout
      toggleCheckout() {
      this.$emit('toggle-checkout'); // Emit event to toggle checkout view
    },
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles as needed */
  @import './styles.css';
  </style>