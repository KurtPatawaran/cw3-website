<template>
  <div id="app">
    <!-- Header -->
    <header>
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
            v-for="subject in subjects" :key="subject._id" 
            :subject="subject"
            :search-query="searchQuery"
            :sort-order="sortOrder"
            @add-to-cart="addToCart"
            @clear-search="clearSearch"
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
          @remove-from-cart="removeFromCart"
          @submit-form="submitForm"
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
      order: {
        firstName: '',
        lastName: '',
        contactNum: ''
      },
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
      this.cart.push(lesson.id);
    },
    // Submit form
    submitForm() {
      // Submitting the order after validating details
      if (!this.order.firstName || !this.order.lastName || !this.order.contactNum) {
        alert('Please enter all required details before placing the order.');
      } else {
        alert('You Have Successfully Applied :D');
        // Calling the postOrder method and using then/catch to handle the next steps
        this.postOrder()
          .then(() => {
            this.cart.length = 0;
            this.order.firstName = '';
            this.order.lastName = '';
            this.order.contactNum = '';
            this.showSubject = !this.showSubject;
            location.reload();
          })
          .catch(error => {
            // Handling errors from the postOrder method
            console.error('Error in submitForm:', error);
          });
      }
    },
    // Remove lesson from cart
    removeFromCart(id) {
      // Finding the index of the lesson with the given ID in the cart
      const index = this.cart.indexOf(id);

      // Checking if the lesson is in the cart
      if (index !== -1) {
        // Removing the lesson from the cart using splice
        this.cart.splice(index, 1);

        // If the cart is empty after removal, bringing the user back to the lesson page
        if (this.cart.length === 0) {
          this.showSubject = !this.showSubject;
        }
      }
    },
    // Clear search query
    clearSearch() {
      this.searchQuery = '';
    }
  },
  computed: {
    // Computed property for filtered subjects based on search query and sorting order
    filteredSubjects() {
      let subjectsArray = this.subjects ? this.subjects.slice(0) : [];

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        subjectsArray = subjectsArray.filter(subject =>
          subject.title.toLowerCase().includes(query) ||
          subject.location.toLowerCase().includes(query)
        );
      }

      // Sorting logic based on the selected sortOrder
      switch (this.sortOrder) {
        case 'ascSubject':
          return subjectsArray.sort((a, b) => a.title.localeCompare(b.title));
        case 'descSubject':
          return subjectsArray.sort((a, b) => b.title.localeCompare(a.title));
        case 'ascLocation':
          return subjectsArray.sort((a, b) => a.location.localeCompare(b.location));
        case 'descLocation':
          return subjectsArray.sort((a, b) => b.location.localeCompare(a.location));
        case 'ascPrice':
          return subjectsArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        case 'descPrice':
          return subjectsArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        case 'ascSpaces':
          return subjectsArray.sort((a, b) => a.availableSpaces - b.availableSpaces);
        case 'descSpaces':
          return subjectsArray.sort((a, b) => b.availableSpaces - a.availableSpaces);
        default:
          return subjectsArray;
      }
    }
  }
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
